# Audityzer CLI Reference

This document provides a comprehensive reference for all Audityzer CLI commands, options, and usage examples.

## Command Structure

All Audityzer commands follow this structure:

```
Audityzer [command] [subcommand] [options]
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

Initialize a new Audityzer project.

```bash
Audityzer init [project-name] [options]
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
Audityzer init my-dapp-tests

# Create a project with the advanced template
Audityzer init my-dapp-tests --template advanced

# Create in current directory
Audityzer init . --force
```

### `generate`

Generate test scaffolds for specific components.

```bash
Audityzer generate [component] [options]
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
Audityzer generate wallet-connection --wallet=metamask

# Generate transaction flow tests for Polygon
Audityzer generate transaction-flow --chain=137

# Generate custom signing tests
Audityzer generate signing --wallet=walletconnect --output=./custom-tests
```

### `fuzz`

Configure and run fuzzing tests.

```bash
Audityzer fuzz [component] [options]
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
Audityzer fuzz wallet-connection --mode=aggressive

# Run time-limited transaction fuzz tests
Audityzer fuzz transaction-flow --duration=30

# Fuzz with a specific seed
Audityzer fuzz network-switch --seed=12345
```

### `test`

Run tests without fuzzing.

```bash
Audityzer test [patterns] [options]
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
Audityzer test

# Run specific test file
Audityzer test tests/metamask-connection.spec.js

# Run with specific browser in headed mode
Audityzer test --browser=chromium --headless=false

# Run with HTML report
Audityzer test --reporter=html
```

### `report`

Generate reports from test results.

```bash
Audityzer report [options]
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
Audityzer report --format=html

# Generate PDF report with screenshots
Audityzer report --format=pdf --include-screenshots --output=security-report.pdf

# Generate JSON report
Audityzer report --format=json --output=report.json
```

### `config`

Manage Audityzer configuration.

```bash
Audityzer config [action] [key] [value]
```

**Actions:**

- `get`: Get config value
- `set`: Set config value
- `list`: List all config values
- `init`: Create default config file

**Examples:**

```bash
# Initialize config
Audityzer config init

# Set browser path
Audityzer config set browser.path /usr/bin/chromium

# Get configuration
Audityzer config get browser.path

# List all configuration
Audityzer config list
```

## Advanced Commands

### `mock`

Create and manage wallet mocks.

```bash
Audityzer mock [action] [options]
```

**Actions:**

- `create`: Create a new mock
- `list`: List available mocks
- `start`: Start a mock server
- `stop`: Stop a mock server

**Examples:**

```bash
# Create a MetaMask mock
Audityzer mock create --wallet=metamask

# Start the mock server
Audityzer mock start --port=8545
```

### `ci`

Generate CI/CD pipeline configurations.

```bash
Audityzer ci [platform] [options]
```

**Platforms:**

- `github`: GitHub Actions
- `gitlab`: GitLab CI
- `jenkins`: Jenkins
- `circle`: CircleCI

**Examples:**

```bash
# Generate GitHub Actions workflow
Audityzer ci github --output=.github/workflows/test.yml

# Generate GitLab CI config
Audityzer ci gitlab
```

### `analyze`

Analyze your dApp for potential security issues.

```bash
Audityzer analyze [target] [options]
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
Audityzer analyze ./my-dapp

# Analyze a deployed dApp
Audityzer analyze --url=https://example.com --depth=3
```

### `bounty`

Generate vulnerability reports and submissions for bug bounty platforms.

```bash
Audityzer bounty [platform] [options]
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
Audityzer bounty immunefi --input ./test-results/security/report.json

# Generate Code4rena contest submissions
Audityzer bounty code4rena --contest-id your-contest-id

# Generate Sherlock audit report
Audityzer bounty sherlock --contest-name your-audit-name --judging

# Generate bridge vulnerability reports
Audityzer bounty bridge --fetch-code4rena --fetch-sherlock --limit 10
```

You can also use the direct commands:

```bash
# Submit to Immunefi
Audityzer submit-to-immunefi --input ./test-results/security/report.json

# Submit to Code4rena
Audityzer submit-to-code4rena --contest-id your-contest-id

# Generate Sherlock report
Audityzer generate-sherlock-report --contest-name your-audit-name

# Generate bridge reports
Audityzer generate-bridge-reports --fetch-code4rena --fetch-sherlock
```

## Environment Variables

Audityzer respects the following environment variables:

| Variable                    | Description                          |
| --------------------------- | ------------------------------------ |
| `Audityzer_CONFIG_PATH` | Custom config file path              |
| `Audityzer_LOG_LEVEL`   | Log level (debug, info, warn, error) |
| `Audityzer_BROWSER`     | Default browser to use               |
| `Audityzer_HEADLESS`    | Run in headless mode (true/false)    |
| `Audityzer_WORKERS`     | Number of parallel workers           |

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

The default configuration file (`.Audityzer.json`) supports the following options:

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
