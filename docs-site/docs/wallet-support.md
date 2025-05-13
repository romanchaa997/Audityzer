---
sidebar_position: 3
---

# Wallet Support

Web3FuzzForge provides comprehensive support for testing various cryptocurrency wallets, focusing on the most widely used options first to maximize testing value.

## Currently Supported Wallets

### High-Priority Wallets

These wallets are fully supported with complete testing templates and mocks:

1. **MetaMask**

   - Connection testing
   - Transaction testing
   - Signing testing
   - Error state testing
   - Network switching

2. **WalletConnect**

   - Connection via QR code
   - Session management
   - Transaction approval
   - Basic mobile testing support

3. **Coinbase Wallet**
   - Connection testing
   - Transaction testing
   - Mobile-to-desktop flow testing

## Implementation Roadmap

Our implementation strategy focuses on delivering high-value wallet support first:

### Phase 1: Foundation (Now-Q2 2025)

#### 1. Polished Core Wallet Support

- Complete MetaMask testing integration with enhanced security tests
- Finalize WalletConnect v2 support with QR code testing capabilities
- Polish Coinbase Wallet integration with focus on mobile-to-desktop flows

#### 2. Common Wallet Interface Abstraction

- Create a unified wallet testing interface that abstracts provider specifics
- Develop shared mock implementations with configurable behaviors
- Build state management utilities for all supported wallets

#### 3. Test Template Library

- Convert wallet-switching templates into reusable components
- Create transaction testing templates that work across all supported wallets
- Develop network switching test utilities with error handling

### Phase 2: Enhanced Features (Q3-Q4 2025)

#### 1. Extend Core Testing Capabilities

- Add advanced transaction simulation with gas estimation testing
- Implement EIP-1559 transaction testing support
- Create testing for wallet extension version compatibility

#### 2. Bridge Integration Testing

- Begin with bridges most commonly used with MetaMask/Coinbase/WalletConnect
- Implement test fixtures for LayerZero and Wormhole integrations
- Add transaction verification across chains

#### 3. Performance and Security

- Create test suites for wallet connection timeout scenarios
- Develop security tests for signature request validation
- Implement failure recovery testing patterns

### Phase 3: Ecosystem Expansion (2026+)

- Add Phantom wallet support for Solana ecosystem (if targeting those bounties)
- Implement Rabby wallet testing for advanced multi-chain testing
- Extend to additional wallets based on market adoption

## Using Wallet Testing Templates

### MetaMask Testing Example

```javascript
const { test, expect } = require('@playwright/test');
const { setupMetaMaskWallet } = require('../utils/wallet-mocks');

test('MetaMask wallet connection test', async ({ page }) => {
  // Setup MetaMask mock
  await setupMetaMaskWallet(page);

  // Navigate to your dApp
  await page.goto('https://your-dapp.com');

  // Click connect button
  await page.click('#connect-wallet-button');

  // Verify wallet is connected
  await expect(page.locator('.wallet-address')).toBeVisible();
});
```

### WalletConnect Testing Example

```javascript
const { test, expect } = require('@playwright/test');
const { setupWalletConnectMock } = require('../utils/wallet-mocks');

test('WalletConnect session test', async ({ page }) => {
  // Setup WalletConnect mock
  await setupWalletConnectMock(page);

  // Navigate to dApp
  await page.goto('https://your-dapp.com');

  // Click WalletConnect button
  await page.click('#walletconnect-button');

  // Verify QR code is displayed
  await expect(page.locator('.walletconnect-qrcode')).toBeVisible();

  // Simulate QR code scan
  await page.evaluate(() => {
    window.walletConnectSimulateConnection('0xYourTestAddress');
  });

  // Verify connection is established
  await expect(page.locator('.connected-address')).toContainText('0xYourTestAddress');
});
```

## Custom Wallet Configuration

You can configure wallet behavior in your tests:

```javascript
// Configure a custom wallet state
const walletState = await setupWalletState(page, {
  address: '0xCustomAddress',
  chainId: '0x89', // Polygon
  balance: '10000000000000000000', // 10 ETH
  autoApprove: true, // Auto-approve transactions
});
```

## Best Practices

1. **Focus on Core Wallets First**: If your testing resources are limited, focus on MetaMask, WalletConnect, and Coinbase Wallet tests for maximum coverage.

2. **Use Mock Providers**: For CI/CD pipelines, use the mock providers rather than real extensions for stability.

3. **Test Network Switching**: Many common errors occur when users switch networks, so test this functionality thoroughly.

4. **Test Error States**: Don't just test the happy path. Use the error testing templates to verify your dApp handles wallet errors gracefully.

5. **Save and Restore States**: Use the wallet snapshot framework to save time in complex test scenarios.
