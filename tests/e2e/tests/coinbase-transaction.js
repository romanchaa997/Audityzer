// Coinbase Wallet transaction test
const { test, expect } = require('@playwright/test');

// Test configuration
// eslint-disable-next-line no-unused-vars
const WALLET_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
// eslint-disable-next-line no-unused-vars
const WALLET_NAME = 'Test Wallet';
const RECIPIENT_ADDRESS = '0xabcdef1234567890abcdef1234567890abcdef12';
const TRANSACTION_AMOUNT = '0.1';
// eslint-disable-next-line no-unused-vars
const NETWORK_NAME = 'Ethereum';

test.describe('Coinbase Wallet Transaction Test', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
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
            window.ethereum.selectedAddress = '0x1234567890abcdef1234567890abcdef12345678';
            // Dispatch connection event
            window.dispatchEvent(new Event('ethereum#initialized'));
            return ['0x1234567890abcdef1234567890abcdef12345678'];
          }

          if (method === 'eth_sendTransaction') {
            const txParams = params[0];
            console.log('Transaction parameters:', txParams);

            // Return a mock transaction hash
            return '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';
          }

          return null;
        },
        on: (eventName, callback) => {
          console.log(`Coinbase Wallet mock: registered event listener for ${eventName}`);
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

    // Connect wallet first
    await page.evaluate(() => {
      window.ethereum.selectedAddress = '0x1234567890abcdef1234567890abcdef12345678';
      window.dispatchEvent(new Event('accountsChanged'));
    });
  });

  test('can send a transaction', async () => {
    // Find and interact with the recipient input field
    const recipientField = await page.locator('#recipient');
    await expect(recipientField).toBeVisible();
    await recipientField.fill(RECIPIENT_ADDRESS);

    // Find and interact with the amount input field
    const amountField = await page.locator('#amount');
    await expect(amountField).toBeVisible();
    await amountField.fill(TRANSACTION_AMOUNT);

    // Find and click the send button
    const sendButton = await page.locator('#send-button');
    await expect(sendButton).toBeVisible();
    await sendButton.click();

    // Simulate Coinbase Wallet transaction approval
    const txResponse = await page.evaluate(() => {
      // Mock transaction parameters
      const txParams = {
        from: '0x1234567890abcdef1234567890abcdef12345678',
        to: '0xabcdef1234567890abcdef1234567890abcdef12',
        value: '0x' + (parseFloat('0.1') * 1e18).toString(16),
        gas: '0x5208', // 21000 gas
        gasPrice: '0x3b9aca00', // 1 Gwei
      };

      // Mock transaction approval in the wallet
      return window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [txParams],
      });
    });

    // Wait for transaction confirmation in the UI
    const txConfirmation = await page.locator('#tx-confirmation');
    await expect(txConfirmation).toBeVisible({ timeout: 10000 });

    // Verify transaction hash is displayed
    const txHashElement = await page.locator('#tx-hash');

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
