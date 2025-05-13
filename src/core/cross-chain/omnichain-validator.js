/**
 * Omnichain Security Validator
 *
 * This module implements comprehensive security validation for
 * cross-chain applications across multiple blockchain networks.
 */

const ethers = require('ethers');
const { BigNumber } = require('ethers');

// Common cross-chain security vulnerabilities and checks
const SECURITY_CHECKS = {
  MESSAGE_VERIFICATION: {
    id: 'MSG_VERIFY',
    name: 'Message Verification',
    description: 'Checks if cross-chain messages are properly verified before processing',
    severity: 'critical',
  },
  REPLAY_PROTECTION: {
    id: 'REPLAY_PROT',
    name: 'Replay Protection',
    description: 'Verifies that cross-chain messages cannot be replayed',
    severity: 'critical',
  },
  FEE_VALIDATION: {
    id: 'FEE_VALID',
    name: 'Fee Validation',
    description: 'Checks if cross-chain fees are validated to prevent fee manipulation',
    severity: 'high',
  },
  FUND_RECONCILIATION: {
    id: 'FUND_RECON',
    name: 'Fund Reconciliation',
    description: 'Verifies that funds are properly reconciled across chains',
    severity: 'critical',
  },
  TRUSTED_ENDPOINT: {
    id: 'TRUST_ENDPT',
    name: 'Trusted Endpoint Validation',
    description: 'Checks if endpoints and contracts across chains are properly validated',
    severity: 'high',
  },
  EXECUTION_CONSISTENCY: {
    id: 'EXEC_CONSIST',
    name: 'Execution Consistency',
    description: 'Verifies consistent execution behavior across different chains',
    severity: 'medium',
  },
};

class OmnichainValidator {
  constructor(config = {}) {
    this.config = {
      maxBlockLag: config.maxBlockLag || 10,
      timeoutMs: config.timeoutMs || 60000,
      retries: config.retries || 3,
      chains: config.chains || {},
      ...config,
    };

    this.providers = {};
    this.initializeProviders();
  }

  /**
   * Initialize blockchain providers for each chain
   */
  initializeProviders() {
    // Set up providers for each configured chain
    for (const [chainId, chainConfig] of Object.entries(this.config.chains)) {
      try {
        // Create provider based on chain configuration
        if (chainConfig.rpcUrl) {
          this.providers[chainId] = new ethers.providers.JsonRpcProvider(
            chainConfig.rpcUrl,
            chainConfig.networkId || parseInt(chainId)
          );
          console.log(
            `Initialized provider for chain ${chainId} (${chainConfig.name || 'Unknown'})`
          );
        }
      } catch (error) {
        console.error(`Failed to initialize provider for chain ${chainId}: ${error.message}`);
      }
    }
  }

  /**
   * Get provider for a specific chain
   * @param {string} chainId - Chain identifier
   * @returns {ethers.providers.Provider} - Chain provider
   */
  getProvider(chainId) {
    if (!this.providers[chainId]) {
      throw new Error(`No provider configured for chain ${chainId}`);
    }
    return this.providers[chainId];
  }

