/**
 * GasRunner - Gas optimization performance testing tool
 * Analyzes and optimizes gas consumption for smart contracts and dApps
 */

const ethers = require('ethers');
const { BigNumber } = require('ethers');
const fs = require('fs');
const path = require('path');

class GasRunner {
  constructor(config = {}) {
    this.config = {
      rpcUrl: 'http://localhost:8545',
      privateKey: null,
      contractAddress: null,
      contractAbi: null,
      optimizationTarget: 'tx-throughput', // 'tx-throughput', 'deployment', 'function-call'
      iterations: 10,
      gasReportPath: path.join(process.cwd(), 'reports', 'gas-report.json'),
      baselinePath: null,
      ...config,
    };

    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.results = {
      optimizationTarget: this.config.optimizationTarget,
      timestamp: Date.now(),
      baseline: null,
      current: null,
      improvements: null,
      recommendations: [],
    };
  }

  /**
   * Initialize the gas runner with provider and contract
   */
  async initialize() {
    // Initialize provider and signer
    this.provider = new ethers.providers.JsonRpcProvider(this.config.rpcUrl);

    if (this.config.privateKey) {
      this.signer = new ethers.Wallet(this.config.privateKey, this.provider);
    } else {
      // Use the first account from the provider
      const accounts = await this.provider.listAccounts();
      this.signer = this.provider.getSigner(accounts[0]);
    }

    // Initialize contract if address and ABI are provided
    if (this.config.contractAddress && this.config.contractAbi) {
      this.contract = new ethers.Contract(
        this.config.contractAddress,
        this.config.contractAbi,
        this.signer
      );
    }

    // Load baseline if provided
    if (this.config.baselinePath && fs.existsSync(this.config.baselinePath)) {
      try {
        const baselineData = JSON.parse(fs.readFileSync(this.config.baselinePath, 'utf8'));
        this.results.baseline = baselineData.current || baselineData;
      } catch (error) {
        console.error('Error loading baseline:', error);
      }
    }

    return true;
  }

  /**
   * Run gas optimization tests based on the specified target
   */
  async run() {
    if (!this.provider) {
      await this.initialize();
    }

    console.log(`Running gas optimization for target: ${this.config.optimizationTarget}`);

    switch (this.config.optimizationTarget) {
      case 'tx-throughput':
        await this.optimizeForThroughput();
        break;
      case 'deployment':
        await this.optimizeForDeployment();
        break;
      case 'function-call':
        await this.optimizeForFunctionCalls();
        break;
      default:
        throw new Error(`Unknown optimization target: ${this.config.optimizationTarget}`);
    }

    // Compare with baseline if available
    if (this.results.baseline) {
      this.compareWithBaseline();
    }

    // Generate recommendations
    this.generateRecommendations();

    // Save report
    this.saveReport();

    return this.results;
  }

  /**
   * Optimize for transaction throughput
   */
  async optimizeForThroughput() {
    if (!this.contract) {
      throw new Error('Contract not initialized. Please provide contractAddress and contractAbi');
    }

    const results = {
      averageGasUsed: 0,
      totalGasUsed: 0,
      transactions: [],
      networkStats: {
        averageBlockTime: 0,
        gasPrice: {
          fast: 0,
          average: 0,
          slow: 0,
        },
        maxGasPerBlock: 0,
      },
    };

    // Get network stats
    results.networkStats.maxGasPerBlock = (
      await this.provider.getBlock('latest')
    ).gasLimit.toNumber();
    results.networkStats.gasPrice.fast = (await this.provider.getGasPrice())
      .mul(120)
      .div(100)
      .toString();
    results.networkStats.gasPrice.average = (await this.provider.getGasPrice()).toString();
    results.networkStats.gasPrice.slow = (await this.provider.getGasPrice())
      .mul(80)
      .div(100)
      .toString();

    // Calculate average block time from last 5 blocks
    const latestBlock = await this.provider.getBlockNumber();
    const blockTimes = [];
    for (let i = latestBlock - 5; i < latestBlock; i++) {
      const current = await this.provider.getBlock(i + 1);
      const previous = await this.provider.getBlock(i);
      blockTimes.push(current.timestamp - previous.timestamp);
    }
    results.networkStats.averageBlockTime =
      blockTimes.reduce((a, b) => a + b, 0) / blockTimes.length;

    // Get all function fragments that are non-view and non-pure
    const writeFunctions = this.contract.interface.fragments.filter(
      fragment =>
        fragment.type === 'function' &&
        !fragment.constant &&
        !fragment.stateMutability.includes('view') &&
        !fragment.stateMutability.includes('pure')
    );

    if (writeFunctions.length === 0) {
      throw new Error('No writable functions found in the contract');
    }

    // Test each function for gas usage
    for (const func of writeFunctions) {
      try {
        // Generate parameters for the function
        const params = this._generateFunctionParams(func);

        // Estimate gas for the function call
        const gasEstimate = await this.contract.estimateGas[func.name](...params);

        // Execute the function to measure actual gas used
        const tx = await this.contract.functions[func.name](...params, {
          gasLimit: gasEstimate.mul(120).div(100), // Add 20% buffer
        });
        const receipt = await tx.wait();

        results.transactions.push({
          functionName: func.name,
          gasEstimate: gasEstimate.toString(),
          actualGasUsed: receipt.gasUsed.toString(),
          transactionHash: receipt.transactionHash,
        });

        results.totalGasUsed += receipt.gasUsed.toNumber();
      } catch (error) {
        console.error(`Error testing function ${func.name}:`, error);
      }
    }

    // Calculate average gas used
    if (results.transactions.length > 0) {
      results.averageGasUsed = results.totalGasUsed / results.transactions.length;
    }

    // Compute maximum theoretical throughput
    const txPerBlock = Math.floor(results.networkStats.maxGasPerBlock / results.averageGasUsed);
    const txPerSecond = txPerBlock / results.networkStats.averageBlockTime;

    results.maxThroughput = {
      transactionsPerBlock: txPerBlock,
      transactionsPerSecond: txPerSecond.toFixed(2),
    };

    this.results.current = results;
    return results;
  }

