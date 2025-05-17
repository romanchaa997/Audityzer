---
sidebar_position: 1
---

# Real Wallet Integration

While Audityzer primarily uses mocked wallet behavior for testing, there are scenarios where testing with real wallets provides additional coverage and security verification. This guide focuses on the highest-leverage wallets first.

## Why Test with Real Wallets

Testing with real wallets provides several benefits:

1. **Complete Validation**: Ensure your application works with actual wallet implementations, not just mocks
2. **UI/UX Verification**: Test the complete user experience including wallet popups and interfaces
3. **RPC Communication**: Verify actual blockchain communication patterns
4. **Security Boundary Testing**: Check cross-domain security measures in production wallets
5. **Version Compatibility**: Ensure compatibility with different wallet versions

## Priority Wallet Testing Schedule

Following our roadmap, we recommend focusing your real wallet testing efforts in this order:

### Phase 1 (Now-Q2 2025)

1. **MetaMask**: Primary focus - test extension and mobile versions
2. **WalletConnect v2**: Test QR code scanning and mobile-to-desktop flows
3. **Coinbase Wallet**: Test browser extension integration

### Phase 2+ (Q3 2025 and beyond)

- Additional wallets as needed for your specific use case
- Bridge integrations with your primary wallets

## Approaches to Real Wallet Testing

### 1. Controlled Test Wallets

Create dedicated test wallets with:

- Minimal funds on test networks
- No access to production assets
- Clear separation from development wallets

```javascript
test('Test with actual MetaMask wallet', async ({ page, context }) => {
  // Launch browser with MetaMask extension installed
  // Extension path needs to be configured in playwright.config.js

  // Navigate to your MetaMask setup page
  await page.goto('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html');

  // Import test wallet using seed phrase
  await page.fill('#seed-phrase', 'your test wallet seed phrase');

  // Set test wallet password
  await page.fill('#password', 'your-secure-test-password');

  // Continue with test...
});
```

### 2. Sandboxed Environment

Set up an isolated testing environment:

- Docker containers with browser + wallet extensions
- Virtual machines with controlled network access
- CI/CD pipeline with ephemeral wallets

### 3. Hybrid Testing Approach

Combine real and mocked wallet testing:

- Use mocks for fast unit and integration tests
- Use real wallets for key security verification tests
- Use real wallets for final acceptance tests

## Configuring Real Wallet Tests

### MetaMask Integration (High Priority)

```javascript
// In your playwright.config.js
const config = {
  use: {
    // Launch options to include the MetaMask extension
    launchOptions: {
      args: [
        `--disable-extensions-except=${path.join(__dirname, 'path/to/metamask')}`,
        `--load-extension=${path.join(__dirname, 'path/to/metamask')}`,
      ],
    },
  },
};
```

### WalletConnect Integration (High Priority)

```javascript
test('Test with real WalletConnect', async ({ page }) => {
  // Navigate to your dApp
  await page.goto('https://your-dapp.com');

  // Click connect button to trigger WalletConnect
  await page.click('#connect-wallet');

  // Get WalletConnect QR code
  const qrCodeData = await page.evaluate(() => {
    return document.querySelector('.walletconnect-qrcode').getAttribute('data-qrcode');
  });

  // In a real test, you'd use a QR code scanner or direct URI handling
  // For testing purposes, you can use a mobile device automation tool
  // to scan this QR and confirm the connection
});
```

### Coinbase Wallet Integration (High Priority)

```javascript
test('Test with Coinbase Wallet extension', async ({ page }) => {
  // Configure similar to MetaMask with correct extension path
  await page.goto('https://your-dapp.com');

  // Click your connect button that supports Coinbase Wallet
  await page.click('#connect-coinbase');

  // Handle the Coinbase Wallet popup
  const popupPromise = page.waitForEvent('popup');
  const popup = await popupPromise;

  // In the popup, approve the connection
  await popup.click('#approve-button');

  // Verify the connection in the main window
  await page.waitForSelector('.wallet-connected');
});
```

## Security Considerations

When testing with real wallets:

1. **Never use production wallets** or wallets with real assets
2. **Create specific test wallets** with minimal permissions
3. **Use test networks** like Sepolia, Mumbai, or Devnet
4. **Rotate test wallet credentials** regularly
5. **Store test wallet credentials securely** using vault solutions or CI/CD secrets
6. **Limit network access** to prevent accidental interactions with production networks

## Future Improvements

We're focusing on the following improvements for real wallet testing, in order of priority:

### Phase 1 (Now-Q2 2025)

1. **MetaMask automation improvements**: Better handling of MetaMask extension UI interactions
2. **WalletConnect v2 integration**: Streamlined testing with WalletConnect v2 protocol
3. **Coinbase Wallet helpers**: Simplified test utilities for Coinbase Wallet extension

### Phase 2 (Q3-Q4 2025)

1. **Docker images** with pre-installed high-priority wallets for consistent testing environments
2. **Automated wallet initialization**: Scripts to create and fund test wallets automatically
3. **WalletConnect QR code handling** for automated WalletConnect tests

### Phase 3 (2026+)

1. **Mobile wallet automation** for both Android and iOS testing
2. **Multi-chain test suite** for cross-chain application testing
3. **Additional wallet support** based on market adoption

## Community Examples

Check out our [community-test-examples](community-test-examples) section for contributed examples of real wallet testing setups from the Audityzer community, with emphasis on our core supported wallets.
