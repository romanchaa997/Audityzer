/**
 * Multi-Wallet Test Example
 *
 * This example demonstrates how to use the Audityzer wallet adapters
 * to test wallet interactions with multiple wallet providers.
 */

const { test, expect } = require('@playwright/test');
const { createWalletAdapter } = require('../src/core/wallet-adapter');

// Test with MetaMask wallet
test('should connect and send transaction with MetaMask', async ({ page }) => {
  // Create MetaMask adapter
  const metaMaskAdapter = createWalletAdapter('metamask', {
    autoApprove: true,
    mockAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  });

  // Navigate to the dApp
  await page.goto('http://localhost:3000');

  // Initialize the wallet adapter
  await metaMaskAdapter.initialize(page);

  // Connect the wallet
  const connection = await metaMaskAdapter.connect(page);

  // Verify connection
  expect(connection.isConnected).toBe(true);
  expect(connection.address).toBe('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');

  // Send a test transaction
  const txHash = await metaMaskAdapter.sendTransaction(page, {
    to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    value: '0x0',
    data: '0x',
  });

  // Verify transaction hash format
  expect(txHash).toMatch(/^0x[a-fA-F0-9]{64}$/);

  // Disconnect wallet
  const disconnected = await metaMaskAdapter.disconnect(page);
  expect(disconnected).toBe(true);
});

// Test with WalletConnect
test('should connect and sign message with WalletConnect', async ({ page }) => {
  // Create WalletConnect adapter
  const walletConnectAdapter = createWalletAdapter('walletconnect', {
    autoApprove: true,
    mockAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  });

  // Navigate to the dApp
  await page.goto('http://localhost:3000');

  // Initialize the wallet adapter
  await walletConnectAdapter.initialize(page);

  // Connect the wallet
  const connection = await walletConnectAdapter.connect(page);

  // Verify connection
  expect(connection.isConnected).toBe(true);
  expect(connection.address).toBe('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');

  // Sign a test message
  const message = 'Hello, Audityzer!';
  const signature = await walletConnectAdapter.signMessage(page, {
    message,
  });

  // Verify signature format
  expect(signature).toMatch(/^0x[a-fA-F0-9]{130}$/);

  // Disconnect wallet
  const disconnected = await walletConnectAdapter.disconnect(page);
  expect(disconnected).toBe(true);
});

// Test with Coinbase Wallet
test('should connect and switch networks with Coinbase Wallet', async ({ page }) => {
  // Create Coinbase Wallet adapter
  const coinbaseAdapter = createWalletAdapter('coinbase', {
    autoApprove: true,
    mockAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    chainId: '0x1', // Start on Ethereum Mainnet
  });

  // Navigate to the dApp
  await page.goto('http://localhost:3000');

  // Initialize the wallet adapter
  await coinbaseAdapter.initialize(page);

  // Connect the wallet
  const connection = await coinbaseAdapter.connect(page);

  // Verify connection
  expect(connection.isConnected).toBe(true);
  expect(connection.address).toBe('0x90F79bf6EB2c4f870365E785982E1f101E93b906');
  expect(connection.chainId).toBe('0x1');
  expect(connection.networkName).toBe('Ethereum Mainnet');

  // Switch to Polygon network
  const switched = await coinbaseAdapter.switchNetwork(page, {
    chainId: '0x89',
    networkName: 'Polygon Mainnet',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorerUrl: 'https://polygonscan.com',
    currencySymbol: 'MATIC',
  });

  // Verify network switch
  expect(switched).toBe(true);

  // Check current state to verify the network switch
  const state = await coinbaseAdapter.getState(page);
  expect(state.chainId).toBe('0x89');
  expect(state.networkName).toBe('Polygon Mainnet');

  // Disconnect wallet
  const disconnected = await coinbaseAdapter.disconnect(page);
  expect(disconnected).toBe(true);
});

// Test with multiple wallets in sequence (connection matrix)
test('wallet matrix: connect with multiple providers sequentially', async ({ page }) => {
  // Navigate to the dApp
  await page.goto('http://localhost:3000');

  // Define wallet configurations to test
  const walletConfigs = [
    { type: 'metamask', address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' },
    { type: 'walletconnect', address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC' },
    { type: 'coinbase', address: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' },
  ];

  // Test each wallet in sequence
  for (const config of walletConfigs) {

    // Create wallet adapter
    const walletAdapter = createWalletAdapter(config.type, {
      autoApprove: true,
      mockAddress: config.address,
    });

    // Initialize the wallet adapter
    await walletAdapter.initialize(page);

    // Connect the wallet
    const connection = await walletAdapter.connect(page);

    // Verify connection
    expect(connection.isConnected).toBe(true);
    expect(connection.address).toBe(config.address);

    // Refresh page to reset state for next wallet
    await page.reload();
  }
});
