import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = ({ scrollY }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrolled = scrollY > 50;
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId) => {
    setMobileMenuOpen(false); // Close mobile menu
    
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
    setMobileMenuOpen(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <div className="logo-icon">
              <img src="/img/ctulogo.png" alt="CTU Logo" className="logo-image" />
            </div>
            <span className="logo-text">CebuTech</span>
          </div>

          <div className="navbar-links desktop-only">
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

          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <button onClick={() => handleNavigation('hero')} className="mobile-nav-link">
            Home
          </button>
          <button onClick={() => handleNavigation('programs')} className="mobile-nav-link">
            Programs
          </button>
          <button onClick={() => handleNavigation('projects')} className="mobile-nav-link">
            Projects
          </button>
          <button onClick={() => handleNavigation('batch-info')} className="mobile-nav-link">
            Batch Info
          </button>
          <button onClick={() => handleNavigation('about')} className="mobile-nav-link">
            About
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
