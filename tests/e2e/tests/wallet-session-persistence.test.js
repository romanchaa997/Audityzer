// Wallet Session Persistence Test
const { test, expect } = require('@playwright/test');
const { saveWalletState, restoreWalletState } = require('./utils');

/**
 * Helper function to persist wallet state in localStorage
 */
async function persistWalletState(page, state) {
  return await page.evaluate(serializedState => {
    localStorage.setItem('wallet_state', serializedState);
    return true;
  }, JSON.stringify(state));
}

/**
 * Helper function to retrieve persisted wallet state from localStorage
 */
async function retrieveWalletState(page) {
  const serializedState = await page.evaluate(() => {
    return localStorage.getItem('wallet_state');
  });

  if (!serializedState) {
    return null;
  }

  try {
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error parsing wallet state:', error);
    return null;
  }
}

/**
 * Helper to setup wallet provider with persistence layer
 */
async function setupPersistableWallet(page) {
  // First check for existing state in localStorage
  await page.evaluate(() => {
    // Create listener for page loads
    window.addEventListener('load', async () => {
      // Check if we have saved wallet state
      const savedState = localStorage.getItem('wallet_state');
      if (savedState) {
        try {
          const state = JSON.parse(savedState);
          console.log('Found saved wallet state:', state);

          // If we have a provider already, just update it
          if (window.ethereum) {
            window.ethereum.selectedAddress = state.selectedAddress;
            window.ethereum.chainId = state.chainId;

            // Emit events for any listeners
            if (window.ethereum._events && window.ethereum._events.accountsChanged) {
              window.ethereum._events.accountsChanged.forEach(cb => {
                cb([state.selectedAddress]);
              });
            }

            if (window.ethereum._events && window.ethereum._events.chainChanged) {
              window.ethereum._events.chainChanged.forEach(cb => {
                cb(state.chainId);
              });
            }
          } else {
            // Need to create the provider
            setupMockProvider(state);
          }

          // Update UI
          updateWalletUI(state);
        } catch (err) {
          console.error('Error restoring wallet state:', err);
        }
      }
    });

    // Function to set up a fresh provider
    function setupMockProvider(state = {}) {
      const address = state.selectedAddress || null;
      const chainId = state.chainId || '0x1';

      window.ethereum = {
        isMetaMask: true, // Default to MetaMask
        selectedAddress: address,
        chainId,
        networkVersion:
          chainId === '0x1' ? '1' : chainId === '0x5' ? '5' : chainId === '0x89' ? '137' : '0',
        _events: {},

        request: async ({ method, params = [] }) => {
          console.log(`Wallet mock: ${method} called with params:`, params);

          switch (method) {
            case 'eth_requestAccounts':
              // If we're already connected, just return the address
              if (window.ethereum.selectedAddress) {
                return [window.ethereum.selectedAddress];
              }

              // Otherwise connect with a default address
              window.ethereum.selectedAddress = '0x1234567890abcdef1234567890abcdef12345678';

              // Save to localStorage
              saveToLocalStorage();

              // Update UI
              updateWalletUI({
                selectedAddress: window.ethereum.selectedAddress,
                chainId: window.ethereum.chainId,
              });

              return [window.ethereum.selectedAddress];

            case 'eth_chainId':
              return window.ethereum.chainId;

            case 'wallet_switchEthereumChain':
              const newChainId = params[0]?.chainId;
              if (newChainId) {
                window.ethereum.chainId = newChainId;
                window.ethereum.networkVersion =
                  newChainId === '0x1'
                    ? '1'
                    : newChainId === '0x5'
                      ? '5'
                      : newChainId === '0x89'
                        ? '137'
                        : '0';

                // Save to localStorage
                saveToLocalStorage();

                // Update UI
                updateWalletUI({
                  selectedAddress: window.ethereum.selectedAddress,
                  chainId: window.ethereum.chainId,
                });

                // Emit chainChanged event
                const callbacks = window.ethereum._events.chainChanged || [];
                callbacks.forEach(cb => cb(newChainId));
              }
              return null;

            default:
              console.warn(`Unhandled method: ${method}`);
              return null;
          }
        },

        // Event handling
        on: (eventName, callback) => {
          if (!window.ethereum._events[eventName]) {
            window.ethereum._events[eventName] = [];
          }
          window.ethereum._events[eventName].push(callback);
          return window.ethereum;
        },

        // Remove event listener
        removeListener: (eventName, callback) => {
          if (window.ethereum._events[eventName]) {
            window.ethereum._events[eventName] = window.ethereum._events[eventName].filter(
              cb => cb !== callback
            );
          }
          return window.ethereum;
        },
      };
    }

    // Helper to save current state to localStorage
    function saveToLocalStorage() {
      if (window.ethereum) {
        const state = {
          selectedAddress: window.ethereum.selectedAddress,
          chainId: window.ethereum.chainId,
          networkVersion: window.ethereum.networkVersion,
          timestamp: new Date().toISOString(),
        };

        localStorage.setItem('wallet_state', JSON.stringify(state));
      }
    }

    // Helper to update UI based on wallet state
    function updateWalletUI(state) {
      if (!state) return;

      const walletInfo = document.getElementById('wallet-info');
      if (walletInfo) {
        walletInfo.style.display = state.selectedAddress ? 'block' : 'none';
      }

      const addressEl = document.querySelector('.wallet-address');
      if (addressEl && state.selectedAddress) {
        addressEl.textContent = state.selectedAddress;
      }

      const networkNames = {
        '0x1': 'Ethereum Mainnet',
        '0x5': 'Goerli Testnet',
        '0x89': 'Polygon Mainnet',
      };

      const networkEl = document.getElementById('network-name');
      if (networkEl && state.chainId) {
        networkEl.textContent = networkNames[state.chainId] || `Chain ID: ${state.chainId}`;
      }
    }

    // Initialize the provider if it doesn't exist
    if (!window.ethereum) {
      setupMockProvider();
    }
  });

  return true;
}

