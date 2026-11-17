import React, { useEffect, useRef } from 'react';
import { onFrame, prefersReducedMotion } from '../lib/motion';

/*
 * A glowing ring that trails the pointer. It grows over interactive things and,
 * over anything with a data-cursor attribute, turns into a label ("View", "Flip").
 * It also stretches slightly in the direction of fast movement.
 */
const Cursor = () => {
  const ref = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || prefersReducedMotion()) {
      el.style.display = 'none';
      return undefined;
    }
    document.documentElement.classList.add('has-cursor');
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let label = '';

    const move = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.classList.add('is-visible');
      const t = e.target.closest ? e.target : null;
      const labelled = t && t.closest('[data-cursor]');
      const next = labelled ? labelled.getAttribute('data-cursor') : '';
      if (next !== label) {
        label = next;
        if (next) labelRef.current.textContent = next;
        el.classList.toggle('is-label', !!next);
      }
      const hot = !next && t && t.closest('a, button, [role="button"], input, .tilt');
      el.classList.toggle('is-hot', !!hot);
    };
    const down = () => el.classList.add('is-down');
    const up = () => el.classList.remove('is-down');
    const leave = () => el.classList.remove('is-visible');
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('pointerleave', leave);

    const off = onFrame(() => {
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      pos.x += dx * 0.2;
      pos.y += dy * 0.2;
      const speed = Math.min(Math.hypot(dx, dy) / 400, 0.35);
      const angle = Math.atan2(dy, dx);
      el.style.transform =
        `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0) rotate(${angle.toFixed(3)}rad) scale(${(1 + speed).toFixed(3)}, ${(1 - speed * 0.6).toFixed(3)}) rotate(${(-angle).toFixed(3)}rad)`;
    });
    return () => {
      off();
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor-ring" />
      <span className="cursor-label" ref={labelRef} />
    </div>
  );
};

export default Cursor;
