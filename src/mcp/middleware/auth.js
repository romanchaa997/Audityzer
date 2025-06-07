/**
 * Authentication Middleware
 * 
 * Provides JWT authentication for protected routes
 */

import jwt from 'jsonwebtoken';
import { MCP_CONFIG } from '../config.js';
import { logger } from '../utils/logger.js';
import { ApiError } from './error-handler.js';

/**
 * Generate a JWT token
 * @param {Object} payload - Token payload
 * @returns {string} JWT token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, MCP_CONFIG.SECURITY.JWT_SECRET, {
    expiresIn: '1h'
  });
};

/**
 * Authentication middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('Authentication required', 'AUTH_REQUIRED');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw ApiError.unauthorized('Invalid token format', 'INVALID_TOKEN_FORMAT');
    }

    // Verify token
    const decoded = jwt.verify(token, MCP_CONFIG.SECURITY.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      logger.warn(`Invalid token: ${error.message}`);
      next(ApiError.unauthorized('Invalid token', 'INVALID_TOKEN'));
    } else if (error.name === 'TokenExpiredError') {
      logger.warn('Token expired');
      next(ApiError.unauthorized('Token expired', 'TOKEN_EXPIRED'));
    } else {
      next(error);
    }
  }
};