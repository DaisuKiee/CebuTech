import React, { useEffect, useRef, useState } from 'react';
import { initSmoothScroll, onFrame, prefersReducedMotion, startScroll, stopScroll } from '../lib/motion';

/*
 * First-load sequence: a counter runs to 100, then two curtains lift away and
 * the page (and the 3D camera dive in the hero) starts. Kept short on purpose.
 */
const DURATION = 1300;

const Intro = () => {
  const [stage, setStage] = useState('count'); // count → leave → done
  const countRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const htmlLoader = document.getElementById('loading-screen');
    if (htmlLoader) htmlLoader.remove();

    if (prefersReducedMotion()) {
      root.classList.add('is-loaded');
      setStage('done');
      return undefined;
    }

    initSmoothScroll(); // idempotent; must exist before we can pause it
    stopScroll();
    const t0 = performance.now();
    let leaveTimer;
    let doneTimer;
    const off = onFrame((now) => {
      const t = Math.min(1, (now - t0) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      if (countRef.current) countRef.current.textContent = String(Math.round(eased * 100)).padStart(3, '0');
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (t === 1) {
        off();
        leaveTimer = setTimeout(() => {
          setStage('leave');
          root.classList.add('is-loaded');
          startScroll();
          doneTimer = setTimeout(() => setStage('done'), 1300);
        }, 120);
      }
    });
    return () => {
      off();
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
      startScroll();
    };
  }, []);

  if (stage === 'done') return null;

  return (
    <div className={`intro ${stage === 'leave' ? 'is-leaving' : ''}`} aria-hidden="true">
      <div className="intro-panel intro-panel-back" />
      <div className="intro-panel intro-panel-front">
        <div className="intro-inner">
          <img src="/img/ctulogo.png" alt="" className="intro-logo" />
          <p className="intro-word">
            {'CebuTech'.split('').map((c, i) => (
              <span key={i} style={{ '--i': i }}>{c}</span>
            ))}
          </p>
          <div className="intro-meter">
            <span className="intro-bar" ref={barRef} />
          </div>
          <p className="intro-count" ref={countRef}>000</p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
