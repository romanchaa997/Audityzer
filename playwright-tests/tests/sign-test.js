// MetaMask signing test
const { test, expect } = require('@playwright/test');

// Test configuration
// eslint-disable-next-line no-unused-vars
const WALLET_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
const MESSAGE_TO_SIGN = 'Hello Web3 World!';
// eslint-disable-next-line no-unused-vars
const NETWORK_NAME = 'Ethereum';

test.describe('MetaMask Signing Test', () => {
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

          if (method === 'personal_sign' || method === 'eth_sign') {
            console.log('Signing params:', params);
            // Mock signature (65 bytes)
            return '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef01';
          }

          return null;
        },
        on: (eventName, callback) => {
          console.log(`MetaMask mock: registered event listener for ${eventName}`);
        },
      };
    });

    // Navigate to the test page or use a blank page
    await page.goto('about:blank');
  });

  test('signs message with MetaMask', async () => {
    // Connect wallet if needed
    const connectWalletButton = await page.locator('#connect-button');
    if (await connectWalletButton.isVisible()) {
      await connectWalletButton.click();
    }

    // Locate and click the sign message button
    const signButton = await page.locator('#sign-button');
    await expect(signButton).toBeVisible();
    await signButton.click();

    // Wait for signature confirmation
    const signatureConfirmation = await page.locator('#signature-confirmation');
    await expect(signatureConfirmation).toBeVisible({ timeout: 10000 });

    // Verify signature is displayed
    const signatureElement = await page.locator('#signature');
    const signature = await signatureElement.textContent();
    expect(signature).toBeTruthy();
    expect(signature.startsWith('0x')).toBeTruthy();

    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/metamask-signing-test.png' });

    console.log('MetaMask signing test completed successfully!');
  });
});
