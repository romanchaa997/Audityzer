/**
 * Automated Market Maker (AMM) Protocol Test Suite
 *
 * Specialized tests for AMM protocols like Uniswap, Curve, Balancer and other DEXes.
 * This module focuses on security validation patterns specific to automated market makers.
 */

const ethers = require('ethers');
const fs = require('fs-extra');
const path = require('path');

// Protocol-specific ABIs
const uniswapV2PairAbi = [
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
  'function token0() external view returns (address)',
  'function token1() external view returns (address)',
  'function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external',
  'function price0CumulativeLast() external view returns (uint)',
  'function price1CumulativeLast() external view returns (uint)',
  'function kLast() external view returns (uint)',
];

const uniswapV3PoolAbi = [
  'function token0() external view returns (address)',
  'function token1() external view returns (address)',
  'function fee() external view returns (uint24)',
  'function tickSpacing() external view returns (int24)',
  'function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)',
  'function liquidity() external view returns (uint128)',
];

// Predefined AMM protocols
const AMM_PROTOCOLS = {
  UNISWAP_V2: 'uniswap-v2',
  UNISWAP_V3: 'uniswap-v3',
  SUSHISWAP: 'sushiswap',
  CURVE: 'curve',
  BALANCER: 'balancer',
  CUSTOM: 'custom',
};

// Known protocol factories and routers
const PROTOCOL_DEPLOYMENTS = {
  // Ethereum Mainnet
  1: {
    [AMM_PROTOCOLS.UNISWAP_V2]: {
      factory: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
      router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    },
    [AMM_PROTOCOLS.UNISWAP_V3]: {
      factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
      router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
      quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
    },
    [AMM_PROTOCOLS.SUSHISWAP]: {
      factory: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
      router: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
    },
  },
  // Polygon Mainnet
  137: {
    [AMM_PROTOCOLS.UNISWAP_V3]: {
      factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
      router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
      quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
    },
    [AMM_PROTOCOLS.SUSHISWAP]: {
      factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
      router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    },
  },
  // Base Mainnet
  8453: {
    [AMM_PROTOCOLS.UNISWAP_V3]: {
      factory: '0x33128a8fC17869897dcE68Ed026d694621f6FDfD',
      router: '0x2626664c2603336E57B271c5C0b26F421741e481',
      quoter: '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
    },
  },
};

class AMMProtocolTester {
  /**
   * Create a new AMM Protocol Tester
   * @param {Object} config - Configuration object
   */
  constructor(config = {}) {
    this.config = {
      protocol: config.protocol || AMM_PROTOCOLS.UNISWAP_V3,
      chainId: config.chainId || 1,
      rpcUrl: config.rpcUrl || 'https://mainnet.infura.io/v3/your-infura-key',
      privateKey: config.privateKey,
      mnemonic: config.mnemonic,
      customAddresses: config.customAddresses || {},
      gasLimit: config.gasLimit || 3000000,
      outputDir: config.outputDir || path.join(process.cwd(), 'reports', 'defi', 'amm'),
      ...config,
    };

    // Initialize provider
    if (config.provider) {
      this.provider = config.provider;
    } else {
      this.provider = new ethers.providers.JsonRpcProvider(this.config.rpcUrl);
    }

    // Initialize signer
    if (config.signer) {
      this.signer = config.signer;
    } else if (this.config.privateKey) {
      this.signer = new ethers.Wallet(this.config.privateKey, this.provider);
    } else if (this.config.mnemonic) {
      this.signer = ethers.Wallet.fromMnemonic(this.config.mnemonic).connect(this.provider);
    } else {
      this.signer = null; // Read-only mode
    }

    // Create output directory if it doesn't exist
    fs.ensureDirSync(this.config.outputDir);

    // Test results storage
    this.testResults = [];
  }

  /**
   * Get protocol deployment addresses
   * @returns {Object} Protocol addresses
   */
  getProtocolAddresses() {
    const { protocol, chainId, customAddresses } = this.config;

    // Use custom addresses if provided
    if (Object.keys(customAddresses).length > 0) {
      return customAddresses;
    }

    // Use predefined addresses
    if (PROTOCOL_DEPLOYMENTS[chainId] && PROTOCOL_DEPLOYMENTS[chainId][protocol]) {
      return PROTOCOL_DEPLOYMENTS[chainId][protocol];
    }

    throw new Error(`No deployment found for protocol ${protocol} on chain ID ${chainId}`);
  }

