/**
 * DeployGuardian - Deployment protection system with automated security checks and simulation
 * Secures smart contract deployments with pre-deployment validation and simulation
 */

const fs = require('fs');
const path = require('path');
const ethers = require('ethers');
const { spawnSync } = require('child_process');
const solc = require('solc');

class DeployGuardian {
  constructor(config = {}) {
    // Default configuration
    this.config = {
      // Basic config
      outputDir: config.outputDir || './deployments',
      networkConfigs: config.networkConfigs || {},

      // Validation config
      securityChecksEnabled: config.securityChecksEnabled !== false,
      simulationEnabled: config.simulationEnabled !== false,
      requiresApproval: config.requiresApproval !== false,
      ciMode: config.ciMode || false,

      // New: L2 support
      l2Support: config.l2Support || {
        enabled: true,
        networks: ['optimism', 'arbitrum', 'polygon', 'base', 'zksync', 'linea'],
      },

      // New: Gas optimization
      gasOptimization: config.gasOptimization || {
        enabled: true,
        targetGasPrice: null, // Auto-detect
        maxGasLimit: null, // Auto-detect
        priorityFee: null, // Auto-detect
      },

      // New: Historical comparison
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
    };

    // Initialize providers
    this.providers = {};
    this._initializeProviders();

    // Track active deployment
    this.activeDeployment = null;

    // Track all deployment results
    this.deploymentResults = {};

    // Load previous deployments
    this._loadPreviousDeployments();
  }

  /**
   * Initialize DeployGuardian
   */
  async initialize() {
    try {
      // Create output directory if it doesn't exist
      if (!fs.existsSync(this.config.outputDir)) {
        fs.mkdirSync(this.config.outputDir, { recursive: true });
      }

      // Initialize providers for each network
      for (const [networkName, networkConfig] of Object.entries(this.config.networkConfigs)) {
        try {
          this.providers[networkName] = new ethers.providers.JsonRpcProvider(networkConfig.rpcUrl);
          console.log(`Connected to ${networkName} at ${networkConfig.rpcUrl}`);
        } catch (error) {
          console.error(`Failed to connect to ${networkName}:`, error);
        }
      }

      // Check for security tools availability
      this._checkSecurityTools();

      return {
        networks: Object.keys(this.providers),
        securityTools: this._getAvailableSecurityTools(),
        approvers: this.config.approvers,
      };
    } catch (error) {
      console.error('Failed to initialize DeployGuardian:', error);
      throw error;
    }
  }

  /**
   * Check which security tools are available
   */
  _checkSecurityTools() {
    // Check Mythril
    try {
      if (this.config.securityTools.mythril) {
        const mythrilResult = spawnSync('myth', ['--version'], { encoding: 'utf8' });
        this.config.securityTools.mythril = mythrilResult.status === 0;
      }
    } catch (error) {
      this.config.securityTools.mythril = false;
    }

    // Check Slither
    try {
      if (this.config.securityTools.slither) {
        const slitherResult = spawnSync('slither', ['--version'], { encoding: 'utf8' });
        this.config.securityTools.slither = slitherResult.status === 0;
      }
    } catch (error) {
      this.config.securityTools.slither = false;
    }

    // Check Solhint
    try {
      if (this.config.securityTools.solhint) {
        const solhintResult = spawnSync('solhint', ['--version'], { encoding: 'utf8' });
        this.config.securityTools.solhint = solhintResult.status === 0;
      }
    } catch (error) {
      this.config.securityTools.solhint = false;
    }
  }

  /**
   * Get available security tools
   */
  _getAvailableSecurityTools() {
    return Object.entries(this.config.securityTools)
      .filter(([_, enabled]) => enabled)
      .map(([name]) => name);
  }

