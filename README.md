# Audityzer

[![npm version](https://img.shields.io/npm/v/audityzer.svg)](https://www.npmjs.com/package/audityzer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI/CD Pipeline](https://github.com/romanchaa997/Audityzer/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/romanchaa997/Audityzer/actions/workflows/ci-cd.yml)
[![Cross-Platform Tests](https://github.com/romanchaa997/Audityzer/actions/workflows/cross-platform-tests.yml/badge.svg)](https://github.com/romanchaa997/Audityzer/actions/workflows/cross-platform-tests.yml)
[![Security Scan](https://github.com/romanchaa997/Audityzer/actions/workflows/security-scan.yml/badge.svg)](https://github.com/romanchaa997/Audityzer/actions/workflows/security-scan.yml)

**Jump to:** [Features](#key-features) • [Installation](#installation) • [Quick Start](#quick-start) • [Security Testing](#security-testing) • [Documentation](#documentation)

Audityzer is a comprehensive Web3 security testing framework designed to identify vulnerabilities in dApps, smart contracts, and blockchain protocols. It provides automated testing, vulnerability detection, and security reporting across multiple chains and wallet providers.

<p align="center">
  <img src="https://github.com/romanchaa997/audityzer/raw/main/assets/img/audityzer-logo.svg" width="250" alt="Audityzer Logo">
</p>

## Key Features

- ✅ **Comprehensive Security Testing** - Detect common Web3 vulnerabilities and security issues
- ✅ **Multi-Chain Support** - Test across Ethereum, Polygon, Optimism, Arbitrum, and more
- ✅ **Wallet Integration** - Test with MetaMask, WalletConnect, Coinbase Wallet, and others
- ✅ **Automated Test Generation** - Create test cases from templates or AI-assisted generation
- ✅ **Security Reporting** - Generate detailed HTML, Markdown, and SARIF reports
- ✅ **CI/CD Integration** - GitHub Actions workflows for automated testing
- ✅ **Account Abstraction** - ERC-4337 compliant testing for smart accounts
- ✅ **Cross-Platform** - Works on Windows, macOS, and Linux

## Installation

```bash
# Global installation
npm install -g audityzer

# Project installation
npm install --save-dev audityzer
```

## Quick Start

```bash
# Generate a test template
audityzer generate security --wallet metamask --out ./tests/my-security-test.js

# Run security tests against a dApp
audityzer run --target-url https://my-dapp.com --security

# Generate a security report
audityzer report --format html

# Start the development server for local testing
audityzer server start
```

## Project Structure

```
Audityzer/
├── bin/                        # CLI entry points
├── packages/                   # Modular packages
│   └── dev-server-runner/      # Dev server management
├── scripts/                    # Utility scripts
│   ├── build/                  # Build scripts
│   ├── ci/                     # CI/CD scripts
│   ├── docker/                 # Docker setup
│   ├── docs/                   # Documentation scripts
│   ├── media/                  # Media generation
│   ├── project/                # Project management
│   ├── server/                 # Server management
│   └── test/                   # Test utilities
├── src/                        # Core source code
│   ├── cli/                    # Command-line interface
│   ├── fuzzers/                # Fuzzing engines
│   ├── generators/             # Test generators
│   ├── reporting/              # Report generation
│   └── security/               # Security checks
├── templates/                  # Test templates
│   └── security/               # Security test templates
├── tests/                      # Test scripts
│   ├── sample-tests/           # Example tests
│   ├── security-bug-tests/     # Security tests
│   ├── utils/                  # Test utilities
│   ├── wallet-tests/           # Wallet tests
│   ├── l2-tests/               # L2 tests
│   └── airdrop-tests/          # Airdrop tests
└── playwright-tests/           # Playwright tests
    └── autotests/              # Automated tests
```

## Security Testing

Audityzer provides comprehensive security testing for Web3 applications:

```bash
# Run all security tests
npm run test:security

# Test for specific vulnerabilities
npm run test:vuln:reentrancy
npm run test:vuln:oracle
npm run test:vuln:front-running
npm run test:vuln:phishing
npm run test:vuln:signature-replay
npm run test:vuln:access-control
npm run test:vuln:flash-loan

# Generate security reports
npm run report:html      # HTML report
npm run report:md        # Markdown report
npm run report:upload    # Upload to dashboard
```

### Vulnerability Categories

Audityzer tests for common Web3 vulnerabilities including:

- **Smart Contract Vulnerabilities**: Reentrancy, access control issues, arithmetic bugs
- **Transaction Vulnerabilities**: Front-running, MEV attacks, gas optimization issues
- **Wallet Integration Issues**: Signature phishing, approval exploits
- **Cross-Chain Vulnerabilities**: Bridge security, cross-chain transaction issues
- **Protocol-Specific Issues**: Liquidity pool attacks, oracle manipulation

### Custom Test Development

Create custom test scenarios for your specific dApp vulnerabilities:

```bash
# Generate a custom test template
audityzer generate custom --name my-custom-test

# Customize the test for your specific vulnerability
# Edit tests/security-bug-tests/my-custom-test.js

# Run your custom test
audityzer run --test tests/security-bug-tests/my-custom-test.js
```

## Account Abstraction Testing

Test ERC-4337 compliant smart accounts, paymasters, and bundlers:

```bash
# Generate AA test templates 
audityzer init -t aa

# Run AA security tests
audityzer run mycounterwallet.xyz --aa

# Use Pimlico-compatible mode
audityzer run myapp --aa --pimlico

# Generate HTML report and dashboard
audityzer run myapp --aa --report --dashboard
```

## Command Reference

### Test Generation

```bash
# Generate test templates
audityzer generate <type> --out <file-path> [options]

# Available test types:
# - connect: Wallet connection tests
# - tx: Transaction tests
# - sign: Message signing tests
# - error: Error handling tests
# - security: Security vulnerability tests
# - aa: Account abstraction tests

# Options:
# --wallet        Wallet provider (metamask, walletconnect, coinbase, etc.)
# --lang          Programming language (js, ts)
# --fuzz          Enable security fuzzing
# --lint          Enable linting and formatting
```

### Test Execution

```bash
# Run tests against a target dApp
audityzer run --target-url <url> [options]

# Options:
# --security      Run security tests
# --wallet        Specify wallet provider
# --chain         Specify blockchain network
# --mock-mode     Use mock environment
# --report        Generate report after tests
# --dashboard     Create visual dashboard
# --aa            Test account abstraction
```

### Report Generation

```bash
# Generate security reports
audityzer report [options]

# Options:
# --format        Report format (html, md, json, sarif)
# --output        Output directory
# --upload        Upload to dashboard
# --notify        Send notifications
```

### Development Server

```bash
# Start development server
audityzer server start [options]

# Options:
# --port          Server port (default: 5050)
# --directory     Directory to serve
# --config        Config file path
```

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- [Getting Started Guide](docs/getting-started.md)
- [Security Testing Guide](docs/security-testing.md)
- [Custom Test Development](docs/custom-test-development.md)
- [Report Generation](docs/reporting.md)
- [Account Abstraction Testing](docs/account-abstraction.md)
- [CI/CD Integration](docs/ci-cd-integration.md)

## Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

#### Specialized AA Addons

Test specific Account Abstraction features with specialized addons:

```bash
# Test social recovery implementations
audityzer run myapp --aa --addon social-recovery

# Test counterfactual wallet deployments
audityzer run myapp --aa --addon counterfactual

# Test session key implementations
audityzer run myapp --aa --addon session-keys

# Test token-gated operations
audityzer run myapp --aa --addon token-gating
```

#### Pimlico API Integration

Connect to Pimlico API for live gas fee suggestions and EntryPoint metadata:

```bash
# Connect to Pimlico API
audityzer run myapp --aa --pimlico-connect --pimlico-api-key YOUR_API_KEY

# Generate a Pimlico metrics report
audityzer aa --pimlico-connect --pimlico-api-key YOUR_API_KEY
```

#### CI/CD Integration

Generate standardized JSON reports for CI/CD pipelines:

```bash
# Generate CI-friendly JSON report
audityzer run myapp --aa --ci

# Generate SARIF format for GitHub Code Scanning
audityzer run myapp --aa --ci --format sarif
```

### Initialize Configuration

```bash
# Create default configuration
audityzer init

# Override existing configuration
audityzer init --force
```

### AI-Assisted Test Generation

```bash
# Generate a test configuration with AI
audityzer ask "Create a test for MetaMask wallet connecting to a Uniswap-like dApp"

# Generate and immediately run a test
audityzer ask "Test WalletConnect transaction flow" --run-with tx
```

## Security Reports

Generate comprehensive security reports from test results:

```bash
# Generate HTML report
node scripts/generate-security-report.js -f html

# Generate markdown report
node scripts/generate-security-report.js -f md

# Upload report to Firebase (requires Firebase configuration)
node scripts/generate-security-report.js -c
```

## Firebase Integration

Audityzer offers seamless Firebase integration for storing test reports and sharing results with your team:

### Configuration

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Configure your Firebase credentials:

   Option 1: Environment variables in your `.env` file:
   ```
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   FIREBASE_APP_ID=your_app_id
   FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   Option 2: Create a local `.firebase-config.json` file:
   ```json
   {
     "apiKey": "YOUR_API_KEY",
     "authDomain": "your-project-id.firebaseapp.com",
     "projectId": "your-project-id",
     "storageBucket": "your-project-id.appspot.com",
     "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
     "appId": "YOUR_APP_ID",
     "measurementId": "YOUR_MEASUREMENT_ID"
   }
   ```

### Usage

Once configured, you can:
- Automatically store test reports in Firestore
- Upload report files to Firebase Storage
- Share report URLs with your team
- Access historical test reports via the Firebase console

```bash
# Generate and upload a report to Firebase
npm run report:upload

# Generate HTML report and upload to Firebase
npm run report:html -- -c
```

## Docker Environment

For enhanced reproducibility and simplified setup, we provide a Docker-based development environment:

```bash
# Start the basic environment
./scripts/docker-setup.sh start

# Start with ElasticSearch and Kibana for advanced reporting
./scripts/docker-setup.sh full

# Run tests in Docker
./scripts/docker-setup.sh test test:security

# Shell into the container
./scripts/docker-setup.sh shell
```

## CI/CD Integration

The project includes a comprehensive GitHub Actions workflow that:

1. Runs linting and unit tests
2. Performs security vulnerability tests
3. Builds and tests the Docker image
4. Builds and packages the application
5. Publishes releases to NPM and GitHub
6. Deploys documentation to GitHub Pages

To use it in your project, configure the following GitHub repository secrets:
- `NPM_TOKEN` - For publishing to NPM

## Troubleshooting

### Common Issues

- **Missing Dependencies**: If you see errors about missing dependencies, try installing with `--legacy-peer-deps` flag
- **CLI Command Not Found**: Ensure the package is installed globally with `-g` flag and the binary path is in your PATH
- **Playwright Browser Installation**: If browser tests fail, run `npx playwright install chromium`
- **Firebase Errors**: Set proper Firebase API key in `.env` file or disable cloud features

### vLLM / Large-Language-Model API Server on Windows

The vLLM project currently ships binary wheels **for Linux only**.  On Windows you have three practical options:

1. **Docker (recommended – GPU & CPU)**
   ```powershell
   # Requires Docker Desktop with WSL integration and (optionally) NVIDIA Container Toolkit for GPU
   docker run --gpus all -p 8000:8000 \ \
     -v %USERPROFILE%\.cache\huggingface:/root/.cache/huggingface \
     ghcr.io/vllm-project/vllm:latest \
     --model WhiteRabbitNeo/WhiteRabbitNeo-13B-v1 --dtype float16 --port 8000
   ```

2. **WSL 2 + Conda / Pip (CPU or CUDA)**
   ```bash
   # Inside Ubuntu-20.04 WSL shell (Python 3.10 recommended)
   conda create -n vllm python=3.10 -y
   conda activate vllm
   pip install vllm sentencepiece
   python -m vllm.entrypoints.api_server \
       --model WhiteRabbitNeo/WhiteRabbitNeo-13B-v1 --dtype float16 --port 8000
   ```

3. **Use an older Python (≤ 3.11) with unofficial wheels**
   If you must stay native on Windows, install **Python 3.10** x86_64 and then:  
   ```powershell
   pip install sentencepiece==0.1.99  # pre-built wheel exists for Win64
   pip install "vllm @ git+https://github.com/vllm-project/vllm.git"
   ```
   ⚠️  Expect limited stability and no GPU acceleration.

### FFmpeg not found after installation on Windows

`winget` (or Chocolatey) adds FFmpeg to `PATH` for **new** shells only.  If the `create:demo-video` script still complains:

1. Close and reopen your terminal (PowerShell / Git Bash) – this reloads the PATH.  
2. Run `where ffmpeg` (PowerShell) or `which ffmpeg` (Git Bash) – it should print the full path.  
3. If it still fails, verify `%PROGRAMFILES%\ffmpeg\bin` (or `C:\ffmpeg\bin`) is present in your PATH.

### Node.js not found in Git Bash on Windows

If Git Bash prints `/usr/bin/env: node: No such file or directory` (or similar) when running scripts like `terminalizer` it usually means **Node is installed only for PowerShell / CMD** but its directory isn't on the POSIX-style PATH Git Bash uses.

Fixes:

1. Add the Windows Node directory to your Git Bash profile:
   ```bash
   echo 'export PATH="/c/Program\ Files/nodejs:$PATH"' >> ~/.bashrc
   source ~/.bashrc
   ```
   (Adjust the path if you installed Node to a custom location.)

2. Or re-install Node via **nvm-windows** *and* check the option "Add to PATH for all users".  After reinstalling, open a new Git Bash window and verify `node -v`.

3. As a quick workaround you can run the demo-video script directly from PowerShell:
   ```powershell
   npm run create:demo-video
   ```

### Docker command not found on Windows

The `docker` executable becomes available **only after** installing Docker Desktop and completing its first-run setup.

1. Download Docker Desktop from <https://www.docker.com/products/docker-desktop/> and install.
2. Enable the "WSL 2 backend" during installation (required for GPU pass-through).
3. After installation, open Docker Desktop once so it finalises the WSL integration.  Then open a **new** PowerShell / Git Bash window and run:
   ```powershell
   docker --version
   ```
   You should see something like `Docker version 26.1.0, build 12345`.
4. To enable GPU support install the **NVIDIA Container Toolkit** (<https://github.com/NVIDIA/nvidia-docker>) and check Docker Desktop → Settings → Resources → GPU.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Key Features

- **Complete Web3 Testing Framework**: Test wallet connections, transactions, signatures, and smart contract interactions across multiple chains and wallets.
- **Automated Security Analysis**: Detect vulnerabilities in DApps and smart contracts using powerful automated testing techniques.
- **Bug Bounty Integration**: Generate standardized reports for Immunefi, HackenProof, Code4rena, and Sherlock platforms.
- **Cross-Chain Testing**: Validate your application's behavior across multiple chains, including L2 networks.
- **CI/CD Integration**: Automate security testing in your deployment pipeline with GitHub Actions and other CI platforms.
- **Deployment Validation**: Validate smart contract deployments before they go live to catch potential issues.

## Vulnerability Detection

Audityzer can detect various smart contract and DApp vulnerabilities including:

### Smart Contract Vulnerabilities
- **Reentrancy Attacks**: Detect improper state updates after external calls
- **Front-running Vulnerabilities**: Identify missing slippage protection and transaction deadlines
- **Oracle Manipulation**: Check for dependence on manipulable price feeds
- **Flash Loan Attack Vectors**: Assess vulnerability to flash loan exploitation
- **eth_sign Phishing**: Detect improper use of eth_sign that could lead to phishing

### Web3 DApp Vulnerabilities
- **Unsafe Message Signing**: Identify improper message signing practices
- **Wallet Connection Issues**: Detect insecure wallet connection patterns
- **Transaction Approval Problems**: Find unlimited approval vulnerabilities
- **Transaction Monitoring Gaps**: Identify missing transaction confirmation checks

## DeFi Trading Strategy Security Analyzer

Audityzer includes a powerful trading strategy security analyzer specifically designed for DeFi protocols. This tool helps developers and security researchers identify potential vulnerabilities in trading strategies before deploying them on-chain.

### Key Features

- **Comprehensive Vulnerability Detection**: Identifies 10+ common DeFi trading vulnerabilities including price manipulation, sandwich attacks, flash loan vulnerabilities, and more
- **Risk Scoring**: Calculates an overall risk score based on detected vulnerabilities and their severity
- **Actionable Recommendations**: Provides specific remediation steps for each detected vulnerability
- **Strategy Simulation**: Tests trading strategies in a simulated environment to assess their behavior
- **CLI Interface**: Easy-to-use command line interface for running analysis

### Usage Examples

#### Command Line Interface

```bash
# Analyze an arbitrage trading strategy
node src/core/defi-testing/cli.js analyze-strategy arbitrage --params '{"slippageTolerance": 1.0, "priceFeeds": ["single-dex"]}'

# Execute a strategy with security analysis first
node src/core/defi-testing/cli.js execute-strategy flash_loan --params '{"targetProtocol": "aave"}' --analyze --simulate
```

#### JavaScript API

```javascript
const defiTesting = require('./src/core/defi-testing');

// Create a trading strategy analyzer
const analyzer = defiTesting.tradingStrategyAnalyzer.createAnalyzer({
  outputDir: './reports/trading-security',
});

// Analyze a trading strategy
const strategyData = {
  name: 'My Arbitrage Strategy',
  type: 'arbitrage',
  usesOnChainPriceFeeds: true,
  priceFeeds: ['uniswap'],
  slippageTolerance: 2.0,
  // Additional strategy parameters...
};

// Perform the analysis
const results = await analyzer.analyzeStrategy(strategyData);

// Access the results
console.log(`Risk Score: ${results.riskScore}/100`);
console.log(`Vulnerabilities: ${results.vulnerabilities.length}`);
```

### Supported Vulnerability Types

The analyzer can detect the following types of vulnerabilities:

- **Price Manipulation**: Strategies vulnerable to price oracle manipulation
- **Sandwich Attacks**: Strategies that can be front-run and back-run
- **Flash Loan Attacks**: Vulnerabilities related to flash loan exploitation
- **Oracle Manipulation**: Reliance on manipulable price oracles
- **Impermanent Loss Risk**: High exposure to impermanent loss
- **Rug Pull Risk**: Exposure to tokens with high rug pull potential
- **Smart Contract Risk**: Interaction with unaudited smart contracts
- **MEV Exploitation**: Susceptibility to MEV extraction
- **Insufficient Slippage Protection**: Inadequate slippage controls
- **Unlimited Approvals**: Security issues with token approvals

## Comprehensive Documentation

### Vulnerability Testing

Detect vulnerabilities in your DApps and smart contracts:

```bash
# Run full security scan
npm run security-scan -- --mode=full

# Use AI-powered detection
npm run ai-scan:verbose

# Test bridge security
npm run test-bridge:all
```

### Bug Bounty Integration

Seamlessly integrate with bug bounty platforms:

```bash
# Generate Immunefi submission
npm run submit-to-immunefi -- --input=reports/security-report.json

# Generate HackenProof submission
npm run submit-to-hackenproof -- --input=reports/security-report.json

# Start unified bounty dashboard
npm run bounty-dashboard -- --port=3030
```

### L2 Network Validation

Validate your contracts on Layer 2 networks:

```bash
# Generate L2-specific validation rules
npm run generate-l2-template -- optimism --output=./optimism-rules.json

# Validate against L2 protocol
npm run validate-l2-protocol -- optimism --config=./optimism-rules.json

# Measure L2 finality performance
npm run measure-l2-finality
```

### CI/CD Integration

Set up automated security testing in your CI pipeline:

```bash
# Set up all GitHub workflows
npm run github-workflows:setup

# Update existing workflows
npm run github-workflows:update
```

## Smart Contract Deployment Validation

Ensure your deployments are secure and optimized:

```bash
# Validate deployments with security checks
npm run deploy-validate -- --check-security --format=md

# Generate gas usage report
npm run gas-report -- --deployments=./deployments
```

## Account Abstraction (AA) Testing

Audityzer provides comprehensive testing capabilities for ERC-4337 (Account Abstraction) implementations, including smart contract accounts, bundlers, and paymasters.

### Quick Start with AA Testing

```bash
# Initialize AA test templates
audityzer init -t aa

# Run basic AA tests with Pimlico bundler
audityzer run your-aa-project --aa --pimlico --report

# Run with a different bundler
audityzer run your-aa-project --aa --bundler stackup

# Generate interactive dashboard for results
audityzer run your-aa-project --aa --bundler pimlico --dashboard
```

### AA Test Templates

We provide several test templates for different AA testing scenarios:

1. **UserOperation Validation**: Tests for malformed UserOperation inputs (`aa-userop-basic.test.js`)
2. **Paymaster Security**: Tests for paymaster gas sponsorship abuse (`aa-paymaster-gas.test.js`)
3. **Bundler Attack Simulation**: Tests for bundler queue poisoning attacks (`aa-bundler-attack.test.js`)
4. **Multi-Bundler Tests**: Tests compatibility across different bundler implementations (`aa-multi-bundler.test.js`)

### Visual Flow Diagrams

Generate visual diagrams of UserOperation execution flow:

```bash
# Create a UserOperation JSON file (example-userop.json)
# Then generate a flow diagram
audityzer aa --flow example-userop.json --output ./reports
```

This generates interactive HTML diagrams showing:

- Step-by-step execution flow of UserOperations
- Gas consumption at each stage
- Potential failure points
- Timing of execution steps

### Implementation Benchmarks

Compare performance metrics across different AA implementations:

```bash
# Run benchmark comparison between different AA implementations
audityzer benchmark --aa

# Specify custom output directory
audityzer benchmark --aa --results-dir ./my-benchmarks
```

The benchmark compares:

- Gas efficiency across different operations
- Security validation robustness
- Account creation costs
- Bundler compatibility
- Signature verification overhead

### Interactive Dashboard

Generate an interactive dashboard for AA test results:

```bash
# Generate dashboard from test results
audityzer aa --dashboard ./results.json --output ./reports

# Use dark theme
audityzer aa --dashboard ./results.json --theme dark
```

The dashboard includes:

- Visual representation of test results
- Security vulnerability breakdown
- Gas usage analytics
- Bundler compatibility matrix
- Detailed test reports with filtering options

### Multi-Bundler Integration

Test AA implementations against multiple bundlers including:

- Pimlico
- Stackup
- Alchemy
- Etherspot
- Local bundlers

```bash
# Test with specific bundler
audityzer run your-aa-project --aa --bundler alchemy

# Compare multiple bundlers (use the template directly)
npx playwright test templates/aa-tests/aa-multi-bundler.test.js
```

## Cross-Chain Bridge Testing

Test the security of cross-chain bridges:

```bash
# Test bridge security
npm run test-bridge -- optimism-bridge --source=ethereum --destination=optimism

# Run comprehensive tests across all supported chains
npm run test-bridge:all
```

## Customization and Extensions

The toolkit is designed to be extensible. Add your own plugins in the `plugins/` directory or customize the existing ones.

## GitHub CI/CD Integration

### Setting up GitHub Actions

This project includes GitHub workflow configurations to run automated security tests. To set up the GitHub CI/CD:

1. Go to your GitHub repository settings
2. Navigate to "Secrets and variables" > "Actions"
3. Add the following repository secrets:
   - `OPENAI_API_KEY` - Your OpenAI API key for enhanced security analysis

### OpenAI API Key Setup

The security analysis workflow uses OpenAI for enhanced vulnerability detection. To set up your OpenAI API key:

1. Get an API key from [OpenAI's platform](https://platform.openai.com/)
2. In your GitHub repository, go to Settings > Secrets and variables > Actions
3. Create a new repository secret named `OPENAI_API_KEY` with your API key as the value
4. The workflows will automatically use this key when running security scans

If the OpenAI API key is not available, the system will fall back to basic analysis mode without AI assistance.

### Running Security Scans

Once set up, the security analysis will run automatically on:

- Push to main/master/develop branches
- Pull requests to these branches

You can also manually trigger scans from the Actions tab by selecting the "Audityzer Security Analysis" workflow and clicking "Run workflow".

### Dependencies Installation

If you encounter dependency issues when running examples locally, use the following scripts:

```bash
# Install all critical dependencies with proper flags
npm run install:deps

# Install specific dependencies
npm run install:ethers
npm run install:web3
npm run install:openai
```

These scripts handle compatibility conflicts and use the correct version and flags for installation.

## Interactive Visualizations

Audityzer now provides enhanced visualization capabilities for test results, especially for Account Abstraction testing:

```bash
# Generate a dashboard visualization from test results
audityzer visualize results.json --type dashboard --output ./reports/dashboards

# Generate a dashboard with custom theme
audityzer visualize results.json --theme dark --title "My AA Test Results"

# Generate dashboard directly during testing
audityzer run myapp --aa --addon social-recovery --dashboard --theme dark
```

### Visualization Features

- **Interactive Dashboards**: Generate HTML dashboards with detailed test results
- **Gas Usage Charts**: Visualize gas consumption across different operations
- **Vulnerability Breakdown**: Visual representation of detected vulnerabilities by severity
- **Test Result Summaries**: Clear visualization of test pass/fail rates
- **Addon-Specific Visualizations**: Specialized visualizations for different AA features

### Integration with CI/CD

Visualization outputs can be saved as artifacts in your CI pipeline:

```yaml
# GitHub workflow example
- name: Run AA tests with visualization
  run: audityzer run myapp --aa --dashboard --ci

- name: Upload dashboard artifacts
  uses: actions/upload-artifact@v2
  with:
    name: test-dashboards
    path: reports/dashboards/
```

### Customization

You can customize visualizations by editing the theme settings:

```javascript
// Custom theme configuration
const dashboardGenerator = new AADashboardGenerator({
  theme: 'dark',
  branding: {
    primaryColor: '#3498db',
    secondaryColor: '#2ecc71',
    textColor: '#ffffff',
    backgroundColor: '#2c3e50'
  }
});
```
