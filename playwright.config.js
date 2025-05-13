// playwright.config.js
require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

// Function to determine test mode
function getTestModeConfig() {
  // Check if mock mode is enabled via environment variable
  const mockMode = process.env.MOCK_MODE === 'true';
  const targetUrl = process.env.TARGET_URL;
  
  console.log('Mock mode:', mockMode);
  console.log('Target URL:', targetUrl);
  
  // Always return a valid configuration regardless of environment variables
  return {
    useMock: mockMode || true, // Default to true if not specified
    baseURL: targetUrl || 'http://localhost:3000'
  };
}

const testMode = getTestModeConfig();

module.exports = defineConfig({
  testDir: './playwright-tests',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry',
    baseURL: testMode.baseURL,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});