import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Facebook, Search } from 'lucide-react';
import { leaders, classmates, batchSize } from '../data/students';
import { useReveal, useTilt } from '../lib/motion';

const initials = (name) =>
  name
    .replace(/[^A-Za-zÀ-ÿ\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .filter((w, i, a) => i === 0 || i === a.length - 1)
    .map((w) => w[0])
    .join('');

const hueOf = (name) => [...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);

const LeaderCard = ({ student, index }) => {
  const tilt = useTilt({ max: 8 });
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);

  return (
    <article className="student" style={{ '--i': index }}>
      <div
        ref={tilt}
        className={`student-card tilt ${flipped ? 'is-flipped' : ''}`}
        tabIndex={0}
        role="button"
        data-cursor="Flip"
        aria-pressed={flipped}
        aria-label={`Flip ${student.name}'s card`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <div className="tilt-inner">
          <div className="flipper">
            <div className="face front">
              <img src={student.front} alt={student.name} loading="lazy" />
            </div>
            <div className="face back">
              <img src={student.back} alt="" loading="lazy" />
              <span className="holo" aria-hidden="true" />
              <div className="back-caption">
                <strong>{student.name}</strong>
                <span>{student.role}</span>
              </div>
            </div>
          </div>
          <span className="glare" aria-hidden="true" />
        </div>
      </div>
      <div className="student-meta">
        <h3 className="student-name">{student.name}</h3>
        <div className="student-socials">
          {student.github && (
            <a href={student.github} target="_blank" rel="noopener noreferrer" aria-label={`${student.name} on GitHub`}>
              <Github size={16} />
            </a>
          )}
          {student.facebook && (
            <a href={student.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${student.name} on Facebook`}>
              <Facebook size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const Classmates = () => {
  const [query, setQuery] = useState('');
  const reveal = useReveal({ threshold: 0.05 });
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? classmates.filter((s) => s.name.toLowerCase().includes(q)) : classmates;
  }, [query]);

  return (
    <div className="classmates" ref={reveal}>
      <div className="classmates-head">
        <h3 className="classmates-title">The rest of the batch</h3>
        <label className="search">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            placeholder="Find a classmate"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Find a classmate by name"
          />
        </label>
      </div>
      {list.length === 0 ? (
        <p className="empty">No one in the batch matches "{query}". Try a first or last name.</p>
      ) : (
        <ul className="classmates-grid">
          {list.map((s, i) => (
            <li key={s.name} className="classmate" style={{ '--i': Math.min(i, 20), '--hue': hueOf(s.name) }}>
              <span className="avatar" aria-hidden="true">{initials(s.name)}</span>
              <span className="classmate-name">{s.name}</span>
              <a href={s.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} on Facebook`}>
                <Facebook size={14} />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Students = ({ full = false }) => {
  const reveal = useReveal({ threshold: 0.08 });
  const navigate = useNavigate();

  return (
    <section id="students" className="section students">
      <div className="container">
        <div ref={reveal}>
          {!full && (
            <header className="section-head">
              <h2 className="section-title split-up">The batch</h2>
              <p className="section-subtitle fade-up">
                Our class leaders. Hover or tap a card to see the other side.
              </p>
            </header>
          )}
          <div className="students-grid">
            {leaders.map((s, i) => (
              <LeaderCard key={s.name} student={s} index={i} />
            ))}
          </div>
        </div>

        {full ? (
          <Classmates />
        ) : (
          <div className="students-more">
            <button className="btn btn-ghost" onClick={() => navigate('/students')}>
              See all {batchSize} students
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Students;
