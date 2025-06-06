/**
 * MemPool Monitor - Real-time transaction pool monitoring and analysis
 * Monitors mempool for front-running detection and MEV simulation
 */

const ethers = require('ethers');
const fs = require('fs');
const path = require('path');
const events = require('events');

class MemPoolMonitor extends events.EventEmitter {
  constructor(config = {}) {
    super();

    this.config = {
      networks: {},
      monitoringEnabled: true,
      saveTransactions: true,
      dataDir: path.join(process.cwd(), 'data', 'mempool'),
      maxTransactionsPerFile: 10000,
      alertThresholds: {
        highGasPrice: 150, // in gwei
        highValue: 10, // in ETH
        suspiciousContracts: [],
        watchedAddresses: [],
      },
      frontRunningDetection: {
        enabled: true,
        timeWindow: 10, // in seconds
        gasIncreaseFactor: 1.5,
        valueThreshold: 1, // in ETH
      },
      mevDetection: {
        enabled: true,
        analyzers: ['sandwich', 'arbitrage', 'liquidation'],
      },
      ...config,
    };

    this.providers = {};
    this.isMonitoring = false;
    this.pendingTransactions = {};
    this.confirmedTransactions = {};
    this.frontRunningCandidates = {};
    this.mevCandidates = {};
    this.currentFile = null;
    this.transactionCount = 0;
    this.startTime = null;
  }

  /**
   * Initialize the MemPool Monitor
   */
  async initialize() {
    // Initialize providers for each network
    for (const [networkName, networkConfig] of Object.entries(this.config.networks)) {
      try {
        const provider = new ethers.providers.JsonRpcProvider(networkConfig.rpcUrl);
        this.providers[networkName] = provider;
        console.log(`Connected to ${networkName} at ${networkConfig.rpcUrl}`);

        // Add websocket listener for pending transactions if supported
        if (networkConfig.rpcUrl.startsWith('ws')) {
          provider.on('pending', txHash => this._handlePendingTransaction(networkName, txHash));
        }
      } catch (error) {
        console.error(`Failed to connect to ${networkName}:`, error);
      }
    }

    // Create data directory if it doesn't exist
    if (this.config.saveTransactions && !fs.existsSync(this.config.dataDir)) {
      fs.mkdirSync(this.config.dataDir, { recursive: true });
    }

    // Initialize current file
    if (this.config.saveTransactions) {
      this.currentFile = path.join(this.config.dataDir, `mempool_${Date.now()}.json`);

      fs.writeFileSync(
        this.currentFile,
        JSON.stringify(
          {
            startTime: new Date().toISOString(),
            transactions: [],
          },
          null,
          2
        )
      );
    }

    return {
      networks: Object.keys(this.providers),
      monitoring: this.isMonitoring,
    };
  }

  /**
   * Start monitoring the mempool
   */
  async startMonitoring() {
    if (!this.config.monitoringEnabled) {
      console.log('Mempool monitoring is disabled in configuration');
      return false;
    }

    if (this.isMonitoring) {
      console.log('Mempool monitoring is already running');
      return true;
    }

    console.log('Starting mempool monitoring...');
    this.isMonitoring = true;
    this.startTime = Date.now();

    // Set up polling for pending transactions for non-websocket providers
    for (const [networkName, provider] of Object.entries(this.providers)) {
      const networkConfig = this.config.networks[networkName];

      // Skip if it's a websocket provider (already set up in initialize)
      if (networkConfig.rpcUrl.startsWith('ws')) {
        continue;
      }

      // Set up polling for pending transactions
      this._startPollingPendingTransactions(networkName, provider);
    }

    this.emit('monitoring:started', {
      networks: Object.keys(this.providers),
      startTime: new Date(this.startTime).toISOString(),
    });

    return true;
  }

