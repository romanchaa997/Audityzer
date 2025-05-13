# DevForge

[![npm version](https://img.shields.io/npm/v/devforge.svg)](https://www.npmjs.com/package/devforge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI/CD Pipeline](https://github.com/username/devforge/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/username/devforge/actions/workflows/ci-cd.yml)
[![Cross-Platform Tests](https://github.com/username/devforge/actions/workflows/cross-platform-tests.yml/badge.svg)](https://github.com/username/devforge/actions/workflows/cross-platform-tests.yml)
[![Lighthouse Regression](https://github.com/username/devforge/actions/workflows/website-regression.yml/badge.svg)](https://github.com/username/devforge/actions/workflows/website-regression.yml)

DevForge is an intelligent development server with automatic port management, specifically designed for Web3 security testing environments. It eliminates port conflicts, provides health monitoring endpoints, and delivers robust process management across all platforms.

<p align="center">
  <img src="https://github.com/username/devforge/raw/main/assets/img/devforge-logo.svg" width="250" alt="DevForge Logo">
</p>

## Installation

```bash
# Global installation
npm install -g devforge

# Project installation
npm install --save-dev devforge
```

## Quick Start

```bash
# Start a development server on the default port (5050)
devforge start

# Start with a specific port (will find next available if occupied)
devforge start -p 3000

# Start with a custom directory to serve
devforge start -d ./public

# Check server status
devforge status

# Restart the server
devforge restart

# Stop the server
devforge stop
```

## Key Features

- ✅ **Automatic Port Management** - Automatically finds open ports when your preferred one is in use
- ✅ **Health API Endpoint** - Built-in monitoring endpoint with server metadata
- ✅ **Cross-Platform** - Works seamlessly on Windows, macOS, and Linux
- ✅ **Smart Process Management** - Properly handles process cleanup and termination
- ✅ **Detailed Logging** - Configurable logging for troubleshooting
- ✅ **Security-Focused** - Built for Web3 security testing workflows

## Development Environment

We've streamlined the development experience with automated setup scripts and improved workflow tools:

### Cross-Platform Setup

We now support multiple platforms for development:

1. **Windows**:
   ```powershell
   # Run the setup script
   .\scripts\setup-windows.ps1
   
   # Start the development server
   .\start-server.bat
   ```

2. **Linux/macOS**:
   ```bash
   # Set up the environment
   ./scripts/setup-unix.sh
   
   # Start the development server
   ./start-server.sh
   ```

3. **Docker** (works on all platforms):
   ```bash
   # Start Docker environment
   ./scripts/docker-setup.sh start
   
   # For Windows
   powershell -ExecutionPolicy Bypass -File "scripts\docker-setup.sh" start
   ```

For detailed instructions, see our [Cross-Platform Setup Guide](docs/cross-platform-setup.md).

### Using the Server Manager

#### Windows PowerShell:
```powershell
.\scripts\server-manager.ps1 -Action start -Port 5000
.\scripts\server-manager.ps1 -Action stop -Port 5000
.\scripts\server-manager.ps1 -Action restart -Port 5000
```

#### Linux/macOS:
```bash
./scripts/server-manager.sh start 5000
./scripts/server-manager.sh stop 5000
./scripts/server-manager.sh restart 5000
```

#### Docker:
```bash
./scripts/docker-setup.sh start
./scripts/docker-setup.sh stop
./scripts/docker-setup.sh restart
```

For more detailed setup instructions, see our [Development Environment Setup Guide](docs/development-setup.md).

## Security Testing

We've enhanced the security testing capabilities with new test scenarios:

```bash
# Run all security tests
npm run test:security

# Test for specific vulnerabilities
npm run test:reentrancy
npm run test:oracle
npm run test:front-running
npm run test:phishing
npm run test:signature-replay
npm run test:access-control
npm run test:flash-loan  # New test for flash loan attacks

# Run a subset of tests
npm run test:all-vulns
```

### Automated CI Testing

Our GitHub Actions workflow now includes comprehensive security testing that runs automatically on code changes.

### Custom Test Development

You can create custom test scenarios for your specific dApp vulnerabilities in `examples/security-bug-tests/`. See our [Custom Test Guide](docs/custom-test-development.md) for examples.

## Command Reference

### Generate Test Templates

```bash
# Basic syntax
audityzer generate <type> --out <file-path> [options]

# Available test types
# - connect: Wallet connection tests
# - tx: Transaction tests
# - sign: Message signing tests
# - error: Error handling tests
# - security: Security vulnerability tests

# Options
# --wallet        Wallet provider to use (metamask, walletconnect, coinbase, rabby, phantom)
# --lang          Programming language (js, ts)
# --fuzz          Enable security fuzzing
# --lint          Enable linting and formatting
```

### Run Tests

```bash
# Run tests against a mock dApp
audityzer run --mock-mode

# Run tests against a real dApp
audityzer run --target-url http://your-dapp-url

# Generate security report after tests
audityzer run --generate-report
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

You can also manually trigger scans from the Actions tab by selecting the "Web3FuzzForge Security Analysis" workflow and clicking "Run workflow".

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
