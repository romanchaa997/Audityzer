import { test, expect, Page } from '@playwright/test';
import { connectWallet, switchNetwork, getWalletState } from '../../tests/utils/walletMock';

/**
 * Security bug: Network Switch Race Condition
 *
 * Vulnerability explanation:
 * Race conditions can occur when users switch networks during transaction preparation.
 * This happens when:
 * 1. A transaction is initiated on network A
 * 2. User or dApp switches to network B before transaction is completed
 * 3. Transaction might fail silently, be sent to wrong network, or use incorrect gas settings
 *
 * This test checks for:
 * - Proper handling of network switches during transaction flow
 * - Detection of silent failures
 * - Event ordering issues that may cause transaction to be sent to wrong network
 */

// Create a mock dApp page for testing
async function createMockDappPage(page: Page) {
  await page.setContent(`
    <html>
      <body>
        <h1>Test dApp</h1>
        <button id="connect-wallet">Connect Wallet</button>
        <div id="network-info">Current Network: <span id="current-network">Not connected</span></div>
        <div style="margin-top: 20px;">
          <button id="switch-to-mainnet">Switch to Mainnet</button>
          <button id="switch-to-polygon">Switch to Polygon</button>
          <button id="switch-to-arbitrum">Switch to Arbitrum</button>
        </div>
        <div style="margin-top: 20px;">
          <input type="text" id="recipient" placeholder="Recipient address" value="0x1234567890123456789012345678901234567890">
          <input type="number" id="amount" placeholder="Amount in ETH" value="0.1">
          <button id="send-transaction">Send Transaction</button>
        </div>
        <div style="margin-top: 20px;">
          <button id="race-test">Test Race Condition</button>
        </div>
        <div id="result" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc;"></div>
        <div id="logs" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc; height: 100px; overflow-y: scroll;"></div>
        
        <script>
          // Helper to log messages
          function log(message) {
            const logs = document.getElementById('logs');
            logs.innerHTML += \`<div>\${message}</div>\`;
            logs.scrollTop = logs.scrollHeight;
          }
          
          // Update network info
          async function updateNetworkInfo() {
            if (window.ethereum) {
              try {
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                const networkNames = {
                  '0x1': 'Ethereum Mainnet',
                  '0x89': 'Polygon Mainnet',
                  '0xa4b1': 'Arbitrum One',
                  '0xa': 'Optimism',
                  '0x5': 'Goerli Testnet'
                };
                document.getElementById('current-network').textContent = networkNames[chainId] || \`Unknown (\${chainId})\`;
              } catch (error) {
                document.getElementById('current-network').textContent = 'Error fetching network';
              }
            }
          }
          
          // Connect wallet
          document.getElementById('connect-wallet').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                document.getElementById('result').textContent = 'Connected: ' + accounts[0];
                updateNetworkInfo();
              } catch (error) {
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            } else {
              document.getElementById('result').textContent = 'No wallet detected';
            }
          });
          
          // Network switching
          document.getElementById('switch-to-mainnet').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0x1' }]
                });
                log('Switched to Ethereum Mainnet');
                updateNetworkInfo();
              } catch (error) {
                log('Error switching network: ' + error.message);
              }
            }
          });
          
          document.getElementById('switch-to-polygon').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0x89' }]
                });
                log('Switched to Polygon');
                updateNetworkInfo();
              } catch (error) {
                log('Error switching network: ' + error.message);
              }
            }
          });
          
          document.getElementById('switch-to-arbitrum').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0xa4b1' }]
                });
                log('Switched to Arbitrum');
                updateNetworkInfo();
              } catch (error) {
                log('Error switching network: ' + error.message);
              }
            }
          });
          
          // Send transaction
          document.getElementById('send-transaction').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length === 0) {
                  throw new Error('No connected accounts');
                }
                
                const from = accounts[0];
                const to = document.getElementById('recipient').value;
                const value = '0x' + (BigInt(document.getElementById('amount').value * 10**18)).toString(16);
                
                log('Preparing transaction...');
                // Simulate slow transaction preparation (2 seconds)
                window.transactionInProgress = true;
                
                // VULNERABLE IMPLEMENTATION: Get the chainId just once at the beginning
                // If network changes during this time, we'll have inconsistency
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                log(\`Preparing transaction on network \${chainId}...\`);
                
                // Simulating transaction preparation delay
                setTimeout(async () => {
                  try {
                    // Note: By this time, the network might have changed!
                    log('Transaction ready, sending...');
                    
                    // VULNERABLE: No check if network changed during preparation
                    const txHash = await window.ethereum.request({
                      method: 'eth_sendTransaction',
                      params: [{
                        from,
                        to,
                        value,
                        gas: '0x5208', // 21000 gas
                      }]
                    });
                    
                    log(\`Transaction sent! Hash: \${txHash}\`);
                    document.getElementById('result').textContent = \`Transaction sent! Hash: \${txHash}\`;
                    window.transactionInProgress = false;
                  } catch (error) {
                    log('Error sending transaction: ' + error.message);
                    document.getElementById('result').textContent = 'Error: ' + error.message;
                    window.transactionInProgress = false;
                  }
                }, 2000);
              } catch (error) {
                log('Error: ' + error.message);
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            }
          });
          
          // Test race condition button
          document.getElementById('race-test').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                log('Starting race condition test');
                
                // Start transaction
                document.getElementById('send-transaction').click();
                
                // Wait a bit then switch networks in the middle of transaction prep
                setTimeout(() => {
                  log('Switching network during transaction preparation...');
                  document.getElementById('switch-to-polygon').click();
                }, 1000);
              } catch (error) {
                log('Error in race test: ' + error.message);
              }
            }
          });
          
          // Listen for network changes
          if (window.ethereum) {
            window.ethereum.on('chainChanged', (chainId) => {
              log(\`Network changed to: \${chainId}\`);
              updateNetworkInfo();
              
              // SECURITY ISSUE: Transaction might still be in progress when network changes
              if (window.transactionInProgress) {
                log('WARNING: Network changed while transaction was in progress!');
                document.getElementById('result').textContent = 'WARNING: Network changed during transaction preparation!';
              }
            });
          }
          
          // Initialize if wallet is already connected
          if (window.ethereum) {
            window.ethereum.request({ method: 'eth_accounts' })
              .then(accounts => {
                if (accounts.length > 0) {
                  document.getElementById('result').textContent = 'Already connected: ' + accounts[0];
                  updateNetworkInfo();
                }
              })
              .catch(console.error);
          }
        </script>
      </body>
    </html>
  `);
}