  /**
   * Run a test and record results
   * @param {string} testName - Name of the test
   * @param {Function} testFunction - Test function to run
   * @returns {Promise<Object>} Test results
   */
  async runTest(testName, testFunction) {
    console.log(`Running test: ${testName}`);

    const startTime = Date.now();
    const result = {
      name: testName,
      protocol: this.config.protocol,
      chainId: this.config.chainId,
      success: false,
      startTime: new Date(startTime).toISOString(),
      endTime: null,
      duration: 0,
      error: null,
      details: {},
    };

    try {
      // Run test function with protocol addresses
      const addresses = this.getProtocolAddresses();
      const testResult = await testFunction(addresses, this.provider, this.signer);

      // Update result
      result.success = true;
      result.details = testResult;
    } catch (error) {
      result.success = false;
      result.error = {
        message: error.message,
        stack: error.stack,
      };
    }

    // Record end time and duration
    const endTime = Date.now();
    result.endTime = new Date(endTime).toISOString();
    result.duration = endTime - startTime;

    // Save to test results
    this.testResults.push(result);

    // Save to file
    const filename = `${this.config.protocol}_${testName.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().replace(/[:\.]/g, '-')}.json`;
    fs.writeJsonSync(path.join(this.config.outputDir, filename), result, { spaces: 2 });

    console.log(`Test ${testName} completed in ${result.duration}ms. Success: ${result.success}`);

    return result;
  }

  /**
   * Test price impact and slippage
   * @param {Object} options - Test options
   * @returns {Promise<Object>} Test results
   */
  async testPriceImpact(options = {}) {
    return this.runTest('Price Impact', async (addresses, provider, signer) => {
      const { protocol } = this.config;
      const pool = options.poolAddress;

      if (!pool) {
        throw new Error('Pool address is required for price impact test');
      }

      switch (protocol) {
        case AMM_PROTOCOLS.UNISWAP_V2:
        case AMM_PROTOCOLS.SUSHISWAP: {
          // Connect to pair contract
          const pairContract = new ethers.Contract(pool, uniswapV2PairAbi, provider);

          // Get reserves
          const reserves = await pairContract.getReserves();
          const token0 = await pairContract.token0();
          const token1 = await pairContract.token1();

          // Calculate current price
          const price0 = reserves.reserve1
            .mul(ethers.BigNumber.from(10).pow(18))
            .div(reserves.reserve0);
          const price1 = reserves.reserve0
            .mul(ethers.BigNumber.from(10).pow(18))
            .div(reserves.reserve1);

          // Calculate price impact for different trade sizes
          const impacts = [];
          const tradeSizes = [0.001, 0.01, 0.1, 1, 5, 10]; // Percentage of reserves

          for (const size of tradeSizes) {
            const amount0In = reserves.reserve0.mul(Math.floor(size * 1000)).div(100000);

            // Calculate output amount using constant product formula (k = x * y)
            const k = reserves.reserve0.mul(reserves.reserve1);
            const newReserve0 = reserves.reserve0.add(amount0In);
            const newReserve1 = k.div(newReserve0);
            const amount1Out = reserves.reserve1.sub(newReserve1);

            // Calculate effective price
            const effectivePrice = amount0In.mul(ethers.BigNumber.from(10).pow(18)).div(amount1Out);

            // Calculate price impact
            const priceImpact = effectivePrice.sub(price0).mul(100).div(price0);

            impacts.push({
              sizePercent: size,
              amount0In: ethers.utils.formatUnits(amount0In, 18), // Assuming 18 decimals
              amount1Out: ethers.utils.formatUnits(amount1Out, 18), // Assuming 18 decimals
              priceImpact: ethers.utils.formatUnits(priceImpact, 16) + '%',
            });
          }

          return {
            pool,
            token0,
            token1,
            reserves: {
              reserve0: ethers.utils.formatUnits(reserves.reserve0, 18), // Assuming 18 decimals
              reserve1: ethers.utils.formatUnits(reserves.reserve1, 18), // Assuming 18 decimals
            },
            spotPrice: {
              price0: ethers.utils.formatUnits(price0, 18),
              price1: ethers.utils.formatUnits(price1, 18),
            },
            priceImpacts: impacts,
          };
        }

        case AMM_PROTOCOLS.UNISWAP_V3: {
          // Connect to pool contract
          const poolContract = new ethers.Contract(pool, uniswapV3PoolAbi, provider);

          // Get pool data
          const token0 = await poolContract.token0();
          const token1 = await poolContract.token1();
          const fee = await poolContract.fee();
          const slot0 = await poolContract.slot0();
          const liquidity = await poolContract.liquidity();

          // Calculate current sqrt price
          const sqrtPriceX96 = slot0.sqrtPriceX96;
          const currentTick = slot0.tick;

          // Calculate actual price
          const price = sqrtPriceX96
            .mul(sqrtPriceX96)
            .mul(ethers.BigNumber.from(10).pow(18))
            .div(ethers.BigNumber.from(2).pow(192));

          return {
            pool,
            token0,
            token1,
            fee: fee.toString(),
            currentTick: currentTick.toString(),
            sqrtPriceX96: sqrtPriceX96.toString(),
            price: ethers.utils.formatUnits(price, 18),
            liquidity: ethers.utils.formatUnits(liquidity, 0),
            securityAnalysis: {
              lowLiquidityRisk: liquidity.gt(ethers.BigNumber.from(10).pow(16)),
              highVolatilityRisk: false, // Requires historical data analysis
              manipulationRisk: 'Medium', // Simplified assessment
            },
          };
        }

        default:
          throw new Error(`Protocol ${protocol} not supported for this test`);
      }
    });
  }

