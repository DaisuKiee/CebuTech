import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { batchSize } from '../data/students';
import { onFrame, prefersReducedMotion, scrollToTarget, useMagnetic } from '../lib/motion';

// three.js is loaded in its own chunk so the page paints before the 3D scene arrives.
const Hero3D = lazy(() => import('./Hero3D'));

const word = 'CebuTech';

const Hero = () => {
  const sectionRef = useRef(null);
  const charsRef = useRef([]);
  const primary = useMagnetic(0.25);
  const secondary = useMagnetic(0.25);
  const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  // Scroll-linked exit: the copy drifts up and fades as the sea takes over.
  useEffect(() => {
    const el = sectionRef.current;
    let last = -1;
    return onFrame(() => {
      const p = Math.min(window.scrollY / window.innerHeight, 1);
      if (p === last) return;
      last = p;
      el.style.setProperty('--hero-p', p.toFixed(4));
    });
  }, []);

  // Letters rise and glow as the pointer gets close to them.
  useEffect(() => {
    if (!canHover || prefersReducedMotion()) return undefined;
    const chars = charsRef.current.filter(Boolean);
    const lift = chars.map(() => 0);
    const pointer = { x: -9999, y: -9999 };
    let idle = true;
    const move = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      idle = false;
    };
    window.addEventListener('pointermove', move, { passive: true });
    const off = onFrame(() => {
      if (idle || window.scrollY > window.innerHeight) return;
      let settled = true;
      chars.forEach((el, i) => {
        const r = el.parentElement.getBoundingClientRect();
        const dx = pointer.x - (r.left + r.width / 2);
        const dy = pointer.y - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy);
        const target = Math.max(0, 1 - d / 260);
        lift[i] += (target - lift[i]) * 0.14;
        if (Math.abs(target - lift[i]) > 0.002) settled = false;
        const v = lift[i];
        el.style.transform = `translate3d(0, ${(-v * 0.12).toFixed(3)}em, 0) rotate(${(-dx / 260 * v * 6).toFixed(2)}deg) scale(${(1 + v * 0.06).toFixed(3)})`;
        el.style.filter = v > 0.02 ? `drop-shadow(0 0 ${(v * 28).toFixed(1)}px rgba(69,240,223,${(v * 0.55).toFixed(2)}))` : '';
      });
      if (settled) idle = true;
    });
    return () => {
      off();
      window.removeEventListener('pointermove', move);
    };
  }, [canHover]);

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <div className="hero-sun" aria-hidden="true" />
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-content">
        <p className="hero-badge">
          <span className="pulse-dot" />
          BSIT Batch 2023–2027, CTU Daanbantayan
        </p>

        <h1 className="hero-title" aria-label={word}>
          {word.split('').map((ch, i) => (
            <span className="char" key={i} style={{ '--i': i }} aria-hidden="true">
              <span className="char-inner" ref={(el) => (charsRef.current[i] = el)}>{ch}</span>
            </span>
          ))}
        </h1>

        <p className="hero-subtitle">
          {batchSize} students building software from the northern tip of Cebu.
          Every star above the water is one of us.
        </p>

        <div className="hero-actions">
          <button ref={primary} className="btn btn-primary" onClick={() => scrollToTarget('projects')}>
            See our projects
          </button>
          <button ref={secondary} className="btn btn-ghost" onClick={() => scrollToTarget('students')}>
            Meet the batch
          </button>
        </div>
      </div>

      <p className="hero-hint" aria-hidden="true">
        {canHover ? 'Click the sea to make a wave' : 'Tap the sea to make a wave'}
      </p>

      <button className="hero-scroll" onClick={() => scrollToTarget('programs')} aria-label="Scroll to programs">
        <ArrowDown size={18} />
      </button>
    </section>
  );
};

export default Hero;
