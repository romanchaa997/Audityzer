/**
 * Basic Security Test Template
 * 
 * This template provides a starting point for creating security tests
 * for Web3 applications and smart contracts.
 */

import { test, expect } from '@playwright/test';

// Test configuration
const config = {
  // Target URL (can be overridden by environment variable)
  targetUrl: process.env.TARGET_URL || 'http://localhost:5050',
  
  // Wallet provider to use
  walletProvider: process.env.WALLET_PROVIDER || '{{WALLET_PROVIDER}}' || 'metamask',
  
  // Test timeout
  timeout: 60000,
  
  // Screenshot on failure
  screenshotOnFailure: true
};

// Test for basic security vulnerabilities
test('Basic security test', async ({ page }) => {
  // Navigate to the target URL
  await page.goto(config.targetUrl);
  console.log(`Navigated to ${config.targetUrl}`);
  
  // Wait for page to load completely
  await page.waitForLoadState('networkidle');
  
  // FUZZING_PLACEHOLDER
  
  // Connect wallet
  console.log(`Connecting to wallet: ${config.walletProvider}`);
  await connectWallet(page, config.walletProvider);
  
  // Check for common security issues
  await checkForSecurityIssues(page);
});

/**
 * Connect to a wallet
 * 
 * @param {Page} page - Playwright page object
 * @param {string} walletProvider - Wallet provider to use
 */
async function connectWallet(page, walletProvider) {
  try {
    // Look for common wallet connection buttons
    const connectButton = await page.getByRole('button', { name: /connect|wallet|sign in/i }).first();
    
    if (await connectButton.isVisible()) {
      await connectButton.click();
      console.log('Clicked connect button');
      
      // Wait for wallet selection dialog if present
      const walletOption = await page.getByText(new RegExp(walletProvider, 'i')).first();
      
      if (await walletOption.isVisible()) {
        await walletOption.click();
        console.log(`Selected ${walletProvider}`);
      }
      
      // Wait for connection to complete
      await page.waitForTimeout(2000);
    } else {
      console.log('No connect button found, assuming already connected');
    }
  } catch (error) {
    console.error(`Failed to connect wallet: ${error.message}`);
    throw error;
  }
}

/**
 * Check for common security issues
 * 
 * @param {Page} page - Playwright page object
 */
async function checkForSecurityIssues(page) {
  // Check for insecure communication
  const pageUrl = page.url();
  expect(pageUrl.startsWith('https://') || pageUrl.startsWith('http://localhost'), 
    'Page should use HTTPS or be on localhost').toBeTruthy();
  
  // Check for exposed sensitive data in page source
  const pageContent = await page.content();
  expect(pageContent).not.toContain('private key');
  expect(pageContent).not.toContain('mnemonic');
  expect(pageContent).not.toContain('seed phrase');
  
  // Check for proper Content Security Policy
  const cspHeader = await page.evaluate(() => {
    return document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.getAttribute('content');
  });
  
  if (cspHeader) {
    console.log('CSP header found:', cspHeader);
  } else {
    console.warn('No CSP header found');
  }
  
  // Check for proper error handling
  await testErrorHandling(page);
  
  // Check for proper input validation
  await testInputValidation(page);
  
  // Check for proper transaction signing
  await testTransactionSigning(page);
}

/**
 * Test error handling
 * 
 * @param {Page} page - Playwright page object
 */
async function testErrorHandling(page) {
  try {
    // Try to trigger an error by navigating to a non-existent page
    await page.goto(`${page.url()}/_non_existent_page_`);
    
    // Check if there's a proper error message
    const errorMessage = await page.getByText(/error|not found|404/i).first();
    
    if (await errorMessage.isVisible()) {
      console.log('Error handling works properly');
    } else {
      console.warn('No error message found for non-existent page');
    }
    
    // Navigate back to the main page
    await page.goto(config.targetUrl);
  } catch (error) {
    console.error(`Error handling test failed: ${error.message}`);
  }
}

/**
 * Test input validation
 * 
 * @param {Page} page - Playwright page object
 */
async function testInputValidation(page) {
  try {
    // Find input fields
    const inputFields = await page.$$('input');
    
    for (const input of inputFields) {
      // Get input type
      const inputType = await input.getAttribute('type');
      
      if (inputType === 'text' || inputType === 'number' || !inputType) {
        // Test with potentially malicious input
        await input.fill('<script>alert("XSS")</script>');
        
        // Check if the input was properly sanitized
        const inputValue = await input.inputValue();
        
        if (inputValue === '<script>alert("XSS")</script>') {
          console.warn('Input field may be vulnerable to XSS');
        } else {
          console.log('Input field properly sanitizes input');
        }
        
        // Clear the input
        await input.clear();
      }
    }
  } catch (error) {
    console.error(`Input validation test failed: ${error.message}`);
  }
}

/**
 * Test transaction signing
 * 
 * @param {Page} page - Playwright page object
 */
async function testTransactionSigning(page) {
  try {
    // Look for transaction buttons
    const transactionButtons = await page.$$('button');
    let transactionButton = null;
    
    for (const button of transactionButtons) {
      const buttonText = await button.textContent();
      
      if (/send|transfer|swap|approve|confirm/i.test(buttonText)) {
        transactionButton = button;
        break;
      }
    }
    
    if (transactionButton) {
      console.log('Found transaction button, but not clicking to avoid actual transactions');
      // In a real test, you might want to mock the wallet and actually test the transaction flow
    } else {
      console.log('No transaction button found');
    }
  } catch (error) {
    console.error(`Transaction signing test failed: ${error.message}`);
  }
}