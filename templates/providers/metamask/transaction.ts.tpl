// MetaMask transaction test with TypeScript
import { test, expect, type Page, type Browser } from '@playwright/test';

// Test configuration
const WALLET_ADDRESS = '{{address}}';
const RECIPIENT_ADDRESS = '{{recipient}}';
const TRANSACTION_AMOUNT = '{{amount}}';
const NETWORK_NAME = '{{network}}';

// Extend window with ethereum type
declare global {
  interface Window {
    ethereum: {
      isMetaMask: boolean;
      selectedAddress: string;
      chainId: string;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
    };
  }
}

test.describe('MetaMask Transaction Test', () => {
  let page: Page;

  test.beforeEach(async ({ browser }: { browser: Browser }) => {
    // Create a new page 
    page = await browser.newPage();
    
    // Mock the ethereum provider before navigating to the page
    await page.addInitScript(() => {
      window.ethereum = {
        isMetaMask: true,
        selectedAddress: '{{address}}',
        chainId: '{{chain_id}}',
        request: async ({ method, params }) => {
          console.log(`MetaMask mock: ${method} called`);
          
          if (method === 'eth_requestAccounts') {
            return ['{{address}}'];
          }
          
          if (method === 'eth_sendTransaction') {
            const txParams = params?.[0];
            console.log('Transaction params:', txParams);
            
            // Mock transaction hash
            return '0x{{transaction_hash}}';
          }
          
          if (method === 'eth_getBalance') {
            // Return mock balance in wei (10 ETH)
            return '0x8AC7230489E80000';
          }
          
          return null;
        },
        on: (eventName, callback) => {
          console.log(`MetaMask mock: registered event listener for ${eventName}`);
        }
      };
    });
    
    // Navigate to the test page or use a blank page
    await page.goto('{{dapp_url}}');
  });

  test('sends transaction through MetaMask', async () => {
    // Connect wallet if needed
    const connectWalletButton = await page.locator('{{connect_button_selector}}');
    if (await connectWalletButton.isVisible()) {
      await connectWalletButton.click();
    }

    // Fill transaction form
    await page.locator('{{recipient_field_selector}}').fill(RECIPIENT_ADDRESS);
    await page.locator('{{amount_field_selector}}').fill(TRANSACTION_AMOUNT);
    
    // Submit transaction
    await page.locator('{{send_button_selector}}').click();
    
    // Wait for confirmation
    const txConfirmation = await page.locator('{{tx_confirmation_selector}}');
    await expect(txConfirmation).toBeVisible({ timeout: 10000 });
    
    // Verify transaction details
    const txHash = await page.locator('{{tx_hash_selector}}').textContent();
    expect(txHash).toBeTruthy();
    
    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/metamask-transaction-test.png' });
    
    console.log('MetaMask transaction test completed successfully!');
  });
}); 