/**
 * Transaction Batching Optimizer
 *
 * Analyzes and optimizes transaction batching strategies to reduce gas costs
 * by grouping multiple operations into optimal batches.
 */

const { ethers } = require('ethers');

class BatchingOptimizer {
  constructor(config = {}) {
    this.config = {
      maxBatchSize: config.maxBatchSize || 20, // Maximum transactions in a single batch
      batchingStrategies: {
        cost: {
          name: 'cost',
          description: 'Prioritize minimizing total gas cost',
          weight: 0.7,
        },
        time: {
          name: 'time',
          description: 'Prioritize time-sensitive transactions',
          weight: 0.2,
        },
        balance: {
          name: 'balance',
          description: 'Balance cost savings and time sensitivity',
          weight: 0.5,
        },
      },
      gasOverheadPerTx: 21000, // Base gas cost per transaction
      batchBaseGas: 21000, // Base cost for a batch
      batchOverheadPerTx: 5000, // Additional overhead per tx in a batch
      callDataCostPerByte: 16, // Gas cost per byte of calldata
      timeMultiplier: 0.025, // 2.5% increase in priority for each minute of urgency
      defaultStrategy: 'balance',
      minBatchSize: 2, // Minimum transactions to consider batching
      ...config,
    };
  }

  /**
   * Optimize transaction batching
   * @param {Array} transactions - List of transactions to batch
   * @param {Object} options - Batching options
   * @returns {Promise<Object>} Optimized batching strategy
   */
  async optimizeBatching(transactions, options = {}) {
    const {
      strategy = this.config.defaultStrategy,
      maxBatchSize = this.config.maxBatchSize,
      gasPrice, // Optional current gas price in Gwei
      customWeights = {},
      forceBatch = false, // Force batching even if not cost-effective
      customTxScores = {}, // Custom scores for specific transactions (by index)
      timeHorizon = 10 * 60 * 1000, // 10 minutes default time horizon
      maxBatches = 10, // Maximum number of batches to create
    } = options;

    // Validate transactions array
    if (!Array.isArray(transactions) || transactions.length === 0) {
      throw new Error('Transactions array is required and cannot be empty');
    }

    // Filter invalid transactions
    const validTransactions = transactions.filter(tx => this.isValidTransaction(tx));

    if (validTransactions.length === 0) {
      throw new Error('No valid transactions provided');
    }

    // Calculate gas estimates for each transaction
    const transactionsWithGas = await this.calculateGasEstimates(validTransactions);

    // If only one transaction, no batching needed
    if (transactionsWithGas.length === 1 && !forceBatch) {
      return {
        batched: false,
        batches: [transactionsWithGas],
        savings: {
          gas: 0,
          percentage: 0,
        },
        reason: 'Only one valid transaction provided',
      };
    }

    // If fewer than minBatchSize, check if batching is worthwhile
    if (transactionsWithGas.length < this.config.minBatchSize && !forceBatch) {
      const worthwhile = this.isBatchingWorthwhile(transactionsWithGas);
      if (!worthwhile.isBatchable) {
        return {
          batched: false,
          batches: transactionsWithGas.map(tx => [tx]),
          savings: {
            gas: 0,
            percentage: 0,
          },
          reason: worthwhile.reason,
        };
      }
    }

    // Score each transaction based on the selected strategy
    const scoredTransactions = this.scoreTransactions(
      transactionsWithGas,
      strategy,
      customWeights,
      customTxScores,
      timeHorizon
    );

    // Group transactions into batches
    const batchingResult = this.createOptimalBatches(
      scoredTransactions,
      maxBatchSize,
      maxBatches,
      gasPrice
    );

    // Calculate gas savings from batching
    const savings = this.calculateBatchingSavings(batchingResult.batches, batchingResult.unbatched);

    return {
      batched: batchingResult.batches.length > 0,
      batches: batchingResult.batches,
      unbatched: batchingResult.unbatched,
      savings,
      strategy,
      timeHorizon,
      transactionCount: transactionsWithGas.length,
      batchedCount: batchingResult.batches.reduce((count, batch) => count + batch.length, 0),
      batchCount: batchingResult.batches.length,
    };
  }

  /**
   * Check if a transaction object is valid
   * @param {Object} transaction - Transaction object
   * @returns {boolean} Whether the transaction is valid
   */
  isValidTransaction(transaction) {
    // Must have at least a to address and data or value
    return (
      transaction && (transaction.to || transaction.data) && (transaction.data || transaction.value)
    );
  }

