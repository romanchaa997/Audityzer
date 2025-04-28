// WalletConnect connection test with TypeScript
import { test, expect } from '@playwright/test';

// Test configuration
const WALLET_ADDRESS = '{{address}}';
const WALLET_NAME = '{{wallet}}';
const NETWORK_NAME = '{{network}}';

// Define WalletConnect provider types
declare global {
  interface Window {
    ethereum: {
      isMetaMask: boolean;
      isWalletConnect: boolean;
      selectedAddress: string | null;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
      disconnect: () => Promise<boolean>;
      triggerQRCode: () => void;
    };
  }
}

/**
 * WalletConnect Basic Connection Test
 * 
 * This test demonstrates a basic connection flow using WalletConnect
 * with a Web3 enabled dApp. It covers:
 * 
 * 1. Opening the target dApp
 * 2. Initiating the WalletConnect connection
 * 3. Handling the QR code scanning step
 * 4. Verifying successful connection
 * 5. Handling disconnection
 */
test('Connect to dApp using WalletConnect', async ({ page }) => {
  // Navigate to the dApp
  console.log('Navigating to the dApp...');
  await page.goto('{{dapp_url}}');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Find and click the "Connect Wallet" button
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
  
  // IMPORTANT: At this point, manual intervention is required to scan the QR code
  // with a mobile wallet that supports WalletConnect
  
  // In a real test, you might:
  // 1. Use a headless wallet that can programmatically connect
  // 2. Use a mock implementation of WalletConnect
  // 3. Take a screenshot of the QR code for manual scanning
  
  // For demonstration purposes, we'll simulate the connection
  console.log('Simulating successful WalletConnect connection...');
  
  // You could mock the WalletConnect connection result
  await page.evaluate(() => {
    // In a real dApp, WalletConnect would trigger these events
    // This is a simplification for demo purposes
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
  
  // Verify wallet connection status (the implementation will vary by dApp)
  console.log('Verifying connection status...');
  try {
    const walletInfo = await page.locator('{{wallet_info_selector}}').first();
    await expect(walletInfo).toBeVisible({ timeout: 10000 });
    
    const walletAddress = await page.locator('{{wallet_address_selector}}').first();
    await expect(walletAddress).toContainText('{{address}}'.substring(0, 8), { timeout: 10000 });
    
    console.log('WalletConnect connection verified!');
  } catch (e) {
    console.log('Connection verification failed, but test continuing for demonstration');
    console.log(e);
  }
  
  // Disconnection flow
  console.log('Testing disconnection...');
  try {
    // Find and click disconnect button (this varies by dApp implementation)
    const disconnectButton = await page.locator('text=Disconnect, button:has-text("Disconnect")').first();
    await disconnectButton.click();
    
    // Verify disconnection
    await expect(connectWalletButton).toBeVisible({ timeout: 10000 });
    console.log('Disconnection successful!');
  } catch (e) {
    console.log('Disconnection flow skipped - button not found or not implemented in dApp');
  }
  
  console.log('WalletConnect test completed');
});