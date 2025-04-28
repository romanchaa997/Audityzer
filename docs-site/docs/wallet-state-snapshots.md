---
sidebar_position: 7
---

# Wallet State Snapshot Framework

The wallet state snapshot framework allows you to save and restore wallet states during tests. This feature makes it easier to test complex scenarios without repeating setup steps.

## Key Functions

- `saveWalletState(page, customData?)`: Captures the current state of the wallet
- `restoreWalletState(page, state)`: Restores a previously saved wallet state
- `setupWalletState(page, options?)`: Sets up a wallet with specific options and returns its state

## Example Usage

```javascript
const { test } = require('@playwright/test');
const { saveWalletState, restoreWalletState, setupWalletState } = require('../utils/walletMocks');

test('Test with wallet state snapshots', async ({ page }) => {
  // Set up initial wallet state (automatically connects)
  const initialState = await setupWalletState(page, {
    chainId: '0x1', // Ethereum Mainnet
  });

  // Perform some actions that change the wallet state
  await page.goto('https://your-dapp.com');
  await page.click('#connect-button');

  // Save the current state with custom data
  const connectedState = await saveWalletState(page, {
    isConnected: true,
    setupComplete: true,
  });

  // Later, restore to this exact state
  await restoreWalletState(page, connectedState);
});
```

## API Reference

### saveWalletState

```typescript
function saveWalletState(page: Page, customData?: Record<string, any>): Promise<WalletState>;
```

Captures the current wallet state including:

- Selected address
- Chain ID
- Connected status
- Balance information
- Custom data provided

### restoreWalletState

```typescript
function restoreWalletState(page: Page, state: WalletState): Promise<void>;
```

Restores all aspects of the wallet state:

- Reconnects if needed
- Sets the correct chain ID
- Restores address selection
- Makes custom data available

### setupWalletState

```typescript
function setupWalletState(
  page: Page,
  options?: {
    address?: string;
    chainId?: string;
    balance?: string;
    connected?: boolean;
  }
): Promise<WalletState>;
```

Creates a fresh wallet state with specified options.

## Benefits

- Speeds up test runs by avoiding repetitive setup
- Creates reusable checkpoints for complex test flows
- Allows testing wallet state transitions precisely
- Supports custom data storage with wallet states

## Use Cases

### Test Transaction Flows

```javascript
// Set up initial state
await setupWalletState(page);

// Complete a transaction
await page.click('#send-button');
await page.click('#confirm-button');

// Save post-transaction state
const postTxState = await saveWalletState(page, { txComplete: true });

// Reset to fresh state for next test
await setupWalletState(page);

// ... or restore the post-transaction state
await restoreWalletState(page, postTxState);
```

### Test Network Switching

```javascript
// Start on Ethereum Mainnet
const mainnetState = await setupWalletState(page, { chainId: '0x1' });

// Switch to Polygon
await page.evaluate(async () => {
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x89' }],
  });
});

// Save Polygon state
const polygonState = await saveWalletState(page);

// Restore back to Mainnet instantly
await restoreWalletState(page, mainnetState);
```
