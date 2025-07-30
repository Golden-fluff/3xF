import React, { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-primary/90 backdrop-blur-md border-b border-steel/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan to-success rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-alert rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-orbitron font-bold text-cyan">3xF</h1>
              <p className="text-xs text-gray-400 font-mono -mt-1">Security Labs</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="nav-link">Services</a>
            <a href="#prestations" className="nav-link">Prestations</a>
            <a href="#values" className="nav-link">Valeurs</a>
            <a href="#projects" className="nav-link">Projets</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-cyan hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-steel/20">
            <div className="flex flex-col space-y-4">
              <a href="#services" className="nav-link">Services</a>
              <a href="#prestations" className="nav-link">Prestations</a>
              <a href="#values" className="nav-link">Valeurs</a>
              <a href="#projects" className="nav-link">Projets</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;