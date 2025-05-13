# DeFi Protocol Testing

This document outlines the DeFi protocol testing capabilities in the Web3 Security Test Kit, focusing on specialized tests for lending protocols, AMM-specific security validation, and staking protocol patterns.

## Supported Protocol Types

The Web3 Security Test Kit now supports the following DeFi protocol types:

1. **Lending Protocols** - Aave, Compound, Spark, Euler, Venus, Maker
2. **Automated Market Makers (AMMs)** - Uniswap V2/V3, SushiSwap, Curve, Balancer
3. **Staking Protocols** - Liquid staking and standard staking
4. **NFT Marketplaces** - OpenSea, LooksRare, Rarible, Foundation

## Lending Protocol Testing

### Features

The lending protocol testing module provides specialized tests for:

- **Liquidation Thresholds** - Test health factor calculations and liquidation scenarios
- **Interest Rate Calculation** - Validate interest accrual and rate calculations
- **Flash Loan Security** - Test for flash loan attack vectors
- **Oracle Security** - Validate price feeds and oracle implementations
- **Governance Controls** - Test access controls and governance mechanisms

### Supported Lending Protocols

- **Aave V3** - Main pools across multiple networks
- **Compound V3** - Comet deployment
- **Spark** - Fork of Aave V3
- **Euler** - Multi-tier isolation
- **Venus** - BSC lending protocol
- **Maker** - CDP-based lending

### Usage Example

```javascript
const {
  LendingProtocolTester,
  LENDING_PROTOCOLS,
} = require('../src/core/defi-testing/lending-protocols');

// Initialize tester for Aave V3 on Polygon
const lendingTester = new LendingProtocolTester({
  protocol: LENDING_PROTOCOLS.AAVE_V3,
  chainId: 137, // Polygon
  rpcUrl: 'https://polygon-rpc.com',
});

// Test liquidation thresholds
const liquidationResults = await lendingTester.testLiquidationThresholds();
console.log(`Liquidation test success: ${liquidationResults.success}`);

// Test interest rate calculation
const interestResults = await lendingTester.testInterestRateCalculation({
  assetAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC on Polygon
});
console.log(`Interest calculation test success: ${interestResults.success}`);

// Run full test suite
const allResults = await lendingTester.runFullTestSuite();
```

## AMM Protocol Testing

### Features

The AMM protocol testing module provides specialized tests for:

- **Price Impact** - Test slippage and price impact scenarios
- **Sandwich Attack Vulnerability** - Simulate sandwich attack vectors
- **Flash Loan Attack Vectors** - Test flash loan attack scenarios
- **Impermanent Loss** - Calculate impermanent loss under various market conditions

### Supported AMM Protocols

- **Uniswap V2** - Constant product AMM
- **Uniswap V3** - Concentrated liquidity AMM
- **SushiSwap** - Fork of Uniswap V2
- **Curve** - Stablecoin-focused AMM
- **Balancer** - Multi-token pools

### Usage Example

```javascript
const { AMMProtocolTester, AMM_PROTOCOLS } = require('../src/core/defi-testing/amm-protocols');

// Initialize tester for Uniswap V3 on Ethereum
const ammTester = new AMMProtocolTester({
  protocol: AMM_PROTOCOLS.UNISWAP_V3,
  chainId: 1, // Ethereum
  rpcUrl: 'https://mainnet.infura.io/v3/YOUR_API_KEY',
});

// Test price impact for a specific pool
const priceImpactResults = await ammTester.testPriceImpact({
  poolAddress: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640', // USDC/ETH 0.05% pool
});
console.log(`Price impact test success: ${priceImpactResults.success}`);

// Test sandwich attack vulnerability
const sandwichResults = await ammTester.testSandwichAttackVulnerability({
  poolAddress: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
});
console.log(`Sandwich attack test success: ${sandwichResults.success}`);

// Run full test suite for a pool
const allResults = await ammTester.runFullTestSuite({
  poolAddress: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
});
```

## NFT Marketplace Testing

### Features

The NFT marketplace testing module provides specialized tests for:

- **Royalty Enforcement** - Test royalty calculation and enforcement
- **Transfer Restrictions** - Test for soulbound or restricted transfers
- **Marketplace Interaction** - Test listing and trading mechanics

### Supported NFT Marketplaces

