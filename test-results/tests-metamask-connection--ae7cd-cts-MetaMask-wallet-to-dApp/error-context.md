# Test info

- Name: MetaMask Connection Test >> connects MetaMask wallet to dApp
- Location: F:\Ігор\web3-security-test-kit\tests\metamask-connection.test.ts:58:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('#connect-button')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('#connect-button')

    at F:\Ігор\web3-security-test-kit\tests\metamask-connection.test.ts:61:39
```

# Test source

```ts
   1 | // MetaMask connection test with TypeScript
   2 | import { test, expect, type Page, type Browser } from '@playwright/test';
   3 |
   4 | // Test configuration
   5 | const WALLET_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
   6 | const WALLET_NAME = 'Test Wallet';
   7 | const NETWORK_NAME = 'Ethereum';
   8 |
   9 | // Extend window with ethereum type
  10 | declare global {
  11 |   interface Window {
  12 |     ethereum: {
  13 |       isMetaMask: boolean;
  14 |       selectedAddress: string | null;
  15 |       request: (args: { method: string; params?: any[] }) => Promise<any>;
  16 |       on: (eventName: string, callback: (...args: any[]) => void) => void;
  17 |     };
  18 |   }
  19 | }
  20 |
  21 | test.describe('MetaMask Connection Test', () => {
  22 |   let page: Page;
  23 |
  24 |   test.beforeEach(async ({ browser }: { browser: Browser }) => {
  25 |     // Create a new page
  26 |     page = await browser.newPage();
  27 |
  28 |     // Mock the ethereum provider before navigating to the page
  29 |     await page.addInitScript(() => {
  30 |       window.ethereum = {
  31 |         isMetaMask: true,
  32 |         selectedAddress: null,
  33 |         request: async ({ method }) => {
  34 |           console.log(`MetaMask mock: ${method} called`);
  35 |           if (method === 'eth_requestAccounts') {
  36 |             window.ethereum.selectedAddress = '0x1234567890abcdef1234567890abcdef12345678';
  37 |             // Dispatch connection event
  38 |             window.dispatchEvent(new Event('ethereum#initialized'));
  39 |             return ['0x1234567890abcdef1234567890abcdef12345678'];
  40 |           }
  41 |           return null;
  42 |         },
  43 |         on: (eventName, callback) => {
  44 |           console.log(`MetaMask mock: registered event listener for ${eventName}`);
  45 |           window.addEventListener('ethereum#initialized', () => {
  46 |             if (eventName === 'accountsChanged') {
  47 |               callback(['0x1234567890abcdef1234567890abcdef12345678']);
  48 |             }
  49 |           });
  50 |         }
  51 |       };
  52 |     });
  53 |
  54 |     // Navigate to the test page or use a blank page
  55 |     await page.goto('about:blank');
  56 |   });
  57 |
  58 |   test('connects MetaMask wallet to dApp', async () => {
  59 |     // Find and click the "Connect Wallet" button
  60 |     const connectWalletButton = await page.locator('#connect-button');
> 61 |     await expect(connectWalletButton).toBeVisible();
     |                                       ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  62 |     await connectWalletButton.click();
  63 |
  64 |     // Wait for wallet info to be displayed
  65 |     const walletInfo = await page.locator('#wallet-info');
  66 |     await expect(walletInfo).toBeVisible();
  67 |
  68 |     // Check if wallet address is displayed correctly
  69 |     const walletAddressElement = await page.locator('.wallet-address');
  70 |     await expect(walletAddressElement).toContainText(WALLET_ADDRESS.substring(0, 10));
  71 |
  72 |     // Take a screenshot for documentation
  73 |     await page.screenshot({ path: 'media/metamask-connection-test.png' });
  74 |
  75 |     console.log('MetaMask connection test completed successfully!');
  76 |   });
  77 | });
```
