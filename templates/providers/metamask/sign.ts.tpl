// MetaMask signing test
import { test, expect } from '@playwright/test';

// Test configuration
const WALLET_ADDRESS: string = '{{address}}';
const MESSAGE_TO_SIGN: string = 'Hello Web3 World!';
const NETWORK_NAME: string = '{{network}}';

interface EthereumProvider {
  isMetaMask: boolean;
  selectedAddress: string | null;
  chainId: string;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (eventName: string, callback: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    ethereum: EthereumProvider;
  }
}

test.describe('MetaMask Signing Test', () => {
  let page: any;

  test.beforeEach(async ({ browser }) => {
    // Create a new page 
    page = await browser.newPage();
    
    // Mock the ethereum provider before navigating to the page
    await page.addInitScript(() => {
      window.ethereum = {
        isMetaMask: true,
        selectedAddress: '{{address}}',
        chainId: '{{chain_id}}',
        request: async ({ method, params }) => {
          console.log(`MetaMask mock: ${method} called`);
          
          if (method === 'eth_requestAccounts') {
            return ['{{address}}'];
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
        }
      };
    });
    
    // Navigate to the test page or use a blank page
    await page.goto('{{dapp_url}}');
  });

  test('signs message with MetaMask', async () => {
    // Connect wallet if needed
    const connectWalletButton = await page.locator('{{connect_button_selector}}');
    if (await connectWalletButton.isVisible()) {
      await connectWalletButton.click();
    }

    // Locate and click the sign message button
    const signButton = await page.locator('{{sign_button_selector}}');
    await expect(signButton).toBeVisible();
    await signButton.click();
    
    // Wait for signature confirmation
    const signatureConfirmation = await page.locator('{{signature_confirmation_selector}}');
    await expect(signatureConfirmation).toBeVisible({ timeout: 10000 });
    
    // Verify signature is displayed
    const signatureElement = await page.locator('{{signature_selector}}');
    const signature = await signatureElement.textContent();
    expect(signature).toBeTruthy();
    expect(signature?.startsWith('0x')).toBeTruthy();
    
    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/metamask-signing-test.png' });
    
    console.log('MetaMask signing test completed successfully!');
  });
}); 