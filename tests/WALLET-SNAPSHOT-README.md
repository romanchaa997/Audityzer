# Wallet State Snapshot Testing

This directory contains tests that demonstrate how to save and restore wallet state during testing, which is useful for:

1. Setting up specific wallet conditions for tests
2. Capturing the state before/after actions
3. Testing state transitions
4. Saving important data alongside the wallet state

## Available Tests

- `wallet-snapshot-simple.test.js` - Clean, reliable tests focused on wallet state functionality
- `wallet-snapshot.test.js` - More complex examples with UI interactions (currently needs fixing)

## How to Run

```bash
# Run the simplified wallet snapshot tests
npx playwright test tests/wallet-snapshot-simple.test.js

# Run the full wallet snapshot tests (when fixed)
npx playwright test tests/wallet-snapshot.test.js
```

## Core Wallet Snapshot Functions

### `saveWalletState(page, customData = {})`

Captures the current state of a wallet, including:

- Selected address
- Chain ID
- Any custom data you wish to associate with this state

Example:

```javascript
const walletState = await saveWalletState(page, {
  txHash: '0x1234...',
  testScenario: 'after withdrawal',
  amount: '0.5 ETH',
});
```

### `restoreWalletState(page, state)`

Restores a previously saved wallet state, including:

- Selected address
- Chain ID

Example:

```javascript
// Restore to previously saved state
await restoreWalletState(page, walletState);
```

## Common Testing Patterns

### 1. Capturing and Verifying State Transitions

```javascript
// Save initial state
const initialState = await saveWalletState(page);

// Perform an action (e.g., network switch)
await switchNetwork(page, 'polygon');

// Save the new state
const newState = await saveWalletState(page);

// Verify the change
expect(newState.chainId).not.toBe(initialState.chainId);
```

### 2. Testing Multiple Related Operations

```javascript
// Connect wallet
await connectWallet(page);
const connectedState = await saveWalletState(page);

// Perform a transaction
await sendTransaction(page, {...});
const postTxState = await saveWalletState(page, { txComplete: true });

// Restore back to connected state
await restoreWalletState(page, connectedState);
```

### 3. Storing Metadata with Wallet State

```javascript
// After a test action, save state with metadata
const state = await saveWalletState(page, {
  lastAction: 'withdrawal',
  amount: '0.1 ETH',
  timestamp: Date.now(),
  recipient: '0x1234...',
});

// Later, you can use this metadata
console.log(state.customData.lastAction); // 'withdrawal'
```

## Implementation Details

The wallet snapshot utilities work by:

1. Using page.evaluate() to access the window.ethereum object in the browser
2. Capturing and restoring critical properties: selectedAddress and chainId
3. Supporting optional custom data storage
4. Being platform-agnostic - works with any wallet that exposes a window.ethereum object

## Troubleshooting

- If tests fail with `Cannot read properties of undefined (reading 'selectedAddress')`, ensure window.ethereum is properly initialized
- For UI-related tests, make sure to update both the ethereum object AND the UI elements
- Use optional chaining (`?.`) when accessing ethereum properties to avoid errors
