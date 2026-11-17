import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Programs from '../components/Programs';
import Students from '../components/Students';
import Projects from '../components/Projects';
import Journey from '../components/Journey';
import About from '../components/About';
import Footer from '../components/Footer';
import Bands from '../components/Bands';
import Dock from '../components/Dock';
import { scrollToTarget } from '../lib/motion';

const Home = () => {
  const location = useLocation();

  // Arriving from another page with a section to jump to.
  useEffect(() => {
    const id = location.state && location.state.scrollTo;
    if (!id) return undefined;
    const t = setTimeout(() => scrollToTarget(id), 350);
    return () => clearTimeout(t);
  }, [location]);

  return (
    <main className="page">
      <Navbar />
      <Hero />
      <Programs />
      <Bands />
      <Students />
      <Projects />
      <Journey />
      <About />
      <Footer />
      <Dock />
    </main>
  );
};

export default Home;
