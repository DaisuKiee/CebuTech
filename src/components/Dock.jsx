import React, { useEffect, useRef, useState } from 'react';
import { House, GraduationCap, Users, Rocket, Route, Info, ArrowUp } from 'lucide-react';
import { onFrame, scrollToTarget } from '../lib/motion';

const sections = [
  { id: 'hero', label: 'Home', icon: House },
  { id: 'programs', label: 'Programs', icon: GraduationCap },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'projects', label: 'Projects', icon: Rocket },
  { id: 'journey', label: 'Journey', icon: Route },
  { id: 'about', label: 'About', icon: Info },
];

const RING = 2 * Math.PI * 17;

/*
 * Floating section dock. The top navbar scrolls away with the page, so once
 * the hero is behind you this dock slides up: it shows where you are, lets you
 * jump anywhere, and its ring fills as you read down the page.
 */
const Dock = () => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState('hero');
  const ringRef = useRef(null);

  useEffect(() => {
    let lastShow = null;
    let lastP = -1;
    const off = onFrame(() => {
      const y = window.scrollY;
      const s = y > window.innerHeight * 0.75;
      if (s !== lastShow) {
        lastShow = s;
        setShow(s);
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, y / max) : 0;
      if (Math.abs(p - lastP) > 0.001 && ringRef.current) {
        lastP = p;
        ringRef.current.style.strokeDashoffset = (RING * (1 - p)).toFixed(2);
      }
    });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      off();
      io.disconnect();
    };
  }, []);

  return (
    <nav className={`dock ${show ? 'is-shown' : ''}`} aria-label="Sections" aria-hidden={!show}>
      <div className="dock-items">
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`dock-item ${active === id ? 'is-active' : ''}`}
            onClick={() => scrollToTarget(id)}
            aria-label={label}
            aria-current={active === id ? 'true' : undefined}
            tabIndex={show ? 0 : -1}
          >
            <Icon size={18} strokeWidth={1.9} />
            <span className="dock-label">{label}</span>
          </button>
        ))}
      </div>
      <button className="dock-top" onClick={() => scrollToTarget(0)} aria-label="Back to top" tabIndex={show ? 0 : -1}>
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="17" className="dock-ring-bg" />
          <circle cx="20" cy="20" r="17" className="dock-ring" ref={ringRef} strokeDasharray={RING} strokeDashoffset={RING} />
        </svg>
        <ArrowUp size={16} />
      </button>
    </nav>
  );
};

export default Dock;
