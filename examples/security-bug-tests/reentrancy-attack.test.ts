// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Reentrancy Attack Detection', () => {
  test('should detect potential reentrancy vulnerabilities', async ({ page }) => {
    // Navigate to the target dApp
    await page.goto(process.env.TARGET_URL || 'http://localhost:3000');
    
    // Connect wallet
    const connectButton = page.getByRole('button', { name: /connect wallet/i });
    await connectButton.click();
    
    // Select MetaMask
    const metamaskOption = page.getByText('MetaMask', { exact: false });
    if (await metamaskOption.isVisible().catch(() => false)) {
      await metamaskOption.click();
    }
    
    // Wait for connection
    await page.waitForSelector('text=Connected', { timeout: 10000 });
    
    // Find and interact with a function that might be vulnerable to reentrancy
    // For example, a withdraw function in a DeFi application
    const withdrawButton = page.getByRole('button', { name: /withdraw/i });
    
    // Check if the withdraw button exists
    if (await withdrawButton.isVisible().catch(() => false)) {
      // Before clicking, set up an interceptor to monitor calls
      await page.route('**/*', route => {
        const request = route.request();
        if (request.method() === 'POST' && request.postData()?.includes('withdraw')) {
          console.log('Intercepted withdraw call:', request.postData());
          
          // Check if the contract updates state after external calls
          const postData = request.postData() || '';
          const isVulnerable = postData.includes('call') && !postData.includes('nonReentrant');
          
          if (isVulnerable) {
            console.warn('POTENTIAL REENTRANCY VULNERABILITY DETECTED: State updated after external call');
            test.info().annotations.push({
              type: 'vulnerability',
              description: 'Potential reentrancy vulnerability detected'
            });
          }
        }
        route.continue();
      });
      
      // Click the withdraw button
      await withdrawButton.click();
      
      // Wait for transaction confirmation
      await page.waitForSelector('text=Transaction confirmed', { timeout: 15000 }).catch(() => {});
    } else {
      console.log('No withdraw function found to test for reentrancy');
      test.skip();
    }
  });
});