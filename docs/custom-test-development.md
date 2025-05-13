# Custom Security Test Development Guide

This guide shows you how to create custom security test scenarios for your specific dApp vulnerabilities using the Web3 Security Test Kit.

## Overview

Custom security tests allow you to simulate and detect specific vulnerabilities in your dApp. These tests are written using Playwright and can be run as part of your automated testing pipeline.

## Basic Structure

All security test files follow this basic structure:

```typescript
// @ts-nocheck
import { test, expect, Page } from '@playwright/test';
import { connectWallet, getWalletState } from '../../tests/utils/walletMock';

/**
 * Security bug: [Vulnerability Name]
 *
 * Vulnerability explanation:
 * [Detailed explanation of the vulnerability]
 *
 * This test checks for:
 * - [Check point 1]
 * - [Check point 2]
 * - [Check point 3]
 */

// Helper functions
async function createMockDappPage(page: Page) {
  // Create a simulated dApp page for testing
}

// Test suite
test.describe('[Vulnerability Name] Detection', () => {
  test('detects [vulnerability scenario]', async ({ page }) => {
    // Test implementation
  });
  
  test('validates secure implementation', async ({ page }) => {
    // Test implementation for positive case
  });
});
```

## Step-by-Step Guide

### 1. Create a New Test File

Create a new file in the `examples/security-bug-tests/` directory with a descriptive name:

```
examples/security-bug-tests/your-vulnerability-name.test.ts
```

### 2. Import Required Dependencies

```typescript
// @ts-nocheck
import { test, expect, Page } from '@playwright/test';
import { connectWallet, getWalletState } from '../../tests/utils/walletMock';
```

### 3. Add Documentation

Document the vulnerability you're testing, explaining:
- What the vulnerability is
- How it can be exploited
- What you're checking for in the test

```typescript
/**
 * Security bug: Flash Loan Attack Vulnerability
 *
 * Vulnerability explanation:
 * Flash loan attacks occur when an attacker takes an uncollateralized loan,
 * manipulates market conditions or exploits contract vulnerabilities, and 
 * then repays the loan within the same transaction, retaining profits.
 *
 * This test checks for:
 * - Price oracle manipulation resistance
 * - Transaction sequence issues
 * - Slippage control implementation
 */
```

### 4. Create Mock Implementation

Create a mock implementation of the vulnerable dApp:

```typescript
async function createMockDappPage(page: Page) {
  await page.setContent(`
    <html>
      <body>
        <h1>DeFi Protocol</h1>
        <button id="connect-wallet">Connect Wallet</button>
        <!-- UI components -->
        
        <script>
          // Implement mock dApp functionality
          // Include both vulnerable and secure implementations
        </script>
      </body>
    </html>
  `);
}
```

### 5. Write Test Cases

Write at least two test cases:
1. One that detects the vulnerability
2. One that validates a secure implementation

```typescript
test.describe('Flash Loan Attack Vulnerability Detection', () => {
  test('detects price manipulation vulnerability via flash loans', async ({ page }) => {
    // Set up a mock DeFi protocol page
    await createMockDappPage(page);

    // Connect wallet with mock
    await connectWallet(page, {
      provider: 'metamask',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      chainId: '0x1', // Ethereum mainnet
    });

    // Test for vulnerability
    // ...
    
    // Assert that vulnerability exists
    expect(vulnerabilityFound).toBeTruthy();
  });
  
  test('validates proper security measures', async ({ page }) => {
    // Similar setup but test the secure implementation
    // ...
    
    // Assert that security measures are effective
    expect(securityMeasureImplemented).toBeTruthy();
  });
});
```

## Example: Flash Loan Attack Test

Here's a simplified example of a flash loan attack vulnerability test:

```typescript
test('detects price manipulation vulnerability via flash loans', async ({ page }) => {
  // Set up a mock DeFi protocol page
  await createMockDappPage(page);

  // Connect wallet
  await connectWallet(page, {
    provider: 'metamask',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    chainId: '0x1',
  });

  // Disable price checks (simulating vulnerable protocol)
  const priceChecksEnabled = await page.evaluate(() => {
    return window.togglePriceChecks(false);
  });
  
  expect(priceChecksEnabled).toBeFalsy();

  // Attempt to manipulate asset price
  const manipulationSuccess = await page.evaluate(() => {
    return window.manipulatePrice('ETH', 1500);
  });
  
  expect(manipulationSuccess).toBeTruthy();

  // Perform a swap that benefits from manipulated price
  await page.fill('#swap-amount', '5');
  await page.selectOption('#swap-from-asset', 'USDC');
  await page.selectOption('#swap-to-asset', 'ETH');
  await page.click('#swap');

  // Validate the swap succeeded with manipulated price
  const swapResult = await page.textContent('#result');
  expect(swapResult).toContain('Swapped');
  
  // Detect vulnerabilities
  const vulnerabilitiesFound = {
    priceManipulation: await page.evaluate(() => !window.priceChecks),
    noSlippageProtection: await page.inputValue('#slippage-tolerance') === '0',
  };
  
  // At least one vulnerability should be detected
  expect(Object.values(vulnerabilitiesFound).some(v => v)).toBeTruthy();
});
```

## Testing Specific Vulnerabilities

These are common Web3 vulnerabilities you can test:

### Reentrancy Attacks

Test if a contract properly updates its state before making external calls.

### Front-Running Vulnerabilities

Test if transactions can be front-run by examining slippage protection and mempool monitoring.

### Oracle Manipulation

Test if price oracles can be manipulated or if the system relies on a single price source.

### Signature Replay Attacks

Test if message signatures can be reused in different contexts or chains.

### Flash Loan Attacks

Test if a protocol is vulnerable to price manipulation via flash loans.

### Access Control Issues

Test if critical functions lack proper access controls or permission checks.

## Running Custom Tests

Run your custom test with:

```bash
npx playwright test examples/security-bug-tests/your-vulnerability-name.test.ts
```

Or add it to package.json:

```json
"scripts": {
  "test:your-vulnerability": "playwright test examples/security-bug-tests/your-vulnerability-name.test.ts"
}
```

Then run:

```bash
npm run test:your-vulnerability
```

## CI Integration

Add your test to the CI/CD pipeline by modifying `.github/workflows/ci-cd.yml`:

```yaml
- name: Run Your Vulnerability Test
  run: npm run test:your-vulnerability
  env:
    MOCK_MODE: 'true'
```

## Best Practices

1. Always test both vulnerable and secure implementations
2. Document the vulnerability thoroughly
3. Create realistic scenarios that simulate actual attack vectors
4. Use clear assertions to validate findings
5. Report findings in an actionable format
6. Consider different edge cases and attack variations 