import { test, expect, chromium, BrowserContext, Page } from '@playwright/test';
import path from 'path';

// Configuration
// eslint-disable-next-line no-unused-vars
const WALLET_ADDRESS = '{{wallet}}';
const METAMASK_EXTENSION_PATH = path.join(__dirname, '../extensions/metamask'); // Update this path
const DAPP_URL = 'https://your-dapp-url.com'; // Replace with your dApp URL

test.describe('MetaMask Extension Connection Test', () => {
  let context: BrowserContext;
  let page: Page;
  let extensionId: string;

  test.beforeAll(async () => {
    // Launch browser with MetaMask extension
    context = await chromium.launchPersistentContext('', {
      headless: false, // MetaMask extension doesn't work in headless mode
      args: [
        `--disable-extensions-except=${METAMASK_EXTENSION_PATH}`,
        `--load-extension=${METAMASK_EXTENSION_PATH}`,
      ],
    });

    // Get the extension ID
    const backgroundPages = context.backgroundPages();
    const extensionPage = backgroundPages.find(page =>
      page.url().includes('/_generated_background_page.html')
    );

    if (!extensionPage) {
      throw new Error('Extension background page not found');
    }

    // Extract the extension ID from the URL
    extensionId = extensionPage.url().split('/')[2];
    console.log(`MetaMask extension ID: ${extensionId}`);
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('connect to dApp via MetaMask extension', async () => {
    // Step 1: Open MetaMask extension popup page
    const extensionPopup = await context.newPage();
    await extensionPopup.goto(`chrome-extension://${extensionId}/popup.html`);

    // Step 2: Unlock MetaMask (assuming it's already set up)
    await extensionPopup.fill('input[type="password"]', 'your-metamask-password'); // Replace with actual password
    await extensionPopup.click('button[type="submit"]');

    // Wait for unlock to complete
    await extensionPopup.waitForSelector('.account-menu__icon');

    // Step 3: Navigate to your dApp
    page = await context.newPage();
    await page.goto(DAPP_URL);

    // Step 4: Click the "Connect Wallet" button on your dApp
    await page.click('#connect-wallet-button'); // Replace with your dApp's connect button selector

    // Step 5: Switch to MetaMask notification popup to approve the connection
    const pages = context.pages();
    const popupPage = pages.find(p =>
      p.url().includes(`chrome-extension://${extensionId}/notification.html`)
    );

    if (!popupPage) {
      throw new Error('MetaMask notification popup not found');
    }

    // Step 6: Click the "Connect" button in MetaMask popup
    await popupPage.click('.permission-approval-container button.btn-primary');

    // Step 7: Verify connection on the dApp
    await page.waitForSelector('.wallet-address'); // Replace with your dApp's wallet address display selector
    const displayedAddress = await page.textContent('.wallet-address');

    // Verify the wallet address is displayed correctly (partial match for privacy)
    expect(displayedAddress).toContain(WALLET_ADDRESS.substring(0, 10));

    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/metamask-extension-connection.png' });

    console.log('MetaMask connection test completed successfully!');
  });
});