  /**
   * Stop monitoring the mempool
   */
  async stopMonitoring() {
    if (!this.isMonitoring) {
      console.log('Mempool monitoring is not running');
      return false;
    }

    console.log('Stopping mempool monitoring...');
    this.isMonitoring = false;

    // Remove all listeners
    for (const provider of Object.values(this.providers)) {
      provider.removeAllListeners('pending');
    }

    // Finalize current file
    if (this.config.saveTransactions && this.currentFile) {
      const data = JSON.parse(fs.readFileSync(this.currentFile, 'utf8'));
      data.endTime = new Date().toISOString();
      data.duration = (Date.now() - this.startTime) / 1000; // in seconds
      data.transactionCount = this.transactionCount;

      fs.writeFileSync(this.currentFile, JSON.stringify(data, null, 2));
    }

    this.emit('monitoring:stopped', {
      duration: (Date.now() - this.startTime) / 1000,
      transactionCount: this.transactionCount,
    });

    return true;
  }

  /**
   * Start polling for pending transactions using eth_pendingTransactions
   */
  _startPollingPendingTransactions(networkName, provider) {
    const pollInterval = this.config.networks[networkName].pollInterval || 5000; // 5 seconds default

    const poll = async () => {
      if (!this.isMonitoring) return;

      try {
        // Use a custom RPC call to get pending transactions
        const pendingTransactions = await provider.send('eth_pendingTransactions', []);

        for (const tx of pendingTransactions) {
          await this._processPendingTransaction(networkName, tx);
        }
      } catch (error) {
        console.error(`Error polling pending transactions for ${networkName}:`, error);
      }

      // Schedule next poll
      if (this.isMonitoring) {
        setTimeout(() => poll(), pollInterval);
      }
    };

    // Start polling
    poll();
  }

  /**
   * Handle pending transaction notification (from websocket)
   */
  async _handlePendingTransaction(networkName, txHash) {
    if (!this.isMonitoring) return;

    try {
      const provider = this.providers[networkName];
      const tx = await provider.getTransaction(txHash);

      if (tx) {
        await this._processPendingTransaction(networkName, tx);
      }
    } catch (error) {
      console.error(`Error handling pending transaction for ${networkName}:`, error);
    }
  }

  /**
   * Process pending transaction
   */
  async _processPendingTransaction(networkName, tx) {
    const txId = `${networkName}-${tx.hash}`;

    // Skip if already processed
    if (this.pendingTransactions[txId]) {
      return;
    }

    // Store transaction
    this.pendingTransactions[txId] = {
      ...tx,
      networkName,
      receivedAt: Date.now(),
      processed: false,
    };

    // Increment transaction count
    this.transactionCount++;

    // Check for alerts
    const alerts = this._checkTransactionAlerts(tx, networkName);

    if (alerts.length > 0) {
      this.pendingTransactions[txId].alerts = alerts;

      this.emit('transaction:alert', {
        transaction: tx,
        networkName,
        alerts,
      });
    }

    // Check for front-running
    if (this.config.frontRunningDetection.enabled) {
      this._detectFrontRunning(tx, networkName);
    }

    // Check for MEV
    if (this.config.mevDetection.enabled) {
      this._detectMEV(tx, networkName);
    }

    // Save transaction
    if (this.config.saveTransactions) {
      this._saveTransaction(tx, networkName);
    }

    // Emit event
    this.emit('transaction:pending', {
      transaction: tx,
      networkName,
      alerts,
    });

    // Mark as processed
    this.pendingTransactions[txId].processed = true;
  }

  /**
   * Check transaction for alert conditions
   */
  _checkTransactionAlerts(tx, networkName) {
    const alerts = [];
    const provider = this.providers[networkName];

    // Convert values for easier comparison
    const gasPrice = tx.gasPrice ? ethers.utils.formatUnits(tx.gasPrice, 'gwei') : 0;
    const value = tx.value ? parseFloat(ethers.utils.formatEther(tx.value)) : 0;

    // Check high gas price
    if (gasPrice > this.config.alertThresholds.highGasPrice) {
      alerts.push({
        type: 'high-gas-price',
        gasPrice,
        threshold: this.config.alertThresholds.highGasPrice,
      });
    }

    // Check high value
    if (value > this.config.alertThresholds.highValue) {
      alerts.push({
        type: 'high-value-transaction',
        value,
        threshold: this.config.alertThresholds.highValue,
      });
    }

    // Check watched addresses
    if (
      this.config.alertThresholds.watchedAddresses.includes(tx.from) ||
      (tx.to && this.config.alertThresholds.watchedAddresses.includes(tx.to))
    ) {
      alerts.push({
        type: 'watched-address',
        addresses: [tx.from, tx.to].filter(a =>
          this.config.alertThresholds.watchedAddresses.includes(a)
        ),
      });
    }

    // Check suspicious contracts
    if (tx.to && this.config.alertThresholds.suspiciousContracts.includes(tx.to)) {
      alerts.push({
        type: 'suspicious-contract',
        contract: tx.to,
      });
    }

    return alerts;
  }