- **OpenSea** - Seaport protocol
- **LooksRare** - Creator-focused marketplace
- **Rarible** - Multi-chain marketplace
- **Foundation** - Curated art marketplace

### Usage Example

```javascript
const { NFTMarketplaceRoyaltyTester } = require('../src/core/defi-testing/nft-marketplace-royalty');

// Initialize tester for Ethereum
const nftTester = new NFTMarketplaceRoyaltyTester({
  chainId: 1, // Ethereum
  rpcUrl: 'https://mainnet.infura.io/v3/YOUR_API_KEY',
});

// Test royalty enforcement on OpenSea
const royaltyResults = await nftTester.testRoyaltyEnforcement(
  'opensea',
  '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', // BAYC
  123 // Token ID
);
console.log(`Royalty enforcement test success: ${royaltyResults.success}`);

// Test transfer restrictions
const transferResults = await nftTester.testTransferRestrictions(
  '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', // BAYC
  123 // Token ID
);
console.log(`Transfer restrictions test success: ${transferResults.success}`);

// Run full test suite
const allResults = await nftTester.runFullTestSuite(
  '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', // BAYC
  123, // Token ID
  ['opensea', 'looksrare'] // Marketplaces to test
);
```

## Common Risk Patterns

The DeFi testing tools identify the following common risk patterns:

1. **Economic Attacks**

   - Price manipulation
   - Flash loan attacks
   - Sandwich attacks
   - Liquidation attacks

2. **Technical Vulnerabilities**

   - Reentrancy
   - Access control issues
   - Oracle manipulation
   - Precision loss

3. **Market Risks**
   - Impermanent loss
   - Slippage impact
   - Liquidity risks
   - Protocol-specific risks

## Integration with L2 Networks

All DeFi testing modules support testing on L2 networks:

- **zkSync Era**
- **Linea**
- **Base**
- **Polygon zkEVM**

### Example: Testing Aave V3 on Base

```javascript
const {
  LendingProtocolTester,
  LENDING_PROTOCOLS,
} = require('../src/core/defi-testing/lending-protocols');

// Initialize tester for Aave V3 on Base
const lendingTester = new LendingProtocolTester({
  protocol: LENDING_PROTOCOLS.AAVE_V3,
  chainId: 8453, // Base
  rpcUrl: 'https://mainnet.base.org',
});

// Run full test suite
const allResults = await lendingTester.runFullTestSuite();
```

## Security Report Generation

All testing modules generate comprehensive security reports that include:

- **Vulnerability Assessment** - Identified vulnerabilities and risk levels
- **Security Score** - Overall security rating for the protocol
- **Risk Analysis** - Detailed analysis of risk factors
- **Recommendations** - Actionable security recommendations

### Example Report

```javascript
// Generate summary report for AMM test
const summaryReport = ammTester.generateSummaryReport(poolAddress);

/*
Example output:
{
  "protocol": "uniswap-v3",
  "chainId": 1,
  "poolAddress": "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640",
  "timestamp": "2023-06-01T12:00:00.000Z",
  "testsRun": 4,
  "successfulTests": 4,
  "failedTests": 0,
  "securityScore": 85,
  "testDetails": [
    {
      "name": "Price Impact",
      "success": true,
      "duration": 1200
    },
    // ... more tests
  ]
}
*/
```

## Continuous Monitoring

The DeFi testing modules can be configured for continuous monitoring:

```javascript
// Setup continuous monitoring for a lending protocol
const monitor = await lendingTester.setupContinuousMonitoring({
  interval: 3600, // 1 hour
  alerts: {
    healthFactorThreshold: 1.2,
    utilizationRateMax: 0.95,
    interestRateChange: 0.1,
  },
  notificationEndpoint: 'https://your-alerts-endpoint.com',
});

// Start monitoring
monitor.start();
```

## Future Roadmap

- Add support for more DeFi protocols
- Enhance attack simulation capabilities
- Add integration with more security tools
- Support for more complex DeFi strategies
- Advanced risk modeling for new DeFi primitives

## Related Documentation

- [L2 Network Support](./L2-NETWORK-SUPPORT.md)
- [NFT Testing](./NFT-TESTING.md)
- [Cross-Chain Security](./CROSS-CHAIN-SECURITY.md)
