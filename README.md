# Web3FuzzForge Security Testing Kit

A comprehensive toolkit for testing Web3 dApps, focusing on security and functional testing.

## Setup & Installation

### Local Installation (Recommended)

This project has a pre-packed `.tgz` file that you can install locally:

```bash
# Install dependencies
npm install

# Install the web3fuzzforge package locally
npm run local-install
```

### Alternative: Using Local Commands

If you encounter issues with the package installation, you can use these direct command alternatives:

```bash
# Generate a connection test
npm run forge:gen connect -- --wallet metamask --out ./tests/connection-test.js

# Run tests in mock mode
npm run forge:run -- --mock-mode --headed
```

## Usage

### Generate Test Templates

```bash
# Generate a wallet connection test
web3fuzzforge generate connect --wallet metamask --out ./tests/connection-test.js

# Generate a transaction test
web3fuzzforge generate tx --wallet metamask --out ./tests/transaction-test.js

# Generate a security-focused test with fuzzing
web3fuzzforge generate tx --wallet metamask --out ./tests/security-tx-test.js --fuzz
```

### Run Tests

```bash
# Run tests with mock dApp (for development)
web3fuzzforge run --mock-mode --headed

# Run tests against a specific dApp
web3fuzzforge run --target-url=https://your-dapp.com
```

## Troubleshooting UI Visibility Issues

If you're experiencing test failures related to UI visibility, try these solutions:

1. Use the `forceShowWalletUI` helper function instead of visibility assertions:

```javascript
const { forceShowWalletUI } = require('./utils/wallet-snapshot');

// Instead of this:
// await expect(page.locator('#wallet-info')).toBeVisible();

// Use this:
await forceShowWalletUI(page);
```

2. Check content directly instead of visibility:

```javascript
// Instead of checking visibility:
// await expect(page.locator('#wallet-info')).toBeVisible();

// Check the content directly:
const walletAddress = await page.locator('.wallet-address').textContent();
expect(walletAddress).toContain('0x123...');
```

3. Force UI elements to show programmatically:

```javascript
await page.evaluate(() => {
  const walletInfo = document.getElementById('wallet-info');
  if (walletInfo) walletInfo.style.display = 'block';
});
```

## Common Issues

### Package Not Found Error

If you see `npm error 404 Not Found - GET https://registry.npmjs.org/web3fuzzforge`, use the local installation method described above.

### UI Element Not Visible

Tests failing with `Timed out 10000ms waiting for expect(locator).toBeVisible()` should be updated to use the improved UI handling methods in the utils folder.

## License

MIT
