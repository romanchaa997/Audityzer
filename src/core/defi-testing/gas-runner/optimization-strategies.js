/**
 * Gas Optimization Strategies
 *
 * Collection of gas optimization strategies for smart contracts and transactions.
 */

const fs = require('fs');

/**
 * Analyze storage layout for optimization opportunities
 * @param {string} contractPath - Path to contract file
 * @returns {Object} Analysis results
 */
function analyzeStorageLayout(contractPath) {
  const content = fs.readFileSync(contractPath, 'utf8');

  const results = {
    findings: [],
    recommendations: [],
    estimatedSavings: 0,
  };

  // Check for structs that can be packed
  const structMatches = content.match(/struct\s+\w+\s*{[^}]+}/gs) || [];

  for (const structDef of structMatches) {
    results.findings.push({
      type: 'storage_packing',
      severity: 'medium',
      description: 'Struct may be optimized for better packing',
      location: structDef.substring(0, 50) + '...',
    });

    results.recommendations.push({
      type: 'storage_packing',
      description:
        'Consider reordering struct fields to minimize storage slots (largest types first)',
      suggestion: 'Reorder from largest to smallest: uint256, address, uint128, etc.',
      estimatedSavings: 20000,
    });

    results.estimatedSavings += 20000;
  }

  return results;
}

/**
 * Analyze gas-inefficient loops
 * @param {string} contractPath - Path to contract file
 * @returns {Object} Analysis results
 */
function analyzeLoops(contractPath) {
  const content = fs.readFileSync(contractPath, 'utf8');

  const results = {
    findings: [],
    recommendations: [],
    estimatedSavings: 0,
  };

  // Find loops
  const forLoops = content.match(/for\s*\([^)]+\)\s*{/g) || [];

  for (const loop of forLoops) {
    if (loop.includes('.length')) {
      results.findings.push({
        type: 'loop_optimization',
        severity: 'medium',
        description: 'Storage read in loop condition',
        location: loop,
      });

      results.recommendations.push({
        type: 'loop_optimization',
        description: 'Cache array length outside the loop to avoid repeated storage reads',
        suggestion: 'uint256 length = array.length;\nfor (uint i = 0; i < length; i++) {...',
        estimatedSavings: 5000,
      });

      results.estimatedSavings += 5000;
    }
  }

  return results;
}

/**
 * Analyze function visibility for gas optimization
 * @param {string} contractPath - Path to contract file
 * @returns {Object} Analysis results
 */
function analyzeVisibility(contractPath) {
  const content = fs.readFileSync(contractPath, 'utf8');

  const results = {
    findings: [],
    recommendations: [],
    estimatedSavings: 0,
  };

  // Find public functions that could be external
  const publicFunctions =
    content.match(/function\s+\w+\s*\([^)]*\)\s+public(?!\s+view|\s+pure)/g) || [];

  for (const func of publicFunctions) {
    const funcName = func.match(/function\s+(\w+)/)[1];

    // Check if the function is called internally
    const internalCalls =
      content.match(new RegExp(`this\\.${funcName}\\s*\\(`)) ||
      content.match(new RegExp(`${funcName}\\s*\\(`));

    if (!internalCalls) {
      results.findings.push({
        type: 'visibility_optimization',
        severity: 'low',
        description: `Function ${funcName} could use external instead of public`,
        location: func,
      });

      results.recommendations.push({
        type: 'visibility_optimization',
        description: `Change ${funcName} from public to external to save gas`,
        suggestion: func.replace('public', 'external'),
        estimatedSavings: 300,
      });

      results.estimatedSavings += 300;
    }
  }

  return results;
}

/**
 * Optimize batching for multiple transactions
 * @param {Array} transactions - Array of transaction objects
 * @returns {Object} Batching optimization results
 */
function optimizeBatching(transactions) {
  const results = {
    batches: [],
    estimatedSavings: 0,
    recommendations: [],
  };

  if (!transactions || transactions.length <= 1) {
    return {
      batches: [transactions || []],
      estimatedSavings: 0,
      recommendations: ['No batching optimization possible with 0-1 transactions'],
    };
  }

  // Simple batching by recipient
  const batchesByRecipient = {};

  for (const tx of transactions) {
    const recipient = tx.to;
    if (!batchesByRecipient[recipient]) {
      batchesByRecipient[recipient] = [];
    }
    batchesByRecipient[recipient].push(tx);
  }

  const batches = Object.values(batchesByRecipient);

  // Calculate savings
  const baseTxCost = 21000; // Base gas cost per tx
  const unbatchedCost = transactions.length * baseTxCost;
  const batchedCost = batches.length * baseTxCost;
  const savings = unbatchedCost - batchedCost;

  results.batches = batches;
  results.estimatedSavings = savings;
  results.recommendations.push(
    `Batch ${transactions.length} transactions into ${batches.length} batches to save ~${savings} gas`
  );

  return results;
}

/**
 * Analyze contract bytecode size optimization
 * @param {string} contractPath - Path to contract file
 * @returns {Object} Analysis results
 */
function analyzeCodeSize(contractPath) {
  const content = fs.readFileSync(contractPath, 'utf8');

  const results = {
    findings: [],
    recommendations: [],
    estimatedSavings: 0,
  };

  // Check for large functions
  const functions = content.match(/function[^{]+{[^}]*}/gs) || [];

  for (const func of functions) {
    if (func.length > 500) {
      const funcNameMatch = func.match(/function\s+(\w+)/);
      const funcName = funcNameMatch ? funcNameMatch[1] : 'unknown';

      results.findings.push({
        type: 'code_size',
        severity: 'medium',
        description: `Large function ${funcName} may cause contract size issues`,
        location: func.substring(0, 50) + '...',
      });

      results.recommendations.push({
        type: 'code_size',
        description: `Split function ${funcName} into smaller helper functions`,
        suggestion: 'Extract logical parts into separate internal functions',
        estimatedSavings: 0, // Not gas savings but prevents deployment failures
      });
    }
  }

  return results;
}

module.exports = {
  analyzeStorageLayout,
  analyzeLoops,
  analyzeVisibility,
  optimizeBatching,
  analyzeCodeSize,
};
