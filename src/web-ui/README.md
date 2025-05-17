# Audityzer CLI Playground

This is a browser-based CLI emulator for the Audityzer tool. It provides a convenient way to interact with Audityzer commands and functionality without having to use the command line.

## Features

- Interactive terminal emulator
- Command history
- Support for core Audityzer commands:
  - `create` - Create new test templates
  - `list` - List available templates and presets
  - `run` - Simulate running tests
  - `help` - Display help information
- Quick reference panel with command documentation

## Getting Started

### Prerequisites

- Node.js installed (v14 or later)
- Audityzer package installed

### Running the Web UI

Run the following command from the project root:

```bash
npm run web-ui
```

Then open your browser and navigate to:

```
http://localhost:3000
```

## Using the CLI Playground

The Web UI provides an interactive terminal where you can enter Audityzer commands. Here are some examples:

### Create a test template

```
create connect --lang=ts --provider=metamask
```

### List available templates

```
list templates
```

### Run a test (simulation)

```
run tests/metamask-connect.ts --headed
```

## Available Commands

- `help` - Display help information
- `clear` - Clear the terminal
- `create <template> [options]` - Create a new test template
  - Options:
    - `--lang=<lang>` - Language (js, ts)
    - `--provider=<provider>` - Provider (metamask, walletconnect, coinbase)
- `list [templates|presets]` - List available templates or presets
- `run <testfile> [options]` - Run a test
  - Options:
    - `--headed` - Run in headed mode
    - `--debug` - Run in debug mode
- `version` - Display version information

## Screenshots

![Audityzer CLI Playground](../../media/web-ui-screenshot.png)

## License

MIT
