// Coinbase Wallet transaction test with TypeScript
import { test, expect, type Page, type Browser } from '@playwright/test';

// Test configuration
const WALLET_ADDRESS = '{{address}}';
const WALLET_NAME = '{{wallet}}';
const RECIPIENT_ADDRESS = '{{recipient}}';
const TRANSACTION_AMOUNT = '{{amount}}';
const NETWORK_NAME = '{{network}}';

// Define Coinbase Wallet provider types
declare global {
  interface Window {
    ethereum: {
      isCoinbaseWallet: boolean;
      selectedAddress: string | null;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
    };
  }
}

test.describe('Coinbase Wallet Transaction Test', () => {
  let page: Page;

  test.beforeEach(async ({ browser }: { browser: Browser }) => {
    // Create a new page 
    page = await browser.newPage();
    
    // Mock the Coinbase Wallet provider before navigating to the page
    await page.addInitScript(() => {
      // Create Coinbase Wallet mock
      window.ethereum = {
        isCoinbaseWallet: true, // Coinbase Wallet identifier
        selectedAddress: null,
        request: async ({ method, params }) => {
          console.log(`Coinbase Wallet mock: ${method} called with params:`, params);
          
          if (method === 'eth_requestAccounts') {
            window.ethereum.selectedAddress = '{{address}}';
            // Dispatch connection event
            window.dispatchEvent(new Event('ethereum#initialized'));
            return ['{{address}}'];
          }
          
          if (method === 'eth_sendTransaction') {
            const txParams = params[0];
            console.log('Transaction parameters:', txParams);
            
            // Return a mock transaction hash
            return '0x{{transaction_hash}}';
          }
          
          return null;
        },
        on: (eventName, callback) => {
          console.log(`Coinbase Wallet mock: registered event listener for ${eventName}`);
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
    
    // Connect wallet first
    await page.evaluate(() => {
      window.ethereum.selectedAddress = '{{address}}';
      window.dispatchEvent(new Event('accountsChanged'));
    });
  });

  test('can send a transaction', async () => {
    // Find and interact with the recipient input field
    const recipientField = await page.locator('{{recipient_field_selector}}');
    await expect(recipientField).toBeVisible();
    await recipientField.fill(RECIPIENT_ADDRESS);
    
    // Find and interact with the amount input field
    const amountField = await page.locator('{{amount_field_selector}}');
    await expect(amountField).toBeVisible();
    await amountField.fill(TRANSACTION_AMOUNT);
    
    // Find and click the send button
    const sendButton = await page.locator('{{send_button_selector}}');
    await expect(sendButton).toBeVisible();
    await sendButton.click();
    
    // Simulate Coinbase Wallet transaction approval
    const txResponse = await page.evaluate(() => {
      // Mock transaction parameters
      const txParams = {
        from: '{{address}}',
        to: '{{recipient}}',
        value: '0x' + (parseFloat('{{amount}}') * 1e18).toString(16),
        gas: '0x5208', // 21000 gas
        gasPrice: '0x3b9aca00' // 1 Gwei
      };
      
      // Mock transaction approval in the wallet
      return window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [txParams]
      });
    });
    
    // Wait for transaction confirmation in the UI
    const txConfirmation = await page.locator('{{tx_confirmation_selector}}');
    await expect(txConfirmation).toBeVisible({ timeout: 10000 });
    
    // Verify transaction hash is displayed
    const txHashElement = await page.locator('{{tx_hash_selector}}');
    
    if (await txHashElement.isVisible()) {
      const txHash = await txHashElement.textContent();
      console.log('Transaction hash:', txHash);
      expect(txHash).toContain('0x');
    } else {
      console.log('Transaction hash element not found, but transaction was sent');
    }
    
    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/coinbase-transaction-test.png' });
    
    console.log('Coinbase Wallet transaction test completed successfully!');
  });
}); 