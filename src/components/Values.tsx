import React from 'react';
import { Cpu, Zap, Shield, Share2 } from 'lucide-react';

const Values = () => {
  const values = [
    {
      icon: Cpu,
      title: 'Rigueur technique',
      description: 'Précision et expertise dans chaque analyse, audit et correction de sécurité',
      color: 'cyan'
    },
    {
      icon: Zap,
      title: 'Réactivité',
      description: 'Réponse rapide face aux vulnérabilités critiques et aux incidents de sécurité',
      color: 'success'
    },
    {
      icon: Shield,
      title: 'Offensive éthique',
      description: 'Tests d\'intrusion responsables dans le respect des cadres légaux et éthiques',
      color: 'alert'
    },
    {
      icon: Share2,
      title: 'Partage de connaissances',
      description: 'Contribution open source, outils publics et documentation transparente',
      color: 'cyan'
    }
  ];

  return (
    <section id="values" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-orbitron font-bold text-cyan mb-4">
            NOS VALEURS
          </h2>
          <p className="text-lg font-mono text-gray-400 max-w-2xl mx-auto">
            Les principes qui guident notre approche de la cybersécurité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-steel/20 to-steel/10 rounded-xl border border-steel/40 hover:border-cyan/50 p-8 transition-all duration-300 hover:shadow-lg hover:shadow-cyan/10"
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 bg-${value.color}/20 rounded-lg flex items-center justify-center border border-${value.color}/40 group-hover:scale-110 transition-transform`}>
                  <value.icon className={`w-6 h-6 text-${value.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-orbitron font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="font-mono text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="mt-6 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div className="mt-16 text-center">
          <div className="bg-steel/10 rounded-xl border border-steel/30 p-8 max-w-4xl mx-auto">
            <blockquote className="text-xl font-mono text-cyan italic mb-4">
              "La sécurité n'est pas un produit, mais un processus continu d'amélioration et d'adaptation"
            </blockquote>
            <p className="text-sm font-mono text-gray-500">— Philosophie 3xF Security</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;