  /**
   * Validate a cross-chain bridge contract
   * @param {Object} bridgeConfig - Bridge configuration
   * @returns {Promise<Object>} - Validation results
   */
  async validateBridge(bridgeConfig) {
    const { name, sourceChain, targetChain, sourceBridgeAddress, targetBridgeAddress } =
      bridgeConfig;

    console.log(`Validating bridge "${name}" from chain ${sourceChain} to ${targetChain}`);

    // Validation results
    const results = {
      name,
      sourceChain,
      targetChain,
      sourceBridgeAddress,
      targetBridgeAddress,
      timestamp: new Date().toISOString(),
      checks: {},
      vulnerabilities: [],
      isSecure: true,
    };

    try {
      // Get providers
      const sourceProvider = this.getProvider(sourceChain);
      const targetProvider = this.getProvider(targetChain);

      // Check if contracts exist
      const sourceCode = await sourceProvider.getCode(sourceBridgeAddress);
      const targetCode = await targetProvider.getCode(targetBridgeAddress);

      if (sourceCode === '0x' || sourceCode === '0x0') {
        throw new Error(`Source bridge contract not found at ${sourceBridgeAddress}`);
      }

      if (targetCode === '0x' || targetCode === '0x0') {
        throw new Error(`Target bridge contract not found at ${targetBridgeAddress}`);
      }

      // Load contract ABIs if provided
      const sourceContract = bridgeConfig.sourceAbi
        ? new ethers.Contract(sourceBridgeAddress, bridgeConfig.sourceAbi, sourceProvider)
        : null;

      const targetContract = bridgeConfig.targetAbi
        ? new ethers.Contract(targetBridgeAddress, bridgeConfig.targetAbi, targetProvider)
        : null;

      // Run security checks
      await this.runBridgeSecurityChecks(results, {
        sourceChain,
        targetChain,
        sourceContract,
        targetContract,
        sourceProvider,
        targetProvider,
        bridgeConfig,
      });

      // Determine overall security status
      results.isSecure = results.vulnerabilities.length === 0;

      console.log(
        `Bridge validation complete: ${results.vulnerabilities.length} vulnerabilities found`
      );
      return results;
    } catch (error) {
      console.error(`Bridge validation failed: ${error.message}`);

      // Add error to results
      results.error = error.message;
      results.isSecure = false;

      return results;
    }
  }

  /**
   * Run security checks for a bridge
   * @param {Object} results - Results object to populate
   * @param {Object} context - Validation context
   * @returns {Promise<void>}
   */
  async runBridgeSecurityChecks(results, context) {
    // Check message verification
    await this.checkMessageVerification(results, context);

    // Check replay protection
    await this.checkReplayProtection(results, context);

    // Check fee validation
    await this.checkFeeValidation(results, context);

    // Check fund reconciliation
    await this.checkFundReconciliation(results, context);

    // Check trusted endpoints
    await this.checkTrustedEndpoints(results, context);

    // Check execution consistency
    await this.checkExecutionConsistency(results, context);
  }

  /**
   * Check if cross-chain messages are properly verified
   * @param {Object} results - Results object to populate
   * @param {Object} context - Validation context
   */
  async checkMessageVerification(results, context) {
    const check = SECURITY_CHECKS.MESSAGE_VERIFICATION;
    const checkResult = {
      id: check.id,
      name: check.name,
      description: check.description,
      status: 'unknown',
      details: [],
    };

    try {
      // Analyze contract code for message verification patterns
      const sourceProvider = context.sourceProvider;
      const targetProvider = context.targetProvider;
      const sourceCode = await sourceProvider.getCode(context.bridgeConfig.sourceBridgeAddress);
      const targetCode = await targetProvider.getCode(context.bridgeConfig.targetBridgeAddress);

      // Look for common verification functions in bytecode
      const verificationSignatures = [
        // Common message verification function signatures
        ethers.utils.id('verifyMessage(bytes32,bytes)').substr(0, 10),
        ethers.utils.id('validateMessage(bytes32,bytes,address)').substr(0, 10),
        ethers.utils.id('verifySignature(bytes32,bytes,address)').substr(0, 10),
      ];

      // Check if any verification signatures exist in the code
      const sourceHasVerification = verificationSignatures.some(sig =>
        sourceCode.includes(sig.substr(2))
      );
      const targetHasVerification = verificationSignatures.some(sig =>
        targetCode.includes(sig.substr(2))
      );

      if (sourceHasVerification && targetHasVerification) {
        checkResult.status = 'passed';
        checkResult.details.push(
          'Both source and target contracts contain message verification functions'
        );
      } else if (!targetHasVerification) {
        checkResult.status = 'failed';
        checkResult.details.push('Target contract does not appear to verify incoming messages');

        // Add vulnerability
        results.vulnerabilities.push({
          id: `${check.id}_TARGET_MISSING`,
          name: 'Missing Message Verification (Target)',
          description:
            'The target bridge contract does not properly verify incoming cross-chain messages',
          severity: check.severity,
          location: {
            chain: context.targetChain,
            contract: context.bridgeConfig.targetBridgeAddress,
          },
        });
      } else if (!sourceHasVerification) {
        checkResult.status = 'warning';
        checkResult.details.push('Source contract may not properly verify outgoing messages');
      }
    } catch (error) {
      checkResult.status = 'error';
      checkResult.details.push(`Error during check: ${error.message}`);
    }

    // Add check result
    results.checks[check.id] = checkResult;
  }

