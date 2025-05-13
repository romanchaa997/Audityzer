# L2 Network Support

This document outlines the L2 network support capabilities in the Web3 Security Test Kit, focusing on emerging L2 solutions like zkSync Era, Linea, Base, and Polygon zkEVM.

## Supported L2 Networks

The Web3 Security Test Kit now supports the following L2 networks:

1. **zkSync Era** - zkRollup with native account abstraction
2. **Linea** - Optimistic rollup by ConsenSys
3. **Base** - Optimistic rollup by Coinbase
4. **Polygon zkEVM** - Zero-knowledge rollup by Polygon

## Features

### Network Validators

Each L2 network has a dedicated validator module that provides the following capabilities:

- **Contract Deployment** - Deploy smart contracts to L2 networks
- **Transaction Testing** - Test transaction execution on L2 networks
- **Bridge Interaction** - Test token and message bridging between L1 and L2
- **Performance Metrics** - Measure gas costs, transaction speeds, and other metrics
- **Security Validation** - Test for L2-specific security vulnerabilities

### Cross-Chain Testing

The framework includes comprehensive tools for testing cross-chain applications:

- **Message Passing** - Test message passing between L1 and L2
- **Token Bridging** - Test token transfers across different networks
- **State Validation** - Verify state consistency across chains
- **Attack Simulation** - Simulate potential attack vectors in cross-chain applications

## Usage Examples

### Initialize L2 Validators

```javascript
const {
  ZkSyncValidator,
  LineaValidator,
  BaseValidator,
  PolygonZkEVMValidator,
} = require('../src/core/cross-chain');

// Initialize zkSync Era validator
const zkSyncValidator = new ZkSyncValidator({
  useTestnet: true,
  logLevel: 'debug',
});
await zkSyncValidator.initialize();

// Initialize Linea validator
const lineaValidator = new LineaValidator({
  useTestnet: true,
  logLevel: 'debug',
});
await lineaValidator.initialize();
```

### Deploy Contracts to L2

```javascript
// Deploy contract to Base
const baseValidator = new BaseValidator({
  useTestnet: true,
  privateKey: process.env.PRIVATE_KEY,
});
await baseValidator.initialize();

const deployResult = await baseValidator.deployContract(contractArtifact, constructorArgs, {
  gasLimit: 3000000,
});

console.log(`Contract deployed at: ${deployResult.address}`);
```

### Test Token Bridging

```javascript
// Test bridging tokens from L1 to Polygon zkEVM
const zkEVMValidator = new PolygonZkEVMValidator({
  useTestnet: true,
  privateKey: process.env.PRIVATE_KEY,
});
await zkEVMValidator.initialize();

const bridgeResult = await zkEVMValidator.testL1ToL2Bridging(
  '0xTokenAddress',
  '1.0', // Amount to bridge
  { destinationAddress: '0xRecipientAddress' }
);

console.log(`Bridge transaction: ${bridgeResult.transactions[1].hash}`);
```

### Test Message Passing

```javascript
// Test message passing from L1 to Linea
const lineaValidator = new LineaValidator({
  useTestnet: true,
  privateKey: process.env.PRIVATE_KEY,
});
await lineaValidator.initialize();

const messageResult = await lineaValidator.testL1ToL2MessagePassing(
  'Hello L2!',
  '0xDestinationContractAddress'
);

console.log(`Message transaction: ${messageResult.transactions[0].hash}`);
```

## Network Comparison

| Feature                | zkSync Era  | Linea                | Base              | Polygon zkEVM |
| ---------------------- | ----------- | -------------------- | ----------------- | ------------- |
| Type                   | zkRollup    | zk/optimistic hybrid | Optimistic rollup | zkRollup      |
| Account Abstraction    | Built-in    | Limited              | Limited           | Limited       |
| EVM Compatibility      | Mostly      | High                 | High              | High          |
| Finality Time          | ~10 minutes | ~1-2 hours           | ~7 days           | ~1-3 hours    |
| Gas Cost (vs L1)       | ~0.1x       | ~0.1x                | ~0.1x             | ~0.1x         |
| Development Complexity | Medium      | Low                  | Low               | Medium        |

## Testing Considerations

When testing applications on L2 networks, consider the following:

1. **Different Finality Times** - L2 networks have different finality guarantees
2. **Bridge Risks** - Token bridges introduce additional security risks
3. **EVM Compatibility** - Some L2s have slight differences in EVM behavior
4. **Unique Features** - Each L2 may have unique features that require specific testing
5. **Gas Metering** - Gas metering may differ from Ethereum mainnet

## Performance Testing

The test kit includes tools for comparing performance across different L2 networks:

```javascript
// Compare gas prices across networks
const { createProvider } = require('../src/core/cross-chain');

const providers = {
  ethereum: new (require('ethers').providers.JsonRpcProvider)(
    'https://mainnet.infura.io/v3/YOUR_API_KEY'
  ),
  base: createProvider('base', false),
  linea: createProvider('linea', false),
  polygonZkEvm: createProvider('polygonZkEvm', false),
};

// Get gas prices
const gasPrices = {};
for (const [network, provider] of Object.entries(providers)) {
  const gasPrice = await provider.getGasPrice();
  gasPrices[network] = {
    wei: gasPrice.toString(),
    gwei: ethers.utils.formatUnits(gasPrice, 'gwei'),
  };
}

console.log('Gas prices across networks:', gasPrices);
```

## Continuous Integration

The L2 network validators can be integrated into CI/CD pipelines for automated testing:

```yaml
jobs:
  test-l2-networks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 16
      - name: Install dependencies
        run: npm ci
      - name: Run L2 network tests
        run: npx playwright test tests/l2-network-test.js
        env:
          TEST_PRIVATE_KEY: ${{ secrets.TEST_PRIVATE_KEY }}
```

## Future Roadmap

- Add support for more L2 networks (Arbitrum Nova, Starknet, etc.)
- Enhance performance benchmarking tools
- Add more sophisticated cross-chain security testing
- Add integration with more bridge protocols
- Support for specialized L2-specific features (e.g., zk proofs)

## Related Documentation

- [DeFi Protocol Testing](./DEFI-TESTING.md)
- [NFT Marketplace Testing](./NFT-TESTING.md)
- [Cross-Chain Security](./CROSS-CHAIN-SECURITY.md)
