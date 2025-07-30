import React from 'react';
import { Github, Twitter, Linkedin, Mail, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-steel/10 border-t border-steel/30 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan to-success rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-orbitron font-bold text-cyan">3xF</h3>
                <p className="text-xs text-gray-400 font-mono">Security Labs</p>
              </div>
            </div>
            <p className="font-mono text-sm text-gray-400 leading-relaxed">
              Spécialistes en cybersécurité offensive et défensive. 
              Find, Fix, Force - notre approche complète pour sécuriser vos systèmes.
            </p>
            <div className="flex space-x-2">
              <span className="px-2 py-1 bg-cyan/10 border border-cyan/30 rounded text-xs font-mono text-cyan">
                #3xFsec
              </span>
              <span className="px-2 py-1 bg-success/10 border border-success/30 rounded text-xs font-mono text-success">
                #FindFixForce
              </span>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-orbitron font-bold text-white">Navigation</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#services" className="font-mono text-sm text-gray-400 hover:text-cyan transition-colors">
                Services
              </a>
              <a href="#prestations" className="font-mono text-sm text-gray-400 hover:text-cyan transition-colors">
              </a>
              <a href="#values" className="font-mono text-sm text-gray-400 hover:text-cyan transition-colors">
                Valeurs
              </a>
              <a href="#projects" className="font-mono text-sm text-gray-400 hover:text-cyan transition-colors">
                Projets
              </a>
              <a href="https://github.com/3xF-Security" className="font-mono text-sm text-gray-400 hover:text-cyan transition-colors">
                GitHub
              </a>
            </nav>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-orbitron font-bold text-white">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@3xf-security.com"
                className="flex items-center space-x-3 font-mono text-sm text-gray-400 hover:text-cyan transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>contact@3xf-security.com</span>
              </a>
              
              {/* Social Links */}
              <div className="flex space-x-4 pt-4">
                <a
                  href="https://github.com/3xF-Security"
                  className="p-2 bg-steel/20 border border-steel/40 hover:border-cyan/50 rounded-lg text-cyan hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/3xFsecurity"
                  className="p-2 bg-steel/20 border border-steel/40 hover:border-cyan/50 rounded-lg text-cyan hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/company/3xf-security"
                  className="p-2 bg-steel/20 border border-steel/40 hover:border-cyan/50 rounded-lg text-cyan hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-steel/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-mono text-sm text-gray-500">
              © 2025 3xF Security Labs. Tous droits réservés.
            </p>
            <p className="font-mono text-sm text-gray-500 italic">
              "No flaw escapes. No patch delayed."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;