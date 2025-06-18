/**
 * Base Validator
 *
 * Specialized validator for Base testing, focusing on
 * Base-specific features, Optimism-derived bridge operations, and L2 execution.
 */

const ethers = require('ethers');
const { CHAIN_IDS } = require('./index');

class BaseValidator {
  /**
   * Create a new Base validator
   * @param {Object} config Configuration
   */
  constructor(config = {}) {
    this.config = {
      mainnetRpcUrl: config.mainnetRpcUrl || 'https://mainnet.base.org',
      testnetRpcUrl: config.testnetRpcUrl || 'https://goerli.base.org',
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

    // Base bridge contracts
    this.bridgeContracts = {
      l1StandardBridge: '0x3154Cf16ccdb4C6d922629664174b904d80F2C35', // Ethereum Mainnet
      l2StandardBridge: '0x4200000000000000000000000000000000000010', // Base Mainnet
      l1CrossDomainMessenger: '0x866E82a600A1414e583f7F13623F1aC5d58b0Afa', // Ethereum Mainnet
      l2CrossDomainMessenger: '0x4200000000000000000000000000000000000007', // Base Mainnet
      testnet: {
        l1StandardBridge: '0xfA6D8Ee5BE770F84FC001D098C4bD604Fe01284a', // Goerli
        l2StandardBridge: '0x4200000000000000000000000000000000000010', // Base Goerli
        l1CrossDomainMessenger: '0x8e5693140eA606bcEB98761d9beB1BC87383706D', // Goerli
        l2CrossDomainMessenger: '0x4200000000000000000000000000000000000007', // Base Goerli
      },
    };
  }

  /**
   * Initialize the Base validator
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
      this.log('Base validator initialized', 'info');
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
    return this.config.useTestnet ? CHAIN_IDS.BASE_TESTNET : CHAIN_IDS.BASE;
  }

  /**
   * Deploy a contract on Base
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
        ? this.bridgeContracts.testnet.l1StandardBridge
        : this.bridgeContracts.l1StandardBridge;

      // Basic ERC20 ABI for token approval
      const tokenAbi = [
        'function approve(address spender, uint256 amount) returns (bool)',
        'function balanceOf(address owner) view returns (uint256)',
        'function decimals() view returns (uint8)',
        'function symbol() view returns (string)',
      ];

      // Bridge ABI for token deposit
      const bridgeAbi = [
        'function depositERC20(address _l1Token, address _l2Token, uint256 _amount, uint32 _l2Gas, bytes calldata _data) external',
        'function depositERC20To(address _l1Token, address _l2Token, address _to, uint256 _amount, uint32 _l2Gas, bytes calldata _data) external',
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
        description: `Approved ${amount} ${tokenSymbol} to Base bridge`,
      });

      // Create bridge contract instance
      const bridgeContract = new ethers.Contract(bridgeAddress, bridgeAbi, this.wallet);

      // Standard L2 token address is required for Base bridge
      const l2TokenAddress = options.l2TokenAddress || options.l2Token;
      if (!l2TokenAddress) {
        throw new Error('L2 token address is required for Base bridging');
      }

      // Execute bridging transaction
      const bridgeTx = await bridgeContract.depositERC20(
        tokenAddress,
        l2TokenAddress,
        parsedAmount,
        options.l2Gas || 200000,
        options.data || '0x'
      );

      const receipt = await bridgeTx.wait();

      results.transactions.push({
        hash: bridgeTx.hash,
        type: 'bridge',
        description: `Bridged ${amount} ${tokenSymbol} from L1 to Base`,
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
   * Test message passing from L1 to L2
   * @param {string} message Message to pass
   * @param {string} destinationAddress Destination contract address on L2
   * @param {Object} options Message options
   * @returns {Promise<Object>} Message results
   */
  async testL1ToL2MessagePassing(message, destinationAddress, options = {}) {
    if (!this.initialized) await this.initialize();

    const results = {
      success: false,
      transactions: [],
      logs: [],
      errors: [],
    };

    try {
      const isTestnet = this.config.useTestnet;
      const messengerAddress = isTestnet
        ? this.bridgeContracts.testnet.l1CrossDomainMessenger
        : this.bridgeContracts.l1CrossDomainMessenger;

      // Messenger ABI
      const messengerAbi = [
        'function sendMessage(address _target, bytes calldata _message, uint32 _gasLimit) external',
      ];

      // Connect to messenger contract
      const messenger = new ethers.Contract(messengerAddress, messengerAbi, this.wallet);

      // Encode message as bytes
      const encodedMessage = ethers.utils.defaultAbiCoder.encode(['string'], [message]);

      // Send message from L1 to L2
      const sendTx = await messenger.sendMessage(
        destinationAddress,
        encodedMessage,
        options.gasLimit || 200000
      );

      const receipt = await sendTx.wait();

      results.transactions.push({
        hash: sendTx.hash,
        type: 'message',
        description: 'Sent message from L1 to Base',
        receipt,
      });

      results.success = true;
      return results;
    } catch (error) {
      this.log(`Message passing failed: ${error.message}`, 'error');
      results.errors.push(error.message);
      return results;
    }
  }

  /**
   * Test Base-specific performance metrics
   * @param {Object} options Test options
   * @returns {Promise<Object>} Performance results
   */
  async testPerformance(options = {}) {
    if (!this.initialized) await this.initialize();

    const results = {
      success: false,
      metrics: {},
      logs: [],
    };

    try {
      // Get current block
      const block = await this.provider.getBlock('latest');

      // Get gas price
      const gasPrice = await this.provider.getGasPrice();

      // Measure transaction time (simple transfer)
      const startTime = Date.now();
      const tx = await this.wallet.sendTransaction({
        to: ethers.Wallet.createRandom().address,
        value: ethers.utils.parseEther('0.0001'),
        gasLimit: options.gasLimit || 21000,
      });

      await tx.wait();
      const endTime = Date.now();
      const transactionTime = endTime - startTime;

      // Record metrics
      results.metrics = {
        blockHeight: block.number,
        blockGasLimit: block.gasLimit.toString(),
        gasPrice: ethers.utils.formatUnits(gasPrice, 'gwei') + ' gwei',
        transactionTime: transactionTime + 'ms',
        timestamp: new Date().toISOString(),
      };

      results.success = true;
      return results;
    } catch (error) {
      this.log(`Performance test failed: ${error.message}`, 'error');
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

    if (this.config.logLevel === 'debug' || level === 'error') {
    }
  }
}

module.exports = BaseValidator;
