// Coinbase Wallet connection test
const { test, expect } = require('@playwright/test');

// Test configuration
const WALLET_ADDRESS = '{{address}}';
const WALLET_NAME = '{{wallet}}';
const NETWORK_NAME = '{{network}}';

test.describe('Coinbase Wallet Connection Test', () => {
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
        request: async ({ method }) => {
          console.log(`Coinbase Wallet mock: ${method} called`);
          if (method === 'eth_requestAccounts') {
            window.ethereum.selectedAddress = '{{address}}';
            // Dispatch connection event
            window.dispatchEvent(new Event('ethereum#initialized'));
            return ['{{address}}'];
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
  });

  test('connects Coinbase Wallet to dApp', async () => {
    // Find and click the "Connect Wallet" button
    const connectWalletButton = await page.locator('{{connect_button_selector}}');
    await expect(connectWalletButton).toBeVisible();
    await connectWalletButton.click();
    
    // Simulate Coinbase Wallet connection process
    await page.evaluate(() => {
      // Simulate Coinbase Wallet connection
      window.ethereum.selectedAddress = '{{address}}';
      window.dispatchEvent(new Event('accountsChanged'));
    });

    // Wait for wallet info to be displayed
    const walletInfo = await page.locator('{{wallet_info_selector}}');
    await expect(walletInfo).toBeVisible();

    // Check if wallet address is displayed correctly
    const walletAddressElement = await page.locator('{{wallet_address_selector}}');
    await expect(walletAddressElement).toContainText(WALLET_ADDRESS.substring(0, 10));

    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/coinbase-connection-test.png' });

    console.log('Coinbase Wallet connection test completed successfully!');
  });
  
  test('disconnects Coinbase Wallet from dApp', async () => {
    // First connect the wallet
    const connectWalletButton = await page.locator('{{connect_button_selector}}');
    await expect(connectWalletButton).toBeVisible();
    await connectWalletButton.click();
    
    // Simulate connection
    await page.evaluate(() => {
      window.ethereum.selectedAddress = '{{address}}';
      window.dispatchEvent(new Event('accountsChanged'));
    });
    
    // Verify connection was successful
    const walletInfo = await page.locator('{{wallet_info_selector}}');
    await expect(walletInfo).toBeVisible();
    
    // Find and click disconnect button (this varies by dApp implementation)
    const disconnectButton = await page.locator('#disconnect-wallet, [data-testid="disconnect-button"]');
    if (await disconnectButton.isVisible()) {
      await disconnectButton.click();
      
      // Simulate wallet disconnection response
      await page.evaluate(() => {
        window.ethereum.selectedAddress = null;
        window.dispatchEvent(new Event('accountsChanged'));
      });
      
      // Verify connect button is visible again
      await expect(connectWalletButton).toBeVisible();
      
      // Take a screenshot to document disconnected state
      await page.screenshot({ path: 'media/coinbase-disconnection-test.png' });
    } else {
      console.log('Disconnect button not found, skipping disconnect test');
    }
  });
}); 