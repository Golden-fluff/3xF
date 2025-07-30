import React, { useCallback } from 'react';
import { Github, Twitter, Linkedin, Mail, Shield, ExternalLink } from 'lucide-react';

// Interface pour les liens sécurisés
interface SecureLink {
  href: string;
  label: string;
  external?: boolean;
  ariaLabel?: string;
}

// Configuration des liens autorisés
const SECURE_LINKS: Record<string, SecureLink> = {
  services: { href: '#services', label: 'Services' },
  prestations: { href: '#prestations', label: 'Prestations' },
  values: { href: '#values', label: 'Valeurs' },
  projects: { href: '#projects', label: 'Projets' },
  github: { 
    href: 'https://github.com/3xF-Security', 
    label: 'GitHub',
    external: true,
    ariaLabel: 'Visiter notre profil GitHub (ouvre dans un nouvel onglet)'
  }
};

const SOCIAL_LINKS: Record<string, SecureLink> = {
  github: {
    href: 'https://github.com/3xF-Security',
    label: 'GitHub',
    external: true,
    ariaLabel: 'Suivez-nous sur GitHub'
  },
  twitter: {
    href: 'https://twitter.com/3xFsecurity',
    label: 'Twitter',
    external: true,
    ariaLabel: 'Suivez-nous sur Twitter'
  },
  linkedin: {
    href: 'https://linkedin.com/company/3xf-security',
    label: 'LinkedIn',
    external: true,
    ariaLabel: 'Suivez-nous sur LinkedIn'
  }
};

// Validation d'URL sécurisée
const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    // Autoriser uniquement les URLs HTTPS et les ancres locales
    return parsedUrl.protocol === 'https:' || url.startsWith('#');
  } catch {
    return url.startsWith('#');
  }
};

// Composant pour les liens sécurisés
interface SecureLinkComponentProps {
  link: SecureLink;
  className?: string;
  children: React.ReactNode;
}

const SecureLinkComponent: React.FC<SecureLinkComponentProps> = ({ 
  link, 
  className = '', 
  children 
}) => {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // Validation supplémentaire avant navigation
    if (!isValidUrl(link.href)) {
      e.preventDefault();
      console.warn('Blocked navigation to invalid URL:', link.href);
      return;
    }
  }, [link.href]);

  const linkProps = {
    href: link.href,
    className,
    onClick: handleClick,
    'aria-label': link.ariaLabel || link.label,
    ...(link.external && {
      target: '_blank',
      rel: 'noopener noreferrer',
      // Ajout d'un indicateur visuel pour les liens externes
      'data-external': 'true'
    })
  };

  return (
    <a {...linkProps}>
      {children}
      {link.external && (
        <ExternalLink 
          className="inline-block ml-1 w-3 h-3 opacity-50" 
          aria-hidden="true"
        />
      )}
    </a>
  );
};

// Composant pour l'email sécurisé
interface SecureEmailLinkProps {
  email: string;
  className?: string;
}

const SecureEmailLink: React.FC<SecureEmailLinkProps> = ({ email, className = '' }) => {
  // Validation de l'email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 254;
  };

  const handleEmailClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isValidEmail(email)) {
      e.preventDefault();
      console.warn('Invalid email address:', email);
      return;
    }
  }, [email]);

  if (!isValidEmail(email)) {
    return (
      <span className={className} aria-label="Email non disponible">
        <Mail className="w-4 h-4" />
        <span>Email non disponible</span>
      </span>
    );
  }

  return (
    <a
      href={`mailto:${email}`}
      className={className}
      onClick={handleEmailClick}
      aria-label={`Envoyer un email à ${email}`}
    >
      <Mail className="w-4 h-4" />
      <span>{email}</span>
    </a>
  );
};

