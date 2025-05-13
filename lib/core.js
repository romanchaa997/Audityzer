/**
 * Audityzer Core Library
 * Essential functionality for the Audityzer toolkit
 */

// Re-export core modules
const ciIntegration = require('../src/core/ci-integration');
const bountyIntegration = require('../src/core/bounty-integration');
const defiTesting = require('../src/core/defi-testing');
const visualization = require('../src/core/visualization');
const aiVulnerabilityDetection = require('../src/core/ai-vulnerability-detection');

module.exports = {
  ciIntegration,
  bountyIntegration,
  defiTesting,
  visualization,
  aiVulnerabilityDetection,
  
  /**
   * Initialize the Audityzer toolkit with custom configuration
   * @param {Object} config - Configuration object
   * @returns {Object} - Initialized toolkit
   */
  init: function(config = {}) {
    // Placeholder for initialization logic
    return {
      config,
      modules: {
        ciIntegration,
        bountyIntegration,
        defiTesting,
        visualization,
        aiVulnerabilityDetection
      }
    };
  }
}; 