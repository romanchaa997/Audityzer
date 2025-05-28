# Audityzer MCP Server

This repository contains the Model Context Protocol (MCP) server implementation for Audityzer, a security testing framework for Web3 applications and smart contracts.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v9 or higher)

### Installation

```bash
# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# MCP Configuration
MCP_PORT=8078
MCP_FILE_SERVER_PORT=8079
MCP_DB_SERVER_PORT=8080
MCP_ENABLE_AUTH=true
MCP_JWT_SECRET=your-secret-key
MCP_API_KEY=your-api-key
MCP_LOG_LEVEL=info
```

## Usage

### Starting the MCP Servers

```bash
npm run mcp:start
```

This will start the main MCP server and the auxiliary servers (file server and database server).

### Checking MCP Server Status

```bash
npm run mcp:status
```

This will display the status of all running MCP servers, including their PIDs, ports, and health status.

### Stopping the MCP Servers

```bash
npm run mcp:stop
```

This will stop all running MCP servers.

### Restarting the MCP Servers

```bash
npm run mcp:restart
```

This will stop and then start all MCP servers.

## API Endpoints

### Authentication

- `POST /auth/login`: Authenticate with API key and get a JWT token
- `POST /auth/verify`: Verify a JWT token

### Files

- `GET /api/v1/files`: List all files
- `POST /api/v1/files/upload`: Upload a file
- `GET /api/v1/files/download/:filename`: Download a file
- `DELETE /api/v1/files/:filename`: Delete a file

### Smart Contracts

- `GET /api/v1/contracts/:address`: Get contract information
- `POST /api/v1/contracts/analyze`: Analyze contract security
- `POST /api/v1/contracts/verify`: Verify contract source code

### Security Analysis

- `POST /api/v1/vulnerabilities`: Scan for vulnerabilities
- `POST /api/v1/analysis/report`: Generate security report
- `POST /api/v1/generate/fixes`: Generate code fixes for vulnerabilities

## License

MIT