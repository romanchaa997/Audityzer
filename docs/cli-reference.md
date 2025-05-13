# Web3FuzzForge CLI Reference

This document provides a comprehensive reference for all Web3FuzzForge CLI commands, options, and usage examples.

## Command Structure

All Web3FuzzForge commands follow this structure:

```
web3fuzzforge [command] [subcommand] [options]
```

## Global Options

These options can be used with any command:

| Option            | Description                       |
| ----------------- | --------------------------------- |
| `--help`, `-h`    | Display help information          |
| `--version`, `-v` | Display version information       |
| `--config <path>` | Specify a custom config file path |
| `--verbose`       | Enable verbose logging            |
| `--quiet`         | Suppress all output except errors |
| `--json`          | Output results in JSON format     |

## Core Commands

### `init`

Initialize a new Web3FuzzForge project.

```bash
web3fuzzforge init [project-name] [options]
```

**Options:**

| Option              | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `--template <name>` | Specify a project template (default, basic, advanced) |
| `--skip-install`    | Skip dependency installation                          |
| `--force`           | Overwrite existing directory                          |

**Examples:**

```bash
# Create a new project
web3fuzzforge init my-dapp-tests

# Create a project with the advanced template
web3fuzzforge init my-dapp-tests --template advanced

# Create in current directory
web3fuzzforge init . --force
```

### `generate`

Generate test scaffolds for specific components.

```bash
web3fuzzforge generate [component] [options]
```

**Components:**

- `wallet-connection`: Generate wallet connection tests
- `transaction-flow`: Generate transaction flow tests
- `network-switch`: Generate network switching tests
- `signing`: Generate message signing tests
- `custom`: Generate custom tests

**Options:**

| Option               | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `--wallet <name>`    | Specify wallet type (metamask, walletconnect, coinbase) |
| `--chain <chain-id>` | Specify target blockchain (e.g., 1 for Ethereum)        |
| `--output <dir>`     | Output directory for generated files                    |

**Examples:**

```bash
# Generate MetaMask connection tests
web3fuzzforge generate wallet-connection --wallet=metamask

# Generate transaction flow tests for Polygon
web3fuzzforge generate transaction-flow --chain=137

# Generate custom signing tests
web3fuzzforge generate signing --wallet=walletconnect --output=./custom-tests
```

### `fuzz`

Configure and run fuzzing tests.

```bash
web3fuzzforge fuzz [component] [options]
```

**Options:**

| Option                 | Description                                   |
| ---------------------- | --------------------------------------------- |
| `--mode <mode>`        | Fuzzing intensity (light, normal, aggressive) |
| `--duration <time>`    | Test duration in minutes                      |
| `--seed <number>`      | Random seed for reproducible fuzzing          |
| `--include <patterns>` | Test patterns to include                      |
| `--exclude <patterns>` | Test patterns to exclude                      |

**Examples:**

```bash
# Fuzz wallet-connection with aggressive mode
web3fuzzforge fuzz wallet-connection --mode=aggressive

# Run time-limited transaction fuzz tests
web3fuzzforge fuzz transaction-flow --duration=30

# Fuzz with a specific seed
web3fuzzforge fuzz network-switch --seed=12345
```

### `test`

Run tests without fuzzing.

```bash
web3fuzzforge test [patterns] [options]
```

**Options:**

| Option                  | Description                                |
| ----------------------- | ------------------------------------------ |
| `--browser <browser>`   | Browser to use (chromium, firefox, webkit) |
| `--headless`            | Run tests in headless mode                 |
| `--workers <number>`    | Number of parallel workers                 |
| `--retries <number>`    | Retry failed tests                         |
| `--reporter <reporter>` | Test reporter (list, dot, html, json)      |

**Examples:**

```bash
# Run all tests
web3fuzzforge test

# Run specific test file
web3fuzzforge test tests/metamask-connection.spec.js

# Run with specific browser in headed mode
web3fuzzforge test --browser=chromium --headless=false

# Run with HTML report
web3fuzzforge test --reporter=html
```

### `report`

Generate reports from test results.

```bash
web3fuzzforge report [options]
```

**Options:**

| Option                  | Description                         |
| ----------------------- | ----------------------------------- |
| `--format <format>`     | Report format (html, pdf, json, md) |
| `--output <path>`       | Output file path                    |
| `--include-screenshots` | Include screenshots in report       |
| `--include-traces`      | Include traces in report            |

**Examples:**

```bash
# Generate HTML report
web3fuzzforge report --format=html

# Generate PDF report with screenshots
web3fuzzforge report --format=pdf --include-screenshots --output=security-report.pdf

# Generate JSON report
web3fuzzforge report --format=json --output=report.json
```

### `config`

Manage Web3FuzzForge configuration.

```bash
web3fuzzforge config [action] [key] [value]
```

**Actions:**

- `get`: Get config value
- `set`: Set config value
- `list`: List all config values
- `init`: Create default config file

**Examples:**

```bash
# Initialize config
web3fuzzforge config init

# Set browser path
web3fuzzforge config set browser.path /usr/bin/chromium

# Get configuration
web3fuzzforge config get browser.path

# List all configuration
web3fuzzforge config list
```

