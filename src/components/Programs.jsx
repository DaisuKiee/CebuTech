import React from 'react';
import { programs } from '../data/content';
import { useReveal, useTilt } from '../lib/motion';

const ProgramCard = ({ program, index }) => {
  const tilt = useTilt({ max: 12 });
  const Icon = program.icon;
  return (
    <article
      ref={tilt}
      className="program-card tilt"
      style={{ '--i': index, '--hue': program.hue }}
    >
      <div className="tilt-inner">
        <div className="program-icon"><Icon size={28} strokeWidth={1.75} /></div>
        <h3 className="program-title">{program.title}</h3>
        <p className="program-description">{program.description}</p>
        <span className="glare" aria-hidden="true" />
      </div>
    </article>
  );
};

const Programs = () => {
  const reveal = useReveal();
  return (
    <section id="programs" className="section programs" ref={reveal}>
      <div className="container">
        <header className="section-head">
          <h2 className="section-title split-up">Academic programs</h2>
          <p className="section-subtitle fade-up">
            The disciplines our campus offers, and the ones our batch grows alongside.
          </p>
        </header>
        <div className="programs-grid">
          {programs.map((p, i) => <ProgramCard key={p.title} program={p} index={i} />)}
        </div>
      </div>
    </section>
  );
};

export default Programs;
