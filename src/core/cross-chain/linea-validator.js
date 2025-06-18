/**
 * Linea Validator
 *
 * Specialized validator for Linea testing, focusing on
 * Linea-specific features, bridging operations, and L2 execution.
 */

const ethers = require('ethers');
const { CHAIN_IDS } = require('./index');

class LineaValidator {
  /**
   * Create a new Linea validator
   * @param {Object} config Configuration
   */
  constructor(config = {}) {
    this.config = {
      mainnetRpcUrl: config.mainnetRpcUrl || 'https://rpc.linea.build',
      testnetRpcUrl: config.testnetRpcUrl || 'https://rpc.goerli.linea.build',
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

    // Linea bridge contracts
    this.bridgeContracts = {
      l1TokenBridge: '0x051F1D88f0aF5763fB888eC4378b4D8B29ea3319', // Ethereum Mainnet
      l2TokenBridge: '0x3F3034E57F44F097B5A9F9dc41C98c50388C53f4', // Linea Mainnet
      l1MessageService: '0xd19d4B5d358258f05D7B411E21A1460D11B0876F', // Ethereum Mainnet
      l2MessageService: '0x508Ca82Df566dCD1B0DE8296e70a96332cD644ec', // Linea Mainnet
      testnet: {
        l1TokenBridge: '0xB191E3d98074f93A027D5567F420947Ee90fE502', // Goerli
        l2TokenBridge: '0x9df99C287D6E4581E00F2446E5655E4b15896b96', // Linea Testnet
        l1MessageService: '0x70BaD09280FD342D02fe64119779BC1f0791BAC2', // Goerli
        l2MessageService: '0x999F478fBCb3C9517A8908bD6d458b7A3d0AC93C', // Linea Testnet
      },
    };
  }

  /**
   * Initialize the Linea validator
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
      this.log('Linea validator initialized', 'info');
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
    return this.config.useTestnet ? CHAIN_IDS.LINEA_TESTNET : CHAIN_IDS.LINEA;
  }

  /**
   * Deploy a contract on Linea
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
        ? this.bridgeContracts.testnet.l1TokenBridge
        : this.bridgeContracts.l1TokenBridge;

      // Basic ERC20 ABI for token approval
      const tokenAbi = [
        'function approve(address spender, uint256 amount) returns (bool)',
        'function balanceOf(address owner) view returns (uint256)',
        'function decimals() view returns (uint8)',
        'function symbol() view returns (string)',
      ];

      // Bridge ABI for token deposit
      const bridgeAbi = [
        'function depositERC20(address _token, uint256 _amount, uint256 _gasLimit) payable',
        'function depositERC20To(address _token, address _to, uint256 _amount, uint256 _gasLimit) payable',
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
        description: `Approved ${amount} ${tokenSymbol} to Linea bridge`,
      });

      // Create bridge contract instance
      const bridgeContract = new ethers.Contract(bridgeAddress, bridgeAbi, this.wallet);

      // Execute bridging transaction
      const bridgeTx = await bridgeContract.depositERC20(
        tokenAddress,
        parsedAmount,
        options.gasLimit || 200000,
        { value: options.messageFee || ethers.utils.parseEther('0.0001') }
      );

      const receipt = await bridgeTx.wait();

      results.transactions.push({
        hash: bridgeTx.hash,
        type: 'bridge',
        description: `Bridged ${amount} ${tokenSymbol} from L1 to Linea`,
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
      const messageServiceAddress = isTestnet
        ? this.bridgeContracts.testnet.l1MessageService
        : this.bridgeContracts.l1MessageService;

      // Message service ABI
      const messageServiceAbi = [
        'function sendMessage(address _to, bytes calldata _data, uint256 _gasLimit) payable returns (bytes32)',
        'function claimMessage(bytes calldata _data, address _from, address _to) external',
      ];

      // Connect to message service contract
      const messageService = new ethers.Contract(
        messageServiceAddress,
        messageServiceAbi,
        this.wallet
      );

      // Encode message as bytes
      const encodedMessage = ethers.utils.defaultAbiCoder.encode(['string'], [message]);

      // Send message from L1 to L2
      const sendTx = await messageService.sendMessage(
        destinationAddress,
        encodedMessage,
        options.gasLimit || 200000,
        { value: options.messageFee || ethers.utils.parseEther('0.001') }
      );

      const receipt = await sendTx.wait();

      results.transactions.push({
        hash: sendTx.hash,
        type: 'message',
        description: 'Sent message from L1 to Linea',
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

module.exports = LineaValidator;
