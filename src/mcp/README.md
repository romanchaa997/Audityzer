# Model Context Protocol (MCP) for Audityzer

This directory contains the implementation of Model Context Protocol (MCP) servers for Audityzer, enabling AI models to interact with the application context in a secure and controlled manner.

## Overview

The Model Context Protocol (MCP) provides a standardized way for AI models to access and manipulate the context of your application. This implementation includes:

- A main MCP server for handling API requests
- A file server for managing file operations
- A database server for data access
- Authentication and security mechanisms
- Logging and monitoring capabilities

## Architecture

The MCP implementation follows a modular architecture:

```
src/mcp/
├── config.js           # Configuration settings
├── server.js           # Main server implementation
├── middleware/         # Middleware components
│   └── auth.js         # Authentication middleware
├── routes/             # API route handlers
│   ├── auth-routes.js  # Authentication routes
│   ├── file-routes.js  # File operation routes
│   ├── contract-routes.js # Smart contract routes
│   └── analysis-routes.js # Security analysis routes
└── utils/              # Utility functions
    └── logger.js       # Logging utility
```

## Getting Started

### Prerequisites

- Node.js 16.0.0 or higher
- npm 9.8.1 or higher

### Installation

The MCP dependencies are included in the main package.json. To install them, run:

```bash
npm run install:deps
```

### Configuration

MCP servers can be configured through environment variables or by modifying the `config.js` file. Key configuration options include:

- `MCP_PORT`: Port for the main MCP server (default: 8078)
- `MCP_FILE_SERVER_PORT`: Port for the file server (default: 8079)
- `MCP_DB_SERVER_PORT`: Port for the database server (default: 8080)
- `MCP_ENABLE_AUTH`: Whether to enable authentication (default: true)
- `MCP_JWT_SECRET`: Secret key for JWT token generation
- `MCP_LOG_LEVEL`: Logging level (debug, info, warn, error)

### Starting the Servers

To start all MCP servers, run:

```bash
npm run mcp:start
```

This will start the main MCP server, file server, and database server.

### Stopping the Servers

To stop all running MCP servers, run:

```bash
npm run mcp:stop
```

### Checking Server Status

To check the status of all MCP servers, run:

```bash
npm run mcp:status
```

## API Endpoints

### Main Server

- `GET /health`: Health check endpoint
- `GET /status`: Server status information
- `POST /api/v1/auth/login`: Authentication endpoint
- `POST /api/v1/auth/verify`: Token verification endpoint

### File Operations

- `GET /api/v1/files`: List available files
- `POST /api/v1/files/upload`: Upload a file
- `GET /api/v1/files/download/:filename`: Download a file
- `DELETE /api/v1/files/:filename`: Delete a file

### Smart Contract Operations

- `GET /api/v1/contracts/:address`: Get contract information
- `POST /api/v1/contracts/analyze`: Analyze contract security
- `POST /api/v1/contracts/verify`: Verify contract source code

### Security Analysis

- `POST /api/v1/vulnerabilities`: Scan for vulnerabilities
- `POST /api/v1/analysis/report`: Generate security report
- `POST /api/v1/generate/fixes`: Generate code fixes

## Security Considerations

- Authentication is enabled by default and uses JWT tokens
- Rate limiting is applied to prevent abuse
- CORS is configured to allow only specific origins
- Helmet is used to set security-related HTTP headers
- File uploads are limited to 10MB by default

## Extending the MCP

To add new capabilities to the MCP:

1. Create a new route file in the `routes/` directory
2. Implement the required endpoints
3. Register the routes in `server.js`
4. Update the `CAPABILITIES` object in `config.js`

## Troubleshooting

- Check the logs in `logs/mcp.log` for detailed error information
- Verify that the required ports are available and not blocked by a firewall
- Ensure that the JWT secret is properly set for authentication
- Check that the upload directory has proper write permissions

## License

This MCP implementation is part of Audityzer and is licensed under the MIT License.