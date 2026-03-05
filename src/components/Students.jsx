import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github, Facebook } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample student data - replace with real student photos
const studentsData = [
  {
    id: 1,
    name: 'Daisu',
    role: 'Full Stack Developer',
    image: '/img/Daisu.png',
    github: 'https://github.com/daisu',
    facebook: 'https://facebook.com/daisu',
    showHover: true
  },
  {
    id: 2,
    name: 'Elijah',
    role: 'UI/UX Designer',
    image: '/img/elijah.png',
    github: 'https://github.com/elijah',
    facebook: 'https://facebook.com/elijah',
    showHover: true
  },
  {
    id: 3,
    name: 'Jason',
    role: 'Data Scientist',
    image: '/img/jason.png',
    github: 'https://github.com/jason',
    facebook: 'https://facebook.com/jason',
    showHover: true
  },
  {
    id: 4,
    name: 'John',
    role: 'Mobile Developer',
    image: '/img/john.png',
    github: 'https://github.com/john',
    facebook: 'https://facebook.com/john',
    showHover: true
  },
  {
    id: 5,
    name: 'Marco',
    role: 'DevOps Engineer',
    image: '/img/Marco.jpg',
    github: 'https://github.com/marco',
    facebook: 'https://facebook.com/marco',
    showHover: true
  },
  {
    id: 6,
    name: 'Zea',
    role: 'Frontend Developer',
    image: '/img/zea.png',
    github: 'https://github.com/zea',
    facebook: 'https://facebook.com/zea',
    showHover: true
  },
  {
    id: 7,
    name: 'Apple',
    role: 'Backend Developer',
    image: '/img/apple.png',
    github: 'https://github.com/apple',
    facebook: 'https://facebook.com/apple',
    showHover: true
  },
  {
    id: 8,
    name: 'Tom Martinez',
    role: 'Game Developer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    facebook: 'https://facebook.com/tommartinez',
    showHover: false
  },
  {
    id: 9,
    name: 'Anna Taylor',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    facebook: 'https://facebook.com/annataylor',
    showHover: false
  },
  {
    id: 10,
    name: 'James Lee',
    role: 'Blockchain Developer',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400',
    facebook: 'https://facebook.com/jameslee',
    showHover: false
  },
  {
    id: 11,
    name: 'Maria Garcia',
    role: 'QA Engineer',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
    facebook: 'https://facebook.com/mariagarcia',
    showHover: false
  },
  {
    id: 12,
    name: 'Robert Chen',
    role: 'Software Architect',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400',
    facebook: 'https://facebook.com/robertchen',
    showHover: false
  },
  {
    id: 13,
    name: 'Jessica Park',
    role: 'Machine Learning Engineer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    facebook: 'https://facebook.com/jessicapark',
    showHover: false
  },
  {
    id: 14,
    name: 'Kevin Rodriguez',
    role: 'Cloud Engineer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    facebook: 'https://facebook.com/kevinrodriguez',
    showHover: false
  },
  {
    id: 15,
    name: 'Amanda White',
    role: 'Data Analyst',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    facebook: 'https://facebook.com/amandawhite',
    showHover: false
  },
  {
    id: 16,
    name: 'Daniel Kim',
    role: 'iOS Developer',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
    facebook: 'https://facebook.com/danielkim',
    showHover: false
  },
  {
    id: 17,
    name: 'Sophia Martinez',
    role: 'Android Developer',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
    facebook: 'https://facebook.com/sophiamartinez',
    showHover: false
  },
  {
    id: 18,
    name: 'Ryan Thompson',
    role: 'Network Engineer',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400',
    facebook: 'https://facebook.com/ryanthompson',
    showHover: false
  },
  {
    id: 19,
    name: 'Olivia Harris',
    role: 'Technical Writer',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400',
    facebook: 'https://facebook.com/oliviaharris',
    showHover: false
  },
  {
    id: 20,
    name: 'Brandon Lewis',
    role: 'Database Administrator',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400',
    facebook: 'https://facebook.com/brandonlewis',
    showHover: false
  },
  {
    id: 21,
    name: 'Rachel Green',
    role: 'Scrum Master',
    image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400',
    facebook: 'https://facebook.com/rachelgreen',
    showHover: false
  },
  {
    id: 22,
    name: 'Justin Walker',
    role: 'Systems Analyst',
    image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400',
    facebook: 'https://facebook.com/justinwalker',
    showHover: false
  },
  {
    id: 23,
    name: 'Nicole Young',
    role: 'UX Researcher',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400',
    facebook: 'https://facebook.com/nicoleyoung',
    showHover: false
  },
  {
    id: 24,
    name: 'Eric Hall',
    role: 'Site Reliability Engineer',
    image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=400',
    facebook: 'https://facebook.com/erichall',
    showHover: false
  },
  {
    id: 25,
    name: 'Michelle Allen',
    role: 'AI Researcher',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
    facebook: 'https://facebook.com/michelleallen',
    showHover: false
  },
  {
    id: 26,
    name: 'Patrick Scott',
    role: 'Embedded Systems Engineer',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400',
    facebook: 'https://facebook.com/patrickscott',
    showHover: false
  },
  {
    id: 27,
    name: 'Laura King',
    role: 'Graphics Designer',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400',
    facebook: 'https://facebook.com/lauraking',
    showHover: false
  },
  {
    id: 28,
    name: 'Steven Wright',
    role: 'Security Analyst',
    image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400',
    facebook: 'https://facebook.com/stevenwright',
    showHover: false
  },
  {
    id: 29,
    name: 'Karen Lopez',
    role: 'Business Analyst',
    image: 'https://images.unsplash.com/photo-1590086782792-42dd2350140d?w=400',
    facebook: 'https://facebook.com/karenlopez',
    showHover: false
  },
  {
    id: 30,
    name: 'Brian Hill',
    role: 'Solutions Architect',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400',
    facebook: 'https://facebook.com/brianhill',
    showHover: false
  },
  {
    id: 31,
    name: 'Jennifer Adams',
    role: 'IT Support Specialist',
    image: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400',
    facebook: 'https://facebook.com/jenniferadams',
    showHover: false
  },
  {
    id: 32,
    name: 'Mark Nelson',
    role: 'Software Tester',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400',
    facebook: 'https://facebook.com/marknelson',
    showHover: false
  },
  {
    id: 33,
    name: 'Chris Wilson',
    role: 'Backend Developer',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    facebook: 'https://facebook.com/chriswilson',
    showHover: false
  }
];

