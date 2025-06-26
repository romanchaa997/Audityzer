
/**
 * DeployGuardian Configuration Management
 */

class DeployGuardianConfig {
  constructor(config = {}) {
    this.config = this._mergeWithDefaults(config);
  }

  _mergeWithDefaults(config) {
    return {
      // Basic config
      outputDir: config.outputDir || './deployments',
      networkConfigs: config.networkConfigs || {},

      // Validation config
      securityChecksEnabled: config.securityChecksEnabled !== false,
      simulationEnabled: config.simulationEnabled !== false,
      requiresApproval: config.requiresApproval !== false,
      ciMode: config.ciMode || false,

      // L2 support
      l2Support: config.l2Support || {
        enabled: true,
        networks: ['optimism', 'arbitrum', 'polygon', 'base', 'zksync', 'linea'],
      },

      // Gas optimization
      gasOptimization: config.gasOptimization || {
        enabled: true,
        targetGasPrice: null,
        maxGasLimit: null,
        priorityFee: null,
      },

      // Historical comparison
      historicalComparison: config.historicalComparison || {
        enabled: true,
        compareWithLatest: true,
        maxDeployments: 5,
      },

      // Security thresholds
      securityThresholds: config.securityThresholds || {
        critical: 0,
        high: 2,
        medium: 5,
        low: 10,
      },

      // Notification settings
      notifications: config.notifications || {
        enabled: true,
        channels: ['console', 'file'],
        webhooks: [],
      },

      // Advanced features
      advancedFeatures: config.advancedFeatures || {
        crossChainValidation: true,
        upgradeabilityChecks: true,
        governanceValidation: true,
        economicModelValidation: true,
      },
    };
  }

  get(key) {
    return this.config[key];
  }

  set(key, value) {
    this.config[key] = value;
  }

  getNetworkConfig(network) {
    return this.config.networkConfigs[network] || {};
  }
}

module.exports = { DeployGuardianConfig };
