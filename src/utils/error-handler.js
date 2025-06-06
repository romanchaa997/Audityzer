
/**
 * Global Error Handler
 * Centralized error handling and reporting
 */

import logger from './logger.js';

class ErrorHandler {
  constructor() {
    this.setupGlobalHandlers();
  }

  setupGlobalHandlers() {
    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', { error: error.message, stack: error.stack });
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection:', { reason, promise });
    });

    // Handle warnings
    process.on('warning', (warning) => {
      logger.warn('Process Warning:', { warning: warning.message });
    });
  }

  handleError(error, context = {}) {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    };

    logger.error('Application Error:', errorInfo);
    
    // Additional error reporting logic can be added here
    // e.g., send to external monitoring service
    
    return errorInfo;
  }

  createErrorResponse(error, statusCode = 500) {
    return {
      success: false,
      error: {
        message: error.message,
        code: statusCode,
        timestamp: new Date().toISOString()
      }
    };
  }
}

const errorHandler = new ErrorHandler();

export default errorHandler;
export { ErrorHandler };