  /**
   * Check if the bridge has replay protection
   * @param {Object} results - Results object to populate
   * @param {Object} context - Validation context
   */
  async checkReplayProtection(results, context) {
    const check = SECURITY_CHECKS.REPLAY_PROTECTION;
    const checkResult = {
      id: check.id,
      name: check.name,
      description: check.description,
      status: 'unknown',
      details: [],
    };

    try {
      // Look for common replay protection patterns
      const targetCode = await context.targetProvider.getCode(
        context.bridgeConfig.targetBridgeAddress
      );

      // Common replay protection function signatures
      const replayProtectionSignatures = [
        ethers.utils.id('processedMessages(bytes32)').substr(0, 10),
        ethers.utils.id('usedNonces(uint256)').substr(0, 10),
        ethers.utils.id('messageProcessed(bytes32)').substr(0, 10),
      ];

      // Storage patterns that might indicate replay protection
      const storagePatterns = [
        '50a54041', // mapped(bytes32 => bool)
        'c2bc2efc', // mapping(bytes32 => bool)
        'f6b4dfb4', // mapping(uint256 => bool)
      ];

      // Check if any replay protection signatures or patterns exist
      const hasReplayProtection =
        replayProtectionSignatures.some(sig => targetCode.includes(sig.substr(2))) ||
        storagePatterns.some(pattern => targetCode.includes(pattern));

      if (hasReplayProtection) {
        checkResult.status = 'passed';
        checkResult.details.push('Target contract contains replay protection mechanisms');
      } else {
        checkResult.status = 'failed';
        checkResult.details.push('No replay protection mechanisms detected in target contract');

        // Add vulnerability
        results.vulnerabilities.push({
          id: `${check.id}_MISSING`,
          name: 'Missing Replay Protection',
          description:
            'The target bridge contract does not implement replay protection, allowing messages to be processed multiple times',
          severity: check.severity,
          location: {
            chain: context.targetChain,
            contract: context.bridgeConfig.targetBridgeAddress,
          },
        });
      }
    } catch (error) {
      checkResult.status = 'error';
      checkResult.details.push(`Error during check: ${error.message}`);
    }

    // Add check result
    results.checks[check.id] = checkResult;
  }

  /**
   * Check if the bridge validates fees properly
   * @param {Object} results - Results object to populate
   * @param {Object} context - Validation context
   */
  async checkFeeValidation(results, context) {
    const check = SECURITY_CHECKS.FEE_VALIDATION;
    const checkResult = {
      id: check.id,
      name: check.name,
      description: check.description,
      status: 'unknown',
      details: [],
    };

    try {
      // Look for fee validation patterns
      const sourceCode = await context.sourceProvider.getCode(
        context.bridgeConfig.sourceBridgeAddress
      );

      // Common fee-related function signatures
      const feeSignatures = [
        ethers.utils.id('getFee(uint256)').substr(0, 10),
        ethers.utils.id('calculateFee(uint256)').substr(0, 10),
        ethers.utils.id('validateFee(uint256)').substr(0, 10),
        ethers.utils.id('minFee()').substr(0, 10),
      ];

      // Check if any fee validation signatures exist
      const hasFeeValidation = feeSignatures.some(sig => sourceCode.includes(sig.substr(2)));

      if (hasFeeValidation) {
        checkResult.status = 'passed';
        checkResult.details.push('Source contract contains fee validation mechanisms');
      } else {
        checkResult.status = 'warning';
        checkResult.details.push('No explicit fee validation detected in source contract');

        // Not a critical issue but worth noting
        results.vulnerabilities.push({
          id: `${check.id}_MISSING`,
          name: 'Potential Missing Fee Validation',
          description:
            'The source bridge contract may not validate fees properly, potentially allowing fee manipulation',
          severity: 'medium', // Downgraded from high
          location: {
            chain: context.sourceChain,
            contract: context.bridgeConfig.sourceBridgeAddress,
          },
        });
      }
    } catch (error) {
      checkResult.status = 'error';
      checkResult.details.push(`Error during check: ${error.message}`);
    }

    // Add check result
    results.checks[check.id] = checkResult;
  }

