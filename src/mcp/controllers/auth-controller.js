/**
 * Authentication Controller
 */

import jwt from 'jsonwebtoken';
import { MCP_CONFIG } from '../config.js';
import { generateToken } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';
import { ApiError } from '../middleware/error-handler.js';
import { sendSuccess } from '../utils/response.js';

/**
 * Handle user login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const login = (req, res, next) => {
  try {
    const { apiKey } = req.body;

    // In a production environment, you would validate the API key against a database
    if (apiKey !== process.env.MCP_API_KEY) {
      logger.warn(`Failed login attempt with invalid API key`);
      throw ApiError.unauthorized('Invalid API key', 'INVALID_API_KEY');
    }

    // Generate token
    const token = generateToken({
      id: 'mcp-client',
      role: 'client',
      permissions: ['read', 'write']
    });

    logger.info(`Successful login for MCP client`);

    sendSuccess(res, {
      token,
      expiresIn: 3600 // 1 hour
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Verify JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const verifyToken = (req, res) => {
  try {
    const { token } = req.body;

    // Verify token (will throw an error if invalid)
    const decoded = jwt.verify(token, MCP_CONFIG.SECURITY.JWT_SECRET);

    sendSuccess(res, {
      valid: true,
      user: decoded
    });
  } catch (error) {
    logger.warn(`Token verification failed: ${error.message}`);

    // Don't treat this as an error, just return valid: false
    sendSuccess(res, {
      valid: false,
      error: error.message
    });
  }
};