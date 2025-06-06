# Audityzer

[![npm version](https://img.shields.io/npm/v/audityzer.svg)](https://www.npmjs.com/package/audityzer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

<p align="center">
  <img src="https://github.com/YourUser/audityzer/raw/main/assets/img/audityzer-logo.png" width="300" alt="Audityzer Logo">
</p>

**Intelligent development server for Web3 security testing**

Audityzer is a powerful development server manager built specifically for Web3 security testing environments. It automatically resolves port conflicts, provides health monitoring endpoints, and delivers robust process management across all platforms.

## Features

- ✅ **Automatic Port Management** - Automatically finds open ports when your preferred one is in use
- ✅ **Health API Endpoint** - Built-in monitoring endpoint with server metadata
- ✅ **Cross-Platform** - Works seamlessly on Windows, macOS, and Linux
- ✅ **Smart Process Management** - Properly handles process cleanup and termination
- ✅ **Detailed Logging** - Configurable logging for troubleshooting
- ✅ **Security-Focused** - Built for Web3 security testing workflows

## Installation

```bash
npm install -g audityzer
```

Or add to your project:

```bash
npm install audityzer --save-dev
```

## Quick Start

```bash
# Start a development server on the default port (5050)
audityzer start

# Start with a specific port (will find next available if occupied)
audityzer start -p 3000

# Start with a custom directory to serve
audityzer start -d ./public

# Check server status
audityzer status

# Restart the server
audityzer restart

# Stop the server
audityzer stop
```

## Command Options

### Start Command
```bash
audityzer start [options]
```

Options:
- `-p, --port <port>`: Set preferred port (will find next available if occupied)
- `-d, --dir <directory>`: Directory to serve (default: public)
- `-c, --config <file>`: Config file path
- `-l, --log-level <level>`: Log level: debug, info, warn, error

### Restart Command
```bash
audityzer restart [options]
```
Supports all the same options as start.

### Stop Command
```bash
audityzer stop
```

### Status Command
```bash
audityzer status
```

## Health Endpoint

Audityzer creates a health endpoint at `http://localhost:<port+1>/health` that returns server metadata in JSON format:

```json
{
  "status": "running",
  "uptime": 125.4,
  "pid": 12345,
  "port": 5050,
  "memory": "24.8MB",
  "os": "windows",
  "node": "v16.14.0",
  "timestamp": "2025-05-13T03:05:48.000Z"
}
```

## API Usage

You can also use Audityzer programmatically in your Node.js applications:

```javascript
const audityzer = require('audityzer');

// Start a server
audityzer.start({
  port: 5050,
  directory: './public',
  configPath: './config.json',
  logLevel: 'info'
});

// Get server status
const status = audityzer.getStatus();
console.log(status);

// Stop server
audityzer.stop();
```

## Environment Variables

Audityzer respects the following environment variables:

- `SERVER_PORT`: Default port to use (falls back to 5050)
- `PUBLIC_DIR`: Directory to serve (falls back to './public')
- `LOG_LEVEL`: Logging verbosity (debug, info, warn, error)
- `FALLBACK_PORT_RANGE`: Number of ports to try after initial port is occupied

## Common Use Cases

### Web3 Security Testing
```bash
# Start server for DApp testing
audityzer start -p 8545

# Run security tests against server
npm run test:security
```

### CI/CD Pipeline Integration
```yaml
- name: Start Audityzer Server
  run: npx audityzer start -p 5000
  
- name: Run Tests
  run: npm test
  
- name: Stop Audityzer Server
  run: npx audityzer stop
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Your Organization] 