  /**
   * Check if funds are properly reconciled across chains
   * @param {Object} results - Results object to populate
   * @param {Object} context - Validation context
   */
  async checkFundReconciliation(results, context) {
    const check = SECURITY_CHECKS.FUND_RECONCILIATION;
    const checkResult = {
      id: check.id,
      name: check.name,
      description: check.description,
      status: 'unknown',
      details: [],
    };

    try {
      // For this check, we need to analyze both contracts and their behavior
      // This is a complex check that would typically require contract analysis
      // and possibly simulation of cross-chain transactions

      // For now, we'll do a basic check of balance functions
      const sourceCode = await context.sourceProvider.getCode(
        context.bridgeConfig.sourceBridgeAddress
      );
      const targetCode = await context.targetProvider.getCode(
        context.bridgeConfig.targetBridgeAddress
      );

      // Functions related to balance tracking
      const balanceSignatures = [
        ethers.utils.id('balanceOf(address)').substr(0, 10),
        ethers.utils.id('totalSupply()').substr(0, 10),
        ethers.utils.id('getTotalLocked()').substr(0, 10),
        ethers.utils.id('lockedAmount()').substr(0, 10),
      ];

      // Check if balance functions exist in both contracts
      const sourceHasBalance = balanceSignatures.some(sig => sourceCode.includes(sig.substr(2)));
      const targetHasBalance = balanceSignatures.some(sig => targetCode.includes(sig.substr(2)));

      if (sourceHasBalance && targetHasBalance) {
        checkResult.status = 'passed';
        checkResult.details.push('Both contracts contain balance tracking functions');
      } else {
        checkResult.status = 'warning';
        checkResult.details.push('One or both contracts may not properly track balances');

        // Add as a warning, not a definitive vulnerability
        if (!sourceHasBalance && !targetHasBalance) {
          results.vulnerabilities.push({
            id: `${check.id}_MISSING`,
            name: 'Potential Fund Reconciliation Issues',
            description:
              'Neither bridge contract appears to track balances, which may lead to fund reconciliation problems',
            severity: 'high', // Downgraded from critical due to uncertainty
            location: {
              chain: 'both',
              contracts: [
                context.bridgeConfig.sourceBridgeAddress,
                context.bridgeConfig.targetBridgeAddress,
              ],
            },
          });
        }
      }
    } catch (error) {
      checkResult.status = 'error';
      checkResult.details.push(`Error during check: ${error.message}`);
    }

    // Add check result
    results.checks[check.id] = checkResult;
  }

  /**
   * Check if trusted endpoints are properly validated
   * @param {Object} results - Results object to populate
   * @param {Object} context - Validation context
   */
  async checkTrustedEndpoints(results, context) {
    const check = SECURITY_CHECKS.TRUSTED_ENDPOINT;
    const checkResult = {
      id: check.id,
      name: check.name,
      description: check.description,
      status: 'unknown',
      details: [],
    };

    try {
      // Functions related to endpoint validation
      const validationSignatures = [
        ethers.utils.id('validEndpoint(address)').substr(0, 10),
        ethers.utils.id('trustedSources(address)').substr(0, 10),
        ethers.utils.id('isValidSource(address)').substr(0, 10),
        ethers.utils.id('authorizedEndpoints(address)').substr(0, 10),
      ];

      const sourceCode = await context.sourceProvider.getCode(
        context.bridgeConfig.sourceBridgeAddress
      );
      const targetCode = await context.targetProvider.getCode(
        context.bridgeConfig.targetBridgeAddress
      );

      // Check for endpoint validation in target contract
      const hasEndpointValidation = validationSignatures.some(sig =>
        targetCode.includes(sig.substr(2))
      );

      if (hasEndpointValidation) {
        checkResult.status = 'passed';
        checkResult.details.push('Target contract validates endpoints');
      } else {
        checkResult.status = 'warning';
        checkResult.details.push('No explicit endpoint validation detected in target contract');

        // Add as a warning
        results.vulnerabilities.push({
          id: `${check.id}_MISSING`,
          name: 'Potential Missing Endpoint Validation',
          description:
            'The target bridge contract may not validate source endpoints, potentially allowing unauthorized bridges',
          severity: 'medium', // Downgraded from high due to uncertainty
          location: {
            chain: context.targetChain,
            contract: context.bridgeConfig.targetBridgeAddress,
          },
        });
      }
    } catch (error) {
      checkResult.status = 'error';
      checkResult.details.push(`Error during check: ${error.message}`);
    }

    // Add check result
    results.checks[check.id] = checkResult;
  }

