// @ts-nocheck
import { test, expect, Page } from '@playwright/test';
import { connectWallet, getWalletState } from '../../tests/utils/walletMock';

/**
 * Security bug: Phishing via eth_sign Misuse
 *
 * Vulnerability explanation:
 * The eth_sign method can be abused to trick users into signing messages that look like
 * regular authentication prompts but can be used for malicious purposes like wallet draining.
 * This happens when:
 * 1. Unstructured data is passed to eth_sign instead of using personal_sign or EIP-712
 * 2. No clear prefix to indicate what's being signed
 * 3. The message could be mistakenly used as transaction data
 *
 * This test checks for:
 * - Use of eth_sign with non-prefixed messages
 * - Lack of proper message formatting (no prefix)
 * - Potential message phishing patterns
 */

// Create a mock dApp page for testing
async function createMockDappPage(page: Page) {
  await page.setContent(`
    <html>
      <body>
        <h1>Test dApp</h1>
        <button id="connect-wallet">Connect Wallet</button>
        <button id="login-button">Login to dApp</button>
        <button id="claim-button">Claim Free NFT</button>
        <button id="sign-button">Sign Message</button>
        <div id="result"></div>
        
        <script>
          // Mock implementation
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

          document.getElementById('login-button').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                // INSECURE: Using eth_sign for login without proper prefix
                const account = (await window.ethereum.request({ method: 'eth_accounts' }))[0];
                const message = "Login to access your account";
                
                const signature = await window.ethereum.request({
                  method: 'eth_sign',
                  params: [account, message]
                });
                
                document.getElementById('result').textContent = 'Signed: ' + signature;
              } catch (error) {
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            }
          });

          document.getElementById('claim-button').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                // INSECURE: Potentially misleading message without standard prefix
                const account = (await window.ethereum.request({ method: 'eth_accounts' }))[0];
                const message = "Claim your free NFT! Click to authorize.";
                
                const signature = await window.ethereum.request({
                  method: 'eth_sign',
                  params: [account, message]
                });
                
                document.getElementById('result').textContent = 'Claimed with signature: ' + signature;
              } catch (error) {
                document.getElementById('result').textContent = 'Error: ' + error.message;
              }
            }
          });

          document.getElementById('sign-button').addEventListener('click', async () => {
            if (window.ethereum) {
              try {
                // Secure: Using personal_sign with proper prefix
                const account = (await window.ethereum.request({ method: 'eth_accounts' }))[0];
                const message = "I authorize this application to perform actions on my behalf.";
                
                // Convert to hex
                const hexMsg = '0x' + Buffer.from(message).toString('hex');
                
                const signature = await window.ethereum.request({
                  method: 'personal_sign',
                  params: [hexMsg, account]
                });
                
                document.getElementById('result').textContent = 'Securely signed: ' + signature;
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

function isHexString(value: string): boolean {
  return /^0x[0-9a-f]+$/i.test(value);
}

// Mock signature validator
function isValidSignature(message: string, signature: string): boolean {
  // In a real scenario, this would validate the signature cryptographically
  return signature.startsWith('0x') && signature.length === 132;
}

test.describe('Phishing via eth_sign Misuse Detection', () => {
  test('detects misuse of eth_sign with unstructured data', async ({ page }) => {
    // Set up a mock dApp page
    await createMockDappPage(page);

    // Connect wallet with mock
    await connectWallet(page, {
      provider: 'metamask',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      chainId: '0x1', // Ethereum mainnet
    });

    // Intercept eth_sign calls
    const ethSignCalls: { method: string; params: any[] }[] = [];

    await page.route('**/*', async route => {
      const request = route.request();
      if (request.method() === 'POST') {
        try {
          const postDataStr = request.postData();
          if (postDataStr) {
            const postData = JSON.parse(postDataStr);
            if (postData.method === 'eth_sign') {
              ethSignCalls.push({
                method: postData.method,
                params: postData.params,
              });
              console.log('Detected eth_sign call with params:', postData.params);
            }
          }
        } catch (e) {
          // Not a JSON payload, ignore
        }
      }
      await route.continue();
    });

    // Monitor console for suspicious wallet requests
    const ethRequests: { method: string; params: any[] }[] = [];
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('eth_sign')) {
        console.log(`Console message: ${text}`);
        try {
          // Try to extract the request details
          const match = text.match(/eth_sign called with params: (.+)/);
          if (match && match[1]) {
            const params = JSON.parse(match[1]);
            ethRequests.push({ method: 'eth_sign', params });
          }
        } catch (e) {
          // Failed to parse, ignore
        }
      }
    });

    // Evaluate client-side requests directly
    await page.evaluate(() => {
      if (typeof window.ethereum !== 'undefined') {
        const originalRequest = window.ethereum.request.bind(window.ethereum);
        window.ethereum.request = async function(args) {
          if (args.method === 'eth_sign') {
            console.log(`eth_sign called with params: ${JSON.stringify(args.params)}`);
          }
          return originalRequest(args);
        };
      } else {
        console.error('Ethereum provider is not available.');
      }
    });

    await page.click('#login-button');
    await page.waitForTimeout(500);
    
    const resultText = await page.textContent('#result');
    expect(resultText).toContain('Signed:');

    // Analyze eth_sign requests collected from our monitoring
    let phishingDetected = false;

    // Combine all observed eth_sign calls
    const allEthSignCalls = [...ethSignCalls, ...ethRequests];

    for (const call of allEthSignCalls) {
      if (call.method === 'eth_sign' && call.params.length >= 2) {
        const address = call.params[0];
        const message = call.params[1];

        // Check 1: Message should be prefixed or hex-encoded
        const isHex = isHexString(message);
        const isProperlyPrefixed = isHex || message.startsWith('\u0019Ethereum Signed Message:\n');

        // Check 2: Common phishing patterns in message content
        const messageStr = isHex ? Buffer.from(message.slice(2), 'hex').toString() : message;
        const phishingPatterns = [
          /free nft/i,
          /claim your/i,
          /airdrop/i,
          /login to/i,
          /authorize.+access/i,
          /connect.+account/i,
        ];

        const containsPhishingPattern = phishingPatterns.some(pattern => pattern.test(messageStr));

        // Detect potential phishing
        if (!isProperlyPrefixed && containsPhishingPattern) {
          phishingDetected = true;
          console.log('VULNERABILITY DETECTED: Potential phishing via eth_sign');
          console.log(`Message: ${messageStr}`);
          console.log('Improper use of eth_sign without standard prefix');
        }
      }
    }

    // Final assertion - we should have detected the phishing attempt
    expect(phishingDetected).toBeTruthy();
  });

  test('validates secure message signing practices', async ({ page }) => {
    // Set up a mock dApp page
    await createMockDappPage(page);

    // Connect wallet with mock
    await connectWallet(page, {
      provider: 'metamask',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      chainId: '0x1', // Ethereum mainnet
    });

    // Monitor ethereum requests for proper signing methods
    const signRequests: { method: string; params: any[] }[] = [];
    await page.evaluate(() => {
      if (typeof window.ethereum !== 'undefined') {
        const originalRequest = window.ethereum.request.bind(window.ethereum);
        window.ethereum.request = async function(args) {
          if (
            args.method === 'personal_sign' ||
            args.method === 'eth_sign' ||
            args.method === 'eth_signTypedData' ||
            args.method === 'eth_signTypedData_v4'
          ) {
            console.log(`SIGN_METHOD: ${args.method} with params: ${JSON.stringify(args.params)}`);
          }
          return originalRequest(args);
        };
      }
    });

    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('SIGN_METHOD:')) {
        try {
          const methodMatch = text.match(/SIGN_METHOD: ([^ ]+)/);
          const paramsMatch = text.match(/with params: (.+)/);
          if (methodMatch && paramsMatch) {
            const method = methodMatch[1];
            const params = JSON.parse(paramsMatch[1]);
            signRequests.push({ method, params });
          }
        } catch (e) {
          // Failed to parse, ignore
        }
      }
    });

    // Trigger secure signing flow
    await page.click('#sign-button');
    await page.waitForTimeout(500);

    // Verify that proper method was used
    let usedSecureMethod = false;

    for (const request of signRequests) {
      // Check for secure signing methods
      if (
        request.method === 'personal_sign' ||
        request.method === 'eth_signTypedData' ||
        request.method === 'eth_signTypedData_v4'
      ) {
        usedSecureMethod = true;
      }
    }

    expect(usedSecureMethod).toBe(true);
  });
});
