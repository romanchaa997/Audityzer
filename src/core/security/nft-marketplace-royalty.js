/**
 * NFT Marketplace Royalty Enforcement Tests
 *
 * Specialized tests for NFT marketplaces with focus on royalty enforcement,
 * transfer validation, and marketplace interactions.
 */

const ethers = require('ethers');
const fs = require('fs-extra');
const path = require('path');

// Standard ERC721 and ERC1155 interfaces
const erc721Interface = new ethers.utils.Interface([
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function balanceOf(address owner) view returns (uint256)',
  'function isApprovedForAll(address owner, address operator) view returns (bool)',
  'function getApproved(uint256 tokenId) view returns (address)',
  'function transferFrom(address from, address to, uint256 tokenId)',
  'function safeTransferFrom(address from, address to, uint256 tokenId)',
  'function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
]);

const erc1155Interface = new ethers.utils.Interface([
  'function balanceOf(address account, uint256 id) view returns (uint256)',
  'function balanceOfBatch(address[] accounts, uint256[] ids) view returns (uint256[])',
  'function isApprovedForAll(address account, address operator) view returns (bool)',
  'function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)',
  'function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
]);

// Royalty interfaces (EIP-2981)
const royaltyInterface = new ethers.utils.Interface([
  'function royaltyInfo(uint256 tokenId, uint256 salePrice) view returns (address receiver, uint256 royaltyAmount)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
]);

// Marketplace-specific interfaces
const marketplaceInterfaces = {
  opensea: new ethers.utils.Interface([
    'function validateOrder_(address, address, address, uint256, uint256, uint256) view returns (bool)',
    'function fees() view returns (address[] receivers, uint256[] bps)',
  ]),
  looksrare: new ethers.utils.Interface([
    'function viewProtocolFee() view returns (uint256)',
    'function royaltyFeeRegistry() view returns (address)',
  ]),
  rarible: new ethers.utils.Interface([
    'function getAssetRoyalties(address token, uint tokenId) view returns (tuple(address account, uint value)[])',
  ]),
};

// Known marketplace addresses
const MARKETPLACE_ADDRESSES = {
  // Ethereum mainnet
  1: {
    opensea: {
      seaport: '0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC',
      conduitController: '0x00000000F9490004C11Cef243f5400493c00Ad63',
    },
    looksrare: {
      exchange: '0x59728544B08AB483533076417FbBB2fD0B17CE3a',
      royaltyRegistry: '0x55010472E6E242732Bf13C35f9C0f6613AD9e987',
    },
    rarible: {
      exchange: '0x9757F2d2b135150BBeb65308D4a91804107cd8D6',
      royaltyRegistry: '0xEa90CFad1b8e030B8Fd3E63D22074E0AEb8E0DCD',
    },
  },
  // Polygon
  137: {
    opensea: {
      seaport: '0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC',
      conduitController: '0x00000000F9490004C11Cef243f5400493c00Ad63',
    },
  },
};

// NFT Standards
const NFT_STANDARD = {
  ERC721: 'ERC721',
  ERC1155: 'ERC1155',
  UNKNOWN: 'UNKNOWN',
};

