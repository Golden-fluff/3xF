import React from 'react';
import { Clock, Users, FileText, CheckCircle, ArrowRight, Euro } from 'lucide-react';

const Prestations = () => {
  const prestations = [
    {
      category: 'FIND - Audit & Analyse',
      services: [
        {
          name: 'Audit de sécurité complet',
          description: 'Analyse approfondie de votre infrastructure et applications',
          duration: '2-4 semaines',
          price: 'Sur devis',
          deliverables: ['Rapport détaillé', 'Plan de remédiation', 'Présentation exécutive']
        },
        {
          name: 'Audit de code source',
          description: 'Revue de sécurité du code et détection de vulnérabilités',
          duration: '1-2 semaines',
          price: 'Sur devis',
          deliverables: ['Analyse statique', 'Recommandations', 'Guide de bonnes pratiques']
        },
        {
          name: 'Veille technologique',
          description: 'Surveillance continue des menaces et vulnérabilités',
          duration: 'Abonnement mensuel',
          price: 'À partir de 500€/mois',
          deliverables: ['Bulletins mensuels', 'Alertes critiques', 'Tableau de bord']
        }
      ]
    },
    {
      category: 'FIX - Correction & Sécurisation',
      services: [
        {
          name: 'Implémentation de correctifs',
          description: 'Déploiement sécurisé des patches et corrections',
          duration: '1-3 semaines',
          price: 'Sur devis',
          deliverables: ['Plan de déploiement', 'Tests de validation', 'Documentation']
        },
        {
          name: 'Durcissement système',
          description: 'Renforcement de la sécurité de vos infrastructures',
          duration: '2-4 semaines',
          price: 'Sur devis',
          deliverables: ['Configuration sécurisée', 'Procédures', 'Formation équipe']
        },
        {
          name: 'Accompagnement DevSecOps',
          description: 'Intégration de la sécurité dans vos processus de développement',
          duration: '1-6 mois',
          price: 'À partir de 2000€/mois',
          deliverables: ['Pipeline sécurisé', 'Outils automatisés', 'Formation continue']
        }
      ]
    },
    {
      category: 'FORCE - Tests Offensifs',
      services: [
        {
          name: 'Test d\'intrusion externe',
          description: 'Simulation d\'attaques depuis Internet sur vos systèmes exposés',
          duration: '1-2 semaines',
          price: 'À partir de 3000€',
          deliverables: ['Rapport technique', 'Preuves de concept', 'Plan de remédiation']
        },
        {
          name: 'Test d\'intrusion interne',
          description: 'Évaluation de la sécurité depuis l\'intérieur du réseau',
          duration: '1-2 semaines',
          price: 'À partir de 4000€',
          deliverables: ['Cartographie réseau', 'Scénarios d\'attaque', 'Recommandations']
        },
        {
          name: 'Red Team Exercise',
          description: 'Simulation d\'attaque avancée multi-vecteurs',
          duration: '2-6 semaines',
          price: 'À partir de 8000€',
          deliverables: ['Rapport stratégique', 'Débriefing', 'Plan d\'amélioration']
        }
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    if (category.includes('FIND')) return 'cyan';
    if (category.includes('FIX')) return 'success';
    if (category.includes('FORCE')) return 'alert';
    return 'steel';
  };

  return (
    <section id="prestations" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-orbitron font-bold text-cyan mb-4">
            NOS PRESTATIONS
          </h2>
          <p className="text-lg font-mono text-gray-400 max-w-2xl mx-auto">
            Services professionnels de cybersécurité adaptés à vos besoins
          </p>
        </div>

        <div className="space-y-12">
          {prestations.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              {/* Category Header */}
              <div className="text-center">
                <h3 className={`text-2xl font-orbitron font-bold text-${getCategoryColor(category.category)} mb-2`}>
                  {category.category}
                </h3>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent mx-auto"></div>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <div
                    key={serviceIndex}
                    className="group bg-steel/20 rounded-xl border border-steel/40 hover:border-cyan/50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan/10"
                  >
                    {/* Service Header */}
                    <div className="mb-4">
                      <h4 className="text-lg font-orbitron font-bold text-white mb-2">
                        {service.name}
                      </h4>
                      <p className="font-mono text-sm text-gray-400 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-cyan flex-shrink-0" />
                        <span className="font-mono text-sm text-gray-300">
                          Durée: {service.duration}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Euro className="w-4 h-4 text-success flex-shrink-0" />
                        <span className="font-mono text-sm text-gray-300">
                          {service.price}
                        </span>
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="mb-6">
                      <h5 className="font-mono text-sm font-bold text-cyan mb-2">Livrables:</h5>
                      <ul className="space-y-1">
                        {service.deliverables.map((deliverable, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                            <span className="font-mono text-xs text-gray-400">
                              {deliverable}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full group/btn bg-gradient-to-r from-cyan/10 to-cyan/5 border border-cyan/30 hover:border-cyan/50 px-4 py-2 rounded-lg font-mono text-sm text-cyan hover:text-white transition-all duration-300">
                      Demander un devis
                      <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-steel/10 rounded-xl border border-steel/30 p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
              Besoin d'une prestation sur mesure ?
            </h3>
            <p className="font-mono text-gray-400 mb-6">
              Contactez-nous pour discuter de vos besoins spécifiques en cybersécurité
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-cyan/20 to-success/20 border-2 border-cyan hover:border-success rounded-lg font-mono font-bold text-cyan hover:text-success transition-all duration-300">
                <Users className="inline-block mr-2 w-5 h-5" />
                Consultation gratuite
              </button>
              <button className="px-8 py-3 border-2 border-steel/50 hover:border-cyan/50 rounded-lg font-mono font-bold text-gray-300 hover:text-cyan transition-all duration-300">
                <FileText className="inline-block mr-2 w-5 h-5" />
                Télécharger notre brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prestations;