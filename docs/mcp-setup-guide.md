# Model Context Protocol (MCP) Setup Guide

This guide provides detailed instructions for setting up and using the Model Context Protocol (MCP) servers in Audityzer.

## What is MCP?

Model Context Protocol (MCP) is a framework that enables AI models to access and manipulate the context of your application in a secure and controlled manner. In Audityzer, MCP is used to provide AI models with access to smart contract code, security analysis tools, and other resources needed for vulnerability detection and remediation.

## Prerequisites

- Node.js (v16 or higher)
- npm (v9 or higher)
- Basic understanding of RESTful APIs
- Basic understanding of JWT authentication

## Installation

1. Clone the Audityzer repository:

```bash
git clone https://github.com/romanchaa997/audityzer.git
cd audityzer
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
# MCP Configuration
MCP_PORT=8078
MCP_FILE_SERVER_PORT=8079
MCP_DB_SERVER_PORT=8080
MCP_ENABLE_AUTH=true
MCP_JWT_SECRET=your-secure-secret-key
MCP_API_KEY=your-api-key
MCP_LOG_LEVEL=info
```

## Starting the MCP Servers

To start all MCP servers, run:

```bash
npm run mcp:start
```

This command will start the following servers:

- Main MCP server (default port: 8078)
- File server (default port: 8079)
- Database server (default port: 8080)

You should see output indicating that each server has started successfully.

## Checking MCP Server Status

To check the status of all running MCP servers, run:

```bash
npm run mcp:status
```

This will display information about each server, including:

- Whether it's running
- PID (Process ID)
- Port
- Health status (for the main server)
- Start time
- Uptime

## Stopping the MCP Servers

To stop all running MCP servers, run:

```bash
npm run mcp:stop
```

This will gracefully shut down all MCP servers.

## Restarting the MCP Servers

To restart all MCP servers, run:

```bash
npm run mcp:restart
```

This is equivalent to running `mcp:stop` followed by `mcp:start`.

## Using the MCP API

### Authentication

Most MCP endpoints require authentication. To authenticate, you need to obtain a JWT token by making a POST request to the login endpoint with your API key.

```bash
curl -X POST http://localhost:8078/auth/login \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "your-api-key"}'
```

This will return a JWT token that you can use for subsequent requests:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

Include this token in the Authorization header for all authenticated requests:

```bash
curl -X GET http://localhost:8078/api/v1/files \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### File Operations

#### List Files

```bash
curl -X GET http://localhost:8078/api/v1/files \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Upload a File

```bash
curl -X POST http://localhost:8078/api/v1/files/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/your/file.sol"
```

#### Download a File

```bash
curl -X GET http://localhost:8078/api/v1/files/download/filename.sol \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -o downloaded_file.sol
```

#### Delete a File

```bash
curl -X DELETE http://localhost:8078/api/v1/files/filename.sol \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Smart Contract Operations

#### Get Contract Information

```bash
curl -X GET http://localhost:8078/api/v1/contracts/0x1234567890123456789012345678901234567890 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Analyze Contract Security

```bash
curl -X POST http://localhost:8078/api/v1/contracts/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "address": "0x1234567890123456789012345678901234567890",
    "source": "contract Example { ... }"
  }'
```

#### Verify Contract Source Code

```bash
curl -X POST http://localhost:8078/api/v1/contracts/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "address": "0x1234567890123456789012345678901234567890",
    "source": "contract Example { ... }",
    "compilerVersion": "0.8.17",
    "optimizationEnabled": false
  }'
```

### Security Analysis Operations

#### Scan for Vulnerabilities

```bash
curl -X POST http://localhost:8078/api/v1/vulnerabilities \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "target": "https://example.com",
    "scanType": "comprehensive"
  }'
```

#### Generate Security Report

```bash
curl -X POST http://localhost:8078/api/v1/analysis/report \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "scanId": "scan-123",
    "format": "json",
    "includeRecommendations": true
  }'
```

#### Generate Code Fixes

```bash
curl -X POST http://localhost:8078/api/v1/generate/fixes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "vulnerabilityId": "VULN-001",
    "code": "function vulnerable() { ... }",
    "language": "solidity"
  }'
```

## Troubleshooting

### Server Won't Start

- Check if the ports are already in use by another process
- Ensure you have the correct permissions to create and write to the necessary directories
- Check the logs in the `logs` directory for more detailed error information

### Authentication Issues

- Verify that you're using the correct API key in the login request
- Ensure that your JWT token hasn't expired
- Check that you're including the token in the correct format (`Bearer YOUR_TOKEN`)

### File Upload Issues

- Check that the file size doesn't exceed the maximum allowed size (10MB by default)
- Ensure that the upload directory exists and is writable

## Advanced Configuration

### Changing Port Numbers

You can change the port numbers by modifying the `.env` file or by setting environment variables before starting the servers:

```bash
MCP_PORT=9000 npm run mcp:start
```

### Disabling Authentication

For development or testing purposes, you can disable authentication by setting `MCP_ENABLE_AUTH` to `false` in the `.env` file or as an environment variable:

```bash
MCP_ENABLE_AUTH=false npm run mcp:start
```

### Changing Log Level

You can change the log level by modifying the `MCP_LOG_LEVEL` variable in the `.env` file. Available levels are:

- `debug`: Detailed debugging information
- `info`: General information (default)
- `warn`: Warning messages
- `error`: Error messages only

## Security Considerations

- Always use strong, unique values for `MCP_JWT_SECRET` and `MCP_API_KEY`
- In production environments, enable HTTPS by setting up a reverse proxy (e.g., Nginx) in front of the MCP servers
- Regularly rotate your API keys and JWT secrets
- Limit access to the MCP servers by IP address if possible
- Monitor the logs for suspicious activity

## Next Steps

- Integrate the MCP servers with your AI models
- Customize the MCP server implementation to fit your specific needs
- Contribute to the Audityzer project by submitting bug reports, feature requests, or pull requests