test.describe('Wallet Session Persistence Tests', () => {
  let context;
  let page;
  let walletState;

  test.beforeAll(async ({ browser }) => {
    // Create a persistent context to maintain localStorage across navigations
    context = await browser.newContext({
      storageState: {
        cookies: [],
        origins: [],
      },
    });
  });

  test.beforeEach(async () => {
    // Create a new page in the persistent context
    page = await context.newPage();

    // Create a simple UI for wallet testing
    await page.setContent(`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            #wallet-info { display: none; padding: 10px; border: 1px solid #ccc; margin: 10px 0; }
            button { padding: 8px 16px; margin-right: 10px; }
          </style>
        </head>
        <body>
          <h1>Wallet Session Persistence Testing</h1>
          <div>
            <button id="connect-button">Connect Wallet</button>
            <button id="switch-network-button">Switch Network</button>
            <button id="disconnect-button">Disconnect</button>
          </div>
          
          <div id="wallet-info">
            <h3>Connected Wallet</h3>
            <p>Address: <span class="wallet-address">-</span></p>
            <p>Network: <span id="network-name">-</span></p>
          </div>
          
          <div style="margin-top: 20px;">
            <a href="#page1" id="nav-link-1">Navigate to Page 1</a> | 
            <a href="#page2" id="nav-link-2">Navigate to Page 2</a>
          </div>
        </body>
      </html>
    `);

    // Add event handling for UI interactions
    await page.evaluate(() => {
      // Connect button
      document.getElementById('connect-button').addEventListener('click', async () => {
        if (window.ethereum) {
          try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Update UI
            document.querySelector('.wallet-address').textContent = accounts[0];
            document.getElementById('wallet-info').style.display = 'block';

            // Get chain info
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            const networkNames = {
              '0x1': 'Ethereum Mainnet',
              '0x5': 'Goerli Testnet',
              '0x89': 'Polygon Mainnet',
            };
            document.getElementById('network-name').textContent =
              networkNames[chainId] || `Chain ID: ${chainId}`;
          } catch (err) {
            console.error('Error connecting wallet:', err);
          }
        }
      });

      // Network switching button - cycles through networks
      document.getElementById('switch-network-button').addEventListener('click', async () => {
        if (window.ethereum && window.ethereum.selectedAddress) {
          try {
            const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
            let newChainId;

            // Simple network rotation
            if (currentChainId === '0x1')
              newChainId = '0x5'; // Mainnet -> Goerli
            else if (currentChainId === '0x5')
              newChainId = '0x89'; // Goerli -> Polygon
            else newChainId = '0x1'; // Anything else -> Mainnet

            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: newChainId }],
            });

            // UI will be updated by our persistence layer
          } catch (err) {
            console.error('Error switching network:', err);
          }
        }
      });

      // Disconnect button - clears localStorage too
      document.getElementById('disconnect-button').addEventListener('click', () => {
        if (window.ethereum) {
          window.ethereum.selectedAddress = null;

          // Clear localStorage
          localStorage.removeItem('wallet_state');

          // Update UI
          document.getElementById('wallet-info').style.display = 'none';
        }
      });

      // Navigation links - simulate page navigation within SPA
      document.getElementById('nav-link-1').addEventListener('click', e => {
        e.preventDefault();
        document.title = 'Page 1';
        document.querySelector('h1').textContent = 'Wallet Persistence - Page 1';
        history.pushState({}, 'Page 1', '#page1');
      });

      document.getElementById('nav-link-2').addEventListener('click', e => {
        e.preventDefault();
        document.title = 'Page 2';
        document.querySelector('h1').textContent = 'Wallet Persistence - Page 2';
        history.pushState({}, 'Page 2', '#page2');
      });
    });

    // Setup wallet with persistence layer
    await setupPersistableWallet(page);
  });

  test.afterAll(async () => {
    // Close the context
    await context.close();
  });

  test('should persist wallet connection across page refreshes', async () => {
    // Connect wallet
    await page.locator('#connect-button').click();

    // Verify wallet is connected
    await expect(page.locator('#wallet-info')).toBeVisible();
    const address = await page.locator('.wallet-address').textContent();
    expect(address).toBeTruthy();

    // Save current wallet state for verification
    walletState = await retrieveWalletState(page);
    expect(walletState).toBeTruthy();
    expect(walletState.selectedAddress).toBe(address);

    // Refresh the page
    await page.reload();

    // Wait for page to load and wallet to auto-connect
    await page.waitForLoadState('networkidle');

    // Verify wallet connection persisted
    await expect(page.locator('#wallet-info')).toBeVisible();

    // Verify address is the same
    const addressAfterRefresh = await page.locator('.wallet-address').textContent();
    expect(addressAfterRefresh).toBe(address);
  });

  test('should persist wallet connection state across navigation', async () => {
    // Connect wallet
    await page.locator('#connect-button').click();

    // Verify wallet is connected
    await expect(page.locator('#wallet-info')).toBeVisible();
    const initialAddress = await page.locator('.wallet-address').textContent();

    // Navigate to another page
    await page.locator('#nav-link-1').click();

    // Verify page changed
    await expect(page.locator('h1')).toContainText('Page 1');

    // Verify wallet connection persisted
    await expect(page.locator('#wallet-info')).toBeVisible();
    const addressAfterNav = await page.locator('.wallet-address').textContent();
    expect(addressAfterNav).toBe(initialAddress);

    // Navigate to another page
    await page.locator('#nav-link-2').click();

    // Verify page changed
    await expect(page.locator('h1')).toContainText('Page 2');

    // Verify wallet connection still persisted
    await expect(page.locator('#wallet-info')).toBeVisible();
    const addressAfterSecondNav = await page.locator('.wallet-address').textContent();
    expect(addressAfterSecondNav).toBe(initialAddress);
  });

  test('should persist network switching across page refreshes', async () => {
    // Connect wallet
    await page.locator('#connect-button').click();

    // Verify wallet is connected and on default network (Ethereum Mainnet)
    await expect(page.locator('#network-name')).toContainText('Ethereum');

    // Switch network to Goerli
    await page.locator('#switch-network-button').click();

    // Verify network switched
    await expect(page.locator('#network-name')).toContainText('Goerli');

    // Refresh the page
    await page.reload();

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Verify network state persisted
    await expect(page.locator('#network-name')).toContainText('Goerli');

    // Switch network to Polygon
    await page.locator('#switch-network-button').click();

    // Verify network switched
    await expect(page.locator('#network-name')).toContainText('Polygon');

    // Reload one more time
    await page.reload();

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Verify network state persisted
    await expect(page.locator('#network-name')).toContainText('Polygon');
  });

  test('should clear wallet state when disconnected', async () => {
    // Connect wallet
    await page.locator('#connect-button').click();

    // Verify wallet is connected
    await expect(page.locator('#wallet-info')).toBeVisible();

    // Disconnect wallet
    await page.locator('#disconnect-button').click();

    // Verify wallet is disconnected
    await expect(page.locator('#wallet-info')).not.toBeVisible();

    // Reload the page
    await page.reload();

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Verify wallet remains disconnected after reload
    await expect(page.locator('#wallet-info')).not.toBeVisible();
  });

  test('should be able to save and restore different wallet states', async () => {
    // Connect wallet
    await page.locator('#connect-button').click();

    // Verify wallet is connected
    await expect(page.locator('#wallet-info')).toBeVisible();

    // Save current state (Ethereum Mainnet)
    const mainnetState = await saveWalletState(page);

    // Switch to Goerli
    await page.locator('#switch-network-button').click();

    // Verify network switched
    await expect(page.locator('#network-name')).toContainText('Goerli');

    // Save Goerli state
    const goerliState = await saveWalletState(page);

    // Disconnect wallet
    await page.locator('#disconnect-button').click();

    // Verify disconnected
    await expect(page.locator('#wallet-info')).not.toBeVisible();

    // Restore Mainnet state
    await restoreWalletState(page, mainnetState);
    await persistWalletState(page, mainnetState);

    // Verify we're back on Mainnet
    await expect(page.locator('#wallet-info')).toBeVisible();
    await expect(page.locator('#network-name')).toContainText('Ethereum');

    // Refresh page
    await page.reload();

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Verify state persisted through refresh
    await expect(page.locator('#wallet-info')).toBeVisible();
    await expect(page.locator('#network-name')).toContainText('Ethereum');

    // Restore Goerli state
    await restoreWalletState(page, goerliState);
    await persistWalletState(page, goerliState);

    // Verify we're on Goerli now
    await expect(page.locator('#network-name')).toContainText('Goerli');

    // Refresh again
    await page.reload();

    // Verify Goerli state persisted
    await expect(page.locator('#network-name')).toContainText('Goerli');
  });
});
