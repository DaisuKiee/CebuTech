import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { onFrame, prefersReducedMotion } from '../lib/motion';
import { batchSize } from '../data/students';

/*
 * A night sea of particles (Daanbantayan sits on the water at Cebu's northern tip)
 * with a drifting constellation above it: one star per student in the batch.
 *
 * Interaction:
 *  - the sea swells and glows under the pointer
 *  - clicking/tapping the hero sends a shockwave ring across the water
 *  - stars brighten near the pointer; shooting stars cross now and then
 *  - on first load the camera dives from the sky down to the waterline
 *
 * All wave motion runs in shaders, so CPU cost per frame stays tiny.
 */

const RIPPLES = 4;

const seaVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uAmp;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  uniform vec3 uRipples[${RIPPLES}];
  attribute float aRand;
  varying float vHeight;
  varying float vFade;
  varying float vSun;
  varying float vGlow;
  void main() {
    vec3 p = position;
    float w = sin(p.x * 0.22 + uTime * 0.55) * 0.55
            + sin(p.z * 0.33 + uTime * 0.75) * 0.45
            + sin((p.x + p.z) * 0.12 + uTime * 0.35) * 0.8;
    w *= uAmp;

    // Swell under the pointer
    float pd = distance(p.xz, uPointer);
    float swell = exp(-pd * pd * 0.035) * uPointerStrength;
    w += swell * (0.9 + 0.35 * sin(pd * 1.6 - uTime * 5.0));
    float glow = swell;

    // Expanding shockwave rings from clicks
    for (int i = 0; i < ${RIPPLES}; i++) {
      vec3 r = uRipples[i];
      float age = uTime - r.z;
      if (age > 0.0 && age < 4.0) {
        float d = distance(p.xz, r.xy);
        float radius = age * 9.0;
        float ring = exp(-pow(d - radius, 2.0) * 0.18) * (1.0 - age / 4.0);
        w += ring * 1.5;
        glow += ring * 1.2;
      }
    }

    p.y += w;
    vHeight = w;
    vGlow = glow;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.2 + aRand * 1.6 + glow * 2.2) * uPixelRatio * (16.0 / -mv.z);
    vFade = clamp(1.0 - (-mv.z - 4.0) / 52.0, 0.0, 1.0);
    vSun = exp(-abs(p.x) * 0.09) * smoothstep(-6.0, -40.0, p.z);
  }
`;

const seaFragment = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uGlow;
  uniform vec3 uSun;
  varying float vHeight;
  varying float vFade;
  varying float vSun;
  varying float vGlow;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.1, d);
    vec3 c = mix(uDeep, uGlow, smoothstep(-1.2, 1.4, vHeight));
    c = mix(c, uSun, vSun * 0.75);
    c += vec3(0.6, 1.0, 0.95) * clamp(vGlow, 0.0, 1.0) * 0.6;
    gl_FragColor = vec4(c, a * vFade * (0.9 + vGlow * 0.5));
  }
`;

const starVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform float uAspect;
  attribute float aRand;
  varying float vPulse;
  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.6 + aRand * 6.2831) * 0.25;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vec2 ndc = gl_Position.xy / gl_Position.w;
    float md = length((ndc - uMouse) * vec2(uAspect, 1.0));
    float boost = smoothstep(0.45, 0.0, md);
    vPulse = 0.55 + 0.45 * sin(uTime * (0.8 + aRand) + aRand * 12.0) + boost * 1.2;
    gl_PointSize = (5.0 + aRand * 5.0) * (1.0 + boost * 1.4) * uPixelRatio * (14.0 / -mv.z);
  }
`;

const starFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vPulse;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float core = smoothstep(0.18, 0.0, d);
    float halo = smoothstep(0.5, 0.0, d) * 0.45;
    gl_FragColor = vec4(uColor, (core + halo) * vPulse);
  }
`;

const meteorVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const meteorFragment = /* glsl */ `
  uniform float uAlpha;
  varying vec2 vUv;
  void main() {
    float tail = pow(vUv.x, 2.5);
    float body = 1.0 - pow(abs(vUv.y - 0.5) * 2.0, 2.0);
    gl_FragColor = vec4(vec3(0.85, 1.0, 0.98), tail * body * uAlpha);
  }
`;

const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

