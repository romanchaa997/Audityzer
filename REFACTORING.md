# Audityzer MCP Server Refactoring

## Overview of Changes

The codebase has been refactored to improve maintainability, efficiency, and code organization. Here's a summary of the changes made:

### 1. Architectural Improvements

- **Separation of Concerns**: Implemented a clear separation between routes, controllers, middleware, and utilities
- **MVC Pattern**: Adopted a Model-View-Controller like pattern for better code organization
- **Centralized Configuration**: Created a central config file for all configuration values
- **Middleware-based Architecture**: Implemented middleware for cross-cutting concerns like authentication and validation

### 2. Code Quality Improvements

- **Error Handling**: Implemented a consistent error handling approach with custom ApiError class
- **Input Validation**: Added Joi-based validation for all API endpoints
- **Standardized Responses**: Created utility functions for consistent API responses
- **Logging**: Improved logging with structured logs using Pino

### 3. Performance Improvements

- **Caching Opportunities**: Reduced redundant file system operations
- **Middleware Optimization**: Streamlined middleware execution
- **Resource Management**: Better handling of file uploads and downloads

### 4. Security Enhancements

- **Input Validation**: Added comprehensive validation for all user inputs
- **Authentication**: Improved JWT-based authentication flow
- **Security Headers**: Added Helmet middleware for security headers

## Directory Structure

```
├── src/
│   ├── mcp/
│   │   ├── controllers/       # Business logic for routes
│   │   ├── middleware/        # Express middleware
│   │   ├── routes/            # API route definitions
│   │   ├── schemas/           # Validation schemas
│   │   ├── utils/             # Utility functions
│   │   ├── app.js             # Express app setup
│   │   ├── config.js          # Configuration
│   │   └── server.js          # Server entry point
├── scripts/                   # Utility scripts
├── uploads/                   # File upload directory
├── .env                       # Environment variables
└── package.json               # Project dependencies
```

## Key Components

### Controllers

Controllers handle the business logic for each route. They receive the request, process it, and send the response.

### Middleware

- **Authentication**: Verifies JWT tokens for protected routes
- **Validation**: Validates request parameters, body, and query using Joi schemas
- **Error Handling**: Provides consistent error responses

### Routes

Routes define the API endpoints and connect them to the appropriate controllers and middleware.

### Schemas

Validation schemas define the expected structure and constraints for API inputs.

### Utils

Utility functions provide common functionality used across the application.

## How to Use

1. Install dependencies: `npm install`
2. Set up environment variables in `.env`
3. Start the server: `npm run mcp:start`
4. Check server status: `npm run mcp:status`

## API Documentation

The API endpoints remain the same as before, but with improved validation and error handling:

- **Authentication**: `/auth/login`, `/auth/verify`
- **Files**: `/api/v1/files`, `/api/v1/files/upload`, `/api/v1/files/download/:filename`, `/api/v1/files/:filename`
- **Contracts**: `/api/v1/contracts/:address`, `/api/v1/contracts/analyze`, `/api/v1/contracts/verify`
- **Analysis**: `/api/v1/vulnerabilities`, `/api/v1/analysis/report`, `/api/v1/generate/fixes`

## Future Improvements

- Add unit and integration tests
- Implement rate limiting
- Add database integration for persistent storage
- Implement caching for frequently accessed data
- Add API documentation using Swagger/OpenAPI