  /**
   * Calculate gas estimates for each transaction
   * @param {Array} transactions - Array of transaction objects
   * @returns {Promise<Array>} Transactions with gas estimates
   */
  async calculateGasEstimates(transactions) {
    return transactions.map((tx, index) => {
      // Start with base gas cost
      let gasEstimate = this.config.gasOverheadPerTx;

      // Add cost for calldata (if present)
      if (tx.data) {
        const dataLength = ethers.utils.arrayify(tx.data).length;
        const dataGas = dataLength * this.config.callDataCostPerByte;
        gasEstimate += dataGas;
      }

      // If transaction already has a gas estimate, use that instead
      if (tx.gasLimit || tx.gas) {
        gasEstimate = parseInt(tx.gasLimit || tx.gas);
      }

      // Add timing information if not present
      const timing = tx.timing || {
        priority: 'medium',
        deadline: Date.now() + 10 * 60 * 1000, // Default 10 minutes
      };

      // Add other metadata
      return {
        ...tx,
        gasEstimate,
        timing,
        index,
        originalIndex: index, // Keep track of original position
      };
    });
  }

  /**
   * Check if batching is worthwhile for a small number of transactions
   * @param {Array} transactions - Transactions with gas estimates
   * @returns {Object} Whether batching is worthwhile and reason
   */
  isBatchingWorthwhile(transactions) {
    // Calculate total gas for individual transactions
    const individualGas = transactions.reduce((sum, tx) => sum + tx.gasEstimate, 0);

    // Calculate estimated batch gas
    const batchGas = this.estimateBatchGas(transactions);

    // Calculate potential savings
    const savings = individualGas - batchGas;
    const savingsPercentage = (savings / individualGas) * 100;

    // Check if there are meaningful savings (at least 10%)
    if (savingsPercentage < 10) {
      return {
        isBatchable: false,
        reason: `Insufficient gas savings (${savingsPercentage.toFixed(2)}%) for batching`,
        savings: {
          gas: savings,
          percentage: savingsPercentage,
        },
      };
    }

    // Check for high-priority transactions that shouldn't be batched
    const highPriorityTx = transactions.filter(tx => tx.timing && tx.timing.priority === 'high');

    if (highPriorityTx.length > 0 && highPriorityTx.length < transactions.length) {
      return {
        isBatchable: false,
        reason: 'Mix of high-priority and regular transactions',
        highPriorityCount: highPriorityTx.length,
      };
    }

    return {
      isBatchable: true,
      reason: `Potential gas savings of ${savingsPercentage.toFixed(2)}%`,
      savings: {
        gas: savings,
        percentage: savingsPercentage,
      },
    };
  }

  /**
   * Score transactions based on strategy for optimization
   * @param {Array} transactions - Transactions with gas estimates
   * @param {string} strategy - Batching strategy
   * @param {Object} customWeights - Custom weights for scoring
   * @param {Object} customTxScores - Custom scores for specific transactions
   * @param {number} timeHorizon - Time horizon for urgency calculation
   * @returns {Array} Transactions with score
   */
  scoreTransactions(transactions, strategy, customWeights, customTxScores, timeHorizon) {
    const strategyConfig =
      this.config.batchingStrategies[strategy] || this.config.batchingStrategies.balance;

    // Merge custom weights with default ones
    const weights = {
      gasWeight: 1.0,
      timeWeight: strategyConfig.weight,
      sizeWeight: 0.5,
      ...customWeights,
    };

    const now = Date.now();

    return transactions.map(tx => {
      // Start with base score from gas cost (higher gas = higher score for batching)
      const gasScore = tx.gasEstimate / 100000; // Normalize gas score

      // Calculate time score based on deadline
      let timeScore = 0;
      if (tx.timing && tx.timing.deadline) {
        // Calculate urgency as percentage of time horizon
        const timeRemaining = tx.timing.deadline - now;
        const urgency = 1 - Math.max(0, Math.min(1, timeRemaining / timeHorizon));
        timeScore = urgency * 10; // Scale to 0-10
      }

      // Adjust time score based on priority
      if (tx.timing && tx.timing.priority) {
        const priorityMultipliers = {
          low: 0.5,
          medium: 1.0,
          high: 2.0,
          urgent: 4.0,
        };
        const priorityMultiplier = priorityMultipliers[tx.timing.priority] || 1.0;
        timeScore *= priorityMultiplier;
      }

      // Size score based on calldata size (larger tx = higher score for batching)
      let sizeScore = 0;
      if (tx.data) {
        const dataLength = ethers.utils.arrayify(tx.data).length;
        sizeScore = Math.min(5, dataLength / 100); // Normalize size score, max 5
      }

      // Calculate combined score
      let score =
        gasScore * weights.gasWeight +
        timeScore * weights.timeWeight -
        sizeScore * weights.sizeWeight;

      // Apply custom score if provided
      if (customTxScores[tx.originalIndex] !== undefined) {
        score = customTxScores[tx.originalIndex];
      }

      return {
        ...tx,
        score,
        scoreComponents: {
          gasScore,
          timeScore,
          sizeScore,
        },
      };
    });
  }

