/* global describe, it, expect, beforeEach, afterEach, jest */
const { test, expect } = require('@playwright/test');
const {
  StargateTestHarness,
  StargatePoolId,
  LayerZeroChainId,
} = require('../src/core/bridge-testing/stargate-test-harness');

// Configure test harness
const stargate = new StargateTestHarness();

// Test configurations
const testNetworks = [
  {
    name: 'Ethereum to Arbitrum',
    src: LayerZeroChainId.ETHEREUM,
    dst: LayerZeroChainId.ARBITRUM,
    srcChainId: 1,
    dstChainId: 42161,
  },
  {
    name: 'Optimism to Polygon',
    src: LayerZeroChainId.OPTIMISM,
    dst: LayerZeroChainId.POLYGON,
    srcChainId: 10,
    dstChainId: 137,
  },
  {
    name: 'Avalanche to BSC',
    src: LayerZeroChainId.AVALANCHE,
    dst: LayerZeroChainId.BSC,
    srcChainId: 43114,
    dstChainId: 56,
  },
];

const testTokens = [
  { name: 'USDC', poolId: StargatePoolId.USDC, amounts: ['100', '1000', '10000'] },
  { name: 'USDT', poolId: StargatePoolId.USDT, amounts: ['100', '1000', '10000'] },
  { name: 'ETH', poolId: StargatePoolId.ETH, amounts: ['0.1', '1', '5'] },
];

const testSlippages = [1, 10, 30, 100, 500]; // From 0.01% to 5%

