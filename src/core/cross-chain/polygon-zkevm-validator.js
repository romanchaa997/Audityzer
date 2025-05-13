/**
 * Polygon zkEVM Validator
 *
 * Specialized validator for Polygon zkEVM testing, focusing on
 * zkEVM-specific features, bridging operations, and zero-knowledge proof verification.
 */

const ethers = require('ethers');
const { CHAIN_IDS } = require('./index');

class PolygonZkEVMValidator {
  /**
   * Create a new Polygon zkEVM validator
   * @param {Object} config Configuration
   */
  constructor(config = {}) {
    this.config = {
      mainnetRpcUrl: config.mainnetRpcUrl || 'https://zkevm-rpc.com',
      testnetRpcUrl: config.testnetRpcUrl || 'https://rpc.public.zkevm-test.net',
      useTestnet: config.useTestnet || false,
      privateKey: config.privateKey,
      mnemonic: config.mnemonic,
      gasLimit: config.gasLimit || 2000000,
      logLevel: config.logLevel || 'info',
      ...config,
    };

    this.provider = null;
    this.wallet = null;
    this.initialized = false;
    this.logs = [];

    // Polygon zkEVM bridge contracts
    this.bridgeContracts = {
      polygonZkEVMBridge: '0x2a3DD3EB832aF982ec71669E178424b10Dca2EDe', // Ethereum Mainnet
      zkEVMBridge: '0x2a3DD3EB832aF982ec71669E178424b10Dca2EDe', // Polygon zkEVM
      testnet: {
        polygonZkEVMBridge: '0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7', // Goerli
        zkEVMBridge: '0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7', // Polygon zkEVM Testnet
      },
    };
  }

