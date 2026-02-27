/**
 * Audityzer Event-Driven Security Agent
 * Orchestrates security scanning via event bus pattern
 * Supports blockchain, IPFS, and messaging integrations
 */

import { EventEmitter } from 'events';
import { SecurityScanEvent } from './events.js';
import { BlockchainAdapter } from './blockchain.js';
import { IpfsAdapter } from './ipfs.js';
import { MessagingAdapter } from './messaging.js';

export class SecurityAgent extends EventEmitter {
  constructor(config = {}) {
    super();
    this.config = {
      maxConcurrentScans: config.maxConcurrentScans || 5,
      scanTimeout: config.scanTimeout || 30000,
      retryAttempts: config.retryAttempts || 3,
      ...config,
    };
    this.activeScans = new Map();
    this.blockchain = new BlockchainAdapter(config.blockchain);
    this.ipfs = new IpfsAdapter(config.ipfs);
    this.messaging = new MessagingAdapter(config.messaging);
    this._setupListeners();
  }

  _setupListeners() {
    this.on(SecurityScanEvent.SCAN_REQUESTED, this._handleScanRequest.bind(this));
    this.on(SecurityScanEvent.SCAN_COMPLETED, this._handleScanComplete.bind(this));
    this.on(SecurityScanEvent.SCAN_FAILED, this._handleScanFailure.bind(this));
    this.on(SecurityScanEvent.REPORT_READY, this._publishReport.bind(this));
  }

  async _handleScanRequest({ scanId, target, options = {} }) {
    if (this.activeScans.size >= this.config.maxConcurrentScans) {
      this.emit(SecurityScanEvent.SCAN_QUEUED, { scanId, target });
      return;
    }

    this.activeScans.set(scanId, { target, startedAt: Date.now(), status: 'running' });

    try {
      const result = await Promise.race([
        this._runScan(target, options),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Scan timeout')), this.config.scanTimeout)
        ),
      ]);

      this.emit(SecurityScanEvent.SCAN_COMPLETED, { scanId, result });
    } catch (error) {
      this.emit(SecurityScanEvent.SCAN_FAILED, { scanId, error: error.message });
    } finally {
      this.activeScans.delete(scanId);
    }
  }

  async _runScan(target, options) {
    // Core scan logic delegated to the security core module
    const { runSecurityScan } = await import('../core/scanner.js');
    return runSecurityScan(target, options);
  }

  async _handleScanComplete({ scanId, result }) {
    const ipfsHash = await this.ipfs.storeReport(scanId, result);
    const txHash = await this.blockchain.recordAudit(scanId, ipfsHash);
    this.emit(SecurityScanEvent.REPORT_READY, { scanId, ipfsHash, txHash, result });
  }

  _handleScanFailure({ scanId, error }) {
    console.error(`[SecurityAgent] Scan ${scanId} failed: ${error}`);
    this.messaging.notify({ type: 'SCAN_FAILED', scanId, error });
  }

  async _publishReport({ scanId, ipfsHash, txHash, result }) {
    await this.messaging.publish({
      type: 'REPORT_PUBLISHED',
      scanId,
      ipfsHash,
      txHash,
      summary: result?.summary || {},
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Request a new security scan
   * @param {string} target - Contract address or URL to scan
   * @param {object} options - Scan options
   * @returns {string} scanId
   */
  requestScan(target, options = {}) {
    const scanId = `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.emit(SecurityScanEvent.SCAN_REQUESTED, { scanId, target, options });
    return scanId;
  }

  getActiveScanCount() {
    return this.activeScans.size;
  }

  getScanStatus(scanId) {
    return this.activeScans.get(scanId) || null;
  }
}

export default SecurityAgent;
