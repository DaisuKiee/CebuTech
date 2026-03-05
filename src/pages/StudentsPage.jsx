import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Students from '../components/Students';
import Footer from '../components/Footer';

const StudentsPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="students-page-container">
      <Navbar scrollY={scrollY} />
      
      <div className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-hero-title">All Students</h1>
          <p className="page-hero-subtitle">
            Discover the brilliant minds of Batch 2023-2027
          </p>
        </div>
      </div>

      <Students limit={null} showSeeMore={false} />
      <Footer />
    </div>
  );
};

export default StudentsPage;
