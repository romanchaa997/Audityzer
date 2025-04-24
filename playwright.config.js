// @ts-check
const { defineConfig, devices } = require('@playwright/test')
const path = require('path')

/**
 * Read environment variables for test configuration
 */
function getTestModeConfig() {
  // Default configuration
  const config = {
    mockMode: process.env.MOCK_MODE === 'true',
    targetUrl: process.env.TARGET_URL || ''
  };
  
  // If no target URL is provided, use mock mode
  if (!config.targetUrl && !config.mockMode) {
    throw new Error('Either TARGET_URL environment variable or MOCK_MODE=true must be set. Use MOCK_MODE=true to use the built-in mock dApp or TARGET_URL=http://your-app-url to test against a real application.');
  }
  
  // If mock mode is enabled, set the target URL to the local mock dApp
  if (config.mockMode) {
    config.targetUrl = 'http://localhost:3000';
  }
  
  return config;
}

// Get test mode configuration
const testConfig = getTestModeConfig();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  // Look for tests in the tests directory
  testDir: './tests',

  // Maximum time one test can run for
  timeout: 60 * 1000,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: process.env.CI
    ? [
        ['html', { outputFolder: 'reports', open: 'never' }],
        ['list']
      ]
    : [
        ['html', { outputFolder: 'reports', open: 'on-failure' }],
        ['list']
      ],

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: testConfig.targetUrl || undefined,

    // Collect trace when retrying the failed test
    trace: 'retain-on-failure',

    // Take screenshot on test failure
    screenshot: 'only-on-failure',

    // Video recording settings
    video: 'on-first-retry',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Folder for test artifacts like screenshots, videos, traces, etc.
  outputDir: 'test-output/',

  // Time to wait for assertions to pass
  expect: {
    timeout: 10000,
  },
})
