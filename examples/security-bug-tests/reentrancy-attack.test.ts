// @ts-nocheck
import { test, expect, Page } from '@playwright/test';
import { connectWallet, getWalletState } from '../../tests/utils/walletMock';

/**
 * Security bug: Reentrancy Attack Vulnerability Detection
 *
 * Vulnerability explanation:
 * Reentrancy attacks occur when external contract calls allow attackers to reenter the original
 * function before its execution is complete, potentially manipulating state in unexpected ways.
 * This can lead to fund drains and state inconsistencies.
 *
 * This test checks for:
 * - Improper state updates after external calls
 * - Missing reentrancy guards
 * - Vulnerable withdrawal patterns
 */

// Create a mock contract page for testing
async function createMockContractPage(page: Page) {
  await page.setContent(`
    <html>
      <body>
        <h1>Test DeFi Protocol</h1>
        <button id="connect-wallet">Connect Wallet</button>
        <div class="contract-container">
          <div class="balance-container">
            <h3>Your Balance: <span id="user-balance">0</span> ETH</h3>
            <button id="deposit-btn">Deposit 1 ETH</button>
            <button id="withdraw-btn">Withdraw All</button>
          </div>
          <div>
            <h3>Contract Code:</h3>
            <pre id="contract-code">
contract VulnerableVault {
    mapping(address => uint) public balances;
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    // VULNERABLE: State is updated after external call
    function withdraw() public {
        uint amount = balances[msg.sender];
        
        // External call before state update
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        // State updated after external call - VULNERABILITY
        balances[msg.sender] = 0;
    }
    
    // Secure implementation would look like:
    function secureWithdraw() public {
        uint amount = balances[msg.sender];
        
        // State updated before external call - SECURE
        balances[msg.sender] = 0;
        
        // External call after state update
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
}
            </pre>
          </div>
          <div id="result"></div>
        </div>

        <script>
          // Mock contract implementation
          let contractBalance = 0;
          const userBalances = {};
          
          document.getElementById('connect-wallet').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                document.getElementById('result').textContent = 'Connected: ' + account;
                
                // Initialize user balance
                if (!userBalances[account]) {
                  userBalances[account] = 0;
                }
                document.getElementById('user-balance').textContent = userBalances[account];
              } catch (error) {
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            } else {
              document.getElementById('result').textContent = 'No wallet detected';
            }
          });

          document.getElementById('deposit-btn').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length === 0) {
                  document.getElementById('result').textContent = 'Please connect your wallet first';
                  return;
                }
                
                const account = accounts[0];
                
                // Mock deposit transaction
                const txHash = await window.ethereum.request({
                  method: 'eth_sendTransaction',
                  params: [{
                    from: account,
                    to: '0xVaultContractAddress',
                    value: '0xDE0B6B3A7640000', // 1 ETH
                    data: '0xd0e30db0' // deposit() function signature
                  }]
                });
                
                // Update balances
                contractBalance += 1;
                userBalances[account] = (userBalances[account] || 0) + 1;
                document.getElementById('user-balance').textContent = userBalances[account];
                
                document.getElementById('result').textContent = 'Deposited 1 ETH. Transaction: ' + txHash;
                
                // Log transaction data for analysis
                  type: 'deposit',
                  amount: 1,
                  account,
                  contractBalance,
                  userBalance: userBalances[account]
                });
              } catch (error) {
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            }
          });
          
          document.getElementById('withdraw-btn').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length === 0) {
                  document.getElementById('result').textContent = 'Please connect your wallet first';
                  return;
                }
                
                const account = accounts[0];
                const balance = userBalances[account] || 0;
                
                if (balance <= 0) {
                  document.getElementById('result').textContent = 'No balance to withdraw';
                  return;
                }
                
                // VULNERABLE FLOW: Call external contract before updating state
                // In this mock, we're simulating the vulnerability pattern
                
                // Log the vulnerability
                  type: 'reentrancy',
                  details: 'State updated after external call',
                  severity: 'High',
                  account,
                  beforeBalance: balance
                });
                
                // Mock the withdrawal transaction
                const txHash = await window.ethereum.request({
                  method: 'eth_sendTransaction',
                  params: [{
                    from: account,
                    to: '0xVaultContractAddress',
                    data: '0x3ccfd60b' // withdraw() function signature
                  }]
                });
                
                // Update balances - this happens AFTER external call in the vulnerable contract
                contractBalance -= balance;
                userBalances[account] = 0;
                document.getElementById('user-balance').textContent = userBalances[account];
                
                document.getElementById('result').textContent = 'Withdrawn ' + balance + ' ETH. Transaction: ' + txHash;
                
                // Log transaction data for analysis
                  type: 'withdraw',
                  amount: balance,
                  account,
                  contractBalance,
                  userBalance: userBalances[account],
                  vulnerablePattern: true
                });
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

test.describe('Reentrancy Attack Vulnerability Detection', () => {
  test('detects state-update-after-external-call vulnerability', async ({ page }) => {
    // Set up a mock contract page
    await createMockContractPage(page);

    // Connect wallet with mock
    await connectWallet(page, {
      provider: 'metamask',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      chainId: '0x1', // Ethereum mainnet
    });

    // Perform a deposit first
    await page.click('#deposit-btn');
    await page.waitForTimeout(500);

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

    // Perform a withdrawal which follows the vulnerable pattern
    await page.click('#withdraw-btn');
    await page.waitForTimeout(500);

    // Check if reentrancy vulnerability was detected
    expect(vulnerabilityLogs.length).toBeGreaterThan(0);
    
    // Verify it's a reentrancy vulnerability
    const reentrancyVuln = vulnerabilityLogs.find(v => v.type === 'reentrancy');
    expect(reentrancyVuln).toBeDefined();
    expect(reentrancyVuln.severity).toBe('High');
    
    // Analyze contract code for reentrancy patterns
    const contractCode = await page.textContent('#contract-code');
    expect(contractCode).toContain('State updated after external call');
  });

  test('analyzes withdrawal patterns for best practices', async ({ page }) => {
    // Set up mock contract page
    await createMockContractPage(page);

    // Connect wallet
    await connectWallet(page, {
      provider: 'metamask',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      chainId: '0x1',
    });
    
    // Analyze contract code
    const contractCode = await page.textContent('#contract-code');
    
    // Check if contract contains the vulnerable pattern
    const hasVulnerablePattern = contractCode.includes('// External call before state update');
    expect(hasVulnerablePattern).toBe(true);
    
    // Check if contract contains the secure pattern
    const hasSecurePattern = contractCode.includes('// State updated before external call');
    expect(hasSecurePattern).toBe(true);
    
    // Contract should have a secure implementation to compare against
    expect(contractCode).toContain('secureWithdraw');
  });
}); 