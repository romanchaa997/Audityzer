
/**
 * Layer 2 Protocol Validator
 */

class L2Validator {
  constructor() {
    this.supportedProtocols = ['optimism', 'arbitrum', 'zksync', 'polygon', 'base', 'linea'];
  }

  validateL2Protocol(rules, l2Protocol) {
    if (!this.supportedProtocols.includes(l2Protocol)) {
      throw new Error(`Unsupported L2 protocol: ${l2Protocol}`);
    }

    const errors = [];
    const warnings = [];

    // Protocol-specific validation
    switch (l2Protocol) {
      case 'optimism':
        this._validateOptimismRules(rules, errors, warnings);
        break;
      case 'arbitrum':
        this._validateArbitrumRules(rules, errors, warnings);
        break;
      case 'zksync':
        this._validateZkSyncRules(rules, errors, warnings);
        break;
      case 'polygon':
        this._validatePolygonRules(rules, errors, warnings);
        break;
      case 'base':
        this._validateBaseRules(rules, errors, warnings);
        break;
      case 'linea':
        this._validateLineaRules(rules, errors, warnings);
        break;
    }

    return {
      protocol: l2Protocol,
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  validateBridgeSecurity(rules) {
    const errors = [];
    const warnings = [];

    // Check for bridge-specific security rules
    if (!rules.bridge) {
      errors.push({
        field: 'bridge',
        message: 'Bridge security configuration is required for L2 deployments',
        severity: 'high',
      });
      return { valid: false, errors, warnings };
    }

    // Validate withdrawal delays
    if (!rules.bridge.withdrawalDelay || rules.bridge.withdrawalDelay < 604800) {
      warnings.push({
        field: 'bridge.withdrawalDelay',
        message: 'Consider implementing a 7-day withdrawal delay for security',
        severity: 'medium',
      });
    }

    // Validate fraud proof system
    if (!rules.bridge.fraudProofs) {
      errors.push({
        field: 'bridge.fraudProofs',
        message: 'Fraud proof system configuration is required',
        severity: 'high',
      });
    }

    // Validate guardian system
    if (!rules.bridge.guardians || !Array.isArray(rules.bridge.guardians) || rules.bridge.guardians.length < 3) {
      warnings.push({
        field: 'bridge.guardians',
        message: 'Consider implementing a multi-guardian system with at least 3 guardians',
        severity: 'medium',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  _validateOptimismRules(rules, errors, warnings) {
    // Optimism-specific validation
    if (!rules.optimism) {
      errors.push({
        field: 'optimism',
        message: 'Optimism-specific configuration is required',
        severity: 'high',
      });
      return;
    }

    // Check for sequencer configuration
    if (!rules.optimism.sequencer) {
      warnings.push({
        field: 'optimism.sequencer',
        message: 'Sequencer configuration recommended for Optimism',
        severity: 'medium',
      });
    }

    // Check for fault proof system
    if (!rules.optimism.faultProofs) {
      warnings.push({
        field: 'optimism.faultProofs',
        message: 'Fault proof system configuration recommended',
        severity: 'medium',
      });
    }
  }

  _validateArbitrumRules(rules, errors, warnings) {
    // Arbitrum-specific validation
    if (!rules.arbitrum) {
      errors.push({
        field: 'arbitrum',
        message: 'Arbitrum-specific configuration is required',
        severity: 'high',
      });
      return;
    }

    // Check for AnyTrust configuration
    if (rules.arbitrum.anyTrust && !rules.arbitrum.dataAvailabilityCommittee) {
      errors.push({
        field: 'arbitrum.dataAvailabilityCommittee',
        message: 'Data Availability Committee required for AnyTrust chains',
        severity: 'high',
      });
    }
  }

  _validateZkSyncRules(rules, errors, warnings) {
    // zkSync-specific validation
    if (!rules.zksync) {
      errors.push({
        field: 'zksync',
        message: 'zkSync-specific configuration is required',
        severity: 'high',
      });
      return;
    }

    // Check for proof system
    if (!rules.zksync.proofSystem) {
      errors.push({
        field: 'zksync.proofSystem',
        message: 'Proof system configuration is required for zkSync',
        severity: 'high',
      });
    }
  }

  _validatePolygonRules(rules, errors, warnings) {
    // Polygon-specific validation
    if (!rules.polygon) {
      errors.push({
        field: 'polygon',
        message: 'Polygon-specific configuration is required',
        severity: 'high',
      });
      return;
    }

    // Check for validator set
    if (!rules.polygon.validators || rules.polygon.validators.length < 4) {
      warnings.push({
        field: 'polygon.validators',
        message: 'Consider having at least 4 validators for security',
        severity: 'medium',
      });
    }
  }

  _validateBaseRules(rules, errors, warnings) {
    // Base-specific validation (similar to Optimism)
    if (!rules.base) {
      errors.push({
        field: 'base',
        message: 'Base-specific configuration is required',
        severity: 'high',
      });
      return;
    }

    // Base inherits Optimism's architecture
    this._validateOptimismRules({ optimism: rules.base }, errors, warnings);
  }

  _validateLineaRules(rules, errors, warnings) {
    // Linea-specific validation
    if (!rules.linea) {
      errors.push({
        field: 'linea',
        message: 'Linea-specific configuration is required',
        severity: 'high',
      });
      return;
    }

    // Check for zkEVM configuration
    if (!rules.linea.zkEVM) {
      warnings.push({
        field: 'linea.zkEVM',
        message: 'zkEVM configuration recommended for Linea',
        severity: 'medium',
      });
    }
  }
}

module.exports = { L2Validator };