  /**
   * Detect potential front-running transactions
   */
  _detectFrontRunning(tx, networkName) {
    // Get config
    const config = this.config.frontRunningDetection;

    // Check if transaction interacts with a DeFi protocol
    // (This is a simplified check - real implementation would look at tx.data)
    const isDeFiTx = tx.data && tx.data.length > 10;
    if (!isDeFiTx) return;

    const now = Date.now();
    const gasPrice = tx.gasPrice ? parseFloat(ethers.utils.formatUnits(tx.gasPrice, 'gwei')) : 0;
    const value = tx.value ? parseFloat(ethers.utils.formatEther(tx.value)) : 0;

    // Check previous transactions to the same contract
    const relatedTxs = Object.values(this.pendingTransactions).filter(
      ptx =>
        ptx.networkName === networkName &&
        ptx.hash !== tx.hash &&
        ptx.to === tx.to &&
        (now - ptx.receivedAt) / 1000 <= config.timeWindow
    );

    for (const relatedTx of relatedTxs) {
      const relatedGasPrice = relatedTx.gasPrice
        ? parseFloat(ethers.utils.formatUnits(relatedTx.gasPrice, 'gwei'))
        : 0;

      // Check if this transaction might be front-running another
      if (
        gasPrice >= relatedGasPrice * config.gasIncreaseFactor &&
        value >= config.valueThreshold
      ) {
        const frontRunId = `${networkName}-${tx.hash}-${relatedTx.hash}`;

        // Store front-running candidate
        this.frontRunningCandidates[frontRunId] = {
          frontRunner: tx,
          victim: relatedTx,
          gasIncrease: gasPrice / relatedGasPrice,
          detectedAt: now,
        };

        // Emit event
        this.emit('front-running:detected', {
          frontRunner: tx,
          victim: relatedTx,
          networkName,
          gasIncrease: gasPrice / relatedGasPrice,
        });
      }
    }
  }

  /**
   * Detect potential MEV opportunities
   */
  _detectMEV(tx, networkName) {
    // This is just a placeholder. A real implementation would decode transaction data
    // and look for specific patterns like sandwich attacks, arbitrage, liquidations, etc.
    const mevConfig = this.config.mevDetection;

    if (!tx.data || tx.data === '0x') {
      return; // Skip non-contract interactions
    }

    // Check for DEX interactions (simplified)
    const isDexInteraction = tx.data.includes('0x38ed1739'); // approx. check for swapExactTokensForTokens

    if (isDexInteraction && mevConfig.analyzers.includes('sandwich')) {
      this._detectSandwichOpportunity(tx, networkName);
    }

    // Check for arbitrage opportunities
    if (isDexInteraction && mevConfig.analyzers.includes('arbitrage')) {
      this._detectArbitrageOpportunity(tx, networkName);
    }

    // Check for liquidation opportunities
    if (mevConfig.analyzers.includes('liquidation')) {
      this._detectLiquidationOpportunity(tx, networkName);
    }
  }

  /**
   * Detect sandwich attack opportunities
   */
  _detectSandwichOpportunity(tx, networkName) {
    // In a real implementation, this would decode the transaction data
    // and check if it's a large token swap that could be sandwiched

    // For demo purposes, just log it
    this.emit('mev:sandwich-opportunity', {
      transaction: tx,
      networkName,
      // Would include token details, price impact, etc.
    });
  }

  /**
   * Detect arbitrage opportunities
   */
  _detectArbitrageOpportunity(tx, networkName) {
    // In a real implementation, this would check price differences between DEXes

    // For demo purposes, just log it
    this.emit('mev:arbitrage-opportunity', {
      transaction: tx,
      networkName,
      // Would include token details, price differences, etc.
    });
  }