  /**
   * Test sandwich attack vulnerability
   * @param {Object} options - Test options
   * @returns {Promise<Object>} Test results
   */
  async testSandwichAttackVulnerability(options = {}) {
    return this.runTest('Sandwich Attack Vulnerability', async (addresses, provider, signer) => {
      const { protocol } = this.config;
      const pool = options.poolAddress;

      if (!pool) {
        throw new Error('Pool address is required for sandwich attack test');
      }

      // Testing sandwich attack vulnerability involves estimating potential profit
      // from front-running and back-running a transaction
      switch (protocol) {
        case AMM_PROTOCOLS.UNISWAP_V2:
        case AMM_PROTOCOLS.SUSHISWAP: {
          // Connect to pair contract
          const pairContract = new ethers.Contract(pool, uniswapV2PairAbi, provider);

          // Get reserves and tokens
          const reserves = await pairContract.getReserves();
          const token0 = await pairContract.token0();
          const token1 = await pairContract.token1();

          // Define a hypothetical victim transaction (e.g., 1% of reserves)
          const victimAmount0In = reserves.reserve0.mul(1).div(100);

          // Calculate victim's output
          const k = reserves.reserve0.mul(reserves.reserve1);
          const postVictimReserve0 = reserves.reserve0.add(victimAmount0In);
          const postVictimReserve1 = k.div(postVictimReserve0);
          const victimAmount1Out = reserves.reserve1.sub(postVictimReserve1);

          // Simulate front-running transaction (0.5% of reserves)
          const frontrunAmount0In = reserves.reserve0.mul(5).div(1000);
          const postFrontrunReserve0 = reserves.reserve0.add(frontrunAmount0In);
          const postFrontrunReserve1 = k.div(postFrontrunReserve0);
          const frontrunAmount1Out = reserves.reserve1.sub(postFrontrunReserve1);

          // Calculate new k after frontrun and victim transactions
          const newK = postVictimReserve0.mul(postVictimReserve1);

          // Backrun transaction (sell the token1 acquired in frontrun)
          const backrunAmount1In = frontrunAmount1Out;
          const finalReserve1 = postVictimReserve1.add(backrunAmount1In);
          const finalReserve0 = newK.div(finalReserve1);
          const backrunAmount0Out = postVictimReserve0.sub(finalReserve0);

          // Calculate profit
          const profit0 = backrunAmount0Out.sub(frontrunAmount0In);

          // Calculate minimum block time required for attack
          const blockTime = 12; // seconds for Ethereum

          return {
            pool,
            token0,
            token1,
            initialReserves: {
              reserve0: ethers.utils.formatUnits(reserves.reserve0, 18),
              reserve1: ethers.utils.formatUnits(reserves.reserve1, 18),
            },
            victimTransaction: {
              amount0In: ethers.utils.formatUnits(victimAmount0In, 18),
              amount1Out: ethers.utils.formatUnits(victimAmount1Out, 18),
            },
            attackSimulation: {
              frontrunAmount0In: ethers.utils.formatUnits(frontrunAmount0In, 18),
              frontrunAmount1Out: ethers.utils.formatUnits(frontrunAmount1Out, 18),
              backrunAmount1In: ethers.utils.formatUnits(backrunAmount1In, 18),
              backrunAmount0Out: ethers.utils.formatUnits(backrunAmount0Out, 18),
              profit0: ethers.utils.formatUnits(profit0, 18),
            },
            riskAssessment: {
              isProfitable: profit0.gt(0),
              minBlockTimeNeeded: blockTime,
              riskLevel: profit0.gt(ethers.utils.parseUnits('0.01', 18)) ? 'High' : 'Medium',
              mitigationStrategies: [
                'Use slippage protection',
                'Consider private transaction pools',
                'Batch transactions when possible',
              ],
            },
          };
        }

        case AMM_PROTOCOLS.UNISWAP_V3: {
          // Uniswap V3 sandwich attacks are more complex due to concentrated liquidity
          // A detailed simulation would require analyzing multiple ticks

          // Connect to pool contract
          const poolContract = new ethers.Contract(pool, uniswapV3PoolAbi, provider);

          // Get basic pool data
          const token0 = await poolContract.token0();
          const token1 = await poolContract.token1();
          const fee = await poolContract.fee();
          const liquidity = await poolContract.liquidity();
          const slot0 = await poolContract.slot0();

          // Simplified risk assessment
          const liquidityFactor = liquidity.div(ethers.BigNumber.from(10).pow(18));
          const feeFactor = fee.div(1000);

          // Higher fees and higher liquidity reduce attack profitability
          const riskScore = 10 - (liquidityFactor.toNumber() + feeFactor.toNumber());

          return {
            pool,
            token0,
            token1,
            poolData: {
              fee: fee.toString(),
              liquidity: ethers.utils.formatUnits(liquidity, 0),
              currentTick: slot0.tick.toString(),
              sqrtPriceX96: slot0.sqrtPriceX96.toString(),
            },
            riskAssessment: {
              riskScore: Math.max(1, Math.min(10, riskScore)),
              riskLevel: riskScore > 7 ? 'High' : riskScore > 4 ? 'Medium' : 'Low',
              factors: {
                liquidity: liquidityFactor.toNumber() < 1 ? 'Low' : 'High',
                fee: fee.toNumber() < 500 ? 'Low' : 'High',
                tickSpacing: 'Medium', // Simplified
              },
              mitigationStrategies: [
                'Use high slippage protection',
                'Consider private transaction pools',
                'Use Flashbots or similar services for MEV protection',
              ],
            },
          };
        }

        default:
          throw new Error(`Protocol ${protocol} not supported for this test`);
      }
    });
  }

