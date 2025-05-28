function generatePlaywrightScript(options) {
    const { url, wallet, tests } = options;

    return `
  const { test, expect } = require('@playwright/test');
  
  test.describe('Web3 dApp Testing', () => {
    test.beforeEach(async ({ page }) => {
      // Setup wallet extension
      await setupWallet(page, '${wallet}');
      
      // Navigate to the dApp
      await page.goto('${url}');
    });
    
    ${tests.includes('connect') ? `
    test('Connect wallet', async ({ page }) => {
      // Click connect button
      await page.click('button:has-text("Connect")');
      
      // Handle wallet popup
      await handleWalletPopup(page, '${wallet}');
      
      // Verify connection
      await expect(page.locator('.wallet-address')).toBeVisible();
    });
    ` : ''}
    
    ${tests.includes('transaction') ? `
    test('Send transaction', async ({ page }) => {
      // Connect wallet first
      await page.click('button:has-text("Connect")');
      await handleWalletPopup(page, '${wallet}');
      
      // Interact with dApp to trigger transaction
      await page.click('button:has-text("Send")');
      
      // Handle transaction confirmation
      await handleTransactionConfirmation(page, '${wallet}');
      
      // Verify transaction success
      await expect(page.locator('.transaction-success')).toBeVisible();
    });
    ` : ''}
    
    ${tests.includes('sign') ? `
    test('Sign message', async ({ page }) => {
      // Connect wallet first
      await page.click('button:has-text("Connect")');
      await handleWalletPopup(page, '${wallet}');
      
      // Trigger message signing
      await page.click('button:has-text("Sign")');
      
      // Handle signature request
      await handleSignatureRequest(page, '${wallet}');
      
      // Verify signature success
      await expect(page.locator('.signature-success')).toBeVisible();
    });
    ` : ''}
  });
  
  // Helper functions
  async function setupWallet(page, walletType) {
    // Wallet-specific setup code
  }
  
  async function handleWalletPopup(page, walletType) {
    // Wallet-specific popup handling
  }
  
  async function handleTransactionConfirmation(page, walletType) {
    // Wallet-specific transaction confirmation
  }
  
  async function handleSignatureRequest(page, walletType) {
    // Wallet-specific signature request handling
  }
  `;
}

module.exports = { generatePlaywrightScript };