# Audityzer Installation Guide

This guide will help you install and set up Audityzer on your system.

## System Requirements

Before installing Audityzer, ensure your system meets the following requirements:

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

The easiest way to install Audityzer is via npm:

```bash
npm install -g Audityzer
```

Verify the installation:

```bash
Audityzer --version
```

### Method 2: Yarn Global Installation

If you prefer yarn:

```bash
yarn global add Audityzer
```

Verify the installation:

```bash
Audityzer --version
```

### Method 3: Docker (For CI/CD Environments)

We provide a Docker image for CI/CD environments:

```bash
docker pull Audityzer/Audityzer:latest
docker run -it Audityzer/Audityzer --version
```

## Platform-Specific Instructions

### Windows Setup

1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Open PowerShell as Administrator
3. Run the installation command:
   ```powershell
   npm install -g Audityzer
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
2. Install Audityzer:
   ```bash
   npm install -g Audityzer
   ```
3. If you encounter permission errors:
   ```bash
   sudo npm install -g Audityzer --unsafe-perm=true
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

2. Install Audityzer:
   ```bash
   sudo npm install -g Audityzer
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
npm install -g Audityzer
```

### Browser Detection Issues

If Audityzer cannot find a browser:

1. Ensure you have at least one Chromium-based browser installed
2. Set the browser path explicitly:
   ```bash
   Audityzer config set browser.path=/path/to/browser
   ```

### Playwright Dependency Issues

Audityzer uses Playwright for browser automation. If it fails to install:

```bash
npx playwright install
npx playwright install-deps
```

## Dependencies Installation

When you first run Audityzer, it will automatically install required dependencies. To manually install them:

```bash
Audityzer setup
```

## Configuration

After installation, configure your environment:

```bash
Audityzer config init
```

This creates a configuration file at `~/.Audityzer/config.json` which you can edit manually or using:

```bash
Audityzer config set key.path value
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
- Join our [Discord community](https://discord.gg/Audityzer)
- Open an issue on our [GitHub repository](https://github.com/Audityzer/Audityzer)
- Email support at support@Audityzer.io
