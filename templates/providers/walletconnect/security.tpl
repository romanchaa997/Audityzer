// Security Test Suite - WalletConnect Implementation
const { test, expect } = require('@playwright/test');
const { connectWallet, getWalletState, sendTransaction, switchNetwork } = require('../../../tests/utils/walletMock');

test.describe('WalletConnect Security Test Suite', () => {
  // Test configuration
  const config = {
    dappUrl: '{{dapp_url}}',
    walletAddress: '{{address}}' || '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    connectButtonSelector: '{{connect_button_selector}}',
    networkName: '{{network}}' || 'Ethereum Mainnet',
    chainId: '{{chainId}}' || '0x1'
  };

  test('Detects insecure WalletConnect session handling', async ({ page }) => {
    // Navigate to dApp
    await page.goto(config.dappUrl);
    
    // Connect wallet
    await connectWallet(page, {
      provider: 'walletconnect',
      address: config.walletAddress,
      chainId: config.chainId
    });
    
    // Verify connection
    const walletState = await getWalletState(page);
    expect(walletState.connected).toBe(true);
    expect(walletState.provider).toBe('walletconnect');
    
    // Monitor for session expirations and reconnections
    await page.evaluate(() => {
      window.sessionEvents = [];
      
      if (window.ethereum && window.ethereum.isWalletConnect) {
        // Capture session events
        const originalRequest = window.ethereum.request.bind(window.ethereum);
        window.ethereum.request = async function(args) {
          if (args.method === 'wc_sessionUpdate' || 
              args.method === 'wc_sessionRequest' ||
              args.method === 'personal_sign') {
            window.sessionEvents.push({
              method: args.method, 
              timestamp: Date.now()
            });
            console.log(`WC_SESSION_EVENT: ${args.method}`);
          }
          return originalRequest(args);
        };
      }
    });
    
    // Check for session persistence security
    const hasSessionPersistence = await page.evaluate(() => {
      // Check if session data is stored in localStorage (potential security issue)
      const hasLocalStorage = Object.keys(localStorage).some(key => 
        key.includes('wc') || key.includes('walletconnect')
      );
      
      // Check for session storage (which is cleared when browser closes)
      const hasSessionStorage = Object.keys(sessionStorage).some(key => 
        key.includes('wc') || key.includes('walletconnect')
      );
      
      return {
        hasLocalStorage,
        hasSessionStorage,
        storageKeys: {
          local: Object.keys(localStorage).filter(k => k.includes('wc') || k.includes('walletconnect')),
          session: Object.keys(sessionStorage).filter(k => k.includes('wc') || k.includes('walletconnect'))
        }
      };
    });
    
    // Persistent sessions in localStorage could be a security issue
    if (hasSessionPersistence.hasLocalStorage) {
      console.log('POTENTIAL VULNERABILITY: WalletConnect session data stored in localStorage');
      console.log('Storage keys:', hasSessionPersistence.storageKeys.local);
    }
    
    // Test for signature vulnerabilities
    try {
      await page.click('button:has-text("Sign"), #sign-message-button');
      console.log('Testing signature request handling...');
    } catch (e) {
      // Create a mock signature request
      await page.evaluate(() => {
        if (window.ethereum && window.ethereum.isWalletConnect) {
          console.log('Simulating a signature request...');
          const message = 'Test message signing security';
          const msgHex = '0x' + Buffer.from(message).toString('hex');
          window.ethereum.request({
            method: 'personal_sign',
            params: [msgHex, window.ethereum.selectedAddress]
          }).catch(e => console.error('Sign error:', e));
        }
      });
    }
    
    // Wait for potential session events
    await page.waitForTimeout(1000);
    
    // Get session events
    const sessionEvents = await page.evaluate(() => window.sessionEvents || []);
    console.log(`Captured ${sessionEvents.length} WalletConnect session events`);
  });
  
  test('Validates multicall transaction security', async ({ page }) => {
    // Navigate to dApp
    await page.goto(config.dappUrl);
    
    // Connect wallet
    await connectWallet(page, {
      provider: 'walletconnect',
      address: config.walletAddress,
      chainId: config.chainId
    });
    
    // Monitor for transaction batching (which can be a security concern)
    await page.evaluate(() => {
      window.transactionBatches = [];
      
      if (window.ethereum) {
        const originalRequest = window.ethereum.request.bind(window.ethereum);
        window.ethereum.request = async function(args) {
          if (args.method === 'eth_sendTransaction' && Array.isArray(args.params) && args.params.length > 1) {
            // This could be a transaction batch/multicall
            window.transactionBatches.push({
              method: args.method,
              count: args.params.length,
              timestamp: Date.now()
            });
            console.log(`MULTI_TRANSACTION: Detected ${args.params.length} bundled transactions`);
          }
          return originalRequest(args);
        };
      }
    });
    
    // Test app interaction or simulate transaction
    await sendTransaction(page, {
      to: '0x1234567890123456789012345678901234567890',
      value: '0x1'
    });
    
    // Look for multicall vulnerabilities
    const batchedTransactions = await page.evaluate(() => window.transactionBatches || []);
    
    if (batchedTransactions.length > 0) {
      console.log('POTENTIAL VULNERABILITY: Multiple transactions batched together');
      console.log(`Found ${batchedTransactions.length} transaction batches`);
    }
    
    // Test for chain security by attempting network switch
    await switchNetwork(page, { chainId: '0x89' }); // Polygon
    const newWalletState = await getWalletState(page);
    
    // Verify cross-chain security
    expect(newWalletState.chainId).toBe('0x89');
    
    // Check if the dApp handles network switching securely
    const hasNetworkValidation = await page.evaluate(() => {
      return {
        hasNetworkCheck: !!window.ethereum._networkListeners || 
                         !!window.ethereum._events?.chainChanged?.length > 0,
        eventListeners: Object.keys(window.ethereum._events || {})
      };
    });
    
    if (!hasNetworkValidation.hasNetworkCheck) {
      console.log('POTENTIAL VULNERABILITY: No network change validation detected');
      console.log('Event listeners:', hasNetworkValidation.eventListeners);
    }
  });
});
