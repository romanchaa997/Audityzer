/**
 * Debug Logger for Web3FuzzForge
 *
 * This utility provides detailed logging and visualization for test failures,
 * cross-chain message flows, and transaction traces.
 *
 * Features:
 * - Multiple debug levels (none, basic, verbose, trace)
 * - Detailed failure logging with stack traces
 * - Cross-chain message flow visualization
 * - Transaction trace capture
 * - Test step tracking
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Debug levels
const DEBUG_LEVELS = {
  NONE: 0, // No debugging
  BASIC: 1, // Basic information
  VERBOSE: 2, // Detailed information
  TRACE: 3, // Full trace information
};

class DebugLogger {
  constructor(options = {}) {
    this.enabled = options.enabled !== false;
    this.level = options.level || DEBUG_LEVELS.BASIC;
    this.outputToConsole = options.outputToConsole !== false;
    this.outputToFile = options.outputToFile || false;
    this.outputPath = options.outputPath || './test-output/debug-logs';
    this.sessionId = options.sessionId || Date.now().toString();
    this.fileName = options.fileName || `debug-${this.sessionId}.log`;
    this.testSteps = [];
    this.failures = [];
    this.transactions = [];
    this.crossChainMessages = [];

    // Create output directory if it doesn't exist
    if (this.outputToFile) {
      try {
        if (!fs.existsSync(this.outputPath)) {
          fs.mkdirSync(this.outputPath, { recursive: true });
        }
      } catch (err) {
        console.error('Failed to create debug log directory:', err);
      }
    }

    this.log('Debug logger initialized', { level: this.level }, 'system');
  }

  // Log a message at the specified level
  log(message, data = {}, category = 'info') {
    if (!this.enabled) return;

    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      category,
      message,
      data,
    };

    // Only log if the current debug level is sufficient
    const messageLevel = data.level || DEBUG_LEVELS.BASIC;
    if (messageLevel <= this.level) {
      if (this.outputToConsole) {
        this._logToConsole(logEntry);
      }

      if (this.outputToFile) {
        this._logToFile(logEntry);
      }
    }

    return logEntry;
  }

  // Log specifically for test steps
  logStep(stepName, stepData = {}, status = 'start') {
    const step = {
      stepName,
      status,
      timestamp: Date.now(),
      data: stepData,
    };

    this.testSteps.push(step);

    const message = `${status === 'start' ? 'Starting' : status === 'complete' ? 'Completed' : 'Failed'} step: ${stepName}`;
    const category = status === 'failed' ? 'error' : 'step';

    this.log(message, { level: DEBUG_LEVELS.BASIC, step }, category);

    return step;
  }

  // Log a test failure with detailed information
  logFailure(failureName, error, details = {}) {
    const failure = {
      name: failureName,
      timestamp: Date.now(),
      error:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
              stack: error.stack,
            }
          : error,
      details,
    };

    this.failures.push(failure);

    this.log(
      `Test failure: ${failureName}`,
      {
        level: DEBUG_LEVELS.BASIC,
        error: failure.error,
        details,
      },
      'failure'
    );

    return failure;
  }

  // Log a transaction with full details
  logTransaction(tx, metadata = {}) {
    const transaction = {
      ...tx,
      metadata,
      logTimestamp: Date.now(),
    };

    this.transactions.push(transaction);

    this.log(
      `Transaction: ${metadata.type || 'unknown'} - ${tx.hash || 'no hash'}`,
      {
        level: DEBUG_LEVELS.VERBOSE,
        transaction,
      },
      'transaction'
    );

    return transaction;
  }

  // Log cross-chain message for visualization
  logCrossChainMessage(message) {
    const crossChainMessage = {
      ...message,
      logTimestamp: Date.now(),
    };

    this.crossChainMessages.push(crossChainMessage);

    const sourceName = message.sourceChain?.name || message.sourceChain?.id || 'unknown';
    const destName = message.destinationChain?.name || message.destinationChain?.id || 'unknown';

    this.log(
      `Cross-chain message: ${sourceName} -> ${destName}`,
      {
        level: DEBUG_LEVELS.VERBOSE,
        message: crossChainMessage,
      },
      'cross-chain'
    );

    return crossChainMessage;
  }

  // Generate a visualization of cross-chain messages
  visualizeCrossChainFlow() {
    if (this.crossChainMessages.length === 0) {
      return 'No cross-chain messages to visualize';
    }

    // Sort messages by timestamp
    const sortedMessages = [...this.crossChainMessages].sort((a, b) => a.timestamp - b.timestamp);

    // Get unique chains
    const chains = new Set();
    sortedMessages.forEach(msg => {
      if (msg.sourceChain?.id) chains.add(msg.sourceChain.id);
      if (msg.destinationChain?.id) chains.add(msg.destinationChain.id);
    });

    // Create a simple ASCII visualization
    let visualization = 'Cross-Chain Message Flow:\n\n';

    // Create a timeline for each chain
    const chainsArray = Array.from(chains);

    // Header
    visualization += 'Time      | ' + chainsArray.map(chain => chain.padEnd(10)).join(' | ') + '\n';
    visualization += '----------|' + chainsArray.map(() => '----------').join('-|-') + '\n';

    // Add messages to the visualization
    sortedMessages.forEach(msg => {
      const time = new Date(msg.timestamp).toISOString().substr(11, 8);
      const sourceIndex = chainsArray.indexOf(msg.sourceChain?.id);
      const destIndex = chainsArray.indexOf(msg.destinationChain?.id);

      if (sourceIndex >= 0 && destIndex >= 0) {
        const line = Array(chainsArray.length).fill('          ');
        line[sourceIndex] = '  OUT >   ';
        line[destIndex] = '  < IN    ';

        visualization += `${time} | ${line.join(' | ')}\n`;
      }
    });

    return visualization;
  }

  // Generate a summary report of all debug information
  generateReport() {
    const report = {
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      testSteps: this.testSteps,
      failures: this.failures,
      transactions: this.transactions,
      crossChainMessages: this.crossChainMessages,
      summary: {
        totalSteps: this.testSteps.length,
        completedSteps: this.testSteps.filter(step => step.status === 'complete').length,
        failedSteps: this.testSteps.filter(step => step.status === 'failed').length,
        totalFailures: this.failures.length,
        totalTransactions: this.transactions.length,
        totalCrossChainMessages: this.crossChainMessages.length,
      },
    };

    if (this.outputToFile) {
      try {
        const reportPath = path.join(this.outputPath, `report-${this.sessionId}.json`);
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

        if (this.crossChainMessages.length > 0) {
          const visualizationPath = path.join(this.outputPath, `flow-${this.sessionId}.txt`);
          fs.writeFileSync(visualizationPath, this.visualizeCrossChainFlow());
        }
      } catch (err) {
        console.error('Failed to write debug report:', err);
      }
    }

    return report;
  }

  // Reset the logger
  reset() {
    this.testSteps = [];
    this.failures = [];
    this.transactions = [];
    this.crossChainMessages = [];
    this.log('Debug logger reset', {}, 'system');
  }

  // Private method to log to the console
  _logToConsole(logEntry) {
    const { timestamp, category, message, data } = logEntry;

    let colorFn = chalk.white;
    switch (category) {
      case 'error':
      case 'failure':
        colorFn = chalk.red;
        break;
      case 'warning':
        colorFn = chalk.yellow;
        break;
      case 'success':
        colorFn = chalk.green;
        break;
      case 'transaction':
        colorFn = chalk.blue;
        break;
      case 'cross-chain':
        colorFn = chalk.magenta;
        break;
      case 'step':
        colorFn = chalk.cyan;
        break;
      case 'system':
        colorFn = chalk.gray;
        break;
    }

    console.log(colorFn(`[${timestamp}] [${category.toUpperCase()}] ${message}`));

    // Log additional data if this is a verbose or trace log
    if (data.level >= DEBUG_LEVELS.VERBOSE && Object.keys(data).length > 1) {
      const dataToPrint = { ...data };
      delete dataToPrint.level;
      console.log(chalk.gray(JSON.stringify(dataToPrint, null, 2)));
    }
  }

  // Private method to log to a file
  _logToFile(logEntry) {
    try {
      const logPath = path.join(this.outputPath, this.fileName);
      fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
    } catch (err) {
      console.error('Failed to write to debug log file:', err);
    }
  }
}

// Export the debug logger and levels
module.exports = {
  DebugLogger,
  DEBUG_LEVELS,
};