  /**
   * Check for consistent execution across chains
   * @param {Object} results - Results object to populate
   * @param {Object} context - Validation context
   */
  async checkExecutionConsistency(results, context) {
    const check = SECURITY_CHECKS.EXECUTION_CONSISTENCY;
    const checkResult = {
      id: check.id,
      name: check.name,
      description: check.description,
      status: 'unknown',
      details: [],
    };

    try {
      // This check requires detailed analysis of contract behavior
      // For now, we'll just note it as a manual check requirement
      checkResult.status = 'manual';
      checkResult.details.push('Execution consistency requires manual review');
      checkResult.details.push(
        'Recommend simulating identical transactions on both chains to verify consistent behavior'
      );
    } catch (error) {
      checkResult.status = 'error';
      checkResult.details.push(`Error during check: ${error.message}`);
    }

    // Add check result
    results.checks[check.id] = checkResult;
  }

  /**
   * Validate a cross-chain transaction
   * @param {Object} txConfig - Transaction configuration
   * @returns {Promise<Object>} - Validation results
   */
  async validateCrossChainTransaction(txConfig) {
    const {
      sourceChain,
      targetChain,
      sourceTxHash,
      expectedTargetTxHash,
      expectedRecipient,
      expectedAmount,
    } = txConfig;

    console.log(`Validating cross-chain transaction from ${sourceChain} to ${targetChain}`);

    // Validation results
    const results = {
      sourceChain,
      targetChain,
      sourceTxHash,
      targetTxHash: null,
      success: false,
      issues: [],
      details: {},
    };

    try {
      // Get providers
      const sourceProvider = this.getProvider(sourceChain);
      const targetProvider = this.getProvider(targetChain);

      // Get source transaction
      const sourceTx = await sourceProvider.getTransaction(sourceTxHash);
      if (!sourceTx) {
        throw new Error(`Source transaction ${sourceTxHash} not found on chain ${sourceChain}`);
      }

      // Get source transaction receipt
      const sourceReceipt = await sourceProvider.getTransactionReceipt(sourceTxHash);
      if (!sourceReceipt) {
        throw new Error(`Source transaction receipt not found for ${sourceTxHash}`);
      }

      // Check if source transaction was successful
      if (sourceReceipt.status !== 1) {
        throw new Error(`Source transaction ${sourceTxHash} failed on chain ${sourceChain}`);
      }

      // Store source transaction details
      results.details.sourceTx = {
        from: sourceTx.from,
        to: sourceTx.to,
        value: sourceTx.value.toString(),
        blockNumber: sourceTx.blockNumber,
        timestamp: (await sourceProvider.getBlock(sourceTx.blockNumber)).timestamp,
      };

      // If expected target transaction hash is provided, verify it
      if (expectedTargetTxHash) {
        const targetTx = await targetProvider.getTransaction(expectedTargetTxHash);
        const targetReceipt = await targetProvider.getTransactionReceipt(expectedTargetTxHash);

        if (!targetTx || !targetReceipt) {
          results.issues.push({
            type: 'MISSING_TARGET_TX',
            description: `Expected target transaction ${expectedTargetTxHash} not found on chain ${targetChain}`,
          });
        } else {
          // Check if target transaction was successful
          if (targetReceipt.status !== 1) {
            results.issues.push({
              type: 'TARGET_TX_FAILED',
              description: `Target transaction ${expectedTargetTxHash} failed on chain ${targetChain}`,
            });
          }

          // Store target transaction details
          results.targetTxHash = expectedTargetTxHash;
          results.details.targetTx = {
            from: targetTx.from,
            to: targetTx.to,
            value: targetTx.value.toString(),
            blockNumber: targetTx.blockNumber,
            timestamp: (await targetProvider.getBlock(targetTx.blockNumber)).timestamp,
          };

          // Verify recipient if provided
          if (expectedRecipient && targetTx.to.toLowerCase() !== expectedRecipient.toLowerCase()) {
            results.issues.push({
              type: 'RECIPIENT_MISMATCH',
              description: `Target transaction recipient ${targetTx.to} does not match expected ${expectedRecipient}`,
            });
          }

          // Verify amount if provided
          if (expectedAmount && !targetTx.value.eq(BigNumber.from(expectedAmount))) {
            results.issues.push({
              type: 'AMOUNT_MISMATCH',
              description: `Target transaction amount ${targetTx.value.toString()} does not match expected ${expectedAmount}`,
            });
          }
        }
      } else {
        // If no expected target hash, note it
        results.issues.push({
          type: 'NO_TARGET_TX_HASH',
          description: 'No expected target transaction hash provided for verification',
        });
      }

      // Set success based on issues
      results.success = results.issues.length === 0;

      return results;
    } catch (error) {
      console.error(`Transaction validation failed: ${error.message}`);

      // Add error to results
      results.error = error.message;
      results.success = false;

      return results;
    }
  }

