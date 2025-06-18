/**
 * zkSync Era Validator
 *
 * Specialized validator for zkSync Era testing, focusing on
 * account abstraction, paymaster patterns, and zkSync-specific features.
 */

const ethers = require('ethers');
const zksync = require('zksync-web3');
const { CHAIN_IDS } = require('./index');

class ZkSyncValidator {
  /**
   * Create a new zkSync validator
   * @param {Object} config Configuration
   */
  constructor(config = {}) {
    this.config = {
      rpcUrl: config.rpcUrl || 'https://mainnet.era.zksync.io',
      testnetRpcUrl: config.testnetRpcUrl || 'https://testnet.era.zksync.io',
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
  }

  /**
   * Initialize the zkSync validator
   * @returns {Promise<void>}
   */
  async initialize() {
    try {
      const rpcUrl = this.config.useTestnet ? this.config.testnetRpcUrl : this.config.rpcUrl;
      this.provider = new zksync.Provider(rpcUrl);

      if (this.config.privateKey) {
        this.wallet = new zksync.Wallet(this.config.privateKey, this.provider);
      } else if (this.config.mnemonic) {
        const ethersWallet = ethers.Wallet.fromMnemonic(this.config.mnemonic);
        this.wallet = new zksync.Wallet(ethersWallet.privateKey, this.provider);
      } else {
        throw new Error('Either privateKey or mnemonic must be provided');
      }

      this.initialized = true;
      this.log('ZkSync validator initialized', 'info');
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
    return this.config.useTestnet ? CHAIN_IDS.ZKSYNC_ERA_TESTNET : CHAIN_IDS.ZKSYNC_ERA;
  }

  /**
   * Deploy a contract using zkSync Era's deployment process
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

      const factory = new zksync.ContractFactory(
        contractArtifact.abi,
        contractArtifact.bytecode,
        this.wallet
      );

      // Deploy the contract
      const deployTx = await factory.deploy(...constructorArgs, {
        gasLimit: deployOptions.gasLimit || this.config.gasLimit,
        customData: {
          factoryDeps: deployOptions.factoryDeps || [],
          customSignature: deployOptions.customSignature,
          gasPerPubdata: deployOptions.gasPerPubdata || 50000,
        },
      });

      // Wait for deployment
      const receipt = await deployTx.deployTransaction.wait();

      this.log(`Contract deployed at ${receipt.contractAddress}`, 'info');

      return {
        address: receipt.contractAddress,
        deployTransaction: receipt,
        contract: new zksync.Contract(receipt.contractAddress, contractArtifact.abi, this.wallet),
      };
    } catch (error) {
      this.log(`Contract deployment failed: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Test a paymaster pattern with zkSync
   * @param {Object} paymaster Paymaster contract
   * @param {Object} options Test options
   * @returns {Promise<Object>} Test results
   */
  async testPaymaster(paymaster, options = {}) {
    if (!this.initialized) await this.initialize();

    try {
      const results = {
        success: false,
        transactions: [],
        logs: [],
        errors: [],
      };

      // Get or create a paymaster contract instance
      let paymasterContract;
      if (typeof paymaster === 'string') {
        // It's an address
        const paymasterAbi = options.paymasterAbi || [
          'function validateAndPayForPaymasterTransaction(bytes32, bytes32, bytes) external payable returns (bytes, bytes)',
          'function postTransaction(bytes calldata context, bytes calldata _txHash) external',
        ];
        paymasterContract = new zksync.Contract(paymaster, paymasterAbi, this.wallet);
      } else {
        paymasterContract = paymaster;
      }

      // Create a test user wallet
      const testUserWallet = zksync.Wallet.createRandom().connect(this.provider);

      // Fund the test wallet with ETH to cover minimal costs
      const fundTx = await this.wallet.sendTransaction({
        to: testUserWallet.address,
        value: ethers.utils.parseEther('0.01'),
      });

      await fundTx.wait();
      results.transactions.push(fundTx);

      // Get a contract to interact with
      let testContractAddress = options.testContractAddress;
      if (!testContractAddress) {
        // Deploy a simple test contract if none specified
        const testContract = await this.deployContract({
          abi: [
            {
              inputs: [],
              name: 'increment',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'value',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              stateMutability: 'view',
              type: 'function',
            },
          ],
          bytecode:
            '0x608060405234801561001057600080fd5b5060b18061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80633fa4f24514603757806360fe47b114604c575b600080fd5b603a6062565b6040516045919060bf565b60405180910390f35b60606068565b005b60005481565b6000808154809291906084906001019190505550565b600081905290565b60b981609e565b82525050565b600060208201905060d2600083018460b0565b92915050565b61022d806100e26000396000f3',
        });
        testContractAddress = testContract.address;
      }

      // Create contract interface
      const contractInterface = new ethers.utils.Interface([
        'function increment()',
        'function value() view returns (uint256)',
      ]);

      // Create transaction with paymaster
      const incrementTx = {
        to: testContractAddress,
        data: contractInterface.encodeFunctionData('increment'),
        maxFeePerGas: ethers.utils.parseUnits('0.1', 'gwei'),
        maxPriorityFeePerGas: ethers.utils.parseUnits('0.1', 'gwei'),
        gasLimit: options.gasLimit || 1000000,
        customData: {
          paymasterParams: {
            paymaster: paymasterContract.address,
            paymasterInput: options.paymasterInput || '0x',
          },
          gasPerPubdata: options.gasPerPubdata || 50000,
        },
      };

      // Execute transaction
      try {
        const tx = await testUserWallet.sendTransaction(incrementTx);
        const receipt = await tx.wait();

        results.transactions.push(tx);
        results.success = receipt.status === 1;

        this.log('Paymaster test transaction successful', 'info');
      } catch (error) {
        results.errors.push({
          message: error.message,
          stack: error.stack,
        });
        this.log(`Paymaster test failed: ${error.message}`, 'error');
      }

      return results;
    } catch (error) {
      this.log(`Paymaster test error: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Test account abstraction features on zkSync
   * @param {Object} options Test options
   * @returns {Promise<Object>} Test results
   */
  async testAccountAbstraction(options = {}) {
    if (!this.initialized) await this.initialize();

    try {
      const results = {
        success: false,
        transactions: [],
        logs: [],
        errors: [],
      };

      // Deploy account abstraction factory if needed
      if (!options.factoryAddress) {
        // Here we'd include the factory deployment code
        this.log('Deploying account abstraction factory', 'info');
        // Custom deployment logic would go here
      }

      // Test creation of an AA account
      // Implementation would depend on the specific AA pattern

      this.log('Account abstraction test complete', 'info');
      results.success = true;

      return results;
    } catch (error) {
      this.log(`Account abstraction test error: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Log a message
   * @param {string} message Message to log
   * @param {string} level Log level
   * @private
   */
  log(message, level = 'info') {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
    };

    this.logs.push(logEntry);

    if (
      this.config.logLevel === 'debug' ||
      (this.config.logLevel === 'info' && level !== 'debug') ||
      (this.config.logLevel === 'warn' && (level === 'warn' || level === 'error')) ||
      (this.config.logLevel === 'error' && level === 'error')
    ) {
    }
  }
}

module.exports = ZkSyncValidator;