  /**
   * Create optimal batches based on transaction scores
   * @param {Array} scoredTransactions - Transactions with scores
   * @param {number} maxBatchSize - Maximum transactions per batch
   * @param {number} maxBatches - Maximum number of batches
   * @param {number} gasPrice - Current gas price
   * @returns {Object} Batched and unbatched transactions
   */
  createOptimalBatches(scoredTransactions, maxBatchSize, maxBatches, gasPrice) {
    // Sort transactions by score (higher score = better batching candidate)
    const sortedTransactions = [...scoredTransactions].sort((a, b) => b.score - a.score);

    const batches = [];
    const unbatched = [];

    // Greedy algorithm - create batches with highest scoring transactions first
    let currentBatch = [];
    let currentBatchGas = this.config.batchBaseGas;

    for (const tx of sortedTransactions) {
      // If current transaction would exceed batch gas limit, or max batch size
      if (currentBatch.length >= maxBatchSize || batches.length >= maxBatches) {
        // Start a new batch if we haven't reached max batches
        if (batches.length < maxBatches) {
          batches.push(currentBatch);
          currentBatch = [tx];
          currentBatchGas =
            this.config.batchBaseGas + tx.gasEstimate + this.config.batchOverheadPerTx;
        } else {
          // We've reached max batches, add to unbatched
          unbatched.push(tx);
        }
      } else {
        // Add to current batch if time-compatible with existing transactions
        const isTimeCompatible = this.areTimeCompatible(currentBatch, tx);

        if (isTimeCompatible) {
          currentBatch.push(tx);
          currentBatchGas += tx.gasEstimate + this.config.batchOverheadPerTx;
        } else {
          // Not time-compatible, check if we should start a new batch
          if (batches.length < maxBatches) {
            if (currentBatch.length > 0) {
              batches.push(currentBatch);
            }
            currentBatch = [tx];
            currentBatchGas =
              this.config.batchBaseGas + tx.gasEstimate + this.config.batchOverheadPerTx;
          } else {
            // We've reached max batches, add to unbatched
            unbatched.push(tx);
          }
        }
      }
    }

    // Add the last batch if not empty and we haven't reached max batches
    if (currentBatch.length > 0 && batches.length < maxBatches) {
      batches.push(currentBatch);
    }

    // Final check - ensure each batch is actually worth batching
    const optimizedBatches = batches.filter(
      batch =>
        batch.length >= this.config.minBatchSize || this.isBatchingWorthwhile(batch).isBatchable
    );

    // Move transactions from rejected batches to unbatched
    const rejectedBatches = batches.filter(batch => !optimizedBatches.includes(batch));
    for (const batch of rejectedBatches) {
      unbatched.push(...batch);
    }

    return {
      batches: optimizedBatches,
      unbatched,
    };
  }

  /**
   * Check if a transaction is time-compatible with a batch
   * @param {Array} batch - Existing batch of transactions
   * @param {Object} transaction - Transaction to check
   * @returns {boolean} Whether transaction is time-compatible
   */
  areTimeCompatible(batch, transaction) {
    if (batch.length === 0) return true;

    // If any transaction in the batch is high or urgent priority, check compatibility
    const highPriorityInBatch = batch.some(
      tx => tx.timing && (tx.timing.priority === 'high' || tx.timing.priority === 'urgent')
    );

    const isHighPriority =
      transaction.timing &&
      (transaction.timing.priority === 'high' || transaction.timing.priority === 'urgent');

    // If mixing high and non-high priority, they're not compatible
    if (highPriorityInBatch !== isHighPriority) {
      return false;
    }

    // If all high priority, they're compatible
    if (highPriorityInBatch && isHighPriority) {
      return true;
    }

    // For medium/low priority, check deadlines
    const batchEarliestDeadline = Math.min(...batch.map(tx => tx.timing?.deadline || Infinity));
    const txDeadline = transaction.timing?.deadline || Infinity;

    // If deadlines are more than 2 minutes apart, not compatible
    return Math.abs(batchEarliestDeadline - txDeadline) <= 2 * 60 * 1000;
  }

  /**
   * Estimate gas for a batch of transactions
   * @param {Array} batch - Batch of transactions
   * @returns {number} Estimated gas for the batch
   */
  estimateBatchGas(batch) {
    if (batch.length === 0) return 0;

    // Base gas for the batch
    let batchGas = this.config.batchBaseGas;

    // Add gas for each transaction plus overhead
    for (const tx of batch) {
      batchGas += tx.gasEstimate + this.config.batchOverheadPerTx;
    }

    return batchGas;
  }

