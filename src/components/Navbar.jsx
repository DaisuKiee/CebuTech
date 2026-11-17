import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToTarget } from '../lib/motion';

const links = [
  { id: 'hero', label: 'Home' },
  { id: 'programs', label: 'Programs' },
  { id: 'students', label: 'Students' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'about', label: 'About' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id) => {
    setOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      scrollToTarget(id);
    }
  };

  return (
    <>
      <nav className={`navbar ${open ? 'is-open' : ''}`} aria-label="Main">
        <button className="navbar-logo" onClick={() => go('hero')}>
          <img src="/img/ctulogo.png" alt="" className="logo-image" />
          <span className="logo-text">CebuTech</span>
        </button>

        <div className="navbar-links">
          {links.map((l) => (
            <button key={l.id} onClick={() => go(l.id)} className="nav-link">
              <span className="roll">
                <span data-text={l.label}>{l.label}</span>
              </span>
            </button>
          ))}
        </div>

        <button
          className="menu-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="mobile-menu-content">
          {links.map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="mobile-nav-link"
              style={{ '--i': i }}
              tabIndex={open ? 0 : -1}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
