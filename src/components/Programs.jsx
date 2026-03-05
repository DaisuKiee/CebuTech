import React, { useEffect, useRef, useState } from 'react';
import { Laptop, Wrench, Server, Palette } from 'lucide-react';

const programsData = [
  {
    id: 1,
    title: 'Computer Science',
    icon: Laptop,
    description: 'Dive deep into algorithms, software engineering, and computational theory.',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 2,
    title: 'Engineering',
    icon: Wrench,
    description: 'Build innovative solutions through practical engineering principles.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: 'Information Technology',
    icon: Server,
    description: 'Master modern IT systems, networks, and digital infrastructure.',
    gradient: 'from-indigo-500 to-cyan-500'
  },
  {
    id: 4,
    title: 'Multimedia Arts',
    icon: Palette,
    description: 'Create stunning digital content through design and creativity.',
    gradient: 'from-pink-500 to-purple-500'
  }
];

const Programs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="programs" className="programs-section" ref={sectionRef}>
      <div className="programs-banner">
        <div className="programs-banner-overlay" />
      </div>

      <div className="programs-container">
        <div className={`programs-header ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">Our Academic Programs</h2>
          <p className="section-subtitle">
            Empowering the next generation through diverse tech-focused disciplines
          </p>
        </div>

        <div className={`programs-grid ${isVisible ? 'visible' : ''}`}>
          {programsData.map((program, index) => {
            const IconComponent = program.icon;
            return (
              <div 
                key={program.id} 
                className="program-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`program-gradient bg-gradient-to-br ${program.gradient}`} />
                <div className="program-icon">
                  <IconComponent size={32} strokeWidth={2} />
                </div>
                <h3 className="program-title">{program.title}</h3>
                <p className="program-description">{program.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Programs;
