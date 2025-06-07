/**
 * MCP Server Application
 * 
 * Main Express application setup for the MCP server
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { MCP_CONFIG } from './config.js';
import { setupAuthRoutes } from './routes/auth-routes.js';
import { setupFileRoutes } from './routes/file-routes.js';
import { setupContractRoutes } from './routes/contract-routes.js';
import { setupAnalysisRoutes } from './routes/analysis-routes.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
import { authMiddleware } from './middleware/auth.js';
import { logger } from './utils/logger.js';

/**
 * Create and configure Express application
 * @returns {Object} Configured Express app
 */
export const createApp = () => {
  const app = express();

  // Apply global middleware
  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Set up health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Set up authentication routes (no auth required)
  setupAuthRoutes(app);

  // Create API router with authentication
  const apiRouter = express.Router();

  // Apply authentication middleware if enabled
  if (MCP_CONFIG.SECURITY.ENABLE_AUTH) {
    apiRouter.use(authMiddleware);
  }

  // Set up API routes
  setupFileRoutes(apiRouter);
  setupContractRoutes(apiRouter);
  setupAnalysisRoutes(apiRouter);

  // Mount API router
  app.use('/api/v1', apiRouter);

  // Apply error handling middleware
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

/**
 * Start the MCP server
 * @param {number} port - Port to listen on
 * @returns {Object} HTTP server instance
 */
export const startServer = (port = MCP_CONFIG.PORT) => {
  const app = createApp();

  const server = app.listen(port, () => {
    logger.info(`MCP server listening on port ${port}`);
  });

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    server.close(() => {
      logger.info('Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully');
    server.close(() => {
      logger.info('Server closed');
      process.exit(0);
    });
  });

  return server;
};

export default { createApp, startServer };