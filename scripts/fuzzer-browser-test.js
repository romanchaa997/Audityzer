/* global describe, it, expect, beforeEach, afterEach, jest */
/**
 * MetaMask Fuzzer Browser Test
 *
 * This script runs a browser-based test that loads the MetaMask fuzzer
 * and executes fuzzing tests against the extension.
 */

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

// Path to MetaMask extension directory
const METAMASK_EXTENSION_PATH =
  process.env.METAMASK_EXTENSION_PATH || path.join(__dirname, '../extensions/metamask');

// Test configurations
const config = {
  // URL to the fuzzer test page, provided at runtime or default
  fuzzerUrl: process.env.testFuzzerUrl || 'http://localhost:3000/fuzzer-test.html',
  extensionUrl: 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html',
  testTimeout: 120000, // 2 minutes
  outputDir: path.join(__dirname, '..', 'reports', 'metamask-security'),
};

test.describe('MetaMask Fuzzer Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Skip test if no extension path available
    if (!fs.existsSync(METAMASK_EXTENSION_PATH)) {
      test.skip('MetaMask extension path not configured');
    }
  });

  test('should run fuzzing tests against MetaMask', async ({ browser }) => {
    // Launch browser with MetaMask extension
    const context = await browser.launchPersistentContext('', {
      headless: false,
      args: [
        `--disable-extensions-except=${METAMASK_EXTENSION_PATH}`,
        `--load-extension=${METAMASK_EXTENSION_PATH}`,
      ],
    });

    // First open MetaMask to ensure it's initialized
    const extensionPage = await context.newPage();
    await extensionPage.goto(config.extensionUrl);

    // Wait for MetaMask to load
    await extensionPage
      .waitForSelector('text="Welcome to MetaMask"', { timeout: 10000 })
      .catch(() => {
        console.log('MetaMask already initialized. Continuing with test.');
      });

    // Close the MetaMask tab, we'll be interacting with it via popups
    await extensionPage.close();

    // Open the fuzzer test page
    const fuzzerPage = await context.newPage();
    await fuzzerPage.goto(config.fuzzerUrl);

    try {
      // Wait for the fuzzer page to load
      await fuzzerPage.waitForSelector('button:has-text("Start Fuzzing Tests")', {
        timeout: 10000,
      });

      // Start the fuzzing tests
      await fuzzerPage.click('button:has-text("Start Fuzzing Tests")');

      // Wait for initial MetaMask connection popup
      const pages = context.pages();
      const popupPage = pages[pages.length - 1];

      // Handle connection approval
      const nextButton = await popupPage.getByRole('button', { name: /next|connect/i });
      if (await nextButton.isVisible({ timeout: 5000 })) {
        await nextButton.click();

        const connectButton = await popupPage.getByRole('button', { name: /connect|approve/i });
        if (await connectButton.isVisible({ timeout: 5000 })) {
          await connectButton.click();
        }
      }

      // Wait for fuzzing tests to complete
      // Note: This might need to handle multiple popups as fuzzing continues
      await fuzzerPage.waitForSelector('text=/fuzzing complete|tests finished/i', {
        timeout: 60000,
      });

      // Check for test results on the page
      const resultsElement = await fuzzerPage.locator('#results');
      const resultsContent = await resultsElement.textContent();

      // Save results to a file
      fs.writeFileSync(
        path.join(config.outputDir, 'fuzzing-results.json'),
        JSON.stringify(
          {
            timestamp: new Date().toISOString(),
            results: resultsContent,
          },
          null,
          2
        )
      );

      // Test expectation: Results should contain success message or no critical vulnerabilities
      expect(resultsContent).not.toContain('Critical');
    } catch (error) {
      console.error('Error during fuzzing tests:', error);
      // Save error info for debugging
      fs.writeFileSync(
        path.join(config.outputDir, 'fuzzing-error.txt'),
        `Error during fuzzing tests: ${error.message}\n${error.stack}`
      );
      expect(false, `Fuzzing test failed: ${error.message}`).toBeTruthy();
    }

    // Close context
    await context.close();
  });
});
