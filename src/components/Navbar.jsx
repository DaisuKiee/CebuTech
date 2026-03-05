import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ scrollY }) => {
  const scrolled = scrollY > 50;
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">
            <img src="/img/ctulogo.png" alt="CTU Logo" className="logo-image" />
          </div>
          <span className="logo-text">CebuTech</span>
        </div>

        <div className="navbar-links">
          <button onClick={() => handleNavigation('hero')} className="nav-link">
            Home
          </button>
          <button onClick={() => handleNavigation('programs')} className="nav-link">
            Programs
          </button>
          <button onClick={() => handleNavigation('projects')} className="nav-link">
            Projects
          </button>
          <button onClick={() => handleNavigation('batch-info')} className="nav-link">
            Batch Info
          </button>
          <button onClick={() => handleNavigation('about')} className="nav-link">
            About
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
