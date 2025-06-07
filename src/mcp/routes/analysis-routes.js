/**
 * MCP Analysis Routes
 * 
 * Handles security analysis and vulnerability scanning operations for the MCP server.
 */

import { MCP_ENDPOINTS } from '../config.js';
import { validateBody } from '../middleware/validation.js';
import {
  vulnerabilityScanSchema,
  securityReportSchema,
  codeFixSchema
} from '../schemas/analysis-schemas.js';
import {
  scanVulnerabilities,
  generateReport,
  generateFixes
} from '../controllers/analysis-controller.js';

/**
 * Set up analysis routes
 * @param {Object} router - Express router instance
 */
const setupAnalysisRoutes = (router) => {
  // Scan for vulnerabilities
  router.post(
    MCP_ENDPOINTS.API.VULNERABILITIES,
    validateBody(vulnerabilityScanSchema),
    scanVulnerabilities
  );

  // Generate security report
  router.post(
    `${MCP_ENDPOINTS.API.ANALYSIS}/report`,
    validateBody(securityReportSchema),
    generateReport
  );

  // Generate code fixes
  router.post(
    `${MCP_ENDPOINTS.API.GENERATE}/fixes`,
    validateBody(codeFixSchema),
    generateFixes
  );
};

export { setupAnalysisRoutes };
export default setupAnalysisRoutes;