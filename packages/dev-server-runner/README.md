# DevForge

[![npm version](https://img.shields.io/npm/v/devforge.svg)](https://www.npmjs.com/package/devforge)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

<p align="center">
  <img src="https://github.com/YourUser/devforge/raw/main/assets/img/devforge-logo.png" width="300" alt="DevForge Logo">
</p>

**Intelligent development server for Web3 security testing**

DevForge is a powerful development server manager built specifically for Web3 security testing environments. It automatically resolves port conflicts, provides health monitoring endpoints, and delivers robust process management across all platforms.

## Features

- ✅ **Automatic Port Management** - Automatically finds open ports when your preferred one is in use
- ✅ **Health API Endpoint** - Built-in monitoring endpoint with server metadata
- ✅ **Cross-Platform** - Works seamlessly on Windows, macOS, and Linux
- ✅ **Smart Process Management** - Properly handles process cleanup and termination
- ✅ **Detailed Logging** - Configurable logging for troubleshooting
- ✅ **Security-Focused** - Built for Web3 security testing workflows

## Installation

```bash
npm install -g devforge
```

Or add to your project:

```bash
npm install devforge --save-dev
```

## Quick Start

```bash
# Start a development server on the default port (5050)
devforge start

# Start with a specific port (will find next available if occupied)
devforge start -p 3000

# Start with a custom directory to serve
devforge start -d ./public

# Check server status
devforge status

# Restart the server
devforge restart

# Stop the server
devforge stop
```

## Command Options

### Start Command
```bash
devforge start [options]
```

Options:
- `-p, --port <port>`: Set preferred port (will find next available if occupied)
- `-d, --dir <directory>`: Directory to serve (default: public)
- `-c, --config <file>`: Config file path
- `-l, --log-level <level>`: Log level: debug, info, warn, error

### Restart Command
```bash
devforge restart [options]
```
Supports all the same options as start.

### Stop Command
```bash
devforge stop
```

### Status Command
```bash
devforge status
```

## Health Endpoint

DevForge creates a health endpoint at `http://localhost:<port+1>/health` that returns server metadata in JSON format:

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

You can also use DevForge programmatically in your Node.js applications:

```javascript
const devforge = require('devforge');

// Start a server
devforge.start({
  port: 5050,
  directory: './public',
  configPath: './config.json',
  logLevel: 'info'
});

// Get server status
const status = devforge.getStatus();
console.log(status);

// Stop server
devforge.stop();
```

## Environment Variables

DevForge respects the following environment variables:

- `SERVER_PORT`: Default port to use (falls back to 5050)
- `PUBLIC_DIR`: Directory to serve (falls back to './public')
- `LOG_LEVEL`: Logging verbosity (debug, info, warn, error)
- `FALLBACK_PORT_RANGE`: Number of ports to try after initial port is occupied

## Common Use Cases

### Web3 Security Testing
```bash
# Start server for DApp testing
devforge start -p 8545

# Run security tests against server
npm run test:security
```

### CI/CD Pipeline Integration
```yaml
- name: Start DevForge Server
  run: npx devforge start -p 5000
  
- name: Run Tests
  run: npm test
  
- name: Stop DevForge Server
  run: npx devforge stop
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