// MetaMask connection test with TypeScript
import { test, expect, type Page, type Browser } from '@playwright/test';

// Test configuration
const WALLET_ADDRESS = '{{address}}';
const WALLET_NAME = '{{wallet}}';
const NETWORK_NAME = '{{network}}';

// Extend window with ethereum type
declare global {
  interface Window {
    ethereum: {
      isMetaMask: boolean;
      selectedAddress: string | null;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
    };
  }
}

test.describe('MetaMask Connection Test', () => {
  let page: Page;

  test.beforeEach(async ({ browser }: { browser: Browser }) => {
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
            window.ethereum.selectedAddress = '{{address}}';
            // Dispatch connection event
            window.dispatchEvent(new Event('ethereum#initialized'));
            return ['{{address}}'];
          }
          return null;
        },
        on: (eventName, callback) => {
          console.log(`MetaMask mock: registered event listener for ${eventName}`);
          window.addEventListener('ethereum#initialized', () => {
            if (eventName === 'accountsChanged') {
              callback(['{{address}}']);
            }
          });
        }
      };
    });
    
    // Navigate to the test page or use a blank page
    await page.goto('{{dapp_url}}');
  });

  test('connects MetaMask wallet to dApp', async () => {
    // Find and click the "Connect Wallet" button
    const connectWalletButton = await page.locator('{{connect_button_selector}}');
    await expect(connectWalletButton).toBeVisible();
    await connectWalletButton.click();

    // Wait for wallet info to be displayed
    const walletInfo = await page.locator('{{wallet_info_selector}}');
    await expect(walletInfo).toBeVisible();

    // Check if wallet address is displayed correctly
    const walletAddressElement = await page.locator('{{wallet_address_selector}}');
    await expect(walletAddressElement).toContainText(WALLET_ADDRESS.substring(0, 10));

    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/metamask-connection-test.png' });

    console.log('MetaMask connection test completed successfully!');
  });
}); 