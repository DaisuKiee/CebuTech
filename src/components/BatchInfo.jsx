import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Users, Trophy } from 'lucide-react';

const batchData = [
  {
    id: 1,
    icon: Calendar,
    title: 'Batch Timeline',
    description: 'Started 2023, graduating 2027',
    color: 'indigo'
  },
  {
    id: 2,
    icon: Users,
    title: 'Our Community',
    description: 'BSIT students passionate about tech & innovation',
    color: 'purple'
  },
  {
    id: 3,
    icon: Trophy,
    title: 'Achievements',
    description: 'Hackathons, projects, competitions',
    color: 'pink'
  }
];

const BatchInfo = () => {
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
    <section id="batch-info" className="batch-section" ref={sectionRef}>
      <div className="batch-container">
        <div className={`batch-header ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">Batch Information</h2>
        </div>

        <div className={`batch-grid ${isVisible ? 'visible' : ''}`}>
          {batchData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id} 
                className={`batch-card batch-${item.color}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="batch-icon-wrapper">
                  <IconComponent size={36} strokeWidth={2} />
                </div>
                <h3 className="batch-title">{item.title}</h3>
                <p className="batch-description">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BatchInfo;