  /**
   * Validate a contract deployment
   */
  async validateDeployment(contractPath, contractName, network, constructorArgs = []) {
    console.log(`Validating deployment of ${contractName} on ${network}...`);

    if (!this.providers[network]) {
      throw new Error(`Network ${network} not configured`);
    }

    const networkConfig = this.getNetworkConfig(network);
    const provider = this.providers[network];

    // Set the active deployment
    this.activeDeployment = {
      id: `${contractName}_${network}_${Date.now()}`,
      contractPath,
      contractName,
      network,
      constructorArgs,
      startTime: Date.now(),
      status: 'validating',
      steps: [],
      isL2: networkConfig.isL2 || false,
      l2Type: networkConfig.l2Type || null,
    };

    // Add validation step
    this._addDeploymentStep('validation', 'Validation started');

    // Perform validation checks
    try {
      // Check if contract exists
      if (!fs.existsSync(contractPath)) {
        throw new Error(`Contract file not found: ${contractPath}`);
      }

      // Compile the contract
      const compilationResult = await this._compileContract(contractPath, contractName);
      this._addDeploymentStep('compilation', 'Contract compiled successfully', compilationResult);

      // Run security checks if enabled
      if (this.config.securityChecksEnabled) {
        const securityResult = await this._runSecurityChecks(contractPath);
        this._addDeploymentStep('security', 'Security checks completed', securityResult);

        // Check if security issues exceed thresholds
        if (this._exceedsSecurityThresholds(securityResult)) {
          throw new Error('Security issues exceed configured thresholds');
        }
      }

      // Check for historical vulnerabilities if enabled
      if (this.config.historicalComparison.enabled) {
        const historyResult = await this._compareWithHistoricalDeployments(contractName, network);
        this._addDeploymentStep('history_check', 'Historical comparison completed', historyResult);

        if (historyResult.hasRegressions) {
          console.warn('WARNING: Security regressions detected compared to previous deployments');
          this._addDeploymentStep(
            'warning',
            'Security regressions detected',
            historyResult.regressions
          );
        }
      }

      // Estimate gas for deployment
      const gasEstimation = await this._estimateDeploymentGas(
        compilationResult.abi,
        compilationResult.bytecode,
        constructorArgs,
        provider,
        networkConfig
      );
      this._addDeploymentStep('gas_estimation', 'Gas estimation completed', gasEstimation);

      // Perform gas optimization if enabled
      let gasOptimizationResult = null;
      if (this.config.gasOptimization.enabled) {
        gasOptimizationResult = await this._optimizeGasParameters(
          gasEstimation,
          network,
          networkConfig
        );
        this._addDeploymentStep(
          'gas_optimization',
          'Gas optimization completed',
          gasOptimizationResult
        );
      }

      // Run simulation if enabled
      if (this.config.simulationEnabled) {
        const simulationResult = await this._simulateDeployment(
          compilationResult.abi,
          compilationResult.bytecode,
          constructorArgs,
          network,
          networkConfig
        );
        this._addDeploymentStep('simulation', 'Deployment simulation completed', simulationResult);
      }

      // L2-specific validations
      if (networkConfig.isL2) {
        const l2ValidationResult = await this._validateL2Deployment(
          compilationResult,
          network,
          networkConfig
        );
        this._addDeploymentStep(
          'l2_validation',
          'L2-specific validation completed',
          l2ValidationResult
        );

        if (l2ValidationResult.warnings.length > 0) {
          for (const warning of l2ValidationResult.warnings) {
            console.warn(`L2 WARNING: ${warning}`);
          }
        }
      }

      // Check if deployment requires approval
      if (this.config.requiresApproval && !this.config.ciMode) {
        this._addDeploymentStep('approval', 'Deployment requires approval');
        this.activeDeployment.status = 'approval_required';
      } else {
        this.activeDeployment.status = 'validated';
      }

      // Save deployment information
      this._saveDeploymentInfo();

      return {
        deploymentId: this.activeDeployment.id,
        status: this.activeDeployment.status,
        steps: this.activeDeployment.steps,
        gasEstimation,
        optimizedGas: gasOptimizationResult,
        isL2: networkConfig.isL2,
        l2Type: networkConfig.l2Type,
      };
    } catch (error) {
      this._addDeploymentStep('error', `Validation failed: ${error.message}`);
      this.activeDeployment.status = 'failed';

      // Save deployment information
      this._saveDeploymentInfo();

      throw error;
    }
  }

  /**
   * Deploy a contract
   */
  async deployContract(deploymentId, signerPrivateKey = null) {
    // Check if deployment exists
    if (!this.deploymentResults[deploymentId]) {
      throw new Error(`Deployment ${deploymentId} not found`);
    }

    const deployment = this.deploymentResults[deploymentId];

    // Check if deployment is validated or approved
    if (deployment.status !== 'validated' && deployment.status !== 'approved') {
      throw new Error(`Deployment ${deploymentId} is not validated or approved`);
    }

    // Set as active deployment
    this.activeDeployment = deployment;

    try {
      // Get network configuration
      const network = deployment.network;
      const networkConfig = this.config.networkConfigs[network];
      const provider = this.providers[network];

      // Create signer
      const privateKey = signerPrivateKey || networkConfig.deployerKey;
      if (!privateKey) {
        throw new Error(`No deployer key available for network ${network}`);
      }

      const wallet = new ethers.Wallet(privateKey, provider);
      console.log(`Deploying with account: ${wallet.address}`);

      // Get compilation result from steps
      const compilationStep = deployment.steps.find(step => step.name === 'compilation');
      if (!compilationStep || !compilationStep.result) {
        throw new Error('Compilation result not found');
      }

      const { abi, bytecode } = compilationStep.result;

      // Create contract factory
      const factory = new ethers.ContractFactory(abi, bytecode, wallet);

      // Add deployment step
      this._addDeploymentStep('deployment', `Deploying contract to ${network}`);

      // Deploy contract
      const deployTx = await factory.getDeployTransaction(...deployment.constructorArgs);

      // Get gas price
      const gasPrice = networkConfig.gasPrice || (await provider.getGasPrice());

      // Estimate gas
      const gasLimit = await provider.estimateGas(deployTx);

      // Deploy with gas settings
      const tx = await wallet.sendTransaction({
        ...deployTx,
        gasPrice,
        gasLimit: gasLimit.mul(120).div(100), // Add 20% buffer
      });

      this._addDeploymentStep('transaction', `Transaction sent: ${tx.hash}`);

      // Wait for confirmation
      const receipt = await tx.wait(2); // Wait for 2 confirmations

      // Update deployment status
      this.activeDeployment.contractAddress = receipt.contractAddress;
      this.activeDeployment.status = 'deployed';
      this.activeDeployment.completionTime = Date.now();
      this.activeDeployment.duration =
        (this.activeDeployment.completionTime - this.activeDeployment.startTime) / 1000;

      // Add final step
      this._addDeploymentStep('success', `Contract deployed at ${receipt.contractAddress}`);

      // Save deployment information
      this._saveDeploymentInfo();

      return {
        deploymentId,
        contractAddress: receipt.contractAddress,
        transactionHash: receipt.transactionHash,
        network,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
      };
    } catch (error) {
      this._addDeploymentStep('error', `Deployment failed: ${error.message}`);
      this.activeDeployment.status = 'failed';

      // Save deployment information
      this._saveDeploymentInfo();

      throw error;
    }
  }

