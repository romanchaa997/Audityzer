# Web3TestForge

This repository contains resources and tools for testing and ensuring the security of Web3 applications. It includes checklists for smart contract security, frontend DApp security, and bounty hunting basics, as well as sample automated tests.

## Quick Start

Get up and running with the test kit in minutes:

```bash
# Clone the repository
git clone https://gitlab.com/romanchaa997/web3-security-test-kit.git

# Navigate to the autotests directory
cd web3-security-test-kit/autotests

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run the tests
npm run test
```

### MetaMask Testing

The sample tests include mocked MetaMask functionality, so no extension installation is required for basic tests. 

If you want to test with the actual MetaMask extension:

1. Install the MetaMask extension in your browser
2. Create a test wallet with a private network (like Hardhat or Ganache)
3. Modify the tests to use the actual MetaMask API instead of the mock

## Examples

### MetaMask Login Test

The repository includes an automated test for MetaMask login using Playwright:

![MetaMask Test in Action](./media/metamask-test.gif)

### Smart Contract Security Checklist

A comprehensive checklist for ensuring smart contract security:

![Smart Contract Security Checklist](./media/checklist-preview.png)

### Automated Security Scans

The repository includes automated security scan scripts that detect common issues:

```bash
# Run security scan (Linux/Mac)
cd web3-security-test-kit
bash ./automation/scan-contracts.sh

# Run security scan (Windows - PowerShell)
cd web3-security-test-kit
powershell -ExecutionPolicy Bypass -File "./automation/run-scan.ps1"

# Run security scan (Windows - Command Prompt)
cd web3-security-test-kit
automation\run-scan.bat
```

The scan produces a comprehensive report with security recommendations.

### Sample Vulnerable Contracts

The security checklists include links to practice environments with sample vulnerable contracts:

- **Ethernaut** - OpenZeppelin's gamified smart contract hacking challenges
- **Damn Vulnerable DeFi** - Realistic DeFi vulnerability scenarios
- **Capture The Ether** - Classic Ethereum vulnerabilities

## Repository Structure

- **checklists/** - Security checklists for different aspects of Web3 development
- **autotests/** - Automated tests for Web3 applications
- **media/** - Visual examples and demonstrations 
- **automation/** - Scripts for automated security scanning
- **.github/workflows/** - CI/CD workflows for automated scanning 