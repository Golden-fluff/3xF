import React from 'react';
import { Search, Wrench, Zap, Eye, Shield, Target, Code, Bug, Lock } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Search,
      title: 'FIND',
      subtitle: 'Identification des vulnérabilités',
      color: 'cyan',
      items: [
        { icon: Eye, text: 'Analyse des failles de sécurité' },
        { icon: Code, text: 'Audit de code source' },
        { icon: Shield, text: 'Veille technologique' },
        { icon: Bug, text: 'Détection de vulnérabilités' }
      ]
    },
    {
      icon: Wrench,
      title: 'FIX',
      subtitle: 'Correction et sécurisation',
      color: 'success',
      items: [
        { icon: Lock, text: 'Renforcement des systèmes' },
        { icon: Shield, text: 'Implémentation de correctifs' },
        { icon: Code, text: 'Sécurisation du code' },
        { icon: Target, text: 'Durcissement d\'infrastructure' }
      ]
    },
    {
      icon: Zap,
      title: 'FORCE',
      subtitle: 'Tests offensifs',
      color: 'alert',
      items: [
        { icon: Target, text: 'Tests d\'intrusion' },
        { icon: Shield, text: 'Red teaming' },
        { icon: Zap, text: 'Stress tests' },
        { icon: Bug, text: 'Simulation d\'attaques' }
      ]
    }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-steel/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-orbitron font-bold text-cyan mb-4">
            NOS SERVICES
          </h2>
          <p className="text-lg font-mono text-gray-400 max-w-2xl mx-auto">
            Une approche complète de la cybersécurité en trois phases critiques
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-steel/20 rounded-xl border border-steel/40 hover:border-cyan/50 p-8 transition-all duration-300 hover:shadow-lg hover:shadow-cyan/10"
            >
              {/* Service Header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 bg-${service.color}/20 rounded-lg flex items-center justify-center border border-${service.color}/40`}>
                  <service.icon className={`w-8 h-8 text-${service.color}`} />
                </div>
                <h3 className="text-2xl font-orbitron font-bold mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 font-mono text-sm">
                  {service.subtitle}
                </p>
              </div>

              {/* Service Items */}
              <div className="space-y-4">
                {service.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-primary/30 hover:bg-primary/50 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-cyan flex-shrink-0" />
                    <span className="font-mono text-sm text-gray-300">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-8 text-center">
                <button className={`px-6 py-2 border border-${service.color}/50 text-${service.color} rounded-lg font-mono text-sm hover:bg-${service.color}/10 transition-colors`}>
                  En savoir plus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;