// Rabby connection test with TypeScript (currently uses MetaMask under the hood)
import { test, expect, type Page, type Browser } from '@playwright/test';
import { EthereumProvider } from '../utils/types';

// Test configuration
 
const WALLET_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
 
const WALLET_NAME = 'Test Wallet';
 
const NETWORK_NAME = 'Ethereum';

// Extend window with ethereum type
declare global {
  interface Window {
    ethereum: {
      isMetaMask: boolean;
      isRabby: boolean;
      selectedAddress: string | null;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
    };
  }
}

test.describe('Rabby Wallet Connection Test', () => {
  let page: Page;

  test.beforeEach(async ({ browser }: { browser: Browser }) => {
    // Create a new page
    page = await browser.newPage();

    console.log('Note: Rabby wallet support is in development. Using MetaMask provider for now.');

    // Mock the ethereum provider before navigating to the page
    await page.addInitScript(() => {
      window.ethereum = {
        isMetaMask: true, // Using MetaMask API for now
        isRabby: true, // Future Rabby identifier
        selectedAddress: null,
        request: async ({ method }) => {
          console.log(`Rabby mock (via MetaMask): ${method} called`);
          if (method === 'eth_requestAccounts') {
            window.ethereum.selectedAddress = '0x1234567890abcdef1234567890abcdef12345678';
            // Dispatch connection event
            window.dispatchEvent(new Event('ethereum#initialized'));
            return ['0x1234567890abcdef1234567890abcdef12345678'];
          }
          return null;
        },
        on: (eventName, callback) => {
          console.log(`Rabby mock (via MetaMask): registered event listener for ${eventName}`);
          window.addEventListener('ethereum#initialized', () => {
            if (eventName === 'accountsChanged') {
              callback(['0x1234567890abcdef1234567890abcdef12345678']);
            }
          });
        },
      };
    });

    // Navigate to the test page or use a blank page
    await page.goto('https://app.uniswap.org');
  });

  test('connects Rabby wallet to dApp', async () => {
    console.log('Note: Rabby-specific features will be added in a future update.');

    // Find and click the "Connect Wallet" button
    const connectWalletButton = await page.locator('.connect-wallet-button');
    await expect(connectWalletButton).toBeVisible();
    await connectWalletButton.click();

    // Wait for wallet info to be displayed
    const walletInfo = await page.locator('#wallet-info');
    await expect(walletInfo).toBeVisible();

    // Check if wallet address is displayed correctly
    const walletAddressElement = await page.locator('.wallet-address');
    await expect(walletAddressElement).toContainText(WALLET_ADDRESS.substring(0, 10));

    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/rabby-connection-test.png' });

    console.log('Rabby connection test (via MetaMask) completed successfully!');
  });
});
