// MetaMask login test using Playwright with mocked MetaMask functionality
const { test, expect } = require('@playwright/test');

// Mock wallet address that will be used in the test
 
const MOCK_WALLET_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';

test.describe('MetaMask Login Test (Mocked)', () => {
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

    // Use a blank page instead of trying to connect to a real dApp
    await page.goto('about:blank');
  });

  test('mocks connecting MetaMask wallet to dApp', async () => {
    // Add a "Connect Wallet" button to the page for testing purposes
    await page.evaluate(() => {
      // Create a simple UI for our test
      document.body.innerHTML = `
        <h1>Mock DApp</h1>
        <button id="connect-button">Connect Wallet</button>
        <div id="wallet-info" style="display: none;">
          <p>Connected wallet: <span class="wallet-address"></span></p>
        </div>
      `;

      // Add click handler
      document.getElementById('connect-button').addEventListener('click', async () => {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          document.getElementById('wallet-info').style.display = 'block';
          document.querySelector('.wallet-address').textContent = accounts[0];
        } catch (error) {
          console.error('Connection error:', error);
        }
      });
    });

    // Find and click the "Connect Wallet" button
    const connectWalletButton = await page.locator('#connect-button');
    await expect(connectWalletButton).toBeVisible();
    await connectWalletButton.click();

    // Wait for wallet info to be displayed
    const walletInfo = await page.locator('#wallet-info');
    await expect(walletInfo).toBeVisible();

    // Check if wallet address is displayed correctly
    const walletAddressElement = await page.locator('.wallet-address');
    await expect(walletAddressElement).toContainText(MOCK_WALLET_ADDRESS.substring(0, 10));

    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/metamask-test-mocked.png' });

    console.log('Test completed successfully! Screenshot saved to media/metamask-test-mocked.png');
  });
});
