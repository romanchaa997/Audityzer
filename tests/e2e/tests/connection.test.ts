// MetaMask connection test with TypeScript
import { test, expect, type Page, type Browser } from '@playwright/test';
import { EthereumProvider } from '../utils/types';

// Test configuration
 
const WALLET_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
 
const WALLET_NAME = 'Test Wallet';
 
const NETWORK_NAME = 'Ethereum';

// No need to declare global window.ethereum since it's already defined in utils/types.ts

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
        chainId: '0x1', // Add chainId property to satisfy the type
        request: async ({ method }) => {
          console.log(`MetaMask mock: ${method} called`);
          if (method === 'eth_requestAccounts') {
            window.ethereum!.selectedAddress = '0x1234567890abcdef1234567890abcdef12345678';
            // Dispatch connection event
            window.dispatchEvent(new Event('ethereum#initialized'));
            return ['0x1234567890abcdef1234567890abcdef12345678'];
          }
          if (method === 'eth_chainId') {
            return '0x1'; // Ethereum mainnet
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

    // Navigate to the test page
    await page.goto('file://' + process.cwd() + '/tests/test-page.html');
  });

  test('connects MetaMask wallet to dApp', async () => {
    // Find and click the "Connect Wallet" button
    const connectWalletButton = await page.locator('#connect-button');
    await expect(connectWalletButton).toBeVisible();
    await connectWalletButton.click();

    // Wait for wallet info to be displayed
    const walletInfo = await page.locator('#wallet-info');
    await expect(walletInfo).toBeVisible();

    // Check if wallet address is displayed correctly
    const walletAddressElement = await page.locator('.wallet-address');
    await expect(walletAddressElement).toContainText(WALLET_ADDRESS.substring(0, 10));

    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/metamask-connection-test.png' });

    console.log('MetaMask connection test completed successfully!');
  });
});
