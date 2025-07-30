# =================================
# .nvmrc - Version Node.js sécurisée
# =================================
18.19.0

# =================================
# .npmrc - Configuration NPM sécurisée
# =================================
audit-level=moderate
fund=false
package-lock=true
save-exact=true
engine-strict=true
optional=false
progress=false
# Activer l'audit automatique
audit=true
# Désactiver les scripts automatiques pour éviter les attaques
ignore-scripts=false

# =================================
# security.md - Documentation de sécurité
# =================================
# Politique de Sécurité

## Versions Supportées

| Version | Support Sécurité |
| ------- | ---------------- |
| 1.x.x   | ✅ Supportée     |

## Signaler une Vulnérabilité

Si vous découvrez une vulnérabilité de sécurité, veuillez :

1. **NE PAS** créer d'issue publique
2. Envoyer un email à security@3xf-security.com
3. Inclure une description détaillée du problème
4. Fournir des étapes pour reproduire si possible

Nous nous engageons à répondre dans les 24 heures.

## Bonnes Pratiques de Sécurité

- Gardez toutes les dépendances à jour
- Utilisez HTTPS en production
- Validez toutes les entrées utilisateur
- Implémentez CSP stricte
- Auditez régulièrement les dépendances

# =================================
# .htaccess - Configuration Apache (si applicable)
# =================================
# Headers de sécurité
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

# CSP
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;"

# Désactiver la signature du serveur
ServerTokens Prod
ServerSignature Off

# Bloquer l'accès aux fichiers sensibles
<Files ~ "^\.">
    Order allow,deny
    Deny from all
</Files>

<Files ~ "(package\.json|tsconfig.*\.json|vite\.config\.ts|\.env)$">
    Order allow,deny
    Deny from all
</Files>

# =================================
# nginx.conf - Configuration Nginx (si applicable)
# =================================
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    # SSL Configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;";
    
    # Hide server information
    server_tokens off;
    
    # Block access to sensitive files
    location ~ /\. {
        deny all;
    }
    
    location ~ (package\.json|tsconfig.*\.json|vite\.config\.ts|\.env)$ {
        deny all;
    }
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;
    limit_req zone=one burst=20 nodelay;
    
    root /path/to/your/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}