test.describe('Stargate Finance Bridge Tests', () => {
  test.beforeEach(async ({ page }) => {
    await stargate.initialize(page);
  });

  test('Basic cross-chain token transfers', async ({ page }) => {
    // Test basic token transfers between chains
    for (const network of testNetworks) {
      for (const token of testTokens) {
        console.log(`Testing ${token.name} transfer from ${network.name}`);

        const amount = token.amounts[1]; // Use middle amount

        const result = await stargate.bridgeTokenViaStargate(page, {
          srcChainId: network.srcChainId,
          dstChainId: network.dstChainId,
          srcLayerZeroId: network.src,
          dstLayerZeroId: network.dst,
          poolId: token.poolId,
          amount,
          slippage: 30, // 0.3% standard slippage
        });

        expect(result.success).toBeTruthy();

        // Check transaction status
        const status = await stargate.getStargateSwapStatus(page, result.txHash);
        expect(status.found).toBeTruthy();
      }
    }
  });

  test('Slippage protection testing', async ({ page }) => {
    // Test various slippage settings to ensure protection works
    const network = testNetworks[0]; // Use first network configuration
    const token = testTokens[0]; // Use first token configuration

    for (const slippage of testSlippages) {
      console.log(`Testing slippage setting: ${slippage / 100}%`);

      const result = await stargate.bridgeTokenViaStargate(page, {
        srcChainId: network.srcChainId,
        dstChainId: network.dstChainId,
        srcLayerZeroId: network.src,
        dstLayerZeroId: network.dst,
        poolId: token.poolId,
        amount: token.amounts[1],
        slippage,
      });

      // For very low slippage, we expect failures in real environments
      // For test environment, we check the transaction flow is correct
      if (slippage < 10) {
        console.log(`  Checking low slippage (${slippage / 100}%) handling`);
        // We either expect a failure or a successful transaction that might fail later
        if (!result.success) {
          expect(result.error).toContain('slippage');
        } else {
          const status = await stargate.getStargateSwapStatus(page, result.txHash);
          // Either completed or failed due to slippage
          expect(
            status.status === 'completed' ||
              (status.status === 'failed' && status.error?.includes('Slippage'))
          ).toBeTruthy();
        }
      } else {
        // For normal slippage, we expect success
        expect(result.success).toBeTruthy();
      }
    }
  });

  test('Fee manipulation vulnerability detection', async ({ page }) => {
    // Test for fee manipulation vulnerabilities
    for (const network of testNetworks) {
      for (const token of testTokens) {
        console.log(`Testing fee consistency for ${token.name} on ${network.name}`);

        const params = {
          srcChainId: network.srcChainId,
          dstChainId: network.dstChainId,
          srcLayerZeroId: network.src,
          dstLayerZeroId: network.dst,
          poolId: token.poolId,
          amount: token.amounts[1],
        };

        // Get multiple fee estimates and check for consistency
        const feeEstimates = [];
        for (let i = 0; i < 5; i++) {
          const estimate = await stargate.estimateStargateFees(page, params);
          feeEstimates.push(Number(estimate.nativeFee));
        }

        // Calculate variance as percentage of mean
        const mean = feeEstimates.reduce((sum, val) => sum + val, 0) / feeEstimates.length;
        const variance =
          feeEstimates.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / feeEstimates.length;
        const relativeVariance = Math.sqrt(variance) / mean;

        console.log(`  Relative variance: ${(relativeVariance * 100).toFixed(2)}%`);

        // Fee estimates should be relatively stable
        expect(relativeVariance).toBeLessThan(0.1); // Less than 10% variance
      }
    }
  });

  test('Security vulnerability scanning', async ({ page }) => {
    // Run comprehensive vulnerability scan
    for (const network of testNetworks) {
      console.log(`Running security scan for ${network.name}`);

      const token = testTokens[Math.floor(Math.random() * testTokens.length)];

      const params = {
        srcChainId: network.srcChainId,
        dstChainId: network.dstChainId,
        srcLayerZeroId: network.src,
        dstLayerZeroId: network.dst,
        poolId: token.poolId,
        amount: token.amounts[1],
      };

      const vulnerabilityResults = await stargate.testStargateVulnerabilities(page, params);

      // Log any findings
      if (vulnerabilityResults.vulnerabilitiesFound) {
        console.log('⚠️ Security vulnerabilities detected:');
        for (const finding of vulnerabilityResults.findings) {
          console.log(`  - ${finding.type} (${finding.severity}): ${finding.description}`);
        }
      }

      // For testing in simulation environment, we don't expect real vulnerabilities
      expect(vulnerabilityResults.vulnerabilitiesFound).toBeFalsy();
    }
  });

  test('Liquidity verification', async ({ page }) => {
    // Test that destination chains have sufficient liquidity
    for (const network of testNetworks) {
      for (const token of testTokens) {
        console.log(`Verifying liquidity for ${token.name} on ${network.name}`);

        // Try a large amount transfer to test liquidity limits
        const largeAmount = String(Number(token.amounts[2]) * 10); // 10x the largest test amount

        const result = await stargate.bridgeTokenViaStargate(page, {
          srcChainId: network.srcChainId,
          dstChainId: network.dstChainId,
          srcLayerZeroId: network.src,
          dstLayerZeroId: network.dst,
          poolId: token.poolId,
          amount: largeAmount,
        });

        // Check if transaction succeeded or failed gracefully
        if (result.success) {
          const status = await stargate.getStargateSwapStatus(page, result.txHash);

          // If it failed, it should indicate insufficient liquidity
          if (status.status === 'failed') {
            expect(status.error).toContain('liquidity');
            console.log(`  ✓ Correctly rejected transfer due to: ${status.error}`);
          } else {
            console.log(
              '  ✓ Large transfer completed successfully, sufficient liquidity available'
            );
          }
        } else {
          // Direct rejection is also acceptable for very large amounts
          expect(result.error).toContain('liquidity');
          console.log(`  ✓ Correctly rejected transfer due to: ${result.error}`);
        }
      }
    }
  });

  test('Random fuzzing of transfer parameters', async ({ page }) => {
    // Perform random transfer parameter fuzzing
    const iterations = 5; // Number of random tests to run

    for (let i = 0; i < iterations; i++) {
      // Pick random network and token
      const network = testNetworks[Math.floor(Math.random() * testNetworks.length)];
      const token = testTokens[Math.floor(Math.random() * testTokens.length)];

      // Generate random amount (between 0.1x and 2x of a standard amount)
      const baseAmount = Number(token.amounts[Math.floor(Math.random() * token.amounts.length)]);
      const randomMultiplier = 0.1 + Math.random() * 1.9; // Between 0.1 and 2.0
      const amount = String(baseAmount * randomMultiplier);

      // Generate random slippage (5-200 basis points)
      const slippage = 5 + Math.floor(Math.random() * 195);

      console.log(`Running fuzzing test #${i + 1}:`);
      console.log(`  Network: ${network.name}, Token: ${token.name}`);
      console.log(`  Amount: ${amount}, Slippage: ${slippage / 100}%`);

      // Execute the transfer
      const result = await stargate.bridgeTokenViaStargate(page, {
        srcChainId: network.srcChainId,
        dstChainId: network.dstChainId,
        srcLayerZeroId: network.src,
        dstLayerZeroId: network.dst,
        poolId: token.poolId,
        amount,
        slippage,
      });

      // We're testing for unexpected crashes, not specific outcomes
      if (result.success) {
        const status = await stargate.getStargateSwapStatus(page, result.txHash);
        console.log(`  Result: ${status.status}`);
      } else {
        console.log(`  Result: Failed - ${result.error}`);
      }

      // The test should not crash, that's the main assertion
      expect(true).toBeTruthy(); // If we got here, the test didn't crash
    }
  });
});
