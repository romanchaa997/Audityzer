# Wallet Provider Implementations

This directory contains implementations of wallet providers that can be used for testing Web3 dApps.

## Available Providers

### WalletConnect Provider

`walletconnect-provider.js` implements a simulated WalletConnect provider that mimics the behavior of the actual WalletConnect protocol, including:

- QR code session handling
- Mobile linking behavior
- JSON-RPC method support
- Event emission for connection state changes

### Coinbase Wallet Provider

`coinbase-provider.js` implements a simulated Coinbase Wallet provider that mimics the behavior of the actual Coinbase Wallet, including:

- Mobile/desktop URI generation
- Coinbase Wallet specific JSON-RPC methods
- UI integration simulation
- Mobile deep linking

## Usage

These providers are automatically used by the wallet adapters in `src/core/wallet-adapter.ts`, but you can also use them directly in your tests:

```javascript
const { WalletConnectProvider } = require('./walletconnect-provider.js');
const { CoinbaseWalletProvider } = require('./coinbase-provider.js');

// Create a WalletConnect provider
const wcProvider = new WalletConnectProvider({
  projectId: 'your-project-id',
  autoApprove: true, // Auto-approve connection/transaction requests
  mockAddress: '0x1234...', // Use a specific address for testing
});

// Initialize the provider
await wcProvider.init();

// Create a Coinbase Wallet provider
const cbProvider = new CoinbaseWalletProvider({
  appName: 'Your App Name',
  autoApprove: true,
  mockAddress: '0x1234...',
});

// Initialize the provider
await cbProvider.init();

// Use the provider like any EIP-1193 provider
const accounts = await wcProvider.request({ method: 'eth_requestAccounts' });
console.log(accounts);

const txHash = await cbProvider.request({
  method: 'eth_sendTransaction',
  params: [
    {
      from: cbProvider.selectedAddress,
      to: '0x1234...',
      value: '0x0',
    },
  ],
});
console.log(txHash);
```

## Advanced Features

### State Management

Both providers include methods for capturing and restoring state:

```javascript
// Save the current state
const state = provider.captureState();

// Restore a previously saved state
provider.restoreState(state);
```

### Event Handling

You can listen for events from the providers:

```javascript
provider.on('connect', connectInfo => {
  console.log('Connected!', connectInfo);
});

provider.on('accountsChanged', accounts => {
  console.log('Accounts changed:', accounts);
});

provider.on('chainChanged', chainId => {
  console.log('Chain changed:', chainId);
});

provider.on('disconnect', error => {
  console.log('Disconnected!', error);
});
```

### Testing Rejection Scenarios

You can simulate user rejections by setting `autoApprove: false`:

```javascript
const provider = new WalletConnectProvider({
  autoApprove: false,
});

try {
  await provider.request({ method: 'eth_requestAccounts' });
} catch (error) {
  console.log('User rejected the connection request:', error.message);
}
```

## Integration with Playwright

These providers are designed to work seamlessly with Playwright for browser automation. See the examples in the `tests/` directory for more details.
