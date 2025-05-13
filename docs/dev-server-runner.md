# Dev Server Runner

A cross-platform development server manager with port management, process tracking, and health monitoring capabilities.

## Features

- **Port Management**: Automatically finds available ports if the preferred one is in use
- **Process Tracking**: Remembers running server processes and their ports
- **Health Monitoring**: Provides a `/health` endpoint for monitoring server status
- **Auto-Kill on Re-run**: Automatically stops existing servers before starting new ones
- **Environment Configuration**: Supports configuration via .env files
- **Cross-Platform**: Works on Windows, macOS, and Linux

## Installation

The Dev Server Runner is included with the Web3 Security Test Kit. You can also install it separately:

```bash
npm install --save-dev dev-server-runner
```

## Usage

### Command Line Interface

```bash
# Start the development server (default port 5050)
npx dev-server-runner start

# Start with a specific port (fallback to next available if busy)
npx dev-server-runner start --port 3000

# Start with a specific directory to serve
npx dev-server-runner start --dir dist

# Stop the running server
npx dev-server-runner stop

# Check server status
npx dev-server-runner status

# Restart the server
npx dev-server-runner restart
```

### NPM Scripts

Add these scripts to your package.json:

```json
"scripts": {
  "dev:serve": "dev-server-runner start",
  "stop:serve": "dev-server-runner stop",
  "server:status": "dev-server-runner status",
  "server:restart": "dev-server-runner restart"
}
```

Then run:

```bash
# Start the server
npm run dev:serve

# Stop the server
npm run stop:serve

# Check server status
npm run server:status
```

## Configuration

### Command Line Options

| Option | Description |
|--------|-------------|
| `--port`, `-p` | Preferred port (will find next available if occupied) |
| `--dir`, `-d` | Directory to serve (default: public) |
| `--config`, `-c` | Config file path |
| `--log-level`, `-l` | Log level: debug, info, warn, error |

### Environment Variables

You can configure the server through environment variables or a `.env` file:

```
# Server Configuration
# Specify a fixed port (useful for CI/CD or other integrations)
SERVER_PORT=5050

# Directory to serve (default is 'public')
PUBLIC_DIR=public

# Log level (info, warn, error, debug)
LOG_LEVEL=info
```

## Health Endpoint

The server automatically creates a health endpoint at:
```
http://localhost:<SERVER_PORT+1>/health
```

For example, if your server is running on port 5050, the health endpoint will be at `http://localhost:5051/health`.

This endpoint returns JSON with server status, including:
- PID
- Port
- Uptime
- Start time

## Logging

All server events are logged to both console and a `server.log` file in your project root, making it easy to debug issues.

## Cross-Platform Support

The runner is thoroughly tested on:
- Windows (PowerShell & CMD)
- macOS
- Linux
- Git Bash on Windows

## License

MIT 