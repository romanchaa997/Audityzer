/**
 * Account Abstraction Test Utilities
 * Provides helpers for testing ERC-4337 implementations with mock EntryPoint
 * or against a forked Goerli network
 */

const { ethers } = require('ethers');
const path = require('path');
const fs = require('fs');

// Standard EntryPoint ABI - simplified for testing
const ENTRY_POINT_ABI = [
  // UserOperation array is complex, so we use a simplified ABI for testing
  "function handleOps(tuple(address sender, uint256 nonce, bytes initCode, bytes callData, uint256 callGasLimit, uint256 verificationGasLimit, uint256 preVerificationGas, uint256 maxFeePerGas, uint256 maxPriorityFeePerGas, bytes paymasterAndData, bytes signature)[] calldata ops, address payable beneficiary) payable",
  "function depositTo(address account) public payable",
  "function balanceOf(address account) public view returns (uint256)",
  "function simulateValidation(tuple(address sender, uint256 nonce, bytes initCode, bytes callData, uint256 callGasLimit, uint256 verificationGasLimit, uint256 preVerificationGas, uint256 maxFeePerGas, uint256 maxPriorityFeePerGas, bytes paymasterAndData, bytes signature) calldata userOp) external",
];

// Standard EntryPoint address on Goerli and Mainnet
const ENTRY_POINT_ADDRESS = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789';

// Default UserOperation structure for testing
const DEFAULT_USER_OP = {
  sender: '0x0000000000000000000000000000000000000000',
  nonce: 0,
  initCode: '0x',
  callData: '0x',
  callGasLimit: 100000,
  verificationGasLimit: 100000,
  preVerificationGas: 21000,
  maxFeePerGas: 1500000000, // 1.5 gwei
  maxPriorityFeePerGas: 1500000000, // 1.5 gwei
  paymasterAndData: '0x',
  signature: '0x'
};

/**
 * Create a mock EntryPoint for testing
 * @returns {Object} Mock EntryPoint contract with test methods
 */
function createMockEntryPoint() {
  // Mock implementation of EntryPoint
  const mockEntryPoint = {
    address: ENTRY_POINT_ADDRESS,
    provider: null,
    _balances: new Map(),
    _nextNonce: new Map(),
    _successfulOps: [],
    _failedOps: [],
    
    // Mock implementation of handleOps
    async handleOps(userOps, beneficiary) {
      
      const results = [];
      for (const userOp of userOps) {
        try {
          // Basic validation
          await this.validateUserOp(userOp);
          
          // Track successful op
          this._successfulOps.push(userOp);
          results.push({ success: true, userOp });
          
          // Update nonce
          const currentNonce = this._nextNonce.get(userOp.sender) || 0;
          this._nextNonce.set(userOp.sender, currentNonce + 1);
          
        } catch (error) {
          // Track failed op
          this._failedOps.push({ userOp, error: error.message });
          results.push({ success: false, error: error.message, userOp });
          
        }
      }
      
      return results;
    },
    
    // Validate a UserOperation
    async validateUserOp(userOp) {
      // Check nonce
      const expectedNonce = this._nextNonce.get(userOp.sender) || 0;
      if (userOp.nonce !== expectedNonce) {
        throw new Error(`Invalid nonce: expected ${expectedNonce}, got ${userOp.nonce}`);
      }
      
      // Check signature length - simplified validation
      if (!userOp.signature || userOp.signature.length < 66) { // At least 32 bytes + '0x'
        throw new Error('Invalid signature: too short');
      }
      
      // Check sender has funds
      const balance = this._balances.get(userOp.sender) || 0;
      const requiredFunds = userOp.callGasLimit * userOp.maxFeePerGas;
      if (balance < requiredFunds) {
        throw new Error(`Insufficient funds: ${balance} < ${requiredFunds}`);
      }
      
      return true;
    },
    
    // Check balance
    async balanceOf(account) {
      return this._balances.get(account) || 0;
    },
    
    // Deposit funds
    async depositTo(account, value) {
      const currentBalance = this._balances.get(account) || 0;
      this._balances.set(account, currentBalance + value);
      return true;
    },
    
    // Helper to format ops for testing
    getSuccessfulOps() {
      return this._successfulOps;
    },
    
    getFailedOps() {
      return this._failedOps;
    }
  };
  
  return mockEntryPoint;
}

/**
 * Connect to a forked Goerli network
 * @param {Object} options - Connection options
 * @returns {Promise<Object>} Ethers provider and EntryPoint contract
 */
