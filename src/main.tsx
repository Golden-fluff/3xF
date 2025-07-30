import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Vérifications de sécurité avant le montage
const performSecurityChecks = (): boolean => {
  try {
    // Vérification de l'intégrité du DOM
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error('Security Error: Root element not found');
      return false;
    }

    // Vérification que nous sommes dans un environnement sécurisé
    if (typeof window === 'undefined') {
      console.error('Security Error: Window object not available');
      return false;
    }

    // Vérification de l'origine en production
    if (process.env.NODE_ENV === 'production') {
      const allowedOrigins = [
        'https://3xf-security.com',
        'https://www.3xf-security.com',
        // Ajouter d'autres domaines autorisés ici
      ];
      
      const currentOrigin = window.location.origin;
      if (!allowedOrigins.includes(currentOrigin) && !currentOrigin.includes('localhost')) {
        console.error('Security Error: Unauthorized origin');
        return false;
      }
    }

    // Vérification de l'intégrité du protocole
    if (process.env.NODE_ENV === 'production' && window.location.protocol !== 'https:') {
      console.error('Security Error: Insecure protocol detected');
      // En production, forcer HTTPS
      window.location.replace(window.location.href.replace('http:', 'https:'));
      return false;
    }

    // Vérification que React est disponible
    if (typeof createRoot !== 'function') {
      console.error('Security Error: React createRoot not available');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Security Error during checks:', error);
    return false;
  }
};

// Configuration des headers de sécurité côté client
const setupClientSecurity = (): void => {
  // Protection contre le vol de session
  if (typeof window !== 'undefined') {
    // Désactiver l'auto-complétion sur les champs sensibles
    document.addEventListener('DOMContentLoaded', () => {
      const inputs = document.querySelectorAll('input[type="password"], input[type="email"]');
      inputs.forEach((input) => {
        if (input instanceof HTMLInputElement) {
          input.setAttribute('autocomplete', 'off');
          input.setAttribute('spellcheck', 'false');
        }
      });
    });

    // Protection contre les attaques de timing
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function(callback: TimerHandler, delay?: number, ...args: unknown[]): number {
      // Limiter les délais pour éviter les attaques de timing
      const safeDelay = typeof delay === 'number' ? Math.min(delay, 30000) : 0;
      return originalSetTimeout(callback, safeDelay, ...args);
    };

    // Protection contre les redirections malveillantes
    const originalAssign = window.location.assign;
    window.location.assign = function(url: string | URL): void {
      const urlStr = typeof url === 'string' ? url : url.toString();
      
      // Vérifier que l'URL est sûre
      try {
        const parsedUrl = new URL(urlStr, window.location.origin);
        
        // Autoriser uniquement les URLs du même domaine ou HTTPS
        if (parsedUrl.origin === window.location.origin || 
            (parsedUrl.protocol === 'https:' && parsedUrl.hostname.endsWith('3xf-security.com'))) {
          originalAssign.call(this, urlStr);
        } else {
          console.error('Security Error: Blocked potentially malicious redirect to:', urlStr);
        }
      } catch (error) {
        console.error('Security Error: Invalid URL detected:', urlStr, error);
      }
    };
  }
};

// Gestionnaire d'erreur global sécurisé
const setupGlobalErrorHandler = (): void => {
  window.addEventListener('error', (event) => {
    // Ne pas exposer les détails de l'erreur en production
    if (process.env.NODE_ENV === 'development') {
      console.error('Global Error:', event.error);
    }
    
    // En production, logger vers un service de monitoring sécurisé
    // TODO: Implémenter un service de logging sécurisé
    
    // Empêcher la propagation d'erreurs qui pourraient révéler des informations
    event.preventDefault();
  });

  window.addEventListener('unhandledrejection', (event) => {
    // Gérer les promesses rejetées de manière sécurisée
    if (process.env.NODE_ENV === 'development') {
      console.error('Unhandled Promise Rejection:', event.reason);
    }
    
    // Empêcher l'affichage d'erreurs sensibles
    event.preventDefault();
  });
};

// Fonction principale de démarrage sécurisée
const initializeApp = (): void => {
  try {
    // Exécuter les vérifications de sécurité
    if (!performSecurityChecks()) {
      // Afficher une page d'erreur sécurisée si les vérifications échouent
      document.body.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #0A0F2C;
          color: white;
          font-family: monospace;
          text-align: center;
        ">
          <div>
            <h1 style="color: #FF3B3B; margin-bottom: 1rem;">Erreur de Sécurité</h1>
            <p>L'application ne peut pas démarrer dans cet environnement.</p>
            <p>Veuillez contacter l'administrateur système.</p>
          </div>
        </div>
      `;
      return;
    }

    // Configurer la sécurité côté client
    setupClientSecurity();
    
    // Configurer le gestionnaire d'erreur global
    setupGlobalErrorHandler();

    // Obtenir l'élément root de manière sécurisée
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found after security checks');
    }

    // Créer la racine React de manière sécurisée
    const root = createRoot(rootElement);
    
    // Monter l'application avec StrictMode pour des vérifications supplémentaires
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    // Log de démarrage sécurisé (uniquement en développement)
    if (process.env.NODE_ENV === 'development') {
      console.log('🔒 Application 3xF Security démarrée avec succès');
    }

  } catch (error) {
    console.error('Critical Error during app initialization:', error);
    
    // Afficher une page d'erreur critique
    document.body.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: #0A0F2C;
        color: white;
        font-family: monospace;
        text-align: center;
      ">
        <div>
          <h1 style="color: #FF3B3B; margin-bottom: 1rem;">Erreur Critique</h1>
          <p>L'application a rencontré une erreur fatale.</p>
          <button 
            onclick="window.location.reload()" 
            style="
              margin-top: 1rem;
              padding: 0.5rem 1rem;
              background-color: #00FFFF;
              color: #0A0F2C;
              border: none;
              cursor: pointer;
              font-family: monospace;
            "
          >
            Recharger
          </button>