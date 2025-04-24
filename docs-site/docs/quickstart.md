---
sidebar_position: 3
---

# Quickstart

This guide will help you quickly get up and running with Web3FuzzForge by generating your first test templates.

![Web3FuzzForge Quickstart](../static/img/web3fuzzforge-quickstart.gif)

## Generate Your First Test

### Wallet Connection Test

Generate a test for connecting to a MetaMask wallet:

```bash
web3fuzzforge generate connect --wallet metamask --out ./tests/connection.test.js
```

### Transaction Test

Generate a test for sending a transaction through MetaMask:

```bash
web3fuzzforge generate tx --wallet metamask --out ./tests/transaction.test.js
```

### Signature Test

Generate a test for signing a message with MetaMask:

```bash
web3fuzzforge generate sign --wallet metamask --out ./tests/sign.test.js
```

## Using TypeScript

All commands support TypeScript with the `--typescript` flag:

```bash
web3fuzzforge generate connect --wallet metamask --out ./tests/connection.test.ts --typescript
```

## Using Preset Configurations

For common application types, use the `--preset` flag:

```bash
# For ERC20/721 token applications
web3fuzzforge generate connect --preset erc --out ./tests/nft-connect-test.js

# For DeFi applications
web3fuzzforge generate tx --preset defi --out ./tests/defi-swap-test.js

# For DAO applications
web3fuzzforge generate sign --preset dao --out ./tests/dao-voting-test.js
```

## Running Tests

Web3FuzzForge generates tests for Playwright. Run them with:

```bash
# In headless mode
npx playwright test tests/connection.test.js

# In headed mode for debugging
npx playwright test tests/connection.test.js --headed
```

## Using the AI Assistant

For more intuitive configuration, use the `ask` command:

```bash
web3fuzzforge ask "generate a MetaMask connection test for a DeFi app"
```

This will create a `.web3fuzzforge.json` configuration file you can use for subsequent test generation.

## Next Steps

Explore the [Commands](commands) documentation to learn about all available options, or check out [Wallet Support](wallet-support) to see which wallets you can test with. 