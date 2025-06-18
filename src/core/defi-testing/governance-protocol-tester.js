/**
 * Governance Protocol Tester
 *
 * Test module for DAO and governance protocols, focusing on security, voting mechanisms,
 * timelock controls, and protocol upgrade paths.
 */

const ethers = require('ethers');
const fs = require('fs-extra');
const path = require('path');

// Common governance protocol interfaces
const governorInterface = [
  'function name() view returns (string)',
  'function version() view returns (string)',
  'function votingDelay() view returns (uint256)',
  'function votingPeriod() view returns (uint256)',
  'function quorumVotes() view returns (uint256)',
  'function propose(address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, string description) returns (uint256)',
  'function queue(uint256 proposalId)',
  'function execute(uint256 proposalId)',
  'function cancel(uint256 proposalId)',
  'function getActions(uint256 proposalId) view returns (address[] targets, uint256[] values, string[] signatures, bytes[] calldatas)',
  'function getReceipt(uint256 proposalId, address voter) view returns (tuple(bool hasVoted, uint8 support, uint96 votes))',
  'function state(uint256 proposalId) view returns (uint8)',
  'function castVote(uint256 proposalId, uint8 support)',
  'function castVoteWithReason(uint256 proposalId, uint8 support, string reason)',
];

const timelockInterface = [
  'function delay() view returns (uint256)',
  'function GRACE_PERIOD() view returns (uint256)',
  'function acceptAdmin()',
  'function queuedTransactions(bytes32) view returns (bool)',
  'function queueTransaction(address target, uint256 value, string signature, bytes data, uint256 eta) returns (bytes32)',
  'function cancelTransaction(address target, uint256 value, string signature, bytes data, uint256 eta)',
  'function executeTransaction(address target, uint256 value, string signature, bytes data, uint256 eta) payable returns (bytes)',
];

const tokenInterface = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'function transfer(address recipient, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)',
  'function delegates(address delegator) view returns (address)',
  'function delegate(address delegatee)',
  'function delegateBySig(address delegatee, uint256 nonce, uint256 expiry, uint8 v, bytes32 r, bytes32 s)',
  'function getCurrentVotes(address account) view returns (uint96)',
  'function getPriorVotes(address account, uint256 blockNumber) view returns (uint96)',
];

// Known governance protocols
const GOVERNANCE_PROTOCOLS = {
  COMPOUND: {
    name: 'Compound',
    interfaces: {
      governor: [
        ...governorInterface,
        'function __acceptAdmin()',
        'function _setVotingDelay(uint256 newVotingDelay)',
        'function _setVotingPeriod(uint256 newVotingPeriod)',
        'function _setProposalThreshold(uint256 newProposalThreshold)',
      ],
      timelock: timelockInterface,
      token: tokenInterface,
    },
  },
  UNISWAP: {
    name: 'Uniswap',
    interfaces: {
      governor: [
        ...governorInterface,
        'function proposalThreshold() view returns (uint256)',
        'function proposalMaxOperations() view returns (uint256)',
      ],
      timelock: timelockInterface,
      token: tokenInterface,
    },
  },
  AAVE: {
    name: 'Aave',
    interfaces: {
      governor: [
        'function create(address executor, address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, bool[] withDelegatecalls, bytes32 ipfsHash) returns (uint256)',
        'function cancel(uint256 proposalId)',
        'function queue(uint256 proposalId)',
        'function execute(uint256 proposalId)',
        'function submitVote(uint256 proposalId, bool support)',
        'function submitVoteBySignature(uint256 proposalId, bool support, uint8 v, bytes32 r, bytes32 s)',
        'function getProposalById(uint256 proposalId) view returns (tuple(uint256 id, address creator, address executor, address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, bool[] withDelegatecalls, uint256 startBlock, uint256 endBlock, uint256 executionTime, uint256 forVotes, uint256 againstVotes, bool executed, bool canceled, address strategy, bytes32 ipfsHash))',
        'function getVotingSupplyAt(uint256 blockNumber) view returns (uint256)',
        'function getProposalState(uint256 proposalId) view returns (uint8)',
      ],
      executor: [
        'function delay() view returns (uint256)',
        'function GRACE_PERIOD() view returns (uint256)',
        'function queueTransaction(address target, uint256 value, string signature, bytes data, uint256 executionTime, bool withDelegatecall) returns (bytes32)',
        'function executeTransaction(address target, uint256 value, string signature, bytes data, uint256 executionTime, bool withDelegatecall) returns (bytes)',
      ],
    },
  },
  MAKERDAO: {
    name: 'MakerDAO',
    interfaces: {
      chief: [
        'function vote(address[] slate)',
        'function vote(bytes32 slate)',
        'function lock(uint256 wad)',
        'function free(uint256 wad)',
        'function deposits(address) view returns (uint256)',
        'function approvals(address) view returns (uint256)',
        'function hat() view returns (address)',
      ],
      pause: [
        'function delay() view returns (uint256)',
        'function plot(address target, bytes32 signature, bytes data, uint256 eta)',
        'function exec(address target, bytes32 signature, bytes data, uint256 eta)',
      ],
    },
  },
};

