
/**
 * Analytics Configuration
 * Handles PostHog and Plausible analytics setup
 */

// Global analytics variables
let posthog, plausible;

// PostHog Configuration
const posthogConfig = {
  api_host: 'https://app.posthog.com',
  autocapture: true,
  capture_pageview: true,
  disable_session_recording: false,
  loaded: function(posthog) {
    if (process.env.NODE_ENV === 'development') {
      posthog.debug();
    }
  }
};

// Plausible Configuration
const plausibleConfig = {
  domain: 'audityzer.com',
  trackLocalhost: false,
  apiHost: 'https://plausible.io'
};

// Initialize analytics
function initializeAnalytics() {
  // Initialize PostHog
  if (typeof window !== 'undefined' && window.posthog) {
    posthog = window.posthog;
    posthog.init('your-posthog-key', posthogConfig);
  }

  // Initialize Plausible
  if (typeof window !== 'undefined' && window.plausible) {
    plausible = window.plausible;
  }
}

// Track events
function trackEvent(eventName, properties = {}) {
  if (posthog) {
    posthog.capture(eventName, properties);
  }
  
  if (plausible) {
    plausible(eventName, { props: properties });
  }
}

// Track page views
function trackPageView(url) {
  if (posthog) {
    posthog.capture('$pageview', { $current_url: url });
  }
  
  if (plausible) {
    plausible('pageview', { u: url });
  }
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeAnalytics,
    trackEvent,
    trackPageView,
    posthogConfig,
    plausibleConfig
  };
}
