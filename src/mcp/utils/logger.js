/**
 * Logger Utility
 * 
 * Provides a consistent logging interface for the application
 */

import pino from 'pino';

// Get log level from environment or use default
const logLevel = process.env.MCP_LOG_LEVEL || 'info';

// Create logger instance
export const logger = pino({
  level: logLevel,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    }
  },
  base: {
    service: 'audityzer-mcp'
  }
});

export default logger;