  /**
   * Calculate gas savings from batching
   * @param {Array} batches - Batched transactions
   * @param {Array} unbatched - Unbatched transactions
   * @returns {Object} Gas savings details
   */
  calculateBatchingSavings(batches, unbatched) {
    // Calculate gas for individual transactions
    const allTx = [...unbatched];
    for (const batch of batches) {
      allTx.push(...batch);
    }

    const individualGas = allTx.reduce(
      (sum, tx) => sum + this.config.gasOverheadPerTx + tx.gasEstimate,
      0
    );

    // Calculate gas for batched transactions
    let batchedGas = 0;
    for (const batch of batches) {
      batchedGas += this.estimateBatchGas(batch);
    }

    // Add gas for unbatched transactions
    for (const tx of unbatched) {
      batchedGas += this.config.gasOverheadPerTx + tx.gasEstimate;
    }

    // Calculate savings
    const savedGas = individualGas - batchedGas;
    const savedPercentage = individualGas > 0 ? (savedGas / individualGas) * 100 : 0;

    return {
      individualGas,
      batchedGas,
      savedGas,
      savedPercentage,
      batches: batches.map(batch => ({
        size: batch.length,
        estimatedGas: this.estimateBatchGas(batch),
        individualGas: batch.reduce(
          (sum, tx) => sum + this.config.gasOverheadPerTx + tx.gasEstimate,
          0
        ),
        savings:
          batch.reduce((sum, tx) => sum + this.config.gasOverheadPerTx + tx.gasEstimate, 0) -
          this.estimateBatchGas(batch),
      })),
    };
  }

  /**
   * Create batch execution plan with proper ordering
   * @param {Object} batchingResult - Result of batching optimization
   * @returns {Object} Batch execution plan
   */
  createExecutionPlan(batchingResult) {
    const { batches, unbatched } = batchingResult;

    // Order batches by priority/deadline
    const orderedBatches = [...batches].sort((a, b) => {
      // Get highest priority in each batch
      const aPriority = Math.max(
        ...a.map(tx => {
          const priorities = { low: 1, medium: 2, high: 3, urgent: 4 };
          return priorities[tx.timing?.priority || 'medium'];
        })
      );

      const bPriority = Math.max(
        ...b.map(tx => {
          const priorities = { low: 1, medium: 2, high: 3, urgent: 4 };
          return priorities[tx.timing?.priority || 'medium'];
        })
      );

      // Sort by priority first
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }

      // Then by earliest deadline
      const aDeadline = Math.min(...a.map(tx => tx.timing?.deadline || Infinity));
      const bDeadline = Math.min(...b.map(tx => tx.timing?.deadline || Infinity));

      return aDeadline - bDeadline;
    });

    // Order unbatched transactions
    const orderedUnbatched = [...unbatched].sort((a, b) => {
      // Sort by priority first
      const priorities = { low: 1, medium: 2, high: 3, urgent: 4 };
      const aPriority = priorities[a.timing?.priority || 'medium'];
      const bPriority = priorities[b.timing?.priority || 'medium'];

      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }

      // Then by deadline
      const aDeadline = a.timing?.deadline || Infinity;
      const bDeadline = b.timing?.deadline || Infinity;

      return aDeadline - bDeadline;
    });

    // Create execution sequence
    const executionSequence = [];

    // Interleave high priority unbatched transactions with batches
    const highPriorityUnbatched = orderedUnbatched.filter(
      tx => tx.timing?.priority === 'high' || tx.timing?.priority === 'urgent'
    );

    const regularUnbatched = orderedUnbatched.filter(
      tx => tx.timing?.priority !== 'high' && tx.timing?.priority !== 'urgent'
    );

    // Add high priority unbatched first
    executionSequence.push(
      ...highPriorityUnbatched.map(tx => ({ type: 'transaction', transaction: tx }))
    );

    // Then add batches
    executionSequence.push(
      ...orderedBatches.map(batch => ({ type: 'batch', transactions: batch }))
    );

    // Then add regular unbatched
    executionSequence.push(
      ...regularUnbatched.map(tx => ({ type: 'transaction', transaction: tx }))
    );

    return {
      executionSequence,
      statistics: {
        totalBatches: orderedBatches.length,
        totalUnbatched: orderedUnbatched.length,
        highPriorityUnbatched: highPriorityUnbatched.length,
        totalTransactions:
          orderedBatches.reduce((sum, batch) => sum + batch.length, 0) + orderedUnbatched.length,
      },
    };
  }
}

module.exports = BatchingOptimizer;
