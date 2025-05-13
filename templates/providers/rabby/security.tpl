// Security Test Suite - Rabby Wallet Implementation
const { test, expect } = require('@playwright/test');
const { connectWallet, getWalletState, sendTransaction } = require('../../../tests/utils/walletMock');

test.describe('Rabby Wallet Security Test Suite', () => {
  // Test configuration
  const config = {
    dappUrl: '{{dapp_url}}',
    walletAddress: '{{address}}' || '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    connectButtonSelector: '{{connect_button_selector}}',
    networkName: '{{network}}' || 'Ethereum Mainnet',
    chainId: '{{chainId}}' || '0x1'
  };

  test.beforeEach(async ({ page }) => {
    // Navigate to dApp
    await page.goto(config.dappUrl);
    
    // Connect Rabby wallet
    await connectWallet(page, {
      provider: 'rabby',
      address: config.walletAddress,
      chainId: config.chainId
    });
    
    // Verify connection
    const walletState = await getWalletState(page);
    expect(walletState.connected).toBe(true);
  });

  test('Detects simulation-based security features', async ({ page }) => {
    // Set up monitoring for transaction risk assessment
    // Rabby wallet has advanced simulation features to detect risky transactions
    await page.evaluate(() => {
      window.transactionRiskAssessments = [];
      
      if (window.ethereum) {
        const originalRequest = window.ethereum.request.bind(window.ethereum);
        window.ethereum.request = async function(args) {
          if (args.method === 'eth_sendTransaction') {
            console.log(`TRANSACTION_REQUEST: ${JSON.stringify(args.params)}`);
            
            // Check if there's simulation data in the transaction
            // Rabby adds metadata for simulations
            const hasSimulation = args.params[0]?.gasLimit !== undefined && 
                                   args.params[0]?.value !== undefined;
            
            window.transactionRiskAssessments.push({
              hasSimulation,
              transaction: args.params[0],
              timestamp: Date.now()
            });
          }
          return originalRequest(args);
        };
      }
    });
    
    // Try to find and click transfer buttons or simulate a transaction
    try {
      await page.click('button:has-text("Transfer"), button:has-text("Send"), #transfer-button');
    } catch (e) {
      console.log('No transfer button found, creating mock transaction');
      // Create a mock transaction
      await sendTransaction(page, {
        to: '0x1234567890123456789012345678901234567890',
        value: '0x1'
      });
    }
    
    // Check if transaction simulation was used
    const riskAssessments = await page.evaluate(() => window.transactionRiskAssessments || []);
    
    if (riskAssessments.length > 0) {
      console.log(`Detected ${riskAssessments.length} transactions with simulation data`);
      
      if (!riskAssessments.some(assessment => assessment.hasSimulation)) {
        console.log('VULNERABILITY: Transactions not simulated before execution');
      } else {
        console.log('Security feature detected: Transaction simulation');
      }
    }
  });
  
  test('Validates Rabby\'s phishing protection', async ({ page }) => {
    // Rabby has built-in phishing protection; test if it's active
    
    // Monitor for signature requests
    await page.evaluate(() => {
      window.signatureRequests = [];
      
      if (window.ethereum) {
        const originalRequest = window.ethereum.request.bind(window.ethereum);
        window.ethereum.request = async function(args) {
          if (args.method === 'personal_sign' || 
              args.method === 'eth_sign' || 
              args.method === 'eth_signTypedData_v4') {
            
            // Log signature request
            window.signatureRequests.push({
              method: args.method,
              params: args.params,
              timestamp: Date.now()
            });
            
            console.log(`SIGNATURE_REQUEST: ${args.method}`);
          }
          return originalRequest(args);
        };
      }
    });
    
    // Create suspicious message for testing phishing protection
    const suspiciousMessage = "I authorize transfer of all my assets to external wallet";
    
    // Try to sign a suspicious message
    await page.evaluate((message) => {
      if (window.ethereum) {
        const msgHex = '0x' + Buffer.from(message).toString('hex');
        window.ethereum.request({
          method: 'personal_sign',
          params: [msgHex, window.ethereum.selectedAddress]
        }).catch(e => console.log('Sign error (expected if phishing protection worked):', e.message));
      }
    }, suspiciousMessage);
    
    // Wait for potential phishing warnings
    await page.waitForTimeout(1000);
    
    // Get signature requests
    const signatureRequests = await page.evaluate(() => window.signatureRequests || []);
    
    if (signatureRequests.length > 0) {
      console.log(`Detected ${signatureRequests.length} signature requests`);
      
      // Analyze message content for phishing patterns
      for (const req of signatureRequests) {
        if (req.method === 'personal_sign' || req.method === 'eth_sign') {
          const message = req.params[0];
          const isHex = /^0x[0-9a-f]+$/i.test(message);
          const messageContent = isHex ? Buffer.from(message.slice(2), 'hex').toString() : message;
          
          // Check for phishing patterns
          const phishingPatterns = [
            /transfer/i, /authorize/i, /all/i, /assets/i, /withdraw/i,
            /approve/i, /unlimited/i, /connect/i, /validate/i
          ];
          
          const matches = phishingPatterns.filter(pattern => pattern.test(messageContent));
          
          if (matches.length > 0) {
            console.log('VULNERABILITY: Potentially malicious signature request detected');
            console.log(`Matched patterns: ${matches.map(m => m.toString())}`);
            console.log(`Message content: ${messageContent}`);
          }
        }
      }
    }
  });
  
  test('Validates Rabby\'s contract interaction security', async ({ page }) => {
    // Test contract security features unique to Rabby
    
    // Set up monitoring for contract interaction warnings
    await page.evaluate(() => {
      window.contractInteractions = [];
      
      if (window.ethereum) {
        const originalRequest = window.ethereum.request.bind(window.ethereum);
        window.ethereum.request = async function(args) {
          if (args.method === 'eth_sendTransaction' && 
              args.params[0]?.data && 
              args.params[0]?.data !== '0x') {
            
            // This is a contract interaction
            window.contractInteractions.push({
              to: args.params[0].to,
              data: args.params[0].data,
              timestamp: Date.now()
            });
            
            console.log(`CONTRACT_INTERACTION: ${args.params[0].to}`);
          }
          return originalRequest(args);
        };
      }
    });
    
    // Simulate contract interaction or click contract buttons
    try {
      await page.click('button:has-text("Approve"), button:has-text("Swap"), #contract-interaction');
    } catch (e) {
      console.log('No contract button found, creating mock contract call');
      // Create a mock contract call
      await sendTransaction(page, {
        to: '0xContractAddress1234567890123456789012345678901234',
        data: '0x095ea7b300000000000000000000000000000000000000000000000000000000000000ff' // Example approve() call
      });
    }
    
    // Check for contract interaction security features
    const contractInteractions = await page.evaluate(() => window.contractInteractions || []);
    
    if (contractInteractions.length > 0) {
      console.log(`Detected ${contractInteractions.length} contract interactions`);
      
      // Check for security patterns in the contract data
      for (const interaction of contractInteractions) {
        // Check for known vulnerable function signatures
        const isUnlimitedApproval = interaction.data.startsWith('0x095ea7b3') && 
                                    interaction.data.endsWith('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
        
        if (isUnlimitedApproval) {
          console.log('VULNERABILITY: Unlimited token approval detected');
          console.log(`Contract: ${interaction.to}`);
        }
      }
    }
  });
});
