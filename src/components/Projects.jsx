import React, { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { projects } from '../data/content';
import { onFrame, prefersReducedMotion, useReveal } from '../lib/motion';

/*
 * Pinned horizontal gallery on wide screens: vertical scroll drives the track
 * sideways, and each card turns in 3D depending on its distance from centre.
 * On narrow screens it falls back to a native swipeable row.
 */
const Projects = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headRef = useReveal();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const cards = [...track.querySelectorAll('.project-card')];
    const mq = window.matchMedia('(min-width: 900px)');
    let distance = 0;
    let pinned = false;
    let current = 0;

    const measure = () => {
      pinned = mq.matches && !prefersReducedMotion();
      section.classList.toggle('is-pinned', pinned);
      if (!pinned) {
        section.style.height = '';
        track.style.transform = '';
        cards.forEach((c) => c.style.removeProperty('--turn'));
        return;
      }
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `${distance + window.innerHeight}px`;
    };
    measure();
    window.addEventListener('resize', measure);
    mq.addEventListener('change', measure);

    const off = onFrame(() => {
      if (!pinned) return;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < -50 || rect.top > window.innerHeight + 50) return;
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const target = -p * distance;
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.05) current = target;
      track.style.transform = `translate3d(${current.toFixed(2)}px,0,0)`;
      section.style.setProperty('--progress', p.toFixed(4));

      const mid = window.innerWidth / 2;
      cards.forEach((c) => {
        const r = c.getBoundingClientRect();
        const d = (r.left + r.width / 2 - mid) / window.innerWidth;
        c.style.setProperty('--turn', Math.max(-1, Math.min(1, d)).toFixed(3));
      });
    });

    return () => {
      off();
      window.removeEventListener('resize', measure);
      mq.removeEventListener('change', measure);
    };
  }, []);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="projects-sticky">
        <div className="container">
          <header className="section-head" ref={headRef}>
            <h2 className="section-title split-up">What we've shipped</h2>
            <p className="section-subtitle fade-up">Real projects, live on the web, from first year to now.</p>
          </header>
        </div>

        <div className="projects-viewport">
          <ol className="projects-track" ref={trackRef}>
            {projects.map((p) => (
              <li className="project-card" key={p.title}>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link" data-cursor="View">
                  <div className="project-media">
                    <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" />
                    <span className="project-open">
                      <ExternalLink size={16} /> Open project
                    </span>
                  </div>
                  <div className="project-body">
                    <p className="project-year">{p.year}</p>
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-description">{p.description}</p>
                    <ul className="project-tags">
                      {p.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div className="projects-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
};

export default Projects;
