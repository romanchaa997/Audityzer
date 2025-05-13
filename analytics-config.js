// Analytics Configuration

// Plausible Analytics Setup - Privacy-focused analytics
const plausibleDomain = 'audityzer.com';
const plausibleScriptUrl = 'https://plausible.io/js/script.js';

// PostHog Setup - For session replay and event tracking
const posthogApiKey = 'phc_YourPostHogAPIKey'; // Replace with your actual API key
const posthogHost = 'https://app.posthog.com';

// UTM Parameter Tracking
function trackUtmParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_content: urlParams.get('utm_content'),
    utm_term: urlParams.get('utm_term')
  };

  // Store UTM parameters in localStorage
  if (utmParams.utm_source) {
    localStorage.setItem('utm_parameters', JSON.stringify(utmParams));
    
    // Send to PostHog if available
    if (typeof posthog !== 'undefined') {
      posthog.capture('utm_parameters_received', utmParams);
    }
  }
}

// Initialize analytics
function initAnalytics() {
  // Initialize Plausible
  const plausibleScript = document.createElement('script');
  plausibleScript.defer = true;
  plausibleScript.dataset.domain = plausibleDomain;
  plausibleScript.src = plausibleScriptUrl;
  document.head.appendChild(plausibleScript);

  // Initialize PostHog
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init(posthogApiKey, {api_host: posthogHost});

  // Track UTM parameters
  trackUtmParameters();

  // Track pageviews
  document.addEventListener('DOMContentLoaded', () => {
    // Custom event tracking for conversion points
    trackConversionPoints();
  });
}

// Track important conversion points
function trackConversionPoints() {
  // Track CTA clicks
  document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
      if (typeof plausible !== 'undefined') {
        plausible('CTA Click', {props: {button_text: button.textContent.trim()}});
      }
      if (typeof posthog !== 'undefined') {
        posthog.capture('CTA Click', {button_text: button.textContent.trim()});
      }
    });
  });

  // Track community link clicks
  document.querySelectorAll('.community-link').forEach(link => {
    link.addEventListener('click', () => {
      const linkType = link.textContent.trim();
      if (typeof plausible !== 'undefined') {
        plausible('Community Link Click', {props: {link_type: linkType}});
      }
      if (typeof posthog !== 'undefined') {
        posthog.capture('Community Link Click', {link_type: linkType});
      }
    });
  });

  // Track scrolling depth
  let scrollDepthTracked = {};
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.offsetHeight - window.innerHeight)) * 100);
    const depths = [25, 50, 75, 100];
    
    depths.forEach(depth => {
      if (scrollPercent >= depth && !scrollDepthTracked[depth]) {
        scrollDepthTracked[depth] = true;
        if (typeof posthog !== 'undefined') {
          posthog.capture('Scroll Depth', {depth: depth});
        }
      }
    });
  });
}

// Export functions
export { initAnalytics, trackUtmParameters }; 