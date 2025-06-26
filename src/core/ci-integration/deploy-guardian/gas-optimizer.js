
/**
 * Gas Optimization and Estimation for Smart Contract Deployments
 */

const ethers = require('ethers');

class GasOptimizer {
  constructor(config, providers) {
    this.config = config;
    this.providers = providers;
  }

  async estimateDeploymentGas(compiledContract, constructorArgs, network) {
    const provider = this.providers[network];
    if (!provider) {
      throw new Error(`Provider not found for network: ${network}`);
    }

    try {
      const factory = new ethers.ContractFactory(
        compiledContract.abi,
        compiledContract.bytecode,
        provider
      );

      // Estimate gas for deployment
      const deploymentGas = await factory.getDeployTransaction(...constructorArgs).estimateGas();
      
      // Get current gas price
      const gasPrice = await this._getOptimalGasPrice(network);
      
      // Calculate costs
      const estimatedCost = deploymentGas.mul(gasPrice);

      return {
        gasLimit: deploymentGas,
        gasPrice,
        estimatedCost,
        network,
        timestamp: new Date().toISOString(),
        optimizations: await this._suggestOptimizations(compiledContract, deploymentGas),
      };
    } catch (error) {
      throw new Error(`Gas estimation failed: ${error.message}`);
    }
  }

  async _getOptimalGasPrice(network) {
    const provider = this.providers[network];
    const gasConfig = this.config.get('gasOptimization');

    if (gasConfig.targetGasPrice) {
      return ethers.utils.parseUnits(gasConfig.targetGasPrice.toString(), 'gwei');
    }

    // Auto-detect optimal gas price
    try {
      const feeData = await provider.getFeeData();
      
      if (feeData.maxFeePerGas && feeData.maxPriorityFeePerGas) {
        // EIP-1559 network
        return feeData.maxFeePerGas;
      } else {
        // Legacy network
        return feeData.gasPrice;
      }
    } catch (error) {
      // Fallback to a reasonable default
      return ethers.utils.parseUnits('20', 'gwei');
    }
  }

  async _suggestOptimizations(compiledContract, estimatedGas) {
    const suggestions = [];

    // Analyze bytecode size
    const bytecodeSize = compiledContract.bytecode.length / 2; // Convert hex to bytes
    if (bytecodeSize > 24576) { // Spurious Dragon limit
      suggestions.push({
        type: 'bytecode_size',
        severity: 'high',
        message: 'Contract bytecode exceeds 24KB limit',
        suggestion: 'Consider splitting into multiple contracts or using libraries',
      });
    }

    // Analyze gas usage
    if (estimatedGas.gt(ethers.utils.parseUnits('8000000', 'wei'))) {
      suggestions.push({
        type: 'high_gas',
        severity: 'medium',
        message: 'High deployment gas cost detected',
        suggestion: 'Review constructor logic and consider optimization',
      });
    }

    return suggestions;
  }

  async compareGasCosts(contractName, network, currentEstimate) {
    // Load historical gas data
    const historicalData = await this._loadHistoricalGasData(contractName, network);
    
    if (historicalData.length === 0) {
      return {
        comparison: 'no_history',
        message: 'No historical data available for comparison',
      };
    }

    const lastDeployment = historicalData[historicalData.length - 1];
    const gasChange = currentEstimate.gasLimit.sub(lastDeployment.gasLimit);
    const percentChange = gasChange.mul(100).div(lastDeployment.gasLimit);

    return {
      comparison: 'available',
      current: currentEstimate,
      previous: lastDeployment,
      change: {
        absolute: gasChange,
        percentage: percentChange,
      },
      trend: this._analyzeTrend(historicalData),
    };
  }

  async _loadHistoricalGasData(contractName, network) {
    // Implementation would load from deployment history
    return [];
  }

  _analyzeTrend(historicalData) {
    if (historicalData.length < 2) {
      return 'insufficient_data';
    }

    const recent = historicalData.slice(-3);
    const isIncreasing = recent.every((deployment, index) => {
      if (index === 0) return true;
      return deployment.gasLimit.gte(recent[index - 1].gasLimit);
    });

    const isDecreasing = recent.every((deployment, index) => {
      if (index === 0) return true;
      return deployment.gasLimit.lte(recent[index - 1].gasLimit);
    });

    if (isIncreasing) return 'increasing';
    if (isDecreasing) return 'decreasing';
    return 'stable';
  }
}

module.exports = { GasOptimizer };
