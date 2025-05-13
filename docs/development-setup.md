# Development Environment Setup Guide

This guide explains how to set up your development environment for the Web3 Security Test Kit.

## Prerequisites

- Node.js (v16.0.0 or later)
- npm (v7.0.0 or later)
- Git

## Initial Setup

Choose the setup method appropriate for your operating system:

### Windows Setup

1. Run the Windows setup script:

   ```powershell
   # Open PowerShell as Administrator
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   
   # Run the setup script
   .\scripts\setup-windows.ps1
   ```

   Or use npm:

   ```
   npm run setup:windows
   ```

2. The script will:
   - Check for Node.js and npm
   - Install project dependencies
   - Create environment configuration files
   - Set up server management scripts
   - Create batch files for easy server management

3. Start the server:

   ```
   .\start-server.bat
   ```

### Linux/macOS Setup

1. Run the Unix setup script:

   ```bash
   # Make the script executable
   chmod +x scripts/setup-unix.sh
   
   # Run the setup script
   ./scripts/setup-unix.sh
   ```

   Or use npm:

   ```
   npm run setup:unix
   ```

2. The script will:
   - Check for Node.js and npm
   - Install project dependencies
   - Create environment configuration files
   - Set up server management scripts
   - Create shell scripts for easy server management

3. Start the server:

   ```bash
   # Make the script executable if needed
   chmod +x start-server.sh
   
   # Start the server
   ./start-server.sh
   ```

## Manual Setup

If you prefer to set up manually, follow these steps:

1. Install dependencies:

   ```bash
   # Standard installation
   npm install
   
   # If you encounter dependency conflicts
   npm run install:deps
   ```

2. Configure your environment:

   ```bash
   # Create .env file from example
   cp .env-example .env
   
   # Set up Firebase configuration
   npm run firebase:setup
   ```

3. Start the development server:

   ```bash
   # Start the server on port 5000
   npm run dev:serve
   ```

## Managing the Server

### Using Script Files

The easiest way to manage the server is using the provided script files:

- Windows:
  ```
  .\start-server.bat  # Start server
  .\stop-server.bat   # Stop server
  ```

- Linux/macOS:
  ```bash
  ./start-server.sh   # Start server
  ./stop-server.sh    # Stop server
  ```

### Using NPM Scripts

You can also use npm scripts to manage the server:

```bash
# Start the server
npm run server:start

# Stop the server
npm run server:stop

# Restart the server
npm run server:restart
```

### Using Manager Scripts Directly

For more control, use the server manager scripts directly:

- Windows PowerShell:
  ```powershell
  .\scripts\server-manager.ps1 -Action start -Port 5000
  .\scripts\server-manager.ps1 -Action stop -Port 5000
  .\scripts\server-manager.ps1 -Action restart -Port 5000
  ```

- Linux/macOS:
  ```bash
  ./scripts/server-manager.sh start 5000
  ./scripts/server-manager.sh stop 5000
  ./scripts/server-manager.sh restart 5000
  ```

## Dependency Management

### Fixing Dependency Conflicts

If you encounter dependency conflicts, run:

```bash
# Reinstall with legacy peer dependencies flag
npm run install:deps

# Run the dependency fix script manually
node scripts/fix-dependencies.js
```

The postinstall script automatically tries to fix common dependency conflicts, like those between Puppeteer and Mermaid CLI.

### Installing Playwright Browsers

To run tests, you'll need to install Playwright browsers:

```bash
npm run install:playwright
```

## Docker Development Environment

For a containerized development experience:

1. Start the Docker environment:

   ```bash
   # Basic environment
   npm run docker:start
   
   # Or use the script directly
   ./scripts/docker-setup.sh start
   ```

2. Access the application at http://localhost:5000

3. Stop the Docker environment:

   ```bash
   npm run docker:stop
   ```

4. For more Docker options:

   ```bash
   # Start with ElasticSearch and Kibana (full environment)
   ./scripts/docker-setup.sh full
   
   # Run tests in Docker
   ./scripts/docker-setup.sh test test:security
   
   # Access shell in the container
   ./scripts/docker-setup.sh shell
   
   # Rebuild the Docker image
   ./scripts/docker-setup.sh build
   ```

## Testing

Run tests using the following commands:

```bash
# Run unit tests
npm test

# Run Playwright tests with mocked environment
npm run test:playwright

# Run security vulnerability tests
npm run test:security

# Run specific vulnerability tests
npm run test:reentrancy
npm run test:flash-loan
npm run test:phishing
# etc.

# Run a subset of vulnerability tests
npm run test:all-vulns
```

## Generating Reports

Generate test reports with:

```bash
# Generate security report
npm run report:generate

# Generate HTML report
npm run report:html

# Upload report to Firebase (requires configuration)
npm run report:upload
```

## Troubleshooting

### Windows Issues

- **PowerShell Execution Policy**: If you get execution policy errors, run PowerShell as administrator and execute:
  ```powershell
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  ```

- **Port Already in Use**: If port 5000 is already in use, modify the port in commands:
  ```
  .\scripts\server-manager.ps1 -Action start -Port 3000
  ```

### Unix Issues

- **Permission Denied**: If you get "Permission denied" errors for scripts, make them executable:
  ```bash
  chmod +x scripts/*.sh start-server.sh stop-server.sh
  ```

- **Command Not Found**: If you get "command not found" errors, make sure the script has proper line endings:
  ```bash
  dos2unix scripts/*.sh start-server.sh stop-server.sh
  ```

### Dependency Issues

- **Puppeteer vs Mermaid-CLI**: If you encounter conflicts between these dependencies, run:
  ```bash
  node scripts/fix-dependencies.js
  ```

- **Missing Browser Dependencies**: If Playwright tests fail due to missing browser dependencies, run:
  ```bash
  npx playwright install-deps chromium
  ```

## Next Steps

Once your development environment is set up, check out:

- [Custom Test Development Guide](custom-test-development.md) - Learn how to create custom security tests
- [Cross-Platform Setup Guide](cross-platform-setup.md) - Details on platform-specific setup
- [Configuration Guide](configuration.md) - How to configure the toolkit for your needs 