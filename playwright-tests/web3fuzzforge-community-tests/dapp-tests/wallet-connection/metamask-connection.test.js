/* global describe, it, expect, beforeEach, afterEach, jest */
/**
 * MetaMask Wallet Connection Tests
 * Tests basic wallet connection functionality using MetaMask
 */

const { test, expect } = require('@playwright/test');
const path = require('path');

// Path to MetaMask extension directory
const METAMASK_EXTENSION_PATH =
  process.env.METAMASK_EXTENSION_PATH || path.join(__dirname, '../../../extensions/metamask');

// Test configurations
const config = {
  demoAppUrl: 'http://localhost:3000', // Default demo app URL
  extensionUrl: 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html',
  testTimeout: 120000, // 2 minutes
};

test.describe('MetaMask Wallet Connection Tests', () => {
  test.beforeEach(async ({ context }) => {
    // Skip test if no extension path available
    if (!process.env.METAMASK_EXTENSION_PATH) {
      test.skip('MetaMask extension path not configured');
    }
  });

  test('should connect MetaMask wallet to dApp', async ({ browser }) => {
    // Launch browser with MetaMask extension
    const context = await browser.launchPersistentContext('', {
      headless: false,
      args: [
        `--disable-extensions-except=${METAMASK_EXTENSION_PATH}`,
        `--load-extension=${METAMASK_EXTENSION_PATH}`,
      ],
    });

    // Setup MetaMask with test wallet
    const extensionPage = await context.newPage();
    await extensionPage.goto(config.extensionUrl);

    // Wait for MetaMask to load
    await extensionPage
      .waitForSelector('text="Welcome to MetaMask"', { timeout: 10000 })
      .catch(() => {
        console.log('MetaMask already initialized. Continuing with test.');
      });

    // Attempt to connect to demo dApp
    const demoPage = await context.newPage();
    await demoPage.goto(config.demoAppUrl);

    // Look for connect wallet button
    try {
      const connectButton = await demoPage.getByText(/connect|connect wallet|connect metamask/i);
      await connectButton.click();

      // Switch to MetaMask popup to approve connection
      const pages = context.pages();
      const popupPage = pages[pages.length - 1];

      // Look for connection approval buttons in the popup
      const nextButton = await popupPage.getByRole('button', { name: /next|connect/i });
      if (await nextButton.isVisible()) {
        await nextButton.click();
      }

      const connectButton2 = await popupPage.getByRole('button', { name: /connect|approve/i });
      if (await connectButton2.isVisible()) {
        await connectButton2.click();
      }

      // Verify connection success in the dApp
      await demoPage.waitForSelector('text=/connected|account|address/i', { timeout: 10000 });

      // Test passes if no exception thrown
      expect(true).toBeTruthy();
    } catch (error) {
      console.error('Error during wallet connection test:', error);
      expect(false, `Connection test failed: ${error.message}`).toBeTruthy();
    }

    // Close context
    await context.close();
  });
});