  /**
   * Optimize for contract deployment
   */
  async optimizeForDeployment() {
    if (!this.config.contractBytecode) {
      throw new Error('Contract bytecode not provided. Please set contractBytecode in config');
    }

    const results = {
      deploymentGas: 0,
      byteCodeSize: 0,
      constructorParams: [],
      recommendations: [],
    };

    // Measure bytecode size
    results.byteCodeSize = (this.config.contractBytecode.length - 2) / 2; // Convert from hex string to byte count

    // Check if bytecode size is close to the limit
    if (results.byteCodeSize > 23000) {
      // 24576 is the limit
      results.recommendations.push({
        type: 'warning',
        message: 'Contract size is close to the maximum allowed size (24576 bytes)',
        sizeDelta: 24576 - results.byteCodeSize,
      });
    }

    // Generate constructor parameters if needed
    const constructorFragment = this.contract?.interface.deploy;
    const constructorParams = [];

    if (constructorFragment && constructorFragment.inputs.length > 0) {
      for (const input of constructorFragment.inputs) {
        constructorParams.push(this._generateParamValue(input));
      }
      results.constructorParams = constructorParams;
    }

    // Deploy contract to measure gas
    try {
      const factory = new ethers.ContractFactory(
        this.config.contractAbi,
        this.config.contractBytecode,
        this.signer
      );

      const deployTx = await factory.getDeployTransaction(...constructorParams);
      const gasEstimate = await this.provider.estimateGas(deployTx);

      // Execute deployment
      const tx = await this.signer.sendTransaction({
        ...deployTx,
        gasLimit: gasEstimate.mul(120).div(100), // Add 20% buffer
      });

      const receipt = await tx.wait();
      results.deploymentGas = receipt.gasUsed.toString();
      results.transactionHash = receipt.transactionHash;
    } catch (error) {
      console.error('Error deploying contract:', error);
      results.error = error.message;
    }

    this.results.current = results;
    return results;
  }

