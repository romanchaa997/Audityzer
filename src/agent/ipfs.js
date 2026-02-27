/**
 * IPFS Adapter for Audityzer Security Agent
 * Stores security reports on IPFS for decentralized, immutable storage
 */

export class IpfsAdapter {
  constructor(config = {}) {
    this.config = {
      gateway: config.gateway || process.env.IPFS_GATEWAY || 'https://ipfs.io',
      apiUrl: config.apiUrl || process.env.IPFS_API_URL || null,
      enabled: config.enabled !== undefined ? config.enabled : !!config.apiUrl,
      ...config,
    };
  }

  /**
   * Store a security report on IPFS
   * @param {string} scanId - Unique scan identifier
   * @param {object} report - The security scan report
   * @returns {string|null} IPFS CID (Content Identifier) or null if disabled
   */
  async storeReport(scanId, report) {
    if (!this.config.enabled || !this.config.apiUrl) {
      console.warn('[IpfsAdapter] IPFS storage disabled or not configured');
      return null;
    }

    try {
      const payload = JSON.stringify({
        scanId,
        report,
        storedAt: new Date().toISOString(),
        version: '1.0.0',
      });

      const response = await fetch(`${this.config.apiUrl}/api/v0/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      });

      if (!response.ok) {
        throw new Error(`IPFS API returned ${response.status}`);
      }

      const data = await response.json();
      const cid = data.Hash || data.cid;
      console.info(`[IpfsAdapter] Report stored: ${cid}`);
      return cid;
    } catch (error) {
      console.error('[IpfsAdapter] Failed to store report:', error.message);
      return null;
    }
  }

  /**
   * Get the public gateway URL for a CID
   * @param {string} cid - IPFS Content Identifier
   * @returns {string} Gateway URL
   */
  getGatewayUrl(cid) {
    return `${this.config.gateway}/ipfs/${cid}`;
  }

  isEnabled() {
    return this.config.enabled;
  }
}

export default IpfsAdapter;
