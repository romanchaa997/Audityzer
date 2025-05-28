/**
 * MCP Contract Routes
 * 
 * Handles smart contract-related operations for the MCP server.
 */

import { MCP_ENDPOINTS } from '../config.js';
import { validateParams, validateBody, validateQuery } from '../middleware/validation.js';
import {
  contractAddressParamSchema,
  contractAnalysisSchema,
  contractVerificationSchema
} from '../schemas/contract-schemas.js';
import {
  getContractInfo,
  analyzeContract,
  verifyContract
} from '../controllers/contract-controller.js';

/**
 * Set up contract routes
 * @param {Object} router - Express router instance
 */
const setupContractRoutes = (router) => {
  // Get contract information
  router.get(
    `${MCP_ENDPOINTS.API.CONTRACTS}/:address`,
    validateParams(contractAddressParamSchema),
    getContractInfo
  );

  // Analyze contract security
  router.post(
    `${MCP_ENDPOINTS.API.CONTRACTS}/analyze`,
    validateBody(contractAnalysisSchema),
    analyzeContract
  );

  // Verify contract source code
  router.post(
    `${MCP_ENDPOINTS.API.CONTRACTS}/verify`,
    validateBody(contractVerificationSchema),
    verifyContract
  );
};

export { setupContractRoutes };
export default setupContractRoutes;