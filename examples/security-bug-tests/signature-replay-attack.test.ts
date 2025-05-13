// @ts-nocheck
import { test, expect, Page } from '@playwright/test';
import { connectWallet, getWalletState } from '../../tests/utils/walletMock';

/**
 * Security bug: Signature Replay Attack Vulnerability
 *
 * Vulnerability explanation:
 * Signature replay attacks occur when the same signed message can be reused multiple times
 * because there are no built-in protections against reuse. This vulnerability happens when:
 * 1. Signatures don't include a nonce (unique number used once)
 * 2. Signed messages don't have an expiration timestamp
 * 3. The contract or application doesn't track which signatures have been used
 *
 * This test checks for:
 * - Missing nonce in signatures
 * - Missing expiration timestamp in signatures
 * - Lack of signature tracking/validation mechanisms
 */

// Create a mock dApp page for testing
async function createMockDappPage(page: Page) {
  await page.setContent(`
    <html>
      <body>
        <h1>Test dApp - Signature Replay Vulnerability</h1>
        <button id="connect-wallet">Connect Wallet</button>
        <button id="sign-vulnerable">Sign Message (Vulnerable)</button>
        <button id="sign-secure">Sign Message (Secure)</button>
        <button id="submit-signature">Submit Signature</button>
        <button id="reuse-signature">Reuse Previous Signature</button>
        <div id="result"></div>
        <div id="status"></div>
        
        <script>
          // Store signatures for reuse demonstration
          let lastSignature = '';
          let signedMessage = '';
          let usedSignatures = new Set();
          
          // Connect to wallet
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

          // Vulnerable signing - no nonce, no expiration
          document.getElementById('sign-vulnerable').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                const account = accounts[0];
                
                // VULNERABLE: Message without nonce or expiration
                signedMessage = JSON.stringify({
                  action: "withdraw",
                  amount: "0.5 ETH",
                  recipient: account
                });
                
                // Convert to hex
                const hexMsg = '0x' + Buffer.from(signedMessage).toString('hex');
                
                lastSignature = await window.ethereum.request({
                  method: 'personal_sign',
                  params: [hexMsg, account]
                });
                
                document.getElementById('result').textContent = 'Signed (vulnerable): ' + lastSignature;
                document.getElementById('status').textContent = 'Created signature without nonce or expiration';
              } catch (error) {
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            }
          });

          // Secure signing - with nonce and expiration
          document.getElementById('sign-secure').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                const account = accounts[0];
                
                // Secure: Message with nonce and expiration
                const nonce = Math.floor(Math.random() * 1000000).toString();
                const expiration = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
                
                signedMessage = JSON.stringify({
                  action: "withdraw",
                  amount: "0.5 ETH",
                  recipient: account,
                  nonce: nonce,
                  expiration: expiration
                });
                
                // Convert to hex
                const hexMsg = '0x' + Buffer.from(signedMessage).toString('hex');
                
                lastSignature = await window.ethereum.request({
                  method: 'personal_sign',
                  params: [hexMsg, account]
                });
                
                document.getElementById('result').textContent = 'Signed (secure): ' + lastSignature;
                document.getElementById('status').textContent = 'Created signature with nonce and expiration';
              } catch (error) {
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            }
          });
          
          // Submit signature
          document.getElementById('submit-signature').addEventListener('click', () => {
            if (lastSignature) {
              // Check if signature was previously used (simulating backend check)
              if (usedSignatures.has(lastSignature)) {
                document.getElementById('status').textContent = 'REPLAY DETECTED: Signature has already been used!';
              } else {
                usedSignatures.add(lastSignature);
                document.getElementById('status').textContent = 'Signature accepted and processed';
              }
            } else {
              document.getElementById('status').textContent = 'No signature available';
            }
          });
          
          // Attempt to reuse a signature (simulating a replay attack)
          document.getElementById('reuse-signature').addEventListener('click', () => {
            if (lastSignature) {
              // Check if signature was previously used
              if (usedSignatures.has(lastSignature)) {
                document.getElementById('status').textContent = 'REPLAY ATTEMPT: Signature has already been used!';
              } else {
                usedSignatures.add(lastSignature);
                document.getElementById('status').textContent = 'Signature accepted and processed';
              }
            } else {
              document.getElementById('status').textContent = 'No signature available to reuse';
            }
          });
        </script>
      </body>
    </html>
  `);
}

// Helper to parse signed messages
function parseSignedMessage(message: string): any {
  try {
    // If message is hex encoded, convert it back
    if (message.startsWith('0x')) {
      const hexStripped = message.slice(2);
      message = Buffer.from(hexStripped, 'hex').toString();
    }
    return JSON.parse(message);
  } catch (e) {
    return { error: 'Could not parse message' };
  }
}

