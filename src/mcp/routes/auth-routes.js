/**
 * MCP Authentication Routes
 * 
 * Handles authentication-related endpoints for the MCP server.
 */

import { MCP_ENDPOINTS } from '../config.js';
import { login, verifyToken } from '../controllers/auth-controller.js';
import { validateBody } from '../middleware/validation.js';
import { loginSchema, verifyTokenSchema } from '../schemas/auth-schemas.js';

/**
 * Set up authentication routes
 * @param {Object} app - Express app instance
 */
const setupAuthRoutes = (app) => {
  // Login endpoint
  app.post(
    `${MCP_ENDPOINTS.API.AUTH}/login`,
    validateBody(loginSchema),
    login
  );

  // Verify token endpoint
  app.post(
    `${MCP_ENDPOINTS.API.AUTH}/verify`,
    validateBody(verifyTokenSchema),
    verifyToken
  );
};

export { setupAuthRoutes };
export default setupAuthRoutes;