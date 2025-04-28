// MetaMask error handling test
const { test, expect } = require('@playwright/test');

// Test configuration
const WALLET_ADDRESS = '{{address}}';
const WALLET_NAME = '{{wallet}}';
const NETWORK_NAME = '{{network}}';

test.describe('MetaMask Error Handling Test', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    // Create a new page 
    page = await browser.newPage();
    
    // Mock the ethereum provider before navigating to the page
    await page.addInitScript(() => {
      window.ethereum = {
        isMetaMask: true,
        selectedAddress: '{{address}}',
        request: async ({ method, params }) => {
          console.log(`MetaMask mock: ${method} called`);
          
          // Simulate different error responses based on method
          if (method === 'eth_sendTransaction') {
            throw {
              code: 4001,
              message: 'MetaMask Tx Signature: User denied transaction signature.'
            };
          } else if (method === 'eth_requestAccounts') {
            return ['{{address}}'];
          } else if (method === 'personal_sign') {
            throw {
              code: 4001,
              message: 'MetaMask Message Signature: User denied message signature.'
            };
          } else if (method === 'wallet_switchEthereumChain') {
            throw {
              code: 4902,
              message: 'Unrecognized chain ID'
            };
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

  test('handles transaction rejection', async () => {
    // Find and click the "Send Transaction" button
    const sendButton = await page.locator('{{send_button_selector}}');
    await expect(sendButton).toBeVisible();
    await sendButton.click();
    
    // Check for error message display
    const errorMessage = await page.locator('#error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('User denied transaction');
    
    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/metamask-tx-error-test.png' });
    
    console.log('MetaMask transaction error test completed successfully!');
  });
  
  test('handles signature rejection', async () => {
    // Find and click the "Sign Message" button
    const signButton = await page.locator('{{sign_button_selector}}');
    await expect(signButton).toBeVisible();
    await signButton.click();
    
    // Check for error message display
    const errorMessage = await page.locator('#signature-error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('User denied message signature');
    
    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/metamask-sign-error-test.png' });
    
    console.log('MetaMask signature error test completed successfully!');
  });
  
  test('handles network switching error', async () => {
    // Find and click the "Switch Network" button
    const switchNetworkButton = await page.locator('#switch-network');
    await expect(switchNetworkButton).toBeVisible();
    await switchNetworkButton.click();
    
    // Check for error message display
    const errorMessage = await page.locator('#network-error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Unrecognized chain ID');
    
    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/metamask-network-error-test.png' });
    
    console.log('MetaMask network error test completed successfully!');
  });
}); 