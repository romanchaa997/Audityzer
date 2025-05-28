/**
 * Account Abstraction (ERC-4337) Test Template
 * 
 * This template provides a starting point for testing ERC-4337 compliant
 * smart accounts, paymasters, and bundlers.
 */

import { test, expect } from '@playwright/test';

// Test configuration
const config = {
  // Target URL (can be overridden by environment variable)
  targetUrl: process.env.TARGET_URL || 'http://localhost:5050',
  
  // Wallet provider to use
  walletProvider: process.env.WALLET_PROVIDER || '{{WALLET_PROVIDER}}' || 'metamask',
  
  // Use Pimlico bundler
  usePimlico: process.env.USE_PIMLICO === 'true',
  
  // Test timeout
  timeout: 120000,
  
  // Screenshot on failure
  screenshotOnFailure: true
};

// Test for account abstraction functionality
test('Account abstraction basic test', async ({ page }) => {
  // Navigate to the target URL
  await page.goto(config.targetUrl);
  console.log(`Navigated to ${config.targetUrl}`);
  
  // Wait for page to load completely
  await page.waitForLoadState('networkidle');
  
  // Connect wallet
  console.log(`Connecting to wallet: ${config.walletProvider}`);
  await connectWallet(page, config.walletProvider);
  
  // Check for AA support
  const hasAASupport = await checkForAASupport(page);
  
  if (hasAASupport) {
    // Test smart account creation
    await testSmartAccountCreation(page);
    
    // Test paymaster functionality
    await testPaymasterFunctionality(page);
    
    // Test bundler interaction
    await testBundlerInteraction(page);
  } else {
    console.log('No account abstraction support detected');
  }
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
 * Check for account abstraction support
 * 
 * @param {Page} page - Playwright page object
 * @returns {Promise<boolean>} Whether AA is supported
 */
async function checkForAASupport(page) {
  try {
    // Check for ERC-4337 support in page source
    const pageContent = await page.content();
    const hasERC4337 = pageContent.includes('ERC-4337') || 
                      pageContent.includes('erc4337') || 
                      pageContent.includes('account abstraction');
    
    // Check for common AA providers in the page
    const hasAAProviders = pageContent.includes('Pimlico') || 
                          pageContent.includes('Stackup') || 
                          pageContent.includes('Biconomy') || 
                          pageContent.includes('Etherspot') || 
                          pageContent.includes('Candide');
    
    // Check for UserOperation in the page
    const hasUserOp = pageContent.includes('UserOperation') || 
                     pageContent.includes('userOp');
    
    // Check for bundler references
    const hasBundler = pageContent.includes('bundler') || 
                      pageContent.includes('Bundler');
    
    // Check for paymaster references
    const hasPaymaster = pageContent.includes('paymaster') || 
                        pageContent.includes('Paymaster');
    
    const hasAASupport = hasERC4337 || hasAAProviders || hasUserOp || hasBundler || hasPaymaster;
    
    if (hasAASupport) {
      console.log('Account abstraction support detected');
      
      if (hasERC4337) console.log('- ERC-4337 references found');
      if (hasAAProviders) console.log('- AA providers found');
      if (hasUserOp) console.log('- UserOperation references found');
      if (hasBundler) console.log('- Bundler references found');
      if (hasPaymaster) console.log('- Paymaster references found');
    }
    
    return hasAASupport;
  } catch (error) {
    console.error(`Failed to check for AA support: ${error.message}`);
    return false;
  }
}

/**
 * Test smart account creation
 * 
 * @param {Page} page - Playwright page object
 */
async function testSmartAccountCreation(page) {
  try {
    // Look for account creation elements
    const createAccountButton = await page.getByRole('button', { 
      name: /create|deploy|initialize|setup/i 
    }).first();
    
    if (await createAccountButton.isVisible()) {
      console.log('Found account creation button, but not clicking to avoid actual deployment');
      // In a real test, you might want to mock the wallet and actually test the account creation
    } else {
      console.log('No account creation button found, assuming account already exists');
    }
    
    // Check for account address display
    const accountAddressElement = await page.getByText(/0x[a-fA-F0-9]{40}/).first();
    
    if (await accountAddressElement.isVisible()) {
      const accountAddress = await accountAddressElement.textContent();
      console.log(`Found account address: ${accountAddress}`);
    }
  } catch (error) {
    console.error(`Smart account creation test failed: ${error.message}`);
  }
}

/**
 * Test paymaster functionality
 * 
 * @param {Page} page - Playwright page object
 */
async function testPaymasterFunctionality(page) {
  try {
    // Look for paymaster-related elements
    const paymasterElements = await page.$$('*');
    let paymasterElement = null;
    
    for (const element of paymasterElements) {
      const elementText = await element.textContent();
      
      if (/paymaster|sponsored|gas-?free/i.test(elementText)) {
        paymasterElement = element;
        break;
      }
    }
    
    if (paymasterElement) {
      console.log('Found paymaster-related element');
      const elementText = await paymasterElement.textContent();
      console.log(`Paymaster element text: ${elementText}`);
    } else {
      console.log('No paymaster-related element found');
    }
    
    // Check for gas sponsorship options
    const sponsorshipOptions = await page.getByText(/sponsor|pay with|gas-?free/i).first();
    
    if (await sponsorshipOptions.isVisible()) {
      console.log('Found gas sponsorship options');
    }
  } catch (error) {
    console.error(`Paymaster functionality test failed: ${error.message}`);
  }
}

/**
 * Test bundler interaction
 * 
 * @param {Page} page - Playwright page object
 */
async function testBundlerInteraction(page) {
  try {
    // Check for bundler-related network requests
    await page.route('**/*', route => {
      const url = route.request().url();
      
      if (url.includes('bundler') || 
          url.includes('pimlico') || 
          url.includes('stackup') || 
          url.includes('biconomy') || 
          url.includes('etherspot') || 
          url.includes('candide')) {
        console.log(`Detected bundler request to: ${url}`);
      }
      
      route.continue();
    });
    
    // Try to trigger a transaction to see bundler interaction
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
    
    // Wait a moment to capture any network requests
    await page.waitForTimeout(2000);
  } catch (error) {
    console.error(`Bundler interaction test failed: ${error.message}`);
  }
}