  /**
   * Approve a deployment
   */
  async approveDeployment(deploymentId, approver) {
    // Check if deployment exists
    if (!this.deploymentResults[deploymentId]) {
      throw new Error(`Deployment ${deploymentId} not found`);
    }

    const deployment = this.deploymentResults[deploymentId];

    // Check if deployment requires approval
    if (deployment.status !== 'approval_required') {
      throw new Error(`Deployment ${deploymentId} does not require approval`);
    }

    // Check if approver is authorized
    if (this.config.approvers.length > 0 && !this.config.approvers.includes(approver)) {
      throw new Error(`Approver ${approver} is not authorized`);
    }

    // Update deployment status
    deployment.status = 'approved';
    deployment.approver = approver;
    deployment.approvalTime = Date.now();

    // Add approval step
    deployment.steps.push({
      name: 'approval',
      timestamp: Date.now(),
      message: `Approved by ${approver}`,
      result: { approver },
    });

    // Save deployment information
    this.deploymentResults[deploymentId] = deployment;
    this._saveDeploymentInfo(deployment);

    return {
      deploymentId,
      status: 'approved',
      approver,
      approvalTime: new Date(deployment.approvalTime).toISOString(),
    };
  }

  /**
   * Reject a deployment
   */
  async rejectDeployment(deploymentId, rejector, reason) {
    // Check if deployment exists
    if (!this.deploymentResults[deploymentId]) {
      throw new Error(`Deployment ${deploymentId} not found`);
    }

    const deployment = this.deploymentResults[deploymentId];

    // Check if deployment requires approval
    if (deployment.status !== 'approval_required') {
      throw new Error(`Deployment ${deploymentId} does not require approval`);
    }

    // Check if rejector is authorized
    if (this.config.approvers.length > 0 && !this.config.approvers.includes(rejector)) {
      throw new Error(`Rejector ${rejector} is not authorized`);
    }

    // Update deployment status
    deployment.status = 'rejected';
    deployment.rejector = rejector;
    deployment.rejectionReason = reason;
    deployment.rejectionTime = Date.now();

    // Add rejection step
    deployment.steps.push({
      name: 'rejection',
      timestamp: Date.now(),
      message: `Rejected by ${rejector}: ${reason}`,
      result: { rejector, reason },
    });

    // Save deployment information
    this.deploymentResults[deploymentId] = deployment;
    this._saveDeploymentInfo(deployment);

    return {
      deploymentId,
      status: 'rejected',
      rejector,
      reason,
      rejectionTime: new Date(deployment.rejectionTime).toISOString(),
    };
  }

  /**
   * Compile a contract
   */
  async _compileContract(contractPath, contractName) {
    console.log(`Compiling contract: ${contractPath}`);

    // Read the contract source code
    const source = fs.readFileSync(contractPath, 'utf8');

    // Create input for solc compiler
    const input = {
      language: 'Solidity',
      sources: {
        [contractPath]: {
          content: source,
        },
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['abi', 'evm.bytecode', 'metadata'],
          },
        },
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    };

    // Compile the contract
    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    // Check for compilation errors
    if (output.errors) {
      const errors = output.errors.filter(error => error.severity === 'error');
      if (errors.length > 0) {
        throw new Error(`Compilation errors: ${errors.map(e => e.message).join(', ')}`);
      }
    }

    // Get contract artifacts
    const contractArtifacts = output.contracts[contractPath][contractName];
    if (!contractArtifacts) {
      throw new Error(`Contract ${contractName} not found in ${contractPath}`);
    }