class GovernanceProtocolTester {
  /**
   * Create a new Governance Protocol Tester
   * @param {Object} config - Configuration
   */
  constructor(config = {}) {
    this.config = {
      provider: config.provider || null,
      providerUrl: config.providerUrl || 'http://localhost:8545',
      privateKey: config.privateKey || null,
      chainId: config.chainId || 1,
      resultsDir: config.resultsDir || path.join(process.cwd(), 'test-results', 'governance'),
      timeout: config.timeout || 30000,
      protocolType: config.protocolType || null,
      addresses: config.addresses || {},
      logLevel: config.logLevel || 'info',
      ...config,
    };

    this.provider = null;
    this.signer = null;
    this.initialized = false;
    this.contracts = {};

    // Create results directory
    fs.ensureDirSync(this.config.resultsDir);
  }

  /**
   * Initialize the tester
   * @returns {Promise<boolean>} Initialization status
   */
  async initialize() {
    try {
      // Set up provider
      if (this.config.provider) {
        this.provider = this.config.provider;
      } else {
        this.provider = new ethers.providers.JsonRpcProvider(this.config.providerUrl);
      }

      // Set up signer if private key is provided
      if (this.config.privateKey) {
        this.signer = new ethers.Wallet(this.config.privateKey, this.provider);
      }

      // Check connection
      await this.provider.getNetwork();

      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize Governance Protocol Tester:', error);
      return false;
    }
  }

  /**
   * Log a message
   * @param {string} message - Message to log
   * @param {string} level - Log level
   */
  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

    // Only log if level is appropriate
    const logLevels = { error: 0, warn: 1, info: 2, debug: 3 };
    const configLevel = logLevels[this.config.logLevel] || 2;
    const messageLevel = logLevels[level] || 2;

