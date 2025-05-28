/**
 * Audityzer Core Module
 * 
 * This is the main entry point for the Audityzer core functionality.
 * It exports all the core modules for use by other parts of the application.
 */

import { startServer, stopServer, restartServer, getServerStatus } from './server.js';
import { runTests } from './test-runner.js';

// Export core functionality
export {
  startServer,
  stopServer,
  restartServer,
  getServerStatus,
  runTests
};

// Export version information
export const version = '1.1.2';

/**
 * Initialize the Audityzer core
 * 
 * @param {Object} options - Initialization options
 * @returns {Object} Initialized core object
 */
export function initCore(options = {}) {
  console.log('Initializing Audityzer core...');
  
  // Set up any core functionality here
  
  return {
    version,
    startServer,
    stopServer,
    restartServer,
    getServerStatus,
    runTests
  };
}