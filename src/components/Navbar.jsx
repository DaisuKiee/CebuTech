import React from 'react';
import { Layers } from 'lucide-react';

const Navbar = ({ scrollY }) => {
  const scrolled = scrollY > 50;

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <div className="logo-icon">
            <Layers size={28} strokeWidth={2.5} />
          </div>
          <span className="logo-text">CebuTech</span>
        </div>

        <div className="navbar-links">
          <button onClick={() => scrollToSection('hero')} className="nav-link">
            Home
          </button>
          <button onClick={() => scrollToSection('programs')} className="nav-link">
            Programs
          </button>
          <button onClick={() => scrollToSection('batch-info')} className="nav-link">
            Batch Info
          </button>
          <button onClick={() => scrollToSection('about')} className="nav-link">
            About
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
