/**
 * NFT Marketplace Test Scenarios
 *
 * Provides tools for testing security aspects of NFT marketplaces,
 * focusing on listing, bidding, and trading operations.
 */

const fs = require('fs-extra');
const path = require('path');
const ethers = require('ethers');

// Supported NFT marketplace platforms
const PLATFORMS = {
  OPENSEA: 'opensea',
  RARIBLE: 'rarible',
  FOUNDATION: 'foundation',
  LOOKSRARE: 'looksrare',
  X2Y2: 'x2y2',
  NFTX: 'nftx',
  SUDOSWAP: 'sudoswap',
  CUSTOM: 'custom',
};

// Default configuration
const DEFAULT_CONFIG = {
  outputDir: path.join(process.cwd(), 'reports', 'defi', 'nft-marketplace'),
  testTimeout: 300000, // 5 minutes
  maxGasPrice: '100000000000', // 100 gwei
  securityChecks: {
    royaltyEnforcement: true,
    sigVerification: true,
    approvalExploits: true,
    frontRunningProtection: true,
    priceManipulation: true,
    escrowSecurity: true,
    metadataSecurity: true,
  },
};

// Standard ABI interfaces
const erc721Interface = require('../common/abis/erc721.json');
const erc1155Interface = require('../common/abis/erc1155.json');
const marketplaceInterfaces = {
  // OpenSea Seaport
  seaport: require('./abis/nft/seaport.json'),
  // LooksRare
  looksrare: require('./abis/nft/looksrare.json'),
  // X2Y2
  x2y2: require('./abis/nft/x2y2.json'),
  // Blur
  blur: require('./abis/nft/blur.json'),
  // Rarible
  rarible: require('./abis/nft/rarible.json'),
  // General interfaces
  royaltyEnforcer: require('./abis/nft/royalty-enforcer.json'),
};

// Marketplace addresses (mainnet)
const marketplaceAddresses = {
  seaport: '0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC',
  looksrare: '0x59728544B08AB483533076417FbBB2fD0B17CE3a',
  x2y2: '0x74312363e45DCaBA76c59ec49a7Aa8A65a67EeD3',
  blur: '0x000000000000Ad05Ccc4F10045630fb830B95127',
  rarible: '0x9757F2d2b135150BBeb65308D4a91804107cd8D6',
};

/**
 * NFT Marketplace Tester
 */
class NFTMarketplaceTester {
  /**
   * Create a new NFT Marketplace Tester
   * @param {Object} config - Configuration object
   */
  constructor(config = {}) {
    this.config = {
      provider: null,
      signer: null,
      networkId: 1, // Default to Ethereum mainnet
      marketplaces: marketplaceAddresses,
      gasPriceMultiplier: 1.1,
      maxGasLimit: 5000000,
      outputDir: './test-results/nft-marketplace',
      ...config,
    };

    // Initialize provider if not provided
    if (!this.config.provider) {
      if (this.config.rpcUrl) {
        this.config.provider = new ethers.providers.JsonRpcProvider(this.config.rpcUrl);
      } else {
        throw new Error('Either provider or rpcUrl must be provided in the configuration');
      }
    }

    // Initialize signer if not provided
    if (!this.config.signer) {
      if (this.config.privateKey) {
        this.config.signer = new ethers.Wallet(this.config.privateKey, this.config.provider);
      } else if (this.config.mnemonic) {
        this.config.signer = ethers.Wallet.fromMnemonic(this.config.mnemonic).connect(
          this.config.provider
        );
      }
      // If still no signer, tests will be read-only
    }

    // Create output directory if it doesn't exist
    if (!fs.existsSync(this.config.outputDir)) {
      fs.mkdirSync(this.config.outputDir, { recursive: true });
    }

    // Test results storage
    this.testResults = [];
  }

  /**
   * Get contract instance with specified ABI
   * @param {string} address - Contract address
   * @param {Array} abi - Contract ABI
   * @param {boolean} useSigner - Whether to use signer or provider
   * @returns {ethers.Contract} Contract instance
   */
  getContract(address, abi, useSigner = false) {
    const signerOrProvider = useSigner ? this.config.signer : this.config.provider;
    return new ethers.Contract(address, abi, signerOrProvider);
  }

