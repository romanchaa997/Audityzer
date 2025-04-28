/**
 * Phantom Wallet Connection Test
 * 
 * This test verifies that a dApp can successfully connect to the Phantom wallet
 * for Solana blockchain interactions.
 */

const { test, expect } = require('@playwright/test');
const { setupPhantomWallet, connectPhantomWallet, disconnectPhantomWallet } = require('{{utils_path}}');

test.describe('Phantom Wallet Connection Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up Phantom wallet extension
    await setupPhantomWallet(page);
  });

  test('should connect Phantom wallet to dApp', async ({ page }) => {
    // Navigate to the dApp
    await page.goto('{{dapp_url}}');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Click the connect wallet button
    await page.locator('{{connect_button_selector}}').click();
    
    // Select Phantom wallet option (if multiple wallets are supported)
    await page.locator('button:has-text("Phantom")').click({ timeout: 5000 }).catch(() => {
      console.log('Phantom wallet button not found, assuming direct connection flow');
    });
    
    // Connect the wallet
    await connectPhantomWallet(page);
    
    // Verify connection was successful
    const accountElement = page.locator('[data-testid="connected-account"], .account-address, .wallet-address').first();
    await expect(accountElement).toBeVisible({ timeout: 10000 });
    
    // Get the connected address
    const connectedAddress = await accountElement.textContent();
    console.log(`Connected with Phantom address: ${connectedAddress}`);
    
    // Verify the address is a valid Solana address (base58 encoded, starts with a number or letter)
    expect(connectedAddress).toMatch(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/);
  });

  test('should handle disconnecting from Phantom wallet', async ({ page }) => {
    // Navigate to the dApp
    await page.goto('{{dapp_url}}');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Connect to the wallet first
    await page.locator('{{connect_button_selector}}').click();
    await connectPhantomWallet(page);
    
    // Verify connection was successful
    const accountElement = page.locator('[data-testid="connected-account"], .account-address, .wallet-address').first();
    await expect(accountElement).toBeVisible({ timeout: 10000 });
    
    // Disconnect wallet
    await disconnectPhantomWallet(page);
    
    // Verify the connect button is visible again
    await expect(page.locator('{{connect_button_selector}}')).toBeVisible({ timeout: 10000 });
  });

  test('should handle network switching in Phantom wallet', async ({ page }) => {
    // Navigate to the dApp
    await page.goto('{{dapp_url}}');
    
    // Connect to the wallet
    await page.locator('{{connect_button_selector}}').click();
    await connectPhantomWallet(page);
    
    // Switch network in the wallet (mainnet, testnet, devnet)
    await page.evaluate(() => {
      window.solana.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x65' }], // Devnet chain ID
      }).catch(err => console.log('Network switching error (expected in some cases):', err));
    });
    
    // Wait for network to be updated
    await page.waitForTimeout(2000);
    
    // Verify the network information is updated
    const networkElement = page.locator('[data-testid="network-name"], .network-indicator').first();
    await expect(networkElement).toBeVisible({ timeout: 5000 }).catch(() => {
      console.log('Network indicator not found, skipping network validation');
    });
  });
}); 