  /**
   * Initialize the Polygon zkEVM validator
   * @returns {Promise<void>}
   */
  async initialize() {
    try {
      const rpcUrl = this.config.useTestnet ? this.config.testnetRpcUrl : this.config.mainnetRpcUrl;
      this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);

      if (this.config.privateKey) {
        this.wallet = new ethers.Wallet(this.config.privateKey, this.provider);
      } else if (this.config.mnemonic) {
        this.wallet = ethers.Wallet.fromMnemonic(this.config.mnemonic).connect(this.provider);
      } else {
        throw new Error('Either privateKey or mnemonic must be provided');
      }

      this.initialized = true;
      this.log('Polygon zkEVM validator initialized', 'info');
    } catch (error) {
      this.log(`Failed to initialize: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Get chain ID used by this validator
   * @returns {number} Chain ID
   */
  getChainId() {
    return this.config.useTestnet ? CHAIN_IDS.POLYGON_ZKEVM_TESTNET : CHAIN_IDS.POLYGON_ZKEVM;
  }

  /**
   * Deploy a contract on Polygon zkEVM
   * @param {string} artifact Contract artifact path or JSON
   * @param {Array} constructorArgs Constructor arguments
   * @param {Object} deployOptions Deployment options
   * @returns {Promise<Object>} Deployed contract info
   */
  async deployContract(artifact, constructorArgs = [], deployOptions = {}) {
    if (!this.initialized) await this.initialize();

    try {
      let contractArtifact;
      if (typeof artifact === 'string') {
        contractArtifact = require(artifact);
      } else {
        contractArtifact = artifact;
      }

      const factory = new ethers.ContractFactory(
        contractArtifact.abi,
        contractArtifact.bytecode,
        this.wallet
      );

      // Deploy the contract
      const contract = await factory.deploy(...constructorArgs, {
        gasLimit: deployOptions.gasLimit || this.config.gasLimit,
        ...deployOptions,
      });

      // Wait for deployment
      await contract.deployTransaction.wait();

      this.log(`Contract deployed at ${contract.address}`, 'info');

      return {
        address: contract.address,
        deployTransaction: contract.deployTransaction,
        contract,
      };
    } catch (error) {
      this.log(`Contract deployment failed: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Test token bridging from L1 to L2
   * @param {string} tokenAddress L1 token address
   * @param {string} amount Amount to bridge
   * @param {Object} options Bridge options
   * @returns {Promise<Object>} Bridge results
   */
  async testL1ToL2Bridging(tokenAddress, amount, options = {}) {
    if (!this.initialized) await this.initialize();

    const results = {
      success: false,
      transactions: [],
      logs: [],
      errors: [],
    };

    try {
      const isTestnet = this.config.useTestnet;
      const bridgeAddress = isTestnet
        ? this.bridgeContracts.testnet.polygonZkEVMBridge
        : this.bridgeContracts.polygonZkEVMBridge;

      // Basic ERC20 ABI for token approval
      const tokenAbi = [
        'function approve(address spender, uint256 amount) returns (bool)',
        'function balanceOf(address owner) view returns (uint256)',
        'function decimals() view returns (uint8)',
        'function symbol() view returns (string)',
      ];

      // Bridge ABI for token bridging
      const bridgeAbi = [
        'function bridgeAsset(uint32 destinationNetwork, address destinationAddress, uint256 amount, address token, bool forceUpdateGlobalExitRoot, bytes calldata permitData) external',
        'function claimAsset(bytes32[] calldata smtProof, uint32 index, bytes32 mainnetExitRoot, bytes32 rollupExitRoot, uint32 originNetwork, address originTokenAddress, uint32 destinationNetwork, address destinationAddress, uint256 amount, bytes calldata metadata) external',
      ];

      // Connect to token contract
      const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, this.wallet);

      // Get token details
      const tokenSymbol = await tokenContract.symbol();
      const tokenDecimals = await tokenContract.decimals();
      const parsedAmount = ethers.utils.parseUnits(amount, tokenDecimals);

      // Approve bridge to spend tokens
      const approvalTx = await tokenContract.approve(bridgeAddress, parsedAmount);
      await approvalTx.wait();

      results.transactions.push({
        hash: approvalTx.hash,
        type: 'approval',
        description: `Approved ${amount} ${tokenSymbol} to Polygon zkEVM bridge`,
      });

      // Create bridge contract instance
      const bridgeContract = new ethers.Contract(bridgeAddress, bridgeAbi, this.wallet);

      // Destination address is the same as sender if not specified
      const destinationAddress = options.destinationAddress || this.wallet.address;

      // Execute bridging transaction
      const bridgeTx = await bridgeContract.bridgeAsset(
        1, // destination network (1 = zkEVM)
        destinationAddress,
        parsedAmount,
        tokenAddress,
        options.forceUpdateGlobalExitRoot !== undefined ? options.forceUpdateGlobalExitRoot : true,
        options.permitData || '0x'
      );

      const receipt = await bridgeTx.wait();

      results.transactions.push({
        hash: bridgeTx.hash,
        type: 'bridge',
        description: `Bridged ${amount} ${tokenSymbol} from L1 to Polygon zkEVM`,
        receipt,
      });

      results.success = true;
      return results;
    } catch (error) {
      this.log(`Bridging failed: ${error.message}`, 'error');
      results.errors.push(error.message);
      return results;
    }
  }

  /**
   * Test token claiming on L2
   * @param {Object} proofData Merkle proof data
   * @param {Object} options Claim options
   * @returns {Promise<Object>} Claim results
   */
  async testClaimTokenOnL2(proofData, options = {}) {
    if (!this.initialized) await this.initialize();

    const results = {
      success: false,
      transactions: [],
      logs: [],
      errors: [],
    };

    try {
      const isTestnet = this.config.useTestnet;
      const bridgeAddress = isTestnet
        ? this.bridgeContracts.testnet.zkEVMBridge
        : this.bridgeContracts.zkEVMBridge;

      // Bridge ABI for token claiming
      const bridgeAbi = [
        'function claimAsset(bytes32[] calldata smtProof, uint32 index, bytes32 mainnetExitRoot, bytes32 rollupExitRoot, uint32 originNetwork, address originTokenAddress, uint32 destinationNetwork, address destinationAddress, uint256 amount, bytes calldata metadata) external',
      ];

      // Create bridge contract instance
      const bridgeContract = new ethers.Contract(bridgeAddress, bridgeAbi, this.wallet);

      // Execute claim transaction
      const claimTx = await bridgeContract.claimAsset(
        proofData.smtProof,
        proofData.index,
        proofData.mainnetExitRoot,
        proofData.rollupExitRoot,
        proofData.originNetwork,
        proofData.originTokenAddress,
        proofData.destinationNetwork,
        proofData.destinationAddress,
        proofData.amount,
        proofData.metadata || '0x'
      );

      const receipt = await claimTx.wait();

      results.transactions.push({
        hash: claimTx.hash,
        type: 'claim',
        description: 'Claimed tokens on Polygon zkEVM',
        receipt,
      });

      results.success = true;
      return results;
    } catch (error) {
      this.log(`Claim failed: ${error.message}`, 'error');
      results.errors.push(error.message);
      return results;
    }
  }

  /**
   * Test zkEVM-specific batch verification
   * @param {Object} options Test options
   * @returns {Promise<Object>} Verification results
   */
  async testBatchVerification(options = {}) {
    if (!this.initialized) await this.initialize();

    const results = {
      success: false,
      metrics: {},
      logs: [],
    };

    try {
      // Get chain status
      const chainStatus = await this.provider.send('zkevm_networkStatus', []);

      // Get latest verified batch
      const verifiedBatches = await this.provider.send('zkevm_verifiedBatches', []);

      // Get exit roots
      const exitRoots = await this.provider.send('zkevm_getExitRoots', []);

      // Record metrics
      results.metrics = {
        lastVerifiedBatch: verifiedBatches?.lastVerifiedBatch || null,
        exitRoots: exitRoots || null,
        chainStatus: chainStatus || null,
        timestamp: new Date().toISOString(),
      };

      results.success = true;
      return results;
    } catch (error) {
      this.log(`Batch verification test failed: ${error.message}`, 'error');
      return {
        ...results,
        error: error.message,
      };
    }
  }

  /**
   * Test zkEVM-specific transaction proof generation
   * @param {string} txHash Transaction hash to generate proof for
   * @param {Object} options Options
   * @returns {Promise<Object>} Proof results
   */
  async testTransactionProof(txHash, options = {}) {
    if (!this.initialized) await this.initialize();

    const results = {
      success: false,
      proof: null,
      logs: [],
    };

    try {
      // Try to get transaction receipt first
      const receipt = await this.provider.getTransactionReceipt(txHash);
      if (!receipt) {
        throw new Error(`Transaction ${txHash} not found`);
      }

      // Request proof from zkEVM node (if supported)
      let proof = null;
      try {
        proof = await this.provider.send('zkevm_getTransactionProof', [txHash]);
      } catch (e) {
        this.log(`zkEVM proof RPC method not available: ${e.message}`, 'warn');
        // Fallback with tx details
        proof = {
          txHash,
          blockNumber: receipt.blockNumber,
          blockHash: receipt.blockHash,
          timestamp: new Date().toISOString(),
          status: receipt.status,
          message: 'Proof generation API not available on this RPC endpoint',
        };
      }

      results.proof = proof;
      results.success = true;
      return results;
    } catch (error) {
      this.log(`Transaction proof test failed: ${error.message}`, 'error');
      return {
        ...results,
        error: error.message,
      };
    }
  }

  /**
   * Log messages
   * @param {string} message Message to log
   * @param {string} level Log level
   */
  log(message, level = 'info') {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
    };

    this.logs.push(logEntry);

    if (this.config.logLevel === 'debug' || level === 'error' || level === 'warn') {
      console.log(`[${logEntry.timestamp}] [PolygonZkEVM] [${level.toUpperCase()}] ${message}`);
    }
  }
}

module.exports = PolygonZkEVMValidator;