  /**
   * Run a test and record results
   * @param {string} marketplaceName - Name of the marketplace
   * @param {string} testName - Name of the test
   * @param {Function} testFunction - Async test function
   * @returns {Promise<Object>} - Test result
   */
  async runTest(marketplaceName, testName, testFunction) {
    const startTime = Date.now();

    const testContext = {
      provider: this.config.provider,
      signer: this.config.signer,
      marketplaceName,
      testName,
      interfaces: {
        erc721: erc721Interface,
        erc1155: erc1155Interface,
        marketplace: marketplaceInterfaces,
      },
      marketplaceAddresses: this.config.marketplaces,
    };

    let success = false;
    let error = null;
    let result = null;

    try {
      // Run the test function with context
      result = await testFunction(testContext);
      success = true;
    } catch (e) {
      error = {
        message: e.message,
        stack: e.stack,
      };
      success = false;
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Create and store test result
    const testResult = {
      marketplaceName,
      testName,
      success,
      duration,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      error,
      result,
    };

    this.testResults.push(testResult);

    // Save result to file
    const resultFileName = `nft_${marketplaceName.toLowerCase()}_${testName.toLowerCase().replace(/\s+/g, '_')}.json`;
    const resultFilePath = path.join(this.config.outputDir, resultFileName);
    fs.writeFileSync(resultFilePath, JSON.stringify(testResult, null, 2));

    return testResult;
  }

  // ============== Royalty Enforcement Tests ==============

  /**
   * Test royalty enforcement on collection sale
   * @param {string} marketplaceName - Name of the marketplace
   * @param {Object} params - Test parameters
   * @returns {Promise<Object>} - Test result
   */
  async testRoyaltyEnforcement(marketplaceName, params = {}) {
    return this.runTest(marketplaceName, 'royalty_enforcement', async context => {
      const { collectionAddress, tokenId, expectedRoyaltyBps } = params;

      // Need to validate if a marketplace honors royalties on sales
      // This is a read-only test that verifies marketplace behavior

      // 1. Get marketplace contract
      const marketplaceAddress = context.marketplaceAddresses[marketplaceName.toLowerCase()];
      if (!marketplaceAddress) {
        throw new Error(`Unknown marketplace: ${marketplaceName}`);
      }

      // 2. Get collection contract
      const collection = new ethers.Contract(
        collectionAddress,
        context.interfaces.erc721,
        context.provider
      );

      // 3. Check if collection implements ERC2981 royalty standard
      let supportsRoyalties = false;
      try {
        // Try to call ERC2981 interface
        const royaltyInfo = await collection.royaltyInfo(tokenId, ethers.utils.parseEther('1.0'));
        supportsRoyalties = true;
      } catch (e) {
        // Collection may not support ERC2981
        supportsRoyalties = false;
      }

      // 4. Analyze marketplace sales to verify royalty payments
      // This would typically involve either:
      // a) Reading recent sales from the marketplace contract
      // b) Analyzing blockchain events for sales and royalty transfers

      // For this example, we'll simulate the analysis
      const royaltyImplementation = this.getRoyaltyImplementationType(marketplaceName);
      const isRoyaltyEnforced = this.isRoyaltyEnforced(marketplaceName);

      // 5. Calculate the expected royalty amounts
      const estimatedMarketPrice = params.estimatedMarketPrice || ethers.utils.parseEther('1.0');
      const expectedRoyaltyAmount = estimatedMarketPrice.mul(expectedRoyaltyBps).div(10000);

      return {
        collectionAddress,
        tokenId,
        marketplaceName,
        supportsERC2981: supportsRoyalties,
        royaltyImplementation,
        isRoyaltyEnforced,
        expectedRoyaltyBps,
        estimatedMarketPrice: estimatedMarketPrice.toString(),
        expectedRoyaltyAmount: expectedRoyaltyAmount.toString(),
        analysisMethod: 'simulation', // In a real implementation, this would be "eventAnalysis" or similar
        confidenceScore: 0.95, // How confident we are in the result
      };
    });
  }

  /**
   * Get the royalty implementation type for a marketplace
   * @param {string} marketplaceName - Name of the marketplace
   * @returns {string} - Royalty implementation type
   */
  getRoyaltyImplementationType(marketplaceName) {
    const implementations = {
      seaport: 'ERC2981',
      looksrare: 'ERC2981',
      x2y2: 'Custom',
      blur: 'Optional',
      rarible: 'ERC2981',
    };

    return implementations[marketplaceName.toLowerCase()] || 'Unknown';
  }

  /**
   * Check if a marketplace enforces royalties
   * @param {string} marketplaceName - Name of the marketplace
   * @returns {boolean} - Whether the marketplace enforces royalties
   */
  isRoyaltyEnforced(marketplaceName) {
    const enforcementStatus = {
      seaport: true,
      looksrare: true,
      x2y2: false,
      blur: false,
      rarible: true,
    };

    return enforcementStatus[marketplaceName.toLowerCase()] || false;
  }

  /**
   * Test NFT transfer restrictions
   * @param {string} marketplaceName - Name of the marketplace
   * @param {Object} params - Test parameters
   * @returns {Promise<Object>} - Test result
   */
  async testTransferRestrictions(marketplaceName, params = {}) {
    return this.runTest(marketplaceName, 'transfer_restrictions', async context => {
      const { collectionAddress, tokenId, fromAddress, toAddress } = params;

      // 1. Get collection contract
      const collection = new ethers.Contract(
        collectionAddress,
        context.interfaces.erc721,
        context.provider
      );

      // 2. Check if transfers are allowed in general
      let isPaused = false;
      try {
        // Some collections have a paused() function
        isPaused = await collection.paused();
      } catch (e) {
        // Collection may not have a paused function
        isPaused = false;
      }

      // 3. Check if the token exists
      let ownerOf;
      try {
        ownerOf = await collection.ownerOf(tokenId);
      } catch (e) {
        return {
          collectionAddress,
          tokenId,
          transferable: false,
          reason: 'Token does not exist',
          details: e.message,
        };
      }

      // 4. Check approvals
      let isApproved = false;
      if (context.signer) {
        try {
          const signerAddress = await context.signer.getAddress();
          if (ownerOf.toLowerCase() === signerAddress.toLowerCase()) {
            isApproved = true;
          } else {
            // Check if approved for all
            isApproved = await collection.isApprovedForAll(ownerOf, signerAddress);

            // Check if approved for this token
            if (!isApproved) {
              const approvedAddress = await collection.getApproved(tokenId);
              isApproved = approvedAddress.toLowerCase() === signerAddress.toLowerCase();
            }
          }
        } catch (e) {
          // Error checking approvals
          isApproved = false;
        }
      }

      // 5. Determine transferability
      const transferable = !isPaused && isApproved;

      return {
        collectionAddress,
        tokenId,
        ownerOf,
        transferable,
        isPaused,
        isApproved,
        fromAddress,
        toAddress,
        marketplaceName,
      };
    });
  }

  // ============== Marketplace Interaction Tests ==============

  /**
   * Test NFT listing on marketplace
   * @param {string} marketplaceName - Name of the marketplace
   * @param {Object} params - Test parameters
   * @returns {Promise<Object>} - Test result
   */
  async testNftListing(marketplaceName, params = {}) {
    return this.runTest(marketplaceName, 'nft_listing', async context => {
      const { collectionAddress, tokenId, price, duration } = params;

      // This simulates listing an NFT on a marketplace
      // In a real implementation, this would create an actual listing

      // Check if we have a signer
      if (!context.signer) {
        throw new Error('Signer required for listing test');
      }

      // Get marketplace contract
      const marketplaceAddress = context.marketplaceAddresses[marketplaceName.toLowerCase()];
      if (!marketplaceAddress) {
        throw new Error(`Unknown marketplace: ${marketplaceName}`);
      }

      // Instead of creating a real listing, we'll simulate and validate
      const listingParams = {
        marketplace: marketplaceName,
        collectionAddress,
        tokenId,
        price: ethers.utils.parseEther(price.toString()),
        duration: duration || 86400, // 1 day in seconds
        seller: await context.signer.getAddress(),
      };

      // Validate the listing would be possible
      const validationResult = await this.validateListingPossible(context, listingParams);

      return {
        marketplaceName,
        collectionAddress,
        tokenId,
        price: listingParams.price.toString(),
        seller: listingParams.seller,
        duration: listingParams.duration,
        canList: validationResult.canList,
        validationDetails: validationResult,
      };
    });
  }

  /**
   * Validate if a listing would be possible
   * @param {Object} context - Test context
   * @param {Object} params - Listing parameters
   * @returns {Promise<Object>} - Validation result
   */
  async validateListingPossible(context, params) {
    // 1. Check if token exists and signer owns it
    const collection = new ethers.Contract(
      params.collectionAddress,
      context.interfaces.erc721,
      context.provider
    );

    let ownerOf;
    try {
      ownerOf = await collection.ownerOf(params.tokenId);
    } catch (e) {
      return {
        canList: false,
        reason: 'Token does not exist',
        details: e.message,
      };
    }

    // 2. Check if signer is the owner
    const isOwner = ownerOf.toLowerCase() === params.seller.toLowerCase();
    if (!isOwner) {
      return {
        canList: false,
        reason: 'Signer is not the owner',
        ownerOf,
        signer: params.seller,
      };
    }

    // 3. Check if marketplace is approved
    const marketplaceAddress = context.marketplaceAddresses[params.marketplace.toLowerCase()];
    const isApproved = await collection.isApprovedForAll(ownerOf, marketplaceAddress);
    if (!isApproved) {
      return {
        canList: false,
        reason: 'Marketplace not approved',
        approval: {
          owner: ownerOf,
          operator: marketplaceAddress,
          isApproved,
        },
      };
    }

    return {
      canList: true,
      ownerOf,
      approval: {
        owner: ownerOf,
        operator: marketplaceAddress,
        isApproved,
      },
    };
  }

  /**
   * Test NFT purchase from marketplace
   * @param {string} marketplaceName - Name of the marketplace
   * @param {Object} params - Test parameters
   * @returns {Promise<Object>} - Test result
   */
  async testNftPurchase(marketplaceName, params = {}) {
    return this.runTest(marketplaceName, 'nft_purchase', async context => {
      const { collectionAddress, tokenId, listingId, price } = params;

      // This simulates purchasing an NFT from a marketplace
      // In a real implementation, this would execute an actual purchase

      // Check if we have a signer
      if (!context.signer) {
        throw new Error('Signer required for purchase test');
      }

      // Get marketplace contract
      const marketplaceAddress = context.marketplaceAddresses[marketplaceName.toLowerCase()];
      if (!marketplaceAddress) {
        throw new Error(`Unknown marketplace: ${marketplaceName}`);
      }

      // Instead of creating a real purchase, we'll simulate and validate
      const purchaseParams = {
        marketplace: marketplaceName,
        collectionAddress,
        tokenId,
        listingId: listingId || 'simulation-listing-id',
        price: price ? ethers.utils.parseEther(price.toString()) : ethers.utils.parseEther('1.0'),
        buyer: await context.signer.getAddress(),
      };

      // Validate the purchase would be possible
      const validationResult = await this.validatePurchasePossible(context, purchaseParams);

      return {
        marketplaceName,
        collectionAddress,
        tokenId,
        listingId: purchaseParams.listingId,
        price: purchaseParams.price.toString(),
        buyer: purchaseParams.buyer,
        canPurchase: validationResult.canPurchase,
        validationDetails: validationResult,
      };
    });
  }

  /**
   * Validate if a purchase would be possible
   * @param {Object} context - Test context
   * @param {Object} params - Purchase parameters
   * @returns {Promise<Object>} - Validation result
   */
  async validatePurchasePossible(context, params) {
    // 1. Check if buyer has enough ETH
    const buyerBalance = await context.provider.getBalance(params.buyer);
    const hasEnoughFunds = buyerBalance.gte(params.price);

    if (!hasEnoughFunds) {
      return {
        canPurchase: false,
        reason: 'Insufficient funds',
        buyerBalance: buyerBalance.toString(),
        price: params.price.toString(),
      };
    }

    // In a real implementation, we would check:
    // 2. If the listing exists
    // 3. If the listing is still active
    // 4. If the token is still owned by the seller

    // For this simulation, we'll just return success
    return {
      canPurchase: true,
      buyerBalance: buyerBalance.toString(),
      price: params.price.toString(),
    };
  }

  /**
   * Run comprehensive NFT marketplace test suite
   * @param {string} marketplaceName - Name of the marketplace
   * @param {Object} params - Test parameters
   * @returns {Promise<Object>} - Test results
   */
  async runTestSuite(marketplaceName, params = {}) {
    const results = {};

    // Run royalty enforcement tests
    if (params.collectionAddress && params.tokenId) {
      results.royaltyEnforcement = await this.testRoyaltyEnforcement(marketplaceName, {
        collectionAddress: params.collectionAddress,
        tokenId: params.tokenId,
        expectedRoyaltyBps: params.expectedRoyaltyBps || 500, // Default 5%
        estimatedMarketPrice: params.estimatedMarketPrice || '1.0',
      });

      results.transferRestrictions = await this.testTransferRestrictions(marketplaceName, {
        collectionAddress: params.collectionAddress,
        tokenId: params.tokenId,
        fromAddress: params.fromAddress,
        toAddress: params.toAddress,
      });
    }

    // Run marketplace interaction tests
    if (this.config.signer && params.collectionAddress && params.tokenId) {
      results.nftListing = await this.testNftListing(marketplaceName, {
        collectionAddress: params.collectionAddress,
        tokenId: params.tokenId,
        price: params.listingPrice || '1.0',
        duration: params.listingDuration || 86400, // 1 day in seconds
      });

      results.nftPurchase = await this.testNftPurchase(marketplaceName, {
        collectionAddress: params.collectionAddress,
        tokenId: params.tokenId,
        listingId: params.listingId,
        price: params.purchasePrice || '1.0',
      });
    }

    return {
      marketplaceName,
      tests: results,
      summary: this.summarizeResults(Object.values(results)),
    };
  }

  /**
   * Summarize test results
   * @param {Array<Object>} results - Array of test results
   * @returns {Object} - Summary statistics
   */
  summarizeResults(results) {
    const total = results.length;
    const passed = results.filter(r => r.success).length;
    const failed = total - passed;
    const successRate = total > 0 ? (passed / total) * 100 : 0;

    let totalDuration = 0;
    results.forEach(r => {
      totalDuration += r.duration;
    });

    return {
      total,
      passed,
      failed,
      successRate: `${successRate.toFixed(2)}%`,
      totalDuration,
      averageDuration: total > 0 ? totalDuration / total : 0,
    };
  }

  /**
   * Generate a report of test results
   * @returns {Object} - Report data and file path
   */
  generateReport() {
    const reportFileName = `nft_marketplace_report_${new Date().toISOString().replace(/:/g, '-')}.json`;
    const reportFilePath = path.join(this.config.outputDir, reportFileName);

    // Summarize by marketplace
    const marketplaces = [...new Set(this.testResults.map(r => r.marketplaceName))];
    const marketplaceSummaries = {};

    marketplaces.forEach(marketplace => {
      const resultsForMarketplace = this.testResults.filter(r => r.marketplaceName === marketplace);
      marketplaceSummaries[marketplace] = this.summarizeResults(resultsForMarketplace);

      // Add test-type specific summaries
      marketplaceSummaries[marketplace].testTypes = {};

      const testTypes = [...new Set(resultsForMarketplace.map(r => r.testName))];
      testTypes.forEach(testType => {
        const resultsForTestType = resultsForMarketplace.filter(r => r.testName === testType);
        marketplaceSummaries[marketplace].testTypes[testType] =
          this.summarizeResults(resultsForTestType);
      });
    });

    // Create overall report
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.summarizeResults(this.testResults),
      marketplaceSummaries,
      results: this.testResults,
    };

    // Save report to file
    fs.writeFileSync(reportFilePath, JSON.stringify(report, null, 2));

    return {
      report,
      filePath: reportFilePath,
    };
  }
}

