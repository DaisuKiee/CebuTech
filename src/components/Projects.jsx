import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: 'Student Dashboard System',
    description: 'Modern web application for student management with real-time analytics and reporting.',
    image: 'https://images.unsplash.com/photo-1763718432504-7716caff6e99',
    tags: ['React', 'Node.js', 'MongoDB'],
    team: 'Team Alpha'
  },
  {
    id: 2,
    title: 'Robotics Innovation Lab',
    description: 'Autonomous robot project designed for navigation and object detection challenges.',
    image: 'https://images.pexels.com/photos/9242846/pexels-photo-9242846.jpeg',
    tags: ['Arduino', 'Python', 'AI'],
    team: 'Tech Pioneers'
  },
  {
    id: 3,
    title: 'IoT Hardware Project',
    description: 'Smart device integration platform for home automation and energy monitoring.',
    image: 'https://images.pexels.com/photos/4705604/pexels-photo-4705604.jpeg',
    tags: ['IoT', 'ESP32', 'Cloud'],
    team: 'Circuit Breakers'
  },
  {
    id: 4,
    title: 'Code Learning Platform',
    description: 'Interactive coding education platform with real-time collaboration features.',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
    tags: ['JavaScript', 'WebRTC', 'Firebase'],
    team: 'Code Masters'
  },
  {
    id: 5,
    title: 'Algorithm Visualizer',
    description: 'Educational tool for visualizing complex algorithms and data structures.',
    image: 'https://images.pexels.com/photos/6190327/pexels-photo-6190327.jpeg',
    tags: ['Vue.js', 'D3.js', 'CSS'],
    team: 'Visual Dev'
  },
  {
    id: 6,
    title: 'Mobile Learning App',
    description: 'Cross-platform mobile application for on-the-go programming tutorials.',
    image: 'https://images.unsplash.com/photo-1565229284535-2cbbe3049123',
    tags: ['React Native', 'Expo', 'API'],
    team: 'Mobile Squad'
  }
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
          <h2 className="section-title">Student Projects</h2>
          <p className="section-subtitle">
            Innovative solutions and creative tech projects built by our talented students
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
                <div className="project-overlay">
                  <button className="project-view-btn">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="project-tag">{tag}</span>
                  ))}
                </div>
                
                <div className="project-team">{project.team}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
