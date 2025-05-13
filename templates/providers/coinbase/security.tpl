// Security Test Suite - Coinbase Wallet Implementation
const { test, expect } = require('@playwright/test');
const { connectWallet, getWalletState, sendTransaction, switchNetwork } = require('../../../tests/utils/walletMock');
const { analyzeTransaction, validateSignature } = require('../../../src/core/defi-testing/transaction-analyzer');

test.describe('Coinbase Wallet Security Test Suite', () => {
  // Test configuration
  const config = {
    dappUrl: '{{dapp_url}}',
    walletAddress: '{{address}}' || '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    connectButtonSelector: '{{connect_button_selector}}',
    networkName: '{{network}}' || 'Ethereum Mainnet',
    chainId: '{{chainId}}' || '0x1'
  };

  // Security vulnerability tests specific to Coinbase Wallet
  test('Detects insecure signature requests', async ({ page }) => {
    // Set up mock dApp page
    await page.goto(config.dappUrl);
    
    // Connect with Coinbase wallet
    await connectWallet(page, {
      provider: 'coinbase',
      address: config.walletAddress,
      chainId: config.chainId
    });
    
    // Monitor for all signature request types
    const signatureCalls = [];
    await page.evaluate(() => {
      if (typeof window.ethereum !== 'undefined') {
        const originalRequest = window.ethereum.request.bind(window.ethereum);
        window.ethereum.request = async function(args) {
          const signMethods = ['eth_sign', 'personal_sign', 'eth_signTypedData', 'eth_signTypedData_v4'];
          if (signMethods.includes(args.method)) {
            console.log(`SIGNATURE_REQUEST: ${args.method} with params: ${JSON.stringify(args.params)}`);
          }
          return originalRequest(args);
        };
      }
    });
    
    // Monitor console logs for signature requests
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('SIGNATURE_REQUEST:')) {
        console.log(`Detected signature request: ${text}`);
        try {
          const methodMatch = text.match(/SIGNATURE_REQUEST: ([^ ]+)/);
          const paramsMatch = text.match(/with params: (.+)/);
          if (methodMatch && paramsMatch) {
            const method = methodMatch[1];
            const params = JSON.parse(paramsMatch[1]);
            signatureCalls.push({ method, params });
          }
        } catch (e) {
          console.log(`Error parsing signature request: ${e.message}`);
        }
      }
    });
    
    // Try to find and click sign buttons
    try {
      await page.click('#sign-button, button:has-text("Sign"), [data-testid="sign-button"]');
    } catch (e) {
      console.log('No sign button found on the page');
    }
    
    // Analyze detected signature requests
    for (const call of signatureCalls) {
      const result = await validateSignature(call.method, call.params);
      
      if (result.severity > 0) {
        console.log(`VULNERABILITY DETECTED (severity: ${result.severity}/10): ${result.description}`);
        console.log(`Impact: ${result.impact}`);
        console.log(`Recommendation: ${result.recommendation}`);
      }
      
      // Enhanced specific checks for Coinbase wallet
      if (call.method === 'eth_sign') {
        console.warn('SECURITY CONCERN: eth_sign is considered unsafe and deprecated, recommend using personal_sign');
      }
      
      if (call.method === 'personal_sign' && call.params.length >= 1) {
        const message = call.params[0];
        const decodedMessage = message.startsWith('0x') 
          ? Buffer.from(message.slice(2), 'hex').toString() 
          : message;
        
        // Enhanced phishing pattern detection
        const phishingPatterns = [
          /free/i, /claim/i, /airdrop/i, /login/i, /authorize/i,
          /connect/i, /access/i, /verify/i, /validate/i, /confirm/i,
          /approve/i, /delegate/i, /permission/i, /token/i, /unlimited/i
        ];
        
        const containsPhishingPattern = phishingPatterns.some(pattern => pattern.test(decodedMessage));
        
        if (containsPhishingPattern) {
          console.log('VULNERABILITY: Potential phishing signature request detected');
          console.log(`Message content: ${decodedMessage}`);
        }
        
        // Check for EIP-712 structure in plaintext
        if (decodedMessage.includes('type') && decodedMessage.includes('name') && decodedMessage.includes('verifyingContract')) {
          console.log('SECURITY CONCERN: EIP-712 data found in plaintext signature request. Should use eth_signTypedData_v4 instead');
        }
      }
      
      // Enhanced checks for EIP-712 typed data
      if (call.method === 'eth_signTypedData_v4' && call.params.length >= 2) {
        try {
          const typedData = JSON.parse(call.params[1]);
          
          // Check for unlimited approvals
          if (typedData?.message?.spender && typedData?.message?.value) {
            const value = typedData.message.value;
            // Check if value is very large (unlimited approval)
            if (value === 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' || 
                value === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' ||
                value === '115792089237316195423570985008687907853269984665640564039457584007913129639935') {
              console.log('SECURITY CONCERN: Unlimited token approval detected. Consider using a finite approval amount');
            }
          }
          
          // Check domain and verification fields
          if (!typedData?.domain?.verifyingContract) {
            console.log('SECURITY CONCERN: Missing verifyingContract in EIP-712 typed data');
          }
        } catch (e) {
          console.log(`Error parsing EIP-712 typed data: ${e.message}`);
        }
      }
    }
    
    // Test for transaction hijacking vulnerability
    const walletState = await getWalletState(page);
    expect(walletState.provider).toBe('coinbase');
  });
  
  test('Detects transaction security issues', async ({ page }) => {
    // Set up mock dApp page
    await page.goto(config.dappUrl);
    
    // Connect wallet
    await connectWallet(page, {
      provider: 'coinbase',
      address: config.walletAddress,
      chainId: config.chainId
    });
    
    // Monitor for transaction requests with enhanced data collection
    const transactionRequests = [];
    await page.evaluate(() => {
      if (typeof window.ethereum !== 'undefined') {
        const originalRequest = window.ethereum.request.bind(window.ethereum);
        window.ethereum.request = async function(args) {
          if (args.method === 'eth_sendTransaction') {
            console.log(`TRANSACTION_REQUEST: ${JSON.stringify(args.params)}`);
            window._lastTxParams = args.params;
          }
          return originalRequest(args);
        };
      }
    });
    
    // Capture transaction requests from console
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('TRANSACTION_REQUEST:')) {
        try {
          const txDataMatch = text.match(/TRANSACTION_REQUEST: (.+)/);
          if (txDataMatch) {
            const txData = JSON.parse(txDataMatch[1]);
            transactionRequests.push(txData);
          }
        } catch (e) {
          console.log(`Error parsing transaction request: ${e.message}`);
        }
      }
    });
    
    // Attempt to trigger a transaction if possible
    try {
      await page.click('button:has-text("Transfer"), button:has-text("Send"), #transfer-button, [data-testid="send-button"]');
    } catch (e) {
      // No transaction button found, create a test transaction
      await sendTransaction(page, {
        to: '0x1234567890123456789012345678901234567890',
        value: '0x1'
      });
    }
    
    // Wait for transaction dialog to appear
    await page.waitForTimeout(2000);
    
    // Retrieve and analyze transactions
    const txRequests = await page.evaluate(() => window._lastTxParams || []);
    if (Array.isArray(txRequests) && txRequests.length > 0) {
      transactionRequests.push(...txRequests);
    }
    
    for (const tx of transactionRequests) {
      // Enhanced transaction analysis
      const securityAnalysis = await analyzeTransaction(tx, {
        provider: 'coinbase',
        chainId: config.chainId
      });
      
      if (securityAnalysis.issues.length > 0) {
        console.log(`Found ${securityAnalysis.issues.length} security issues in transaction:`);
        securityAnalysis.issues.forEach(issue => {
          console.log(`- ${issue.severity}: ${issue.description}`);
          console.log(`  Impact: ${issue.impact}`);
          console.log(`  Recommendation: ${issue.recommendation}`);
        });
      }
      
      // Coinbase-specific transaction checks
      if (tx[0] && tx[0].data && tx[0].data !== '0x') {
        // Check for common vulnerable function signatures
        const functionSig = tx[0].data.slice(0, 10);
        const knownVulnerableSigs = {
          '0x095ea7b3': 'approve(address,uint256) - Check for unlimited approvals',
          '0xa22cb465': 'setApprovalForAll(address,bool) - Grants unlimited access to all NFTs'
        };
        
        if (knownVulnerableSigs[functionSig]) {
          console.log(`SECURITY CONCERN: Transaction contains potentially risky function: ${knownVulnerableSigs[functionSig]}`);
        }
        
        // Check for delegatecall in custom contracts
        if (tx[0].data.includes('delegatecall')) {
          console.log('HIGH RISK: Transaction may contain delegatecall which can be dangerous if misused');
        }
      }
      
      // Gas price monitoring (optional in Coinbase wallet)
      if (tx[0] && tx[0].gasPrice) {
        const gasPrice = parseInt(tx[0].gasPrice, 16);
        // Check if gas price is unusually high (potential gas price manipulation)
        if (gasPrice > 500000000000) { // 500 gwei
          console.log('WARNING: Unusually high gas price detected. Potential gas price manipulation or front-running vulnerability');
        }
      }
    }
    
    // Additional security checks specific to Coinbase
    const walletState = await getWalletState(page);
    expect(walletState.connected).toBe(true);
  });
  
  test('Detects chain switching security issues', async ({ page }) => {
    await page.goto(config.dappUrl);
    await connectWallet(page, {
      provider: 'coinbase',
      address: config.walletAddress,
      chainId: config.chainId
    });
    
    // Monitor for chain switch requests
    await page.evaluate(() => {
      if (typeof window.ethereum !== 'undefined') {
        const originalRequest = window.ethereum.request.bind(window.ethereum);
        window.ethereum.request = async function(args) {
          if (args.method === 'wallet_switchEthereumChain' || args.method === 'wallet_addEthereumChain') {
            console.log(`CHAIN_REQUEST: ${args.method} with params: ${JSON.stringify(args.params)}`);
          }
          return originalRequest(args);
        };
      }
    });
    
    // Test chain switching
    try {
      await switchNetwork(page, '0x89'); // Switch to Polygon
      
      // Check if the chain switch succeeded
      const chainAfterSwitch = await page.evaluate(() => window.ethereum.chainId);
      if (chainAfterSwitch === '0x89') {
        console.log('Chain switch successful, checking for security issues...');
        
        // Check if we can detect the original chain information
        const originalChainStillAccessible = await page.evaluate(() => {
          try {
            // This is a security concern if original chain data is accessible after switching
            return window._initialChainId !== undefined;
          } catch (e) {
            return false;
          }
        });
        
        if (originalChainStillAccessible) {
          console.log('SECURITY CONCERN: Original chain data is still accessible after chain switch');
        }
      }
    } catch (e) {
      console.log(`Chain switch failed: ${e.message}`);
    }
    
    // Switch back to original chain
    await switchNetwork(page, config.chainId);
  });
});
