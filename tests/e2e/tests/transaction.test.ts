// MetaMask transaction test with TypeScript
import { test, expect, type Page, type Browser } from '@playwright/test';
import { EthereumProvider } from '../utils/types';

// Test configuration
 
const WALLET_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
const RECIPIENT_ADDRESS = '0xabcdef1234567890abcdef1234567890abcdef12';
const TRANSACTION_AMOUNT = '0.1';
 
const NETWORK_NAME = 'Ethereum';

// No need to declare global window.ethereum since it's already defined in utils/types.ts

test.describe('MetaMask Transaction Test', () => {
  let page: Page;

  test.beforeEach(async ({ browser }: { browser: Browser }) => {
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
            const txParams = params?.[0];
            console.log('Transaction params:', txParams);

            // Mock transaction hash
            return '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';
          }

          if (method === 'eth_getBalance') {
            // Return mock balance in wei (10 ETH)
            return '0x8AC7230489E80000';
          }

          return null;
        },
        on: (eventName, callback) => {
          console.log(`MetaMask mock: registered event listener for ${eventName}`);
        },
      };
    });

    // Navigate to the test page
    await page.goto('file://' + process.cwd() + '/tests/test-page.html');
  });

  test('sends transaction through MetaMask', async () => {
    // Connect wallet if needed
    const connectWalletButton = await page.locator('#connect-button');
    if (await connectWalletButton.isVisible()) {
      await connectWalletButton.click();
    }

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

    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/metamask-transaction-test.png' });

    console.log('MetaMask transaction test completed successfully!');
  });
});
