import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Programs from '../components/Programs';
import Students from '../components/Students';
import Projects from '../components/Projects';
import BatchInfo from '../components/BatchInfo';
import About from '../components/About';
import Footer from '../components/Footer';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      <Navbar scrollY={scrollY} />
      <Hero scrollY={scrollY} />
      <Programs />
      <Students limit={7} showSeeMore={true} />
      <Projects />
      <BatchInfo />
      <About />
      <Footer />
    </div>
  );
};

export default Home;
