import { test, expect, Page } from '@playwright/test';
import { connectWallet, getWalletState } from '../../tests/utils/walletMock';

/**
 * Security bug: Token Approval Reuse
 *
 * Vulnerability explanation:
 * Token approvals (ERC20/ERC721) can be reused by malicious dApps if:
 * 1. Users approve tokens with unlimited allowances
 * 2. Approvals are not revoked after they're no longer needed
 * 3. Users interact with malicious dApps that can use existing approvals
 *
 * This test checks for:
 * - Unlimited token approvals
 * - Reuse of approvals across different dApps
 * - Lack of approval expiration or scope limiting
 */

// Mock ERC20 token interface
interface MockERC20 {
  name: string;
  symbol: string;
  decimals: number;
  balanceOf: (address: string) => Promise<string>;
  allowance: (owner: string, spender: string) => Promise<string>;
  approve: (spender: string, amount: string) => Promise<string>;
  transfer: (to: string, amount: string) => Promise<boolean>;
  transferFrom: (from: string, to: string, amount: string) => Promise<boolean>;
}

// Create a mock legitimate dApp page
async function createLegitDappPage(page: Page) {
  await page.setContent(`
    <html>
      <body>
        <h1>Legitimate DeFi App</h1>
        <button id="connect-wallet">Connect Wallet</button>
        <div id="wallet-info" style="margin-top: 20px; display: none;">
          <div>Address: <span id="wallet-address">Not connected</span></div>
          <div>USDC Balance: <span id="token-balance">0</span></div>
          <div>Approval Status: <span id="approval-status">Not approved</span></div>
        </div>
        
        <div style="margin-top: 20px; display: none;" id="app-actions">
          <button id="approve-tokens">Approve USDC (Unlimited)</button>
          <button id="approve-limited">Approve USDC (Limited)</button>
          <button id="swap-tokens">Swap 10 USDC for ETH</button>
        </div>
        
        <div id="result" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc;"></div>
        
        <script>
          // Display functions
          function updateUI() {
            if (!window.ethereum || !window.ethereum.selectedAddress) {
              document.getElementById('wallet-info').style.display = 'none';
              document.getElementById('app-actions').style.display = 'none';
              return;
            }
            
            document.getElementById('wallet-info').style.display = 'block';
            document.getElementById('app-actions').style.display = 'block';
            document.getElementById('wallet-address').textContent = window.ethereum.selectedAddress;
          }
          
          function updateTokenInfo() {
            if (!window.ethereum || !window.ethereum.selectedAddress || !window.mockTokenContract) return;
            
            const address = window.ethereum.selectedAddress;
            const appAddress = '0xLegitimateAppAddress';
            
            // Get token balance
            window.mockTokenContract.balanceOf(address)
              .then(balance => {
                document.getElementById('token-balance').textContent = (parseInt(balance) / 1e6).toFixed(2);
              });
            
            // Get approval status
            window.mockTokenContract.allowance(address, appAddress)
              .then(allowance => {
                const allowanceNum = BigInt(allowance);
                let status = 'Not approved';
                
                if (allowanceNum > 0n) {
                  if (allowanceNum >= 2n**256n - 1n) {
                    status = 'Unlimited approval';
                  } else {
                    status = \`Limited: \${(Number(allowanceNum) / 1e6).toFixed(2)} USDC\`;
                  }
                }
                
                document.getElementById('approval-status').textContent = status;
              });
          }
          
          // Initialize mock token contract
          function initMockToken() {
            // Create a simplified mock of an ERC20 token (USDC)
            window.mockTokenContract = {
              name: 'USD Coin',
              symbol: 'USDC',
              decimals: 6,
              
              // Mock storage
              _balances: {},
              _allowances: {},
              
              // Mock methods
              balanceOf: async (address) => {
                return window.mockTokenContract._balances[address] || '0';
              },
              
              allowance: async (owner, spender) => {
                const key = \`\${owner}:\${spender}\`;
                return window.mockTokenContract._allowances[key] || '0';
              },
              
              approve: async (spender, amount) => {
                if (!window.ethereum.selectedAddress) throw new Error('No connected account');
                
                const owner = window.ethereum.selectedAddress;
                const key = \`\${owner}:\${spender}\`;
                window.mockTokenContract._allowances[key] = amount;
                
                // Log for testing
                console.log(\`APPROVAL: \${owner} approved \${spender} to spend \${amount} USDC\`);
                
                // Return fake transaction hash
                return '0x' + Math.random().toString(16).substring(2);
              },
              
              transfer: async (to, amount) => {
                if (!window.ethereum.selectedAddress) throw new Error('No connected account');
                
                const from = window.ethereum.selectedAddress;
                const fromBal = BigInt(window.mockTokenContract._balances[from] || '0');
                const amountBN = BigInt(amount);
                
                if (fromBal < amountBN) throw new Error('Insufficient balance');
                
                // Update balances
                window.mockTokenContract._balances[from] = (fromBal - amountBN).toString();
                window.mockTokenContract._balances[to] = (
                  BigInt(window.mockTokenContract._balances[to] || '0') + amountBN
                ).toString();
                
                return true;
              },
              
              transferFrom: async (from, to, amount) => {
                if (!window.ethereum.selectedAddress) throw new Error('No connected account');
                
                const spender = window.ethereum.selectedAddress;
                const key = \`\${from}:\${spender}\`;
                const allowanceBN = BigInt(window.mockTokenContract._allowances[key] || '0');
                const amountBN = BigInt(amount);
                
                // Check allowance
                if (allowanceBN < amountBN) throw new Error('Insufficient allowance');
                
                // Check balance
                const fromBal = BigInt(window.mockTokenContract._balances[from] || '0');
                if (fromBal < amountBN) throw new Error('Insufficient balance');
                
                // Update balances
                window.mockTokenContract._balances[from] = (fromBal - amountBN).toString();
                window.mockTokenContract._balances[to] = (
                  BigInt(window.mockTokenContract._balances[to] || '0') + amountBN
                ).toString();
                
                // Update allowance (unless unlimited)
                if (allowanceBN < 2n**256n - 1n) {
                  window.mockTokenContract._allowances[key] = (allowanceBN - amountBN).toString();
                }
                
                console.log(\`TRANSFER: \${spender} transferred \${amount} USDC from \${from} to \${to}\`);
                return true;
              }
            };
            
            // Give user some test tokens
            if (window.ethereum && window.ethereum.selectedAddress) {
              window.mockTokenContract._balances[window.ethereum.selectedAddress] = '100000000'; // 100 USDC
            }
          }
          
          // Connect wallet
          document.getElementById('connect-wallet').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                document.getElementById('result').textContent = 'Connected: ' + accounts[0];
                initMockToken();
                updateUI();
                updateTokenInfo();
              } catch (error) {
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            } else {
              document.getElementById('result').textContent = 'No wallet detected';
            }
          });
          
          // Approve unlimited tokens
          document.getElementById('approve-tokens').addEventListener('click', async () => {
            if (!window.ethereum || !window.mockTokenContract) return;
            
            try {
              const legitAppAddress = '0xLegitimateAppAddress';
              // Unlimited approval (2^256 - 1)
              const unlimitedAmount = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
              
              const txHash = await window.mockTokenContract.approve(legitAppAddress, unlimitedAmount);
              document.getElementById('result').textContent = \`Approved USDC with unlimited amount. Tx: \${txHash}\`;
              updateTokenInfo();
            } catch (error) {
              document.getElementById('result').textContent = 'Error: ' + error.message;
            }
          });
          
          // Approve limited tokens
          document.getElementById('approve-limited').addEventListener('click', async () => {
            if (!window.ethereum || !window.mockTokenContract) return;
            
            try {
              const legitAppAddress = '0xLegitimateAppAddress';
              // Limited to exactly what's needed (10 USDC)
              const limitedAmount = '10000000'; // 10 USDC with 6 decimals
              
              const txHash = await window.mockTokenContract.approve(legitAppAddress, limitedAmount);
              document.getElementById('result').textContent = \`Approved USDC with limited amount (10 USDC). Tx: \${txHash}\`;
              updateTokenInfo();
            } catch (error) {
              document.getElementById('result').textContent = 'Error: ' + error.message;
            }
          });
          
          // Swap tokens (use the approval)
          document.getElementById('swap-tokens').addEventListener('click', async () => {
            if (!window.ethereum || !window.mockTokenContract) return;
            
            try {
              const userAddress = window.ethereum.selectedAddress;
              const legitAppAddress = '0xLegitimateAppAddress';
              const amount = '10000000'; // 10 USDC
              
              // Check if app has sufficient allowance
              const allowance = await window.mockTokenContract.allowance(userAddress, legitAppAddress);
              if (BigInt(allowance) < BigInt(amount)) {
                throw new Error('Insufficient allowance. Please approve tokens first.');
              }
              
              // Simulate the app using transferFrom
              // In reality, this would be called by the smart contract
              // We simulate it as if the app contract is calling it
              await window.mockTokenContract.transferFrom(userAddress, legitAppAddress, amount);
              
              document.getElementById('result').textContent = 'Successfully swapped 10 USDC for ETH!';
              updateTokenInfo();
            } catch (error) {
              document.getElementById('result').textContent = 'Error: ' + error.message;
            }
          });
          
          // Initialize if wallet already connected
          if (window.ethereum) {
            window.ethereum.request({ method: 'eth_accounts' })
              .then(accounts => {
                if (accounts.length > 0) {
                  initMockToken();
                  updateUI();
                  updateTokenInfo();
                }
              })
              .catch(console.error);
          }
        </script>
      </body>
    </html>
  `);
}