const Students = ({ limit = null, showSeeMore = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const displayedStudents = limit ? studentsData.slice(0, limit) : studentsData;

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
    <section id="students" className="students-section" ref={sectionRef}>
      <div className="students-container">
        <div className={`students-header ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">Our Students</h2>
          <p className="section-subtitle">
            Meet the talented individuals shaping the future of technology
          </p>
        </div>

        <div className={`students-grid ${isVisible ? 'visible' : ''}`}>
          {displayedStudents.map((student, index) => (
            <div 
              key={student.id} 
              className={`student-card ${student.showHover ? 'has-hover' : 'no-hover'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="student-image-container">
                <img 
                  src={student.image} 
                  alt={student.name}
                  className="student-image"
                />
                {student.showHover && (
                  <div className="student-overlay">
                    <div className="student-overlay-content">
                      <h3 className="student-overlay-name">{student.name}</h3>
                      <p className="student-overlay-role">{student.role}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="student-content">
                <h3 className="student-name">{student.name}</h3>
                
                <div className="student-socials">
                  {student.github && (
                    <a 
                      href={student.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link github-link"
                      aria-label={`${student.name}'s GitHub`}
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {student.facebook && (
                    <a 
                      href={student.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link facebook-link"
                      aria-label={`${student.name}'s Facebook`}
                    >
                      <Facebook size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {showSeeMore && (
          <div className="students-see-more">
            <button 
              className="btn-see-more"
              onClick={() => navigate('/students')}
            >
              See More Students
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Students;
