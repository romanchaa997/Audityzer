#!/usr/bin/env node
// Analytics Setup Script

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuration object
const config = {
  plausible: {
    domain: '',
    enabled: false
  },
  posthog: {
    apiKey: '',
    host: 'https://app.posthog.com',
    enabled: false
  },
  umami: {
    websiteId: '',
    host: '',
    enabled: false
  },
  general: {
    trackUtmParameters: true,
    trackScrollDepth: true,
    trackClickEvents: true
  }
};

// Helper to ask questions
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Helper to create directories if they don't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Setup Plausible
async function setupPlausible() {
  console.log('\n--- Plausible Analytics Setup ---');
  
  const usePlausible = await askQuestion('Do you want to use Plausible Analytics? (y/n): ');
  if (usePlausible.toLowerCase() === 'y') {
    config.plausible.enabled = true;
    config.plausible.domain = await askQuestion('Enter your domain for Plausible (e.g., audityzer.com): ');
    console.log('Plausible configuration saved.');
  } else {
    console.log('Skipping Plausible setup.');
  }
}

// Setup PostHog
async function setupPostHog() {
  console.log('\n--- PostHog Setup ---');
  
  const usePostHog = await askQuestion('Do you want to use PostHog for event tracking and session replay? (y/n): ');
  if (usePostHog.toLowerCase() === 'y') {
    config.posthog.enabled = true;
    config.posthog.apiKey = await askQuestion('Enter your PostHog API key: ');
    
    const customHost = await askQuestion('Do you use a custom PostHog host? (y/n): ');
    if (customHost.toLowerCase() === 'y') {
      config.posthog.host = await askQuestion('Enter your PostHog host URL: ');
    }
    
    console.log('PostHog configuration saved.');
  } else {
    console.log('Skipping PostHog setup.');
  }
}

// Setup Umami
async function setupUmami() {
  console.log('\n--- Umami Setup ---');
  
  const useUmami = await askQuestion('Do you want to use Umami for privacy-focused analytics? (y/n): ');
  if (useUmami.toLowerCase() === 'y') {
    config.umami.enabled = true;
    config.umami.websiteId = await askQuestion('Enter your Umami website ID: ');
    config.umami.host = await askQuestion('Enter your Umami host URL: ');
    console.log('Umami configuration saved.');
  } else {
    console.log('Skipping Umami setup.');
  }
}

// Configure general tracking options
async function configureGeneralOptions() {
  console.log('\n--- General Tracking Configuration ---');
  
  const trackUtm = await askQuestion('Track UTM parameters? (y/n): ');
  config.general.trackUtmParameters = trackUtm.toLowerCase() === 'y';
  
  const trackScroll = await askQuestion('Track scroll depth? (y/n): ');
  config.general.trackScrollDepth = trackScroll.toLowerCase() === 'y';
  
  const trackClicks = await askQuestion('Track click events on buttons and links? (y/n): ');
  config.general.trackClickEvents = trackClicks.toLowerCase() === 'y';
  
  console.log('General tracking configuration saved.');
}

