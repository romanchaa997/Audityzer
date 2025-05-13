// bridge-transfer.test.ts
import { test, expect } from '@playwright/test';
import { simulateBridgeTransfer, getBridgeHistory, setupBridgeProviders } from './utils/bridgeMock';
import { connectWallet } from './utils/walletMock';

test.describe('Cross-chain bridge transfer tests', () => {
  test.beforeEach(async ({ page }) => {
    // First connect a wallet - most bridges need wallet connection
    await connectWallet(page, { provider: 'metamask' });

    // Setup bridge providers
    await setupBridgeProviders(page);
  });

  test('Cross-chain asset transfer (LayerZero)', async ({ page }) => {
    const result = await simulateBridgeTransfer(page, {
      bridge: 'layerzero',
      fromChain: 'Ethereum',
      toChain: 'Arbitrum',
      token: 'USDC',
      amount: 100,
    });

    expect(result.success).toBe(true);
    expect(result.confirmations).toBeGreaterThanOrEqual(1);
    expect(result.transactionHash).toMatch(/^0x[a-fA-F0-9]{64}$/);
    expect(result.fromChain).toBe('Ethereum');
    expect(result.toChain).toBe('Arbitrum');
  });

  test('Multi-chain token transfer (LayerZero)', async ({ page }) => {
    // First transfer - Ethereum to Arbitrum
    const result1 = await simulateBridgeTransfer(page, {
      bridge: 'layerzero',
      fromChain: 'Ethereum',
      toChain: 'Arbitrum',
      token: 'USDC',
      amount: 50,
    });

    expect(result1.success).toBe(true);

    // Second transfer - Arbitrum to Optimism
    const result2 = await simulateBridgeTransfer(page, {
      bridge: 'layerzero',
      fromChain: 'Arbitrum',
      toChain: 'Optimism',
      token: 'USDC',
      amount: 25,
    });

    expect(result2.success).toBe(true);

    // Check bridge history
    const history = await getBridgeHistory(page);
    expect(history.length).toBeGreaterThanOrEqual(2);
    expect(history[0].fromChain).toBe('Ethereum');
    expect(history[0].toChain).toBe('Arbitrum');
    expect(history[1].fromChain).toBe('Arbitrum');
    expect(history[1].toChain).toBe('Optimism');
  });

  test('Fails if destination chain unresponsive (LayerZero)', async ({ page }) => {
    const result = await simulateBridgeTransfer(page, {
      bridge: 'layerzero',
      fromChain: 'Ethereum',
      toChain: 'Arbitrum',
      token: 'USDC',
      amount: 100,
      simulateFailure: true,
      failureReason: 'Destination chain unresponsive',
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('unresponsive');
  });

  test('Cross-chain asset transfer (Wormhole)', async ({ page }) => {
    const result = await simulateBridgeTransfer(page, {
      bridge: 'wormhole',
      fromChain: 'Ethereum',
      toChain: 'Polygon',
      token: 'ETH',
      amount: 1,
    });

    expect(result.success).toBe(true);
    expect(result.confirmations).toBeGreaterThanOrEqual(1);
    expect(result.transactionHash).toMatch(/^0x[a-fA-F0-9]{64}$/);
    expect(result.fromChain).toBe('Ethereum');
    expect(result.toChain).toBe('Polygon');
  });

  test('Fails if destination chain unresponsive (Wormhole)', async ({ page }) => {
    const result = await simulateBridgeTransfer(page, {
      bridge: 'wormhole',
      fromChain: 'Ethereum',
      toChain: 'Polygon',
      token: 'ETH',
      amount: 1,
      simulateFailure: true,
      failureReason: 'Guardian validation timeout',
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('Guardian validation');
  });

  test('Interoperability with wallet state (LayerZero)', async ({ page }) => {
    // First connect a specific wallet
    await connectWallet(page, {
      provider: 'metamask',
      chainId: '0x1', // Ethereum Mainnet
      address: '0xSpecificAddress1234567890abcdef1234567890abcdef',
    });

    // Perform bridge transfer
    const result = await simulateBridgeTransfer(page, {
      bridge: 'layerzero',
      fromChain: 'Ethereum',
      toChain: 'Arbitrum',
      token: 'USDC',
      amount: 100,
    });

    expect(result.success).toBe(true);
    expect(result.senderAddress).toBe('0xSpecificAddress1234567890abcdef1234567890abcdef');
  });

  test('Low gas scenario handling (LayerZero)', async ({ page }) => {
    const result = await simulateBridgeTransfer(page, {
      bridge: 'layerzero',
      fromChain: 'Ethereum',
      toChain: 'Arbitrum',
      token: 'USDC',
      amount: 100,
      gasOptions: {
        lowGas: true,
        maxGas: '100000',
      },
    });

    expect(result.success).toBe(true);
    expect(result.gasUsed).toBeLessThanOrEqual(100000);
  });
});
