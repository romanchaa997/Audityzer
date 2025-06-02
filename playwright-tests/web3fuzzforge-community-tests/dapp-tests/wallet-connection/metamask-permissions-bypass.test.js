/* global describe, it, expect, beforeEach, afterEach, jest */
/**
 * Test case description: MetaMask permissions bypass vulnerability detection
 * Vulnerability/edge case: Tests if a dApp can obtain unauthorized permissions through various attack vectors
 * Security impact: Could lead to unauthorized access to wallet data or transaction approvals
 */

const { test, expect } = require('@playwright/test');
const { connectWallet, setupWalletState } = require('../../utils');

test.describe('MetaMask Permissions Vulnerability Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up the initial wallet state for testing
    await setupWalletState(page, {
      chainId: '0x1', // Ethereum Mainnet
      networkName: 'Ethereum Mainnet',
      locked: false,
      accounts: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
    });
  });

  test('should prevent requests for excessive permissions', async ({ page }) => {
    // Navigate to the test dApp
    await page.goto('https://app.uniswap.org');

    // Connect to MetaMask (this should trigger a permission popup)
    const connectButton = await page.locator('button:has-text("Connect")').first();
    await connectButton.click();

    // Select MetaMask from wallet options if needed
    const metamaskOption = await page.locator('text=MetaMask').first();
    if (await metamaskOption.isVisible()) {
      await metamaskOption.click();
    }

    // Now attempt to request excessive permissions through the provider
    const hasExcessivePermissions = await page.evaluate(async () => {
      // Try to access permissions that should require explicit approval
      try {
        // Request multiple accounts when only one was approved
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        // Try to switch networks without user approval
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x89' }], // Polygon
        });

        // Attempt to send a transaction without user approval
        await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: accounts[0],
              to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
              value: '0x0', // 0 ETH
              data: '0x',
            },
          ],
        });

        return true; // If we got here, permissions were granted without proper approval
      } catch (error) {
        // Expected to fail with permission errors
        console.log('Permission test error:', error);
        return false;
      }
    });

    // The test passes if excessive permissions were NOT granted
    await expect(hasExcessivePermissions).toBeFalsy();
  });

  test('should prevent permission bypass through rapid tab switching', async ({
    page,
    context,
  }) => {
    // Navigate to the test dApp
    await page.goto('https://app.uniswap.org');

    // Open a second page to simulate tab switching
    const secondPage = await context.newPage();
    await secondPage.goto('https://app.uniswap.org');

    // Start connection in first tab
    const connectButton = await page.locator('button:has-text("Connect")').first();
    await connectButton.click();

    // Quickly switch to second tab and try to connect there too
    const secondConnectButton = await secondPage.locator('button:has-text("Connect")').first();
    await secondConnectButton.click();

    // Rapidly switch between tabs to potentially confuse the wallet
    for (let i = 0; i < 5; i++) {
      await page.bringToFront();
      await secondPage.bringToFront();
    }

    // Check if permissions were incorrectly granted in either tab
    const firstTabPermissions = await page.evaluate(() => {
      return typeof window.ethereum !== 'undefined' && window.ethereum.selectedAddress !== null;
    });

    const secondTabPermissions = await secondPage.evaluate(() => {
      return typeof window.ethereum !== 'undefined' && window.ethereum.selectedAddress !== null;
    });

    // If the wallet behaves correctly, only one tab should have permissions
    // or both should require explicit user approval
    const hasInconsistentPermissions = firstTabPermissions && secondTabPermissions;
    await expect(hasInconsistentPermissions).toBeFalsy();
  });

  test('should prevent permission bypass through iframes', async ({ page }) => {
    // Navigate to a test page that contains iframes
    await page.goto('https://example.com');

    // Create an iframe that attempts to access MetaMask
    await page.evaluate(() => {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://app.uniswap.org';
      iframe.id = 'testFrame';
      document.body.appendChild(iframe);
    });

    // Wait for iframe to load
    await page.waitForSelector('#testFrame');

    // Try to access ethereum provider from the iframe
    const iframeHasAccess = await page
      .frame({ url: /uniswap/ })
      .evaluate(() => {
        return typeof window.ethereum !== 'undefined';
      })
      .catch(() => false);

    // Check if the iframe could access the wallet without permission
    await expect(iframeHasAccess).toBeFalsy();
  });
});