async function connectToForkedGoerli(options = {}) {
  const rpcUrl = options.rpcUrl || process.env.FORKED_GOERLI_RPC || 'http://localhost:8545';
  
  
  try {
    // Create provider
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    
    // Check connection
    const network = await provider.getNetwork();
    
    // Create wallet from private key or use a random one
    const privateKey = options.privateKey || process.env.PRIVATE_KEY || ethers.Wallet.createRandom().privateKey;
    const wallet = new ethers.Wallet(privateKey, provider);
    
    // Create EntryPoint contract instance
    const entryPoint = new ethers.Contract(
      options.entryPointAddress || ENTRY_POINT_ADDRESS,
      ENTRY_POINT_ABI,
      wallet
    );
    
    return { provider, wallet, entryPoint };
  } catch (error) {
    console.error(`Failed to connect to forked Goerli: ${error.message}`);
    throw error;
  }
}

/**
 * Create a UserOperation object with the specified overrides
 * @param {Object} overrides - Properties to override in the default UserOp
 * @returns {Object} UserOperation object
 */
function createUserOp(overrides = {}) {
  return {
    ...DEFAULT_USER_OP,
    ...overrides,
    // Convert numbers to hex strings as required by the contract
    nonce: ethers.utils.hexlify(overrides.nonce || DEFAULT_USER_OP.nonce),
    callGasLimit: ethers.utils.hexlify(overrides.callGasLimit || DEFAULT_USER_OP.callGasLimit),
    verificationGasLimit: ethers.utils.hexlify(overrides.verificationGasLimit || DEFAULT_USER_OP.verificationGasLimit),
    preVerificationGas: ethers.utils.hexlify(overrides.preVerificationGas || DEFAULT_USER_OP.preVerificationGas),
    maxFeePerGas: ethers.utils.hexlify(overrides.maxFeePerGas || DEFAULT_USER_OP.maxFeePerGas),
    maxPriorityFeePerGas: ethers.utils.hexlify(overrides.maxPriorityFeePerGas || DEFAULT_USER_OP.maxPriorityFeePerGas),
  };
}

/**
 * Get Pimlico-specific helper tools
 * @returns {Object} Pimlico utilities
 */
function getPimlicoHelpers() {
  return {
    /**
     * Create a paymaster-sponsored UserOperation for Pimlico
     * @param {Object} userOp - Base UserOperation
     * @param {Object} options - Paymaster options
     * @returns {Object} UserOperation with paymaster data
     */
    addPimlicoPaymaster(userOp, options = {}) {
      const paymasterAddress = options.paymasterAddress || '0x9876543210987654321098765432109876543210';
      
      // This is a simplified version - in production you'd use actual Pimlico API
      const paymasterAndData = `0x${paymasterAddress.slice(2)}000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`;
      
      return {
        ...userOp,
        paymasterAndData
      };
    }
  };
}

/**
 * Start a forked network using hardhat
 * @param {Object} options - Hardhat options
 * @returns {Promise<Object>} Server info
 */
async function startForkedNetwork(options = {}) {
  try {
    
    // Check if hardhat is installed
    try {
      const hardhatPath = require.resolve('hardhat', { paths: [process.cwd()] });
      const hardhat = require(hardhatPath);
      
      // Create hardhat config on the fly if none exists
      const configPath = path.join(process.cwd(), 'hardhat.config.js');
      
      if (!fs.existsSync(configPath)) {
        const tempConfig = `
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        url: "${options.forkUrl || 'https://eth-goerli.g.alchemy.com/v2/demo'}",
        blockNumber: ${options.blockNumber || 8483100}
      },
      mining: {
        auto: ${options.autoMine !== false},
        interval: ${options.interval || 0}
      }
    }
  }
};`;
        fs.writeFileSync(configPath, tempConfig);
      }
      
      // Start hardhat node
      const { spawn } = require('child_process');
      const hardhatNode = spawn('npx', ['hardhat', 'node'], {
        stdio: ['ignore', 'pipe', 'pipe']
      });
      
      return {
        process: hardhatNode,
        rpcUrl: 'http://localhost:8545',
        stop: () => {
          hardhatNode.kill();
        }
      };
    } catch (error) {
      console.error(`Hardhat not found: ${error.message}`);
      throw new Error('Hardhat not installed');
    }
  } catch (error) {
    console.error(`Failed to start forked network: ${error.message}`);
    throw error;
  }
}

module.exports = {
  createMockEntryPoint,
  connectToForkedGoerli,
  createUserOp,
  getPimlicoHelpers,
  startForkedNetwork,
  ENTRY_POINT_ADDRESS,
  DEFAULT_USER_OP
}; 