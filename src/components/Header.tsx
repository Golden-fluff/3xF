import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Menu, X, Shield } from 'lucide-react';

// Interface pour les liens de navigation
interface NavigationItem {
  href: string;
  label: string;
  id: string;
}

// Configuration sécurisée des liens de navigation
const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { href: '#services', label: 'Services', id: 'nav-services' },
  { href: '#prestations', label: 'Prestations', id: 'nav-prestations' },
  { href: '#values', label: 'Valeurs', id: 'nav-values' },
  { href: '#projects', label: 'Projets', id: 'nav-projects' },
  { href: '#contact', label: 'Contact', id: 'nav-contact' }
] as const;

// Validation des ancres
const isValidAnchor = (href: string): boolean => {
  return href.startsWith('#') && href.length > 1;
};

// Composant pour les liens de navigation sécurisés
interface SecureNavLinkProps {
  item: NavigationItem;
  className?: string;
  onClick?: () => void;
}

const SecureNavLink: React.FC<SecureNavLinkProps> = ({ 
  item, 
  className = 'nav-link', 
  onClick 
}) => {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // Validation de sécurité avant navigation
    if (!isValidAnchor(item.href)) {
      e.preventDefault();
      console.warn('Blocked navigation to invalid anchor:', item.href);
      return;
    }

    // Vérifier que l'élément cible existe
    const targetElement = document.querySelector(item.href);
    if (!targetElement) {
      e.preventDefault();
      console.warn('Target element not found for anchor:', item.href);
      return;
    }

    // Appeler le callback si fourni (pour fermer le menu mobile)
    onClick?.();

    // Navigation sécurisée avec smooth scroll
    setTimeout(() => {
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  }, [item.href, onClick]);

  return (
    <a
      href={item.href}
      className={className}
      onClick={handleClick}
      id={item.id}
      aria-label={`Naviguer vers la section ${item.label}`}
      role="menuitem"
    >
      {item.label}
    </a>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Gestion sécurisée de l'état du menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Gestion du scroll pour l'effet de transparence
  useEffect(() => {
    const handleScroll = (): void => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    // Throttle du scroll pour les performances
    let ticking = false;
    const throttledHandleScroll = (): void => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  // Gestion des touches clavier pour l'accessibilité
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, closeMenu]);

  // Fermer le menu lors du clic extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !menuButtonRef.current?.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);

  // Prévenir le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Classes dynamiques pour l'header
  const headerClasses = `
    fixed w-full top-0 z-50 transition-all duration-300
    ${isScrolled 
      ? 'bg-primary/95 backdrop-blur-lg shadow-lg shadow-cyan/10' 
      : 'bg-primary/90 backdrop-blur-md'
    }
    border-b border-steel/20
  `.trim();

  return (
    <header 
      className={headerClasses}
      role="banner"
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo sécurisé */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div 
                className="w-10 h-10 bg-gradient-to-br from-cyan to-success rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                role="img"
                aria-label="Logo 3xF Security"
              >
                <Shield 
                  className="w-6 h-6 text-primary" 
                  aria-hidden="true"
                />
              </div>
              {/* Indicateur de statut sécurisé */}
              <div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse-glow"
                role="status"
                aria-label="Système sécurisé et actif"
                title="Système sécurisé"
              />
            </div>
            <div>
              <h1 className="text-xl font-orbitron font-bold text-cyan">
                3xF
              </h1>
              <p className="text-xs text-gray-400 font-mono -mt-1">
                Security Labs
              </p>
            </div>
          </div>

          {/* Navigation desktop sécurisée */}
          <nav 
            className="hidden md:flex space-x-8"
            role="navigation"
            aria-label="Navigation principale desktop"
          >
            {NAVIGATION_ITEMS.map((item) => (
              <SecureNavLink
                key={item.id}
                item={item}
                className="nav-link focus:outline-none focus:ring-2 focus:ring-cyan/50 rounded px-2 py-1 transition-all duration-200"
              />
            ))}
          </nav>

          {/* Bouton menu mobile sécurisé */}
          <button
            ref={menuButtonRef}
            className="md:hidden text-cyan hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan/50 rounded p-1"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            type="button"
          >
            {isMenuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Navigation mobile sécurisée */}
        {isMenuOpen && (
          <nav
            ref={menuRef}
            id="mobile-menu"
            className="md:hidden py-4 border-t border-steel/20 animate-slide-in"
            role="navigation"
            aria-label="Navigation principale mobile"
          >
            <div 
              className="flex flex-col space-y-4"
              role="menu"
              aria-orientation="vertical"
            >
              {NAVIGATION_ITEMS.map((item) => (
                <SecureNavLink
                  key={`mobile-${item.id}`}
                  item={item}
                  className="nav-link focus:outline-none focus:ring-2 focus:ring-cyan/50 rounded px-2 py-1 transition-all duration-200"
                  onClick={closeMenu}
                />
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

// Export sécurisé avec memo pour optimiser les performances
export default React.memo(Header);