// MetaMask transaction test with TypeScript
import { test, expect, type Page, type Browser } from '@playwright/test';
import { EthereumProvider } from '../utils/types';

// Test configuration
// eslint-disable-next-line no-unused-vars
const WALLET_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
const RECIPIENT_ADDRESS = '0xabcdef1234567890abcdef1234567890abcdef12';
const TRANSACTION_AMOUNT = '0.1';
// eslint-disable-next-line no-unused-vars
const NETWORK_NAME = 'Ethereum';

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
        selectedAddress: '0x1234567890abcdef1234567890abcdef12345678',
        chainId: '0xaa36a7',
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

    // Navigate to the test page or use a blank page
    await page.goto('https://app.uniswap.org');
  });

  test('sends transaction through MetaMask', async () => {
    // Connect wallet if needed
    const connectWalletButton = await page.locator('.connect-wallet-button');
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
  // Fuzz Testing: XSS Payloads
  test('should handle XSS payloads in input fields', async () => {
    for (const payload of [
      '<script>alert("XSS")</script>',
      '"><script>alert(1)</script>',
      '"><img src=x onerror=alert(1)>',
      '"><svg onload=alert(1)>',
      'javascript:alert(1)',
    ]) {
      console.log(`Testing XSS payload: ${payload}`);

      // Try XSS in recipient field if available
      try {
        const recipientField = await page.locator('#recipient');
        if (await recipientField.isVisible()) {
          await recipientField.fill(payload);
          await page.screenshot({
            path: `media/xss-test-recipient-${Buffer.from(payload).toString('base64').slice(0, 10)}.png`,
          });
        }
      } catch (e) {
        console.log(`Error testing recipient field: ${e.message}`);
      }

      // Try XSS in amount field if available
      try {
        const amountField = await page.locator('#amount');
        if (await amountField.isVisible()) {
          await amountField.fill(payload);
          await page.screenshot({
            path: `media/xss-test-amount-${Buffer.from(payload).toString('base64').slice(0, 10)}.png`,
          });
        }
      } catch (e) {
        console.log(`Error testing amount field: ${e.message}`);
      }
    }
  });
  // Fuzz Testing: Large Transaction Amounts (DoS)
  test('should handle extremely large transaction amounts', async () => {
    for (const amount of [
      '9007199254740991',
      '999999999999999999999999999999999999999',
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    ]) {
      console.log(`Testing large amount: ${amount}`);

      try {
        // Try to input large amount
        const amountField = await page.locator('#amount');
        if (await amountField.isVisible()) {
          await amountField.fill(amount);

          // Try to send the transaction
          const sendButton = await page.locator('#send-button');
          if (await sendButton.isVisible()) {
            await sendButton.click();

            // Take a screenshot to document behavior
            await page.screenshot({
              path: `media/large-amount-test-${Buffer.from(amount.toString()).toString('base64').slice(0, 10)}.png`,
            });

            // Check for any error messages or UI behavior changes
            const errorElement = await page.locator('.error, .alert, [role="alert"]').first();
            if (await errorElement.isVisible()) {
              console.log(`Error displayed: ${await errorElement.textContent()}`);
            }
          }
        }
      } catch (e) {
        console.log(`Error testing large amount: ${e.message}`);
      }

      // Reset the page state if needed
      await page.reload();
    }
  });
});
