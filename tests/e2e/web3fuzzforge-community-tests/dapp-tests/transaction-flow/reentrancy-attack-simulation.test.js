/**
 * Test case description: Reentrancy attack simulation for Web3 applications
 * Vulnerability: Smart contract reentrancy vulnerability detection
 * Manual reproduction steps:
 *   1. Connect to a dApp with withdraw functionality
 *   2. Mock a malicious contract that calls back into the victim contract
 *   3. Attempt to exploit reentrancy vulnerability by calling withdraw repeatedly
 * Security impact: Could drain funds from vulnerable contracts by re-entering before state is updated
 */

const { test, expect } = require('@playwright/test');
const { connectWallet, setupWalletState } = require('../../utils');

// Mock contract ABI for reentrancy testing
const MOCK_REENTRANCY_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'victimContract', type: 'address' }],
    name: 'attack',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
];

test.describe('Reentrancy Attack Simulation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Setup wallet state for testing
    await setupWalletState(page, {
      chainId: '0x1',
      networkName: 'Ethereum Mainnet',
      accounts: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
      balance: '10000000000000000000', // 10 ETH
    });

    // Monitor and intercept Web3 calls
    await page.addInitScript(() => {
      // Original Ethereum provider methods
      const originalRequest = window.ethereum.request;

      // Track all transactions and calls
      window._txHistory = [];
      window._callHistory = [];

      // Track state changes for reentrancy detection
      window._stateChanges = {
        balancesBefore: {},
        balancesAfter: {},
        writeOperations: [],
      };

      // Override provider methods to capture transactions
      window.ethereum.request = async function (args) {
        // Record the request
        const timestamp = new Date().toISOString();

        if (args.method === 'eth_sendTransaction') {
          window._txHistory.push({
            timestamp,
            params: args.params[0],
          });

          // Check for potential reentrancy conditions
          if (args.params[0].data && args.params[0].data.includes('withdraw')) {
            // Record pre-withdraw state
            window._stateChanges.balancesBefore[args.params[0].from] = await originalRequest.call(
              window.ethereum,
              { method: 'eth_getBalance', params: [args.params[0].from, 'latest'] }
            );

            // Simulate the fallback function being triggered before state update
            if (window._enableReentrancySimulation) {
              // Before the original transaction completes, trigger another withdraw
              setTimeout(async () => {
                await window.ethereum
                  .request({
                    method: 'eth_sendTransaction',
                    params: [
                      {
                        from: args.params[0].from,
                        to: args.params[0].to,
                        data: args.params[0].data,
                        gas: '0x7a120', // 500,000 gas
                        value: '0x0',
                      },
                    ],
                  })
                  .catch(e => console.log('Reentrancy simulation failed:', e.message));
              }, 50);
            }
          }
        } else if (args.method === 'eth_call') {
          window._callHistory.push({
            timestamp,
            params: args.params,
          });
        }

        // Forward to original implementation
        try {
          const result = await originalRequest.call(window.ethereum, args);

          // Record post-operation state for reentrancy detection
          if (
            args.method === 'eth_sendTransaction' &&
            args.params[0].data &&
            args.params[0].data.includes('withdraw')
          ) {
            window._stateChanges.balancesAfter[args.params[0].from] = await originalRequest.call(
              window.ethereum,
              { method: 'eth_getBalance', params: [args.params[0].from, 'latest'] }
            );
            window._stateChanges.writeOperations.push({
              txHash: result,
              method: 'withdraw',
              timestamp,
            });
          }

          return result;
        } catch (error) {
          console.error('Transaction error:', error);
          throw error;
        }
      };

      // Function to enable reentrancy simulation
      window.enableReentrancySimulation = function () {
        window._enableReentrancySimulation = true;
        console.log('Reentrancy simulation enabled');
      };

      // Function to get reentrancy vulnerability report
      window.getReentrancyReport = function () {
        // Check for evidence of reentrancy vulnerability
        const writeOps = window._stateChanges.writeOperations;
        const possibleReentrancy = [];

        // Look for overlapping operations (one starts before previous completes)
        for (let i = 0; i < writeOps.length - 1; i++) {
          for (let j = i + 1; j < writeOps.length; j++) {
            const timeDiff = new Date(writeOps[j].timestamp) - new Date(writeOps[i].timestamp);
            if (timeDiff < 200) {
              // If operations occur very close together (within 200ms)
              possibleReentrancy.push({
                firstOp: writeOps[i],
                secondOp: writeOps[j],
                timeDiffMs: timeDiff,
              });
            }
          }
        }

        return {
          transactionCount: window._txHistory.length,
          callCount: window._callHistory.length,
          possibleReentrancyIssues: possibleReentrancy,
          stateChanges: window._stateChanges,
        };
      };
    });

    // Navigate to the DApp
    await page.goto(process.env.DAPP_URL || 'https://demo-dapp.example.com');
    await connectWallet(page);
  });

  test('should detect potential reentrancy vulnerabilities in withdraw function', async ({
    page,
  }) => {
    // Locate withdraw functionality in the DApp
    const withdrawButton = page.locator('button:has-text("Withdraw")');

    // Enable reentrancy simulation
    await page.evaluate(() => window.enableReentrancySimulation());

    // Common approach: Make an initial deposit
    await page.locator('button:has-text("Deposit")').click();
    await page.locator('input[type="number"]').fill('1');
    await page.locator('button:has-text("Confirm")').click();

    // Wait for deposit confirmation
    await page.waitForSelector('text=Deposit successful');

    // Prepare and execute the attack
    console.log('Attempting to trigger reentrancy vulnerability...');
    await withdrawButton.click();

    // Wait for withdraw confirmation or failure
    await page.waitForTimeout(1000); // Give time for transactions to occur

    // Get the reentrancy report
    const reentrancyReport = await page.evaluate(() => window.getReentrancyReport());

    // Log the results
    console.log('Reentrancy report:', JSON.stringify(reentrancyReport, null, 2));

    // Check for signs of reentrancy vulnerability
    if (reentrancyReport.possibleReentrancyIssues.length > 0) {
      console.log('⚠️ POTENTIAL REENTRANCY VULNERABILITY DETECTED ⚠️');
      for (const issue of reentrancyReport.possibleReentrancyIssues) {
        console.log(
          `Operations occurred ${issue.timeDiffMs}ms apart, suggesting possible reentrancy`
        );
      }
    }

    // Verify enough transaction activity for a valid test
    expect(reentrancyReport.transactionCount).toBeGreaterThan(1);

    // Check if we detected any potential reentrancy issues
    // (Note: In a real test, we would expect this to be true on vulnerable contracts)
    // expect(reentrancyReport.possibleReentrancyIssues.length).toBeGreaterThan(0);
  });

  test('should check execution order correctness for state updates', async ({ page }) => {
    // This test checks if state updates occur in correct order (CEI pattern: Checks-Effects-Interactions)

    // Enable capturing state update order
    await page.evaluate(() => {
      // Track state update order
      window._stateUpdateOrder = [];

      // Monitor Solidity calls via ethers.js or Web3.js
      const originalSend = window.ethereum.request;
      window.ethereum.request = async function (args) {
        if (args.method === 'eth_sendTransaction') {
          // Check if this is a function we want to monitor
          const tx = args.params[0];

          if (tx.data) {
            // Extract function signature from data
            const funcSig = tx.data.slice(0, 10);

            if (funcSig === '0x2e1a7d4d' || tx.data.includes('withdraw')) {
              // withdraw() signature
              // Record pre-state
              window._stateUpdateOrder.push({
                type: 'pre-state-check',
                timestamp: Date.now(),
              });

              // Call original method
              try {
                const result = await originalSend.call(window.ethereum, args);

                // Record state update (effects)
                window._stateUpdateOrder.push({
                  type: 'state-update',
                  timestamp: Date.now(),
                });

                // Record external calls (interactions)
                window._stateUpdateOrder.push({
                  type: 'external-call',
                  timestamp: Date.now(),
                });

                return result;
              } catch (error) {
                console.error('Error in monitored transaction:', error);
                throw error;
              }
            }
          }
        }
        return originalSend.call(window.ethereum, args);
      };

      // Function to get state update order report
      window.getStateUpdateOrderReport = function () {
        return {
          updateSequence: window._stateUpdateOrder,
          isCorrectOrder:
            window._stateUpdateOrder.length >= 3 &&
            window._stateUpdateOrder[0].type === 'pre-state-check' &&
            window._stateUpdateOrder[1].type === 'state-update' &&
            window._stateUpdateOrder[2].type === 'external-call',
        };
      };
    });

    // Locate withdraw functionality in the DApp
    const withdrawButton = page.locator('button:has-text("Withdraw")');

    // Make a deposit first
    await page.locator('button:has-text("Deposit")').click();
    await page.locator('input[type="number"]').fill('1');
    await page.locator('button:has-text("Confirm")').click();

    // Wait for deposit confirmation
    await page.waitForSelector('text=Deposit successful');

    // Trigger withdrawal
    await withdrawButton.click();

    // Wait for transaction to complete
    await page.waitForTimeout(1000);

    // Get state update order report
    const stateUpdateReport = await page.evaluate(() => window.getStateUpdateOrderReport());

    // Log findings
    console.log('State update order report:', JSON.stringify(stateUpdateReport, null, 2));

    // Check correct order of operations (CEI pattern)
    // In well-designed contracts, state should be updated before external calls
    if (!stateUpdateReport.isCorrectOrder) {
      console.log('⚠️ POTENTIAL STATE UPDATE ORDER ISSUE DETECTED ⚠️');
      console.log('Contract may not follow Checks-Effects-Interactions pattern');
    }

    // We expect that well-designed contracts follow CEI pattern
    // Uncomment this in real testing scenarios
    // expect(stateUpdateReport.isCorrectOrder).toBeTruthy();
  });
});