  /**
   * Test flash loan attack vectors
   * @param {Object} options - Test options
   * @returns {Promise<Object>} Test results
   */
  async testFlashLoanAttackVectors(options = {}) {
    return this.runTest('Flash Loan Attack Vectors', async (addresses, provider, signer) => {
      const { protocol } = this.config;
      const pool = options.poolAddress;

      if (!pool) {
        throw new Error('Pool address is required for flash loan attack test');
      }

      switch (protocol) {
        case AMM_PROTOCOLS.UNISWAP_V2:
        case AMM_PROTOCOLS.SUSHISWAP: {
          // Connect to pair contract
          const pairContract = new ethers.Contract(pool, uniswapV2PairAbi, provider);

          // Get token addresses
          const token0 = await pairContract.token0();
          const token1 = await pairContract.token1();

          // Check reserve sizes
          const reserves = await pairContract.getReserves();

          // Check if kLast is used for fee calculation (vulnerable to flash loan manipulation)
          const kLast = await pairContract.kLast();
          const usesKLast = !kLast.isZero();

          // Simplified vulnerability assessment
          return {
            pool,
            token0,
            token1,
            reserves: {
              reserve0: ethers.utils.formatUnits(reserves.reserve0, 18),
              reserve1: ethers.utils.formatUnits(reserves.reserve1, 18),
            },
            kLast: kLast.toString(),
            usesKLast,
            vulnerabilityAssessment: {
              flashLoanRisk: usesKLast ? 'Medium' : 'Low',
              oracleManipulationRisk: 'Medium',
              reserveImbalanceRisk:
                reserves.reserve0.div(reserves.reserve1).gt(1000) ||
                reserves.reserve1.div(reserves.reserve0).gt(1000)
                  ? 'High'
                  : 'Low',
              mitigationStrategies: [
                'Use time-weighted average prices (TWAP) for oracles',
                'Implement price impact limits',
                'Consider multiple data sources for price feeds',
              ],
            },
          };
        }

        case AMM_PROTOCOLS.UNISWAP_V3: {
          // Connect to pool contract
          const poolContract = new ethers.Contract(pool, uniswapV3PoolAbi, provider);

          // Get pool data
          const token0 = await poolContract.token0();
          const token1 = await poolContract.token1();
          const fee = await poolContract.fee();
          const liquidity = await poolContract.liquidity();
          const slot0 = await poolContract.slot0();

          return {
            pool,
            token0,
            token1,
            poolData: {
              fee: fee.toString(),
              liquidity: ethers.utils.formatUnits(liquidity, 0),
              tick: slot0.tick.toString(),
            },
            vulnerabilityAssessment: {
              flashLoanRisk: 'Low', // V3 is more resistant to flash loan attacks
              oracleManipulationRisk: fee.lt(3000) ? 'Medium' : 'Low',
              tickManipulationRisk: liquidity.lt(ethers.BigNumber.from(10).pow(18))
                ? 'High'
                : 'Medium',
              mitigationStrategies: [
                'Use multiple block TWAP for price oracles',
                'Implement circuit breakers for large price movements',
                'Consider oracle validation against external price feeds',
              ],
            },
          };
        }

        default:
          throw new Error(`Protocol ${protocol} not supported for this test`);
      }
    });
  }