class NFTMarketplaceRoyaltyTester {
  /**
   * Create a new NFT Marketplace Royalty Tester
   * @param {Object} config - Configuration object
   */
  constructor(config = {}) {
    this.config = {
      chainId: config.chainId || 1,
      rpcUrl: config.rpcUrl || 'https://mainnet.infura.io/v3/your-infura-key',
      privateKey: config.privateKey,
      mnemonic: config.mnemonic,
      gasLimit: config.gasLimit || 3000000,
      outputDir: config.outputDir || path.join(process.cwd(), 'reports', 'nft', 'royalty'),
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
      chainId: this.config.chainId,
      success: false,
      startTime: new Date(startTime).toISOString(),
      endTime: null,
      duration: 0,
      error: null,
      details: {},
    };

    try {
      // Run test function
      const testResult = await testFunction();

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
    const filename = `${testName.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().replace(/[:\.]/g, '-')}.json`;
    fs.writeJsonSync(path.join(this.config.outputDir, filename), result, { spaces: 2 });

    console.log(`Test ${testName} completed in ${result.duration}ms. Success: ${result.success}`);

    return result;
  }

  /**
   * Detect the NFT standard of a contract
   * @param {string} nftAddress - NFT contract address
   * @returns {Promise<string>} NFT standard (ERC721, ERC1155, or UNKNOWN)
   */
  async detectNFTStandard(nftAddress) {
    const contract = new ethers.Contract(
      nftAddress,
      ['function supportsInterface(bytes4 interfaceId) view returns (bool)'],
      this.provider
    );

    try {
      // Check for ERC721 support (0x80ac58cd)
      const isERC721 = await contract.supportsInterface('0x80ac58cd');
      if (isERC721) {
        return NFT_STANDARD.ERC721;
      }

      // Check for ERC1155 support (0xd9b67a26)
      const isERC1155 = await contract.supportsInterface('0xd9b67a26');
      if (isERC1155) {
        return NFT_STANDARD.ERC1155;
      }

      return NFT_STANDARD.UNKNOWN;
    } catch (error) {
      console.warn(`Failed to detect NFT standard for ${nftAddress}: ${error.message}`);
      return NFT_STANDARD.UNKNOWN;
    }
  }

  /**
   * Check if NFT supports royalty interface
   * @param {string} nftAddress - NFT contract address
   * @returns {Promise<boolean>} True if royalty interface is supported
   */
  async supportsRoyalty(nftAddress) {
    const contract = new ethers.Contract(
      nftAddress,
      ['function supportsInterface(bytes4 interfaceId) view returns (bool)'],
      this.provider
    );

    try {
      // Check for EIP-2981 Royalty Standard support (0x2a55205a)
      return await contract.supportsInterface('0x2a55205a');
    } catch (error) {
      console.warn(`Failed to check royalty support for ${nftAddress}: ${error.message}`);
      return false;
    }
  }

  /**
   * Get royalty information for an NFT
   * @param {string} nftAddress - NFT contract address
   * @param {number} tokenId - Token ID
   * @param {string} salePrice - Sale price (in smallest unit)
   * @returns {Promise<Object>} Royalty information
   */
  async getRoyaltyInfo(nftAddress, tokenId, salePrice) {
    const supportsRoyalty = await this.supportsRoyalty(nftAddress);

    if (!supportsRoyalty) {
      return {
        supportsRoyalty: false,
        message: 'NFT contract does not support EIP-2981 royalty standard',
      };
    }

    const contract = new ethers.Contract(nftAddress, royaltyInterface, this.provider);

    try {
      const [receiver, royaltyAmount] = await contract.royaltyInfo(tokenId, salePrice);
      const percentage = (royaltyAmount * 100n) / BigInt(salePrice);

      return {
        supportsRoyalty: true,
        receiver,
        royaltyAmount: royaltyAmount.toString(),
        percentage: percentage.toString() + '%',
        salePrice,
      };
    } catch (error) {
      return {
        supportsRoyalty: true,
        error: error.message,
        message: 'Failed to get royalty information',
      };
    }
  }

  /**
   * Test royalty enforcement on a marketplace
   * @param {string} marketplace - Marketplace name (opensea, looksrare, rarible)
   * @param {string} nftAddress - NFT contract address
   * @param {number} tokenId - Token ID
   * @returns {Promise<Object>} Test results
   */
  async testRoyaltyEnforcement(marketplace, nftAddress, tokenId) {
    return this.runTest(`Royalty Enforcement - ${marketplace}`, async () => {
      // Get marketplace addresses
      const marketplaceAddress = MARKETPLACE_ADDRESSES[this.config.chainId]?.[marketplace];
      if (!marketplaceAddress) {
        throw new Error(`No address found for ${marketplace} on chain ID ${this.config.chainId}`);
      }

      // Detect NFT standard
      const nftStandard = await this.detectNFTStandard(nftAddress);

      // Check if NFT supports royalty standard
      const supportsRoyalty = await this.supportsRoyalty(nftAddress);

      // Get royalty information
      const salePrice = ethers.utils.parseEther('1'); // 1 ETH
      const royaltyInfo = await this.getRoyaltyInfo(nftAddress, tokenId, salePrice);

      // Marketplace-specific royalty enforcement check
      let marketplaceEnforcement = { enforced: false, details: 'Unknown' };

      switch (marketplace) {
        case 'opensea': {
          // OpenSea Seaport
          const exchange = new ethers.Contract(
            marketplaceAddress.seaport,
            marketplaceInterfaces.opensea,
            this.provider
          );

          try {
            // Check if OpenSea has creator fee enforcement
            const [receivers, bps] = await exchange.fees();

            marketplaceEnforcement = {
              enforced: true,
              type: 'marketplace',
              receivers,
              percentages: bps.map(bp => bp.toNumber() / 100 + '%'),
              details: 'OpenSea enforces creator fees at the protocol level',
            };
          } catch (error) {
            marketplaceEnforcement = {
              enforced: false,
              type: 'optional',
              details: 'OpenSea appears to make creator fees optional for some collections',
            };
          }
          break;
        }

        case 'looksrare': {
          // LooksRare
          const exchange = new ethers.Contract(
            marketplaceAddress.exchange,
            marketplaceInterfaces.looksrare,
            this.provider
          );

          try {
            // Check royalty registry
            const royaltyRegistry = await exchange.royaltyFeeRegistry();

            marketplaceEnforcement = {
              enforced: true,
              type: 'registry',
              registry: royaltyRegistry,
              details: 'LooksRare enforces royalties through a central registry',
            };
          } catch (error) {
            marketplaceEnforcement = {
              enforced: false,
              details: 'Failed to determine royalty enforcement status',
            };
          }
          break;
        }

        case 'rarible': {
          // Rarible
          const exchange = new ethers.Contract(
            marketplaceAddress.exchange,
            marketplaceInterfaces.rarible,
            this.provider
          );

          try {
            // Get royalty information from Rarible's registry
            const raribleRoyalties = await exchange.getAssetRoyalties(nftAddress, tokenId);

            marketplaceEnforcement = {
              enforced: raribleRoyalties.length > 0,
              type: 'registry',
              royalties: raribleRoyalties.map(r => ({
                receiver: r.account,
                percentage: r.value / 10000 + '%',
              })),
              details: 'Rarible uses both on-chain royalties and its own registry',
            };
          } catch (error) {
            marketplaceEnforcement = {
              enforced: false,
              details: 'Failed to determine royalty enforcement status',
            };
          }
          break;
        }

        default:
          marketplaceEnforcement = {
            enforced: false,
            details: `Unknown marketplace: ${marketplace}`,
          };
      }

      return {
        nftAddress,
        tokenId,
        nftStandard,
        supportsRoyalty,
        royaltyInfo,
        marketplace,
        marketplaceEnforcement,
        recommendations: [
          supportsRoyalty
            ? 'Collection implements EIP-2981 standard for royalties'
            : 'Consider implementing EIP-2981 royalty standard',
          marketplaceEnforcement.enforced
            ? `${marketplace} enforces royalties for this collection`
            : `${marketplace} may not enforce royalties - consider using a different marketplace`,
          'Monitor marketplace policies as royalty enforcement is evolving',
        ],
      };
    });
  }

  /**
   * Test NFT transfer restrictions
   * @param {string} nftAddress - NFT contract address
   * @param {number} tokenId - Token ID
   * @returns {Promise<Object>} Test results
   */
  async testTransferRestrictions(nftAddress, tokenId) {
    return this.runTest('Transfer Restrictions', async () => {
      // Detect NFT standard
      const nftStandard = await this.detectNFTStandard(nftAddress);

      // Create contract instance based on standard
      let contract;
      let owner;

      if (nftStandard === NFT_STANDARD.ERC721) {
        contract = new ethers.Contract(nftAddress, erc721Interface, this.provider);

        // Get token owner
        try {
          owner = await contract.ownerOf(tokenId);
        } catch (error) {
          throw new Error(`Failed to get owner of token ${tokenId}: ${error.message}`);
        }
      } else if (nftStandard === NFT_STANDARD.ERC1155) {
        contract = new ethers.Contract(nftAddress, erc1155Interface, this.provider);

        // For ERC1155, we don't have a direct ownerOf function
        // We'll just note this in the results
        owner = null;
      } else {
        throw new Error(`Unsupported NFT standard for ${nftAddress}`);
      }

      // Check for transfer restrictions by analyzing contract code
      const code = await this.provider.getCode(nftAddress);

      // Look for potential restriction patterns in bytecode
      const hasTransferRestriction =
        code.includes('transferFrom') && (code.includes('require') || code.includes('revert'));

      // Advanced check - look for specific restriction patterns
      // (This is a simplified heuristic and may not be accurate for all contracts)
      const restrictionPatterns = {
        hasAllowList: code.includes('allowList') || code.includes('whitelist'),
        hasDenyList: code.includes('denyList') || code.includes('blacklist'),
        hasTimeLock: code.includes('timelock') || code.includes('lockTime'),
        hasSoulbound:
          code.includes('soulbound') || (code.includes('transfer') && code.includes('revert')),
      };

      // Additional checks for token-bound licenses or other restrictions
      // would require deeper analysis of contract source code

      return {
        nftAddress,
        tokenId,
        nftStandard,
        owner,
        transferAnalysis: {
          potentialRestrictions: hasTransferRestriction,
          restrictionPatterns,
          restrictionLevel: hasTransferRestriction ? 'Potential' : 'None Detected',
          confidence: 'Medium', // Bytecode analysis is limited
        },
        recommendations: [
          hasTransferRestriction
            ? 'This NFT may have transfer restrictions'
            : 'No obvious transfer restrictions detected',
          'Consider testing transfers in a controlled environment before marketplace listing',
          'Check project documentation for any off-chain transfer restrictions',
        ],
      };
    });
  }

  /**
   * Test NFT marketplace interaction patterns
   * @param {string} marketplace - Marketplace name
   * @param {string} nftAddress - NFT contract address
   * @param {number} tokenId - Token ID
   * @returns {Promise<Object>} Test results
   */
  async testMarketplaceInteraction(marketplace, nftAddress, tokenId) {
    return this.runTest(`Marketplace Interaction - ${marketplace}`, async () => {
      // Get marketplace addresses
      const marketplaceAddress = MARKETPLACE_ADDRESSES[this.config.chainId]?.[marketplace];
      if (!marketplaceAddress) {
        throw new Error(`No address found for ${marketplace} on chain ID ${this.config.chainId}`);
      }

      // Detect NFT standard
      const nftStandard = await this.detectNFTStandard(nftAddress);

      // Create NFT contract instance
      const nftInterface = nftStandard === NFT_STANDARD.ERC721 ? erc721Interface : erc1155Interface;
      const nftContract = new ethers.Contract(nftAddress, nftInterface, this.provider);

      // Check if owner is connected (if we have a signer)
      let isOwner = false;
      let owner = null;
      let approved = false;

      if (this.signer) {
        const signerAddress = await this.signer.getAddress();

        if (nftStandard === NFT_STANDARD.ERC721) {
          try {
            owner = await nftContract.ownerOf(tokenId);
            isOwner = owner.toLowerCase() === signerAddress.toLowerCase();

            // Check if approved
            const approvedAddress = await nftContract.getApproved(tokenId);
            const isApprovedForAll = await nftContract.isApprovedForAll(
              owner,
              marketplaceAddress.exchange || marketplaceAddress.seaport
            );

            approved =
              approvedAddress.toLowerCase() ===
                (marketplaceAddress.exchange || marketplaceAddress.seaport).toLowerCase() ||
              isApprovedForAll;
          } catch (error) {
            console.warn(`Failed to check ownership: ${error.message}`);
          }
        } else if (nftStandard === NFT_STANDARD.ERC1155) {
          try {
            const balance = await nftContract.balanceOf(signerAddress, tokenId);
            isOwner = balance.gt(0);

            // Check if approved
            const isApprovedForAll = await nftContract.isApprovedForAll(
              signerAddress,
              marketplaceAddress.exchange || marketplaceAddress.seaport
            );

            approved = isApprovedForAll;
          } catch (error) {
            console.warn(`Failed to check ownership: ${error.message}`);
          }
        }
      }

      // Simulate approval interaction (don't execute)
      const approvalInteraction = {
        type: nftStandard === NFT_STANDARD.ERC721 ? 'setApprovalForAll' : 'setApprovalForAll',
        to: nftAddress,
        from: this.signer ? await this.signer.getAddress() : 'OWNER_ADDRESS',
        params: [marketplaceAddress.exchange || marketplaceAddress.seaport, true],
      };

      // Simulate listing interaction (marketplace specific)
      let listingInteraction;

      switch (marketplace) {
        case 'opensea':
          listingInteraction = {
            marketplace: 'OpenSea',
            method: 'createOrder',
            to: marketplaceAddress.seaport,
            params: {
              offerer: this.signer ? await this.signer.getAddress() : 'OWNER_ADDRESS',
              offer: [
                {
                  itemType: 2, // ERC721
                  token: nftAddress,
                  identifier: tokenId.toString(),
                },
              ],
              consideration: [
                {
                  itemType: 0, // ETH
                  amount: '1000000000000000000', // 1 ETH
                  recipient: this.signer ? await this.signer.getAddress() : 'OWNER_ADDRESS',
                },
              ],
            },
          };
          break;

        case 'looksrare':
          listingInteraction = {
            marketplace: 'LooksRare',
            method: 'createListing',
            to: marketplaceAddress.exchange,
            params: {
              collection: nftAddress,
              tokenId: tokenId.toString(),
              price: '1000000000000000000', // 1 ETH
              startTime: Math.floor(Date.now() / 1000),
              endTime: Math.floor(Date.now() / 1000) + 86400, // 24 hours
            },
          };
          break;

        case 'rarible':
          listingInteraction = {
            marketplace: 'Rarible',
            method: 'createSellOrder',
            to: marketplaceAddress.exchange,
            params: {
              makeAsset: {
                assetType: {
                  assetClass: nftStandard === NFT_STANDARD.ERC721 ? 'ERC721' : 'ERC1155',
                  contract: nftAddress,
                  tokenId: tokenId.toString(),
                },
                value: 1,
              },
              takeAsset: {
                assetType: {
                  assetClass: 'ETH',
                },
                value: '1000000000000000000', // 1 ETH
              },
            },
          };
          break;

        default:
          listingInteraction = {
            marketplace,
            method: 'unknown',
            message: 'Marketplace not supported for listing simulation',
          };
      }

      return {
        nftAddress,
        tokenId,
        nftStandard,
        owner,
        isOwner,
        approved,
        marketplace,
        approvalStatus: approved ? 'Already Approved' : 'Needs Approval',
        approvalInteraction: !approved ? approvalInteraction : null,
        listingInteraction,
        readiness: {
          canList: isOwner && approved,
          missingApproval: isOwner && !approved,
          missingOwnership: !isOwner,
        },
        recommendations: [
          !approved ? 'NFT needs to be approved for the marketplace' : 'NFT is already approved',
          isOwner
            ? 'You own this NFT and can list it'
            : 'You do not own this NFT and cannot list it',
          `Use the ${marketplace} interface for the best listing experience`,
        ],
      };
    });
  }

  /**
   * Run all tests for an NFT across marketplaces
   * @param {string} nftAddress - NFT contract address
   * @param {number} tokenId - Token ID
   * @param {Array<string>} marketplaces - List of marketplaces to test
   * @returns {Promise<Array>} All test results
   */
  async runFullTestSuite(nftAddress, tokenId, marketplaces = ['opensea', 'looksrare', 'rarible']) {
    console.log(`Running full NFT marketplace test suite for ${nftAddress} token ${tokenId}`);

    const results = [];

    // Transfer restrictions test
    results.push(await this.testTransferRestrictions(nftAddress, tokenId));

    // Marketplace-specific tests
    for (const marketplace of marketplaces) {
      if (MARKETPLACE_ADDRESSES[this.config.chainId]?.[marketplace]) {
        results.push(await this.testRoyaltyEnforcement(marketplace, nftAddress, tokenId));
        results.push(await this.testMarketplaceInteraction(marketplace, nftAddress, tokenId));
      } else {
        console.warn(
          `Skipping tests for ${marketplace} - not supported on chain ID ${this.config.chainId}`
        );
      }
    }

    // Generate summary report
    this.generateSummaryReport(nftAddress, tokenId);

    return results;
  }

  /**
   * Generate summary report of all test results
   * @param {string} nftAddress - NFT contract address
   * @param {number} tokenId - Token ID
   * @returns {Object} Summary report
   */
  generateSummaryReport(nftAddress, tokenId) {
    const summary = {
      nftAddress,
      tokenId,
      chainId: this.config.chainId,
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

    // Calculate overall compatibility score
    const score = (summary.successfulTests / summary.testsRun) * 100;
    summary.compatibilityScore = Math.round(score);

    // Find the most compatible marketplace
    const marketplaceResults = {};

    for (const result of this.testResults) {
      if (result.success && result.name.startsWith('Marketplace Interaction')) {
        const marketplace = result.name.split('-')[1].trim();
        const canList = result.details?.readiness?.canList || false;

        if (!marketplaceResults[marketplace]) {
          marketplaceResults[marketplace] = {
            canList,
            enforces: false,
          };
        } else {
          marketplaceResults[marketplace].canList = canList;
        }
      }

      if (result.success && result.name.startsWith('Royalty Enforcement')) {
        const marketplace = result.name.split('-')[1].trim();
        const enforces = result.details?.marketplaceEnforcement?.enforced || false;

        if (!marketplaceResults[marketplace]) {
          marketplaceResults[marketplace] = {
            canList: false,
            enforces,
          };
        } else {
          marketplaceResults[marketplace].enforces = enforces;
        }
      }
    }

    summary.marketplaceCompatibility = marketplaceResults;

    // Find best marketplace (simplistic approach - prefers royalty enforcement)
    const bestMarketplaces = Object.entries(marketplaceResults)
      .filter(([_, data]) => data.canList)
      .sort(([_, a], [__, b]) => b.enforces - a.enforces)
      .map(([name]) => name);

    summary.recommendedMarketplaces = bestMarketplaces;

    // Save to file
    const filename = `nft_${nftAddress.slice(0, 8)}_${tokenId}_summary_${new Date().toISOString().replace(/[:\.]/g, '-')}.json`;
    fs.writeJsonSync(path.join(this.config.outputDir, filename), summary, { spaces: 2 });

    console.log(`Test summary generated: ${filename}`);
    console.log(`Compatibility score: ${summary.compatibilityScore}%`);
    if (bestMarketplaces.length > 0) {
      console.log(`Recommended marketplaces: ${bestMarketplaces.join(', ')}`);
    }

    return summary;
  }
}

// Export module
module.exports = {
  NFTMarketplaceRoyaltyTester,
  NFT_STANDARD,
  MARKETPLACE_ADDRESSES,
};
