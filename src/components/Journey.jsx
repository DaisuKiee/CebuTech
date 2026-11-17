import React, { useEffect, useRef, useState } from 'react';
import { batchSize } from '../data/students';
import { projects } from '../data/content';
import { onFrame, prefersReducedMotion, useReveal } from '../lib/motion';

const START = new Date('2023-08-01').getTime();
const END = new Date('2027-06-30').getTime();
const years = [2023, 2024, 2025, 2026, 2027];

const CountUp = ({ to, run }) => {
  const [value, setValue] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!run || done.current) return undefined;
    done.current = true;
    if (prefersReducedMotion()) {
      setValue(to);
      return undefined;
    }
    const t0 = performance.now();
    const dur = 1600;
    const off = onFrame((now) => {
      const t = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(eased * to));
      if (t === 1) off();
    });
    return off;
  }, [run, to]);
  return <>{value}</>;
};

const stats = [
  { value: batchSize, label: 'Students', note: 'BSIT students who care about tech and building things.' },
  { value: projects.length, label: 'Projects shipped', note: 'Live web apps, plus hackathons and competitions along the way.' },
  { value: 4, label: 'Years together', note: 'Started in 2023, graduating in 2027.' },
];

const Journey = () => {
  const ref = useReveal({ threshold: 0.25 });
  const [run, setRun] = useState(false);
  const now = Math.min(1, Math.max(0, (Date.now() - START) / (END - START)));

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setRun(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return (
    <section id="journey" className="section journey" ref={ref}>
      <div className="container">
        <header className="section-head">
          <h2 className="section-title split-up">Where we are</h2>
          <p className="section-subtitle fade-up">
            {Math.round(now * 100)}% of the way from our first day to graduation.
          </p>
        </header>

        <div className="timeline" style={{ '--now': now }}>
          <div className="timeline-rail">
            <span className="timeline-fill" />
            <span className="timeline-now" aria-hidden="true" />
          </div>
          <ol className="timeline-years">
            {years.map((y, i) => (
              <li key={y} style={{ '--i': i }} className={y <= new Date().getFullYear() ? 'past' : ''}>
                {y}
              </li>
            ))}
          </ol>
        </div>

        <div className="stats">
          {stats.map((s, i) => (
            <div className="stat" key={s.label} style={{ '--i': i }}>
              <p className="stat-value"><CountUp to={s.value} run={run} /></p>
              <h3 className="stat-label">{s.label}</h3>
              <p className="stat-note">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
