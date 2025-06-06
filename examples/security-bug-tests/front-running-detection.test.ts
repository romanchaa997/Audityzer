// @ts-nocheck
import { test, expect, Page } from '@playwright/test';
import { connectWallet, getWalletState } from '../../tests/utils/walletMock';

/**
 * Security bug: Front-running Vulnerability Detection
 *
 * Vulnerability explanation:
 * Front-running occurs when a malicious actor observes pending transactions in the mempool
 * and places their own transaction with a higher gas price to be executed before the original
 * transaction. This can be particularly harmful in DEX trades, NFT mints, and other price-sensitive
 * transactions.
 *
 * This test checks for:
 * - Lack of slippage protection
 * - Absence of deadlines for transactions
 * - Transactions exposing high-value opportunities in public mempool
 */

// Create a mock DEX dApp page for testing
async function createMockDEXPage(page: Page) {
  await page.setContent(`
    <html>
      <body>
        <h1>Test DEX</h1>
        <button id="connect-wallet">Connect Wallet</button>
        <div class="trade-container">
          <div class="input-container">
            <input type="number" id="amount-input" placeholder="Amount" value="1000" />
            <select id="token-from">
              <option value="ETH">ETH</option>
              <option value="DAI">DAI</option>
              <option value="USDC">USDC</option>
            </select>
          </div>
          <div class="input-container">
            <input type="number" id="amount-output" placeholder="Output (estimated)" disabled />
            <select id="token-to">
              <option value="DAI">DAI</option>
              <option value="ETH">ETH</option>
              <option value="USDC">USDC</option>
            </select>
          </div>
          <div class="settings-container">
            <label>
              <input type="checkbox" id="slippage-protection" /> Enable slippage protection
            </label>
            <input type="number" id="slippage-value" value="0.5" disabled placeholder="Slippage %" />
            <label>
              <input type="checkbox" id="deadline-protection" /> Add deadline
            </label>
            <select id="deadline-value" disabled>
              <option value="30">30 minutes</option>
              <option value="20">20 minutes</option>
              <option value="10">10 minutes</option>
              <option value="5">5 minutes</option>
            </select>
          </div>
          <button id="swap-button">Swap</button>
          <div id="result"></div>
        </div>

        <script>
          // Mock DEX implementation
          document.getElementById('connect-wallet').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                document.getElementById('result').textContent = 'Connected: ' + accounts[0];
              } catch (error) {
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            } else {
              document.getElementById('result').textContent = 'No wallet detected';
            }
          });

          // Toggle slippage protection
          document.getElementById('slippage-protection').addEventListener('change', function() {
            document.getElementById('slippage-value').disabled = !this.checked;
          });

          // Toggle deadline protection
          document.getElementById('deadline-protection').addEventListener('change', function() {
            document.getElementById('deadline-value').disabled = !this.checked;
          });

          // Mock swap transaction
          document.getElementById('swap-button').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length === 0) {
                  document.getElementById('result').textContent = 'Please connect your wallet first';
                  return;
                }

                const fromToken = document.getElementById('token-from').value;
                const toToken = document.getElementById('token-to').value;
                const amount = document.getElementById('amount-input').value;
                
                // Check if slippage protection is enabled
                const slippageEnabled = document.getElementById('slippage-protection').checked;
                const slippageValue = slippageEnabled ? document.getElementById('slippage-value').value : 0;
                
                // Check if deadline is enabled
                const deadlineEnabled = document.getElementById('deadline-protection').checked;
                const deadlineMinutes = deadlineEnabled ? document.getElementById('deadline-value').value : 0;
                
                // Create transaction data
                const txData = {
                  fromToken,
                  toToken,
                  amount,
                  slippage: slippageEnabled ? slippageValue : null,
                  deadline: deadlineEnabled ? deadlineMinutes : null
                };
                
                // VULNERABLE: No slippage or deadline protection by default
                console.log('SWAP_DATA:', JSON.stringify(txData));
                
                // Mock transaction call
                const txHash = await window.ethereum.request({
                  method: 'eth_sendTransaction',
                  params: [{
                    from: accounts[0],
                    to: '0xDEXContractAddress',
                    value: '0x0',
                    data: '0x' + Buffer.from(JSON.stringify(txData)).toString('hex')
                  }]
                });
                
                document.getElementById('result').textContent = 'Transaction sent: ' + txHash;
              } catch (error) {
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            }
          });
        </script>
      </body>
    </html>
  `);
}

