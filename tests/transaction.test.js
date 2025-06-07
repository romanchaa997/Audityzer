/* global describe, it, expect, beforeEach, afterEach, jest */
// MetaMask transaction test
const { test, expect } = require('@playwright/test');
const path = require('path');

// Test configuration
// eslint-disable-next-line no-unused-vars
const WALLET_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
const RECIPIENT_ADDRESS = '0xabcdef1234567890abcdef1234567890abcdef12';
const TRANSACTION_AMOUNT = '0.1';
// eslint-disable-next-line no-unused-vars
const NETWORK_NAME = 'Ethereum';

test.describe('MetaMask Transaction Test', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    // Create a new page
    page = await browser.newPage();

    // Mock the ethereum provider before navigating to the page
    await page.addInitScript(() => {
      window.ethereum = {
        isMetaMask: true,
        selectedAddress: '0x1234567890abcdef1234567890abcdef12345678',
        chainId: '0x1',
        request: async ({ method, params }) => {
          console.log(`MetaMask mock: ${method} called`);

          if (method === 'eth_requestAccounts') {
            return ['0x1234567890abcdef1234567890abcdef12345678'];
          }

          if (method === 'eth_sendTransaction') {
            const txParams = params[0];
            console.log('Transaction params:', txParams);

            // Mock transaction hash
            return '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';
          }

          if (method === 'eth_getBalance') {
            // Return mock balance in wei (10 ETH)
            return '0x8AC7230489E80000';
          }

          if (method === 'eth_chainId') {
            return '0x1'; // Ethereum Mainnet
          }

          return null;
        },
        on: (eventName, callback) => {
          console.log(`MetaMask mock: registered event listener for ${eventName}`);
        },
      };
    });

    // Navigate to our test page
    const testPagePath = path.resolve(process.cwd(), 'tests', 'test-page.html');
    const fileUrl = `file:///${testPagePath.replace(/\\/g, '/')}`;
    console.log('Loading test page:', fileUrl);
    await page.goto(fileUrl);
  });

  test('sends transaction through MetaMask', async () => {
    // Connect wallet first
    const connectWalletButton = await page.locator('#connect-button');
    await connectWalletButton.click();

    // Wait for wallet info to appear
    await expect(page.locator('#wallet-info')).toBeVisible();

    // Fill transaction form
    await page.locator('#recipient').fill(RECIPIENT_ADDRESS);
    await page.locator('#amount').fill(TRANSACTION_AMOUNT);

    // Submit transaction
    await page.locator('#send-button').click();

    // Wait for confirmation
    const txConfirmation = await page.locator('#tx-confirmation');
    await expect(txConfirmation).toBeVisible({ timeout: 10000 });

    // Verify transaction details
    const txHash = await page.locator('#tx-hash').textContent();
    expect(txHash).toBeTruthy();
    expect(txHash.length).toBeGreaterThan(60); // Typical ETH tx hash length

    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/metamask-transaction-test.png' });

    console.log('MetaMask transaction test completed successfully!');
  });
});
