/**
 * Error Handler Middleware
 * 
 * Provides consistent error handling for all routes
 */

import { logger } from '../utils/logger.js';

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message, errorCode = 'BAD_REQUEST') {
    return new ApiError(message, 400, errorCode);
  }

  static unauthorized(message, errorCode = 'UNAUTHORIZED') {
    return new ApiError(message, 401, errorCode);
  }

  static forbidden(message, errorCode = 'FORBIDDEN') {
    return new ApiError(message, 403, errorCode);
  }

  static notFound(message, errorCode = 'NOT_FOUND') {
    return new ApiError(message, 404, errorCode);
  }

  static internal(message, errorCode = 'INTERNAL_ERROR') {
    return new ApiError(message, 500, errorCode);
  }
}

/**
 * Error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  // If the error is an ApiError, use its status code and error code
  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || 'INTERNAL_ERROR';
  const message = err.message || 'An unexpected error occurred';

  // Log the error
  if (statusCode >= 500) {
    logger.error(`Error: ${message}\nStack: ${err.stack}`);
  } else {
    logger.warn(`Client error: ${message}`);
  }

  // Send the error response
  res.status(statusCode).json({
    error: {
      message,
      code: errorCode
    }
  });
};

/**
 * Not found middleware - for handling 404 errors
 */
export const notFoundHandler = (req, res, next) => {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
};