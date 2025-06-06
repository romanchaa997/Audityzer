/**
 * NFT Marketplace Standards Testing Module
 *
 * Comprehensive testing for NFT marketplace standards compliance, including:
 * - ERC-721 and ERC-1155 compliance
 * - ERC-2981 royalty standard
 * - Metadata standards (IPFS, on-chain, etc.)
 * - Marketplace-specific interfaces
 */

const ethers = require('ethers');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

// Standard interfaces
const ERC721Interface = [
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function balanceOf(address owner) view returns (uint256)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function safeTransferFrom(address from, address to, uint256 tokenId)',
  'function transferFrom(address from, address to, uint256 tokenId)',
  'function approve(address to, uint256 tokenId)',
  'function getApproved(uint256 tokenId) view returns (address)',
  'function setApprovalForAll(address operator, bool approved)',
  'function isApprovedForAll(address owner, address operator) view returns (bool)',
  'function tokenURI(uint256 tokenId) view returns (string)',
];

const ERC1155Interface = [
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function balanceOf(address account, uint256 id) view returns (uint256)',
  'function balanceOfBatch(address[] accounts, uint256[] ids) view returns (uint256[])',
  'function setApprovalForAll(address operator, bool approved)',
  'function isApprovedForAll(address account, address operator) view returns (bool)',
  'function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)',
  'function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data)',
  'function uri(uint256 id) view returns (string)',
];

const ERC2981Interface = [
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function royaltyInfo(uint256 tokenId, uint256 salePrice) view returns (address receiver, uint256 royaltyAmount)',
];

// Interface IDs
const INTERFACE_IDS = {
  ERC165: '0x01ffc9a7',
  ERC721: '0x80ac58cd',
  ERC721Metadata: '0x5b5e139f',
  ERC721Enumerable: '0x780e9d63',
  ERC1155: '0xd9b67a26',
  ERC1155MetadataURI: '0x0e89341c',
  ERC2981: '0x2a55205a',
};

// Common NFT marketplaces and their interfaces
const MARKETPLACES = {
  OPENSEA: {
    name: 'OpenSea',
    standards: ['ERC721', 'ERC1155', 'ERC2981'],
    interfaces: {
      // OpenSea-specific interfaces
      ContractURI: ['function contractURI() view returns (string)'],
      OpenseaProxy: [
        'function isApprovedForAll(address owner, address operator) view returns (bool)',
      ],
    },
    proxyAddress: {
      1: '0x58807baD0B376efc12F5AD86aAc70E78ed67deaE', // Mainnet
      137: '0x58807baD0B376efc12F5AD86aAc70E78ed67deaE', // Polygon
    },
  },
  RARIBLE: {
    name: 'Rarible',
    standards: ['ERC721', 'ERC1155', 'ERC2981'],
    interfaces: {
      // Rarible-specific interfaces
      RoyaltiesV2: [
        'function getRaribleV2Royalties(uint256 id) view returns (tuple(address, uint96)[])',
      ],
    },
  },
  LOOKSRARE: {
    name: 'LooksRare',
    standards: ['ERC721', 'ERC1155', 'ERC2981'],
    interfaces: {
      // LooksRare-specific interfaces
      RoyaltyFeeManager: [
        'function royaltyFeeInfoCollection(address collection) view returns (address, address, uint256)',
      ],
    },
  },
};

/**
 * NFT Standards Tester
 * Tests NFT contracts for compliance with various standards
 */
class NFTStandardsTester {
  /**
   * Create a new NFT Standards Tester
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    this.config = {
      provider: config.provider || null,
      providerUrl: config.providerUrl || 'http://localhost:8545',
      privateKey: config.privateKey || null,
      chainId: config.chainId || 1,
      timeout: config.timeout || 30000,
      resultsDir: config.resultsDir || path.join(process.cwd(), 'test-results', 'nft-standards'),
      ipfsGateway: config.ipfsGateway || 'https://ipfs.io/ipfs/',
      logLevel: config.logLevel || 'info',
      ...config,
    };

    this.provider = null;
    this.signer = null;
    this.initialized = false;

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
      console.error('Failed to initialize NFT Standards Tester:', error);
      return false;
    }
  }

  /**
   * Test if a contract supports specific interfaces
   * @param {string} contractAddress - NFT contract address
   * @returns {Promise<Object>} Test results
   */
  async testInterfaceSupport(contractAddress) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Create contract instance with ERC165 support
      const contract = new ethers.Contract(
        contractAddress,
        ['function supportsInterface(bytes4 interfaceId) view returns (bool)'],
        this.provider
      );