## Advanced Commands

### `mock`

Create and manage wallet mocks.

```bash
web3fuzzforge mock [action] [options]
```

**Actions:**

- `create`: Create a new mock
- `list`: List available mocks
- `start`: Start a mock server
- `stop`: Stop a mock server

**Examples:**

```bash
# Create a MetaMask mock
web3fuzzforge mock create --wallet=metamask

# Start the mock server
web3fuzzforge mock start --port=8545
```

### `ci`

Generate CI/CD pipeline configurations.

```bash
web3fuzzforge ci [platform] [options]
```

**Platforms:**

- `github`: GitHub Actions
- `gitlab`: GitLab CI
- `jenkins`: Jenkins
- `circle`: CircleCI

**Examples:**

```bash
# Generate GitHub Actions workflow
web3fuzzforge ci github --output=.github/workflows/test.yml

# Generate GitLab CI config
web3fuzzforge ci gitlab
```

### `analyze`

Analyze your dApp for potential security issues.

```bash
web3fuzzforge analyze [target] [options]
```

**Options:**

| Option                | Description      |
| --------------------- | ---------------- |
| `--url <url>`         | Target dApp URL  |
| `--depth <number>`    | Analysis depth   |
| `--timeout <seconds>` | Analysis timeout |

**Examples:**

```bash
# Analyze a local dApp
web3fuzzforge analyze ./my-dapp

# Analyze a deployed dApp
web3fuzzforge analyze --url=https://example.com --depth=3
```

### `bounty`

Generate vulnerability reports and submissions for bug bounty platforms.

```bash
web3fuzzforge bounty [platform] [options]
```

**Platforms:**

- `immunefi`: Generate Immunefi vulnerability submissions
- `code4rena`: Generate Code4rena contest submissions
- `sherlock`: Generate Sherlock audit reports
- `bridge`: Generate bridge vulnerability reports

**Options:**

| Option                  | Description                           |
| ----------------------- | ------------------------------------- |
| `--input <path>`        | Path to test results file             |
| `--output-dir <path>`   | Output directory for submissions      |
| `--contest-id <id>`     | (Code4rena) Contest ID                |
| `--contest-name <name>` | (Sherlock) Contest name               |
| `--judging`             | (Sherlock) Use judging format         |
| `--fetch-code4rena`     | (Bridge) Fetch reports from Code4rena |
| `--fetch-sherlock`      | (Bridge) Fetch reports from Sherlock  |
| `--limit <number>`      | (Bridge) Number of reports to fetch   |

**Examples:**

```bash
# Generate Immunefi submissions
web3fuzzforge bounty immunefi --input ./test-results/security/report.json

# Generate Code4rena contest submissions
web3fuzzforge bounty code4rena --contest-id your-contest-id

# Generate Sherlock audit report
web3fuzzforge bounty sherlock --contest-name your-audit-name --judging

# Generate bridge vulnerability reports
web3fuzzforge bounty bridge --fetch-code4rena --fetch-sherlock --limit 10
```

You can also use the direct commands:

```bash
# Submit to Immunefi
web3fuzzforge submit-to-immunefi --input ./test-results/security/report.json

# Submit to Code4rena
web3fuzzforge submit-to-code4rena --contest-id your-contest-id

# Generate Sherlock report
web3fuzzforge generate-sherlock-report --contest-name your-audit-name

# Generate bridge reports
web3fuzzforge generate-bridge-reports --fetch-code4rena --fetch-sherlock
```

## Environment Variables

Web3FuzzForge respects the following environment variables:

| Variable                    | Description                          |
| --------------------------- | ------------------------------------ |
| `WEB3FUZZFORGE_CONFIG_PATH` | Custom config file path              |
| `WEB3FUZZFORGE_LOG_LEVEL`   | Log level (debug, info, warn, error) |
| `WEB3FUZZFORGE_BROWSER`     | Default browser to use               |
| `WEB3FUZZFORGE_HEADLESS`    | Run in headless mode (true/false)    |
| `WEB3FUZZFORGE_WORKERS`     | Number of parallel workers           |

## Exit Codes

| Code | Meaning             |
| ---- | ------------------- |
| 0    | Success             |
| 1    | General error       |
| 2    | Invalid arguments   |
| 3    | Configuration error |
| 4    | Test failure        |
| 5    | Network error       |
| 6    | Browser error       |

## Configuration File Reference

The default configuration file (`.web3fuzzforge.json`) supports the following options:

```json
{
  "browser": {
    "name": "chromium",
    "path": null,
    "headless": true
  },
  "wallets": {
    "metamask": {
      "version": "latest",
      "seed": "test test test test test test test test test test test junk",
      "password": "password123"
    }
  },
  "testing": {
    "workers": 3,
    "retries": 2,
    "timeout": 30000,
    "reporters": ["list", "html"]
  },
  "chains": {
    "ethereum": {
      "chainId": 1,
      "rpcUrl": "https://mainnet.infura.io/v3/YOUR_KEY"
    }
  }
}
```

## Troubleshooting

For common errors and troubleshooting, see the [Troubleshooting Guide](./troubleshooting.md).
