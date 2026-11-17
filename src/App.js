import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './styles/cebutech.css';
import Home from './pages/Home';
import StudentsPage from './pages/StudentsPage';
import Cursor from './components/Cursor';
import Intro from './components/Intro';
import { initSmoothScroll, prefersReducedMotion, scrollToTarget } from './lib/motion';

const COVER_MS = 650;

/*
 * Route changes play a wipe: a panel sweeps up over the page, the route swaps
 * underneath while it is covered, then the panel continues off the top.
 */
const AnimatedRoutes = () => {
  const location = useLocation();
  const [shown, setShown] = useState(location);
  const [wipe, setWipe] = useState('idle'); // idle → cover → reveal
  const timers = useRef([]);

  useEffect(() => {
    if (location.pathname === shown.pathname) {
      setShown(location);
      return undefined;
    }
    if (prefersReducedMotion()) {
      setShown(location);
      return undefined;
    }
    timers.current.forEach(clearTimeout);
    setWipe('cover');
    timers.current = [
      setTimeout(() => {
        setShown(location);
        setWipe('reveal');
      }, COVER_MS),
      setTimeout(() => setWipe('idle'), COVER_MS * 2 + 100),
    ];
    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (!(shown.state && shown.state.scrollTo)) scrollToTarget(0, { immediate: true });
  }, [shown]);

  return (
    <>
      <div className="route" key={shown.pathname}>
        <Routes location={shown}>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentsPage />} />
        </Routes>
      </div>
      <div className={`wipe wipe-${wipe}`} aria-hidden="true">
        <img src="/img/ctulogo.png" alt="" />
      </div>
    </>
  );
};

function App() {
  useEffect(() => initSmoothScroll(), []);

  return (
    <BrowserRouter>
      <Intro />
      <Cursor />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
