/// <reference types="vite/client" />

// Interface sécurisée pour les variables d'environnement
interface ImportMetaEnv {
  // Variables d'environnement publiques uniquement (préfixées par VITE_)
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_API_URL: string;
  readonly VITE_ENVIRONMENT: 'development' | 'staging' | 'production';
  
  // Variables de configuration sécurisée
  readonly VITE_ENABLE_DEVTOOLS: 'true' | 'false';
  readonly VITE_ENABLE_ANALYTICS: 'true' | 'false';
  readonly VITE_CSP_REPORT_URI?: string;
  
  // Variables de sécurité
  readonly VITE_SECURITY_HEADERS_ENABLED: 'true' | 'false';
  readonly VITE_CSRF_TOKEN_NAME: string;
  
  // Ne JAMAIS exposer de secrets, tokens, ou clés privées ici
  // Ces variables sont visibles côté client !
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Déclarations sécurisées pour les modules
declare module "*.svg" {
  import type { FunctionComponent, SVGProps } from "react";
  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;
  const content: string;
  export { ReactComponent };
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

declare module "*.avif" {
  const content: string;
  export default content;
}

declare module "*.ico" {
  const content: string;
  export default content;
}

// Types de sécurité pour l'application
declare global {
  interface Window {
    // Interface sécurisée pour les fonctions globales autorisées
    __SECURITY_CONFIG__?: {
      readonly cspNonce?: string;
      readonly version?: string;
      readonly environment?: string;
    };
    
    // Désactiver certaines fonctions dangereuses en production
    eval?: never;
    Function?: never;
    
    // Types pour les fonctions de sécurité personnalisées
    reportSecurityViolation?: (violation: {
      type: string;
      details: string;
      timestamp: number;
    }) => void;
  }
  
  // Variables d'environnement Node.js sécurisées
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

// Types de sécurité pour les composants React
declare module 'react' {
  interface HTMLAttributes<T> {
    // Attributs de sécurité personnalisés
    'data-testid'?: string;
    'data-secure'?: boolean;
    nonce?: string;
  }
  
  interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
    // Forcer l'utilisation de nonce pour tous les scripts
    nonce: string;
  }
  
  interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    // Forcer l'utilisation de nonce pour tous les styles inline
    nonce?: string;
  }
}

// Types pour les hooks de sécurité personnalisés
export interface SecurityContextType {
  readonly isSecure: boolean;
  readonly cspNonce?: string;
  readonly environment: 'development' | 'staging' | 'production';
  readonly reportViolation: (violation: {
    type: string;
    details: string;
  }) => void;
}

// Types pour la validation des entrées
export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: readonly string[];
  readonly sanitizedValue?: string;
}

export interface SecureInputValidator {
  validateEmail: (email: string) => ValidationResult;
  validatePassword: (password: string) => ValidationResult;
  validateUrl: (url: string) => ValidationResult;
  sanitizeHtml: (html: string) => string;
  escapeString: (str: string) => string;
}

// Types pour les erreurs de sécurité
export class SecurityError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly severity: 'low' | 'medium' | 'high' | 'critical'
  ) {
    super(message);
    this.name = 'SecurityError';
  }
}

// Types pour les événements de sécurité
export interface SecurityEvent {
  readonly type: 'csp_violation' | 'xss_attempt' | 'csrf_violation' | 'unauthorized_access';
  readonly timestamp: number;
  readonly details: Record<string, unknown>;
  readonly severity: 'low' | 'medium' | 'high' | 'critical';
}

// Configuration des politiques de sécurité
export interface SecurityPolicy {
  readonly csp: {
    readonly defaultSrc: readonly string[];
    readonly scriptSrc: readonly string[];
    readonly styleSrc: readonly string[];
    readonly imgSrc: readonly string[];
    readonly connectSrc: readonly string[];
    readonly fontSrc: readonly string[];
    readonly objectSrc: readonly string[];
    readonly mediaSrc: readonly string[];
    readonly frameSrc: readonly string[];
  };
  readonly headers: {
    readonly xFrameOptions: 'DENY' | 'SAMEORIGIN';
    readonly xContentTypeOptions: 'nosniff';
    readonly xXSSProtection: '1; mode=block';
    readonly referrerPolicy: string;
    readonly permissionsPolicy: Record<string, string[]>;
  };
}

export {};