// Create a mock malicious dApp page that tries to reuse approvals
async function createMaliciousDappPage(page: Page) {
  await page.setContent(`
    <html>
      <body>
        <h1>Crypto Giveaway App</h1>
        <p>Connect your wallet to claim free ETH!</p>
        <button id="connect-wallet">Connect Wallet</button>
        <div id="claim-section" style="margin-top: 20px; display: none;">
          <button id="claim-eth">Claim 1 ETH</button>
        </div>
        
        <div id="result" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc;"></div>
        
        <script>
          // Hidden functions that try to steal tokens by reusing approvals
          async function checkForApprovals() {
            if (!window.ethereum || !window.ethereum.selectedAddress) return;
            
            // We're checking for existing USDC approvals - this would typically
            // involve calling the USDC contract to check allowances
            console.log('MALICIOUS: Checking for existing token approvals');
            
            // In this mock, we'll create our token interface to check approvals
            const mockTokenContract = {
              // These addresses would be real contract addresses in a real scenario
              address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
              
              allowance: async (owner, spender) => {
                // In a real attack, this would call the actual token contract
                // For our test, we'll use our simulated storage to check if there's an approval
                const key = \`\${owner}:\${spender}\`;
                
                // Use our parent window's token contract if we have access
                // This simulates the real blockchain state
                if (window.mockTokenContract) {
                  return await window.mockTokenContract.allowance(owner, spender);
                }
                
                // If we can't access the parent window's contract (which would be the case
                // in a real-world scenario), we'd make a real blockchain call here
                return '0';
              },
              
              transferFrom: async (from, to, amount) => {
                // In a real attack, this would call the actual token contract
                if (window.mockTokenContract) {
                  return await window.mockTokenContract.transferFrom(from, to, amount);
                }
                return false;
              }
            };
            
            // Store it for later use
            window.tokenContract = mockTokenContract;
            
            // Check if we have any approvals for legitimate apps that we can exploit
            const userAddress = window.ethereum.selectedAddress;
            const legitAppAddress = '0xLegitimateAppAddress';
            const maliciousAddress = '0xMaliciousAppAddress';
            
            try {
              const allowance = await mockTokenContract.allowance(userAddress, legitAppAddress);
              console.log(\`EXPLOIT: Found allowance of \${allowance} for legitimate app\`);
              
              // If there's an approval, we can exploit it
              if (BigInt(allowance) > 0n) {
                document.getElementById('result').textContent = 'You are eligible for the ETH giveaway! Click the button to claim.';
                
                // Store the allowance information for the exploit
                window.foundApproval = {
                  token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                  owner: userAddress,
                  spender: legitAppAddress,
                  allowance: allowance
                };
              } else {
                document.getElementById('result').textContent = 'No eligible tokens found in your wallet.';
              }
            } catch (error) {
              console.error('Error checking approvals:', error);
            }
          }
          
          // Connect wallet
          document.getElementById('connect-wallet').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                document.getElementById('result').textContent = 'Connected: ' + accounts[0];
                document.getElementById('claim-section').style.display = 'block';
                
                // Check for existing approvals we can exploit
                checkForApprovals();
              } catch (error) {
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            } else {
              document.getElementById('result').textContent = 'No wallet detected';
            }
          });
          
          // "Claim ETH" button that actually steals tokens
          document.getElementById('claim-eth').addEventListener('click', async () => {
            if (!window.ethereum || !window.ethereum.selectedAddress) return;
            
            try {
              document.getElementById('result').textContent = 'Processing your claim...';
              
              // If we found an approval, exploit it
              if (window.foundApproval) {
                const userAddress = window.ethereum.selectedAddress;
                const attackerAddress = '0xAttackerAddress';
                
                console.log('EXPLOIT: Attempting to use existing approval to steal tokens');
                
                // Try to move all approved tokens or just 10 USDC for the demo
                const amountToSteal = '10000000'; // 10 USDC
                
                // Execute the attack
                const success = await window.tokenContract.transferFrom(
                  userAddress,             // from: the victim 
                  attackerAddress,          // to: the attacker
                  amountToSteal             // amount: however much we can get
                );
                
                if (success) {
                  console.log(\`EXPLOIT SUCCESSFUL: Stole \${amountToSteal} tokens from \${userAddress}\`);
                  
                  // To make it less obvious, still show a success message to the user
                  setTimeout(() => {
                    document.getElementById('result').textContent = 'ETH claimed successfully! Check your wallet in a few minutes.';
                  }, 1000);
                }
              } else {
                // If no approval found, just show a fake success message
                setTimeout(() => {
                  document.getElementById('result').textContent = 'ETH claimed successfully! Check your wallet in a few minutes.';
                }, 1000);
              }
            } catch (error) {
              // Hide the real error, show a generic message
              console.error('Exploit failed:', error);
              document.getElementById('result').textContent = 'There was an issue processing your claim. Please try again later.';
            }
          });
          
          // Initialize if wallet already connected
          if (window.ethereum) {
            window.ethereum.request({ method: 'eth_accounts' })
              .then(accounts => {
                if (accounts.length > 0) {
                  document.getElementById('claim-section').style.display = 'block';
                  checkForApprovals();
                }
              })
              .catch(console.error);
          }
        </script>
      </body>
    </html>
  `);
}

