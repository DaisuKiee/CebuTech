import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: 'Daanbantayan Paradise',
    description: 'Tourist booking platform for Daanbantayan, Cebu. Connects travelers with accommodations, diving adventures, and island hopping tours in the pristine northern tip of Cebu.',
    image: '/img/project/db.png',
    tags: ['Tourism', 'Booking System', 'Web App'],
    year: '2023-2024',
    link: 'https://dbtourist.vercel.app/'
  },
  {
    id: 2,
    title: 'SSG Innovoice',
    description: 'Digital suggestion box system for student government. A modern platform for collecting, managing, and responding to student feedback and suggestions.',
    image: '/img/project/innovoice.png',
    tags: ['Suggestion System', 'Student Portal', 'Web App'],
    year: '2024-2025',
    link: 'https://ssginnovoice.filipino.gg/'
  },
  {
    id: 3,
    title: 'GPTracker',
    description: 'Group payment tracking platform for transparent and secure group payment record-keeping. Create tabs, add members, record transactions, and generate reports with Firebase integration.',
    image: '/img/project/gpt.png',
    tags: ['Payment Tracker', 'Firebase', 'Google Auth'],
    year: '2024-2025',
    link: 'https://group-payment-tracker.web.app/'
  },
  {
    id: 4,
    title: 'OnBoard',
    description: 'Community management platform reimagined with Filipino Bayanihan spirit. Features smart attendance tracking, performance monitoring, and seamless communication tools for community organizations.',
    image: '/img/project/onboard.png',
    tags: ['Community Management', 'Attendance', 'Dashboard'],
    year: '2024-2025',
    link: 'https://onboard-40e06.web.app/'
  },
  {
    id: 5,
    title: 'SSG Office Assistant App',
    description: 'Prototype office management system for Student Government. Streamlines administrative tasks, document management, and student services with an intuitive interface.',
    image: '/img/project/ssg.png',
    tags: ['Office Management', 'Student Services', 'Prototype'],
    year: '2024-2025',
    link: 'https://elijahtugad2005.github.io/Prototype-SSG-Office-Assistant-App/'
  },
];

const Projects = () => {
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
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-container">
        <div className={`projects-header ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">Our Projects</h2>
          <p className="section-subtitle">
            A showcase of our journey through various projects from first year to now
          </p>
        </div>

        <div className={`projects-grid ${isVisible ? 'visible' : ''}`}>
          {projectsData.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-image-container">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image"
                />
                {project.link && (
                  <div className="project-overlay">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-view-btn"
                    >
                      <ExternalLink size={20} />
                      <span>View Project</span>
                    </a>
                  </div>
                )}
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="project-tag">{tag}</span>
                  ))}
                </div>
                
                <div className="project-team">{project.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
