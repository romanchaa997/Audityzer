/**
 * MCP Server Entry Point
 */

import dotenv from 'dotenv';
import { startServer } from './app.js';
import { logger } from './utils/logger.js';

// Load environment variables
dotenv.config();

// Start the server
try {
  const port = process.env.MCP_PORT || 8078;
  startServer(port);
  logger.info(`MCP server started successfully on port ${port}`);
} catch (error) {
  logger.error(`Failed to start MCP server: ${error.message}`);
  process.exit(1);
}