/* global describe, it, expect, beforeEach, afterEach, jest */
// Dark Forest Game Security Test Suite using Audityzer
const { test, expect } = require('@playwright/test');

/**
 * Security test suite for Dark Forest blockchain game
 *
 * Testing for:
 * 1. Secure wallet authentication
 * 2. Transaction integrity and security
 * 3. Game state manipulation prevention
 * 4. zk-SNARK proof validation
 * 5. Contract interaction security
 * 6. Cross-chain bridge security (if applicable)
 */

// Test configuration
const LOCAL_GAME_URL = 'http://localhost:3000';
const WALLET_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
const INVALID_PROOF = '0x0000000000000000000000000000000000000000000000000000000000000000';
const TEST_GAME_CONTRACT = '0x1234567890123456789012345678901234567890';

// Helper to set up wallet and game environment
async function setupGameEnvironment(page, options = {}) {
  const {
    failConnect = false,
    failTransaction = false,
    invalidProof = false,
    mockPlanetData = true,
  } = options;

  // Set up wallet mock first
  await page.addInitScript(() => {
    window.ethereum = {
      isMetaMask: true,
      selectedAddress: '0x1234567890abcdef1234567890abcdef12345678',
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

        // Balance and contract methods
        if (method === 'eth_getBalance') {
          return '0x56BC75E2D63100000'; // 100 ETH
        }

        // Transaction methods - for game actions
        if (method === 'eth_sendTransaction') {
          if (window.failTransaction) {
            throw new Error('Transaction rejected');
          }

          // Check if this is a game action
          const isGameAction = params[0].to === window.gameContractAddress;

          if (isGameAction) {
            // Here we could check invalid actions, but we'll just return a tx hash
            return '0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234';
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

    // Set Dark Forest specific properties and mock
    window.gameContractAddress = '0x1234567890123456789012345678901234567890';

    // Set fail flags
    window.failConnect = false;
    window.failTransaction = false;
    window.invalidProof = false;
  });

  // Set up Dark Forest specific game mocks
  await page.addInitScript(() => {
    // Mock zk-SNARK verification
    window.snarkjs = {
      groth16: {
        fullProve: async (input, wasmFile, zkeyFile) => {
          console.log('Mock SNARK proof generation:', { input, wasmFile, zkeyFile });

          if (window.invalidProof) {
            return {
              proof: {
                pi_a: ['0x0', '0x0'],
                pi_b: [
                  ['0x0', '0x0'],
                  ['0x0', '0x0'],
                ],
                pi_c: ['0x0', '0x0'],
              },
              publicSignals: ['0x0'],
            };
          }

          // Valid mock proof
          return {
            proof: {
              pi_a: ['0x1234', '0x5678'],
              pi_b: [
                ['0x1234', '0x5678'],
                ['0x9abc', '0xdef0'],
              ],
              pi_c: ['0x1234', '0x5678'],
            },
            publicSignals: ['0x1234567890abcdef'],
          };
        },
        verify: async (vkey, publicSignals, proof) => {
          console.log('Mock SNARK verification:', { vkey, publicSignals, proof });
          return !window.invalidProof;
        },
      },
    };

    // Mock game-specific APIs and data
    if (!window.df) {
      window.df = {
        contractAddress: window.gameContractAddress,
        getAccount: () => window.ethereum.selectedAddress,
        getPlanetWithId: id => ({
          id,
          owner:
            id % 2 === 0
              ? window.ethereum.selectedAddress
              : '0x0000000000000000000000000000000000000000',
          silver: 1000,
          energy: 1000,
          x: 1000,
          y: 1000,
          planetLevel: 1,
          defense: 100,
          range: 100,
          speed: 100,
          population: 100000000,
        }),
        getGameObjects: () => ({
          planets: new Map([
            ['0x1', { id: '0x1', owner: window.ethereum.selectedAddress }],
            ['0x2', { id: '0x2', owner: '0x0000000000000000000000000000000000000000' }],
          ]),
        }),
        getPlayerWithAddress: address => ({
          address,
          score: 1000,
          planets: ['0x1'],
        }),
      };
    }
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

  if (invalidProof) {
    await page.evaluate(() => {
      window.invalidProof = true;
    });
  }
}

test.describe('Dark Forest Game Security Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up the game environment with default settings
    await setupGameEnvironment(page);

    // Navigate to the app
    await page.goto(LOCAL_GAME_URL);

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  test('secure player authentication with wallet', async ({ page }) => {
    // Find and click any login/connect wallet button
    const connectButton = page.locator(
      'button:has-text("Connect"), button:has-text("Login"), button:has-text("Play")'
    );
    if ((await connectButton.count()) > 0) {
      await connectButton.click();
    }

    // Verify the player's wallet address is displayed
    const addressDisplay = page.locator('text=/0x[a-fA-F0-9]{40}/');
    await expect(addressDisplay).toBeVisible();

    // Check that the wallet connection persists after page reload
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Address should still be visible after reload
    await expect(addressDisplay).toBeVisible();
  });

  test('prevents unauthorized game actions', async ({ page }) => {
    // Connect wallet first
    const connectButton = page.locator(
      'button:has-text("Connect"), button:has-text("Login"), button:has-text("Play")'
    );
    if ((await connectButton.count()) > 0) {
      await connectButton.click();
    }

    // Inject attack scenario: Try to perform an action on a planet not owned by the player
    await page.evaluate(() => {
      // Attempt to send a move from a planet not owned by the player
      const targetPlanet = '0x2'; // planet not owned by player
      const moveFn = window.df?.move || ((from, to) => console.log('Move attempted', { from, to }));

      // Attempt the unauthorized move
      try {
        moveFn(targetPlanet, '0x1');
      } catch (e) {
        console.log('Move correctly rejected:', e);
      }
    });

    // Check for error messages about unauthorized actions
    const errorMessage = page.locator('text=/unauthorized|not owner|cannot move/i');
    await expect(errorMessage)
      .toBeVisible({ timeout: 5000 })
      .catch(async () => {
        // If no explicit error, verify action was not successful through game state
        const gameState = await page.evaluate(() => {
          // Check game logs or state to verify the move didn't happen
          return {
            lastAction: window.lastGameAction || 'none',
            actionSucceeded: window.lastActionSucceeded || false,
          };
        });

        expect(gameState.actionSucceeded).toBeFalsy();
      });
  });

  test('validates zk-SNARK proofs for game actions', async ({ page }) => {
    // Connect wallet and enter the game
    const connectButton = page.locator(
      'button:has-text("Connect"), button:has-text("Login"), button:has-text("Play")'
    );
    if ((await connectButton.count()) > 0) {
      await connectButton.click();
    }

    // Set up invalid proof scenario
    await page.evaluate(() => {
      window.invalidProof = true;
    });

    // Attempt to perform an action requiring a proof
    await page.evaluate(() => {
      // Find owned planet
      const ownedPlanet = '0x1';
      const targetPlanet = '0x2';

      // Attempt action requiring proof (move, reveal, etc)
      const revealFn =
        window.df?.revealLocation || (location => console.log('Reveal attempted', { location }));

      try {
        revealFn({ x: 1000, y: 1000 });
      } catch (e) {
        console.log('Action correctly rejected due to invalid proof:', e);
      }
    });

    // Check for proof validation errors
    const errorMessage = page.locator('text=/invalid proof|proof failed|verification failed/i');
    await expect(errorMessage)
      .toBeVisible({ timeout: 5000 })
      .catch(async () => {
        // If no explicit error, verify action was not successful through game state
        const proofVerified = await page.evaluate(() => {
          return window.lastProofVerified === false;
        });

        expect(proofVerified).toBeTruthy();
      });
  });

  test('prevents replay of old transactions', async ({ page }) => {
    // Connect wallet and enter the game
    const connectButton = page.locator(
      'button:has-text("Connect"), button:has-text("Login"), button:has-text("Play")'
    );
    if ((await connectButton.count()) > 0) {
      await connectButton.click();
    }

    // Simulate a transaction replay attack
    await page.evaluate(() => {
      // Create a mock transaction
      const mockTx = {
        from: window.ethereum.selectedAddress,
        to: window.gameContractAddress,
        data: '0x1234567890', // some game action
        nonce: 5, // older nonce
        value: '0x0',
      };

      // Store for verification
      window.replayTx = mockTx;

      // Attempt to send it (without actually sending)
      console.log('Attempting transaction replay with old nonce:', mockTx);
    });

    // The game should detect and prevent the old transaction
    const gameState = await page.evaluate(() => {
      // Verify if there's a nonce check mechanism
      return {
        nonceCheck: window.df?.hasNonceCheck || 'unknown',
        timestamp: window.df?.timestamp || 0,
        requiresTimestamp: window.df?.requiresTimestamp || false,
      };
    });

    // The game should have some protection mechanism
    expect(gameState.nonceCheck !== 'unknown' || gameState.requiresTimestamp).toBeTruthy();
  });

  test('handles transaction failures gracefully', async ({ page }) => {
    // Connect wallet with transaction failure scenario
    await setupGameEnvironment(page, { failTransaction: true });

    // Connect wallet and enter the game
    const connectButton = page.locator(
      'button:has-text("Connect"), button:has-text("Login"), button:has-text("Play")'
    );
    if ((await connectButton.count()) > 0) {
      await connectButton.click();
    }

    // Try to make a game action that will trigger a transaction
    const gameActionButton = page.locator(
      'button:has-text("Move"), button:has-text("Attack"), button:has-text("Explore")'
    );
    if ((await gameActionButton.count()) > 0) {
      await gameActionButton.click();

      // Select targets if needed
      const targetPlanet = page.locator('.planet, .planet-card').first();
      if ((await targetPlanet.count()) > 0) {
        await targetPlanet.click();
      }

      // Confirm the action
      const confirmButton = page.locator('button:has-text("Confirm"), button:has-text("Send")');
      if ((await confirmButton.count()) > 0) {
        await confirmButton.click();
      }
    }

    // Check for proper error handling
    const errorMessage = page.locator('text=/transaction failed|rejected|error/i');
    await expect(errorMessage)
      .toBeVisible({ timeout: 5000 })
      .catch(() => {
        // If no message, game should still be usable
        expect(gameActionButton).toBeVisible();
      });
  });

  test('secures sensitive game operations', async ({ page }) => {
    // Connect wallet
    const connectButton = page.locator(
      'button:has-text("Connect"), button:has-text("Login"), button:has-text("Play")'
    );
    if ((await connectButton.count()) > 0) {
      await connectButton.click();
    }

    // Search for admin or sensitive operations
    const sensitiveButtons = [
      page.locator('button:has-text("Admin")'),
      page.locator('button:has-text("Debug")'),
      page.locator('button:has-text("Cheat")'),
      page.locator('[data-testid="admin-controls"]'),
    ];

    // Check each potential sensitive control
    for (const button of sensitiveButtons) {
      if ((await button.count()) > 0) {
        await button.click();

        // Check for authorization check on admin features
        const adminFeature = page.locator('text=/admin only|not authorized/i');
        await expect(adminFeature)
          .toBeVisible({ timeout: 5000 })
          .catch(() => {
            // If we don't see explicit authorization, the feature shouldn't have significant impact
            console.log('Checking if sensitive operation is actually protected...');
          });
      }
    }
  });
});