test.describe('Network Switch Race Condition Detection', () => {
  test('simulate network switch during transaction preparation', async ({ page }) => {
    // Set up a mock dApp page
    await createMockDappPage(page);

    // Connect wallet with mock
    await connectWallet(page, {
      provider: 'metamask',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      chainId: '0x1', // Ethereum mainnet
    });

    // Wait for page to initialize
    await page.waitForTimeout(500);

    // Capture transaction and chain change events
    let transactionRequested = false;
    let networkSwitched = false;
    const transactionCompleted = false;
    let initialChainId: string | null = null;
    let finalChainId: string | null = null;

    // Setup monitoring
    await page.evaluate(() => {
      window.eventLog = [];

      // Add timestamp to events
      function logEvent(type, data) {
        window.eventLog.push({
          timestamp: Date.now(),
          type,
          data,
        });
      }

      // Monitor ethereum requests
      const originalRequest = window.ethereum.request;
      window.ethereum.request = async function (args) {
        logEvent('request', { method: args.method, params: args.params });

        // For network switch and transaction events
        if (args.method === 'wallet_switchEthereumChain') {
          logEvent('networkSwitchAttempt', args.params[0]);
        } else if (args.method === 'eth_sendTransaction') {
          logEvent('transactionAttempt', args.params[0]);
        }

        // Call original method
        try {
          const result = await originalRequest.call(window.ethereum, args);
          logEvent('response', { method: args.method, result });
          return result;
        } catch (error) {
          logEvent('error', { method: args.method, error: error.message });
          throw error;
        }
      };

      // Monitor chain changes
      const originalChainChanged = window.ethereum._events.chainChanged || [];
      window.ethereum._events.chainChanged = [
        ...originalChainChanged,
        chainId => {
          logEvent('chainChanged', { chainId });
        },
      ];
    });

    // Get initial chain ID
    initialChainId = (await getWalletState(page)).chainId;

    // Trigger the race condition test
    await page.click('#race-test');

    // Wait for events to complete
    await page.waitForTimeout(3000);

    // Get final chain ID
    finalChainId = (await getWalletState(page)).chainId;

    // Retrieve events log
    const eventLog = await page.evaluate(() => window.eventLog);

    // Analyze the events to detect race condition
    if (eventLog) {
      const txAttempts = eventLog.filter(e => e.type === 'transactionAttempt');
      const networkSwitches = eventLog.filter(e => e.type === 'networkSwitchAttempt');
      const chainChanges = eventLog.filter(e => e.type === 'chainChanged');

      transactionRequested = txAttempts.length > 0;
      networkSwitched = chainChanges.length > 0;

      // Check if transaction was requested and network was changed
      if (transactionRequested && networkSwitched) {
        // Get timestamps
        const txTime = txAttempts[0].timestamp;
        const switchTime = chainChanges[0].timestamp;

        // Check if network was changed during transaction preparation
        if (Math.abs(switchTime - txTime) < 3000) {

          // Detect which came first
          if (switchTime < txTime) {
          } else {
          }
        }
      }
    }

    // Get page content to check for warnings
    const resultText = await page.textContent('#result');
    const logsText = await page.textContent('#logs');

    // Assert that the race condition warning appears in the UI
    expect(logsText).toContain('WARNING: Network changed while transaction was in progress');

    // Verify that initial and final chain IDs are different, confirming the network switch
    expect(initialChainId).not.toEqual(finalChainId);

    // Verify the conditions for a race condition were met
    expect(transactionRequested).toBeTruthy();
    expect(networkSwitched).toBeTruthy();
  });

  test('demonstrates proper handling of network switches during transactions', async ({ page }) => {
    // This test shows how to properly implement transaction sending to avoid race conditions

    // Set up a mock dApp page with PROPER handling
    await page.setContent(`
      <html>
        <body>
          <h1>Secure dApp Implementation</h1>
          <button id="connect-wallet">Connect Wallet</button>
          <div id="network-info">Current Network: <span id="current-network">Not connected</span></div>
          <div style="margin-top: 20px;">
            <button id="switch-network">Switch Network</button>
            <button id="send-transaction">Send Transaction (Safe)</button>
          </div>
          <div id="result" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc;"></div>
          
          <script>
            // Connect wallet
            document.getElementById('connect-wallet').addEventListener('click', async () => {
              if (window.ethereum) {
                try {
                  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                  document.getElementById('result').textContent = 'Connected: ' + accounts[0];
                  updateNetworkInfo();
                } catch (error) {
                  document.getElementById('result').textContent = 'Error: ' + error.message;
                }
              }
            });
            
            // Update network info
            async function updateNetworkInfo() {
              if (window.ethereum) {
                try {
                  const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                  const networkNames = {
                    '0x1': 'Ethereum Mainnet',
                    '0x89': 'Polygon Mainnet',
                    '0xa4b1': 'Arbitrum One'
                  };
                  document.getElementById('current-network').textContent = networkNames[chainId] || \`Unknown (\${chainId})\`;
                } catch (error) {
                  document.getElementById('current-network').textContent = 'Error fetching network';
                }
              }
            }
            
            // Switch network
            document.getElementById('switch-network').addEventListener('click', async () => {
              if (window.ethereum) {
                try {
                  // Toggle between Ethereum and Polygon
                  const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
                  const newChainId = currentChainId === '0x1' ? '0x89' : '0x1';
                  
                  await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: newChainId }]
                  });
                  
                  document.getElementById('result').textContent = \`Switched to \${newChainId === '0x1' ? 'Ethereum' : 'Polygon'}\`;
                  updateNetworkInfo();
                } catch (error) {
                  document.getElementById('result').textContent = 'Error switching: ' + error.message;
                }
              }
            });
            
            // SECURE transaction implementation
            document.getElementById('send-transaction').addEventListener('click', async () => {
              if (window.ethereum) {
                try {
                  const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                  if (accounts.length === 0) {
                    throw new Error('No connected accounts');
                  }
                  
                  // Get initial chain ID and remember it
                  const initialChainId = await window.ethereum.request({ method: 'eth_chainId' });
                  document.getElementById('result').textContent = \`Preparing transaction on \${initialChainId}...\`;
                  
                  // Simulate transaction preparation delay
                  await new Promise(resolve => setTimeout(resolve, 2000));
                  
                  // SECURE: Double-check chain ID right before sending
                  const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
                  
                  // Verify chain hasn't changed during preparation
                  if (initialChainId !== currentChainId) {
                    throw new Error(\`Network changed during transaction preparation! 
                      Started on \${initialChainId}, now on \${currentChainId}. Transaction cancelled for safety.\`);
                  }
                  
                  // Proceed with transaction on verified network
                  const txHash = await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [{
                      from: accounts[0],
                      to: '0x1234567890123456789012345678901234567890',
                      value: '0x38d7ea4c68000', // 0.001 ETH
                      gas: '0x5208' // 21000 gas
                    }]
                  });
                  
                  document.getElementById('result').textContent = \`Transaction sent on \${currentChainId}! Hash: \${txHash}\`;
                } catch (error) {
                  document.getElementById('result').textContent = 'Error: ' + error.message;
                }
              }
            });
            
            // Monitor network changes
            if (window.ethereum) {
              window.ethereum.on('chainChanged', updateNetworkInfo);
              
              // Initialize if wallet already connected
              window.ethereum.request({ method: 'eth_accounts' })
                .then(accounts => {
                  if (accounts.length > 0) {
                    document.getElementById('result').textContent = 'Already connected: ' + accounts[0];
                    updateNetworkInfo();
                  }
                })
                .catch(console.error);
            }
          </script>
        </body>
      </html>
    `);

    // Connect wallet with mock
    await connectWallet(page, {
      provider: 'metamask',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      chainId: '0x1', // Ethereum mainnet
    });

    // Capture events for verification
    const networkChangeDetected = false;
    const transactionCancelled = false;

    page.on('console', msg => {
    });

    // Create a race condition scenario
    // 1. Start the transaction
    await page.click('#send-transaction');
    await page.waitForTimeout(500); // Wait for transaction to start preparing

    // 2. Switch networks in the middle of preparation
    await switchNetwork(page, { chainId: '0x89' }); // Switch to Polygon

    // 3. Wait for transaction to complete or be rejected
    await page.waitForTimeout(2500);

    // 4. Check the result
    const resultText = await page.textContent('#result');

    // The proper implementation should detect the network change and cancel the transaction
    expect(resultText).toContain('Network changed during transaction preparation');
    expect(resultText).toContain('Transaction cancelled for safety');
  });
});