  /**
   * Validate a cross-chain application's security configuration
   * @param {Object} appConfig - Application configuration
   * @returns {Promise<Object>} - Validation results
   */
  async validateCrossChainApp(appConfig) {
    const { name, bridges, contracts } = appConfig;

    console.log(`Validating cross-chain application: ${name}`);

    // Validation results
    const results = {
      name,
      timestamp: new Date().toISOString(),
      bridgeResults: {},
      contractResults: {},
      vulnerabilities: [],
      isSecure: true,
    };

    // Validate bridges
    if (bridges && bridges.length > 0) {
      for (const bridge of bridges) {
        const bridgeResult = await this.validateBridge(bridge);
        results.bridgeResults[bridge.name] = bridgeResult;

        // Add bridge vulnerabilities to overall results
        if (bridgeResult.vulnerabilities && bridgeResult.vulnerabilities.length > 0) {
          results.vulnerabilities.push(
            ...bridgeResult.vulnerabilities.map(v => ({
              ...v,
              source: `bridge:${bridge.name}`,
            }))
          );
        }
      }
    }

    // Validate contracts if provided
    if (contracts && contracts.length > 0) {
      for (const contract of contracts) {
        // Simple contract validation for now
        const contractResult = {
          name: contract.name,
          chain: contract.chain,
          address: contract.address,
          isValid: false,
          vulnerabilities: [],
        };

        try {
          const provider = this.getProvider(contract.chain);
          const code = await provider.getCode(contract.address);

          if (code === '0x' || code === '0x0') {
            throw new Error(`Contract not found at ${contract.address}`);
          }

          contractResult.isValid = true;
        } catch (error) {
          contractResult.error = error.message;

          // Add vulnerability
          contractResult.vulnerabilities.push({
            id: 'CONTRACT_NOT_FOUND',
            name: 'Contract Not Found',
            description: `Contract ${contract.name} not found at ${contract.address} on chain ${contract.chain}`,
            severity: 'critical',
            location: {
              chain: contract.chain,
              contract: contract.address,
            },
          });
        }

        results.contractResults[contract.name] = contractResult;

        // Add contract vulnerabilities to overall results
        if (contractResult.vulnerabilities && contractResult.vulnerabilities.length > 0) {
          results.vulnerabilities.push(
            ...contractResult.vulnerabilities.map(v => ({
              ...v,
              source: `contract:${contract.name}`,
            }))
          );
        }
      }
    }

    // Determine overall security status
    results.isSecure = results.vulnerabilities.length === 0;

    // Count vulnerabilities by severity
    results.vulnerabilitySummary = {
      critical: results.vulnerabilities.filter(v => v.severity === 'critical').length,
      high: results.vulnerabilities.filter(v => v.severity === 'high').length,
      medium: results.vulnerabilities.filter(v => v.severity === 'medium').length,
      low: results.vulnerabilities.filter(v => v.severity === 'low').length,
    };

    console.log(
      `Application validation complete: ${results.vulnerabilities.length} vulnerabilities found`
    );
    return results;
  }
}

module.exports = OmnichainValidator;