  /**
   * Detect liquidation opportunities
   */
  _detectLiquidationOpportunity(tx, networkName) {
    // In a real implementation, this would check for positions that can be liquidated

    // For demo purposes, just log it
    const isLiquidationCall = tx.data && tx.data.includes('0x9af1d35a'); // example signature

    if (isLiquidationCall) {
      this.emit('mev:liquidation-opportunity', {
        transaction: tx,
        networkName,
        // Would include position details, health factor, etc.
      });
    }
  }

  /**
   * Save transaction to file
   */
  _saveTransaction(tx, networkName) {
    try {
      if (!this.config.saveTransactions || !this.currentFile) {
        return;
      }

      // Read current file
      const data = JSON.parse(fs.readFileSync(this.currentFile, 'utf8'));

      // Add transaction
      data.transactions.push({
        ...tx,
        networkName,
        receivedAt: new Date().toISOString(),
      });

      // Save file
      fs.writeFileSync(this.currentFile, JSON.stringify(data, null, 2));

      // Check if we need to create a new file
      if (data.transactions.length >= this.config.maxTransactionsPerFile) {
        this.currentFile = path.join(this.config.dataDir, `mempool_${Date.now()}.json`);

        fs.writeFileSync(
          this.currentFile,
          JSON.stringify(
            {
              startTime: new Date().toISOString(),
              transactions: [],
            },
            null,
            2
          )
        );
      }
    } catch (error) {
      console.error('Error saving transaction to file:', error);
    }
  }

  /**
   * Generate a mempool status report
   */
  generateReport() {
    const now = Date.now();
    const monitoringTime = this.startTime ? (now - this.startTime) / 1000 : 0;

    const report = {
      status: this.isMonitoring ? 'monitoring' : 'stopped',
      startTime: this.startTime ? new Date(this.startTime).toISOString() : null,
      monitoringDuration: monitoringTime,
      transactionCount: this.transactionCount,
      transactionsPerSecond: monitoringTime > 0 ? this.transactionCount / monitoringTime : 0,
      pendingTransactions: Object.keys(this.pendingTransactions).length,
      networks: Object.keys(this.providers),
      alerts: {
        frontRunningCandidates: Object.keys(this.frontRunningCandidates).length,
        mevOpportunities: Object.keys(this.mevCandidates).length,
      },
      recentAlerts: [],
    };

    // Add recent alerts
    const recentTxs = Object.values(this.pendingTransactions)
      .filter(tx => tx.alerts && tx.alerts.length > 0)
      .sort((a, b) => b.receivedAt - a.receivedAt)
      .slice(0, 10);

    for (const tx of recentTxs) {
      report.recentAlerts.push({
        txHash: tx.hash,
        network: tx.networkName,
        from: tx.from,
        to: tx.to,
        alerts: tx.alerts,
        receivedAt: new Date(tx.receivedAt).toISOString(),
      });
    }

    return report;
  }

  /**
   * Get front-running candidates
   */
  getFrontRunningCandidates() {
    return Object.values(this.frontRunningCandidates);
  }

  /**
   * Get MEV candidates
   */
  getMEVCandidates() {
    return Object.values(this.mevCandidates);
  }

  /**
   * Get pending transactions
   */
  getPendingTransactions(networkName) {
    if (networkName) {
      return Object.values(this.pendingTransactions).filter(tx => tx.networkName === networkName);
    }

    return Object.values(this.pendingTransactions);
  }

  /**
   * Watch a specific address for transactions
   */
  watchAddress(address) {
    if (!address.startsWith('0x')) {
      address = `0x${address}`;
    }

    if (!this.config.alertThresholds.watchedAddresses.includes(address)) {
      this.config.alertThresholds.watchedAddresses.push(address);
      console.log(`Now watching address: ${address}`);
    }

    return this.config.alertThresholds.watchedAddresses;
  }

  /**
   * Add a suspicious contract to watch list
   */
  addSuspiciousContract(address) {
    if (!address.startsWith('0x')) {
      address = `0x${address}`;
    }

    if (!this.config.alertThresholds.suspiciousContracts.includes(address)) {
      this.config.alertThresholds.suspiciousContracts.push(address);
      console.log(`Added suspicious contract: ${address}`);
    }

    return this.config.alertThresholds.suspiciousContracts;
  }
}

module.exports = MemPoolMonitor;
