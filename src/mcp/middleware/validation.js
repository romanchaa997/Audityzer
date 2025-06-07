/**
 * Validation Middleware
 * 
 * Provides request validation middleware
 */

import { ApiError } from './error-handler.js';

/**
 * Validate request body against a schema
 * @param {Object} schema - Validation schema
 * @returns {Function} Express middleware
 */
export const validateBody = (schema) => {
  return (req, res, next) => {
    if (!req.body) {
      return next(ApiError.badRequest('Request body is required'));
    }

    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return next(ApiError.badRequest(errorMessage, 'VALIDATION_ERROR'));
    }

    // Replace request body with validated value
    req.body = value;
    next();
  };
};

/**
 * Validate request params against a schema
 * @param {Object} schema - Validation schema
 * @returns {Function} Express middleware
 */
export const validateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return next(ApiError.badRequest(errorMessage, 'VALIDATION_ERROR'));
    }

    // Replace request params with validated value
    req.params = value;
    next();
  };
};

/**
 * Validate request query against a schema
 * @param {Object} schema - Validation schema
 * @returns {Function} Express middleware
 */
export const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return next(ApiError.badRequest(errorMessage, 'VALIDATION_ERROR'));
    }

    // Replace request query with validated value
    req.query = value;
    next();
  };
};