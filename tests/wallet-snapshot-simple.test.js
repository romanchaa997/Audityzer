/* global describe, it, expect, beforeEach, afterEach, jest */
// Wallet State Snapshot Simple Test
const { test, expect } = require('@playwright/test');
const {
  saveWalletState,
  restoreWalletState,
  setupMockEthereum,
} = require('./utils/wallet-snapshot');

test.describe('Wallet State Snapshot Simple Tests', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    // Create a new page
    page = await browser.newPage();

    // Just create a blank page - we don't need HTML
    await page.setContent('<html><body><div id="app"></div></body></html>');

    // Setup mock ethereum provider
    await setupMockEthereum(page);
  });

  test('Save and restore wallet state', async () => {
    // Get initial wallet state
    const initialAddress = await page.evaluate(() => window.ethereum.selectedAddress);
    const initialChainId = await page.evaluate(() => window.ethereum.chainId);

    // Verify initial state
    expect(initialAddress).toBe('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    expect(initialChainId).toBe('0x1');

    // Save the current wallet state
    const walletState = await saveWalletState(page, {
      testData: 'This is custom data that can be stored with the snapshot',
    });

    console.log('Saved wallet state:', walletState);

    // Verify saved state matches
    expect(walletState.selectedAddress).toBe('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    expect(walletState.chainId).toBe('0x1');
    expect(walletState.customData.testData).toBe(
      'This is custom data that can be stored with the snapshot'
    );

    // Disconnect wallet / change state
    await page.evaluate(() => {
      if (window.ethereum) {
        window.ethereum.selectedAddress = null;
      }
    });

    // Verify wallet is disconnected
    const disconnectedAddress = await page.evaluate(() => {
      return window.ethereum?.selectedAddress || null;
    });

    expect(disconnectedAddress).toBeNull();

    // Restore the previously saved state
    const restored = await restoreWalletState(page, walletState);
    expect(restored).toBe(true);

    // Verify the wallet state has been restored
    const restoredAddress = await page.evaluate(() => {
      return window.ethereum?.selectedAddress || null;
    });

    expect(restoredAddress).toBe('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');

    const restoredChainId = await page.evaluate(() => {
      return window.ethereum?.chainId || null;
    });

    expect(restoredChainId).toBe('0x1');
  });

  test('Chain switching and wallet state', async () => {
    // Switch to Goerli testnet
    await page.evaluate(async () => {
      if (window.ethereum && window.ethereum.request) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5' }], // Goerli
        });
      }
    });

    // Save the Goerli state
    const goerliState = await saveWalletState(page);

    // Verify we're on Goerli
    const chainId = await page.evaluate(() => {
      return window.ethereum?.chainId || null;
    });
    expect(chainId).toBe('0x5');

    // Switch to Polygon
    await page.evaluate(async () => {
      if (window.ethereum && window.ethereum.request) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x89' }], // Polygon
        });
      }
    });

    // Save the Polygon state
    const polygonState = await saveWalletState(page);
    expect(polygonState.chainId).toBe('0x89');

    // Switch back to Goerli by restoring the state
    await restoreWalletState(page, goerliState);

    // Verify we're back on Goerli
    const restoredChainId = await page.evaluate(() => {
      return window.ethereum?.chainId || null;
    });
    expect(restoredChainId).toBe('0x5');
  });

  test('Store transaction data with wallet state', async () => {
    // Mock sending a transaction
    const txHash = await page.evaluate(async () => {
      if (window.ethereum && window.ethereum.request) {
        return await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: window.ethereum.selectedAddress,
              to: '0x1234567890123456789012345678901234567890',
              value: '0x38D7EA4C68000', // 0.001 ETH in hex
            },
          ],
        });
      }
      return null;
    });

    // Verify transaction hash
    expect(txHash).toBe('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef');

    // Save the post-transaction state with transaction data
    const postTxState = await saveWalletState(page, {
      txHash,
      txComplete: true,
      amount: '0.001',
      recipient: '0x1234567890123456789012345678901234567890',
      testScenario: 'after withdrawal',
    });

    // Verify custom data was preserved
    expect(postTxState.customData.txHash).toBe(
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
    );
    expect(postTxState.customData.txComplete).toBe(true);
    expect(postTxState.customData.testScenario).toBe('after withdrawal');

    // Restore post-transaction state to a different state
    await page.evaluate(() => {
      if (window.ethereum) {
        window.ethereum.selectedAddress = '0x0000000000000000000000000000000000000000';
        window.ethereum.chainId = '0x89'; // Polygon
      }
    });

    // Verify state changed
    const changedAddress = await page.evaluate(() => window.ethereum.selectedAddress);
    expect(changedAddress).toBe('0x0000000000000000000000000000000000000000');

    // Restore back to post-transaction state
    await restoreWalletState(page, postTxState);

    // Verify state is restored
    const finalAddress = await page.evaluate(() => window.ethereum.selectedAddress);
    expect(finalAddress).toBe('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  });
});
