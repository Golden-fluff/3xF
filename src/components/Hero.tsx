import React from 'react';
import { Search, Wrench, Zap, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Main Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-steel via-cyan/20 to-steel border-2 border-cyan/50 rounded-lg transform rotate-45 flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                <div className="transform -rotate-45 flex items-center justify-center space-x-1">
                  <Search className="w-4 h-4 text-cyan" />
                  <Wrench className="w-4 h-4 text-success" />
                  <Zap className="w-4 h-4 text-alert" />
                </div>
              </div>
              <div className="absolute inset-0 bg-cyan/20 rounded-lg transform rotate-45 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-orbitron font-black text-cyan mb-4 tracking-wide">
            3<span className="text-white">x</span>F
          </h1>
          <p className="text-xl md:text-2xl font-mono text-gray-300 mb-6">
            Find • Fix • Force
          </p>

          {/* Slogans */}
          <div className="mb-12">
            <p className="text-2xl md:text-3xl font-orbitron font-bold text-white mb-2">
              Repérer. Corriger. Dominer.
            </p>
            <p className="text-lg font-mono text-cyan opacity-80 italic">
              "No flaw escapes. No patch delayed."
            </p>
          </div>

          {/* CTA Button */}
          <button className="group bg-gradient-to-r from-cyan/20 to-success/20 border-2 border-cyan hover:border-success px-8 py-4 rounded-lg font-mono font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan/25">
            Découvrir nos services
            <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Three Pillars Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="group text-center p-6 bg-steel/20 rounded-lg border border-steel/40 hover:border-cyan/50 transition-all duration-300">
            <Search className="w-12 h-12 text-cyan mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-orbitron font-bold mb-2">FIND</h3>
            <p className="text-sm font-mono text-gray-400">Identification des vulnérabilités</p>
          </div>
          <div className="group text-center p-6 bg-steel/20 rounded-lg border border-steel/40 hover:border-success/50 transition-all duration-300">
            <Wrench className="w-12 h-12 text-success mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-orbitron font-bold mb-2">FIX</h3>
            <p className="text-sm font-mono text-gray-400">Correction et sécurisation</p>
          </div>
          <div className="group text-center p-6 bg-steel/20 rounded-lg border border-steel/40 hover:border-alert/50 transition-all duration-300">
            <Zap className="w-12 h-12 text-alert mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-orbitron font-bold mb-2">FORCE</h3>
            <p className="text-sm font-mono text-gray-400">Tests d'intrusion et red teaming</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;