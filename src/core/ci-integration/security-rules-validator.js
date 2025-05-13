/**
 * @fileoverview Validator for security rules configuration
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

class SecurityRulesValidator {
  constructor() {
    this.ajv = new Ajv({ allErrors: true });
    addFormats(this.ajv);
    this.schema = null;
    this.loadSchema();
  }

  /**
   * Loads the security rules schema
   */
  loadSchema() {
    try {
      const schemaPath = path.join(__dirname, 'security-rules-schema.json');
      this.schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
      this.validator = this.ajv.compile(this.schema);
    } catch (error) {
      console.error('Error loading security rules schema:', error);
      throw new Error('Failed to load security rules schema');
    }
  }

  /**
   * Validates security rules configuration against schema
   * @param {Object} rules - Security rules configuration to validate
   * @returns {Object} Validation result with success flag and any errors
   */
  validate(rules) {
    if (!this.validator) {
      this.loadSchema();
    }

    const isValid = this.validator(rules);

    return {
      valid: isValid,
      errors: isValid ? [] : this.formatErrors(this.validator.errors),
    };
  }

  /**
   * Validates security rules from a file
   * @param {string} filePath - Path to security rules configuration file
   * @returns {Object} Validation result with success flag and any errors
   */
  validateFile(filePath) {
    try {
      const rules = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return this.validate(rules);
    } catch (error) {
      return {
        valid: false,
        errors: [`File error: ${error.message}`],
      };
    }
  }

  /**
   * Formats validation errors into more readable messages
   * @param {Array} errors - Validation errors from Ajv
   * @returns {Array} Formatted error messages
   */
  formatErrors(errors) {
    if (!errors) return [];

    return errors.map(error => {
      const { instancePath, keyword, message, params } = error;

      switch (keyword) {
        case 'required':
          return `Missing required property: ${params.missingProperty} at ${instancePath || 'root'}`;
        case 'enum':
          return `Invalid value at ${instancePath}: should be one of [${params.allowedValues.join(', ')}]`;
        case 'type':
          return `Invalid type at ${instancePath}: expected ${params.type}`;
        case 'format':
          return `Invalid format at ${instancePath}: expected ${params.format}`;
        default:
          return `${instancePath} ${message}`;
      }
    });
  }

  /**
   * Detects security misconfigurations in rules
   * @param {Object} rules - Security rules configuration
   * @returns {Object} Result with warnings about detected misconfigurations
   */
  detectMisconfigurations(rules) {
    const warnings = [];

    // Check if critical rules are enabled
    if (rules.rules && Array.isArray(rules.rules)) {
      const criticalRules = rules.rules.filter(
        rule => rule.severity === 'critical' && !rule.enabled
      );

      if (criticalRules.length > 0) {
        warnings.push({
          type: 'misconfiguration',
          level: 'high',
          message: `${criticalRules.length} critical security rules are disabled`,
          ruleIds: criticalRules.map(rule => rule.id),
        });
      }

      // Check for duplicated rule IDs
      const ruleIds = rules.rules.map(rule => rule.id);
      const duplicateIds = ruleIds.filter((id, index) => ruleIds.indexOf(id) !== index);

      if (duplicateIds.length > 0) {
        warnings.push({
          type: 'misconfiguration',
          level: 'medium',
          message: 'Duplicate rule IDs detected',
          ruleIds: [...new Set(duplicateIds)],
        });
      }

      // Check for rules referenced in rulesets but not defined
      if (rules.rulesets) {
        const allRuleIds = new Set(ruleIds);
        const missingRules = [];

        Object.entries(rules.rulesets).forEach(([rulesetName, rulesetIds]) => {
          rulesetIds.forEach(id => {
            if (!allRuleIds.has(id)) {
              missingRules.push({ rulesetName, id });
            }
          });
        });

        if (missingRules.length > 0) {
          warnings.push({
            type: 'misconfiguration',
            level: 'medium',
            message: 'Rules referenced in rulesets but not defined',
            details: missingRules,
          });
        }
      }
    }

    return {
      hasWarnings: warnings.length > 0,
      warnings,
    };
  }

  /**
   * Checks if security rules meet compliance standards
   * @param {Object} rules - Security rules configuration
   * @param {string} standard - Compliance standard to check (e.g., 'soc2', 'gdpr')
   * @returns {Object} Compliance check results
   */
  checkCompliance(rules, standard) {
    const standardLower = standard.toLowerCase();
    const complianceChecks = {
      soc2: this._checkSOC2Compliance,
      gdpr: this._checkGDPRCompliance,
      // Add more standards as needed
    };

    if (!complianceChecks[standardLower]) {
      return {
        valid: false,
        errors: [`Unsupported compliance standard: ${standard}`],
      };
    }

    return complianceChecks[standardLower].call(this, rules);
  }

  /**
   * Checks if security rules meet SOC2 compliance
   * @param {Object} rules - Security rules configuration
   * @returns {Object} SOC2 compliance check results
   * @private
   */
  _checkSOC2Compliance(rules) {
    const requiredCategories = [
      'authentication',
      'authorization',
      'input-validation',
      'configuration',
    ];

    const errors = [];
    const categoryMap = {};

    // Populate category map
    if (rules.rules && Array.isArray(rules.rules)) {
      rules.rules.forEach(rule => {
        if (rule.enabled) {
          if (!categoryMap[rule.category]) {
            categoryMap[rule.category] = [];
          }
          categoryMap[rule.category].push(rule.id);
        }
      });
    }

    // Check required categories
    requiredCategories.forEach(category => {
      if (!categoryMap[category] || categoryMap[category].length === 0) {
        errors.push(`SOC2 requires at least one enabled rule in the "${category}" category`);
      }
    });

    // Check if critical severity rules block the build
    const criticalRulesWithoutBlockBuild =
      rules.rules
        ?.filter(
          rule =>
            rule.enabled &&
            rule.severity === 'critical' &&
            (!rule.ciConfig || rule.ciConfig.blockBuild !== true)
        )
        .map(rule => rule.id) || [];

    if (criticalRulesWithoutBlockBuild.length > 0) {
      errors.push(
        `SOC2 requires all critical severity rules to block the build: ${criticalRulesWithoutBlockBuild.join(', ')}`
      );
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Checks if security rules meet GDPR compliance
   * @param {Object} rules - Security rules configuration
   * @returns {Object} GDPR compliance check results
   * @private
   */
  _checkGDPRCompliance(rules) {
    const errors = [];

    // Check if there are data protection rules
    const hasDataProtectionRules =
      rules.rules?.some(
        rule =>
          rule.enabled &&
          (rule.name.toLowerCase().includes('data protection') ||
            rule.description?.toLowerCase().includes('personal data') ||
            rule.description?.toLowerCase().includes('pii'))
      ) || false;

    if (!hasDataProtectionRules) {
      errors.push(
        'GDPR compliance requires at least one rule related to data protection or PII handling'
      );
    }

    // Check notification configuration for data breaches
    const hasNotificationRules =
      rules.rules?.some(
        rule =>
          rule.enabled &&
          rule.severity === 'critical' &&
          rule.ciConfig &&
          rule.ciConfig.notifyChannel
      ) || false;

    if (!hasNotificationRules) {
      errors.push(
        'GDPR compliance requires notification configuration for critical security issues'
      );
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validates rules for L2 protocols and bridge security
   * @param {Object} rules - Security rules configuration
   * @param {string} l2Protocol - L2 protocol to validate ('optimism', 'arbitrum', 'zksync', 'polygon', 'base')
   * @returns {Object} Validation result
   */
  validateL2Protocol(rules, l2Protocol) {
    const protocolLower = l2Protocol.toLowerCase();
    const supportedProtocols = ['optimism', 'arbitrum', 'zksync', 'polygon', 'base'];

    if (!supportedProtocols.includes(protocolLower)) {
      return {
        valid: false,
        errors: [
          `Unsupported L2 protocol: ${l2Protocol}. Supported protocols: ${supportedProtocols.join(', ')}`,
        ],
      };
    }

    const errors = [];

    // Verify L2 protocol specific rules exist
    const hasProtocolRules =
      rules.rules?.some(
        rule =>
          rule.enabled &&
          rule.platforms &&
          (rule.platforms.includes(protocolLower) || rule.platforms.includes('all'))
      ) || false;

    if (!hasProtocolRules) {
      errors.push(`No enabled security rules found for ${l2Protocol} protocol`);
    }

    // Check required categories for L2 protocols
    const requiredL2Categories = ['transaction-safety', 'gas-optimization'];
    const categoryMap = {};

    // Populate category map for the specific protocol
    if (rules.rules && Array.isArray(rules.rules)) {
      rules.rules.forEach(rule => {
        if (
          rule.enabled &&
          rule.platforms &&
          (rule.platforms.includes(protocolLower) || rule.platforms.includes('all'))
        ) {
          if (!categoryMap[rule.category]) {
            categoryMap[rule.category] = [];
          }
          categoryMap[rule.category].push(rule.id);
        }
      });
    }

    // Check required categories
    requiredL2Categories.forEach(category => {
      if (!categoryMap[category] || categoryMap[category].length === 0) {
        errors.push(
          `L2 protocol security requires at least one enabled rule in the "${category}" category for ${l2Protocol}`
        );
      }
    });

    // Protocol-specific validation
    switch (protocolLower) {
      case 'optimism':
        this._validateOptimismRules(rules, errors);
        break;
      case 'arbitrum':
        this._validateArbitrumRules(rules, errors);
        break;
      case 'zksync':
        this._validateZkSyncRules(rules, errors);
        break;
      case 'polygon':
        this._validatePolygonRules(rules, errors);
        break;
      case 'base':
        this._validateBaseRules(rules, errors);
        break;
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validates bridge security rules
   * @param {Object} rules - Security rules configuration
   * @returns {Object} Validation result
   */
  validateBridgeSecurity(rules) {
    const errors = [];

    // Required bridge security categories
    const requiredBridgeCategories = ['cross-chain'];

    // Check if bridge security rules exist
    const hasBridgeRules =
      rules.rules?.some(rule => rule.enabled && rule.category === 'cross-chain') || false;

    if (!hasBridgeRules) {
      errors.push('No enabled bridge security rules found');
    }

    // Check for specific bridge security patterns
    const bridgeSecurityPatterns = [
      'bridge transaction',
      'cross-chain message',
      'liquidity pool',
      'transaction delay',
    ];

    const missingPatterns = [];

    bridgeSecurityPatterns.forEach(pattern => {
      const hasPattern =
        rules.rules?.some(
          rule => rule.enabled && rule.pattern && rule.pattern.toLowerCase().includes(pattern)
        ) || false;

      if (!hasPattern) {
        missingPatterns.push(pattern);
      }
    });

    if (missingPatterns.length > 0) {
      errors.push(`Missing bridge security patterns: ${missingPatterns.join(', ')}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validates Optimism-specific rules
   * @param {Object} rules - Security rules configuration
   * @param {Array} errors - Errors array to append to
   * @private
   */
  _validateOptimismRules(rules, errors) {
    // Check for Optimism-specific gas model rules
    const hasGasModelRules =
      rules.rules?.some(
        rule =>
          rule.enabled &&
          rule.platforms &&
          rule.platforms.includes('optimism') &&
          rule.pattern &&
          rule.pattern.toLowerCase().includes('gas')
      ) || false;

    if (!hasGasModelRules) {
      errors.push('Optimism requires gas model validation rules');
    }

    // Check for L1 to L2 deposit rules
    const hasDepositRules =
      rules.rules?.some(
        rule =>
          rule.enabled &&
          rule.platforms &&
          rule.platforms.includes('optimism') &&
          rule.pattern &&
          (rule.pattern.toLowerCase().includes('deposit') ||
            rule.pattern.toLowerCase().includes('l1 to l2'))
      ) || false;

    if (!hasDepositRules) {
      errors.push('Optimism requires L1 to L2 deposit validation rules');
    }
  }

  /**
   * Validates Arbitrum-specific rules
   * @param {Object} rules - Security rules configuration
   * @param {Array} errors - Errors array to append to
   * @private
   */
  _validateArbitrumRules(rules, errors) {
    // Check for Arbitrum-specific rules
    const hasDelayedInboxRules =
      rules.rules?.some(
        rule =>
          rule.enabled &&
          rule.platforms &&
          rule.platforms.includes('arbitrum') &&
          rule.pattern &&
          rule.pattern.toLowerCase().includes('delayed inbox')
      ) || false;

    if (!hasDelayedInboxRules) {
      errors.push('Arbitrum requires delayed inbox validation rules');
    }

    // Check for sequencer rules
    const hasSequencerRules =
      rules.rules?.some(
        rule =>
          rule.enabled &&
          rule.platforms &&
          rule.platforms.includes('arbitrum') &&
          rule.pattern &&
          rule.pattern.toLowerCase().includes('sequencer')
      ) || false;

    if (!hasSequencerRules) {
      errors.push('Arbitrum requires sequencer validation rules');
    }
  }

  /**
   * Validates zkSync-specific rules
   * @param {Object} rules - Security rules configuration
   * @param {Array} errors - Errors array to append to
   * @private
   */
  _validateZkSyncRules(rules, errors) {
    // Check for zkSync-specific verification rules
    const hasZKProofRules =
      rules.rules?.some(
        rule =>
          rule.enabled &&
          rule.platforms &&
          rule.platforms.includes('zksync') &&
          rule.pattern &&
          (rule.pattern.toLowerCase().includes('zk proof') ||
            rule.pattern.toLowerCase().includes('proof verification'))
      ) || false;

    if (!hasZKProofRules) {
      errors.push('zkSync requires ZK proof validation rules');
    }
  }

  /**
   * Validates Polygon-specific rules
   * @param {Object} rules - Security rules configuration
   * @param {Array} errors - Errors array to append to
   * @private
   */
  _validatePolygonRules(rules, errors) {
    // Check for Polygon-specific checkpoint rules
    const hasCheckpointRules =
      rules.rules?.some(
        rule =>
          rule.enabled &&
          rule.platforms &&
          rule.platforms.includes('polygon') &&
          rule.pattern &&
          rule.pattern.toLowerCase().includes('checkpoint')
      ) || false;

    if (!hasCheckpointRules) {
      errors.push('Polygon requires checkpoint validation rules');
    }
  }

  /**
   * Validates Base-specific rules
   * @param {Object} rules - Security rules configuration
   * @param {Array} errors - Errors array to append to
   * @private
   */
  _validateBaseRules(rules, errors) {
    // Base uses Optimism's stack, so similar validation applies
    // Check for Base-specific rules
    const hasBaseRules =
      rules.rules?.some(
        rule => rule.enabled && rule.platforms && rule.platforms.includes('base')
      ) || false;

    if (!hasBaseRules) {
      errors.push('No Base-specific security rules found');
    }
  }

  /**
   * Exports security rules to SARIF format for GitHub Security integration
   * @param {Object} rules - Security rules configuration
   * @param {string} outputPath - Path to write SARIF file
   * @returns {boolean} Success status
   */
  exportToSARIF(rules, outputPath) {
    try {
      const sarifReport = {
        $schema:
          'https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json',
        version: '2.1.0',
        runs: [
          {
            tool: {
              driver: {
                name: 'Web3FuzzForge Security Validator',
                informationUri: 'https://github.com/yourusername/web3fuzzforge',
                version: '1.0.0',
                rules: rules.rules.map(rule => ({
                  id: rule.id,
                  name: rule.name,
                  shortDescription: {
                    text: rule.name,
                  },
                  fullDescription: {
                    text: rule.description || rule.name,
                  },
                  helpUri: rule.references?.[0]?.url || '',
                  properties: {
                    severity: rule.severity,
                    category: rule.category,
                    tags: rule.platforms || [],
                  },
                })),
              },
            },
            results: [],
          },
        ],
      };

      fs.writeFileSync(outputPath, JSON.stringify(sarifReport, null, 2));
      return true;
    } catch (error) {
      console.error('Error exporting to SARIF format:', error);
      return false;
    }
  }

  /**
   * Generates a template security rules configuration
   * @returns {Object} Template security rules configuration
   */
  generateTemplate() {
    return {
      version: '1.0.0',
      projectId: 'your-project-id',
      rules: [
        {
          id: 'WALLET-SEC-001',
          name: 'Insecure wallet connection',
          description: 'Tests for insecure wallet connection methods',
          severity: 'high',
          category: 'wallet-security',
          pattern: 'insecure wallet connection',
          remediation: 'Use secure connection methods with proper error handling',
          references: [
            {
              url: 'https://docs.metamask.io/guide/ethereum-provider.html',
              title: 'MetaMask Provider API',
            },
          ],
          ciConfig: {
            blockBuild: true,
            autoCreateIssue: true,
          },
          platforms: ['ethereum', 'polygon'],
          enabled: true,
        },
        {
          id: 'TX-SEC-001',
          name: 'Unsigned transaction detection',
          description: 'Detects when transactions are not properly signed',
          severity: 'critical',
          category: 'transaction-safety',
          pattern: 'unsigned transaction',
          remediation: 'Ensure all transactions are properly signed before submission',
          references: [
            {
              url: 'https://docs.ethers.org/v5/api/signer/',
              title: 'Ethers.js Signing API',
            },
          ],
          ciConfig: {
            blockBuild: true,
          },
          platforms: ['all'],
          enabled: true,
        },
      ],
      rulesets: {
        default: ['WALLET-SEC-001', 'TX-SEC-001'],
        production: ['WALLET-SEC-001', 'TX-SEC-001'],
      },
      environments: {
        development: {
          activeRulesets: ['default'],
          disabledRules: [],
        },
        production: {
          activeRulesets: ['production'],
          disabledRules: [],
        },
      },
    };
  }

  /**
   * Generates L2-specific security rule templates
   * @param {string} l2Protocol - L2 protocol to generate rules for
   * @returns {Object} L2-specific security rules
   */
  generateL2Template(l2Protocol) {
    const protocolLower = l2Protocol.toLowerCase();
    const supportedProtocols = ['optimism', 'arbitrum', 'zksync', 'polygon', 'base'];

    if (!supportedProtocols.includes(protocolLower)) {
      throw new Error(
        `Unsupported L2 protocol: ${l2Protocol}. Supported protocols: ${supportedProtocols.join(', ')}`
      );
    }

    // Common L2 rules
    const commonRules = [
      {
        id: `${protocolLower.toUpperCase()}-GAS-001`,
        name: `${l2Protocol} gas optimization check`,
        description: `Validates gas usage patterns on ${l2Protocol}`,
        severity: 'high',
        category: 'gas-optimization',
        pattern: 'gas optimization',
        remediation: `Follow ${l2Protocol}-specific gas optimization patterns`,
        references: [
          {
            url: `https://docs.${protocolLower}.io/gas`,
            title: `${l2Protocol} Gas Model Documentation`,
          },
        ],
        ciConfig: {
          blockBuild: false,
        },
        platforms: [protocolLower],
        enabled: true,
      },
      {
        id: `${protocolLower.toUpperCase()}-TX-001`,
        name: `${l2Protocol} transaction validation`,
        description: `Validates transaction behavior on ${l2Protocol}`,
        severity: 'critical',
        category: 'transaction-safety',
        pattern: 'transaction validation',
        remediation: `Follow ${l2Protocol}-specific transaction guidelines`,
        references: [
          {
            url: `https://docs.${protocolLower}.io/transactions`,
            title: `${l2Protocol} Transaction Documentation`,
          },
        ],
        ciConfig: {
          blockBuild: true,
        },
        platforms: [protocolLower],
        enabled: true,
      },
    ];

    // Protocol-specific rules
    let specificRules = [];

    switch (protocolLower) {
      case 'optimism':
        specificRules = [
          {
            id: 'OPTIMISM-DEPOSIT-001',
            name: 'L1 to L2 deposit validation',
            description: 'Validates L1 to L2 deposit transactions on Optimism',
            severity: 'critical',
            category: 'cross-chain',
            pattern: 'l1 to l2 deposit',
            remediation: 'Ensure proper L1 to L2 deposit validation',
            references: [
              {
                url: 'https://docs.optimism.io/builders/app-developers/bridging/standard-bridge',
                title: 'Optimism Standard Bridge Documentation',
              },
            ],
            ciConfig: {
              blockBuild: true,
            },
            platforms: ['optimism'],
            enabled: true,
          },
        ];
        break;
      case 'arbitrum':
        specificRules = [
          {
            id: 'ARBITRUM-INBOX-001',
            name: 'Delayed inbox validation',
            description: 'Validates delayed inbox message processing on Arbitrum',
            severity: 'critical',
            category: 'cross-chain',
            pattern: 'delayed inbox',
            remediation: 'Ensure proper delayed inbox message validation',
            references: [
              {
                url: 'https://docs.arbitrum.io/inside-arbitrum-nitro/inside-arbitrum-nitro#the-sequencer-feed',
                title: 'Arbitrum Nitro Documentation',
              },
            ],
            ciConfig: {
              blockBuild: true,
            },
            platforms: ['arbitrum'],
            enabled: true,
          },
          {
            id: 'ARBITRUM-SEQ-001',
            name: 'Sequencer validation',
            description: 'Validates sequencer behavior on Arbitrum',
            severity: 'high',
            category: 'transaction-safety',
            pattern: 'sequencer',
            remediation: 'Ensure proper sequencer validation',
            references: [
              {
                url: 'https://docs.arbitrum.io/inside-arbitrum-nitro/inside-arbitrum-nitro#the-sequencer-feed',
                title: 'Arbitrum Sequencer Documentation',
              },
            ],
            ciConfig: {
              blockBuild: false,
            },
            platforms: ['arbitrum'],
            enabled: true,
          },
        ];
        break;
      case 'zksync':
        specificRules = [
          {
            id: 'ZKSYNC-PROOF-001',
            name: 'ZK proof verification',
            description: 'Validates ZK proof verification on zkSync',
            severity: 'critical',
            category: 'transaction-safety',
            pattern: 'zk proof verification',
            remediation: 'Ensure proper ZK proof verification',
            references: [
              {
                url: 'https://docs.zksync.io/userdocs/security/',
                title: 'zkSync Security Documentation',
              },
            ],
            ciConfig: {
              blockBuild: true,
            },
            platforms: ['zksync'],
            enabled: true,
          },
        ];
        break;
      case 'polygon':
        specificRules = [
          {
            id: 'POLYGON-CHECKPOINT-001',
            name: 'Checkpoint validation',
            description: 'Validates checkpoint processing on Polygon',
            severity: 'critical',
            category: 'transaction-safety',
            pattern: 'checkpoint',
            remediation: 'Ensure proper checkpoint validation',
            references: [
              {
                url: 'https://docs.polygon.technology/pos/architecture/validator/checkpointing/',
                title: 'Polygon Checkpoint Documentation',
              },
            ],
            ciConfig: {
              blockBuild: true,
            },
            platforms: ['polygon'],
            enabled: true,
          },
        ];
        break;
      case 'base':
        specificRules = [
          {
            id: 'BASE-DEPOSIT-001',
            name: 'L1 to L2 deposit validation',
            description: 'Validates L1 to L2 deposit transactions on Base',
            severity: 'critical',
            category: 'cross-chain',
            pattern: 'l1 to l2 deposit',
            remediation: 'Ensure proper L1 to L2 deposit validation',
            references: [
              {
                url: 'https://docs.base.org/base-contracts/',
                title: 'Base Contracts Documentation',
              },
            ],
            ciConfig: {
              blockBuild: true,
            },
            platforms: ['base'],
            enabled: true,
          },
        ];
        break;
    }

    return {
      version: '1.0.0',
      projectId: `${l2Protocol}-security-test-kit`,
      rules: [...commonRules, ...specificRules],
      rulesets: {
        default: commonRules.map(rule => rule.id).concat(specificRules.map(rule => rule.id)),
        production: commonRules.map(rule => rule.id).concat(specificRules.map(rule => rule.id)),
      },
      environments: {
        development: {
          activeRulesets: ['default'],
          disabledRules: [],
        },
        production: {
          activeRulesets: ['production'],
          disabledRules: [],
        },
      },
    };
  }

  /**
   * Generates bridge security rule template
   * @returns {Object} Bridge security rules
   */
  generateBridgeTemplate() {
    return {
      version: '1.0.0',
      projectId: 'bridge-security-test-kit',
      rules: [
        {
          id: 'BRIDGE-TX-001',
          name: 'Bridge transaction security validation',
          description: 'Validates security of bridge transactions',
          severity: 'critical',
          category: 'cross-chain',
          pattern: 'bridge transaction',
          remediation: 'Ensure proper validation of bridge transactions',
          references: [
            {
              url: 'https://ethereum.org/en/developers/docs/bridges/',
              title: 'Ethereum Bridge Documentation',
            },
          ],
          ciConfig: {
            blockBuild: true,
            notifyChannel: 'slack',
          },
          platforms: ['all'],
          enabled: true,
        },
        {
          id: 'BRIDGE-MSG-001',
          name: 'Cross-chain message verification',
          description: 'Validates cross-chain message verification',
          severity: 'critical',
          category: 'cross-chain',
          pattern: 'cross-chain message',
          remediation: 'Ensure proper verification of cross-chain messages',
          references: [
            {
              url: 'https://ethereum.org/en/developers/docs/bridges/',
              title: 'Ethereum Bridge Documentation',
            },
          ],
          ciConfig: {
            blockBuild: true,
          },
          platforms: ['all'],
          enabled: true,
        },
        {
          id: 'BRIDGE-POOL-001',
          name: 'Liquidity pool security validation',
          description: 'Validates security of bridge liquidity pools',
          severity: 'high',
          category: 'cross-chain',
          pattern: 'liquidity pool',
          remediation: 'Ensure proper validation of bridge liquidity pools',
          references: [
            {
              url: 'https://ethereum.org/en/developers/docs/bridges/',
              title: 'Ethereum Bridge Documentation',
            },
          ],
          ciConfig: {
            blockBuild: false,
          },
          platforms: ['all'],
          enabled: true,
        },
        {
          id: 'BRIDGE-DELAY-001',
          name: 'Transaction delay and verification',
          description: 'Validates transaction delay and verification in bridges',
          severity: 'medium',
          category: 'cross-chain',
          pattern: 'transaction delay',
          remediation: 'Ensure proper transaction delay and verification in bridges',
          references: [
            {
              url: 'https://ethereum.org/en/developers/docs/bridges/',
              title: 'Ethereum Bridge Documentation',
            },
          ],
          ciConfig: {
            blockBuild: false,
          },
          platforms: ['all'],
          enabled: true,
        },
      ],
      rulesets: {
        default: ['BRIDGE-TX-001', 'BRIDGE-MSG-001', 'BRIDGE-POOL-001', 'BRIDGE-DELAY-001'],
        production: ['BRIDGE-TX-001', 'BRIDGE-MSG-001', 'BRIDGE-POOL-001', 'BRIDGE-DELAY-001'],
      },
      environments: {
        development: {
          activeRulesets: ['default'],
          disabledRules: [],
        },
        production: {
          activeRulesets: ['production'],
          disabledRules: [],
        },
      },
    };
  }

  /**
   * Measures transaction finality across L2 chains
   * @param {Object} config - Configuration object with chain details
   * @returns {Object} Finality measurement results
   */
  measureFinality(config) {
    try {
      console.log('Measuring finality across chains...');

      // Default results
      const results = {
        valid: true,
        measurements: {},
        errors: [],
      };

      // Check for required config
      if (!config || !config.chains || !Array.isArray(config.chains)) {
        results.valid = false;
        results.errors.push('Invalid configuration: chains array is required');
        return results;
      }

      // Process each chain
      config.chains.forEach(chain => {
        if (!chain.name) {
          results.errors.push('Each chain must have a name property');
          results.valid = false;
          return;
        }

        // Simulate finality measurement
        try {
          results.measurements[chain.name] = {
            averageFinalityTime: this._calculateFinalityTime(chain),
            confirmedBlocks: this._getConfirmedBlocks(chain),
            securityLevel: this._assessSecurityLevel(chain),
          };
        } catch (error) {
          results.errors.push(`Failed to measure finality for ${chain.name}: ${error.message}`);
          results.valid = false;
        }
      });

      return results;
    } catch (error) {
      return {
        valid: false,
        measurements: {},
        errors: [`Failed to measure finality: ${error.message}`],
      };
    }
  }

  /**
   * Tests transaction confirmation timing across L2 chains
   * @param {Object} config - Configuration object with transaction details
   * @returns {Object} Transaction timing test results
   */
  testTransactionConfirmation(config) {
    try {
      console.log('Testing transaction confirmation timing...');

      // Default results
      const results = {
        valid: true,
        timings: {},
        errors: [],
      };

      // Check for required config
      if (!config || !config.transactions || !Array.isArray(config.transactions)) {
        results.valid = false;
        results.errors.push('Invalid configuration: transactions array is required');
        return results;
      }

      // Process each transaction
      config.transactions.forEach(tx => {
        if (!tx.id || !tx.chain) {
          results.errors.push('Each transaction must have id and chain properties');
          results.valid = false;
          return;
        }

        // Simulate transaction confirmation timing
        try {
          results.timings[tx.id] = {
            chain: tx.chain,
            submissionTime: new Date().toISOString(),
            confirmationTime: this._simulateConfirmationTime(tx),
            finalityAchieved: this._checkFinalityStatus(tx),
            blocksToFinality: this._calculateBlocksToFinality(tx),
          };
        } catch (error) {
          results.errors.push(`Failed to test transaction timing for ${tx.id}: ${error.message}`);
          results.valid = false;
        }
      });

      return results;
    } catch (error) {
      return {
        valid: false,
        timings: {},
        errors: [`Failed to test transaction confirmation: ${error.message}`],
      };
    }
  }

  /**
   * Simulates reorganizations and tests recovery mechanisms
   * @param {Object} config - Configuration object with reorg simulation parameters
   * @returns {Object} Reorg simulation results
   */
  simulateReorgRecovery(config) {
    try {
      console.log('Simulating reorganizations and testing recovery...');

      // Default results
      const results = {
        valid: true,
        simulations: {},
        errors: [],
      };

      // Check for required config
      if (!config || !config.scenarios || !Array.isArray(config.scenarios)) {
        results.valid = false;
        results.errors.push('Invalid configuration: scenarios array is required');
        return results;
      }

      // Process each scenario
      config.scenarios.forEach(scenario => {
        if (!scenario.id || !scenario.chain || !scenario.depth) {
          results.errors.push('Each scenario must have id, chain, and depth properties');
          results.valid = false;
          return;
        }

        // Simulate reorg and recovery
        try {
          results.simulations[scenario.id] = {
            chain: scenario.chain,
            reorgDepth: scenario.depth,
            startTime: new Date().toISOString(),
            recoveryTime: this._simulateRecoveryTime(scenario),
            transactionsAffected: this._countAffectedTransactions(scenario),
            recoverySuccess: this._evaluateRecoverySuccess(scenario),
            dataConsistency: this._checkDataConsistency(scenario),
          };
        } catch (error) {
          results.errors.push(
            `Failed to simulate reorg recovery for ${scenario.id}: ${error.message}`
          );
          results.valid = false;
        }
      });

      return results;
    } catch (error) {
      return {
        valid: false,
        simulations: {},
        errors: [`Failed to simulate reorg recovery: ${error.message}`],
      };
    }
  }

  /**
   * Generates a template for L2 performance testing
   * @returns {Object} L2 performance testing template
   */
  generateL2PerformanceTemplate() {
    return {
      version: '1.0.0',
      projectId: 'l2-performance-test-kit',
      tests: [
        {
          id: 'FINALITY-001',
          name: 'Finality measurement across chains',
          description: 'Measures and compares finality times across different L2 chains',
          chains: [
            {
              name: 'optimism',
              rpcUrl: 'https://mainnet.optimism.io',
              blockTime: 2,
              finalityBlocks: 1,
            },
            {
              name: 'arbitrum',
              rpcUrl: 'https://arb1.arbitrum.io/rpc',
              blockTime: 0.25,
              finalityBlocks: 0,
            },
            {
              name: 'zksync',
              rpcUrl: 'https://mainnet.era.zksync.io',
              blockTime: 2,
              finalityBlocks: 0,
            },
          ],
          thresholds: {
            maxFinalityTimeSeconds: 300,
          },
        },
        {
          id: 'TX-CONFIRM-001',
          name: 'Transaction confirmation timing tests',
          description: 'Tests transaction confirmation timing across different L2 chains',
          transactions: [
            {
              id: 'tx-optimism-1',
              chain: 'optimism',
              type: 'transfer',
              gasLimit: 21000,
            },
            {
              id: 'tx-arbitrum-1',
              chain: 'arbitrum',
              type: 'transfer',
              gasLimit: 21000,
            },
            {
              id: 'tx-zksync-1',
              chain: 'zksync',
              type: 'transfer',
              gasLimit: 21000,
            },
          ],
          thresholds: {
            maxConfirmationTimeSeconds: 60,
          },
        },
        {
          id: 'REORG-001',
          name: 'Reorg simulation and recovery testing',
          description: 'Simulates chain reorganizations and tests recovery mechanisms',
          scenarios: [
            {
              id: 'reorg-optimism-1',
              chain: 'optimism',
              depth: 2,
              affectedTransactions: 5,
            },
            {
              id: 'reorg-arbitrum-1',
              chain: 'arbitrum',
              depth: 3,
              affectedTransactions: 10,
            },
            {
              id: 'reorg-zksync-1',
              chain: 'zksync',
              depth: 1,
              affectedTransactions: 3,
            },
          ],
          thresholds: {
            maxRecoveryTimeSeconds: 120,
            minConsistencyPercentage: 99.9,
          },
        },
      ],
      testsets: {
        default: ['FINALITY-001', 'TX-CONFIRM-001', 'REORG-001'],
        quick: ['FINALITY-001', 'TX-CONFIRM-001'],
      },
      environments: {
        development: {
          activeTestsets: ['quick'],
          disabledTests: [],
        },
        production: {
          activeTestsets: ['default'],
          disabledTests: [],
        },
      },
    };
  }

  // Helper methods for L2 performance testing

  /**
   * Calculates finality time for a given chain
   * @private
   * @param {Object} chain - Chain configuration
   * @returns {number} Finality time in seconds
   */
  _calculateFinalityTime(chain) {
    // Simulate finality time calculation
    // In a real implementation, this would interact with the chain's RPC
    const baseTime = chain.blockTime * (chain.finalityBlocks || 1);
    const variationFactor = 0.8 + Math.random() * 0.4; // Random variation between 0.8x and 1.2x
    return Math.round(baseTime * variationFactor * 10) / 10;
  }

  /**
   * Gets the number of confirmed blocks for a chain
   * @private
   * @param {Object} chain - Chain configuration
   * @returns {number} Number of confirmed blocks
   */
  _getConfirmedBlocks(chain) {
    // Simulate getting confirmed blocks
    // In a real implementation, this would query the chain
    return Math.floor(10 + Math.random() * 20);
  }

  /**
   * Assesses security level of a chain based on its properties
   * @private
   * @param {Object} chain - Chain configuration
   * @returns {string} Security level assessment
   */
  _assessSecurityLevel(chain) {
    // Simulate security level assessment
    const levels = ['high', 'medium', 'low'];
    // In a real implementation, this would be based on actual chain properties
    return levels[Math.floor(Math.random() * levels.length)];
  }

  /**
   * Simulates confirmation time for a transaction
   * @private
   * @param {Object} tx - Transaction configuration
   * @returns {string} ISO timestamp of confirmation
   */
  _simulateConfirmationTime(tx) {
    // Simulate confirmation time
    // Different chains have different confirmation times
    let delay = 1000; // 1 second base

    switch (tx.chain) {
      case 'optimism':
        delay = 2000 + Math.random() * 3000; // 2-5 seconds
        break;
      case 'arbitrum':
        delay = 200 + Math.random() * 500; // 0.2-0.7 seconds
        break;
      case 'zksync':
        delay = 1000 + Math.random() * 2000; // 1-3 seconds
        break;
      default:
        delay = 1000 + Math.random() * 4000; // 1-5 seconds
    }

    const confirmTime = new Date();
    confirmTime.setMilliseconds(confirmTime.getMilliseconds() + delay);
    return confirmTime.toISOString();
  }

  /**
   * Checks finality status for a transaction
   * @private
   * @param {Object} tx - Transaction configuration
   * @returns {boolean} Whether finality is achieved
   */
  _checkFinalityStatus(tx) {
    // Simulate finality status check
    // In a real implementation, this would check the chain
    return Math.random() > 0.1; // 90% chance of being final
  }

  /**
   * Calculates blocks needed to achieve finality
   * @private
   * @param {Object} tx - Transaction configuration
   * @returns {number} Number of blocks to finality
   */
  _calculateBlocksToFinality(tx) {
    // Simulate blocks to finality calculation
    // Different for each chain
    switch (tx.chain) {
      case 'optimism':
        return 1;
      case 'arbitrum':
        return 0;
      case 'zksync':
        return 0;
      default:
        return Math.floor(Math.random() * 3);
    }
  }

  /**
   * Simulates recovery time for a reorg scenario
   * @private
   * @param {Object} scenario - Reorg scenario configuration
   * @returns {string} ISO timestamp of recovery
   */
  _simulateRecoveryTime(scenario) {
    // Simulate recovery time based on reorg depth
    // Deeper reorgs take longer to recover from
    const baseDelay = scenario.depth * 5000; // 5 seconds per depth level
    const variability = Math.random() * 2000; // Up to 2 seconds of random variation

    const recoveryTime = new Date();
    recoveryTime.setMilliseconds(recoveryTime.getMilliseconds() + baseDelay + variability);
    return recoveryTime.toISOString();
  }

  /**
   * Counts transactions affected by a reorg
   * @private
   * @param {Object} scenario - Reorg scenario configuration
   * @returns {number} Number of affected transactions
   */
  _countAffectedTransactions(scenario) {
    // Simulate affected transaction count
    // Use the provided count or generate one based on depth
    return scenario.affectedTransactions || scenario.depth * Math.floor(1 + Math.random() * 3);
  }

  /**
   * Evaluates success of recovery from a reorg
   * @private
   * @param {Object} scenario - Reorg scenario configuration
   * @returns {boolean} Whether recovery was successful
   */
  _evaluateRecoverySuccess(scenario) {
    // Simulate recovery success evaluation
    // Deeper reorgs have slightly lower success chance
    const successChance = 0.98 - scenario.depth * 0.02;
    return Math.random() < successChance;
  }

  /**
   * Checks data consistency after a reorg
   * @private
   * @param {Object} scenario - Reorg scenario configuration
   * @returns {number} Consistency percentage (0-100)
   */
  _checkDataConsistency(scenario) {
    // Simulate data consistency check
    // Deeper reorgs might have slightly lower consistency
    const baseConsistency = 99.9;
    const depthImpact = scenario.depth * 0.05;
    const consistency = baseConsistency - depthImpact * Math.random();
    return Math.max(Math.round(consistency * 10) / 10, 95);
  }
}

module.exports = SecurityRulesValidator;
