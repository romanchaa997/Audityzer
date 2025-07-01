
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 30000,
      url: ['http://localhost:4173'],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        preset: 'desktop',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa']
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.90 }],
        'categories:seo': ['error', { minScore: 0.90 }],
        'categories:pwa': ['error', { minScore: 0.80 }],
        
        // Performance metrics
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],
        
        // Best practices
        'uses-https': 'error',
        'uses-http2': 'error',
        'uses-text-compression': 'error',
        'uses-responsive-images': 'error',
        'efficient-animated-content': 'error',
        'unused-css-rules': 'error',
        'unused-javascript': 'error',
        
        // Security
        'is-on-https': 'error',
        'external-anchors-use-rel-noopener': 'error',
        'no-vulnerable-libraries': 'error',
        
        // PWA
        'service-worker': 'error',
        'installable-manifest': 'error',
        'splash-screen': 'error',
        'themed-omnibox': 'error',
        'content-width': 'error',
        'viewport': 'error'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    },
    server: {
      port: 9001,
      storage: './lhci-reports'
    }
  }
};
