# Audityzer Test Templates

This directory contains comprehensive test templates for Web3 wallet interactions and cross-chain bridge transfers, focusing on the most widely used providers.

## Wallet Interaction Tests

The `wallet-interaction.test.ts` file provides a complete suite of tests for the most widely used wallets:

- MetaMask
- WalletConnect
- Coinbase Wallet

### Key Test Scenarios

1. **Wallet Connection**: Tests connecting each wallet type to a dApp
2. **Wallet Switching**: Tests switching between different wallet providers
3. **Network Switching**: Tests changing networks within a connected wallet
4. **Transaction Tests**: Tests sending transactions through different wallets

### Example Usage

```typescript
// Basic wallet connection test
test('Connect MetaMask wallet', async ({ page }) => {
  await connectWallet(page, { provider: 'metamask' });
  const state = await getWalletState(page);
  expect(state.connected).toBe(true);
});
```

## Bridge Transfer Tests

The `bridge-transfer.test.ts` file demonstrates how to test cross-chain bridge transfers, focusing on:

- LayerZero
- Wormhole

### Key Test Scenarios

1. **Basic Transfers**: Tests moving assets from one chain to another
2. **Multi-Chain Transfers**: Tests moving assets across multiple chains
3. **Error Handling**: Tests failure scenarios and error states
4. **Performance**: Tests gas optimization scenarios

### Example Usage

```typescript
// Basic bridge transfer test
test('Bridge USDC from Ethereum to Arbitrum', async ({ page }) => {
  await connectWallet(page, { provider: 'metamask' });
  await setupBridgeProviders(page);

  const result = await simulateBridgeTransfer(page, {
    bridge: 'layerzero',
    fromChain: 'Ethereum',
    toChain: 'Arbitrum',
    token: 'USDC',
    amount: 100,
  });

  expect(result.success).toBe(true);
});
```

## Mock Utilities

The tests are powered by two key mock utility files:

### Wallet Mock (`walletMock.ts`)

Functions for simulating wallet behavior:

- `connectWallet`: Connect a specified wallet to the dApp
- `getWalletState`: Get current wallet connection state
- `switchWallet`: Switch between different wallet providers
- `switchNetwork`: Change the connected network
- `disconnectWallet`: Disconnect the currently connected wallet
- `sendTransaction`: Simulate sending a transaction

### Bridge Mock (`bridgeMock.ts`)

Functions for simulating bridge operations:

- `setupBridgeProviders`: Initialize bridge provider mocks
- `simulateBridgeTransfer`: Simulate a cross-chain transfer
- `getBridgeHistory`: Get the history of bridge transfers
- `clearBridgeHistory`: Clear the bridge history
- `getBridgeProviderInfo`: Get information about a bridge provider

## Type Support

The `types.d.ts` file adds TypeScript type support for the custom window objects used by the mocks.

## Usage in Your Tests

1. Copy these files to your project
2. Import the required utilities
3. Use the templates as a starting point for your tests

## Examples

See `wallet-interaction.test.ts` and `bridge-transfer.test.ts` for complete examples of how to use these utilities to create comprehensive test suites for Web3 applications.
