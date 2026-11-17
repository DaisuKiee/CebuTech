import React, { useEffect, useRef } from 'react';
import { programs, projects } from '../data/content';
import { getVelocity, onFrame, prefersReducedMotion } from '../lib/motion';

/*
 * Two marquee bands crossing in 3D. They drift on their own, speed up with
 * scroll velocity, lean (skew) into fast scrolls, and reverse direction when
 * the visitor scrolls back up.
 */
const bandA = [...programs.map((p) => p.title), 'Daanbantayan, Cebu', 'Batch 2023–2027'];
const bandB = projects.map((p) => p.title);

const Star = () => (
  <svg viewBox="0 0 24 24" className="band-star" aria-hidden="true">
    <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z" />
  </svg>
);

const Track = ({ items, trackRef }) => (
  <div className="band-track" ref={trackRef}>
    {[0, 1].map((copy) => (
      <div className="band-group" key={copy} aria-hidden={copy === 1}>
        {[...items, ...items].map((t, i) => (
          <span className="band-item" key={i}>
            {t}
            <Star />
          </span>
        ))}
      </div>
    ))}
  </div>
);

const Bands = () => {
  const sectionRef = useRef(null);
  const aRef = useRef(null);
  const bRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const section = sectionRef.current;
    const tracks = [
      { el: aRef.current, x: 0, dir: -1 },
      { el: bRef.current, x: 0, dir: 1 },
    ];
    let visible = false;
    let sign = 1;
    let skew = 0;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: '10% 0px' });
    io.observe(section);

    const off = onFrame(() => {
      if (!visible) return;
      const v = getVelocity();
      if (Math.abs(v) > 0.5) sign = v > 0 ? 1 : -1;
      const speed = 0.6 + Math.min(Math.abs(v), 60) * 0.35;
      skew += (Math.max(-10, Math.min(10, v * 0.25)) - skew) * 0.12;
      tracks.forEach((t) => {
        const half = t.el.scrollWidth / 2;
        t.x += speed * t.dir * sign;
        if (t.x <= -half) t.x += half;
        if (t.x > 0) t.x -= half;
        t.el.style.transform = `translate3d(${t.x.toFixed(2)}px,0,0) skewX(${(-skew * t.dir).toFixed(2)}deg)`;
      });
    });
    return () => {
      off();
      io.disconnect();
    };
  }, []);

  return (
    <div className="bands" ref={sectionRef} aria-hidden="true">
      <div className="band band-a">
        <Track items={bandA} trackRef={aRef} />
      </div>
      <div className="band band-b">
        <Track items={bandB} trackRef={bRef} />
      </div>
    </div>
  );
};

export default Bands;