const Footer: React.FC = () => {
  // Données de l'entreprise (constantes sécurisées)
  const COMPANY_DATA = {
    name: '3xF Security Labs',
    tagline: 'Find, Fix, Force - notre approche complète pour sécuriser vos systèmes.',
    email: 'contact@3xf-security.com',
    year: new Date().getFullYear(),
    motto: '"No flaw escapes. No patch delayed."'
  } as const;

  return (
    <footer 
      id="contact" 
      className="bg-steel/10 border-t border-steel/30 py-16 px-4 sm:px-6 lg:px-8"
      role="contentinfo"
      aria-label="Informations de contact et liens du site"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 bg-gradient-to-br from-cyan to-success rounded-lg flex items-center justify-center"
                role="img"
                aria-label="Logo 3xF Security"
              >
                <Shield className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-orbitron font-bold text-cyan">
                  3xF
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  Security Labs
                </p>
              </div>
            </div>
            
            <p className="font-mono text-sm text-gray-400 leading-relaxed">
              Spécialistes en cybersécurité offensive et défensive. {COMPANY_DATA.tagline}
            </p>
            
            {/* Tags sécurisés */}
            <div className="flex space-x-2" role="list" aria-label="Tags de l'entreprise">
              <span 
                className="px-2 py-1 bg-cyan/10 border border-cyan/30 rounded text-xs font-mono text-cyan"
                role="listitem"
              >
                #3xFsec
              </span>
              <span 
                className="px-2 py-1 bg-success/10 border border-success/30 rounded text-xs font-mono text-success"
                role="listitem"
              >
                #FindFixForce
              </span>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-orbitron font-bold text-white">
              Navigation
            </h4>
            <nav 
              className="flex flex-col space-y-2"
              role="navigation"
              aria-label="Navigation du pied de page"
            >
              {Object.entries(SECURE_LINKS).map(([key, link]) => (
                <SecureLinkComponent
                  key={key}
                  link={link}
                  className="font-mono text-sm text-gray-400 hover:text-cyan transition-colors duration-200 focus:text-cyan focus:outline-none focus:ring-2 focus:ring-cyan/50 rounded"
                >
                  {link.label}
                </SecureLinkComponent>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-orbitron font-bold text-white">
              Contact
            </h4>
            <div className="space-y-3">
              <SecureEmailLink
                email={COMPANY_DATA.email}
                className="flex items-center space-x-3 font-mono text-sm text-gray-400 hover:text-cyan transition-colors duration-200 focus:text-cyan focus:outline-none focus:ring-2 focus:ring-cyan/50 rounded"
              />
              
              {/* Réseaux sociaux sécurisés */}
              <div className="pt-4">
                <h5 className="text-sm font-mono text-gray-300 mb-3">
                  Suivez-nous
                </h5>
                <div 
                  className="flex space-x-4"
                  role="list"
                  aria-label="Liens vers nos réseaux sociaux"
                >
                  <SecureLinkComponent
                    link={SOCIAL_LINKS.github}
                    className="p-2 bg-steel/20 border border-steel/40 hover:border-cyan/50 hover:bg-steel/30 rounded-lg text-cyan hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan/50"
                  >
                    <Github className="w-5 h-5" aria-hidden="true" />
                    <span className="sr-only">GitHub</span>
                  </SecureLinkComponent>
                  
                  <SecureLinkComponent
                    link={SOCIAL_LINKS.twitter}
                    className="p-2 bg-steel/20 border border-steel/40 hover:border-cyan/50 hover:bg-steel/30 rounded-lg text-cyan hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan/50"
                  >
                    <Twitter className="w-5 h-5" aria-hidden="true" />
                    <span className="sr-only">Twitter</span>
                  </SecureLinkComponent>
                  
                  <SecureLinkComponent
                    link={SOCIAL_LINKS.linkedin}
                    className="p-2 bg-steel/20 border border-steel/40 hover:border-cyan/50 hover:bg-steel/30 rounded-lg text-cyan hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan/50"
                  >
                    <Linkedin className="w-5 h-5" aria-hidden="true" />
                    <span className="sr-only">LinkedIn</span>
                  </SecureLinkComponent>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barre du bas sécurisée */}
        <div className="mt-12 pt-8 border-t border-steel/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-mono text-sm text-gray-500">
              © {COMPANY_DATA.year} {COMPANY_DATA.name}. Tous droits réservés.
            </p>
            <p className="font-mono text-sm text-gray-500 italic">
              {COMPANY_DATA.motto}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Export sécurisé avec memo pour éviter les re-rendus inutiles
export default React.memo(Footer);