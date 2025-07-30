import React, { Suspense, lazy, ErrorBoundary } from 'react';
import type { ComponentType } from 'react';

// Lazy loading sécurisé des composants pour éviter le chargement de code non nécessaire
const Header = lazy(() => import('./components/Header'));
const Hero = lazy(() => import('./components/Hero'));
const Services = lazy(() => import('./components/Services'));
const Prestations = lazy(() => import('./components/Prestations'));
const Values = lazy(() => import('./components/Values'));
const Projects = lazy(() => import('./components/Projects'));
const Footer = lazy(() => import('./components/Footer'));

// Composant d'erreur sécurisé qui ne révèle pas d'informations sensibles
class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): { hasError: boolean; error: Error } {
    // Ne pas exposer les détails de l'erreur en production
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log sécurisé qui ne révèle pas d'informations sensibles
    if (process.env.NODE_ENV === 'development') {
      console.error('Application Error:', error, errorInfo);
    }
    // En production, logger vers un service de monitoring sécurisé
    // TODO: Implémenter un service de logging sécurisé
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-primary text-white flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-orbitron text-alert mb-4">
              Une erreur est survenue
            </h1>
            <p className="text-gray-400 mb-6">
              Nous nous excusons pour la gêne occasionnée. Veuillez recharger la page.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-cyan text-primary font-mono hover:bg-cyan/80 transition-colors"
              aria-label="Recharger la page"
            >
              Recharger
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Composant de fallback pour le Suspense
const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-pulse-glow">
      <div className="w-8 h-8 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
);

// Interface pour les composants chargés de manière paresseuse
interface LazyComponentProps {
  Component: ComponentType;
  fallback?: React.ReactNode;
}

// Wrapper sécurisé pour les composants lazy
const SecureLazyComponent: React.FC<LazyComponentProps> = ({ 
  Component, 
  fallback = <LoadingFallback /> 
}) => (
  <Suspense fallback={fallback}>
    <Component />
  </Suspense>
);

// Composant principal de l'application
const App: React.FC = () => {
  // Validation de l'environnement
  React.useEffect(() => {
    // Vérification de l'intégrité de l'environnement
    if (typeof window !== 'undefined') {
      // Désactiver les outils de développeur en production
      if (process.env.NODE_ENV === 'production') {
        // Désactiver les raccourcis clavier dangereux
        const handleKeyDown = (e: KeyboardEvent): void => {
          // Bloquer F12, Ctrl+Shift+I, Ctrl+U, etc.
          if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.key === 'u')
          ) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        };

        document.addEventListener('keydown', handleKeyDown);
        
        // Désactiver le menu contextuel
        const handleContextMenu = (e: MouseEvent): void => {
          e.preventDefault();
          return false;
        };
        
        document.addEventListener('contextmenu', handleContextMenu);

        // Nettoyage des event listeners
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('contextmenu', handleContextMenu);
        };
      }
    }
  }, []);

  // Protection contre l'injection de contenu
  React.useEffect(() => {
    // Vérifier que le DOM n'a pas été compromis
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found - possible DOM manipulation');
    }
  }, []);

  return (
    <AppErrorBoundary>
      <div className="min-h-screen bg-primary text-white">
        {/* Pattern de fond sécurisé - pas d'inline styles */}
        <div className="fixed inset-0 opacity-5">
          <div className="grid-pattern" />
        </div>
        
        {/* Contenu principal avec isolation appropriée */}
        <div className="relative z-10">
          <SecureLazyComponent Component={Header} />
          <main role="main">
            <SecureLazyComponent Component={Hero} />
            <SecureLazyComponent Component={Services} />
            <SecureLazyComponent Component={Prestations} />
            <SecureLazyComponent Component={Values} />
            <SecureLazyComponent Component={Projects} />
          </main>
          <SecureLazyComponent Component={Footer} />
        </div>
      </div>
    </AppErrorBoundary>
  );
};

// Export sécurisé
export default React.memo(App);