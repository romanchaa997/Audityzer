// MetaMask connection test
const { test, expect } = require('@playwright/test');

// Test configuration
 
const WALLET_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
 
const WALLET_NAME = 'Test Wallet';
 
const NETWORK_NAME = 'Ethereum';

test.describe('MetaMask Connection Test', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    // Create a new page
    page = await browser.newPage();

    // Mock the ethereum provider before navigating to the page
    await page.addInitScript(() => {
      window.ethereum = {
        isMetaMask: true,
        selectedAddress: null,
        request: async ({ method }) => {
          console.log(`MetaMask mock: ${method} called`);
          if (method === 'eth_requestAccounts') {
            window.ethereum.selectedAddress = '0x1234567890abcdef1234567890abcdef12345678';
            // Dispatch connection event
            window.dispatchEvent(new Event('ethereum#initialized'));
            return ['0x1234567890abcdef1234567890abcdef12345678'];
          }
          return null;
        },
        on: (eventName, callback) => {
          console.log(`MetaMask mock: registered event listener for ${eventName}`);
          window.addEventListener('ethereum#initialized', () => {
            if (eventName === 'accountsChanged') {
              callback(['0x1234567890abcdef1234567890abcdef12345678']);
            }
          });
        },
      };
    });

    // Navigate to the app - baseURL is set in the playwright config
    await page.goto('/');
  });

  test('connects MetaMask wallet to dApp', async () => {
    // Find and click the "Connect Wallet" button
    // The selector is consistent with our mock dApp
    const connectWalletButton = await page.locator('#connect-button');
    await expect(connectWalletButton).toBeVisible({ timeout: 10000 });
    await connectWalletButton.click();

    // Wait for wallet info to be displayed
    const walletInfo = await page.locator('#wallet-info');
    await expect(walletInfo).toBeVisible({ timeout: 10000 });

    // Check if wallet address is displayed correctly
    const walletAddressElement = await page.locator('.wallet-address');
    await expect(walletAddressElement).toContainText(WALLET_ADDRESS.substring(0, 10));

    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/metamask-connection-test.png' });

    console.log('MetaMask connection test completed successfully!');
  });
});