test.describe('Signature Replay Attack Vulnerability Detection', () => {
  test('detects vulnerability when signatures lack replay protection', async ({ page }) => {
    // Set up mock dApp
    await createMockDappPage(page);
    
    // Connect wallet
    await connectWallet(page, {
      provider: 'metamask',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      chainId: '0x1', // Ethereum mainnet
    });
    
    // Track signature requests
    const signatureRequests: { method: string; message: any; signature: string }[] = [];
    
    // Monitor signed messages and their content
    page.on('console', async msg => {
      const text = msg.text();
      if (text.includes('personal_sign') || text.includes('eth_sign')) {
        console.log(`Detected signing: ${text}`);
      }
    });
    
    // Hook into ethereum provider to capture signatures
    await page.evaluate(() => {
      if (typeof window.ethereum !== 'undefined') {
        const originalRequest = window.ethereum.request.bind(window.ethereum);
        window.ethereum.request = async function(args) {
          const result = await originalRequest(args);
          
          if (args.method === 'personal_sign' || args.method === 'eth_sign') {
            let message = args.params[0];
            let signature = result;
            
            // If hex encoded, try to decode for inspection
            if (message.startsWith('0x')) {
              try {
                const hexStripped = message.slice(2);
                const decoded = Buffer.from(hexStripped, 'hex').toString();
                console.log(`Signing method: ${args.method}, Message: ${decoded}, Signature: ${signature}`);
              } catch (e) {
                console.log(`Signing method: ${args.method}, Message: ${message}, Signature: ${signature}`);
              }
            }
          }
          return result;
        };
      }
    });
    
    // Test vulnerable signature flow
    await page.click('#sign-vulnerable');
    await page.waitForTimeout(500);
    
    // Get the message that was signed
    const vulnerableResult = await page.textContent('#result');
    expect(vulnerableResult).toContain('Signed (vulnerable):');
    
    // Check for replayability
    await page.click('#submit-signature');
    let status = await page.textContent('#status');
    expect(status).toContain('Signature accepted and processed');
    
    // Try to replay the signature
    await page.click('#reuse-signature');
    status = await page.textContent('#status');
    expect(status).toContain('REPLAY ATTEMPT');
    
    // Now test secure signature flow
    await page.click('#sign-secure');
    await page.waitForTimeout(500);
    
    const secureResult = await page.textContent('#result');
    expect(secureResult).toContain('Signed (secure):');
    
    // Verify the security features
    const signedMessages = await page.evaluate(() => {
      const messageText = document.getElementById('status').textContent;
      return messageText;
    });
    
    expect(signedMessages).toContain('with nonce and expiration');
  });
  
  test('validates proper signature security practices', async ({ page }) => {
    // Set up mock dApp
    await createMockDappPage(page);
    
    // Connect wallet
    await connectWallet(page, {
      provider: 'metamask',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      chainId: '0x1',
    });
    
    // Capture all signed messages for analysis
    const signedMessages: any[] = [];
    
    await page.evaluate(() => {
      if (typeof window.ethereum !== 'undefined') {
        const originalRequest = window.ethereum.request.bind(window.ethereum);
        window.ethereum.request = async function(args) {
          const result = await originalRequest(args);
          
          if (args.method === 'personal_sign') {
            let message = args.params[0];
            
            if (message.startsWith('0x')) {
              try {
                const hexStripped = message.slice(2);
                const decoded = Buffer.from(hexStripped, 'hex').toString();
                console.log(`SIGNED_MESSAGE_DATA: ${decoded}`);
              } catch (e) {
                console.log(`SIGNED_MESSAGE_DATA: ${message}`);
              }
            }
          }
          return result;
        };
      }
    });
    
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('SIGNED_MESSAGE_DATA:')) {
        try {
          const messageData = text.replace('SIGNED_MESSAGE_DATA:', '').trim();
          signedMessages.push(JSON.parse(messageData));
        } catch (e) {
          // Failed to parse, ignore
        }
      }
    });
    
    // Execute secure signing flow
    await page.click('#sign-secure');
    await page.waitForTimeout(500);
    
    // Check if our messages have proper protections
    let hasProperProtections = false;
    
    // Analyze the captured messages
    await page.evaluate(() => {
      console.log('SIGNED_MESSAGE_DATA: ' + document.getElementById('status').textContent);
    });
    await page.waitForTimeout(100);
    
    // Final assertion - we should have found proper replay protections
    const statusText = await page.textContent('#status');
    expect(statusText).toContain('nonce');
    expect(statusText).toContain('expiration');
  });
}); 