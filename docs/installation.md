# Web3FuzzForge Installation Guide

This guide will help you install and set up Web3FuzzForge on your system.

## System Requirements

Before installing Web3FuzzForge, ensure your system meets the following requirements:

### Operating Systems

- **Windows:** Windows 10 or higher
- **macOS:** 10.15 (Catalina) or higher
- **Linux:** Ubuntu 20.04+, Debian 10+, CentOS 8+

### Dependencies

- **Node.js:** v14.0.0 or higher
- **npm:** v6.0.0 or higher
- **Chromium-based browser:** Chrome, Edge, or Brave

### Hardware

- **RAM:** 4 GB minimum (8 GB recommended)
- **Disk Space:** 500 MB for installation plus space for test artifacts
- **Internet Connection:** Required for initial setup and wallet testing

## Installation Methods

### Method 1: NPM Global Installation (Recommended)

The easiest way to install Web3FuzzForge is via npm:

```bash
npm install -g web3fuzzforge
```

Verify the installation:

```bash
web3fuzzforge --version
```

### Method 2: Yarn Global Installation

If you prefer yarn:

```bash
yarn global add web3fuzzforge
```

Verify the installation:

```bash
web3fuzzforge --version
```

### Method 3: Docker (For CI/CD Environments)

We provide a Docker image for CI/CD environments:

```bash
docker pull web3fuzzforge/web3fuzzforge:latest
docker run -it web3fuzzforge/web3fuzzforge --version
```

## Platform-Specific Instructions

### Windows Setup

1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Open PowerShell as Administrator
3. Run the installation command:
   ```powershell
   npm install -g web3fuzzforge
   ```
4. If you encounter permission errors, you may need to adjust your execution policy:
   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
   ```

### macOS Setup

1. Install Node.js using Homebrew:
   ```bash
   brew install node
   ```
2. Install Web3FuzzForge:
   ```bash
   npm install -g web3fuzzforge
   ```
3. If you encounter permission errors:
   ```bash
   sudo npm install -g web3fuzzforge --unsafe-perm=true
   ```

### Linux Setup

1. Install Node.js and npm:

   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nodejs npm

   # CentOS/RHEL
   sudo yum install nodejs npm
   ```

2. Install Web3FuzzForge:
   ```bash
   sudo npm install -g web3fuzzforge
   ```

## Troubleshooting Common Issues

### Permission Errors

If you encounter EACCES errors when installing globally:

```bash
# Method 1: Change npm's default directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile

# Method 2: Use NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node
nvm use node
npm install -g web3fuzzforge
```

### Browser Detection Issues

If Web3FuzzForge cannot find a browser:

1. Ensure you have at least one Chromium-based browser installed
2. Set the browser path explicitly:
   ```bash
   web3fuzzforge config set browser.path=/path/to/browser
   ```

### Playwright Dependency Issues

Web3FuzzForge uses Playwright for browser automation. If it fails to install:

```bash
npx playwright install
npx playwright install-deps
```

## Dependencies Installation

When you first run Web3FuzzForge, it will automatically install required dependencies. To manually install them:

```bash
web3fuzzforge setup
```

## Configuration

After installation, configure your environment:

```bash
web3fuzzforge config init
```

This creates a configuration file at `~/.web3fuzzforge/config.json` which you can edit manually or using:

```bash
web3fuzzforge config set key.path value
```

## Next Steps

After installation, check out these guides:

- [Quick Start Guide](./quickstart.md)
- [Testing MetaMask Connections](./wallets/metamask.md)
- [Transaction Testing](./transaction-testing.md)
- [CI/CD Integration](./ci-cd-integration.md)

## Getting Help

If you encounter any issues during installation:

- Check our [FAQ](./faq.md)
- Join our [Discord community](https://discord.gg/web3fuzzforge)
- Open an issue on our [GitHub repository](https://github.com/web3fuzzforge/web3fuzzforge)
- Email support at support@web3fuzzforge.io
