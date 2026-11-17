import React, { useRef } from 'react';
import { useScrollProgress } from '../lib/motion';

const text =
  "We are BSIT students from Cebu Technological University, Daanbantayan Campus. This site follows our batch through four years of classes, projects, and late nights. Together we're building the future of technology in the Philippines, one project at a time.";

const words = text.split(' ');

const About = () => {
  const wordsRef = useRef([]);
  const bgRef = useRef(null);

  // Words light up one by one as the section scrolls through the viewport.
  const sectionRef = useScrollProgress((p) => {
    const lit = Math.max(0, Math.min(1, (p - 0.15) / 0.45)) * words.length;
    wordsRef.current.forEach((w, i) => {
      if (!w) return;
      const v = Math.max(0.14, Math.min(1, lit - i + 1));
      w.style.opacity = v.toFixed(3);
    });
    if (bgRef.current) {
      bgRef.current.style.transform = `translate3d(0, ${((p - 0.5) * 18).toFixed(2)}%, 0) scale(1.15)`;
    }
  });

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-bg" ref={bgRef} style={{ backgroundImage: 'url(/img/ctu.png)' }} aria-hidden="true" />
      <div className="about-shade" aria-hidden="true" />
      <div className="container about-inner">
        <h2 className="about-label">About us</h2>
        <p className="about-text">
          {words.map((w, i) => (
            <span key={i} ref={(el) => (wordsRef.current[i] = el)} className="about-word">
              {w}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default About;
