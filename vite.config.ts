import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Optimisation des dépendances
  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  // Configuration de sécurité pour le serveur de développement
  server: {
    // Headers de sécurité
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=()',
    },
    // Désactiver le serveur de développement en production
    hmr: process.env.NODE_ENV === 'development',
  },

  // Configuration pour la production
  build: {
    // Minification sécurisée
    minify: 'terser',
    terserOptions: {
      compress: {
        // Supprime les console.log en production
        drop_console: true,
        drop_debugger: true,
      },
      mangle: {
        // Obfusque les noms de variables
        safari10: true,
      },
    },

    // Configuration des chunks pour éviter l'exposition de code
    rollupOptions: {
      output: {
        // Génère des noms de fichiers avec hash pour éviter le cache poisoning
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        
        // Sépare les dépendances vendor
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },

    // Active le source map uniquement en développement
    sourcemap: process.env.NODE_ENV === 'development',
    
    // Désactive l'inlining des petits assets pour un meilleur contrôle CSP
    assetsInlineLimit: 0,
  },

  // Variables d'environnement sécurisées
  define: {
    // Expose uniquement les variables nécessaires
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },

  // Configuration des imports pour éviter les chemins dangereux
  resolve: {
    alias: {
      // Évite les imports relatifs profonds
      '@': '/src',
    },
  },
});