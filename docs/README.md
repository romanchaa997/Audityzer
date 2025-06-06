
# Audityzer Documentation

Welcome to Audityzer, a comprehensive Web3 security testing toolkit for DeFi applications and smart contracts.

## Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/romanchaa997/audityzer.git
cd audityzer

# Install dependencies
npm install

# Run setup
npm run setup:dev
```

### Basic Usage

```bash
# Run a security audit
npx audityzer audit --target https://your-dapp.com

# Start the web interface
npm start

# Run tests
npm test
```

## Features

- 🔒 **Security Testing**: Comprehensive security vulnerability detection
- 🌉 **Cross-chain Support**: Multi-blockchain compatibility
- 🤖 **AI Integration**: AI-powered vulnerability analysis via MCP server
- 📊 **Detailed Reports**: HTML, JSON, and PDF reporting
- 🔧 **CLI & Web Interface**: Multiple interaction methods
- 🐳 **Docker Support**: Containerized deployment
- ☸️ **Kubernetes Ready**: Production-ready K8s manifests

## Architecture

Audityzer consists of several components:

1. **Core Engine**: Security testing and analysis engine
2. **CLI Interface**: Command-line tool for automation
3. **Web Interface**: Browser-based dashboard
4. **MCP Server**: AI integration for enhanced analysis
5. **Reporting System**: Multi-format report generation

## Getting Started

See our [Getting Started Guide](./getting-started.md) for detailed setup instructions.

## Documentation

- [Installation Guide](./installation.md)
- [User Guide](./user-guide.md)
- [API Documentation](./api.md)
- [Testing Guide](./testing.md)
- [Deployment Guide](./deployment.md)
- [Development Guide](./development.md)

## Support

- [GitHub Issues](https://github.com/romanchaa997/audityzer/issues)
- [Documentation](https://audityzer.dev/docs)
- [Community Discord](https://discord.gg/audityzer)

## License

MIT License - see [LICENSE](../LICENSE) for details.