  /**
   * Test impermanent loss scenarios
   * @param {Object} options - Test options
   * @returns {Promise<Object>} Test results
   */
  async testImpermanentLoss(options = {}) {
    return this.runTest('Impermanent Loss', async (addresses, provider, signer) => {
      const { protocol } = this.config;
      const pool = options.poolAddress;

      if (!pool) {
        throw new Error('Pool address is required for impermanent loss test');
      }

      switch (protocol) {
        case AMM_PROTOCOLS.UNISWAP_V2:
        case AMM_PROTOCOLS.SUSHISWAP: {
          // Connect to pair contract
          const pairContract = new ethers.Contract(pool, uniswapV2PairAbi, provider);

          // Get token addresses and reserves
          const token0 = await pairContract.token0();
          const token1 = await pairContract.token1();
          const reserves = await pairContract.getReserves();

          // Calculate current price ratio
          const currentPrice = reserves.reserve1
            .mul(ethers.BigNumber.from(10).pow(18))
            .div(reserves.reserve0);

          // Calculate impermanent loss for various price changes
          const priceChanges = [-80, -50, -20, 0, 20, 50, 80, 100, 200, 500];
          const impermanentLosses = [];

          for (const priceChange of priceChanges) {
            // Calculate new price
            const newPrice = currentPrice.mul(100 + priceChange).div(100);

            // Calculate value if held
            const holdingValue = reserves.reserve0.add(
              reserves.reserve1.mul(ethers.BigNumber.from(10).pow(18)).div(currentPrice)
            );

            // Calculate value in LP
            const valueInLp = reserves.reserve0
              .mul(newPrice.pow(1 / 2))
              .div(ethers.BigNumber.from(10).pow(9))
              .add(
                reserves.reserve1.mul(ethers.BigNumber.from(10).pow(9)).div(newPrice.pow(1 / 2))
              );

            // Calculate impermanent loss percentage
            const impermanentLoss = valueInLp.mul(10000).div(holdingValue).sub(10000);

            impermanentLosses.push({
              priceChange: `${priceChange}%`,
              impermanentLoss: impermanentLoss.toNumber() / 100 + '%',
            });
          }

          return {
            pool,
            token0,
            token1,
            currentReserves: {
              reserve0: ethers.utils.formatUnits(reserves.reserve0, 18),
              reserve1: ethers.utils.formatUnits(reserves.reserve1, 18),
            },
            currentPrice: ethers.utils.formatUnits(currentPrice, 18),
            impermanentLossScenarios: impermanentLosses,
            riskAssessment: {
              volatilityRisk: 'Medium',
              recommendedFor: 'Correlated assets or stable pairs',
              notRecommendedFor: 'Highly volatile or trending assets',
            },
          };
        }

        case AMM_PROTOCOLS.UNISWAP_V3: {
          // Uniswap V3 impermanent loss depends on the position's price range
          // This is a simplified assessment

          // Connect to pool contract
          const poolContract = new ethers.Contract(pool, uniswapV3PoolAbi, provider);

          // Get pool data
          const token0 = await poolContract.token0();
          const token1 = await poolContract.token1();
          const fee = await poolContract.fee();
          const slot0 = await poolContract.slot0();

          // Current price and tick
          const sqrtPriceX96 = slot0.sqrtPriceX96;
          const currentTick = slot0.tick;

          // Calculate actual price
          const price = sqrtPriceX96
            .mul(sqrtPriceX96)
            .mul(ethers.BigNumber.from(10).pow(18))
            .div(ethers.BigNumber.from(2).pow(192));

          return {
            pool,
            token0,
            token1,
            fee: fee.toString(),
            currentTick: currentTick.toString(),
            currentPrice: ethers.utils.formatUnits(price, 18),
            riskAssessment: {
              // V3 positions can have more concentrated IL within the range
              concentratedPositionRisk: 'High',
              outOfRangeRisk: 'High',
              recommendedStrategy: 'Wide ranges for volatile pairs, narrow for stable pairs',
              mitigationTechniques: [
                'Multiple positions across different ranges',
                'Regular rebalancing as price moves',
                'Fee tier selection based on volatility',
              ],
            },
          };
        }

        default:
          throw new Error(`Protocol ${protocol} not supported for this test`);
      }
    });
  }

