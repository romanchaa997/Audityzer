# MetaMask Security Testing Tools

This directory contains specialized tools for security testing of the MetaMask browser extension, designed to find vulnerabilities that could qualify for bug bounty rewards.

## Features

- **Permission Testing**: Tests for permission bypass vulnerabilities
- **Transaction Signing Security**: Tests for transaction data tampering vulnerabilities
- **Signature Manipulation Detection**: Tests for signature manipulation and replay vulnerabilities
- **Extension Code Analysis**: AI-powered vulnerability detection in extension code
- **UI Security Testing**: Tests for proper security indicators and permissions display

## Getting Started

### Prerequisites

- Node.js 16+
- Playwright installed (`npm install @playwright/test`)
- MetaMask extension files (for static analysis)
- An OpenAI API key (for AI-powered analysis)

### Installation

1. Download the MetaMask extension source (either from their GitHub repository or by extracting the extension from Chrome)
2. Place the MetaMask extension files in this directory or set the `METAMASK_EXTENSION_PATH` environment variable
3. Set up your OpenAI API key: `export OPENAI_API_KEY=your_key_here`

### Running Tests

#### Automated Vulnerability Tests

```bash
# Run permission bypass tests
npx playwright test web3fuzzforge-community-tests/dapp-tests/wallet-connection/metamask-permissions-bypass.test.js

# Run transaction signature tampering tests
npx playwright test web3fuzzforge-community-tests/dapp-tests/transaction-flow/metamask-signature-tampering.test.js

# Run full extension security analysis (requires extension files)
npx playwright test tests/metamask-extension-security.test.js
```

#### Fuzzing Tests

```bash
# Start the MetaMask interface fuzzer
cd Web3FuzzForge
npm start -- --route=metamask-fuzzer
```

## How It Works

### Permission Testing

These tests simulate various attack vectors on MetaMask's permission system:

- Multiple rapid permission requests to detect race conditions
- Tab switching during connection flows
- Iframe-based permission bypasses
- Excessive permission request detection

### Transaction Security

These tests look for vulnerabilities in transaction signing flow:

- Transaction data tampering after user approval
- Gas limit and gas price manipulation
- Non-standard transaction parameter handling
- Transaction signature replay protection

### AI-Powered Analysis

We use advanced AI models to analyze MetaMask's codebase for:

- Known vulnerability patterns
- Potential logic errors
- Security best practice violations
- Custom vulnerability types specific to browser wallets

## Bug Bounty Submission Guide

If the tools detect potential vulnerabilities:

1. **Verify the issue**: Manually confirm the finding is reproducible
2. **Document the vulnerability**: Clearly describe the issue, impact, and steps to reproduce
3. **Submit to HackerOne**: Create a detailed report at https://hackerone.com/metamask
4. **Follow responsible disclosure**: Wait for the MetaMask team to respond before public disclosure

## Contributing

We welcome contributions to improve these security testing tools:

1. Add new test cases for emerging vulnerability types
2. Improve the AI analysis models with better prompts
3. Add support for testing new MetaMask features

## License

This security testing toolkit is provided under the MIT license.