    if (messageLevel <= configLevel) {
    }
  }

  /**
   * Set up contract instances based on protocol type
   * @param {Object} addresses - Contract addresses
   * @returns {Promise<Object>} Contract instances
   */
  async setupContracts(addresses = {}) {
    if (!this.initialized) {
      await this.initialize();
    }

    // Combine provided addresses with config addresses
    const contractAddresses = { ...this.config.addresses, ...addresses };

    // Validate protocol type
    const protocolType = this.config.protocolType?.toUpperCase();
    if (!protocolType || !GOVERNANCE_PROTOCOLS[protocolType]) {
      throw new Error(`Invalid protocol type: ${protocolType}`);
    }

    try {
      const protocol = GOVERNANCE_PROTOCOLS[protocolType];
      const contracts = {};

      // Create contract instances based on protocol type
      switch (protocolType) {
        case 'COMPOUND':
        case 'UNISWAP':
          if (contractAddresses.governor) {
            contracts.governor = new ethers.Contract(
              contractAddresses.governor,
              protocol.interfaces.governor,
              this.provider
            );
          }

          if (contractAddresses.timelock) {
            contracts.timelock = new ethers.Contract(
              contractAddresses.timelock,
              protocol.interfaces.timelock,
              this.provider
            );
          }

          if (contractAddresses.token) {
            contracts.token = new ethers.Contract(
              contractAddresses.token,
              protocol.interfaces.token,
              this.provider
            );
          }
          break;

        case 'AAVE':
          if (contractAddresses.governor) {
            contracts.governor = new ethers.Contract(
              contractAddresses.governor,
              protocol.interfaces.governor,
              this.provider
            );
          }

          if (contractAddresses.executor) {
            contracts.executor = new ethers.Contract(
              contractAddresses.executor,
              protocol.interfaces.executor,
              this.provider
            );
          }
          break;

        case 'MAKERDAO':
          if (contractAddresses.chief) {
            contracts.chief = new ethers.Contract(
              contractAddresses.chief,
              protocol.interfaces.chief,
              this.provider
            );
          }

          if (contractAddresses.pause) {
            contracts.pause = new ethers.Contract(
              contractAddresses.pause,
              protocol.interfaces.pause,
              this.provider
            );
          }
          break;
      }

      this.contracts = contracts;

      return contracts;
    } catch (error) {
      this.log(`Failed to set up contracts: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Test governance parameters
   * @returns {Promise<Object>} Test results
   */
  async testGovernanceParameters() {
    if (!this.initialized) {
      await this.initialize();
    }

    if (Object.keys(this.contracts).length === 0) {
      throw new Error('Contracts not set up. Call setupContracts first.');
    }

    try {
      const results = {
        protocol: this.config.protocolType,
        parameters: {},
        securityAssessment: {},
        recommendations: [],
      };

      const protocolType = this.config.protocolType?.toUpperCase();

      switch (protocolType) {
        case 'COMPOUND':
        case 'UNISWAP': {
          // Test governor parameters
          if (this.contracts.governor) {
            try {
              results.parameters.name = await this.contracts.governor.name();
            } catch (error) {
              this.log(`Error getting governor name: ${error.message}`, 'warn');
            }

            try {
              results.parameters.votingDelay = (
                await this.contracts.governor.votingDelay()
              ).toString();
              // Convert to approximate time
              const votingDelayBlocks = parseInt(results.parameters.votingDelay);
              results.parameters.votingDelayTime = `~${(votingDelayBlocks * 15) / 60} hours`;
            } catch (error) {
              this.log(`Error getting voting delay: ${error.message}`, 'warn');
            }

            try {
              results.parameters.votingPeriod = (
                await this.contracts.governor.votingPeriod()
              ).toString();
              // Convert to approximate time
              const votingPeriodBlocks = parseInt(results.parameters.votingPeriod);
              results.parameters.votingPeriodTime = `~${(votingPeriodBlocks * 15) / (60 * 24)} days`;
            } catch (error) {
              this.log(`Error getting voting period: ${error.message}`, 'warn');
            }

            try {
              results.parameters.quorumVotes = (
                await this.contracts.governor.quorumVotes()
              ).toString();

              // If we have token info, calculate percentage
              if (this.contracts.token) {
                const totalSupply = await this.contracts.token.totalSupply();
                const quorumPercentage =
                  (Number(results.parameters.quorumVotes) * 100) / Number(totalSupply);
                results.parameters.quorumPercentage = `${quorumPercentage.toFixed(2)}%`;
              }
            } catch (error) {
              this.log(`Error getting quorum votes: ${error.message}`, 'warn');
            }
          }

          // Test timelock parameters
          if (this.contracts.timelock) {
            try {
              results.parameters.timelockDelay = (await this.contracts.timelock.delay()).toString();
              // Convert to human-readable time
              const delaySeconds = parseInt(results.parameters.timelockDelay);
              results.parameters.timelockDelayTime = `${delaySeconds / (60 * 60)} hours`;
            } catch (error) {
              this.log(`Error getting timelock delay: ${error.message}`, 'warn');
            }

            try {
              results.parameters.timelockGracePeriod = (
                await this.contracts.timelock.GRACE_PERIOD()
              ).toString();
              // Convert to human-readable time
              const gracePeriodSeconds = parseInt(results.parameters.timelockGracePeriod);
              results.parameters.timelockGracePeriodTime = `${gracePeriodSeconds / (60 * 60 * 24)} days`;
            } catch (error) {
              this.log(`Error getting timelock grace period: ${error.message}`, 'warn');
            }
          }

          // Assess security based on parameters
          if (results.parameters.votingDelay) {
            const votingDelayBlocks = parseInt(results.parameters.votingDelay);
            if (votingDelayBlocks < 1) {
              results.securityAssessment.votingDelay = 'CRITICAL: No voting delay';
              results.recommendations.push(
                'Implement a voting delay to prevent flash loan attacks'
              );
            } else if (votingDelayBlocks < 10) {
              results.securityAssessment.votingDelay = 'WARNING: Short voting delay';
              results.recommendations.push(
                'Consider increasing voting delay to prevent last-block attacks'
              );
            } else {
              results.securityAssessment.votingDelay = 'OK';
            }
          }

          if (results.parameters.votingPeriod) {
            const votingPeriodBlocks = parseInt(results.parameters.votingPeriod);
            if (votingPeriodBlocks < 1000) {
              // Roughly less than 4 hours
              results.securityAssessment.votingPeriod = 'WARNING: Short voting period';
              results.recommendations.push(
                'Consider increasing voting period to allow adequate time for voters'
              );
            } else {
              results.securityAssessment.votingPeriod = 'OK';
            }
          }

          if (results.parameters.timelockDelay) {
            const delaySeconds = parseInt(results.parameters.timelockDelay);
            if (delaySeconds < 60 * 60) {
              // Less than 1 hour
              results.securityAssessment.timelockDelay = 'CRITICAL: Very short timelock delay';
              results.recommendations.push(
                'Increase timelock delay to at least 24 hours for security'
              );
            } else if (delaySeconds < 60 * 60 * 24) {
              // Less than 24 hours
              results.securityAssessment.timelockDelay = 'WARNING: Short timelock delay';
              results.recommendations.push('Consider increasing timelock delay to 24-48 hours');
            } else {
              results.securityAssessment.timelockDelay = 'OK';
            }
          }

          if (results.parameters.quorumPercentage) {
            const quorumPct = parseFloat(results.parameters.quorumPercentage);
            if (quorumPct < 1) {
              results.securityAssessment.quorum = 'CRITICAL: Very low quorum requirement';
              results.recommendations.push(
                'Increase quorum requirement to prevent governance attacks'
              );
            } else if (quorumPct < 4) {
              results.securityAssessment.quorum = 'WARNING: Low quorum requirement';
              results.recommendations.push('Consider increasing quorum requirement');
            } else {
              results.securityAssessment.quorum = 'OK';
            }
          }
          break;
        }

        case 'AAVE': {
          // Test Aave governance parameters
          if (this.contracts.governor) {
            // For Aave, we need to get parameters from a proposal to analyze
            // Find at least one proposal
            try {
              // Try to get a recent proposal (this is simplified)
              const proposalId = 1; // This would be dynamic in a real implementation
              const proposal = await this.contracts.governor.getProposalById(proposalId);

              results.parameters.startBlock = proposal.startBlock.toString();
              results.parameters.endBlock = proposal.endBlock.toString();

              // Calculate voting period in blocks
              const votingPeriod = proposal.endBlock.sub(proposal.startBlock).toString();
              results.parameters.votingPeriod = votingPeriod;

              // Convert to approximate time
              const votingPeriodBlocks = parseInt(votingPeriod);
              results.parameters.votingPeriodTime = `~${(votingPeriodBlocks * 15) / (60 * 24)} days`;
            } catch (error) {
              this.log(`Error getting Aave proposal details: ${error.message}`, 'warn');
            }
          }

          // Test executor parameters
          if (this.contracts.executor) {
            try {
              results.parameters.executorDelay = (await this.contracts.executor.delay()).toString();
              // Convert to human-readable time
              const delaySeconds = parseInt(results.parameters.executorDelay);
              results.parameters.executorDelayTime = `${delaySeconds / (60 * 60)} hours`;
            } catch (error) {
              this.log(`Error getting executor delay: ${error.message}`, 'warn');
            }

            try {
              results.parameters.executorGracePeriod = (
                await this.contracts.executor.GRACE_PERIOD()
              ).toString();
              // Convert to human-readable time
              const gracePeriodSeconds = parseInt(results.parameters.executorGracePeriod);
              results.parameters.executorGracePeriodTime = `${gracePeriodSeconds / (60 * 60 * 24)} days`;
            } catch (error) {
              this.log(`Error getting executor grace period: ${error.message}`, 'warn');
            }
          }

          // Assess security based on parameters
          if (results.parameters.votingPeriod) {
            const votingPeriodBlocks = parseInt(results.parameters.votingPeriod);
            if (votingPeriodBlocks < 1000) {
              // Roughly less than 4 hours
              results.securityAssessment.votingPeriod = 'WARNING: Short voting period';
              results.recommendations.push(
                'Consider increasing voting period to allow adequate time for voters'
              );
            } else {
              results.securityAssessment.votingPeriod = 'OK';
            }
          }

          if (results.parameters.executorDelay) {
            const delaySeconds = parseInt(results.parameters.executorDelay);
            if (delaySeconds < 60 * 60) {
              // Less than 1 hour
              results.securityAssessment.executorDelay = 'CRITICAL: Very short executor delay';
              results.recommendations.push(
                'Increase executor delay to at least 24 hours for security'
              );
            } else if (delaySeconds < 60 * 60 * 24) {
              // Less than 24 hours
              results.securityAssessment.executorDelay = 'WARNING: Short executor delay';
              results.recommendations.push('Consider increasing executor delay to 24-48 hours');
            } else {
              results.securityAssessment.executorDelay = 'OK';
            }
          }
          break;
        }

        case 'MAKERDAO': {
          // Test MakerDAO governance parameters
          if (this.contracts.chief) {
            try {
              results.parameters.hat = await this.contracts.chief.hat();
            } catch (error) {
              this.log(`Error getting MakerDAO hat: ${error.message}`, 'warn');
            }
          }

          if (this.contracts.pause) {
            try {
              results.parameters.delay = (await this.contracts.pause.delay()).toString();
              // Convert to human-readable time
              const delaySeconds = parseInt(results.parameters.delay);
              results.parameters.delayTime = `${delaySeconds / (60 * 60)} hours`;
            } catch (error) {
              this.log(`Error getting MakerDAO delay: ${error.message}`, 'warn');
            }
          }

          // Assess security based on parameters
          if (results.parameters.delay) {
            const delaySeconds = parseInt(results.parameters.delay);
            if (delaySeconds < 60 * 60) {
              // Less than 1 hour
              results.securityAssessment.delay = 'CRITICAL: Very short delay';
              results.recommendations.push('Increase delay to at least 24 hours for security');
            } else if (delaySeconds < 60 * 60 * 24) {
              // Less than 24 hours
              results.securityAssessment.delay = 'WARNING: Short delay';
              results.recommendations.push('Consider increasing delay to 24-48 hours');
            } else {
              results.securityAssessment.delay = 'OK';
            }
          }
          break;
        }
      }

      return results;
    } catch (error) {
      this.log(`Error testing governance parameters: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Test governance token distribution
   * @returns {Promise<Object>} Test results
   */
  async testTokenDistribution() {
    if (!this.initialized) {
      await this.initialize();
    }

    if (Object.keys(this.contracts).length === 0) {
      throw new Error('Contracts not set up. Call setupContracts first.');
    }

    try {
      const results = {
        protocol: this.config.protocolType,
        tokenInfo: {},
        distribution: {
          topHolders: [],
          concentrationRisk: 'Unknown',
        },
        recommendations: [],
      };

      // Only proceed if we have a token contract
      if (!this.contracts.token) {
        results.error = 'No token contract available for analysis';
        return results;
      }

      // Get token info
      try {
        results.tokenInfo.name = await this.contracts.token.name();
        results.tokenInfo.symbol = await this.contracts.token.symbol();
        results.tokenInfo.decimals = (await this.contracts.token.decimals()).toString();

        const totalSupply = await this.contracts.token.totalSupply();
        const decimals = parseInt(results.tokenInfo.decimals);

        results.tokenInfo.totalSupply = totalSupply.toString();
        results.tokenInfo.formattedTotalSupply = (
          Number(totalSupply) /
          10 ** decimals
        ).toLocaleString();
      } catch (error) {
        this.log(`Error getting token info: ${error.message}`, 'warn');
      }

      // In a real implementation, we would query the blockchain or APIs to get top token holders
      // For this example, we'll simulate it
      results.distribution.topHolders = [
        {
          address: '0x1111111111111111111111111111111111111111',
          balance: '10000000000000000000000',
          percentage: '10.00%',
        },
        {
          address: '0x2222222222222222222222222222222222222222',
          balance: '8000000000000000000000',
          percentage: '8.00%',
        },
        {
          address: '0x3333333333333333333333333333333333333333',
          balance: '5000000000000000000000',
          percentage: '5.00%',
        },
        {
          address: '0x4444444444444444444444444444444444444444',
          balance: '3000000000000000000000',
          percentage: '3.00%',
        },
        {
          address: '0x5555555555555555555555555555555555555555',
          balance: '2500000000000000000000',
          percentage: '2.50%',
        },
      ];

      // Calculate concentration percentage (top 5 holders)
      const totalPercentage = results.distribution.topHolders.reduce(
        (sum, holder) => sum + parseFloat(holder.percentage),
        0
      );

      results.distribution.topHoldersPercentage = `${totalPercentage.toFixed(2)}%`;

      // Assess concentration risk
      if (totalPercentage > 50) {
        results.distribution.concentrationRisk = 'HIGH';
        results.recommendations.push(
          'High concentration risk: Top 5 holders control over 50% of tokens'
        );
      } else if (totalPercentage > 33) {
        results.distribution.concentrationRisk = 'MEDIUM';
        results.recommendations.push(
          'Medium concentration risk: Top 5 holders control over 33% of tokens'
        );
      } else {
        results.distribution.concentrationRisk = 'LOW';
      }

      return results;
    } catch (error) {
      this.log(`Error testing token distribution: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Test access control security
   * @returns {Promise<Object>} Test results
   */
  async testAccessControlSecurity() {
    if (!this.initialized) {
      await this.initialize();
    }

    if (Object.keys(this.contracts).length === 0) {
      throw new Error('Contracts not set up. Call setupContracts first.');
    }

    try {
      const results = {
        protocol: this.config.protocolType,
        accessControl: {},
        securityRisks: [],
        recommendations: [],
      };

      const protocolType = this.config.protocolType?.toUpperCase();

      switch (protocolType) {
        case 'COMPOUND':
        case 'UNISWAP': {
          // Check timelock admin
          if (this.contracts.timelock) {
            try {
              const adminSlot = await this.provider.getStorageAt(
                this.contracts.timelock.address,
                '0x0000000000000000000000000000000000000000000000000000000000000000'
              );

              const admin = ethers.utils.getAddress('0x' + adminSlot.slice(26));
              results.accessControl.timelockAdmin = admin;

              // Check if admin is the expected governor
              if (
                this.contracts.governor &&
                admin.toLowerCase() !== this.contracts.governor.address.toLowerCase()
              ) {
                results.securityRisks.push('Timelock admin is not the governance contract');
                results.recommendations.push('Update timelock admin to be the governance contract');
              }
            } catch (error) {
              this.log(`Error checking timelock admin: ${error.message}`, 'warn');
            }
          }

          // Check for guardian/admin functions in the governor
          if (this.contracts.governor) {
            const guardianFunctions = [
              '__acceptAdmin',
              '_setVotingDelay',
              '_setVotingPeriod',
              '_setProposalThreshold',
            ];

            for (const func of guardianFunctions) {
              try {
                if (typeof this.contracts.governor[func] === 'function') {
                  results.accessControl.guardianFunctions =
                    results.accessControl.guardianFunctions || [];
                  results.accessControl.guardianFunctions.push(func);

                  results.securityRisks.push(`Governor has privileged function: ${func}`);
                  results.recommendations.push(`Ensure the ${func} function is properly secured`);
                }
              } catch (error) {
                // Function doesn't exist, which is ok
              }
            }
          }
          break;
        }

        case 'AAVE': {
          // Check executor permissions
          if (this.contracts.executor) {
            try {
              // This is a simplified check - real implementation would be more thorough
              results.accessControl.executorType = 'Short Executor or Long Executor';

              // Check if the executor has a guardian
              const guardianSlot = await this.provider.getStorageAt(
                this.contracts.executor.address,
                '0x0000000000000000000000000000000000000000000000000000000000000004'
              );

              const guardian = ethers.utils.getAddress('0x' + guardianSlot.slice(26));

              if (guardian !== ethers.constants.AddressZero) {
                results.accessControl.guardian = guardian;
                results.securityRisks.push('Executor has a guardian that can bypass timelock');
                results.recommendations.push('Consider removing guardian for decentralization');
              }
            } catch (error) {
              this.log(`Error checking Aave executor permissions: ${error.message}`, 'warn');
            }
          }
          break;
        }

        case 'MAKERDAO': {
          // Check Chief hat
          if (this.contracts.chief) {
            try {
              const hat = await this.contracts.chief.hat();
              results.accessControl.hat = hat;

              if (hat === ethers.constants.AddressZero) {
                results.securityRisks.push('No active hat (executive contract)');
                results.recommendations.push('Set a hat to enable governance functions');
              }
            } catch (error) {
              this.log(`Error checking MakerDAO chief hat: ${error.message}`, 'warn');
            }
          }
          break;
        }
      }

      return results;
    } catch (error) {
      this.log(`Error testing access control security: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Run a comprehensive governance security test
   * @param {Object} addresses - Contract addresses
   * @returns {Promise<Object>} Comprehensive test results
   */
  async runComprehensiveTest(addresses = {}) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const startTime = Date.now();

      // Set up contracts
      await this.setupContracts(addresses);

      // Run all tests
      const parametersResults = await this.testGovernanceParameters();
      const distributionResults = await this.testTokenDistribution();
      const accessControlResults = await this.testAccessControlSecurity();

      // Compile comprehensive results
      const results = {
        protocol: this.config.protocolType,
        addresses: { ...this.config.addresses, ...addresses },
        timestamp: new Date().toISOString(),
        executionTime: Date.now() - startTime,
        parameters: parametersResults,
        distribution: distributionResults,
        accessControl: accessControlResults,
        summary: {
          securityScore: 0,
          highRiskIssues: [],
          mediumRiskIssues: [],
          recommendations: [],
        },
      };

      // Compile all security risks
      const allRisks = [
        ...(parametersResults.securityAssessment
          ? Object.entries(parametersResults.securityAssessment)
              .filter(([_, value]) => value.startsWith('CRITICAL') || value.startsWith('WARNING'))
              .map(([key, value]) => ({ parameter: key, risk: value }))
          : []),
        ...(distributionResults.distribution?.concentrationRisk === 'HIGH'
          ? [
              {
                parameter: 'tokenConcentration',
                risk:
                  'HIGH: ' +
                  distributionResults.distribution.topHoldersPercentage +
                  ' held by top 5 addresses',
              },
            ]
          : []),
        ...(accessControlResults.securityRisks
          ? accessControlResults.securityRisks.map(risk => ({ parameter: 'accessControl', risk }))
          : []),
      ];

      // Separate high and medium risk issues
      results.summary.highRiskIssues = allRisks
        .filter(risk => risk.risk.startsWith('CRITICAL') || risk.risk.startsWith('HIGH'))
        .map(risk => risk.risk);

      results.summary.mediumRiskIssues = allRisks
        .filter(risk => risk.risk.startsWith('WARNING') || risk.risk.startsWith('MEDIUM'))
        .map(risk => risk.risk);

      // Compile all recommendations
      results.summary.recommendations = [
        ...(parametersResults.recommendations || []),
        ...(distributionResults.recommendations || []),
        ...(accessControlResults.recommendations || []),
      ];

      // Calculate security score (simplified)
      const highRiskCount = results.summary.highRiskIssues.length;
      const mediumRiskCount = results.summary.mediumRiskIssues.length;

      // Score from 0-100
      results.summary.securityScore = Math.max(0, 100 - highRiskCount * 20 - mediumRiskCount * 5);

      // Add security rating
      if (results.summary.securityScore >= 80) {
        results.summary.securityRating = 'GOOD';
      } else if (results.summary.securityScore >= 60) {
        results.summary.securityRating = 'MODERATE';
      } else {
        results.summary.securityRating = 'POOR';
      }

      // Save results to file
      const resultsPath = path.join(
        this.config.resultsDir,
        `${this.config.protocolType}_${Date.now()}.json`
      );

      await fs.writeJson(resultsPath, results, { spaces: 2 });
      results.resultsSaved = resultsPath;

      return results;
    } catch (error) {
      this.log(`Error running comprehensive test: ${error.message}`, 'error');
      throw error;
    }
  }
}

module.exports = {
  GovernanceProtocolTester,
  GOVERNANCE_PROTOCOLS,
};