  /**
   * Optimize for specific function calls
   */
  async optimizeForFunctionCalls() {
    if (!this.contract) {
      throw new Error('Contract not initialized. Please provide contractAddress and contractAbi');
    }

    if (!this.config.targetFunctions || this.config.targetFunctions.length === 0) {
      throw new Error('No target functions specified for optimization');
    }

    const results = {
      functions: [],
      totalGasUsed: 0,
      averageGasUsed: 0,
    };

    // Test each specified function
    for (const funcName of this.config.targetFunctions) {
      try {
        const funcFragment = this.contract.interface.getFunction(funcName);
        if (!funcFragment) {
          throw new Error(`Function ${funcName} not found in the contract`);
        }

        const functionResults = {
          name: funcName,
          calls: [],
          averageGasUsed: 0,
          totalGasUsed: 0,
          minGasUsed: BigNumber.from(Number.MAX_SAFE_INTEGER),
          maxGasUsed: BigNumber.from(0),
        };

        // Run multiple iterations to get average gas usage
        for (let i = 0; i < this.config.iterations; i++) {
          // Generate parameters for the function
          const params = this._generateFunctionParams(funcFragment);

          // Estimate gas
          const gasEstimate = await this.contract.estimateGas[funcName](...params);

          // Execute the function
          const tx = await this.contract.functions[funcName](...params, {
            gasLimit: gasEstimate.mul(120).div(100), // Add 20% buffer
          });

          const receipt = await tx.wait();
          const gasUsed = BigNumber.from(receipt.gasUsed);

          functionResults.calls.push({
            iteration: i + 1,
            params: params.map(p => p.toString()),
            gasEstimate: gasEstimate.toString(),
            gasUsed: gasUsed.toString(),
            transactionHash: receipt.transactionHash,
          });

          functionResults.totalGasUsed = BigNumber.from(functionResults.totalGasUsed)
            .add(gasUsed)
            .toString();

          if (gasUsed.lt(functionResults.minGasUsed)) {
            functionResults.minGasUsed = gasUsed;
          }

          if (gasUsed.gt(functionResults.maxGasUsed)) {
            functionResults.maxGasUsed = gasUsed;
          }

          // Wait a bit between calls to avoid nonce issues
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Calculate average
        functionResults.averageGasUsed = BigNumber.from(functionResults.totalGasUsed)
          .div(functionResults.calls.length)
          .toString();

        functionResults.minGasUsed = functionResults.minGasUsed.toString();
        functionResults.maxGasUsed = functionResults.maxGasUsed.toString();

        results.functions.push(functionResults);
        results.totalGasUsed = BigNumber.from(results.totalGasUsed)
          .add(functionResults.totalGasUsed)
          .toString();
      } catch (error) {
        console.error(`Error testing function ${funcName}:`, error);
      }
    }

    // Calculate overall average
    if (results.functions.length > 0) {
      const totalCalls = results.functions.reduce((sum, func) => sum + func.calls.length, 0);
      results.averageGasUsed = BigNumber.from(results.totalGasUsed).div(totalCalls).toString();
    }

    this.results.current = results;
    return results;
  }

  /**
   * Compare current results with baseline
   */
  compareWithBaseline() {
    const current = this.results.current;
    const baseline = this.results.baseline;

    if (!current || !baseline || current.optimizationTarget !== baseline.optimizationTarget) {
      return;
    }

    const improvements = {
      percentage: 0,
      absoluteGasSaved: 0,
      details: {},
    };

    switch (this.config.optimizationTarget) {
      case 'tx-throughput':
        if (current.averageGasUsed && baseline.averageGasUsed) {
          improvements.percentage = (
            ((baseline.averageGasUsed - current.averageGasUsed) / baseline.averageGasUsed) *
            100
          ).toFixed(2);
          improvements.absoluteGasSaved = baseline.averageGasUsed - current.averageGasUsed;
        }
        break;

      case 'deployment':
        if (current.deploymentGas && baseline.deploymentGas) {
          const currentGas = BigNumber.from(current.deploymentGas);
          const baselineGas = BigNumber.from(baseline.deploymentGas);
          improvements.percentage = baselineGas
            .sub(currentGas)
            .mul(100)
            .div(baselineGas)
            .toString();
          improvements.absoluteGasSaved = baselineGas.sub(currentGas).toString();
        }
        break;

      case 'function-call':
        improvements.details.functions = [];

        // Compare each function if present in both results
        if (current.functions && baseline.functions) {
          for (const currentFunc of current.functions) {
            const baselineFunc = baseline.functions.find(f => f.name === currentFunc.name);

            if (baselineFunc) {
              const currentAvg = BigNumber.from(currentFunc.averageGasUsed);
              const baselineAvg = BigNumber.from(baselineFunc.averageGasUsed);

              if (!baselineAvg.isZero()) {
                const funcImprovement = {
                  name: currentFunc.name,
                  percentage: baselineAvg.sub(currentAvg).mul(100).div(baselineAvg).toString(),
                  absoluteGasSaved: baselineAvg.sub(currentAvg).toString(),
                };

                improvements.details.functions.push(funcImprovement);
              }
            }
          }
        }

        // Calculate overall improvement
        if (improvements.details.functions.length > 0) {
          const totalSaved = improvements.details.functions.reduce(
            (sum, func) => sum.add(BigNumber.from(func.absoluteGasSaved)),
            BigNumber.from(0)
          );

          improvements.absoluteGasSaved = totalSaved.toString();

          const totalBaseline = baseline.functions.reduce(
            (sum, func) => sum.add(BigNumber.from(func.totalGasUsed)),
            BigNumber.from(0)
          );

          if (!totalBaseline.isZero()) {
            improvements.percentage = totalSaved.mul(100).div(totalBaseline).toString();
          }
        }
        break;
    }

    this.results.improvements = improvements;
  }

  /**
   * Generate optimization recommendations based on results
   */
  generateRecommendations() {
    const recommendations = [];
    const current = this.results.current;

    if (!current) return [];

    switch (this.config.optimizationTarget) {
      case 'tx-throughput':
        // Check if any function uses more than 10% of block gas limit
        if (current.transactions) {
          for (const tx of current.transactions) {
            const gasUsed = BigNumber.from(tx.actualGasUsed);
            const blockLimit = BigNumber.from(current.networkStats.maxGasPerBlock);

            if (gasUsed.mul(100).div(blockLimit).gt(10)) {
              recommendations.push({
                type: 'high-gas',
                function: tx.functionName,
                gasUsed: tx.actualGasUsed,
                percentOfBlockLimit: gasUsed.mul(100).div(blockLimit).toString(),
                suggestion:
                  'Consider optimization or splitting this function into multiple transactions',
              });
            }
          }
        }

        // Throughput recommendations
        if (current.maxThroughput && current.maxThroughput.transactionsPerSecond < 10) {
          recommendations.push({
            type: 'low-throughput',
            currentThroughput: current.maxThroughput.transactionsPerSecond,
            suggestion:
              'Contract has low transaction throughput. Consider optimizing gas usage or upgrading to L2 solutions.',
          });
        }
        break;

      case 'deployment':
        // Check bytecode size
        if (current.byteCodeSize > 20000) {
          recommendations.push({
            type: 'large-contract',
            size: current.byteCodeSize,
            suggestion:
              'Contract size is approaching maximum limit. Consider splitting into multiple contracts.',
          });
        }

        // Check deployment gas
        if (current.deploymentGas && BigNumber.from(current.deploymentGas).gt(4000000)) {
          recommendations.push({
            type: 'high-deployment-cost',
            gas: current.deploymentGas,
            suggestion:
              'Deployment gas cost is high. Consider removing unused functions or optimizing constructor.',
          });
        }
        break;

      case 'function-call':
        // Identify high gas functions
        if (current.functions) {
          for (const func of current.functions) {
            const avgGas = BigNumber.from(func.averageGasUsed);

            if (avgGas.gt(100000)) {
              recommendations.push({
                type: 'expensive-function',
                function: func.name,
                gasUsed: func.averageGasUsed,
                suggestion:
                  'Function uses high gas. Review loops, storage operations, and complex calculations.',
              });
            }

            // Check gas variability
            const minGas = BigNumber.from(func.minGasUsed);
            const maxGas = BigNumber.from(func.maxGasUsed);

            if (
              maxGas.gt(0) &&
              !minGas.isZero() &&
              maxGas.sub(minGas).mul(100).div(minGas).gt(20)
            ) {
              recommendations.push({
                type: 'variable-gas',
                function: func.name,
                minGas: func.minGasUsed,
                maxGas: func.maxGasUsed,
                variation: maxGas.sub(minGas).mul(100).div(minGas).toString() + '%',
                suggestion:
                  'Function has high gas variability. Check for conditional paths or variable-sized data structures.',
              });
            }
          }
        }
        break;
    }

    this.results.recommendations = recommendations;
    return recommendations;
  }

  /**
   * Save the gas report to file
   */
  saveReport() {
    try {
      // Create directory if it doesn't exist
      const dir = path.dirname(this.config.gasReportPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(this.config.gasReportPath, JSON.stringify(this.results, null, 2), 'utf8');

      console.log(`Gas report saved to ${this.config.gasReportPath}`);
      return true;
    } catch (error) {
      console.error('Error saving gas report:', error);
      return false;
    }
  }

  /**
   * Generate test parameter values for function inputs
   */
  _generateFunctionParams(funcFragment) {
    return funcFragment.inputs.map(input => this._generateParamValue(input));
  }

  /**
   * Generate a parameter value based on its type
   */
  _generateParamValue(input) {
    const type = input.type;

    // Handle basic types
    if (type.startsWith('uint')) {
      return Math.floor(Math.random() * 1000);
    } else if (type.startsWith('int')) {
      return Math.floor(Math.random() * 1000) - 500;
    } else if (type === 'bool') {
      return Math.random() > 0.5;
    } else if (type === 'address') {
      return ethers.Wallet.createRandom().address;
    } else if (type === 'string') {
      return `Test${Math.floor(Math.random() * 1000)}`;
    } else if (type === 'bytes' || type.startsWith('bytes')) {
      return ethers.utils.randomBytes(32);
    }

    // Handle arrays
    if (type.includes('[]')) {
      const baseType = type.split('[]')[0];
      const length = Math.floor(Math.random() * 3) + 1; // 1-3 elements
      return Array(length)
        .fill(0)
        .map(() => this._generateParamValue({ type: baseType }));
    }

    // Default fallback
    return 0;
  }
}

module.exports = GasRunner;
