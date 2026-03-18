import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github, Facebook } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Student data for Batch 2023-2027
const studentsData = [
  {
    id: 1,
    name: 'Vicent Bernabe V. Romeo',
    role: 'Leader',
    frontImage: '/img/Daisu.png',
    backImage: '/img/Daisu.png',
    github: 'https://github.com',
    facebook: 'https://facebook.com',
    showHover: true
  },
  {
    id: 2,
    name: 'Elijah Tugad',
    role: 'Leader',
    frontImage: '/img/elijah.png',
    backImage: '/img/elijah.png',
    github: 'https://github.com',
    facebook: 'https://facebook.com',
    showHover: true
  },
  {
    id: 3,
    name: 'Lord Jason Riveral',
    role: 'Leader',
    frontImage: '/img/jason.png',
    backImage: '/img/jason.png',
    github: 'https://github.com',
    facebook: 'https://facebook.com',
    showHover: true
  },
  {
    id: 4,
    name: 'John Cadaro',
    role: 'Leader',
    frontImage: '/img/john.png',
    backImage: '/img/meme-john.jpg',
    github: 'https://github.com',
    facebook: 'https://facebook.com',
    showHover: true
  },
  {
    id: 5,
    name: 'Marco Montellano',
    role: 'Leader',
    frontImage: '/img/Marco.jpg',
    backImage: '/img/Marco.jpg',
    github: 'https://github.com',
    facebook: 'https://facebook.com',
    showHover: true
  },
  {
    id: 6,
    name: 'Zea Marae Ramil',
    role: 'Leader',
    frontImage: '/img/zea.png',
    backImage: '/img/zea.png',
    github: 'https://github.com',
    facebook: 'https://facebook.com',
    showHover: true
  },
  {
    id: 7,
    name: 'Merry Apple Edaño',
    role: 'Leader',
    frontImage: '/img/apple.png',
    backImage: '/img/apple.png',
    github: 'https://github.com',
    facebook: 'https://facebook.com',
    showHover: true
  },
  {
    id: 8,
    name: 'Allan Jr. De Jesus',
    role: 'Leader',
    frontImage: '/img/noprofile.jpg',
    backImage: '/img/noprofile.jpg',
    github: 'https://github.com',
    facebook: 'https://facebook.com',
    showHover: true
  },
  {
    id: 9,
    name: 'Kier Louie Arriesgado',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 10,
    name: 'Francis Keith Banan',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 11,
    name: 'Romel Batusbatusan',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 12,
    name: 'John Fernand Bauno',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 12,
    name: 'Monick Cabagte',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 13,
    name: 'Fanny Rose Caballes',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 14,
    name: 'Carmela Cabardo',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 15,
    name: 'Hazzel Canama',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 16,
    name: 'Christine Conde',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 17,
    name: 'Jhemarsh Lee Conde',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 18,
    name: 'Jovannie Congson',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 19,
    name: 'Bea Dejito',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 20,
    name: 'Frances Mae Dela Pieza',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 21,
    name: 'Bea Delos Santos',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 22,
    name: 'Vence Peter Doble',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 23,
    name: 'Justin Dumon',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 24,
    name: 'Kirt Irah Fernandez',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 25,
    name: 'Mariel Gonato',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 26,
    name: 'Lawrence Ledesma',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 27,
    name: 'Alexa Suzane Loon',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 28,
    name: 'Jerome Magdadaro',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 30,
    name: 'Restie Moralde',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 29,
    name: 'Restie Moralde',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 30,
    name: 'Reyvehn Nulla',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 31,
    name: 'Rheina Ompoy',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 32,
    name: 'Raniza Pepito',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 33,
    name: 'Matthew Gayle Pepito',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 34,
    name: 'Alyza Pitogo',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 35,
    name: 'Christine Rosalejos',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 36,
    name: 'Angel Mae Santosidad',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 37,
    name: 'Benjie Sumile',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 38,
    name: 'Kenneth Brian Tangkay',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 39,
    name: 'Ma. Bliza Tayo',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 40,
    name: 'Elijah Glenn B. Tugad',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
    showHover: false
  },
  {
    id: 41,
    name: 'Lourence Zambas',
    role: 'BSIT Student',
    image: '/img/noprofile.jpg',
    facebook: 'https://facebook.com',
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
                {student.showHover ? (
                  <>
                    <img 
                      src={student.frontImage} 
                      alt={`${student.name} - Front`}
                      className="student-image student-image-front"
                    />
                    <div className="student-image-back">
                      <img 
                        src={student.backImage} 
                        alt={`${student.name} - Back`}
                        className="student-image"
                      />
                      <div className="student-overlay">
                        <div className="student-overlay-content">
                          <h3 className="student-overlay-name">{student.name}</h3>
                          <p className="student-overlay-role">{student.role}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <img 
                    src={student.image} 
                    alt={student.name}
                    className="student-image"
                  />
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