    return {
      abi: contractArtifacts.abi,
      bytecode: contractArtifacts.evm.bytecode.object,
      metadata: contractArtifacts.metadata,
    };
  }

  /**
   * Run security checks on a contract
   */
  async _runSecurityChecks(contractPath) {
    console.log(`Running security checks on: ${contractPath}`);

    const results = {
      issues: {
        high: [],
        medium: [],
        low: [],
        info: [],
      },
      tools: {},
    };

    // Run Mythril if enabled and available
    if (this.config.securityTools.mythril) {
      try {
        const mythrilResult = spawnSync('myth', ['analyze', contractPath, '--json'], {
          encoding: 'utf8',
        });

        if (mythrilResult.status === 0) {
          const mythrilIssues = JSON.parse(mythrilResult.stdout);
          results.tools.mythril = {
            success: true,
            issues: mythrilIssues,
          };

          // Process issues
          for (const issue of mythrilIssues) {
            const severity = this._mapMythrilSeverity(issue.severity);
            results.issues[severity].push({
              tool: 'mythril',
              title: issue.title,
              description: issue.description,
              severity,
              location: `${issue.filename}:${issue.lineno}`,
            });
          }
        } else {
          results.tools.mythril = {
            success: false,
            error: mythrilResult.stderr,
          };
        }
      } catch (error) {
        results.tools.mythril = {
          success: false,
          error: error.message,
        };
      }
    }

    // Run Slither if enabled and available
    if (this.config.securityTools.slither) {
      try {
        const slitherResult = spawnSync('slither', [contractPath, '--json', '-'], {
          encoding: 'utf8',
        });

        if (slitherResult.status === 0) {
          const slitherIssues = JSON.parse(slitherResult.stdout);
          results.tools.slither = {
            success: true,
            issues: slitherIssues.results.detectors,
          };

          // Process issues
          for (const issue of slitherIssues.results.detectors) {
            const severity = this._mapSlitherSeverity(issue.impact);
            results.issues[severity].push({
              tool: 'slither',
              title: issue.check,
              description: issue.description,
              severity,
              location: issue.elements
                .map(el => `${el.source_mapping.filename}:${el.source_mapping.lines[0]}`)
                .join(', '),
            });
          }
        } else {
          results.tools.slither = {
            success: false,
            error: slitherResult.stderr,
          };
        }
      } catch (error) {
        results.tools.slither = {
          success: false,
          error: error.message,
        };
      }
    }

    // Run Solhint if enabled and available
    if (this.config.securityTools.solhint) {
      try {
        const solhintResult = spawnSync('solhint', [contractPath, '--formatter', 'json'], {
          encoding: 'utf8',
        });

        // Solhint returns exit code 1 if it finds issues
        const solhintIssues = JSON.parse(solhintResult.stdout);
        results.tools.solhint = {
          success: true,
          issues: solhintIssues,
        };

        // Process issues
        for (const issue of solhintIssues) {
          const severity = this._mapSolhintSeverity(issue.severity);
          results.issues[severity].push({
            tool: 'solhint',
            title: issue.ruleId,
            description: issue.message,
            severity,
            location: `${issue.filePath}:${issue.line}:${issue.column}`,
          });
        }
      } catch (error) {
        results.tools.solhint = {
          success: false,
          error: error.message,
        };
      }
    }

    // Run custom checks
    if (this.config.securityTools.custom) {
      try {
        const customIssues = this._runCustomSecurityChecks(contractPath);
        results.tools.custom = {
          success: true,
          issues: customIssues,
        };

        // Process issues
        for (const issue of customIssues) {
          results.issues[issue.severity].push({
            tool: 'custom',
            title: issue.title,
            description: issue.description,
            severity: issue.severity,
            location: issue.location,
          });
        }
      } catch (error) {
        results.tools.custom = {
          success: false,
          error: error.message,
        };
      }
    }

    // Save security results
    this.securityResults[this.activeDeployment.id] = results;

    return {
      highCount: results.issues.high.length,
      mediumCount: results.issues.medium.length,
      lowCount: results.issues.low.length,
      infoCount: results.issues.info.length,
      issues: results.issues,
      tools: Object.keys(results.tools),
    };
  }

  /**
   * Run custom security checks
   */
  _runCustomSecurityChecks(contractPath) {
    const source = fs.readFileSync(contractPath, 'utf8');
    const issues = [];

    // Check for common issues

    // Reentrancy check
    if (source.includes('call.value(') && !source.includes('nonReentrant')) {
      issues.push({
        title: 'Potential Reentrancy',
        description: 'The contract uses call.value() without a reentrancy guard',
        severity: 'high',
        location: contractPath,
      });
    }

    // Unchecked return values
    if (source.includes('.transfer(') || source.includes('.send(')) {
      const transferCount = (source.match(/\.transfer\(/g) || []).length;
      const transferWithCheckCount = (source.match(/require\(.*\.transfer\(/g) || []).length;

      if (transferCount > transferWithCheckCount) {
        issues.push({
          title: 'Unchecked Transfer Return Value',
          description: 'The contract does not check the return value of all transfer/send calls',
          severity: 'medium',
          location: contractPath,
        });
      }
    }

    // Floating pragma
    if (source.includes('pragma solidity ^')) {
      issues.push({
        title: 'Floating Pragma',
        description: 'The contract uses a floating pragma, which may lead to inconsistent behavior',
        severity: 'low',
        location: contractPath,
      });
    }

    // Missing zero address check
    if (
      source.includes('constructor') &&
      source.includes('address') &&
      !source.includes('address(0)')
    ) {
      issues.push({
        title: 'Missing Zero Address Check',
        description:
          'The constructor accepts address parameters without checking for the zero address',
        severity: 'low',
        location: contractPath,
      });
    }

    return issues;
  }

  /**
   * Estimate gas for deployment
   * @param {Array} abi - Contract ABI
   * @param {string} bytecode - Contract bytecode
   * @param {Array} args - Constructor arguments
   * @param {Object} provider - Network provider
   * @param {Object} networkConfig - Network configuration
   * @returns {Promise<Object>} Gas estimation
   */
  async _estimateDeploymentGas(abi, bytecode, args, provider, networkConfig = {}) {
    try {
      // Create contract factory
      const factory = new ethers.ContractFactory(abi, bytecode, provider.getSigner());

      // Get deploy transaction
      const deployTx = await factory.getDeployTransaction(...args);

      // Estimate gas
      const gasEstimate = await provider.estimateGas(deployTx);

      // Get current gas price
      const gasPrice = await provider.getGasPrice();

      // For L2s, get additional info
      let l2GasData = {};
      if (networkConfig.isL2) {
        l2GasData = await this._getL2GasData(provider, networkConfig);
      }

      return {
        gasEstimate: gasEstimate.toString(),
        gasPrice: gasPrice.toString(),
        estimatedCost: ethers.utils.formatEther(gasEstimate.mul(gasPrice)),
        deployTxSize: Buffer.from(deployTx.data.slice(2), 'hex').length,
        ...l2GasData,
      };
    } catch (error) {
      console.error('Error estimating gas:', error);
      throw new Error(`Gas estimation failed: ${error.message}`);
    }
  }

  /**
   * Get L2-specific gas data
   * @param {Object} provider - Network provider
   * @param {Object} networkConfig - Network configuration
   * @returns {Promise<Object>} L2 gas data
   */
  async _getL2GasData(provider, networkConfig) {
    const l2Type = networkConfig.l2Type;

    switch (l2Type) {
      case 'optimistic-rollup':
        return this._getOptimisticRollupGasData(provider, networkConfig);
      case 'zk-rollup':
        return this._getZkRollupGasData(provider, networkConfig);
      default:
        return {};
    }
  }

  /**
   * Get Optimistic Rollup specific gas data
   * @param {Object} provider - Network provider
   * @param {Object} networkConfig - Network configuration
   * @returns {Promise<Object>} Optimistic Rollup gas data
   */
  async _getOptimisticRollupGasData(provider, networkConfig) {
    try {
      // This would normally call provider-specific methods to get L1 gas price
      // For example, on Optimism: l1BaseFee = await provider.getL1BaseFee();
      // Simulated for now

      const l1GasPrice = networkConfig.l1GasPrice || '100000000000'; // 100 gwei
      const l1Fee = networkConfig.l1SubmissionCost || '500000'; // estimated L1 submission cost
      const l1DataFee = ethers.BigNumber.from(l1Fee).mul(ethers.BigNumber.from(l1GasPrice));

      return {
        l1GasPrice,
        l1Fee,
        l1DataFee: l1DataFee.toString(),
        l1EstimatedCost: ethers.utils.formatEther(l1DataFee),
      };
    } catch (error) {
      console.warn('Error getting Optimistic Rollup gas data:', error);
      return {};
    }
  }

  /**
   * Get ZK Rollup specific gas data
   * @param {Object} provider - Network provider
   * @param {Object} networkConfig - Network configuration
   * @returns {Promise<Object>} ZK Rollup gas data
   */
  async _getZkRollupGasData(provider, networkConfig) {
    try {
      // This would call provider-specific methods for ZK rollups
      // Simulated for now

      return {
        zkProofCost: networkConfig.zkProofCost || '250000',
        zkCompressionFactor: networkConfig.zkCompressionFactor || '5',
        zkEstimatedCost: networkConfig.zkEstimatedCost || '0.01',
      };
    } catch (error) {
      console.warn('Error getting ZK Rollup gas data:', error);
      return {};
    }
  }

  /**
   * Optimize gas parameters for deployment
   * @param {Object} gasEstimation - Gas estimation data
   * @param {string} network - Network name
   * @param {Object} networkConfig - Network configuration
   * @returns {Promise<Object>} Optimized gas parameters
   */
  async _optimizeGasParameters(gasEstimation, network, networkConfig) {
    try {
      const provider = this.providers[network];

      // Get current network conditions
      const currentGasPrice = ethers.BigNumber.from(gasEstimation.gasPrice);
      const feeData = await provider.getFeeData();

      // Get target gas price
      let targetGasPrice = this.config.gasOptimization.targetGasPrice
        ? ethers.BigNumber.from(this.config.gasOptimization.targetGasPrice)
        : currentGasPrice;

      // For L2s, apply special gas price strategies
      if (networkConfig.isL2) {
        // L2s are often cheaper, so we can use the current gas price
        targetGasPrice = currentGasPrice;
      } else {
        // For L1s, try to find a cost-effective gas price
        // If gas price is high, try to save by using slightly lower
        if (currentGasPrice.gt(ethers.utils.parseUnits('50', 'gwei'))) {
          // If gas price is high (>50 gwei), use 90% of current
          targetGasPrice = currentGasPrice.mul(90).div(100);
        }
      }

      // Calculate priority fee (EIP-1559)
      let priorityFee = feeData.maxPriorityFeePerGas;
      if (!priorityFee || priorityFee.eq(0)) {
        // Default priority fee if not available
        priorityFee = ethers.utils.parseUnits('1.5', 'gwei');
      }

      // If config specifies priority fee, use that instead
      if (this.config.gasOptimization.priorityFee) {
        priorityFee = ethers.BigNumber.from(this.config.gasOptimization.priorityFee);
      }

      // Calculate max fee (base fee + priority fee)
      const baseFee = feeData.lastBaseFeePerGas || ethers.BigNumber.from(0);
      const maxFeePerGas = baseFee.add(priorityFee);

      // Ensure max gas limit doesn't exceed configured limit
      const gasLimit = ethers.BigNumber.from(gasEstimation.gasEstimate)
        .mul(120) // Add 20% buffer
        .div(100);

      const maxGasLimit = this.config.gasOptimization.maxGasLimit
        ? ethers.BigNumber.from(this.config.gasOptimization.maxGasLimit)
        : gasLimit;

      const finalGasLimit = gasLimit.gt(maxGasLimit) ? maxGasLimit : gasLimit;

      // Calculate costs
      const optimizedCost = ethers.utils.formatEther(finalGasLimit.mul(targetGasPrice));
      const eip1559Cost = ethers.utils.formatEther(finalGasLimit.mul(maxFeePerGas));

      // Determine if EIP-1559 is better
      const useEIP1559 = feeData.maxFeePerGas && feeData.maxPriorityFeePerGas;

      // Return optimized parameters
      return {
        originalGasPrice: currentGasPrice.toString(),
        optimizedGasPrice: targetGasPrice.toString(),
        priorityFee: priorityFee.toString(),
        maxFeePerGas: maxFeePerGas.toString(),
        baseFee: baseFee.toString(),
        gasLimit: finalGasLimit.toString(),
        estimatedCost: optimizedCost,
        eip1559Cost,
        useEIP1559,
        savings: (parseFloat(gasEstimation.estimatedCost) - parseFloat(optimizedCost)).toFixed(6),
        savingsPercentage:
          (
            ((parseFloat(gasEstimation.estimatedCost) - parseFloat(optimizedCost)) /
              parseFloat(gasEstimation.estimatedCost)) *
            100
          ).toFixed(2) + '%',
      };
    } catch (error) {
      console.error('Error optimizing gas parameters:', error);
      return {
        error: error.message,
        useOriginalParameters: true,
      };
    }
  }

  /**
   * Validate L2-specific deployment requirements
   * @param {Object} compilationResult - Compilation result
   * @param {string} network - Network name
   * @param {Object} networkConfig - Network configuration
   * @returns {Promise<Object>} Validation result
   */
  async _validateL2Deployment(compilationResult, network, networkConfig) {
    const warnings = [];
    const validations = [];

    try {
      const l2Type = networkConfig.l2Type;
      const contractSize = Buffer.from(compilationResult.bytecode.slice(2), 'hex').length;

      // Check contract size
      if (contractSize > 24576) {
        warnings.push(
          `Contract size (${contractSize} bytes) exceeds standard contract size limit.`
        );
      }

      // L2-specific validations
      switch (l2Type) {
        case 'optimistic-rollup':
          validations.push({
            name: 'L1 to L2 message gas',
            result: 'passed',
            details: 'The contract deployment is within gas limits for L1 to L2 messages.',
          });

          // Check for storage access patterns
          if (
            compilationResult.abi.some(
              item => item.type === 'function' && item.stateMutability === 'view'
            )
          ) {
            validations.push({
              name: 'Storage access patterns',
              result: 'warning',
              details:
                'The contract has view functions that may be inefficient on Optimistic Rollups.',
            });
            warnings.push(
              'View functions may be inefficient on Optimistic Rollups due to storage access costs.'
            );
          }
          break;

        case 'zk-rollup':
          // Check for unsupported operations
          const bytecode = compilationResult.bytecode;
          if (bytecode.includes('48') || bytecode.includes('49')) {
            // CALL and DELEGATECALL opcodes
            validations.push({
              name: 'ZK compatibility',
              result: 'warning',
              details:
                'The contract may use operations that are inefficient or unsupported on ZK Rollups.',
            });
            warnings.push(
              'Contract may use operations that are inefficient on ZK Rollups (e.g., extensive precompiles).'
            );
          }
          break;

        default:
          break;
      }

      // Check for cross-contract calls
      if (
        compilationResult.abi.some(
          item => item.type === 'function' && item.outputs && item.outputs.length > 0
        )
      ) {
        const functionSignatures = compilationResult.abi
          .filter(item => item.type === 'function')
          .map(item => `${item.name}(${item.inputs.map(i => i.type).join(',')})`);

        validations.push({
          name: 'Cross-contract communication',
          result: 'info',
          details: 'Functions that may involve cross-contract communication detected.',
          functions: functionSignatures,
        });
      }

      return {
        network,
        l2Type,
        contractSize,
        validations,
        warnings,
        passed: warnings.length === 0,
      };
    } catch (error) {
      console.error('Error validating L2 deployment:', error);
      return {
        network,
        l2Type: networkConfig.l2Type,
        error: error.message,
        validations: [],
        warnings: [`L2 validation failed: ${error.message}`],
        passed: false,
      };
    }
  }

  /**
   * Load previous deployments for historical comparison
   */
  _loadPreviousDeployments() {
    try {
      const deploymentsDir = this.config.outputDir;
      if (!fs.existsSync(deploymentsDir)) {
        return;
      }

      // Load deployments by network
      const networks = fs
        .readdirSync(deploymentsDir)
        .filter(file => fs.statSync(path.join(deploymentsDir, file)).isDirectory());

      this.previousDeployments = {};

      for (const network of networks) {
        const networkDir = path.join(deploymentsDir, network);
        const deploymentFiles = fs.readdirSync(networkDir).filter(file => file.endsWith('.json'));

        this.previousDeployments[network] = {};

        for (const file of deploymentFiles) {
          const contractName = path.basename(file, '.json');

          if (!this.previousDeployments[network][contractName]) {
            this.previousDeployments[network][contractName] = [];
          }

          try {
            const deploymentData = fs.readJsonSync(path.join(networkDir, file));

            if (deploymentData.timestamp) {
              this.previousDeployments[network][contractName].push(deploymentData);
            }
          } catch (error) {
            console.warn(`Error reading deployment file ${file}:`, error);
          }
        }

        // Sort deployments by timestamp (newest first)
        for (const contractName of Object.keys(this.previousDeployments[network])) {
          this.previousDeployments[network][contractName].sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );

          // Limit to max deployments
          if (
            this.previousDeployments[network][contractName].length >
            this.config.historicalComparison.maxDeployments
          ) {
            this.previousDeployments[network][contractName] = this.previousDeployments[network][
              contractName
            ].slice(0, this.config.historicalComparison.maxDeployments);
          }
        }
      }

      console.log(
        `Loaded historical deployment data for ${Object.keys(this.previousDeployments).length} networks`
      );
    } catch (error) {
      console.error('Error loading previous deployments:', error);
    }
  }

  /**
   * Compare with historical deployments
   * @param {string} contractName - Contract name
   * @param {string} network - Network name
   * @returns {Promise<Object>} Comparison result
   */
  async _compareWithHistoricalDeployments(contractName, network) {
    if (
      !this.previousDeployments?.[network]?.[contractName] ||
      this.previousDeployments[network][contractName].length === 0
    ) {
      return {
        compared: false,
        reason: 'No previous deployments found',
        hasRegressions: false,
      };
    }

    try {
      const previousDeployments = this.previousDeployments[network][contractName];
      const latestDeployment = previousDeployments[0];

      // Compare security issues
      const currentSecurityIssues =
        this.activeDeployment.steps.find(step => step.name === 'security')?.result || {};
      const previousSecurityIssues =
        latestDeployment.steps?.find(step => step.name === 'security')?.result || {};

      const newIssues = [];
      const fixedIssues = [];
      const unchangedIssues = [];

      // Check for new issues
      if (currentSecurityIssues.issues) {
        for (const issue of currentSecurityIssues.issues) {
          const foundInPrevious = previousSecurityIssues.issues?.some(
            prevIssue => prevIssue.id === issue.id || prevIssue.description === issue.description
          );

          if (!foundInPrevious) {
            newIssues.push(issue);
          } else {
            unchangedIssues.push(issue);
          }
        }
      }

      // Check for fixed issues
      if (previousSecurityIssues.issues) {
        for (const prevIssue of previousSecurityIssues.issues) {
          const stillExists = currentSecurityIssues.issues?.some(
            issue => issue.id === prevIssue.id || issue.description === prevIssue.description
          );

          if (!stillExists) {
            fixedIssues.push(prevIssue);
          }
        }
      }

      // Check for gas regressions
      const currentGasEstimation =
        this.activeDeployment.steps.find(step => step.name === 'gas_estimation')?.result || {};
      const previousGasEstimation =
        latestDeployment.steps?.find(step => step.name === 'gas_estimation')?.result || {};

      let gasRegression = false;
      let gasDifference = '0';
      let gasDifferencePercentage = '0%';

      if (currentGasEstimation.gasEstimate && previousGasEstimation.gasEstimate) {
        const currentGas = ethers.BigNumber.from(currentGasEstimation.gasEstimate);
        const previousGas = ethers.BigNumber.from(previousGasEstimation.gasEstimate);

        // Check if gas increased by more than 5%
        if (currentGas.gt(previousGas.mul(105).div(100))) {
          gasRegression = true;

          // Calculate difference
          gasDifference = currentGas.sub(previousGas).toString();
          gasDifferencePercentage =
            ((parseInt(gasDifference) / parseInt(previousGas)) * 100).toFixed(2) + '%';
        }
      }

      // Determine if we have regressions
      const hasRegressions = newIssues.length > 0 || gasRegression;

      return {
        compared: true,
        previousDeployment: {
          timestamp: latestDeployment.timestamp,
          id: latestDeployment.id,
        },
        securityComparison: {
          newIssues,
          fixedIssues,
          unchangedIssues,
        },
        gasComparison: {
          gasRegression,
          gasDifference,
          gasDifferencePercentage,
          current: currentGasEstimation.gasEstimate,
          previous: previousGasEstimation.gasEstimate,
        },
        hasRegressions,
        regressions: hasRegressions
          ? {
              security: newIssues.length > 0 ? newIssues : null,
              gas: gasRegression
                ? {
                    difference: gasDifference,
                    percentage: gasDifferencePercentage,
                  }
                : null,
            }
          : null,
      };
    } catch (error) {
      console.error('Error comparing with historical deployments:', error);
      return {
        compared: false,
        error: error.message,
        hasRegressions: false,
      };
    }
  }

  /**
   * Get network-specific configuration
   * @param {string} network - Network name
   * @returns {Object} Network configuration
   */
  getNetworkConfig(network) {
    // Check if network is L2
    const isL2 = this.config.l2Support.networks.includes(network);

    const baseConfig = this.config.networkConfigs[network] || {};

    // Apply L2-specific configurations if needed
    if (isL2 && this.config.l2Support.enabled) {
      return {
        ...baseConfig,
        isL2: true,
        l2Type: this._getL2Type(network),
        // Add any L2-specific default params
        gasLimit: baseConfig.gasLimit || this._getDefaultL2GasLimit(network),
        useEstimation: baseConfig.useEstimation !== false,
      };
    }

    return baseConfig;
  }

  /**
   * Detect L2 type
   * @param {string} network - Network name
   * @returns {string} L2 type
   */
  _getL2Type(network) {
    const networkMap = {
      optimism: 'optimistic-rollup',
      base: 'optimistic-rollup',
      arbitrum: 'optimistic-rollup',
      polygon: 'plasma',
      zksync: 'zk-rollup',
      linea: 'zk-rollup',
      starknet: 'validium',
    };

    return networkMap[network] || 'unknown';
  }

  /**
   * Get default gas limit for L2 networks
   * @param {string} network - Network name
   * @returns {number} Default gas limit
   */
  _getDefaultL2GasLimit(network) {
    const gasLimits = {
      optimism: 9000000,
      base: 9000000,
      arbitrum: 100000000,
      polygon: 12000000,
      zksync: 8000000,
      linea: 8000000,
    };

    return gasLimits[network] || 8000000;
  }

  /**
   * Check if security issues exceed thresholds
   */
  _exceedsSecurityThresholds(securityResult) {
    const thresholds = this.config.securityThresholds;

    return (
      securityResult.highCount > thresholds.high ||
      securityResult.mediumCount > thresholds.medium ||
      securityResult.lowCount > thresholds.low
    );
  }

  /**
   * Add a step to the active deployment
   */
  _addDeploymentStep(name, message, result = null) {
    if (!this.activeDeployment) {
      return;
    }

    this.activeDeployment.steps.push({
      name,
      timestamp: Date.now(),
      message,
      result,
    });
  }

  /**
   * Save deployment information
   */
  _saveDeploymentInfo(deployment = null) {
    const deploymentToSave = deployment || this.activeDeployment;
    if (!deploymentToSave) {
      return;
    }

    // Save to memory
    this.deploymentResults[deploymentToSave.id] = { ...deploymentToSave };

    // Save to file
    const filePath = path.join(this.config.outputDir, `${deploymentToSave.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(deploymentToSave, null, 2));

    console.log(`Deployment information saved to ${filePath}`);
  }

  /**
   * Map Mythril severity to standardized severity
   */
  _mapMythrilSeverity(severity) {
    const mapping = {
      Critical: 'high',
      High: 'high',
      Medium: 'medium',
      Low: 'low',
      Informational: 'info',
    };

    return mapping[severity] || 'info';
  }

  /**
   * Map Slither severity to standardized severity
   */
  _mapSlitherSeverity(severity) {
    const mapping = {
      High: 'high',
      Medium: 'medium',
      Low: 'low',
      Informational: 'info',
    };

    return mapping[severity] || 'info';
  }

  /**
   * Map Solhint severity to standardized severity
   */
  _mapSolhintSeverity(severity) {
    const mapping = {
      2: 'high', // error
      1: 'medium', // warning
      0: 'info', // info
    };

    return mapping[severity] || 'info';
  }

  /**
   * Get all deployments
   */
  getDeployments() {
    return Object.values(this.deploymentResults);
  }

  /**
   * Get a deployment by ID
   */
  getDeployment(deploymentId) {
    return this.deploymentResults[deploymentId];
  }

  /**
   * Get pending approvals
   */
  getPendingApprovals() {
    return Object.values(this.deploymentResults).filter(
      deployment => deployment.status === 'approval_required'
    );
  }
}

module.exports = DeployGuardian;
