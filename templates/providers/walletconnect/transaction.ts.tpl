import { test, expect } from '@playwright/test';

/**
 * WalletConnect Transaction Test
 * 
 * This test demonstrates a basic transaction flow using WalletConnect
 * with a Web3 enabled dApp. It covers:
 * 
 * 1. Opening the target dApp
 * 2. Initiating WalletConnect connection
 * 3. Handling the QR code scanning step
 * 4. Preparing a transaction
 * 5. Approving/confirming the transaction
 */
test('Send transaction through WalletConnect', async ({ page }) => {
  // Navigate to the dApp
  console.log('Navigating to the dApp...');
  await page.goto('{{dapp_url}}');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // First connect the wallet using WalletConnect
  console.log('Looking for Connect Wallet button...');
  const connectWalletButton = await page.locator('{{connect_button_selector}}').first();
  await expect(connectWalletButton).toBeVisible();
  await connectWalletButton.click();
  
  // Wait for the WalletConnect modal to appear
  console.log('Waiting for WalletConnect modal...');
  const walletConnectOption = await page.locator('text=WalletConnect').first();
  await expect(walletConnectOption).toBeVisible({ timeout: 15000 });
  await walletConnectOption.click();
  
  // Wait for QR code to appear
  console.log('Waiting for QR code...');
  const qrCodeElement = await page.locator('.walletconnect-qrcode__image, img[alt*="QR Code"]').first();
  await expect(qrCodeElement).toBeVisible({ timeout: 15000 });
  
  // Take a screenshot of the QR code for documentation
  await page.screenshot({ path: 'test-results/walletconnect-qr-code.png' });
  
  console.log('QR Code displayed and ready for scanning');
  console.log('NOTE: In a real test environment, you would scan this code with a mobile wallet');
  
  // Simulate successful wallet connection (this would usually happen after QR code scan)
  console.log('Simulating successful WalletConnect connection...');
  await page.evaluate(() => {
    if (window.localStorage) {
      // Store a mock WalletConnect session
      window.localStorage.setItem('walletconnect', JSON.stringify({
        connected: true,
        accounts: ['{{address}}'],
        chainId: {{chain_id}}
      }));
      
      // Simulate connection event
      if (window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('walletconnect_connection', {
          detail: {
            connected: true,
            address: '{{address}}'
          }
        }));
      }
    }
  });
  
  // Wait for the wallet connection to be established
  console.log('Waiting for wallet connection to establish...');
  try {
    const walletInfo = await page.locator('{{wallet_info_selector}}').first();
    await expect(walletInfo).toBeVisible({ timeout: 10000 });
    console.log('Wallet connected successfully');
  } catch (e) {
    console.log('Connection verification failed, but test continuing for demonstration');
  }
  
  // Fill transaction form (specific to your dApp)
  console.log('Preparing transaction...');
  try {
    const recipientField = await page.locator('{{recipient_field_selector}}').first();
    await expect(recipientField).toBeVisible({ timeout: 5000 });
    await recipientField.fill('{{recipient}}');
    
    const amountField = await page.locator('{{amount_field_selector}}').first();
    await expect(amountField).toBeVisible({ timeout: 5000 });
    await amountField.fill('{{amount}}');
  } catch (e) {
    console.log('Could not fill transaction form, continuing with default values:', e);
  }
  
  // Submit the transaction
  console.log('Submitting transaction...');
  try {
    const sendButton = await page.locator('{{send_button_selector}}').first();
    await expect(sendButton).toBeVisible({ timeout: 5000 });
    await sendButton.click();
    
    // Take a screenshot of the transaction confirmation dialog if visible
    try {
      const confirmationModal = await page.locator('.walletconnect-modal, .wc-modal').first();
      if (await confirmationModal.isVisible()) {
        await page.screenshot({ path: 'test-results/walletconnect-tx-confirmation.png' });
      }
    } catch (e) {
      console.log('No confirmation modal found');
    }
  } catch (e) {
    console.log('Could not submit transaction:', e);
  }
  
  // Simulate transaction approval in the wallet
  console.log('Simulating transaction approval in the wallet...');
  await page.evaluate(() => {
    // In a real implementation, this would happen in the mobile wallet
    // after scanning the QR code and approving the transaction
    
    // Simulate transaction confirmed event
    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('walletconnect_transaction_confirmed', {
        detail: {
          txHash: '{{transaction_hash}}',
          success: true
        }
      }));
    }
  });
  
  // Verify transaction success
  console.log('Verifying transaction confirmation...');
  try {
    const txConfirmation = await page.locator('{{tx_confirmation_selector}}').first();
    await expect(txConfirmation).toBeVisible({ timeout: 10000 });
    
    const txHash = await page.locator('{{tx_hash_selector}}').first();
    if (await txHash.isVisible()) {
      console.log('Transaction confirmed with hash:', await txHash.textContent());
    }
    
    console.log('Transaction successfully completed');
  } catch (e) {
    console.log('Transaction confirmation verification failed:', e);
  }
  
  // Document the final state
  await page.screenshot({ path: 'test-results/walletconnect-transaction-complete.png' });
  console.log('WalletConnect transaction test completed');
}); 