/**
 * Audityzer Visualization Module
 * Provides tools for visualizing test results, transaction flows, and debugging information
 */

const DashboardRenderer = require('./dashboard-renderer');
const TransactionFlowVisualizer = require('./transaction-flow-visualizer');
const DebugTools = require('./debug-tools');
const CLI = require('./cli');
const Server = require('./server');

/**
 * Generate test results dashboard
 * @param {Object} testResults - Test results data
 * @param {Object} options - Dashboard options
 * @returns {Promise<String>} - Path to generated dashboard
 */
async function generateDashboard(testResults, options = {}) {
  const dashboardRenderer = new DashboardRenderer(options);
  return dashboardRenderer.generateTestResultsDashboard(testResults);
}

/**
 * Generate transaction flow visualization
 * @param {Object} flowData - Transaction flow data
 * @param {Object} options - Visualization options
 * @returns {Promise<String>} - Path to generated visualization
 */
async function visualizeTransactionFlow(flowData, options = {}) {
  const flowVisualizer = new TransactionFlowVisualizer(options);
  return flowVisualizer.visualizeFlow(flowData);
}

/**
 * Start debug visualization server
 * @param {Number} port - Server port (default: 3000)
 * @param {Object} options - Server options
 * @returns {Object} - Server instance
 */
function startVisualizationServer(port = 3000, options = {}) {
  const server = new Server({
    port,
    ...options,
  });

  server.start();
  return server;
}

/**
 * Create CLI instance for visualization commands
 * @param {Object} options - CLI options
 * @returns {Object} - CLI instance
 */
function createVisualizationCLI(options = {}) {
  return new CLI(options);
}

/**
 * Create debug tools instance
 * @param {Object} options - Debug tools options
 * @returns {Object} - Debug tools instance
 */
function createDebugTools(options = {}) {
  return new DebugTools(options);
}

module.exports = {
  DashboardRenderer,
  TransactionFlowVisualizer,
  DebugTools,
  CLI,
  Server,
  generateDashboard,
  visualizeTransactionFlow,
  startVisualizationServer,
  createVisualizationCLI,
  createDebugTools,
};
