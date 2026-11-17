import React from 'react';
import { Github } from 'lucide-react';
import { scrollToTarget, useReveal } from '../lib/motion';

const Footer = () => {
  const ref = useReveal({ threshold: 0.2 });
  return (
    <footer className="footer" ref={ref}>
      <div className="container">
        <p className="footer-wordmark" aria-hidden="true">
          {'CebuTech'.split('').map((c, i) => (
            <span key={i} style={{ '--i': i }}>{c}</span>
          ))}
        </p>
        <div className="footer-row">
          <p>© {new Date().getFullYear()} CebuTech, BSIT Batch 2023–2027.</p>
          <div className="footer-links">
            <a href="https://github.com/DaisuKiee/CebuTech" target="_blank" rel="noopener noreferrer">
              <Github size={16} /> Source on GitHub
            </a>
            <button onClick={() => scrollToTarget(0)}>Back to top</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