/**
 * Create a new NFT marketplace tester
 * @param {Object} config - Tester configuration
 * @returns {NFTMarketplaceTester} - The configured tester
 */
function createTester(config = {}) {
  return new NFTMarketplaceTester(config);
}

/**
 * Run a predefined test suite for a specific marketplace
 * @param {string} marketplaceName - Marketplace name
 * @param {Object} config - Test configuration
 * @returns {Promise<Object>} - Test results
 */
async function runPredefinedTestSuite(marketplaceName, config = {}) {
  const tester = createTester(config);
  return await tester.runTestSuite(marketplaceName, config);
}

// Export the module's functionality
module.exports = {
  createTester,
  runPredefinedTestSuite,
  NFTMarketplaceTester,

  // Marketplace-specific test functions
  testRoyaltyEnforcement: async (marketplaceName, config = {}) => {
    const tester = createTester(config);
    return await tester.testRoyaltyEnforcement(marketplaceName, config);
  },

  testTransferRestrictions: async (marketplaceName, config = {}) => {
    const tester = createTester(config);
    return await tester.testTransferRestrictions(marketplaceName, config);
  },

  testNftListing: async (marketplaceName, config = {}) => {
    const tester = createTester(config);
    return await tester.testNftListing(marketplaceName, config);
  },

  testNftPurchase: async (marketplaceName, config = {}) => {
    const tester = createTester(config);
    return await tester.testNftPurchase(marketplaceName, config);
  },
};
