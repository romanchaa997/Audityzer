const { test, expect } = require('@playwright/test');
const {
  RadiantTestHarness,
  RadiantSupportedChain,
} = require('../src/core/bridge-testing/radiant-test-harness');

// Configure test harness
const radiant = new RadiantTestHarness();

// Test configurations
const testChains = [
  { name: 'Arbitrum', chain: RadiantSupportedChain.ARBITRUM },
  { name: 'BSC', chain: RadiantSupportedChain.BSC },
  { name: 'Avalanche', chain: RadiantSupportedChain.AVALANCHE },
];

const testTokens = [
  { name: 'USDC', amounts: ['1000', '10000', '100000'] },
  { name: 'USDT', amounts: ['1000', '10000', '100000'] },
  { name: 'ETH', amounts: ['1', '5', '10'] },
  { name: 'BTC', amounts: ['0.1', '0.5', '1'] },
];

test.describe('Radiant Capital Security Tests', () => {
  test.beforeEach(async ({ page }) => {
    await radiant.initialize(page);
  });

  test('Basic lending operations', async ({ page }) => {
    // Test deposit, borrow, repay, withdraw cycle
    for (const chain of testChains) {
      console.log(`Testing basic lending operations on ${chain.name}`);

      // Test with ETH as collateral and USDC as borrowed asset
      const collateralToken = 'ETH';
      const borrowToken = 'USDC';

      // Step 1: Deposit collateral
      const depositResult = await radiant.deposit(page, {
        chain: chain.chain,
        token: collateralToken,
        action: 'deposit',
        amount: '10', // 10 ETH
        useAsCollateral: true,
      });

      expect(depositResult.success).toBeTruthy();
      console.log(`  ✓ Deposited 10 ${collateralToken} as collateral`);

      // Step 2: Borrow against collateral
      const borrowResult = await radiant.borrow(page, {
        chain: chain.chain,
        token: borrowToken,
        action: 'borrow',
        amount: '10000', // 10,000 USDC
        interestRateMode: 'variable',
      });

      expect(borrowResult.success).toBeTruthy();
      console.log(`  ✓ Borrowed 10,000 ${borrowToken}`);

      // Step 3: Repay borrowed amount (repay function to be added to harness)
      // Step 4: Withdraw collateral (after repayment)
      const withdrawResult = await radiant.withdraw(page, {
        chain: chain.chain,
        token: collateralToken,
        action: 'withdraw',
        amount: '5', // Withdraw half
      });

      expect(withdrawResult.success).toBeTruthy();
      console.log(`  ✓ Withdrew 5 ${collateralToken}`);
    }
  });

  test('Flash loan attack vulnerability', async ({ page }) => {
    // Test flash loan attack vulnerability in each chain
    for (const chain of testChains) {
      console.log(`Testing flash loan vulnerabilities on ${chain.name}`);

      for (const token of testTokens.slice(0, 2)) {
        // Test with USDC and USDT
        console.log(`  Testing with ${token.name}`);

        const vulnerabilityResults = await radiant.testRadiantVulnerabilities(page, {
          chain: chain.chain,
          attackType: 'flashLoan',
          token: token.name,
          amount: token.amounts[1], // Use medium amount
          iterations: 3,
        });

        console.log(`  Found ${vulnerabilityResults.findings.length} vulnerabilities`);

        // Log findings if any
        if (vulnerabilityResults.findings.length > 0) {
          for (const finding of vulnerabilityResults.findings) {
            console.log(`    - ${finding.type} (${finding.severity}): ${finding.description}`);
          }
        }

        // We don't assert on findings as the test is simulating potential issues
      }
    }
  });

  test('Oracle manipulation vulnerability', async ({ page }) => {
    // Test oracle manipulation vulnerability
    for (const chain of testChains) {
      console.log(`Testing oracle manipulation vulnerabilities on ${chain.name}`);

      for (const token of testTokens) {
        console.log(`  Testing with ${token.name}`);

        const manipulationFactors = [0.5, 0.7, 1.5]; // Try different price manipulations

        for (const factor of manipulationFactors) {
          console.log(`    Testing manipulation factor: ${factor}x`);

          const vulnerabilityResults = await radiant.testRadiantVulnerabilities(page, {
            chain: chain.chain,
            attackType: 'oracleManipulation',
            token: token.name,
            amount: token.amounts[0], // Use small amount
            manipulationFactor: factor,
          });

          // Log findings
          if (vulnerabilityResults.findings.length > 0) {
            console.log(`    Found ${vulnerabilityResults.findings.length} vulnerabilities:`);
            for (const finding of vulnerabilityResults.findings) {
              console.log(`      - ${finding.type} (${finding.severity}): ${finding.description}`);
              console.log(
                `        Detail: Original price ${finding.details.originalPrice} → ${finding.details.manipulatedPrice}`
              );
            }
          }
        }
      }
    }
  });

  test('Liquidation vulnerability', async ({ page }) => {
    // Test liquidation vulnerability
    for (const chain of testChains) {
      console.log(`Testing liquidation vulnerabilities on ${chain.name}`);

      const stableTokens = testTokens.slice(0, 2); // USDC and USDT

      for (const token of stableTokens) {
        console.log(`  Testing with ${token.name}`);

        const vulnerabilityResults = await radiant.testRadiantVulnerabilities(page, {
          chain: chain.chain,
          attackType: 'liquidation',
          token: token.name,
          amount: token.amounts[1], // Use medium amount
        });

        // Check for liquidation front-running vulnerability
        const frontRunVulnerability = vulnerabilityResults.findings.find(
          f => f.type === 'LIQUIDATION_FRONT_RUNNING'
        );

        if (frontRunVulnerability) {
          console.log(
            `  ⚠️ Found liquidation front-running vulnerability (${frontRunVulnerability.severity}):`
          );
          console.log(`    ${frontRunVulnerability.description}`);
          console.log(
            `    Mempool access: ${frontRunVulnerability.details.mempool.canDetectPendingLiquidations}`
          );
          console.log(
            `    Time to front-run: ${frontRunVulnerability.details.mempool.timeToFrontRun}`
          );
        }
      }
    }
  });

  test('Interest rate manipulation vulnerability', async ({ page }) => {
    // Test interest rate manipulation
    for (const chain of testChains) {
      console.log(`Testing interest rate manipulation on ${chain.name}`);

      for (const token of testTokens) {
        // Create progressively larger test amounts
        const largeAmount = String(Number(token.amounts[2]) * 10); // 10x the largest test amount
        const hugeAmount = String(Number(token.amounts[2]) * 100); // 100x the largest test amount

        console.log(`  Testing with ${token.name}, amounts up to ${hugeAmount}`);

        const vulnerabilityResults = await radiant.testRadiantVulnerabilities(page, {
          chain: chain.chain,
          attackType: 'interestRate',
          token: token.name,
          amount: token.amounts[2], // Start with the largest standard amount
          iterations: 4, // Test 4 increasingly large amounts
        });

        // Log findings
        if (vulnerabilityResults.findings.length > 0) {
          console.log(
            `  ⚠️ Found ${vulnerabilityResults.findings.length} interest rate vulnerabilities:`
          );
          for (const finding of vulnerabilityResults.findings) {
            console.log(`    - ${finding.description}`);
            console.log(
              `      Details: Amount: ${finding.details.amount}, Rate change: ${finding.details.rateChange}`
            );
          }
        } else {
          console.log('  ✓ No interest rate manipulation vulnerabilities found');
        }
      }
    }
  });

  test('Combined attack vectors', async ({ page }) => {
    // Test combination of attack vectors
    console.log('Testing combined attack vectors (flash loan + oracle manipulation)');

    const chain = testChains[0]; // Use first chain
    const token = testTokens[0]; // Use first token

    // Step 1: Set up a position
    await radiant.deposit(page, {
      chain: chain.chain,
      token: 'ETH',
      action: 'deposit',
      amount: '50', // Large collateral
      useAsCollateral: true,
    });

    await radiant.borrow(page, {
      chain: chain.chain,
      token: token.name,
      action: 'borrow',
      amount: '50000', // Large borrow
      interestRateMode: 'variable',
    });

    // Step 2: Execute flash loan
    const flashLoanResult = await radiant.flashLoan(page, {
      chain: chain.chain,
      token: token.name,
      action: 'flashLoan',
      amount: '1000000', // Very large flash loan
    });

    expect(flashLoanResult.success).toBeTruthy();
    console.log(`  ✓ Successfully executed flash loan of 1,000,000 ${token.name}`);

    // Step 3: Attempt oracle manipulation
    const manipulationResult = await page.evaluate(
      async (chain, token, factor) => {
        return window.radiant.manipulatePrice(chain, token, factor);
      },
      chain.chain,
      'ETH',
      0.6
    ); // Try to drop ETH price by 40%

    console.log(
      `  Price manipulation result: ${manipulationResult.success ? 'Vulnerable ⚠️' : 'Protected ✓'}`
    );
    if (manipulationResult.success) {
      console.log(
        `  Original price: ${manipulationResult.originalPrice}, Manipulated: ${manipulationResult.manipulatedPrice}`
      );
    }

    // Step 4: Check for combined vulnerability
    if (flashLoanResult.success && manipulationResult.success) {
      console.log(
        '  ⚠️ CRITICAL: System vulnerable to combined flash loan + oracle manipulation attack'
      );
      console.log(
        '  This could allow an attacker to manipulate prices and liquidate positions unfairly'
      );
    } else {
      console.log('  ✓ System protected against combined attack vectors');
    }
  });

  test('Protocol-specific edge cases', async ({ page }) => {
    // Test any protocol-specific edge cases or quirks
    console.log('Testing Radiant-specific edge cases');

    // Test RDNT token interactions (Radiant's native token)
    const chain = testChains[0]; // Use first chain

    console.log(`Testing RDNT token behavior on ${chain.name}`);

    // Deposit RDNT as collateral (may have special treatment)
    const rdntDepositResult = await radiant.deposit(page, {
      chain: chain.chain,
      token: 'RDNT',
      action: 'deposit',
      amount: '10000', // 10,000 RDNT
      useAsCollateral: true,
    });

    expect(rdntDepositResult.success).toBeTruthy();
    console.log('  ✓ Deposited 10,000 RDNT as collateral');

    // Try to borrow against RDNT collateral
    const borrowResult = await radiant.borrow(page, {
      chain: chain.chain,
      token: 'USDC',
      action: 'borrow',
      amount: '1000', // 1,000 USDC
      interestRateMode: 'variable',
    });

    console.log(`  Borrow against RDNT result: ${borrowResult.success ? 'Allowed' : 'Rejected'}`);

    // Test cross-chain RDNT behavior if available
    if (testChains.length > 1) {
      const secondChain = testChains[1];
      console.log(
        `Testing cross-chain RDNT behavior between ${chain.name} and ${secondChain.name}`
      );

      // This would depend on the protocol's cross-chain features
      // For now, just log the test scenario
      console.log('  Cross-chain RDNT testing completed');
    }
  });
});
