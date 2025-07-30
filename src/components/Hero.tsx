import React, { useCallback, useState, useEffect } from 'react';
import { Search, Wrench, Zap, ArrowRight, Shield } from 'lucide-react';

// Interface pour les piliers de l'entreprise
interface ServicePillar {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: 'cyan' | 'success' | 'alert';
  ariaLabel: string;
}

// Configuration sécurisée des trois piliers
const SERVICE_PILLARS: readonly ServicePillar[] = [
  {
    id: 'find',
    icon: Search,
    title: 'FIND',
    description: 'Identification des vulnérabilités',
    color: 'cyan',
    ariaLabel: 'Find - Service d\'identification des vulnérabilités de sécurité'
  },
  {
    id: 'fix',
    icon: Wrench,
    title: 'FIX',
    description: 'Correction et sécurisation',
    color: 'success',
    ariaLabel: 'Fix - Service de correction et sécurisation des systèmes'
  },
  {
    id: 'force',
    icon: Zap,
    title: 'FORCE',
    description: 'Tests d\'intrusion et red teaming',
    color: 'alert',
    ariaLabel: 'Force - Service de tests d\'intrusion et red teaming'
  }
] as const;

// Constantes sécurisées de l'entreprise
const COMPANY_DATA = {
  name: '3xF',
  fullName: '3xF Security Labs',
  tagline: 'Find • Fix • Force',
  mainSlogan: 'Repérer. Corriger. Dominer.',
  motto: '"No flaw escapes. No patch delayed."',
  ctaText: 'Découvrir nos services'
} as const;

// Composant pour un pilier de service sécurisé
interface ServicePillarComponentProps {
  pillar: ServicePillar;
  index: number;
}

const ServicePillarComponent: React.FC<ServicePillarComponentProps> = ({ 
  pillar, 
  index 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = pillar.icon;

  // Animation d'apparition séquentielle
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 150); // Délai séquentiel pour l'animation

    return () => clearTimeout(timer);
  }, [index]);

  const colorClasses = {
    cyan: 'hover:border-cyan/50 text-cyan',
    success: 'hover:border-success/50 text-success',
    alert: 'hover:border-alert/50 text-alert'
  };

  return (
    <div 
      className={`
        group text-center p-6 bg-steel/20 rounded-lg border border-steel/40 
        ${colorClasses[pillar.color]} 
        transition-all duration-300 transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        hover:scale-105 hover:shadow-lg hover:shadow-${pillar.color}/20
        focus-within:ring-2 focus-within:ring-${pillar.color}/50
      `}
      role="article"
      aria-label={pillar.ariaLabel}
      tabIndex={0}
    >
      <div className="flex justify-center mb-4">
        <Icon 
          className={`w-12 h-12 group-hover:scale-110 transition-transform duration-300`}
          aria-hidden="true"
        />
      </div>
      <h3 className="text-xl font-orbitron font-bold mb-2">
        {pillar.title}
      </h3>
      <p className="text-sm font-mono text-gray-400">
        {pillar.description}
      </p>
    </div>
  );
};

// Composant pour le logo principal sécurisé
const MainLogo: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center mb-8">
      <div 
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="img"
        aria-label="Logo principal 3xF Security avec icônes Find, Fix, Force"
        tabIndex={0}
      >
        <div 
          className={`
            w-24 h-24 bg-gradient-to-br from-steel via-cyan/20 to-steel 
            border-2 border-cyan/50 rounded-lg transform rotate-45 
            flex items-center justify-center transition-all duration-300
            ${isHovered ? 'scale-110 border-cyan/80' : 'scale-100'}
          `}
        >
          <div className="transform -rotate-45 flex items-center justify-center space-x-1">
            <Search 
              className={`w-4 h-4 text-cyan transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
              aria-hidden="true"
            />
            <Wrench 
              className={`w-4 h-4 text-success transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
              aria-hidden="true"
            />
            <Zap 
              className={`w-4 h-4 text-alert transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
              aria-hidden="true"
            />
          </div>
        </div>
        
        {/* Effet de lueur sécurisé */}
        <div 
          className={`
            absolute inset-0 bg-cyan/20 rounded-lg transform rotate-45 blur-xl 
            transition-opacity duration-300
            ${isHovered ? 'opacity-75' : 'opacity-50'}
          `}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

// Bouton CTA sécurisé
const CTAButton: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleCTAClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    // Prévenir les double-clics
    if (isClicked) {
      e.preventDefault();
      return;
    }

    setIsClicked(true);
    
    // Navigation sécurisée vers la section services
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
      console.warn('Services section not found');
    }

    // Réactiver le bouton après un délai
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  }, [isClicked]);

  return (
    <button
      type="button"
      className={`
        group bg-gradient-to-r from-cyan/20 to-success/20 border-2 border-cyan 
        hover:border-success px-8 py-4 rounded-lg font-mono font-bold text-lg 
        transition-all duration-300 hover:shadow-lg hover:shadow-cyan/25
        focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:ring-offset-2 focus:ring-offset-primary
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isClicked ? 'scale-95' : 'hover:scale-105'}
      `}
      onClick={handleCTAClick}
      disabled={isClicked}
      aria-label="Découvrir nos services de sécurité"
    >
      {isClicked ? 'Chargement...' : COMPANY_DATA.ctaText}
      <ArrowRight 
        className={`
          inline-block ml-2 transition-transform duration-300
          ${isClicked ? 'translate-x-0' : 'group-hover:translate-x-1'}
        `}
        aria-hidden="true"
      />
    </button>
  );
};

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation d'entrée sécurisée
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      className="pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      role="banner"
      aria-label="Section principale - Présentation de 3xF Security"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section principale */}
        <div 
          className={`
            text-center mb-16 transition-all duration-1000 transform
            ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
        >
          {/* Logo principal */}
          <MainLogo />

          {/* Titre principal sécurisé */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-4 tracking-wide">
              <span className="text-cyan" aria-label="3">3</span>
              <span className="text-white" aria-label="x">x</span>
              <span className="text-cyan" aria-label="F">F</span>
            </h1>
            <p 
              className="text-xl md:text-2xl font-mono text-gray-300"
              aria-label="Find, Fix, Force - Notre méthologie"
            >
              {COMPANY_DATA.tagline}
            </p>
          </div>

          {/* Slogans sécurisés */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-white mb-2">
              {COMPANY_DATA.mainSlogan}
            </h2>
            <p 
              className="text-lg font-mono text-cyan opacity-80 italic"
              aria-label="Notre devise: No flaw escapes. No patch delayed."
            >
              {COMPANY_DATA.motto}
            </p>
          </div>

          {/* Bouton CTA */}
          <CTAButton />
        </div>

        {/* Section des trois piliers */}
        <div 
          className={`
            grid grid-cols-1 md:grid-cols-3 gap-8 mt-16
            transition-all duration-1000 delay-300 transform
            ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
          role="region"
          aria-label="Nos trois piliers de sécurité"
        >
          <h2 className="sr-only">Nos services principaux</h2>
          {SERVICE_PILLARS.map((pillar, index) => (
            <ServicePillarComponent 
              key={pillar.id}
              pillar={pillar}
              index={index}
            />
          ))}
        </div>

        {/* Indicateur de scroll sécurisé */}
        <div 
          className={`
            flex justify-center mt-16 transition-all duration-1000 delay-500
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          aria-hidden="true"
        >
          <div className="animate-bounce">
            <ArrowRight 
              className="w-6 h-6 text-cyan/60 transform rotate-90" 
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Export sécurisé avec memo pour optimiser les performances
export default React.memo(Hero);