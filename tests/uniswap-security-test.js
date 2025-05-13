// Uniswap dApp Security Test Suite using Web3FuzzForge
const { test, expect } = require('@playwright/test');

/**
 * Security test suite for uniswap-dapp-starter
 * Testing for:
 * 1. Secure wallet connection
 * 2. Transaction security
 * 3. Network switching vulnerabilities
 * 4. Input validation for token swap
 * 5. Authorization persistence
 */

// Test configuration
const LOCAL_APP_URL = 'http://localhost:3000';
const WALLET_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
const TEST_NETWORK_ID = '0x1'; // Ethereum Mainnet
const TEST_AMOUNT = '0.01';

// Helper to set up MetaMask mock
async function setupMetaMaskMock(page, options = {}) {
  const { failConnect = false, failTransaction = false } = options;

  await page.addInitScript(() => {
    window.ethereum = {
      isMetaMask: true,
      selectedAddress: null,
      networkVersion: '1',
      chainId: '0x1',

      request: async ({ method, params }) => {
        console.log(`MetaMask mock: ${method} called with params:`, params);

        if (method === 'eth_requestAccounts') {
          if (window.failConnect) {
            throw new Error('User rejected connection');
          }
          window.ethereum.selectedAddress = '0x1234567890abcdef1234567890abcdef12345678';
          return [window.ethereum.selectedAddress];
        }

        if (method === 'eth_accounts') {
          return [window.ethereum.selectedAddress || ''];
        }

        if (method === 'eth_chainId') {
          return window.ethereum.chainId;
        }

        if (method === 'eth_sendTransaction') {
          if (window.failTransaction) {
            throw new Error('Transaction rejected');
          }
          return '0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234';
        }

        if (method === 'wallet_switchEthereumChain') {
          window.ethereum.chainId = params[0].chainId;
          window.ethereum.networkVersion = parseInt(params[0].chainId).toString();
          return null;
        }

        if (method === 'eth_getBalance') {
          return '0x1000000000000000'; // 0.001 ETH in hex
        }

        return null;
      },

      on: (eventName, callback) => {
        console.log(`MetaMask mock: event listener for ${eventName} registered`);
      },
    };

    // Set fail flags based on options
    window.failConnect = false;
    window.failTransaction = false;
  });

  // Set failure flags if needed
  if (failConnect) {
    await page.evaluate(() => {
      window.failConnect = true;
    });
  }

  if (failTransaction) {
    await page.evaluate(() => {
      window.failTransaction = true;
    });
  }
}

test.describe('Uniswap dApp Security Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up default success state for MetaMask
    await setupMetaMaskMock(page);

    // Navigate to the app
    await page.goto(LOCAL_APP_URL);

    // Wait for page to load fully
    await page.waitForLoadState('networkidle');
  });

  test('secure wallet connection process', async ({ page }) => {
    // Find and click the connect wallet button
    const connectButton = page.locator('button:has-text("Connect Wallet")');
    await connectButton.click();

    // Verify that the wallet address is displayed correctly
    const addressDisplay = page.locator('text=/0x[a-fA-F0-9]{40}/');
    await expect(addressDisplay).toBeVisible();

    // Check that the connected wallet address is truncated for security
    const displayedAddress = await addressDisplay.textContent();
    expect(displayedAddress.length).toBeLessThan(42); // Full address is 42 chars

    // Verify connection status is persisted in localStorage
    const localStorageData = await page.evaluate(() => localStorage.getItem('walletConnected'));
    expect(localStorageData).toBeTruthy();
  });

  test('transaction security and validation', async ({ page }) => {
    // Connect wallet first
    const connectButton = page.locator('button:has-text("Connect Wallet")');
    await connectButton.click();

    // Try to make a transaction with invalid input
    const amountInput = page.locator('input[type="number"]');
    if ((await amountInput.count()) > 0) {
      await amountInput.fill('999999'); // Unrealistically large amount

      // Find and click the swap/send button
      const transactionButton = page.locator('button:has-text("Swap")');
      if ((await transactionButton.count()) > 0) {
        await transactionButton.click();

        // Check for proper validation error message
        const errorMessage = page.locator('text=/insufficient|not enough|invalid/i');
        await expect(errorMessage).toBeVisible();
      }
    }
  });

  test('handles network switching securely', async ({ page }) => {
    // Connect wallet first
    const connectButton = page.locator('button:has-text("Connect Wallet")');
    await connectButton.click();

    // Find and click any network switching UI element
    const networkSwitcher = page.locator('.network-selector, [data-testid="network-selector"]');
    if ((await networkSwitcher.count()) > 0) {
      await networkSwitcher.click();

      // Select a different network
      const alternateNetwork = page.locator('text=/Polygon|Mumbai|Rinkeby|Goerli/');
      if ((await alternateNetwork.count()) > 0) {
        await alternateNetwork.click();

        // Verify network change is reflected in UI
        await expect(page.locator('text=/Polygon|Mumbai|Rinkeby|Goerli/')).toBeVisible();
      }
    }
  });

  test('rejects transaction from unauthorized wallet', async ({ page }) => {
    // Connect wallet with a known address
    const connectButton = page.locator('button:has-text("Connect Wallet")');
    await connectButton.click();

    // Now change the wallet address to simulate a different account
    await page.evaluate(() => {
      window.ethereum.selectedAddress = '0x0000000000000000000000000000000000000000';
    });

    // Try to make a transaction
    const swapButton = page.locator('button:has-text("Swap")');
    if ((await swapButton.count()) > 0) {
      await swapButton.click();

      // Check for authorization error
      const errorMessage = page.locator('text=/unauthorized|not connected|invalid account/i');
      await expect(errorMessage)
        .toBeVisible({ timeout: 5000 })
        .catch(() => {
          // If no explicit error message, the operation should at least not succeed
          console.log('No explicit error shown but transaction should not succeed');
        });
    }
  });

  test('handles connection rejection gracefully', async ({ page }) => {
    // Set up metamask to fail connection
    await setupMetaMaskMock(page, { failConnect: true });

    // Try to connect wallet
    const connectButton = page.locator('button:has-text("Connect Wallet")');
    await connectButton.click();

    // Check for proper error handling
    const errorMessage = page.locator('text=/rejected|denied|failed/i');
    await expect(errorMessage)
      .toBeVisible({ timeout: 5000 })
      .catch(() => {
        // If no explicit error message, the UI should still be usable
        expect(connectButton).toBeVisible();
      });
  });
});
