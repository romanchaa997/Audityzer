// @ts-check
const { defineConfig } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './sample-tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  // Run tests in files in parallel
  fullyParallel: true,
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  // Reporter to use
  reporter: 'html',
  
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    // baseURL: 'http://localhost:3000',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Take screenshot on test failure
    screenshot: 'only-on-failure'
  },
  
  // Configure projects for different browsers if needed
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    }
  ],
}); 