      // Test for ERC165 support first
      let supportsERC165 = false;
      try {
        supportsERC165 = await contract.supportsInterface(INTERFACE_IDS.ERC165);
      } catch (error) {
        // If this fails, the contract doesn't implement ERC165
        supportsERC165 = false;
      }

      // If contract doesn't support ERC165, we can't reliably check other interfaces
      if (!supportsERC165) {
        return {
          address: contractAddress,
          supportsERC165: false,
          interfaces: {},
          standardsCompliance: {
            erc721: { compliant: false, reason: 'Contract does not support ERC165' },
            erc1155: { compliant: false, reason: 'Contract does not support ERC165' },
            erc2981: { compliant: false, reason: 'Contract does not support ERC165' },
          },
        };
      }

      // Check each interface
      const interfaceSupport = {};
      for (const [name, id] of Object.entries(INTERFACE_IDS)) {
        try {
          interfaceSupport[name] = await contract.supportsInterface(id);
        } catch (error) {
          interfaceSupport[name] = false;
        }
      }

      // Determine standards compliance
      const standardsCompliance = {
        erc721: {
          compliant: interfaceSupport.ERC721 === true,
          hasMetadata: interfaceSupport.ERC721Metadata === true,
          hasEnumerable: interfaceSupport.ERC721Enumerable === true,
        },
        erc1155: {
          compliant: interfaceSupport.ERC1155 === true,
          hasMetadataURI: interfaceSupport.ERC1155MetadataURI === true,
        },
        erc2981: {
          compliant: interfaceSupport.ERC2981 === true,
        },
      };

