/**
 * MCP Configuration
 * 
 * Centralized configuration for the MCP server
 */

// MCP API endpoints
export const MCP_ENDPOINTS = {
  API: {
    AUTH: '/auth',
    FILES: '/api/v1/files',
    CONTRACTS: '/api/v1/contracts',
    VULNERABILITIES: '/api/v1/vulnerabilities',
    ANALYSIS: '/api/v1/analysis',
    GENERATE: '/api/v1/generate'
  }
};

// MCP configuration
export const MCP_CONFIG = {
  PORT: process.env.MCP_PORT || 8078,
  FILE_SERVER_PORT: process.env.MCP_FILE_SERVER_PORT || 8079,
  DB_SERVER_PORT: process.env.MCP_DB_SERVER_PORT || 8080,
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  SECURITY: {
    ENABLE_AUTH: process.env.MCP_ENABLE_AUTH === 'true',
    JWT_SECRET: process.env.MCP_JWT_SECRET || 'default-secret-key-for-development-only',
    API_KEY: process.env.MCP_API_KEY || 'default-api-key-for-development-only'
  },
  LOG_LEVEL: process.env.MCP_LOG_LEVEL || 'info'
};

export default { MCP_ENDPOINTS, MCP_CONFIG };