const Hero3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
      mount.classList.add('no-webgl');
      return undefined;
    }

    const reduced = prefersReducedMotion();
    const small = window.innerWidth < 700;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 140);
    camera.position.set(0, 3.2, 12);

    const time = { value: 0 };
    const pr = { value: pixelRatio };

    /* ---- Sea ---- */
    const cols = small ? 110 : 170;
    const rows = small ? 60 : 90;
    const seaPos = new Float32Array(cols * rows * 3);
    const seaRand = new Float32Array(cols * rows);
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        seaPos[i * 3] = (c / (cols - 1) - 0.5) * 80;
        seaPos[i * 3 + 1] = -2.2;
        seaPos[i * 3 + 2] = 8 - (r / (rows - 1)) * 58;
        seaRand[i] = Math.random();
        i++;
      }
    }
    const seaGeo = new THREE.BufferGeometry();
    seaGeo.setAttribute('position', new THREE.BufferAttribute(seaPos, 3));
    seaGeo.setAttribute('aRand', new THREE.BufferAttribute(seaRand, 1));
    const ripples = Array.from({ length: RIPPLES }, () => new THREE.Vector3(0, 0, -100));
    const seaUniforms = {
      uTime: time,
      uPixelRatio: pr,
      uAmp: { value: reduced ? 1 : 0.15 },
      uPointer: { value: new THREE.Vector2(0, -12) },
      uPointerStrength: { value: 0 },
      uRipples: { value: ripples },
      uDeep: { value: new THREE.Color('#0d4a5c') },
      uGlow: { value: new THREE.Color('#45f0df') },
      uSun: { value: new THREE.Color('#ffb547') },
    };
    const seaMat = new THREE.ShaderMaterial({
      vertexShader: seaVertex,
      fragmentShader: seaFragment,
      uniforms: seaUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(seaGeo, seaMat));

    /* ---- Constellation: one star per student ---- */
    const sky = new THREE.Group();
    const n = batchSize;
    const starPos = new Float32Array(n * 3);
    const starRand = new Float32Array(n);
    const pts = [];
    for (let k = 0; k < n; k++) {
      const v = new THREE.Vector3((Math.random() - 0.5) * 30, 2 + Math.random() * 7, -4 - Math.random() * 20);
      pts.push(v);
      starPos.set([v.x, v.y, v.z], k * 3);
      starRand[k] = Math.random();
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('aRand', new THREE.BufferAttribute(starRand, 1));
    const starUniforms = {
      uTime: time,
      uPixelRatio: pr,
      uMouse: { value: new THREE.Vector2(9, 9) },
      uAspect: { value: 1 },
      uColor: { value: new THREE.Color('#d9fffb') },
    };
    const starMat = new THREE.ShaderMaterial({
      vertexShader: starVertex,
      fragmentShader: starFragment,
      uniforms: starUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    sky.add(new THREE.Points(starGeo, starMat));

    const seen = new Set();
    const linePos = [];
    pts.forEach((a, ai) => {
      pts
        .map((b, bi) => ({ bi, d: a.distanceToSquared(b) }))
        .filter((o) => o.bi !== ai)
        .sort((x, y) => x.d - y.d)
        .slice(0, 2)
        .forEach(({ bi }) => {
          const key = ai < bi ? `${ai}-${bi}` : `${bi}-${ai}`;
          if (seen.has(key)) return;
          seen.add(key);
          linePos.push(a.x, a.y, a.z, pts[bi].x, pts[bi].y, pts[bi].z);
        });
    });
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: '#45f0df', transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    sky.add(new THREE.LineSegments(lineGeo, lineMat));
    scene.add(sky);

    /* ---- Shooting stars ---- */
    const meteorGeo = new THREE.PlaneGeometry(1, 1);
    const meteors = [0, 1].map(() => {
      const mat = new THREE.ShaderMaterial({
        vertexShader: meteorVertex,
        fragmentShader: meteorFragment,
        uniforms: { uAlpha: { value: 0 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(meteorGeo, mat);
      mesh.scale.set(6, 0.06, 1);
      mesh.visible = false;
      scene.add(mesh);
      return { mesh, mat, start: new THREE.Vector3(), dir: new THREE.Vector3(), born: -1, life: 1.2 };
    });
    let nextMeteor = 2.5;
    const launchMeteor = (m, t) => {
      const side = Math.random() < 0.5 ? -1 : 1;
      m.start.set(-side * (8 + Math.random() * 14), 10 + Math.random() * 6, -30 - Math.random() * 10);
      m.dir.set(side, -0.35 - Math.random() * 0.2, 0).normalize();
      m.mesh.rotation.z = Math.atan2(m.dir.y, m.dir.x);
      m.born = t;
      m.life = 0.9 + Math.random() * 0.6;
      m.mesh.visible = true;
    };

    /* ---- Sizing ---- */
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w < 700 ? 70 : 55;
      camera.updateProjectionMatrix();
      starUniforms.uAspect.value = w / h;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    /* ---- Interaction ---- */
    const pointer = { x: 0, y: 0, ndcX: 9, ndcY: 9, moved: -10 };
    const eased = { x: 0, y: 0, s: 0, mx: 9, my: 9, strength: 0 };
    const raycaster = new THREE.Raycaster();
    const seaPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 2.2);
    const hit = new THREE.Vector3();
    const ndc = new THREE.Vector2();

    const toNdc = (e) => {
      const r = mount.getBoundingClientRect();
      return [((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1)];
    };

    const onPointer = (e) => {
      pointer.x = e.clientX / window.innerWidth - 0.5;
      pointer.y = e.clientY / window.innerHeight - 0.5;
      [pointer.ndcX, pointer.ndcY] = toNdc(e);
      pointer.moved = time.value;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    let rippleIndex = 0;
    const hero = mount.parentElement;
    const onDown = (e) => {
      if (e.target.closest('a, button')) return;
      const [x, y] = toNdc(e);
      ndc.set(x, y);
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(seaPlane, hit)) {
        ripples[rippleIndex].set(hit.x, hit.z, time.value);
        rippleIndex = (rippleIndex + 1) % RIPPLES;
      }
    };
    hero.addEventListener('pointerdown', onDown);

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(mount);

    const lookAt = new THREE.Vector3(0, 1.2, -8);
    const root = document.documentElement;
    let introStart = reduced ? -Infinity : null;
    let last = performance.now();
    let elapsed = 0;

    const render = (now) => {
      if (!visible || document.hidden) { last = now; return; }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!reduced) elapsed += dt;
      time.value = elapsed;

      // Intro dive starts once the curtain lifts
      if (introStart === null && root.classList.contains('is-loaded')) introStart = now;
      const intro = introStart === null ? 0 : easeOutQuint(Math.min(1, (now - introStart) / 2800));
      const lift = 1 - intro;
      seaUniforms.uAmp.value = 0.15 + 0.85 * intro;

      const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
      eased.x += (pointer.x - eased.x) * 0.04;
      eased.y += (pointer.y - eased.y) * 0.04;
      eased.s += (scroll - eased.s) * 0.1;
      eased.mx += (pointer.ndcX - eased.mx) * 0.12;
      eased.my += (pointer.ndcY - eased.my) * 0.12;

      camera.position.x = eased.x * 3.2;
      camera.position.y = 3.2 - eased.y * 1.6 + eased.s * 2.5 + lift * 16;
      camera.position.z = 12 - eased.s * 4 + lift * 10;
      lookAt.y = 1.2 - eased.s * 1.5 + lift * 9;
      camera.lookAt(lookAt);
      camera.rotation.z += lift * 0.25;

      // Pointer swell follows the cursor and fades after it stops moving
      const active = elapsed - pointer.moved < 1.4 ? 1 : 0;
      eased.strength += (active - eased.strength) * 0.05;
      seaUniforms.uPointerStrength.value = eased.strength * intro;
      ndc.set(eased.mx, eased.my);
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(seaPlane, hit)) {
        seaUniforms.uPointer.value.set(hit.x, hit.z);
      }
      starUniforms.uMouse.value.set(eased.mx, eased.my);

      // Shooting stars
      if (!reduced) {
        if (elapsed > nextMeteor) {
          const free = meteors.find((m) => !m.mesh.visible);
          if (free) launchMeteor(free, elapsed);
          nextMeteor = elapsed + 2.5 + Math.random() * 4;
        }
        meteors.forEach((m) => {
          if (!m.mesh.visible) return;
          const age = (elapsed - m.born) / m.life;
          if (age >= 1) { m.mesh.visible = false; return; }
          m.mesh.position.copy(m.start).addScaledVector(m.dir, age * 26);
          m.mat.uniforms.uAlpha.value = Math.sin(age * Math.PI);
        });
      }

      sky.rotation.y = elapsed * 0.02 + eased.x * 0.15;
      renderer.render(scene, camera);
    };
    const off = onFrame(render);
    render(performance.now());

    return () => {
      off();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      hero.removeEventListener('pointerdown', onDown);
      [seaGeo, starGeo, lineGeo, meteorGeo].forEach((g) => g.dispose());
      [seaMat, starMat, lineMat, ...meteors.map((m) => m.mat)].forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="hero-canvas" ref={mountRef} aria-hidden="true" />;
};

export default Hero3D;