      return {
        address: contractAddress,
        supportsERC165,
        interfaces: interfaceSupport,
        standardsCompliance,
      };
    } catch (error) {
      console.error(`Error testing interface support for ${contractAddress}:`, error);
      return {
        address: contractAddress,
        error: error.message,
        supportsERC165: false,
        interfaces: {},
        standardsCompliance: {
          erc721: { compliant: false, reason: 'Error testing interface' },
          erc1155: { compliant: false, reason: 'Error testing interface' },
          erc2981: { compliant: false, reason: 'Error testing interface' },
        },
      };
    }
  }

  /**
   * Test royalty implementation for an NFT contract
   * @param {string} contractAddress - NFT contract address
   * @param {number} tokenId - Token ID to test
   * @param {number} salePrice - Sale price for royalty calculation (in wei)
   * @returns {Promise<Object>} Test results
   */
  async testRoyaltyImplementation(
    contractAddress,
    tokenId,
    salePrice = ethers.utils.parseEther('1')
  ) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // First check interface support to determine the NFT standard
      const interfaceSupport = await this.testInterfaceSupport(contractAddress);

      const results = {
        address: contractAddress,
        tokenId,
        salePrice: salePrice.toString(),
        standardsSupported: interfaceSupport.standardsCompliance,
        royaltyImplementations: {},
      };

      // Test ERC2981 royalty standard
      if (interfaceSupport.standardsCompliance.erc2981.compliant) {
        const contract = new ethers.Contract(contractAddress, ERC2981Interface, this.provider);
        try {
          const [receiver, royaltyAmount] = await contract.royaltyInfo(tokenId, salePrice);

          results.royaltyImplementations.erc2981 = {
            supported: true,
            receiver,
            royaltyAmount: royaltyAmount.toString(),
            royaltyPercentage: ((Number(royaltyAmount) * 100) / Number(salePrice)).toFixed(2) + '%',
          };
        } catch (error) {
          results.royaltyImplementations.erc2981 = {
            supported: true,
            error: error.message,
          };
        }
      } else {
        results.royaltyImplementations.erc2981 = {
          supported: false,
        };
      }

      // Test Rarible royalty implementation
      const raribleContract = new ethers.Contract(
        contractAddress,
        MARKETPLACES.RARIBLE.interfaces.RoyaltiesV2,
        this.provider
      );

      try {
        const raribleRoyalties = await raribleContract.getRaribleV2Royalties(tokenId);
        if (raribleRoyalties && raribleRoyalties.length > 0) {
          results.royaltyImplementations.raribleV2 = {
            supported: true,
            royalties: raribleRoyalties.map(royalty => ({
              receiver: royalty[0],
              amount: royalty[1].toString(),
              percentage: (Number(royalty[1]) / 10000).toFixed(2) + '%',
            })),
          };
        } else {
          results.royaltyImplementations.raribleV2 = {
            supported: false,
          };
        }
      } catch (error) {
        // Contract doesn't support Rarible royalties
        results.royaltyImplementations.raribleV2 = {
          supported: false,
        };
      }

      // Test Foundation royalty implementation (if needed)
      // Test Manifold royalty implementation (if needed)

      // Determine the default royalty implementation based on the results
      let preferredImplementation = null;
      let royaltyPercentage = 0;

      if (
        results.royaltyImplementations.erc2981.supported &&
        results.royaltyImplementations.erc2981.receiver
      ) {
        preferredImplementation = 'erc2981';
        royaltyPercentage = parseFloat(results.royaltyImplementations.erc2981.royaltyPercentage);
      } else if (
        results.royaltyImplementations.raribleV2.supported &&
        results.royaltyImplementations.raribleV2.royalties &&
        results.royaltyImplementations.raribleV2.royalties.length > 0
      ) {
        preferredImplementation = 'raribleV2';
        royaltyPercentage = results.royaltyImplementations.raribleV2.royalties.reduce(
          (total, royalty) => total + parseFloat(royalty.percentage),
          0
        );
      }

      results.summary = {
        hasRoyalties: preferredImplementation !== null,
        preferredImplementation,
        royaltyPercentage: royaltyPercentage + '%',
      };

      return results;
    } catch (error) {
      console.error(`Error testing royalty implementation for ${contractAddress}:`, error);
      return {
        address: contractAddress,
        tokenId,
        error: error.message,
        royaltyImplementations: {},
      };
    }
  }

  /**
   * Test metadata compliance for an NFT
   * @param {string} contractAddress - NFT contract address
   * @param {number} tokenId - Token ID to test
   * @returns {Promise<Object>} Test results
   */
  async testMetadataCompliance(contractAddress, tokenId) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // First check interface support to determine the NFT standard
      const interfaceSupport = await this.testInterfaceSupport(contractAddress);

      let tokenURI = null;
      let metadataContent = null;
      let metadataSource = null;

      // Get token URI based on the standard
      if (interfaceSupport.standardsCompliance.erc721.compliant) {
        const contract = new ethers.Contract(contractAddress, ERC721Interface, this.provider);
        try {
          tokenURI = await contract.tokenURI(tokenId);
        } catch (error) {
          return {
            address: contractAddress,
            tokenId,
            error: `Failed to get tokenURI: ${error.message}`,
            metadataCompliance: { compliant: false },
          };
        }
      } else if (interfaceSupport.standardsCompliance.erc1155.compliant) {
        const contract = new ethers.Contract(contractAddress, ERC1155Interface, this.provider);
        try {
          tokenURI = await contract.uri(tokenId);
          // Some ERC1155 implementations use {id} placeholder
          tokenURI = tokenURI.replace('{id}', tokenId.toString().padStart(64, '0'));
        } catch (error) {
          return {
            address: contractAddress,
            tokenId,
            error: `Failed to get token URI: ${error.message}`,
            metadataCompliance: { compliant: false },
          };
        }
      } else {
        return {
          address: contractAddress,
          tokenId,
          error: 'Contract does not comply with ERC721 or ERC1155 standards',
          metadataCompliance: { compliant: false },
        };
      }

      // Analyze the token URI
      if (tokenURI) {
        if (tokenURI.startsWith('ipfs://')) {
          // IPFS URI
          metadataSource = 'ipfs';
          const ipfsHash = tokenURI.replace('ipfs://', '').replace('ipfs/', '');
          const ipfsUrl = `${this.config.ipfsGateway}${ipfsHash}`;

          try {
            const response = await axios.get(ipfsUrl, { timeout: this.config.timeout });
            metadataContent = response.data;
          } catch (error) {
            return {
              address: contractAddress,
              tokenId,
              tokenURI,
              metadataSource,
              error: `Failed to fetch IPFS metadata: ${error.message}`,
              metadataCompliance: { compliant: false },
            };
          }
        } else if (tokenURI.startsWith('ar://')) {
          // Arweave URI
          metadataSource = 'arweave';
          const arweaveHash = tokenURI.replace('ar://', '');
          const arweaveUrl = `https://arweave.net/${arweaveHash}`;

          try {
            const response = await axios.get(arweaveUrl, { timeout: this.config.timeout });
            metadataContent = response.data;
          } catch (error) {
            return {
              address: contractAddress,
              tokenId,
              tokenURI,
              metadataSource,
              error: `Failed to fetch Arweave metadata: ${error.message}`,
              metadataCompliance: { compliant: false },
            };
          }
        } else if (tokenURI.startsWith('data:application/json;base64,')) {
          // Base64 encoded JSON
          metadataSource = 'base64';
          const base64Data = tokenURI.replace('data:application/json;base64,', '');

          try {
            const jsonString = Buffer.from(base64Data, 'base64').toString('utf-8');
            metadataContent = JSON.parse(jsonString);
          } catch (error) {
            return {
              address: contractAddress,
              tokenId,
              tokenURI,
              metadataSource,
              error: `Failed to parse base64 metadata: ${error.message}`,
              metadataCompliance: { compliant: false },
            };
          }
        } else if (tokenURI.startsWith('http://') || tokenURI.startsWith('https://')) {
          // HTTP URI
          metadataSource = 'http';

          try {
            const response = await axios.get(tokenURI, { timeout: this.config.timeout });
            metadataContent = response.data;
          } catch (error) {
            return {
              address: contractAddress,
              tokenId,
              tokenURI,
              metadataSource,
              error: `Failed to fetch HTTP metadata: ${error.message}`,
              metadataCompliance: { compliant: false },
            };
          }
        } else if (tokenURI.startsWith('{')) {
          // On-chain JSON
          metadataSource = 'onchain';

          try {
            metadataContent = JSON.parse(tokenURI);
          } catch (error) {
            return {
              address: contractAddress,
              tokenId,
              tokenURI,
              metadataSource,
              error: `Failed to parse on-chain metadata: ${error.message}`,
              metadataCompliance: { compliant: false },
            };
          }
        } else {
          // Unknown URI format
          return {
            address: contractAddress,
            tokenId,
            tokenURI,
            metadataSource: 'unknown',
            error: 'Unknown metadata URI format',
            metadataCompliance: { compliant: false },
          };
        }
      }

      // Analyze metadata content for compliance
      if (metadataContent) {
        // Check required fields according to metadata standards
        const requiredFields = ['name', 'description'];
        const optionalFields = ['image', 'external_url', 'attributes'];

        const metadataFields = Object.keys(metadataContent);
        const hasRequiredFields = requiredFields.every(field => metadataFields.includes(field));

        const metadataResult = {
          address: contractAddress,
          tokenId,
          tokenURI,
          metadataSource,
          metadataFields,
          metadataContent,
          metadataCompliance: {
            compliant: hasRequiredFields,
            hasRequiredFields,
            missingRequiredFields: requiredFields.filter(field => !metadataFields.includes(field)),
            presentOptionalFields: optionalFields.filter(field => metadataFields.includes(field)),
            hasImage: metadataFields.includes('image'),
            hasAttributes:
              metadataFields.includes('attributes') && Array.isArray(metadataContent.attributes),
          },
        };

        // Check image URI format if present
        if (metadataFields.includes('image')) {
          const imageURI = metadataContent.image;

          if (imageURI.startsWith('ipfs://')) {
            metadataResult.imageSource = 'ipfs';
          } else if (imageURI.startsWith('ar://')) {
            metadataResult.imageSource = 'arweave';
          } else if (imageURI.startsWith('data:image/')) {
            metadataResult.imageSource = 'base64';
          } else if (imageURI.startsWith('http://') || imageURI.startsWith('https://')) {
            metadataResult.imageSource = 'http';
          } else {
            metadataResult.imageSource = 'unknown';
          }
        }

        return metadataResult;
      }

      return {
        address: contractAddress,
        tokenId,
        tokenURI,
        metadataSource,
        error: 'Failed to retrieve metadata content',
        metadataCompliance: { compliant: false },
      };
    } catch (error) {
      console.error(`Error testing metadata compliance for ${contractAddress}:`, error);
      return {
        address: contractAddress,
        tokenId,
        error: error.message,
        metadataCompliance: { compliant: false },
      };
    }
  }

  /**
   * Test marketplace compatibility for an NFT contract
   * @param {string} contractAddress - NFT contract address
   * @param {string} marketplace - Marketplace to test (opensea, rarible, etc.)
   * @returns {Promise<Object>} Test results
   */
  async testMarketplaceCompatibility(contractAddress, marketplace = 'opensea') {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Normalize marketplace name
      const normalizedMarketplace = marketplace.toUpperCase();

      // Check if marketplace is supported
      if (!MARKETPLACES[normalizedMarketplace]) {
        return {
          address: contractAddress,
          marketplace,
          error: `Unsupported marketplace: ${marketplace}`,
          compatible: false,
        };
      }

      // Get marketplace config
      const marketplaceConfig = MARKETPLACES[normalizedMarketplace];

      // First check interface support to determine the NFT standard
      const interfaceSupport = await this.testInterfaceSupport(contractAddress);

      // Check if contract supports required standards for this marketplace
      const supportsRequiredStandards = marketplaceConfig.standards.every(standard => {
        const standardLower = standard.toLowerCase();
        return (
          interfaceSupport.standardsCompliance[standardLower] &&
          interfaceSupport.standardsCompliance[standardLower].compliant
        );
      });

      const results = {
        address: contractAddress,
        marketplace: marketplaceConfig.name,
        supportsRequiredStandards,
        interfaceSupport: interfaceSupport.standardsCompliance,
        marketplaceSpecificFeatures: {},
      };

      // Test marketplace-specific features
      if (normalizedMarketplace === 'OPENSEA') {
        // Check for contractURI function (for collection metadata)
        const openseaContract = new ethers.Contract(
          contractAddress,
          marketplaceConfig.interfaces.ContractURI,
          this.provider
        );

        try {
          const contractURI = await openseaContract.contractURI();
          results.marketplaceSpecificFeatures.contractURI = {
            supported: true,
            uri: contractURI,
          };

          // Fetch and parse contract metadata
          if (contractURI) {
            try {
              let contractMetadata = null;

              if (contractURI.startsWith('ipfs://')) {
                const ipfsHash = contractURI.replace('ipfs://', '');
                const ipfsUrl = `${this.config.ipfsGateway}${ipfsHash}`;
                const response = await axios.get(ipfsUrl, { timeout: this.config.timeout });
                contractMetadata = response.data;
              } else if (contractURI.startsWith('http://') || contractURI.startsWith('https://')) {
                const response = await axios.get(contractURI, { timeout: this.config.timeout });
                contractMetadata = response.data;
              }

              if (contractMetadata) {
                results.marketplaceSpecificFeatures.contractMetadata = contractMetadata;
              }
            } catch (error) {
              results.marketplaceSpecificFeatures.contractMetadataError = error.message;
            }
          }
        } catch (error) {
          results.marketplaceSpecificFeatures.contractURI = {
            supported: false,
            error: error.message,
          };
        }

        // Check if contract has proxy approval for OpenSea
        if (this.signer) {
          try {
            const signerAddress = await this.signer.getAddress();
            const proxyAddress = marketplaceConfig.proxyAddress[this.config.chainId];

            if (proxyAddress) {
              // Check for standard approval
              if (interfaceSupport.standardsCompliance.erc721.compliant) {
                const erc721Contract = new ethers.Contract(
                  contractAddress,
                  ERC721Interface,
                  this.provider
                );

                const isApproved = await erc721Contract.isApprovedForAll(
                  signerAddress,
                  proxyAddress
                );
                results.marketplaceSpecificFeatures.proxyApproval = {
                  supported: true,
                  approved: isApproved,
                };
              } else if (interfaceSupport.standardsCompliance.erc1155.compliant) {
                const erc1155Contract = new ethers.Contract(
                  contractAddress,
                  ERC1155Interface,
                  this.provider
                );

                const isApproved = await erc1155Contract.isApprovedForAll(
                  signerAddress,
                  proxyAddress
                );
                results.marketplaceSpecificFeatures.proxyApproval = {
                  supported: true,
                  approved: isApproved,
                };
              }
            }
          } catch (error) {
            results.marketplaceSpecificFeatures.proxyApproval = {
              supported: false,
              error: error.message,
            };
          }
        }
      } else if (normalizedMarketplace === 'RARIBLE') {
        // Check for Rarible-specific features
        try {
          const raribleContract = new ethers.Contract(
            contractAddress,
            marketplaceConfig.interfaces.RoyaltiesV2,
            this.provider
          );

          const raribleRoyalties = await raribleContract.getRaribleV2Royalties(0); // Test with token ID 0

          results.marketplaceSpecificFeatures.raribleRoyalties = {
            supported: true,
            royalties: raribleRoyalties,
          };
        } catch (error) {
          results.marketplaceSpecificFeatures.raribleRoyalties = {
            supported: false,
            error: error.message,
          };
        }
      } else if (normalizedMarketplace === 'LOOKSRARE') {
        // Check for LooksRare-specific features
        try {
          // Cannot test LooksRare royalty fee manager directly as it's on the marketplace contract
          // We can only check standard implementation
          results.marketplaceSpecificFeatures.looksrareRoyalties = {
            supported: interfaceSupport.standardsCompliance.erc2981.compliant,
          };
        } catch (error) {
          results.marketplaceSpecificFeatures.looksrareRoyalties = {
            supported: false,
            error: error.message,
          };
        }
      }

      // Determine overall compatibility
      let compatible = supportsRequiredStandards;

      // For OpenSea, having contractURI is a big plus
      if (
        normalizedMarketplace === 'OPENSEA' &&
        results.marketplaceSpecificFeatures.contractURI &&
        results.marketplaceSpecificFeatures.contractURI.supported
      ) {
        compatible = true;
      }

      results.compatible = compatible;

      return results;
    } catch (error) {
      console.error(`Error testing marketplace compatibility for ${contractAddress}:`, error);
      return {
        address: contractAddress,
        marketplace,
        error: error.message,
        compatible: false,
      };
    }
  }

  /**
   * Run a comprehensive NFT standards test
   * @param {string} contractAddress - NFT contract address
   * @param {number} tokenId - Token ID to test
   * @param {Object} options - Test options
   * @returns {Promise<Object>} Comprehensive test results
   */
  async runComprehensiveTest(contractAddress, tokenId, options = {}) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const startTime = Date.now();

      // Run all tests
      const interfaceResults = await this.testInterfaceSupport(contractAddress);
      const royaltyResults = await this.testRoyaltyImplementation(
        contractAddress,
        tokenId,
        options.salePrice || ethers.utils.parseEther('1')
      );
      const metadataResults = await this.testMetadataCompliance(contractAddress, tokenId);

      // Test marketplace compatibility
      const marketplaceResults = {};
      for (const marketplace of Object.keys(MARKETPLACES)) {
        marketplaceResults[marketplace.toLowerCase()] = await this.testMarketplaceCompatibility(
          contractAddress,
          marketplace
        );
      }

      // Compile comprehensive results
      const results = {
        address: contractAddress,
        tokenId,
        timestamp: new Date().toISOString(),
        executionTime: Date.now() - startTime,
        interfaces: interfaceResults,
        royalties: royaltyResults,
        metadata: metadataResults,
        marketplaces: marketplaceResults,
        summary: {
          standard: interfaceResults.standardsCompliance.erc721.compliant
            ? 'ERC721'
            : interfaceResults.standardsCompliance.erc1155.compliant
              ? 'ERC1155'
              : 'Unknown',
          hasRoyalties: royaltyResults.summary?.hasRoyalties || false,
          royaltyPercentage: royaltyResults.summary?.royaltyPercentage || '0%',
          hasCompliantMetadata: metadataResults.metadataCompliance?.compliant || false,
          marketplaceCompatibility: Object.entries(marketplaceResults).reduce(
            (acc, [name, result]) => {
              acc[name] = result.compatible;
              return acc;
            },
            {}
          ),
          recommendations: [],
        },
      };

      // Generate recommendations
      if (!results.summary.hasRoyalties) {
        results.summary.recommendations.push(
          'Implement the ERC2981 royalty standard to ensure royalties across marketplaces'
        );
      }

      if (!results.summary.hasCompliantMetadata) {
        results.summary.recommendations.push(
          'Ensure metadata includes required fields (name, description) and image'
        );
      }

      // OpenSea-specific recommendations
      if (
        marketplaceResults.opensea &&
        !marketplaceResults.opensea.marketplaceSpecificFeatures.contractURI?.supported
      ) {
        results.summary.recommendations.push(
          'Implement contractURI for better OpenSea collection metadata'
        );
      }

      // Save results to file if requested
      if (options.saveResults !== false) {
        const resultsPath = path.join(
          this.config.resultsDir,
          `${contractAddress}_${tokenId}_${Date.now()}.json`
        );

        await fs.writeJson(resultsPath, results, { spaces: 2 });
        results.resultsSaved = resultsPath;
      }

      return results;
    } catch (error) {
      console.error(`Error running comprehensive test for ${contractAddress}:`, error);
      return {
        address: contractAddress,
        tokenId,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}

module.exports = {
  NFTStandardsTester,
  INTERFACE_IDS,
  MARKETPLACES,
  ERC721Interface,
  ERC1155Interface,
  ERC2981Interface,
};
