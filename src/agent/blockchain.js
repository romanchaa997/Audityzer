/**
 * Blockchain Adapter for Audityzer Security Agent
 * Records audit results on-chain for immutable provenance
 */

export class BlockchainAdapter {
  constructor(config = {}) {
    this.config = {
      network: config.network || 'ethereum',
      rpcUrl: config.rpcUrl || process.env.BLOCKCHAIN_RPC_URL || null,
      contractAddress: config.contractAddress || process.env.AUDIT_CONTRACT_ADDRESS || null,
      enabled: config.enabled !== undefined ? config.enabled : !!config.rpcUrl,
      ...config,
    };
  }

  /**
   * Record an audit result on the blockchain
   * @param {string} scanId - Unique scan identifier
   * @param {string} ipfsHash - IPFS CID of the stored report
   * @returns {string|null} Transaction hash or null if disabled
   */
  async recordAudit(scanId, ipfsHash) {
    if (!this.config.enabled || !this.config.contractAddress) {
      console.warn('[BlockchainAdapter] Blockchain recording disabled or not configured');
      return null;
    }

    try {
      // Dynamic import to avoid hard dependency on ethers
      const { ethers } = await import('ethers');
      const provider = new ethers.JsonRpcProvider(this.config.rpcUrl);
      const wallet = new ethers.Wallet(process.env.BLOCKCHAIN_PRIVATE_KEY, provider);

      const abi = [
        'function recordAudit(string scanId, string ipfsHash) external returns (bytes32)',
      ];
      const contract = new ethers.Contract(this.config.contractAddress, abi, wallet);
      const tx = await contract.recordAudit(scanId, ipfsHash);
      const receipt = await tx.wait();
      return receipt.hash;
    } catch (error) {
      console.error('[BlockchainAdapter] Failed to record audit:', error.message);
      return null;
    }
  }

  isEnabled() {
    return this.config.enabled;
  }
}

export default BlockchainAdapter;
