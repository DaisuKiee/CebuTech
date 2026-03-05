import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = ({ scrollY }) => {
  const [isVisible, setIsVisible] = useState(false);
  const parallaxOffset = scrollY * 0.5;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div 
        className="hero-background"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          backgroundImage: 'url(/img/ctu.jpg)'
        }}
      />
      <div className="hero-overlay" />
      
      <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
        <div className="hero-badge">
          <Sparkles size={16} />
          <span>Batch 2023–2027</span>
        </div>
        
        <h1 className="hero-title">CebuTech</h1>
        
        <p className="hero-subtitle">
          Showcasing the journey of innovators, thinkers, and future tech leaders from Batch 2023–2027
        </p>
        
        <div className="hero-buttons">
          <button className="btn-primary">
            Explore Our Journey
            <ArrowRight size={20} />
          </button>
          <button className="btn-secondary">
            View Programs
          </button>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
