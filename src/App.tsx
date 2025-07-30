import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Prestations from './components/Prestations';
import Values from './components/Values';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-primary text-white">
      <div className="fixed inset-0 opacity-5">
        <div className="grid-pattern"></div>
      </div>
      <div className="relative z-10">
        <Header />
        <Hero />
        <Services />
        <Prestations />
        <Values />
        <Projects />
        <Footer />
      </div>
    </div>
  );
}

export default App;