// Save configuration to file
function saveConfiguration() {
  const configPath = path.join(process.cwd(), 'analytics-config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`\nConfiguration saved to ${configPath}`);
  
  // Update analytics-config.js with the new configuration
  updateAnalyticsScript();
}

// Update the analytics script with the new configuration
function updateAnalyticsScript() {
  const analyticsScript = path.join(process.cwd(), 'analytics-config.js');
  
  let scriptContent = `// Analytics Configuration - Generated on ${new Date().toLocaleString()}\n\n`;
  
  // Add Plausible configuration
  if (config.plausible.enabled) {
    scriptContent += `// Plausible Analytics Setup - Privacy-focused analytics\n`;
    scriptContent += `const plausibleDomain = '${config.plausible.domain}';\n`;
    scriptContent += `const plausibleScriptUrl = 'https://plausible.io/js/script.js';\n\n`;
  }
  
  // Add PostHog configuration
  if (config.posthog.enabled) {
    scriptContent += `// PostHog Setup - For session replay and event tracking\n`;
    scriptContent += `const posthogApiKey = '${config.posthog.apiKey}';\n`;
    scriptContent += `const posthogHost = '${config.posthog.host}';\n\n`;
  }
  
  // Add Umami configuration
  if (config.umami.enabled) {
    scriptContent += `// Umami Setup - Privacy-focused analytics\n`;
    scriptContent += `const umamiWebsiteId = '${config.umami.websiteId}';\n`;
    scriptContent += `const umamiScriptUrl = '${config.umami.host}/script.js';\n\n`;
  }
  
  // Add UTM parameter tracking
  scriptContent += `// UTM Parameter Tracking\n`;
  scriptContent += `function trackUtmParameters() {\n`;
  scriptContent += `  const urlParams = new URLSearchParams(window.location.search);\n`;
  scriptContent += `  const utmParams = {\n`;
  scriptContent += `    utm_source: urlParams.get('utm_source'),\n`;
  scriptContent += `    utm_medium: urlParams.get('utm_medium'),\n`;
  scriptContent += `    utm_campaign: urlParams.get('utm_campaign'),\n`;
  scriptContent += `    utm_content: urlParams.get('utm_content'),\n`;
  scriptContent += `    utm_term: urlParams.get('utm_term')\n`;
  scriptContent += `  };\n\n`;
  scriptContent += `  // Store UTM parameters in localStorage\n`;
  scriptContent += `  if (utmParams.utm_source) {\n`;
  scriptContent += `    localStorage.setItem('utm_parameters', JSON.stringify(utmParams));\n`;
  scriptContent += `    \n`;
  
  if (config.posthog.enabled) {
    scriptContent += `    // Send to PostHog if available\n`;
    scriptContent += `    if (typeof posthog !== 'undefined') {\n`;
    scriptContent += `      posthog.capture('utm_parameters_received', utmParams);\n`;
    scriptContent += `    }\n`;
  }
  
  scriptContent += `  }\n`;
  scriptContent += `}\n\n`;
  
  // Add initialization function
  scriptContent += `// Initialize analytics\n`;
  scriptContent += `function initAnalytics() {\n`;
  
  // Initialize Plausible
  if (config.plausible.enabled) {
    scriptContent += `  // Initialize Plausible\n`;
    scriptContent += `  const plausibleScript = document.createElement('script');\n`;
    scriptContent += `  plausibleScript.defer = true;\n`;
    scriptContent += `  plausibleScript.dataset.domain = plausibleDomain;\n`;
    scriptContent += `  plausibleScript.src = plausibleScriptUrl;\n`;
    scriptContent += `  document.head.appendChild(plausibleScript);\n\n`;
  }
  
  // Initialize PostHog
  if (config.posthog.enabled) {
    scriptContent += `  // Initialize PostHog\n`;
    scriptContent += `  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);\n`;
    scriptContent += `  posthog.init(posthogApiKey, {api_host: posthogHost});\n\n`;
  }
  
  // Initialize Umami
  if (config.umami.enabled) {
    scriptContent += `  // Initialize Umami\n`;
    scriptContent += `  const umamiScript = document.createElement('script');\n`;
    scriptContent += `  umamiScript.async = true;\n`;
    scriptContent += `  umamiScript.defer = true;\n`;
    scriptContent += `  umamiScript.dataset.websiteId = umamiWebsiteId;\n`;
    scriptContent += `  umamiScript.src = umamiScriptUrl;\n`;
    scriptContent += `  document.head.appendChild(umamiScript);\n\n`;
  }
  
  // Add UTM parameter tracking
  if (config.general.trackUtmParameters) {
    scriptContent += `  // Track UTM parameters\n`;
    scriptContent += `  trackUtmParameters();\n\n`;
  }
  
  // Add general tracking
  scriptContent += `  // Track pageviews\n`;
  scriptContent += `  document.addEventListener('DOMContentLoaded', () => {\n`;
  
  if (config.general.trackClickEvents || config.general.trackScrollDepth) {
    scriptContent += `    // Custom event tracking for conversion points\n`;
    scriptContent += `    trackConversionPoints();\n`;
  }
  
  scriptContent += `  });\n`;
  scriptContent += `}\n\n`;
  
  // Add conversion tracking function
  if (config.general.trackClickEvents || config.general.trackScrollDepth) {
    scriptContent += `// Track important conversion points\n`;
    scriptContent += `function trackConversionPoints() {\n`;
    
    // Track button clicks
    if (config.general.trackClickEvents) {
      scriptContent += `  // Track CTA clicks\n`;
      scriptContent += `  document.querySelectorAll('.btn-primary').forEach(button => {\n`;
      scriptContent += `    button.addEventListener('click', () => {\n`;
      
      if (config.plausible.enabled) {
        scriptContent += `      if (typeof plausible !== 'undefined') {\n`;
        scriptContent += `        plausible('CTA Click', {props: {button_text: button.textContent.trim()}});\n`;
        scriptContent += `      }\n`;
      }
      
      if (config.posthog.enabled) {
        scriptContent += `      if (typeof posthog !== 'undefined') {\n`;
        scriptContent += `        posthog.capture('CTA Click', {button_text: button.textContent.trim()});\n`;
        scriptContent += `      }\n`;
      }
      
      scriptContent += `    });\n`;
      scriptContent += `  });\n\n`;
      
      scriptContent += `  // Track community link clicks\n`;
      scriptContent += `  document.querySelectorAll('.community-link').forEach(link => {\n`;
      scriptContent += `    link.addEventListener('click', () => {\n`;
      scriptContent += `      const linkType = link.textContent.trim();\n`;
      
      if (config.plausible.enabled) {
        scriptContent += `      if (typeof plausible !== 'undefined') {\n`;
        scriptContent += `        plausible('Community Link Click', {props: {link_type: linkType}});\n`;
        scriptContent += `      }\n`;
      }
      
      if (config.posthog.enabled) {
        scriptContent += `      if (typeof posthog !== 'undefined') {\n`;
        scriptContent += `        posthog.capture('Community Link Click', {link_type: linkType});\n`;
        scriptContent += `      }\n`;
      }
      
      scriptContent += `    });\n`;
      scriptContent += `  });\n\n`;
    }
    
    // Track scroll depth
    if (config.general.trackScrollDepth) {
      scriptContent += `  // Track scrolling depth\n`;
      scriptContent += `  let scrollDepthTracked = {};\n`;
      scriptContent += `  window.addEventListener('scroll', () => {\n`;
      scriptContent += `    const scrollPercent = Math.round((window.scrollY / (document.body.offsetHeight - window.innerHeight)) * 100);\n`;
      scriptContent += `    const depths = [25, 50, 75, 100];\n`;
      scriptContent += `    \n`;
      scriptContent += `    depths.forEach(depth => {\n`;
      scriptContent += `      if (scrollPercent >= depth && !scrollDepthTracked[depth]) {\n`;
      scriptContent += `        scrollDepthTracked[depth] = true;\n`;
      
      if (config.posthog.enabled) {
        scriptContent += `        if (typeof posthog !== 'undefined') {\n`;
        scriptContent += `          posthog.capture('Scroll Depth', {depth: depth});\n`;
        scriptContent += `        }\n`;
      }
      
      scriptContent += `      }\n`;
      scriptContent += `    });\n`;
      scriptContent += `  });\n`;
    }
    
    scriptContent += `}\n\n`;
  }
  
  // Add exports
  scriptContent += `// Export functions\n`;
  scriptContent += `export { initAnalytics, trackUtmParameters };`;
  
  // Write the analytics script
  fs.writeFileSync(analyticsScript, scriptContent);
  console.log(`Analytics script updated at ${analyticsScript}`);
}

// Create an analytics dashboard directory
function createAnalyticsDashboard() {
  const dashboardDir = path.join(process.cwd(), 'analytics-dashboard');
  ensureDirectoryExists(dashboardDir);
  
  // Create a simple HTML dashboard
  const dashboardHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audityzer Analytics Dashboard</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1 {
      color: #3b82f6;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 0.5rem;
    }
    .analytics-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    .analytics-card {
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .analytics-card h2 {
      margin-top: 0;
      font-size: 1.5rem;
      color: #1f2937;
    }
    .analytics-card p {
      color: #4b5563;
    }
    .iframe-container {
      margin-top: 1rem;
      height: 300px;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 0.25rem;
    }
    .cta {
      margin-top: 2rem;
      text-align: center;
    }
    .btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: #3b82f6;
      color: white;
      border-radius: 0.375rem;
      text-decoration: none;
      font-weight: 500;
    }
    .source-info {
      margin-top: 2rem;
      font-size: 0.875rem;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <h1>Audityzer Analytics Dashboard</h1>
  
  <p>Track visitor engagement, conversion paths, and marketing campaign effectiveness.</p>
  
  <div class="analytics-container">
    ${config.plausible.enabled ? `
    <div class="analytics-card">
      <h2>Plausible Analytics</h2>
      <p>Privacy-focused website analytics</p>
      <div class="iframe-container">
        <p>Sign in to your Plausible account to see detailed analytics.</p>
        <a href="https://plausible.io/login" target="_blank" class="btn">Open Plausible</a>
      </div>
    </div>
    ` : ''}
    
    ${config.posthog.enabled ? `
    <div class="analytics-card">
      <h2>PostHog Session Replay</h2>
      <p>Visualize user journeys and detect usability issues</p>
      <div class="iframe-container">
        <p>Sign in to your PostHog account to see session recordings.</p>
        <a href="${config.posthog.host}" target="_blank" class="btn">Open PostHog</a>
      </div>
    </div>
    ` : ''}
    
    ${config.umami.enabled ? `
    <div class="analytics-card">
      <h2>Umami Analytics</h2>
      <p>GDPR-compliant website statistics</p>
      <div class="iframe-container">
        <p>Sign in to your Umami dashboard to view analytics.</p>
        <a href="${config.umami.host}" target="_blank" class="btn">Open Umami</a>
      </div>
    </div>
    ` : ''}
    
    <div class="analytics-card">
      <h2>UTM Campaign Performance</h2>
      <p>Track effectiveness of marketing campaigns</p>
      <div class="iframe-container">
        <p>UTM parameters are being tracked and can be analyzed in your analytics platform.</p>
        <a href="scripts/generate-utm-links.js" target="_blank" class="btn">Generate UTM Links</a>
      </div>
    </div>
  </div>
  
  <div class="cta">
    <a href="audit-test.html" class="btn">View Landing Page</a>
  </div>
  
  <div class="source-info">
    <p>Data sources: ${[
      config.plausible.enabled ? 'Plausible Analytics' : '',
      config.posthog.enabled ? 'PostHog' : '',
      config.umami.enabled ? 'Umami' : '',
      'Local Storage (UTM Parameters)'
    ].filter(Boolean).join(', ')}</p>
  </div>
</body>
</html>
  `;
  
  fs.writeFileSync(path.join(dashboardDir, 'index.html'), dashboardHtml);
  console.log(`\nAnalytics dashboard created at ${dashboardDir}/index.html`);
  console.log(`Run 'npm run analytics:dashboard' to view it.`);
}

// Main function
async function main() {
  console.log('\n=== Audityzer Analytics Setup ===\n');
  console.log('This script will help you configure analytics for your Audityzer installation.');
  
  await setupPlausible();
  await setupPostHog();
  await setupUmami();
  await configureGeneralOptions();
  
  saveConfiguration();
  createAnalyticsDashboard();
  
  console.log('\n=== Setup Complete ===\n');
  console.log('You can now use the following npm scripts:');
  console.log('- npm run analytics:dashboard: View your analytics dashboard');
  console.log('- npm run generate:utm-links: Generate UTM links for marketing campaigns');
  
  rl.close();
}

// Run the script
main(); 