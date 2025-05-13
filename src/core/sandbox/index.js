/**
 * Sandbox Module Index
 *
 * Exports sandbox environment modules for safely testing and executing
 * smart contracts, including potentially malicious exploits, in an isolated environment.
 */

const SandboxExecutionEnvironment = require('./execution-environment');
const PerformanceOptimizer = require('./performance-optimizer');

module.exports = {
  SandboxExecutionEnvironment,
  PerformanceOptimizer,
};
