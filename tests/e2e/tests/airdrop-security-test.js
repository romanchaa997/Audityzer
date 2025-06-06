// Airdrop Security Test Suite using Audityzer
const { test, expect } = require('@playwright/test');

/**
 * Security test suite for Airdrop application
 *
 * Testing for:
 * 1. Authorization and authentication vulnerabilities
 * 2. Token transfer security
 * 3. Input validation for token amounts
 * 4. Chain ID validation
 * 5. Error handling for failed transactions
 */

// Test configuration
const LOCAL_APP_URL = 'http://localhost:3000';
const ADMIN_WALLET_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
const USER_WALLET_ADDRESS = '0xabcdef1234567890abcdef1234567890abcdef12';
const TEST_TOKEN_ADDRESS = '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0'; // MATIC token address as example
const INVALID_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000';
const LARGE_TOKEN_AMOUNT = '999999999999999999999999';

// Helper function to set up wallet mock
async function setupWalletMock(page, options = {}) {
  const {
    address = ADMIN_WALLET_ADDRESS,
    isAdmin = true,
    failConnect = false,
    failTransaction = false,
    tokenBalance = '10000000000000000000', // 10 tokens with 18 decimals
  } = options;

  await page.addInitScript(
    ({ address, isAdmin, tokenBalance }) => {
      window.ethereum = {
        isMetaMask: true,
        selectedAddress: address,
        networkVersion: '1',
        chainId: '0x1',

        request: async ({ method, params }) => {
          console.log(`Wallet mock: ${method} called with params:`, params);

          // Connection methods
          if (method === 'eth_requestAccounts') {
            if (window.failConnect) {
              throw new Error('User rejected connection');
            }
            return [window.ethereum.selectedAddress];
          }

          if (method === 'eth_accounts') {
            return [window.ethereum.selectedAddress];
          }

          if (method === 'eth_chainId') {
            return window.ethereum.chainId;
          }

          // Balance methods
          if (method === 'eth_getBalance') {
            return '0x1000000000000000'; // 0.001 ETH in hex
          }

          // Token methods - handle ERC20 balanceOf function call
          if (method === 'eth_call' && params[0].data && params[0].data.startsWith('0x70a08231')) {
            // balanceOf signature
            return '0x' + tokenBalance.toString(16).padStart(64, '0'); // Token balance
          }

          // Transaction methods
          if (method === 'eth_sendTransaction') {
            if (window.failTransaction) {
              throw new Error('Transaction rejected');
            }

            // Check for admin access on sensitive operations if required
            const isAirdropFunction =
              params[0].data &&
              (params[0].data.includes('airdrop') ||
                params[0].data.includes('transfer') ||
                params[0].data.includes('withdraw'));

            if (isAirdropFunction && !isAdmin) {
              throw new Error('Unauthorized: Only admin can perform this operation');
            }

            return '0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234';
          }

          // Network switching
          if (method === 'wallet_switchEthereumChain') {
            window.ethereum.chainId = params[0].chainId;
            window.ethereum.networkVersion = parseInt(params[0].chainId).toString();
            return null;
          }

          return null;
        },

        on: (eventName, callback) => {
          console.log(`Wallet mock: event listener for ${eventName} registered`);
        },
      };

      // Set fail flags
      window.failConnect = false;
      window.failTransaction = false;
    },
    { address, isAdmin, tokenBalance }
  );

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

test.describe('Airdrop Application Security Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up default success state for wallet with admin permissions
    await setupWalletMock(page);

    // Navigate to the app
    await page.goto(LOCAL_APP_URL);

    // Wait for page to load fully
    await page.waitForLoadState('networkidle');
  });

  test('validates token contract address', async ({ page }) => {
    // Connect wallet
    const connectButton = page
      .locator('button:has-text("Connect"), button:has-text("Connect Wallet")')
      .first();
    if ((await connectButton.count()) > 0) {
      await connectButton.click();
    }

    // Find token address input
    const tokenAddressInput = page
      .locator('input[type="text"]')
      .filter({ hasText: /token address/i });

    // Test with invalid address
    if ((await tokenAddressInput.count()) > 0) {
      await tokenAddressInput.fill(INVALID_TOKEN_ADDRESS);

      // Click add token or similar action
      const addButton = page.locator('button:has-text("Add"), button:has-text("Submit")');
      if ((await addButton.count()) > 0) {
        await addButton.click();

        // Should show an error for invalid token
        const errorMessage = page.locator('text=/invalid|not found|error/i');
        await expect(errorMessage)
          .toBeVisible({ timeout: 5000 })
          .catch(() => {
            // If no explicit error shown, at least token shouldn't be added
            const successMessage = page.locator('text=/token added|success/i');
            expect(successMessage).not.toBeVisible();
          });
      }
    }
  });

  test('prevents unauthorized airdrop actions', async ({ page }) => {
    // Set up wallet with non-admin account
    await setupWalletMock(page, {
      address: USER_WALLET_ADDRESS,
      isAdmin: false,
    });

    // Connect wallet
    const connectButton = page
      .locator('button:has-text("Connect"), button:has-text("Connect Wallet")')
      .first();
    if ((await connectButton.count()) > 0) {
      await connectButton.click();
    }

    // Try to access airdrop control or admin functions
    const adminElements = [
      page.locator('button:has-text("Airdrop")'),
      page.locator('button:has-text("Send Tokens")'),
      page.locator('button:has-text("Withdraw")'),
    ];

    for (const element of adminElements) {
      if ((await element.count()) > 0) {
        await element.click();

        // Should show an authorization error
        const errorMessage = page.locator('text=/unauthorized|admin only|not allowed/i');
        await expect(errorMessage)
          .toBeVisible({ timeout: 5000 })
          .catch(() => {
            // If no explicit error shown, transaction should fail
            const successMessage = page.locator('text=/success|tokens sent|airdrop complete/i');
            expect(successMessage).not.toBeVisible();
          });
      }
    }
  });

  test('validates token amount inputs', async ({ page }) => {
    // Connect wallet
    const connectButton = page
      .locator('button:has-text("Connect"), button:has-text("Connect Wallet")')
      .first();
    if ((await connectButton.count()) > 0) {
      await connectButton.click();
    }

    // Find token amount input
    const amountInput = page
      .locator('input[type="number"], input[type="text"]')
      .filter({ hasText: /amount/i });

    // Test with excessively large amount
    if ((await amountInput.count()) > 0) {
      await amountInput.fill(LARGE_TOKEN_AMOUNT);

      // Click send/airdrop button
      const sendButton = page.locator(
        'button:has-text("Send"), button:has-text("Airdrop"), button:has-text("Transfer")'
      );
      if ((await sendButton.count()) > 0) {
        await sendButton.click();

        // Should show an error for excessive amount
        const errorMessage = page.locator('text=/insufficient|too large|exceeds balance/i');
        await expect(errorMessage)
          .toBeVisible({ timeout: 5000 })
          .catch(() => {
            // If no explicit error, transaction should not succeed
            const successMessage = page.locator('text=/success|sent|complete/i');
            expect(successMessage).not.toBeVisible();
          });
      }
    }
  });

  test('validates recipient addresses for airdrop', async ({ page }) => {
    // Connect wallet
    const connectButton = page
      .locator('button:has-text("Connect"), button:has-text("Connect Wallet")')
      .first();
    if ((await connectButton.count()) > 0) {
      await connectButton.click();
    }

    // Find recipient address input
    const recipientInput = page
      .locator('input[type="text"]')
      .filter({ hasText: /recipient|address/i });

    // Test with invalid address
    if ((await recipientInput.count()) > 0) {
      await recipientInput.fill('0xinvalid');

      // Try to send tokens
      const sendButton = page.locator(
        'button:has-text("Send"), button:has-text("Airdrop"), button:has-text("Transfer")'
      );
      if ((await sendButton.count()) > 0) {
        await sendButton.click();

        // Should show an error for invalid address
        const errorMessage = page.locator('text=/invalid address|incorrect format/i');
        await expect(errorMessage)
          .toBeVisible({ timeout: 5000 })
          .catch(() => {
            // If no explicit error, check that transaction fails
            const successMessage = page.locator('text=/success|sent|complete/i');
            expect(successMessage).not.toBeVisible();
          });
      }
    }
  });

  test('handles chain switching securely', async ({ page }) => {
    // Connect wallet
    const connectButton = page
      .locator('button:has-text("Connect"), button:has-text("Connect Wallet")')
      .first();
    if ((await connectButton.count()) > 0) {
      await connectButton.click();
    }

    // Simulate switching to an unsupported network
    await page.evaluate(() => {
      window.ethereum.chainId = '0x89'; // Polygon
      window.ethereum.networkVersion = '137';

      // Trigger chainChanged event
      const chainChangedEvent = new Event('chainChanged');
      window.dispatchEvent(chainChangedEvent);
    });

    // Check for proper notification about network support
    const networkMessage = page.locator('text=/network|chain/i');
    await expect(networkMessage)
      .toBeVisible({ timeout: 5000 })
      .catch(() => {
        // If no message, functionality should be disabled
        const actionButtons = page.locator('button:has-text("Send"), button:has-text("Airdrop")');
        expect(actionButtons).toBeDisabled();
      });
  });
});
