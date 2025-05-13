# Cross-Platform Setup Guide

This guide explains how to set up the Web3 Security Test Kit development environment on different platforms.

## Platform-Specific Setup

### Windows Setup

For Windows environments, we provide PowerShell scripts and batch files for easy setup:

1. Run the Windows setup script:
   ```powershell
   .\scripts\setup-windows.ps1
   ```

2. Start the development server using the batch file:
   ```
   .\start-server.bat
   ```

3. Stop the server when finished:
   ```
   .\stop-server.bat
   ```

### Linux/macOS Setup

For Unix-based systems, we provide shell scripts:

1. Run the Unix setup script:
   ```bash
   # Make the script executable
   chmod +x scripts/setup-unix.sh
   
   # Run the setup script
   ./scripts/setup-unix.sh
   ```

2. Start the development server:
   ```bash
   # Make the script executable
   chmod +x start-server.sh
   
   # Start the server
   ./start-server.sh
   ```

3. Stop the server when finished:
   ```bash
   # Make the script executable
   chmod +x stop-server.sh
   
   # Stop the server
   ./stop-server.sh
   ```

## Docker Setup

For maximum portability, we provide a Docker-based development environment that works on any platform with Docker installed.

### Prerequisites

- Docker
- Docker Compose

### Setup

1. Make the Docker setup script executable (Unix only):
   ```bash
   chmod +x scripts/docker-setup.sh
   ```

2. Start the environment:
   
   **Unix:**
   ```bash
   ./scripts/docker-setup.sh start
   ```
   
   **Windows:**
   ```powershell
   powershell -ExecutionPolicy Bypass -File "scripts\docker-setup.sh" start
   ```

3. Stop the environment when finished:
   
   **Unix:**
   ```bash
   ./scripts/docker-setup.sh stop
   ```
   
   **Windows:**
   ```powershell
   powershell -ExecutionPolicy Bypass -File "scripts\docker-setup.sh" stop
   ```

### Docker Setup Script Commands

The Docker setup script provides the following commands:

- `start` - Start the Docker environment
- `stop` - Stop the Docker environment
- `restart` - Restart the Docker environment
- `logs` - Show logs from the containers
- `test` - Run tests inside the Docker container
- `shell` - Start a shell inside the container
- `build` - Rebuild the Docker image
- `full` - Start with ElasticSearch and Kibana (full environment)
- `status` - Show container status
- `clean` - Remove all containers and volumes
- `help` - Show help message

Example:
```bash
# Start with ElasticSearch and Kibana
./scripts/docker-setup.sh full

# Run security tests
./scripts/docker-setup.sh test test:security

# Access shell in the container
./scripts/docker-setup.sh shell
```

## Advanced Configuration

### Custom Port

You can specify a custom port for the server:

- **PowerShell:**
  ```powershell
  .\scripts\server-manager.ps1 -Action start -Port 3000
  ```

- **Unix:**
  ```bash
  ./scripts/server-manager.sh start 3000
  ```

- **Docker:**
  ```bash
  # Modify docker-compose.yml ports section or use:
  ./scripts/docker-setup.sh start
  # And then manually map ports with:
  docker run -p 3000:5000 web3-security-test-kit
  ```

### Environment Variables

The following environment variables can be configured:

- `MOCK_MODE` - Enable mock mode for testing (default: false)
- `TARGET_URL` - URL of the target dApp for testing
- `NODE_ENV` - Environment mode (development, production)

Set these variables in your `.env` file or before running commands:

```bash
# Windows PowerShell
$env:MOCK_MODE = "true"; npm run test:security

# Unix
MOCK_MODE=true npm run test:security

# Docker
docker run -e MOCK_MODE=true web3-security-test-kit npm run test:security
```

## Troubleshooting

### Docker Issues

- **Port conflict**: If port 5000 is already in use, specify a different port in docker-compose.yml
- **Permission issues**: Run Docker commands with sudo on Unix or run PowerShell as Administrator on Windows
- **Container not starting**: Check Docker logs with `docker logs web3-security-test-kit`

### Script Permission Issues

On Unix systems, if you encounter permission issues running scripts:

```bash
chmod +x scripts/*.sh start-server.sh stop-server.sh
```

### Node.js Dependency Issues

If you encounter Node.js dependency conflicts:

```bash
npm install --legacy-peer-deps
```

Or use Docker which has dependencies pre-configured:

```bash
./scripts/docker-setup.sh start
``` 