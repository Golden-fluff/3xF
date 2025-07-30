// =================================
// src/utils/security.ts - Utilitaires de sécurité
// =================================

export class SecurityUtils {
  // Validation sécurisée des emails
  static validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  // Échappement XSS
  static escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Validation d'URL sécurisée
  static isValidUrl(urlString: string): boolean {
    try {
      const url = new URL(urlString);
      return ['http:', 'https:'].includes(url.protocol);
    } catch {
      return false;
    }
  }

  // Génération de nonce sécurisé
  static generateNonce(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Validation des données d'entrée
  static sanitizeInput(input: string, maxLength: number = 1000): string {
    return input
      .trim()
      .slice(0, maxLength)
      .replace(/[<>]/g, '');
  }

  // Vérification CSRF token
  static validateCSRFToken(token: string): boolean {
    // Implémentation basique - à améliorer selon vos besoins
    return token && token.length >= 32 && /^[a-zA-Z0-9]+$/.test(token);
  }
}

// =================================
// src/hooks/useSecurity.ts - Hook de sécurité
// =================================

import { useEffect, useState } from 'react';
import type { SecurityContextType } from '../vite-env';

export const useSecurity = (): SecurityContextType => {
  const [isSecure, setIsSecure] = useState<boolean>(false);
  const [cspNonce] = useState<string>(() => SecurityUtils.generateNonce());

  useEffect(() => {
    // Vérifications de sécurité au montage
    const checkSecurity = () => {
      const isHTTPS = window.location.protocol === 'https:' || 
                     window.location.hostname === 'localhost';
      const hasSecureHeaders = document.querySelector('meta[http-equiv="Content-Security-Policy"]') !== null;
      
      setIsSecure(isHTTPS && hasSecureHeaders);
    };

    checkSecurity();
  }, []);

  const reportViolation = (violation: { type: string; details: string }) => {
    // Reporter les violations de sécurité
    if (process.env.NODE_ENV === 'development') {
      console.warn('Security Violation:', violation);
    }
    
    // En production, envoyer à un service de monitoring
    // fetch('/api/security/report', { method: 'POST', body: JSON.stringify(violation) });
  };

  return {
    isSecure,
    cspNonce,
    environment: import.meta.env.VITE_ENVIRONMENT || 'development',
    reportViolation,
  };
};

// =================================
// src/components/SecureForm.tsx - Composant de formulaire sécurisé
// =================================

import React, { useState, useCallback } from 'react';
import { SecurityUtils } from './security';

interface SecureFormProps {
  onSubmit: (data: Record<string, string>) => void;
  fields: Array<{
    name: string;
    type: 'text' | 'email' | 'password';
    required?: boolean;
    maxLength?: number;
  }>;
}

export const SecureForm: React.FC<SecureFormProps> = ({ onSubmit, fields }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: string, value: string, type: string): string => {
    switch (type) {
      case 'email':
        return SecurityUtils.validateEmail(value) ? '' : 'Email invalide';
      case 'password':
        return value.length >= 8 ? '' : 'Mot de passe trop court (min 8 caractères)';
      default:
        return value.trim() ? '' : 'Ce champ est requis';
    }
  }, []);

  const handleInputChange = useCallback((name: string, value: string, type: string, maxLength?: number) => {
    const sanitizedValue = SecurityUtils.sanitizeInput(value, maxLength);
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    
    const error = validateField(name, sanitizedValue, type);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Validation finale
      const newErrors: Record<string, string> = {};
      fields.forEach(field => {
        const value = formData[field.name] || '';
        const error = validateField(field.name, value, field.type);
        if (error) newErrors[field.name] = error;
      });
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, fields, isSubmitting, onSubmit, validateField]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(field => (
        <div key={field.name}>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value, field.type, field.maxLength)}
            className="form-input-secure"
            autoComplete="off"
            spellCheck={false}
            required={field.required}
            maxLength={field.maxLength}
          />
          {errors[field.name] && (
            <p className="text-alert text-xs mt-1">{errors[field.name]}</p>
          )}
        </div>
      ))}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-secure bg-cyan text-primary hover:bg-cyan/80"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
      </button>
    </form>
  );
};

// =================================
// src/contexts/SecurityContext.tsx - Contexte de sécurité
// =================================

import React, { createContext, useContext, ReactNode } from 'react';
import { useSecurity } from '../hooks/useSecurity';
import type { SecurityContextType } from '../vite-env';

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const security = useSecurity();
  
  return (
    <SecurityContext.Provider value={security}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurityContext = (): SecurityContextType => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurityContext must be used within a SecurityProvider');
  }
  return context;
};

// =================================
// .env.example - Variables d'environnement exemple
// =================================

# Configuration de l'application
VITE_APP_TITLE="3xF Security - Find. Fix. Force."
VITE_APP_VERSION="1.0.0"
VITE_ENVIRONMENT="development"

# Configuration API
VITE_API_URL="https://api.3xf-security.com"

# Configuration de sécurité
VITE_SECURITY_HEADERS_ENABLED="true"
VITE_CSRF_TOKEN_NAME="X-CSRF-Token"
VITE_CSP_REPORT_URI="/api/csp-report"

# Configuration des fonctionnalités
VITE_ENABLE_DEVTOOLS="true"
VITE_ENABLE_ANALYTICS="false"

# IMPORTANT: Ne jamais committer le fichier .env réel
# Ce fichier est un exemple des variables disponibles

// =================================
// robots.txt - Protection contre l'indexation non autorisée
// =================================

User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /config/
Disallow: /.env
Disallow: /src/
Disallow: /node_modules/
Disallow: /dist/
Disallow: /build/

# Autoriser uniquement les pages publiques
Allow: /
Allow: /services/
Allow: /contact/
Allow: /about/

# Délai entre les requêtes (en secondes)
Crawl-delay: 1

# Sitemap (à créer)
Sitemap: https://3xf-security.com/sitemap.xml