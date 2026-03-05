import React, { useEffect, useRef, useState } from 'react';

const About = () => {
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
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-container">
        <div className={`about-content ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">About Us</h2>
          <p className="about-text">
            We are a community of BSIT students, tech enthusiasts, innovators, and future leaders 
            from Cebu Technological University – Carmen Campus. This showcase highlights our journey, 
            projects, and achievements as we progress through our academic years. Together, we're 
            building the future of technology in the Philippines.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
