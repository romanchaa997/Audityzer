# Web3FuzzForge | The Ultimate Security Test Kit for Web3

![Web3FuzzForge Banner](./assets/img/web3fuzzforge-banner.png)

**Catch Web3 vulnerabilities before hackers do.** Generate security tests for wallets, transactions, and cross-chain bridges in seconds, not days.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Playwright Tests](https://img.shields.io/badge/tested%20with-Playwright-45ba4b.svg)](https://playwright.dev/)
[![Security Hardened](https://img.shields.io/badge/security-hardened-purple.svg)](https://github.com/romanchaa997/Web3FuzzForge/blob/main/docs/security-hardening.md)

<p align="center">
  <img src="./assets/demo/demo.gif" alt="Web3FuzzForge Demo" width="80%">
</p>

## 🔐 Why Web3FuzzForge?

Web3 security is hard. Testing wallet interactions is harder. Most projects have smart contract tests but lack dApp security testing—leaving critical vulnerabilities in wallet connections, transaction flows, and UI/UX security.

Web3FuzzForge solves this by:
- **Automating** security test generation for MetaMask, WalletConnect, and other wallets
- **Detecting** vulnerabilities in dApp-to-wallet connections and transaction processing
- **Fuzzing** inputs to discover edge cases before they become expensive exploits
- **Integrating** directly into CI/CD pipelines for continuous security verification

## 🚀 Enterprise Security Integration

Web3FuzzForge now includes an enterprise-grade CI/CD integration module that helps teams automate security testing in their development pipelines:

### Key Enterprise Features:

- **Platform-Specific CI/CD Adapters**: Seamless integration with GitHub Actions, GitLab CI, Jenkins, and Azure DevOps
- **Headless Wallet Testing**: Automated testing of wallet interactions in CI environments
- **Static Analysis Integration**: Built-in support for Slither, Mythril, and Solhint 
- **Industry-Standard Reporting**: SARIF, JUnit, and platform-specific reporting
- **Enterprise Notification System**: Configurable alerts via Email, Slack, and custom webhooks

```bash
# Generate a security rules configuration file
npm run security-rules

# Create CI configuration for your platform
npm run ci-config-gen

# Run security tests in CI environment
npm run ci-run

# Configure notification system
npm run generate-notification-config
```

Read the [CI/CD Integration Guide](./docs/ci-integration.md) for detailed instructions.

<p align="center">
  <img src="./assets/img/ci-cd-pipeline.png" alt="CI/CD Integration" width="80%">
</p>

## 🌟 Implemented Functionality Showcase

### 1. Cross-Chain Bridge Security Testing

Our LayerZero bridge testing framework provides comprehensive security validation:

```javascript
// From tests/layerzero-crosschain-fuzz.js
test('Detect LayerZero message replay vulnerabilities', async ({ page }) => {
  const debugLogger = new DebugLogger('verbose');
  
  // Initialize bridge test harness with detailed logging
  const bridgeTest = new LayerZeroBridgeTest(page, {
    sourceChain: 'ethereum',
    destChain: 'arbitrum',
    debugMode: true
  });

  // Fuzzing parameters for comprehensive testing
  await bridgeTest.fuzzMessagePayloads({
    iterations: 50,
    mutationRate: 0.3,
    payloadSizeVariation: true
  });
  
  // Analyze and report findings
  const vulnerabilities = await bridgeTest.analyzeReplayProtection();
  expect(vulnerabilities.replayAttackVectors).toHaveLength(0);
});
```

<p align="center">
  <img src="./assets/img/bridge-testing-diagram.png" alt="Bridge Testing Flow" width="80%">
</p>

### 2. Multi-Wallet Matrix Testing

Test across MetaMask, WalletConnect, and Coinbase Wallet with a single test suite:

```javascript
// From tests/wallet-matrix-fuzz.js
test('Verify transaction security across multiple wallets', async ({ page }) => {
  const wallets = ['metamask', 'walletconnect', 'coinbase'];
  
  for (const wallet of wallets) {
    const walletTest = new WalletSecurityTest(page, {
      walletType: wallet,
      networkId: 1, // Ethereum Mainnet
      captureScreenshots: true
    });
    
    // Test transaction flow with fuzzed input values
    await walletTest.fuzzTransactionParameters({
      valueRanges: {
        eth: { min: '0.0001', max: '1.5' },
        gasLimit: { min: 21000, max: 500000 }
      },
      iterations: 25
    });
    
    const securityIssues = await walletTest.generateSecurityReport();
    expect(securityIssues.criticalVulnerabilities).toHaveLength(0);
  }
});
```

<p align="center">
  <img src="./assets/img/wallet-matrix-testing.png" alt="Multi-Wallet Testing" width="80%">
</p>

### 3. ZK-SNARK Security Validation

Advanced ZK-SNARK security testing with our specialized tools:

```javascript
// From tests/zk-snark-security.test.js
test('Detect invalid ZK circuit constraint vulnerabilities', async ({ page }) => {
  const zkTest = new ZkSnarkSecurityTest(page);
  
  // Test circuit constraints with edge cases
  await zkTest.testInvalidEllipticCurvePoints();
  await zkTest.testMaliciousProofGeneration();
  await zkTest.testHardcodedInputValidation();
  
  // Export detailed vulnerability report
  const report = await zkTest.generateVulnerabilityReport();
  expect(report.vulnerableConstraints).toEqual([]);
});
```

<p align="center">
  <img src="./assets/img/zk-snark-testing.png" alt="ZK-SNARK Testing Visualization" width="80%">
</p>

### 4. AI-Powered Vulnerability Detection

Our advanced ML-based vulnerability detection automatically classifies and reports issues:

```javascript
// From examples/ai-vulnerability-detection-demo.js
test('AI-powered detection of transaction vulnerabilities', async ({ page }) => {
  const aiDetector = new VulnerabilityClassifier({
    modelPath: './src/core/ai-vulnerability-detection/model-development/vulnerability-model.pt',
    confidenceThreshold: 0.85
  });
  
  // Capture transaction flow and analyze for vulnerabilities
  const transactionTrace = await captureTransactionFlow(page, {
    walletType: 'metamask',
    targetContract: '0x1234...5678',
    method: 'transfer',
    parameters: [recipient, amount]
  });
  
  // Classify vulnerability types and severity
  const analysis = await aiDetector.classifyVulnerabilities(transactionTrace);
  
  // Generate human-readable report with remediation suggestions
  const report = await aiDetector.generateRemediationReport(analysis);
  console.log(report.securityRecommendations);
});
```

<p align="center">
  <img src="./assets/img/ai-vulnerability-detection.png" alt="AI-Powered Vulnerability Detection" width="80%">
</p>

## 💻 Live Demo Interface

Web3FuzzForge includes a simple test interface for manual interaction testing:

<p align="center">
  <img src="./assets/img/test-interface-example.png" alt="Test Interface Example" width="80%">
</p>

The interface allows you to:
- Connect various wallet types
- Test transaction flows
- Simulate error conditions
- View detailed transaction results

## ✨ Key Features

🔍 **Test Generation** - Auto-generated test templates for connections, transactions, fuzzed inputs, and error states

🔐 **Vulnerability Reporting** - Detailed reporting with severity scoring and multi-format export (JSON, HTML, PDF)

📱 **Multi-Wallet Support** - Test wallet interactions across MetaMask, WalletConnect, and Coinbase Wallet

🔁 **Cross-chain Testing** - Simulate bridging, switching networks, and testnet/mainnet compatibility with LayerZero, Stargate, and Radiant Capital

🧠 **AI-Powered Analysis** - Machine learning models for vulnerability classification and remediation recommendations

🧪 **Mock Mode** - Run tests without deploying to live environments

## 🚀 Quick Start

### 🔧 Local Installation

```bash
# Install dependencies
npm install

# Install the package locally from tarball
npm run local-install
```

### 🧬 Generate Tests

```bash
# Connection test
yarn forge:gen connect --wallet metamask --out ./tests/connection.js

# Transaction test with fuzzing
yarn forge:gen tx --wallet metamask --fuzz --out ./tests/tx-fuzz.js

# Error handling test
yarn forge:gen error --wallet metamask --out ./tests/error-test.js
```

<p align="center">
  <img src="./assets/img/test-generation-example.png" alt="Test Generation Example" width="80%">
</p>

### 🧪 Run Tests

```bash
# Run in mock mode (local dApp)
yarn forge:run --mock-mode --headed

# Run against deployed dApp
yarn forge:run --target-url=https://your-dapp.com

# Run tests with code coverage
npm run test:coverage

# View coverage report locally
npm run coverage:report
```

<p align="center">
  <img src="./assets/img/test-execution-example.png" alt="Test Execution Example" width="80%">
</p>

## 📊 Code Coverage

Web3FuzzForge uses Codecov for tracking test coverage:

[![Codecov](https://img.shields.io/badge/codecov-enabled-brightgreen.svg)](https://codecov.io/gh/romanchaa997/Web3FuzzForge)

To generate and view code coverage reports:

```bash
# Run tests with coverage enabled
npm run test:coverage

# View the coverage report locally
npm run coverage:report

# Upload coverage to Codecov (CI environment)
npm run codecov:upload
```

<p align="center">
  <img src="./assets/img/coverage-report-example.png" alt="Coverage Report Example" width="80%">
</p>

## 🔌 Wallet Support Roadmap

Web3FuzzForge prioritizes support for the most widely used wallets first:

### Phase 1: Foundation (Complete) ✅
- **Core Wallets**: Full support for MetaMask, WalletConnect, and Coinbase Wallet
- **Common Interface**: Unified testing interface that works across all wallet providers
- **Test Templates**: Ready-to-use templates for wallet switching and session persistence

### Phase 2: Advanced Features (In Progress) 🚧
- Enhanced bridge testing with additional protocols
- AI-powered vulnerability analysis
- Extended DeFi protocol testing 

<p align="center">
  <img src="./assets/img/wallet-support-roadmap.png" alt="Wallet Support Roadmap" width="80%">
</p>

See the [complete roadmap](./docs/wallet-support-roadmap.md) for detailed implementation plans.

## 📖 Docs & Guides

Full documentation available at [Web3FuzzForge GitLab Docs](https://gitlab.com/romanchaa997/web3-security-test-kit)

- [Wallet Support](https://gitlab.com/romanchaa997/web3-security-test-kit/-/blob/main/docs-site/docs/wallet-support.md)
- [Reporting Overview](https://gitlab.com/romanchaa997/web3-security-test-kit/-/blob/main/docs/reporting.md)
- [Mobile Wallet Configs](https://gitlab.com/romanchaa997/web3-security-test-kit/-/blob/main/docs/mobile-wallets.md)
- [Cross-Chain Setup](https://gitlab.com/romanchaa997/web3-security-test-kit/-/blob/main/docs/cross-chain.md)
- [Community Test Examples](https://gitlab.com/romanchaa997/web3-security-test-kit/-/blob/main/docs/examples.md)
- [Visual Assets Guide](./docs/visual-assets-guide.md) - How to create diagrams and screenshots

## 📂 Directory Structure

```
├── tests/                  # Generated test templates and examples
│   ├── layerzero-crosschain-fuzz.js  # Bridge security tests
│   ├── wallet-matrix-fuzz.js         # Multi-wallet testing
│   ├── zk-snark-security.test.js     # ZK-SNARK validation
├── examples/               # Example test implementations
│   ├── exploits/           # Example vulnerability tests
│   ├── demo-dapp/          # Demo application for testing
├── src/core/               # Core functionality modules
│   ├── ai-vulnerability-detection/  # ML-based security analysis
│   ├── bridge-testing/              # Cross-chain security testing
│   ├── ci-integration/              # CI/CD pipeline integration
├── utils/                  # Wallet mocks, UI helpers
├── docs/                   # Markdown-based documentation
├── reports/                # Auto-generated vulnerability reports
```

## 🧠 Pro Tips

- Use `forceShowWalletUI()` to avoid visibility test flakiness.
- Combine fuzzing with error tests for maximum surface coverage.
- Export test results to PDF for bug bounty reporting.
- Focus on MetaMask, WalletConnect, and Coinbase Wallet for highest test coverage value.
- Utilize debug mode with `new DebugLogger('verbose')` for detailed insights.

<p align="center">
  <img src="./assets/img/debug-mode-example.png" alt="Debug Mode Example" width="80%">
</p>

## 💡 Use Cases

### 1. Continuous Security Testing in CI/CD Pipeline

<p align="center">
  <img src="./assets/img/ci-usecase-diagram.png" alt="CI/CD Use Case" width="80%">
</p>

### 2. Vulnerability Detection Before Launch

<p align="center">
  <img src="./assets/img/pre-launch-testing.png" alt="Pre-launch Testing" width="80%">
</p>

### 3. Bridge Security Validation

<p align="center">
  <img src="./assets/img/bridge-security-usecase.png" alt="Bridge Security Use Case" width="80%">
</p>

## 🤝 Community & Support

- 💬 Telegram: [@Web3FuzzQA](https://t.me/Web3FuzzQA)
- 🐦 Twitter: [@romanchaa997](https://x.com/romanchaa997/status/1916868442356945084)
- ☕ Support: [Ko-fi](https://ko-fi.com/post/Web3FuzzForge-L3L61E74QH)
- 🛠️ Buy the Pro Kit: [Gumroad](https://romanchaa997.gumroad.com/l/Web3FuzzForge?wanted=true)
- ⚖️ [License](https://github.com/romanchaa997/Web3FuzzForge/blob/main/LICENSE)

## Implementation Status

### Recently Completed Features ✅

- **ZK-SNARK Security Testing**: Advanced ZK-SNARK validation with tests for invalid curve points, circuit constraints, malicious proofs, and hardcoded validation.
- **Debug Mode Implementation**: Robust debugging utility with visualization for cross-chain messages, transaction tracing, and detailed logging.
- **Multi-Wallet Testing**: Support for testing with MetaMask, WalletConnect, and Coinbase Wallet.
- **LayerZero Bridge Testing**: Cross-chain message testing with replay detection and security validation.
- **CI/CD Integration**: GitHub Actions workflows with automated test report generation and vulnerability classification.
- **Stargate Finance Integration**: Enhanced test harness with comprehensive vulnerability detection.

### Next Steps 🚧

1. **Advanced Protocol Integration**
   - [ ] Expand Radiant Capital test scenarios with liquidity validation
   - [ ] Integrate with Synapse and additional popular bridges
   - [ ] Add support for Uniswap V3 security testing

2. **Improved Visualization**
   - [ ] Create interactive test result dashboards
   - [ ] Enhance transaction flow visualization with sequence diagrams
   - [ ] Implement user-friendly debugging UI

3. **AI Analysis Enhancement**
   - [ ] Train on larger dataset of security vulnerabilities
   - [ ] Improve remediation suggestion accuracy
   - [ ] Add novel vulnerability pattern detection

<p align="center">
  <img src="./assets/img/implementation-status.png" alt="Implementation Status" width="80%">
</p>

## Usage

```bash
# Install dependencies
npm install

# Run tests with debug logging
npm run test:with-debug

# Run specific test suites
npm run test:zk-snark
npm run test:layerzero
```

For more details on implementation status and roadmap, see [README-IMPLEMENTATION-STATUS.md](./README-IMPLEMENTATION-STATUS.md)

## Screenshots Gallery

<p align="center">
  <img src="./assets/img/screenshots/wallet-connection.png" alt="Wallet Connection" width="45%">
  <img src="./assets/img/screenshots/transaction-testing.png" alt="Transaction Testing" width="45%">
</p>

<p align="center">
  <img src="./assets/img/screenshots/vulnerability-report.png" alt="Vulnerability Report" width="45%">
  <img src="./assets/img/screenshots/test-result-dashboard.png" alt="Test Result Dashboard" width="45%">
</p>

MIT License © 2025
