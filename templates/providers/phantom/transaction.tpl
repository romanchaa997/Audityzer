/**
 * Phantom Wallet Transaction Test
 * 
 * This test verifies that a dApp can successfully send a transaction
 * through the Phantom wallet on Solana.
 */

const { test, expect } = require('@playwright/test');
const { setupPhantomWallet, connectPhantomWallet, approvePhantomTransaction } = require('{{utils_path}}');

test.describe('Phantom Wallet Transaction Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up Phantom wallet with the test account
    await setupPhantomWallet(page, {
      network: '{{network}}',
      accountName: '{{wallet_name}}'
    });
    
    // Navigate to the dApp
    await page.goto('{{dapp_url}}');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Connect the wallet to the dApp
    await page.locator('{{connect_button_selector}}').click();
    await connectPhantomWallet(page);
    
    // Verify connection is successful
    const accountElement = page.locator('[data-testid="connected-account"], .account-address, .wallet-address').first();
    await expect(accountElement).toBeVisible({ timeout: 10000 });
  });

  test('should send a Solana transaction through Phantom wallet', async ({ page }) => {
    // Find and click the transfer/send button on the dApp
    await page.locator('[data-testid="send-button"], button:has-text("Send"), button:has-text("Transfer")').first().click();
    
    // Enter recipient address
    await page.locator('[data-testid="recipient-input"], input[placeholder*="address"], input[placeholder*="recipient"]').first()
      .fill('{{recipient}}');
    
    // Enter the amount to send
    await page.locator('[data-testid="amount-input"], input[placeholder*="amount"], input[type="number"]').first()
      .fill('{{amount}}');
    
    // Click the confirm/send transaction button
    await page.locator('[data-testid="confirm-button"], button:has-text("Send"), button:has-text("Confirm"), button[type="submit"]').first().click();
    
    // Handle Phantom wallet approval
    await approvePhantomTransaction(page);
    
    // Verify transaction was successful
    await expect(page.locator('text=Transaction successful, text=Success, text=Transaction confirmed')).toBeVisible({ timeout: 30000 });
    
    // Get transaction hash if available
    const txHash = await page.locator('[data-testid="tx-hash"], .transaction-hash').textContent().catch(() => 'Transaction hash not found');
    console.log(`Transaction hash: ${txHash}`);
  });

  test('should handle transaction rejection in Phantom wallet', async ({ page }) => {
    // Find and click the transfer/send button
    await page.locator('[data-testid="send-button"], button:has-text("Send"), button:has-text("Transfer")').first().click();
    
    // Enter recipient address
    await page.locator('[data-testid="recipient-input"], input[placeholder*="address"], input[placeholder*="recipient"]').first()
      .fill('{{recipient}}');
    
    // Enter the amount to send
    await page.locator('[data-testid="amount-input"], input[placeholder*="amount"], input[type="number"]').first()
      .fill('{{amount}}');
    
    // Click the confirm/send transaction button
    await page.locator('[data-testid="confirm-button"], button:has-text("Send"), button:has-text("Confirm"), button[type="submit"]').first().click();
    
    // Reject the transaction in Phantom wallet
    await page.locator('.phantom-reject-button, button:has-text("Reject"), button:has-text("Cancel"), button:has-text("Decline")').first()
      .click({ timeout: 15000 }).catch(() => {
        console.log('Reject button not found, trying alternative methods');
        return page.keyboard.press('Escape');
      });
    
    // Verify transaction was rejected and dApp shows appropriate message
    await expect(page.locator('text=Transaction rejected, text=Cancelled, text=User denied, text=Transaction failed')).toBeVisible({ timeout: 10000 });
  });

  test('should handle Solana SPL token transfers', async ({ page }) => {
    // Navigate to the token transfer page if needed
    await page.locator('[data-testid="token-tab"], text=Tokens, a:has-text("Tokens")').first().click().catch(() => {
      console.log('Token tab not found, assuming already on token page');
    });
    
    // Select token (if there's a token selector)
    await page.locator('[data-testid="token-selector"], .token-selector').click().catch(() => {
      console.log('Token selector not found, assuming default token');
    });
    
    await page.locator('text=USDC, text=SOL').first().click().catch(() => {
      console.log('Token options not found, using default token');
    });
    
    // Enter recipient address
    await page.locator('[data-testid="recipient-input"], input[placeholder*="address"]').first()
      .fill('{{recipient}}');
    
    // Enter amount
    await page.locator('[data-testid="amount-input"], input[placeholder*="amount"]').first()
      .fill('{{amount}}');
    
    // Click the send/transfer button
    await page.locator('[data-testid="send-button"], button:has-text("Send"), button:has-text("Transfer"), button[type="submit"]').first().click();
    
    // Approve the transaction in Phantom
    await approvePhantomTransaction(page);
    
    // Verify the transaction was successful
    await expect(page.locator('text=Transaction successful, text=Success, text=Transaction confirmed')).toBeVisible({ timeout: 30000 });
  });
}); 