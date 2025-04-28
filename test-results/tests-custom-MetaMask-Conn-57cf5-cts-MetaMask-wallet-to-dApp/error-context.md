# Test info

- Name: MetaMask Connection Test >> connects MetaMask wallet to dApp
- Location: F:\Ігор\web3-security-test-kit\tests\custom.test.js:46:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('#connect-button')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('#connect-button')

    at F:\Ігор\web3-security-test-kit\tests\custom.test.js:49:39
```

# Page snapshot

```yaml
- heading "Mock DApp" [level=1]
- button "Connect Wallet"
- paragraph: 'Connected wallet: 0x1234567890abcdef1234567890abcdef12345678'
```

# Test source

```ts
   1 | // MetaMask connection test
   2 | const { test, expect } = require('@playwright/test');
   3 |
   4 | // Test configuration
   5 | const WALLET_ADDRESS = '0xYOUR_ADDRESS';
   6 | const WALLET_NAME = 'My Wallet';
   7 | const NETWORK_NAME = 'Ethereum';
   8 |
   9 | test.describe('MetaMask Connection Test', () => {
  10 |   let page;
  11 |
  12 |   test.beforeEach(async ({ browser }) => {
  13 |     // Create a new page
  14 |     page = await browser.newPage();
  15 |
  16 |     // Mock the ethereum provider before navigating to the page
  17 |     await page.addInitScript(() => {
  18 |       window.ethereum = {
  19 |         isMetaMask: true,
  20 |         selectedAddress: null,
  21 |         request: async ({ method }) => {
  22 |           console.log(`MetaMask mock: ${method} called`);
  23 |           if (method === 'eth_requestAccounts') {
  24 |             window.ethereum.selectedAddress = '0xYOUR_ADDRESS';
  25 |             // Dispatch connection event
  26 |             window.dispatchEvent(new Event('ethereum#initialized'));
  27 |             return ['0xYOUR_ADDRESS'];
  28 |           }
  29 |           return null;
  30 |         },
  31 |         on: (eventName, callback) => {
  32 |           console.log(`MetaMask mock: registered event listener for ${eventName}`);
  33 |           window.addEventListener('ethereum#initialized', () => {
  34 |             if (eventName === 'accountsChanged') {
  35 |               callback(['0xYOUR_ADDRESS']);
  36 |             }
  37 |           });
  38 |         }
  39 |       };
  40 |     });
  41 |
  42 |     // Navigate to the test page or use a blank page
  43 |     await page.goto('about:blank');
  44 |   });
  45 |
  46 |   test('connects MetaMask wallet to dApp', async () => {
  47 |     // Find and click the "Connect Wallet" button
  48 |     const connectWalletButton = await page.locator('#connect-button');
> 49 |     await expect(connectWalletButton).toBeVisible();
     |                                       ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  50 |     await connectWalletButton.click();
  51 |
  52 |     // Wait for wallet info to be displayed
  53 |     const walletInfo = await page.locator('#wallet-info');
  54 |     await expect(walletInfo).toBeVisible();
  55 |
  56 |     // Check if wallet address is displayed correctly
  57 |     const walletAddressElement = await page.locator('.wallet-address');
  58 |     await expect(walletAddressElement).toContainText(WALLET_ADDRESS.substring(0, 10));
  59 |
  60 |     // Take a screenshot for documentation
  61 |     await page.screenshot({ path: 'media/metamask-connection-test.png' });
  62 |
  63 |     console.log('MetaMask connection test completed successfully!');
  64 |   });
  65 | });
```
