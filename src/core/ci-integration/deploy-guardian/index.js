
/**
 * DeployGuardian - Refactored Main Class
 * Orchestrates deployment protection with modular components
 */

const fs = require('fs');
const path = require('path');
const ethers = require('ethers');
const solc = require('solc');

const { DeployGuardianConfig } = require('./config');
const { SecurityChecker } = require('./security-checker');
const { GasOptimizer } = require('./gas-optimizer');
const { DeploymentSimulator } = require('./deployment-simulator');

class DeployGuardian {
  constructor(config = {}) {
    this.config = new DeployGuardianConfig(config);
    this.providers = {};
    this.deploymentResults = new Map();
    
    // Initialize modular components
    this.securityChecker = new SecurityChecker(this.config);
    this.gasOptimizer = new GasOptimizer(this.config, this.providers);
    this.deploymentSimulator = new DeploymentSimulator(this.config, this.providers);
    
    this._initializeProviders();
  }

  _initializeProviders() {
    const networkConfigs = this.config.get('networkConfigs');
    
    Object.keys(networkConfigs).forEach(network => {
      const config = networkConfigs[network];
      if (config.rpcUrl) {
        this.providers[network] = new ethers.providers.JsonRpcProvider(config.rpcUrl);
      }
    });
  }

  async validateDeployment(contractPath, contractName, network, constructorArgs = []) {
    const deploymentId = this._generateDeploymentId();
    const startTime = Date.now();

    try {
      // Validate inputs
      this._validateInputs(contractPath, contractName, network);
      
      const networkConfig = this.config.getNetworkConfig(network);
      const provider = this.providers[network];

      if (!provider) {
        throw new Error(`Provider not configured for network: ${network}`);
      }

      const result = {
        deploymentId,
        contractPath,
        contractName,
        network,
        constructorArgs,
        timestamp: new Date().toISOString(),
        status: 'validating',
        steps: {},
      };

      // Step 1: Compile contract
      console.log(`[${deploymentId}] Compiling contract...`);
      result.steps.compilation = await this._compileContract(contractPath, contractName);

      // Step 2: Security checks
      if (this.config.get('securityChecksEnabled')) {
        console.log(`[${deploymentId}] Running security checks...`);
        result.steps.security = await this.securityChecker.runSecurityChecks(contractPath);
        
        const securityValidation = this.securityChecker.validateSecurityThresholds(result.steps.security);
        if (!securityValidation.passed) {
          result.status = 'failed';
          result.error = 'Security checks failed';
          result.securityViolations = securityValidation.violations;
          return result;
        }
      }

      // Step 3: Gas estimation
      console.log(`[${deploymentId}] Estimating gas costs...`);
      result.steps.gasEstimation = await this.gasOptimizer.estimateDeploymentGas(
        result.steps.compilation,
        constructorArgs,
        network
      );

      // Step 4: Historical comparison
      if (this.config.get('historicalComparison').enabled) {
        console.log(`[${deploymentId}] Comparing with historical deployments...`);
        result.steps.historicalComparison = await this.gasOptimizer.compareGasCosts(
          contractName,
          network,
          result.steps.gasEstimation
        );
      }

      // Step 5: Deployment simulation
      if (this.config.get('simulationEnabled')) {
        console.log(`[${deploymentId}] Simulating deployment...`);
        result.steps.simulation = await this.deploymentSimulator.simulateDeployment(
          result.steps.compilation,
          constructorArgs,
          network,
          result.steps.gasEstimation
        );

        if (!result.steps.simulation.success) {
          result.status = 'failed';
          result.error = 'Deployment simulation failed';
          return result;
        }
      }

      // Step 6: L2 validation
      if (this.config.get('l2Support').enabled) {
        console.log(`[${deploymentId}] Validating L2 compatibility...`);
        result.steps.l2Validation = await this.deploymentSimulator.validateL2Deployment(
          result.steps.compilation,
          network
        );
      }

      result.status = 'validated';
      result.duration = Date.now() - startTime;
      
      // Store result
      this.deploymentResults.set(deploymentId, result);
      
      // Generate report
      await this._generateValidationReport(result);
      
      return result;

    } catch (error) {
      const result = {
        deploymentId,
        status: 'error',
        error: error.message,
        duration: Date.now() - startTime,
      };
      
      this.deploymentResults.set(deploymentId, result);
      return result;
    }
  }

  async _compileContract(contractPath, contractName) {
    const contractSource = fs.readFileSync(contractPath, 'utf8');
    
    const input = {
      language: 'Solidity',
      sources: {
        [contractName]: {
          content: contractSource,
        },
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['abi', 'evm.bytecode'],
          },
        },
      },
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    
    if (output.errors) {
      const errors = output.errors.filter(error => error.severity === 'error');
      if (errors.length > 0) {
        throw new Error(`Compilation failed: ${errors.map(e => e.message).join(', ')}`);
      }
    }

    const contract = output.contracts[contractName][contractName];
    return {
      abi: contract.abi,
      bytecode: contract.evm.bytecode.object,
      compilationWarnings: output.errors?.filter(error => error.severity === 'warning') || [],
    };
  }

  _validateInputs(contractPath, contractName, network) {
    if (!fs.existsSync(contractPath)) {
      throw new Error(`Contract file not found: ${contractPath}`);
    }

    if (!contractName) {
      throw new Error('Contract name is required');
    }

    if (!network) {
      throw new Error('Network is required');
    }

    const networkConfig = this.config.getNetworkConfig(network);
    if (!networkConfig.rpcUrl) {
      throw new Error(`RPC URL not configured for network: ${network}`);
    }
  }

  _generateDeploymentId() {
    return `deploy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async _generateValidationReport(result) {
    const outputDir = this.config.get('outputDir');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const reportPath = path.join(outputDir, `${result.deploymentId}_validation_report.json`);
    fs.writeFileSync(reportPath, JSON.stringify(result, null, 2));
    
    console.log(`Validation report saved: ${reportPath}`);
  }

  getDeploymentResult(deploymentId) {
    return this.deploymentResults.get(deploymentId);
  }

  getAllDeploymentResults() {
    return Array.from(this.deploymentResults.values());
  }
}

module.exports = { DeployGuardian };
