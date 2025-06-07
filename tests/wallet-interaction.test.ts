// wallet-interaction.test.ts
import { test, expect } from '@playwright/test';
import {
  connectWallet,
  getWalletState,
  switchWallet,
  switchNetwork,
  disconnectWallet,
  sendTransaction,
} from './utils/walletMock.js';

test.describe('Wallet connection tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dApp
    await page.goto('https://your-dapp.com');
  });

  test('Connects to dApp via MetaMask', async ({ page }) => {
    await connectWallet(page, { provider: 'metamask' });
    const state = await getWalletState(page);
    expect(state.connected).toBe(true);
    expect(state.address).toMatch(/^0x/);
    expect(state.provider).toBe('metamask');
    expect(state.chainId).toBe('0x1'); // Ethereum Mainnet by default
  });

  test('Connects to dApp via WalletConnect', async ({ page }) => {
    await connectWallet(page, { provider: 'walletconnect' });
    const state = await getWalletState(page);
    expect(state.connected).toBe(true);
    expect(state.address).toMatch(/^0x/);
    expect(state.provider).toBe('walletconnect');
  });

  test('Connects to dApp via Coinbase Wallet', async ({ page }) => {
    await connectWallet(page, { provider: 'coinbase' });
    const state = await getWalletState(page);
    expect(state.connected).toBe(true);
    expect(state.address).toMatch(/^0x/);
    expect(state.provider).toBe('coinbase');
  });

  test('Fails gracefully with disconnected wallet', async ({ page }) => {
    const state = await getWalletState(page); // no connect
    expect(state.connected).toBe(false);
    expect(state.address).toBeNull();
  });
});

test.describe('Wallet switching tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://your-dapp.com');
    // Connect with MetaMask initially
    await connectWallet(page, {
      provider: 'metamask',
      address: '0xMetaMask1234567890abcdef1234567890abcdef',
    });
  });

  test('Switches from MetaMask to WalletConnect', async ({ page }) => {
    // Verify initial connection
    let state = await getWalletState(page);
    expect(state.provider).toBe('metamask');
    expect(state.address).toContain('0xMetaMask');

    // Switch to WalletConnect
    await switchWallet(page, {
      provider: 'walletconnect',
      address: '0xWalletConnect1234567890abcdef1234567890abcdef',
    });

    // Verify the switch
    state = await getWalletState(page);
    expect(state.provider).toBe('walletconnect');
    expect(state.address).toContain('0xWalletConnect');
    expect(state.connected).toBe(true);
  });

  test('Switches from MetaMask to Coinbase Wallet', async ({ page }) => {
    // Verify initial connection
    let state = await getWalletState(page);
    expect(state.provider).toBe('metamask');

    // Switch to Coinbase
    await switchWallet(page, {
      provider: 'coinbase',
      address: '0xCoinbase1234567890abcdef1234567890abcdef',
    });

    // Verify the switch
    state = await getWalletState(page);
    expect(state.provider).toBe('coinbase');
    expect(state.address).toContain('0xCoinbase');
    expect(state.connected).toBe(true);
  });

  test('Handles wallet disconnection properly', async ({ page }) => {
    // Verify initial connection
    let state = await getWalletState(page);
    expect(state.connected).toBe(true);

    // Disconnect wallet
    await disconnectWallet(page);

    // Verify disconnection
    state = await getWalletState(page);
    expect(state.connected).toBe(false);
    expect(state.address).toBeNull();
  });
});

test.describe('Network switching tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://your-dapp.com');
    // Connect with MetaMask on Ethereum Mainnet
    await connectWallet(page, {
      provider: 'metamask',
      chainId: '0x1', // Ethereum Mainnet
    });
  });

  test('Switches networks within MetaMask', async ({ page }) => {
    // Verify initial network
    let state = await getWalletState(page);
    expect(state.chainId).toBe('0x1'); // Ethereum Mainnet

    // Switch to Polygon
    await switchNetwork(page, { chainId: '0x89' }); // Polygon

    // Verify network switch
    state = await getWalletState(page);
    expect(state.chainId).toBe('0x89');
    expect(state.networkName).toContain('Polygon');
  });

  test('Handles switching to Arbitrum network', async ({ page }) => {
    // Switch to Arbitrum
    await switchNetwork(page, { chainId: '0xa4b1' }); // Arbitrum One

    // Verify network switch
    const state = await getWalletState(page);
    expect(state.chainId).toBe('0xa4b1');
    expect(state.networkName).toContain('Arbitrum');
  });

  test('Handles switching to Optimism network', async ({ page }) => {
    // Switch to Optimism
    await switchNetwork(page, { chainId: '0xa' }); // Optimism

    // Verify network switch
    const state = await getWalletState(page);
    expect(state.chainId).toBe('0xa');
    expect(state.networkName).toContain('Optimism');
  });

  test('Handles network switching failure gracefully', async ({ page }) => {
    try {
      // Try switching to a non-existent network
      await switchNetwork(page, {
        chainId: '0xffff', // Invalid network
        expectError: true,
      });
      // Should not reach here if expectError is true
      expect(false).toBe(true);
    } catch (error) {
      expect(error.message).toContain('network');
      // Verify we're still on the original network
      const state = await getWalletState(page);
      expect(state.chainId).toBe('0x1');
    }
  });
});

test.describe('Transaction tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://your-dapp.com');
    // Connect with MetaMask on Ethereum Mainnet
    await connectWallet(page, { provider: 'metamask' });
  });

  test('Sends a successful transaction with MetaMask', async ({ page }) => {
    const txResult = await sendTransaction(page, {
      to: '0x1234567890123456789012345678901234567890',
      value: '0.01',
      gasLimit: '21000',
    });

    expect(txResult.success).toBe(true);
    expect(txResult.hash).toMatch(/^0x[a-fA-F0-9]{64}$/);
    expect(txResult.confirmations).toBeGreaterThanOrEqual(1);
  });

  test('Sends a successful transaction with WalletConnect', async ({ page }) => {
    // Switch to WalletConnect
    await switchWallet(page, { provider: 'walletconnect' });

    const txResult = await sendTransaction(page, {
      to: '0x1234567890123456789012345678901234567890',
      value: '0.01',
    });

    expect(txResult.success).toBe(true);
    expect(txResult.hash).toMatch(/^0x[a-fA-F0-9]{64}$/);
  });

  test('Handles transaction rejection', async ({ page }) => {
    const txResult = await sendTransaction(page, {
      to: '0x1234567890123456789012345678901234567890',
      value: '0.01',
      simulateRejection: true,
    });

    expect(txResult.success).toBe(false);
    expect(txResult.error).toContain('rejected');
  });

  test('Handles transaction failure due to gas issues', async ({ page }) => {
    const txResult = await sendTransaction(page, {
      to: '0x1234567890123456789012345678901234567890',
      value: '1000', // More than the wallet has
      simulateFailure: true,
      failureReason: 'insufficient funds',
    });

    expect(txResult.success).toBe(false);
    expect(txResult.error).toContain('insufficient funds');
  });
});