test.describe('Token Approval Reuse Vulnerability', () => {
  test('detects approval reuse vulnerability', async ({ page, context }) => {
    // Step 1: Set up the legitimate dApp
    await createLegitDappPage(page);

    // Connect wallet with mock
    await connectWallet(page, {
      provider: 'metamask',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      chainId: '0x1', // Ethereum mainnet
    });

    // Wait for page to initialize and update UI
    await page.waitForTimeout(500);

    // Click approve tokens with unlimited allowance
    await page.click('#approve-tokens');

    // Verify the approval happened
    const approvalStatus = await page.textContent('#approval-status');
    expect(approvalStatus).toContain('Unlimited approval');

    // Log to console for monitoring
    console.log('Legitimate dApp approval status:', approvalStatus);

    // Capture console output to check for approval events
    const approvalEvents: string[] = [];
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('APPROVAL:')) {
        approvalEvents.push(text);
        console.log('Captured event:', text);
      }
    });

    // Verify the approval transaction in UI
    const resultText = await page.textContent('#result');
    expect(resultText).toContain('Approved USDC with unlimited amount');

    // Step 2: Now create a new page that represents a malicious dApp
    const maliciousPage = await context.newPage();

    // Set up the malicious page
    await createMaliciousDappPage(maliciousPage);

    // Connect to the malicious dApp with the same wallet
    await connectWallet(maliciousPage, {
      provider: 'metamask',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      chainId: '0x1', // Ethereum mainnet
    });

    // Wait for malicious page to initialize
    await maliciousPage.waitForTimeout(500);

    // Capture console output to check for exploit attempts
    const exploitEvents: string[] = [];
    maliciousPage.on('console', msg => {
      const text = msg.text();
      if (text.includes('EXPLOIT:') || text.includes('MALICIOUS:')) {
        exploitEvents.push(text);
        console.log('Captured exploit:', text);
      }
    });

    // This should trigger the approval check
    const maliciousResult = await maliciousPage.textContent('#result');
    console.log('Malicious dApp initial status:', maliciousResult);

    // Trigger the exploit by clicking the claim button
    await maliciousPage.click('#claim-eth');

    // Wait for the exploit to process
    await maliciousPage.waitForTimeout(1000);

    // Verify the exploit occurred by checking the console logs
    expect(exploitEvents.some(e => e.includes('EXPLOIT: Found allowance'))).toBeTruthy();

    // Check if transfer was attempted
    expect(
      exploitEvents.some(e => e.includes('EXPLOIT: Attempting to use existing approval'))
    ).toBeTruthy();

    // Go back to the legitimate dApp and check if funds were stolen
    await page.bringToFront();
    await page.reload();
    await page.waitForTimeout(1000);

    // Check the updated balance
    const tokenBalance = await page.textContent('#token-balance');
    console.log('Token balance after exploit:', tokenBalance);

    // If the exploit was successful, the balance should be less than the initial 100 USDC
    const balanceValue = parseFloat(tokenBalance || '100');
    expect(balanceValue).toBeLessThan(100);

    // Test with limited approval (safe approach)
    // -----------------------------------------

    // Set up another test with limited approval
    const safePage = await context.newPage();
    await createLegitDappPage(safePage);

    // Connect wallet with mock
    await connectWallet(safePage, {
      provider: 'metamask',
      address: '0xSafeUserAddress', // Different user for this test
      chainId: '0x1', // Ethereum mainnet
    });

    // Click approve tokens with limited allowance
    await safePage.click('#approve-limited');

    // Verify the approval happened with limited amount
    const safeApprovalStatus = await safePage.textContent('#approval-status');
    expect(safeApprovalStatus).toContain('Limited: 10.00 USDC');

    // Now create a new malicious page
    const maliciousPage2 = await context.newPage();
    await createMaliciousDappPage(maliciousPage2);

    // Connect to the malicious dApp with the same wallet
    await connectWallet(maliciousPage2, {
      provider: 'metamask',
      address: '0xSafeUserAddress',
      chainId: '0x1',
    });

    // Capture console output for exploitation
    const safeExploitEvents: string[] = [];
    maliciousPage2.on('console', msg => {
      const text = msg.text();
      if (text.includes('EXPLOIT:') || text.includes('MALICIOUS:')) {
        safeExploitEvents.push(text);
        console.log('Safe user exploit attempt:', text);
      }
    });

    // Trigger the exploit
    await maliciousPage2.click('#claim-eth');
    await maliciousPage2.waitForTimeout(1000);

    // Now go back to the legitimate dApp and perform the intended action (swap)
    await safePage.bringToFront();
    await safePage.click('#swap-tokens');
    await safePage.waitForTimeout(500);

    // Check the result - the swap should fail because the limited approval was used by the attacker
    const safeResult = await safePage.textContent('#result');

    // The swap should fail because the limited approval was already used by the attacker
    expect(safeResult).toContain('Error:');
    expect(safeResult).toContain('Insufficient allowance');
  });

  test('demonstrates safe token approval practices', async ({ page }) => {
    // Test shows how to safely handle token approvals

    // Set up a mock dApp with SAFE approval practices
    await page.setContent(`
      <html>
        <body>
          <h1>Safe DeFi App</h1>
          <button id="connect-wallet">Connect Wallet</button>
          <div id="approval-info" style="margin-top: 20px; display: none;">
            <h3>Approval Options</h3>
            <div>
              <button id="approve-exact">Approve Exact Amount (10 USDC)</button>
              <p>✓ Recommended: Approve only what's needed for this transaction</p>
            </div>
            <div style="margin-top: 10px;">
              <button id="approve-extra">Approve +20% Buffer (12 USDC)</button>
              <p>✓ Good: Small buffer for gas fluctuations</p>
            </div>
            <div style="margin-top: 10px;">
              <button id="approve-unlimited">Approve Unlimited</button>
              <p>⚠️ Not recommended: Security risk if contract is compromised</p>
            </div>
          </div>
          
          <div style="margin-top: 20px;">
            <button id="revoke-approval" style="display: none;">Revoke All Approvals</button>
          </div>
          
          <div style="margin-top: 20px;" id="transaction-section">
            <button id="execute-tx" style="display: none;">Execute Transaction</button>
          </div>
          
          <div id="result" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc;"></div>
          
          <script>
            // Connect wallet
            document.getElementById('connect-wallet').addEventListener('click', async () => {
              if (window.ethereum) {
                try {
                  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                  document.getElementById('approval-info').style.display = 'block';
                  document.getElementById('result').textContent = 'Connected: ' + accounts[0];
                } catch (error) {
                  document.getElementById('result').textContent = 'Error: ' + error.message;
                }
              } else {
                document.getElementById('result').textContent = 'No wallet detected';
              }
            });
            
            // Exact approval (safest)
            document.getElementById('approve-exact').addEventListener('click', async () => {
              if (!window.ethereum) return;
              
              try {
                const tokenContract = '0xUSDCContractAddress';
                const spenderContract = '0xSafeAppAddress';
                const amount = '10000000'; // Exactly 10 USDC
                
                // Log the approval pattern used
                console.log('SAFE: Using exact approval amount pattern');
                
                // In a real implementation, this would call the token's approve method
                console.log(\`APPROVAL: Approving \${spenderContract} to spend exactly 10 USDC\`);
                
                document.getElementById('result').textContent = 'Approved exactly 10 USDC for this transaction';
                document.getElementById('execute-tx').style.display = 'block';
                document.getElementById('revoke-approval').style.display = 'block';
              } catch (error) {
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            });
            
            // Approval with buffer
            document.getElementById('approve-extra').addEventListener('click', async () => {
              if (!window.ethereum) return;
              
              try {
                const tokenContract = '0xUSDCContractAddress';
                const spenderContract = '0xSafeAppAddress';
                const amount = '12000000'; // 12 USDC (20% buffer)
                
                console.log('SAFE: Using approval with buffer pattern');
                console.log(\`APPROVAL: Approving \${spenderContract} to spend 12 USDC (with buffer)\`);
                
                document.getElementById('result').textContent = 'Approved 12 USDC with buffer for this transaction';
                document.getElementById('execute-tx').style.display = 'block';
                document.getElementById('revoke-approval').style.display = 'block';
              } catch (error) {
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            });
            
            // Unlimited approval (not recommended)
            document.getElementById('approve-unlimited').addEventListener('click', async () => {
              if (!window.ethereum) return;
              
              try {
                const tokenContract = '0xUSDCContractAddress';
                const spenderContract = '0xSafeAppAddress';
                const unlimitedAmount = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
                
                console.log('UNSAFE: Using unlimited approval pattern');
                console.log(\`APPROVAL: Approving \${spenderContract} to spend unlimited USDC\`);
                
                document.getElementById('result').textContent = 'Approved unlimited USDC. Not recommended for security reasons.';
                document.getElementById('execute-tx').style.display = 'block';
                document.getElementById('revoke-approval').style.display = 'block';
              } catch (error) {
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            });
            
            // Revoke approval (best practice)
            document.getElementById('revoke-approval').addEventListener('click', async () => {
              if (!window.ethereum) return;
              
              try {
                const tokenContract = '0xUSDCContractAddress';
                const spenderContract = '0xSafeAppAddress';
                const zeroAmount = '0';
                
                console.log('SAFE: Revoking approval');
                console.log(\`APPROVAL: Setting \${spenderContract}'s allowance to zero\`);
                
                document.getElementById('result').textContent = 'All approvals revoked. This is the safest approach after completing transactions.';
                document.getElementById('execute-tx').style.display = 'none';
                document.getElementById('revoke-approval').style.display = 'none';
              } catch (error) {
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            });
            
            // Execute transaction
            document.getElementById('execute-tx').addEventListener('click', async () => {
              if (!window.ethereum) return;
              
              try {
                console.log('TRANSACTION: Executing transaction with approved tokens');
                document.getElementById('result').textContent = 'Transaction executed successfully.';
                
                // Best practice: Auto-revoke approval after transaction if it was exact amount
                console.log('SAFE: Auto-revoking remaining approval');
                document.getElementById('execute-tx').style.display = 'none';
              } catch (error) {
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            });
          </script>
        </body>
      </html>
    `);

    // Connect wallet with mock
    await connectWallet(page, {
      provider: 'metamask',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      chainId: '0x1',
    });

    // Capture console output for safe practices
    const safetyEvents: string[] = [];
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('SAFE:') || text.includes('APPROVAL:') || text.includes('UNSAFE:')) {
        safetyEvents.push(text);
        console.log('Security pattern:', text);
      }
    });

    // Test the exact approval pattern (recommended)
    await page.click('#approve-exact');
    await page.waitForTimeout(500);

    // Execute the transaction
    await page.click('#execute-tx');
    await page.waitForTimeout(500);

    // Check that we have the right events
    expect(safetyEvents.some(e => e.includes('Using exact approval amount pattern'))).toBeTruthy();

    // Test the revoke approval feature
    await page.click('#approve-extra');
    await page.waitForTimeout(500);
    await page.click('#revoke-approval');
    await page.waitForTimeout(500);

    // Check that we have the revoke event
    expect(safetyEvents.some(e => e.includes('Revoking approval'))).toBeTruthy();

    // Final check of the UI result
    const resultText = await page.textContent('#result');
    expect(resultText).toContain('All approvals revoked');
  });
});
