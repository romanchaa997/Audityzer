// @ts-nocheck
import { test, expect, Page } from '@playwright/test';
import { connectWallet, getWalletState } from '../../tests/utils/walletMock';

/**
 * Security bug: Oracle Manipulation Vulnerability Detection
 *
 * Vulnerability explanation:
 * Oracle manipulation vulnerabilities occur when smart contracts rely on manipulable price feeds
 * or oracles without proper validation or aggregation mechanisms. Attackers can manipulate these
 * price feeds to extract value from protocols, especially in lending, liquidation, or trading scenarios.
 *
 * This test checks for:
 * - Single-source oracle usage without validation
 * - Lack of price deviation checks
 * - Missing time-weighted average price (TWAP) mechanisms
 * - Inadequate staleness checks
 */

// Create a mock DeFi page for testing
async function createMockDeFiPage(page: Page) {
  await page.setContent(`
    <html>
      <body>
        <h1>Test DeFi Protocol</h1>
        <button id="connect-wallet">Connect Wallet</button>
        <div class="defi-container">
          <div class="asset-pricing">
            <h3>Asset Price Oracle</h3>
            <div class="price-display">
              <div>ETH Price: $<span id="eth-price">1800.00</span></div>
              <div>Last Updated: <span id="last-update-time">Just now</span></div>
            </div>
            <div class="oracle-details">
              <h4>Oracle Configuration</h4>
              <div id="oracle-type">Type: <span class="value">Single Source</span></div>
              <div id="price-feed">Source: <span class="value">Chainlink</span></div>
              <div id="update-frequency">Update Frequency: <span class="value">On-demand</span></div>
              <div id="deviation-check">Deviation Check: <span class="value">None</span></div>
              <div id="staleness-check">Staleness Check: <span class="value">None</span></div>
            </div>
          </div>
          
          <div class="trade-container">
            <h3>Swap ETH/USDC</h3>
            <div class="swap-inputs">
              <input type="number" id="eth-amount" value="1" min="0.1" step="0.1" />
              <span>ETH</span>
              <div class="arrow">→</div>
              <span id="usdc-amount">1800.00</span>
              <span>USDC</span>
            </div>
            <button id="swap-button">Execute Swap</button>
            <div class="settings">
              <label>
                <input type="checkbox" id="use-twap" />
                Use TWAP for pricing
              </label>
              <label>
                <input type="checkbox" id="multi-source-oracle" />
                Use multiple oracle sources
              </label>
              <label>
                <input type="checkbox" id="check-deviation" />
                Check for price deviation
              </label>
              <label>
                <input type="checkbox" id="check-staleness" />
                Check for price staleness
              </label>
            </div>
          </div>
          <pre id="contract-code" style="font-size: 12px; max-height: 300px; overflow: auto;">
contract VulnerableOracle {
    // VULNERABLE: Using a single price source without validation
    address chainlinkPriceFeed;
    uint256 lastUpdateTimestamp;
    
    function getPrice() public returns (uint256) {
        // Get price from single Chainlink oracle
        uint256 price = IChainlinkOracle(chainlinkPriceFeed).getLatestPrice();
        lastUpdateTimestamp = block.timestamp;
        
        // No validation of returned value
        // No staleness check
        // No deviation check
        
        return price;
    }
    
    // A secure implementation would look like:
    function secureGetPrice() public returns (uint256) {
        // Get prices from multiple sources
        uint256 price1 = IChainlinkOracle(chainlinkPriceFeed).getLatestPrice();
        uint256 price2 = IUniswapOracle(uniswapPriceFeed).consultPrice();
        uint256 price3 = ISushiswapOracle(sushiswapPriceFeed).getPrice();
        
        // Check for staleness
        require(
            IChainlinkOracle(chainlinkPriceFeed).updatedAt() > block.timestamp - 1 hours,
            "Price feed too old"
        );
        
        // Get median price to avoid outliers
        uint256 medianPrice = median(price1, price2, price3);
        
        // Check for significant deviation from last price
        require(
            medianPrice < lastPrice * 110 / 100 && 
            medianPrice > lastPrice * 90 / 100,
            "Price deviation too high"
        );
        
        lastUpdateTimestamp = block.timestamp;
        lastPrice = medianPrice;
        
        return medianPrice;
    }
}
          </pre>
          <div id="result"></div>
        </div>

        <script>
          // Mock contract implementation
          let usingTWAP = false;
          let usingMultiSource = false;
          let checkingDeviation = false;
          let checkingStaleness = false;
          let lastPrice = 1800.00;
          let lastUpdateTime = Date.now();
          
          // Update USDC amount based on ETH amount
          document.getElementById('eth-amount').addEventListener('input', () => {
            const ethAmount = parseFloat(document.getElementById('eth-amount').value) || 0;
            document.getElementById('usdc-amount').textContent = (ethAmount * lastPrice).toFixed(2);
          });
          
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

          // Toggle TWAP
          document.getElementById('use-twap').addEventListener('change', function() {
            usingTWAP = this.checked;
            updateOracleDisplay();
          });
          
          // Toggle multi-source oracle
          document.getElementById('multi-source-oracle').addEventListener('change', function() {
            usingMultiSource = this.checked;
            updateOracleDisplay();
          });
          
          // Toggle deviation check
          document.getElementById('check-deviation').addEventListener('change', function() {
            checkingDeviation = this.checked;
            updateOracleDisplay();
          });
          
          // Toggle staleness check
          document.getElementById('check-staleness').addEventListener('change', function() {
            checkingStaleness = this.checked;
            updateOracleDisplay();
          });
          
          // Update oracle display based on selected options
          function updateOracleDisplay() {
            document.querySelector('#oracle-type .value').textContent = 
              usingMultiSource ? 'Multiple Sources (Chainlink, Uniswap, SushiSwap)' : 'Single Source';
            
            document.querySelector('#price-feed .value').textContent = 
              usingTWAP ? 'TWAP (Time-Weighted Average Price)' : 'Spot Price';
              
            document.querySelector('#deviation-check .value').textContent = 
              checkingDeviation ? '±10% from last price' : 'None';
              
            document.querySelector('#staleness-check .value').textContent = 
              checkingStaleness ? 'Max 1 hour old' : 'None';
          }
          
          // Perform swap with or without oracle manipulation checks
          document.getElementById('swap-button').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length === 0) {
                  document.getElementById('result').textContent = 'Please connect your wallet first';
                  return;
                }
                
                const ethAmount = parseFloat(document.getElementById('eth-amount').value) || 0;
                if (ethAmount <= 0) {
                  document.getElementById('result').textContent = 'Please enter a valid amount';
                  return;
                }
                
                // Check for vulnerabilities
                if (!usingMultiSource && !usingTWAP && !checkingDeviation && !checkingStaleness) {
                  // Log the vulnerability
                    type: 'oracle_manipulation',
                    details: 'Single-source oracle without validation mechanisms',
                    severity: 'High',
                    issues: {
                      singleSource: !usingMultiSource,
                      noTWAP: !usingTWAP,
                      noDeviationCheck: !checkingDeviation,  
                      noStalenessCheck: !checkingStaleness
                    }
                  });
                }
                
                // Simulate the trade
                const usedPrice = lastPrice;
                
                // For demonstration, simulate a price manipulation if using single source
                let manipulatedPrice = false;
                if (!usingMultiSource && Math.random() > 0.7) {
                  // Simulate flash loan attack causing 30% price spike
                  lastPrice = lastPrice * 1.3;
                  manipulatedPrice = true;
                  
                    type: 'price_manipulation',
                    details: 'Price manipulated by 30% through oracle',
                    beforePrice: usedPrice,
                    afterPrice: lastPrice
                  });
                }
                
                // Mock transaction
                const txHash = await window.ethereum.request({
                  method: 'eth_sendTransaction',
                  params: [{
                    from: accounts[0],
                    to: '0xDEXContractAddress',
                    value: '0x' + (ethAmount * 1e18).toString(16),
                    data: '0x' // Swap function signature + params
                  }]
                });
                
                // Update display
                document.getElementById('eth-price').textContent = lastPrice.toFixed(2);
                document.getElementById('last-update-time').textContent = 'Just now';
                document.getElementById('usdc-amount').textContent = (ethAmount * lastPrice).toFixed(2);
                
                const result = manipulatedPrice ? 
                  \`Trade executed with manipulated price! TX: \${txHash}\` : 
                  \`Trade executed successfully! TX: \${txHash}\`;
                
                document.getElementById('result').textContent = result;
                
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

test.describe('Oracle Manipulation Vulnerability Detection', () => {
  test('detects single-source oracle without validation', async ({ page }) => {
    // Set up a mock DeFi page
    await createMockDeFiPage(page);

    // Connect wallet with mock
    await connectWallet(page, {
      provider: 'metamask',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      chainId: '0x1', // Ethereum mainnet
    });

    // Capture console logs to detect vulnerabilities
    const vulnerabilityLogs = [];
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('VULNERABILITY_DETECTED:')) {
        try {
          const dataStart = text.indexOf('{');
          if (dataStart >= 0) {
            const jsonStr = text.substring(dataStart);
            const vulnData = JSON.parse(jsonStr);
            vulnerabilityLogs.push(vulnData);
          }
        } catch (e) {
          console.error('Failed to parse vulnerability data:', e);
        }
      }
    });

    // Execute swap without any oracle protection measures
    await page.click('#swap-button');
    await page.waitForTimeout(500);

    // Check if oracle manipulation vulnerability was detected
    expect(vulnerabilityLogs.length).toBeGreaterThan(0);
    
    // Verify it's an oracle manipulation vulnerability
    const oracleVuln = vulnerabilityLogs.find(v => v.type === 'oracle_manipulation');
    expect(oracleVuln).toBeDefined();
    expect(oracleVuln.severity).toBe('High');
    
    // Check specific issues detected
    expect(oracleVuln.issues.singleSource).toBe(true);
    expect(oracleVuln.issues.noTWAP).toBe(true);
    expect(oracleVuln.issues.noDeviationCheck).toBe(true);
    expect(oracleVuln.issues.noStalenessCheck).toBe(true);
  });

  test('analyzes contract code for oracle best practices', async ({ page }) => {
    // Set up mock DeFi page
    await createMockDeFiPage(page);

    // Analyze contract code
    const contractCode = await page.textContent('#contract-code');
    
    // Check if contract contains vulnerable patterns
    const hasSingleSource = contractCode.includes('// VULNERABLE: Using a single price source without validation');
    expect(hasSingleSource).toBe(true);
    
    // Check if contract contains multiple price sources in the secure implementation
    const hasMultiSource = contractCode.includes('// Get prices from multiple sources');
    expect(hasMultiSource).toBe(true);
    
    // Check if contract has staleness check in secure implementation
    const hasStalenessCheck = contractCode.includes('// Check for staleness');
    expect(hasStalenessCheck).toBe(true);
    
    // Check if contract has deviation check in secure implementation
    const hasDeviationCheck = contractCode.includes('// Check for significant deviation');
    expect(hasDeviationCheck).toBe(true);
  });

  test('validates secure oracle implementation prevents manipulation', async ({ page }) => {
    // Set up mock DeFi page
    await createMockDeFiPage(page);

    // Connect wallet
    await connectWallet(page, {
      provider: 'metamask',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      chainId: '0x1',
    });
    
    // Monitor for simulated attacks
    const attackLogs = [];
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('SIMULATED_ATTACK:')) {
        try {
          const dataStart = text.indexOf('{');
          if (dataStart >= 0) {
            const jsonStr = text.substring(dataStart);
            const attackData = JSON.parse(jsonStr);
            attackLogs.push(attackData);
          }
        } catch (e) {
          console.error('Failed to parse attack data:', e);
        }
      }
    });
    
    // Enable secure oracle protections
    await page.click('#multi-source-oracle');
    await page.click('#use-twap');
    await page.click('#check-deviation');
    await page.click('#check-staleness');
    
    // Execute swap with secure oracle configuration
    await page.click('#swap-button');
    await page.waitForTimeout(500);
    
    // Verify oracle display shows secure settings
    const oracleType = await page.textContent('#oracle-type .value');
    expect(oracleType).toContain('Multiple Sources');
    
    const deviationCheck = await page.textContent('#deviation-check .value');
    expect(deviationCheck).toContain('±10%');
    
    const stalenessCheck = await page.textContent('#staleness-check .value');
    expect(stalenessCheck).toContain('1 hour');
    
    // Verify the oracle manipulation was not reported since we enabled protections
    expect(attackLogs.length).toBe(0);
  });
}); 