test.describe('Front-running Vulnerability Detection', () => {
  test('detects lack of slippage protection', async ({ page }) => {
    // Set up a mock DEX page
    await createMockDEXPage(page);

    // Connect wallet with mock
    await connectWallet(page, {
      provider: 'metamask',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      chainId: '0x1', // Ethereum mainnet
    });

    // Monitor ethereum transactions
    const transactions = [];
    await page.evaluate(() => {
      if (typeof window.ethereum !== 'undefined') {
        const originalRequest = window.ethereum.request.bind(window.ethereum);
        window.ethereum.request = async function(args) {
          if (args.method === 'eth_sendTransaction') {
            console.log(`TX_DATA: ${JSON.stringify(args)}`);
          }
          return originalRequest(args);
        };
      }
    });

    // Capture console logs to analyze transaction data
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('SWAP_DATA:') || text.includes('TX_DATA:')) {
        try {
          // Extract the JSON data
          const dataStart = text.indexOf('{');
          if (dataStart >= 0) {
            const jsonStr = text.substring(dataStart);
            const txData = JSON.parse(jsonStr);
            transactions.push(txData);
          }
        } catch (e) {
          // Failed to parse, ignore
        }
      }
    });

    // Execute a swap without slippage protection or deadline
    await page.click('#swap-button');
    await page.waitForTimeout(500);

    // Check for vulnerabilities in the transaction data
    const vulnerabilitiesFound = [];

    for (const tx of transactions) {
      if (tx.SWAP_DATA) {
        const swapData = tx.SWAP_DATA;
        if (swapData.slippage === null) {
          vulnerabilitiesFound.push('No slippage protection');
        }
        if (swapData.deadline === null) {
          vulnerabilitiesFound.push('No transaction deadline');
        }
      }
    }

    // Log findings
    console.log('Vulnerabilities found:', vulnerabilitiesFound);
    
    // Assert that we detected at least one vulnerability
    expect(vulnerabilitiesFound.length).toBeGreaterThan(0);
  });

  test('validates secure DEX transaction parameters', async ({ page }) => {
    // Set up a mock DEX page
    await createMockDEXPage(page);

    // Connect wallet
    await connectWallet(page, {
      provider: 'metamask',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      chainId: '0x1',
    });

    // Enable security protections
    await page.click('#slippage-protection');
    await page.click('#deadline-protection');
    
    // Capture transaction data
    const secureTransactions = [];
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('SWAP_DATA:')) {
        try {
          const dataStart = text.indexOf('{');
          if (dataStart >= 0) {
            const jsonStr = text.substring(dataStart);
            const txData = JSON.parse(jsonStr);
            secureTransactions.push(txData);
          }
        } catch (e) {
          // Failed to parse, ignore
        }
      }
    });

    // Execute a secure swap with protections enabled
    await page.click('#swap-button');
    await page.waitForTimeout(500);

    // Verify security measures in the transaction data
    let isSecure = true;
    const securityMeasuresFound = [];

    for (const data of secureTransactions) {
      if (data.slippage !== null && data.slippage > 0) {
        securityMeasuresFound.push('Slippage protection');
      } else {
        isSecure = false;
      }
      
      if (data.deadline !== null && data.deadline > 0) {
        securityMeasuresFound.push('Transaction deadline');
      } else {
        isSecure = false;
      }
    }

    // Log findings
    console.log('Security measures found:', securityMeasuresFound);
    
    // Assert that the transaction has proper protections
    expect(isSecure).toBe(true);
    expect(securityMeasuresFound.length).toBeGreaterThan(1);
  });
}); 