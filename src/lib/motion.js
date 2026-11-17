import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/* ------------------------------------------------------------------ */
/*  One shared animation loop. Everything that moves per-frame         */
/*  (smooth scroll, scroll-linked effects, tilt easing) subscribes     */
/*  here so the page only ever runs a single requestAnimationFrame.    */
/* ------------------------------------------------------------------ */

const subscribers = new Set();
let rafId = null;
let lenis = null;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lastY = 0;
let velocity = 0;

const loop = (time) => {
  if (lenis) lenis.raf(time);
  const y = window.scrollY;
  // px per frame, lightly smoothed so effects don't jitter
  velocity += (y - lastY - velocity) * 0.35;
  lastY = y;
  subscribers.forEach((fn) => fn(time));
  rafId = requestAnimationFrame(loop);
};

/** Current scroll velocity in px/frame (positive = scrolling down). */
export const getVelocity = () => velocity;

export const stopScroll = () => lenis && lenis.stop();
export const startScroll = () => lenis && lenis.start();

export const startLoop = () => {
  if (rafId == null) rafId = requestAnimationFrame(loop);
};

export const onFrame = (fn) => {
  subscribers.add(fn);
  startLoop();
  return () => subscribers.delete(fn);
};

export const initSmoothScroll = () => {
  if (lenis || prefersReducedMotion()) return () => {};
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
  document.documentElement.classList.add('lenis');
  startLoop();
  return () => {
    lenis.destroy();
    lenis = null;
    document.documentElement.classList.remove('lenis');
  };
};

export const scrollToTarget = (target, opts = {}) => {
  const el = typeof target === 'string' ? document.getElementById(target) : target;
  const dest = el ?? 0;
  if (lenis) lenis.scrollTo(dest, { offset: 0, ...opts });
  else if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  else window.scrollTo({ top: 0, behavior: opts.immediate ? 'auto' : 'smooth' });
};

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

/** Adds `is-in` to the element (and keeps it) once it enters the viewport. */
export const useReveal = (options = {}) => {
  const ref = useRef(null);
  const { threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = options;
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return ref;
};

/**
 * Calls `cb(progress, rect)` every frame while the element is near the viewport.
 * progress: 0 when the element's top hits the bottom of the viewport,
 *           1 when its bottom leaves the top.
 */
export const useScrollProgress = (cb, deps = []) => {
  const ref = useRef(null);
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let visible = false;
    let last = -1;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: '20% 0px' });
    io.observe(el);
    const off = onFrame(() => {
      if (!visible) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - rect.top) / (rect.height + vh)));
      if (Math.abs(p - last) < 0.0005) return;
      last = p;
      cbRef.current(p, rect, vh);
    });
    return () => { off(); io.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
};

/**
 * Pointer-driven 3D tilt with eased motion. Writes CSS variables
 * --rx, --ry (degrees), --mx, --my (percent, for glare/spotlight).
 */
export const useTilt = ({ max = 10 } = {}) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return undefined;
    const target = { rx: 0, ry: 0, mx: 50, my: 50 };
    const cur = { ...target };
    let active = false;
    let off = null;

    const tick = () => {
      let settled = true;
      for (const k of ['rx', 'ry', 'mx', 'my']) {
        cur[k] += (target[k] - cur[k]) * 0.12;
        if (Math.abs(target[k] - cur[k]) > 0.01) settled = false;
      }
      el.style.setProperty('--rx', `${cur.rx.toFixed(2)}deg`);
      el.style.setProperty('--ry', `${cur.ry.toFixed(2)}deg`);
      el.style.setProperty('--mx', `${cur.mx.toFixed(1)}%`);
      el.style.setProperty('--my', `${cur.my.toFixed(1)}%`);
      if (settled && !active && off) { off(); off = null; }
    };
    const wake = () => { if (!off) off = onFrame(tick); };

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      target.ry = (x - 0.5) * 2 * max;
      target.rx = -(y - 0.5) * 2 * max;
      target.mx = x * 100;
      target.my = y * 100;
      wake();
    };
    const enter = () => { active = true; el.classList.add('is-hover'); wake(); };
    const leave = () => {
      active = false;
      el.classList.remove('is-hover');
      Object.assign(target, { rx: 0, ry: 0, mx: 50, my: 50 });
      wake();
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
      if (off) off();
    };
  }, [max]);
  return ref;
};

/** Pulls an element slightly toward the pointer (for buttons). */
export const useMagnetic = (strength = 0.3) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return undefined;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    };
    const leave = () => { el.style.transform = ''; };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);
  return ref;
};