  /**
   * Run full test suite
   * @param {Object} options - Test options including pool address
   * @returns {Promise<Array>} All test results
   */
  async runFullTestSuite(options = {}) {
    console.log(
      `Running full AMM test suite for ${this.config.protocol} on chain ID ${this.config.chainId}`
    );

    // Check if pool address is provided
    if (!options.poolAddress) {
      throw new Error('Pool address is required for AMM tests');
    }

    const results = [];

    // Run all tests with the same pool address
    results.push(await this.testPriceImpact(options));
    results.push(await this.testSandwichAttackVulnerability(options));
    results.push(await this.testFlashLoanAttackVectors(options));
    results.push(await this.testImpermanentLoss(options));

    // Generate summary report
    this.generateSummaryReport(options.poolAddress);

    return results;
  }

  /**
   * Generate summary report of all test results
   * @param {string} poolAddress - Address of the tested pool
   * @returns {Object} Summary report
   */
  generateSummaryReport(poolAddress) {
    const summary = {
      protocol: this.config.protocol,
      chainId: this.config.chainId,
      poolAddress,
      timestamp: new Date().toISOString(),
      testsRun: this.testResults.length,
      successfulTests: this.testResults.filter(r => r.success).length,
      failedTests: this.testResults.filter(r => !r.success).length,
      testDetails: this.testResults.map(r => ({
        name: r.name,
        success: r.success,
        duration: r.duration,
        error: r.error ? r.error.message : null,
      })),
    };

    // Calculate overall security score (simple example)
    const score = (summary.successfulTests / summary.testsRun) * 100;
    summary.securityScore = Math.round(score);

    // Save to file
    const filename = `${this.config.protocol}_${poolAddress.slice(0, 8)}_summary_${new Date().toISOString().replace(/[:\.]/g, '-')}.json`;
    fs.writeJsonSync(path.join(this.config.outputDir, filename), summary, { spaces: 2 });

    console.log(`Test summary generated: ${filename}`);
    console.log(`Security score: ${summary.securityScore}%`);

    return summary;
  }
}

// Exports
module.exports = {
  AMMProtocolTester,
  AMM_PROTOCOLS,
  PROTOCOL_DEPLOYMENTS,
};
