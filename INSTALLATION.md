# Audityzer Installation Guide

## Prerequisites

Before installing Audityzer, ensure you have the following installed on your system:

- **Node.js**: Version 16.0.0 or higher
- **npm**: Version 7.0.0 or higher (comes with Node.js)
- **Python**: Version 3.8 or higher (for certain analysis tools)
- **Git**: Latest version
- **Docker** (optional but recommended): For containerized deployment

## System Requirements

### Minimum Requirements
- **OS**: Linux, macOS, or Windows (with WSL2)
- **CPU**: 2 cores
- **RAM**: 4GB
- **Disk Space**: 2GB for installation and dependencies

### Recommended Requirements
- **OS**: Linux (Ubuntu 20.04 LTS or newer)
- **CPU**: 4+ cores
- **RAM**: 8GB or more
- **Disk Space**: 10GB or more
- **GPU**: Optional, for accelerated analysis

## Installation Methods

### Method 1: Using npm (Recommended for Most Users)

```bash
# Install Audityzer globally
npm install -g audityzer

# Verify installation
audityzer --version
```

### Method 2: Clone from GitHub

```bash
# Clone the repository
git clone https://github.com/romanchaa997/Audityzer.git

# Navigate to the directory
cd Audityzer

# Install dependencies
npm install

# Build the project
npm run build

# Start Audityzer
npm start
```

### Method 3: Docker Installation

```bash
# Pull the Docker image
docker pull romanchaa997/audityzer:latest

# Run the container
docker run -d -p 8080:8080 --name audityzer romanchaa997/audityzer:latest

# Access Audityzer
# Open your browser and navigate to http://localhost:8080
```

## Configuration

### Environment Setup

1. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

2. Edit the `.env` file with your configuration:
```
AUDITYZER_API_KEY=your_api_key
AUDITYZER_ENV=production
AUDITYZER_PORT=8080
AUDITYZER_LOG_LEVEL=info
```

### API Key Setup

1. Go to your Audityzer dashboard
2. Navigate to Settings > API Keys
3. Generate a new API key
4. Add it to your `.env` file

## Verification

After installation, verify everything is working correctly:

```bash
# Run tests
npm run test

# Check health status
audityzer health

# View installed modules
audityzer modules list
```

## Troubleshooting

### Issue: Port Already in Use
```bash
# Find the process using the port
lsof -i :8080

# Kill the process
kill -9 <PID>

# Or change the port in .env
AUDITYZER_PORT=3000
```

### Issue: Dependency Conflicts
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Permission Denied
```bash
# Fix permissions (Linux/macOS)
sudo chown -R $USER:$USER ~/.npm
```

## Updating Audityzer

```bash
# For npm installation
npm update audityzer

# For GitHub clone
git pull origin main
npm install
npm run build
```

## Next Steps

1. Read the [Quick Start Guide](QUICKSTART.md)
2. Review the [Configuration Documentation](CONFIG.md)
3. Check the [API Reference](API.md)
4. Join our [Community](https://community.audityzer.dev)

## Support

For installation issues or questions:
- Visit our [Documentation](https://docs.audityzer.dev)
- Check [GitHub Issues](https://github.com/romanchaa997/Audityzer/issues)
- Contact support@audityzer.dev
