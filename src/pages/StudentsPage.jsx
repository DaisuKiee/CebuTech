import React from 'react';
import Navbar from '../components/Navbar';
import Students from '../components/Students';
import Footer from '../components/Footer';
import { batchSize } from '../data/students';

const StudentsPage = () => (
  <main className="page">
    <Navbar />
    <header className="page-hero">
      <div className="hero-sun small" aria-hidden="true" />
      <div className="container">
        <h1 className="page-hero-title">
          {'All students'.split('').map((c, i) => (
            <span className="char" key={i} style={{ '--i': i }}>{c === ' ' ? ' ' : c}</span>
          ))}
        </h1>
        <p className="page-hero-subtitle">All {batchSize} of us in BSIT Batch 2023–2027.</p>
      </div>
    </header>
    <Students full />
    <Footer />
  </main>
);

export default StudentsPage;
