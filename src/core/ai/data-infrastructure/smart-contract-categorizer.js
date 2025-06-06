/**
 * Smart Contract Categorizer
 *
 * Analyzes and categorizes smart contracts to identify common patterns
 * and potential security vulnerabilities.
 */

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

// Default configuration
let config = {
  dataStoragePath: null,
  contractStoragePath: null,
  vulnerabilityCategorization: [
    {
      id: 'reentrancy',
      name: 'Reentrancy',
      description: 'Functions vulnerable to reentrancy attacks',
      patterns: [
        { type: 'code', pattern: 'call{value:' },
        { type: 'code', pattern: '.call.value(' },
        { type: 'code', pattern: 'function\\s+withdraw' },
      ],
      severity: 'critical',
    },
    {
      id: 'access-control',
      name: 'Access Control',
      description: 'Missing or improper access controls',
      patterns: [
        { type: 'code', pattern: 'selfdestruct' },
        { type: 'code', pattern: 'suicide' },
        { type: 'code', pattern: 'onlyOwner' },
      ],
      severity: 'high',
    },
    {
      id: 'arithmetic',
      name: 'Arithmetic Issues',
      description: 'Overflow, underflow and precision issues',
      patterns: [
        { type: 'code', pattern: '\\+\\+' },
        { type: 'code', pattern: '\\-\\-' },
        { type: 'code', pattern: 'SafeMath' },
      ],
      severity: 'high',
    },
    {
      id: 'unchecked-return',
      name: 'Unchecked Return Values',
      description: 'Failure to check return values from external calls',
      patterns: [
        { type: 'code', pattern: '.transfer(' },
        { type: 'code', pattern: '.send(' },
        { type: 'code', pattern: '.call(' },
      ],
      severity: 'medium',
    },
    {
      id: 'front-running',
      name: 'Front-running Vulnerability',
      description: 'Transactions vulnerable to front-running',
      patterns: [
        { type: 'code', pattern: 'require\\(.*timestamp' },
        { type: 'code', pattern: 'require\\(.*block\\.number' },
      ],
      severity: 'medium',
    },
    {
      id: 'dos',
      name: 'Denial of Service',
      description: 'Patterns that could lead to denial of service',
      patterns: [
        { type: 'code', pattern: 'for\\s*\\(' },
        { type: 'code', pattern: 'while\\s*\\(' },
      ],
      severity: 'medium',
    },
    {
      id: 'tx-origin',
      name: 'tx.origin Usage',
      description: 'Insecure use of tx.origin for authorization',
      patterns: [{ type: 'code', pattern: 'tx\\.origin' }],
      severity: 'high',
    },
  ],
};

// Track initialization state
let initialized = false;

/**
 * Initialize the smart contract categorizer
 * @param {Object} userConfig - Configuration options
 * @returns {Promise<boolean>} Success status
 */
async function initialize(userConfig = {}) {
  try {
    // Update configuration with user settings
    config = {
      ...config,
      ...userConfig,
      contractStoragePath:
        userConfig.contractStoragePath ||
        path.join(userConfig.dataStoragePath || '', 'smart-contracts'),
    };

    // Ensure required directories exist
    await fs.ensureDir(config.contractStoragePath);
    await fs.ensureDir(path.join(config.contractStoragePath, 'analyzed'));
    await fs.ensureDir(path.join(config.contractStoragePath, 'categorized'));
    await fs.ensureDir(path.join(config.contractStoragePath, 'vulnerability-reports'));

    // Merge vulnerability categorization if provided
    if (userConfig.vulnerabilityCategorization) {
      const existingIds = new Set(config.vulnerabilityCategorization.map(c => c.id));

      for (const category of userConfig.vulnerabilityCategorization) {
        if (existingIds.has(category.id)) {
          // Update existing category
          const index = config.vulnerabilityCategorization.findIndex(c => c.id === category.id);
          config.vulnerabilityCategorization[index] = {
            ...config.vulnerabilityCategorization[index],
            ...category,
            patterns: [
              ...config.vulnerabilityCategorization[index].patterns,
              ...(category.patterns || []),
            ],
          };
        } else {
          // Add new category
          config.vulnerabilityCategorization.push(category);
          existingIds.add(category.id);
        }
      }
    }

    initialized = true;
    return true;
  } catch (error) {
    console.error('Failed to initialize smart contract categorizer:', error);
    return false;
  }
}

/**
 * Categorize smart contracts for vulnerabilities
 * @param {Object} options - Categorization options
 * @returns {Promise<Object>} Categorization results
 */
async function categorizeContracts(options = {}) {
  if (!initialized) {
    throw new Error('Smart contract categorizer has not been initialized');
  }

  const {
    contractPaths = [],
    contractDirectories = [],
    includeVerifiedContracts = true,
    networkFilter = [],
    maxContracts = 1000,
  } = options;

  const categorizationId = `contract-categorization-${crypto.randomBytes(4).toString('hex')}`;
  const timestamp = new Date().toISOString();

  const results = {
    categorizationId,
    timestamp,
    analyzedContractCount: 0,
    count: 0,
    items: [],
    vulnerabilitiesByCategory: {},
    vulnerabilitiesBySeverity: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      info: 0,
    },
  };

  try {
    // Collect contracts to analyze
    const contractsToAnalyze = [];

    // Add specific contract paths
    for (const contractPath of contractPaths) {
      if (await fs.pathExists(contractPath)) {
        contractsToAnalyze.push({
          path: contractPath,
          name: path.basename(contractPath),
          source: 'path',
        });
      }
    }

    // Add contracts from directories
    for (const dirPath of contractDirectories) {
      if (await fs.pathExists(dirPath)) {
        const files = await fs.readdir(dirPath);
        for (const file of files.filter(f => f.endsWith('.sol') || f.endsWith('.json'))) {
          contractsToAnalyze.push({
            path: path.join(dirPath, file),
            name: file,
            source: 'directory',
          });
        }
      }
    }

    // Add verified contracts if requested
    if (includeVerifiedContracts) {
      const verifiedContracts = await getVerifiedContracts(networkFilter);
      contractsToAnalyze.push(...verifiedContracts);
    }

    // Limit the number of contracts to analyze
    const limitedContracts = contractsToAnalyze.slice(0, maxContracts);
    results.analyzedContractCount = limitedContracts.length;

    // Analyze each contract
    for (const contract of limitedContracts) {
      try {
        console.log(`Analyzing contract: ${contract.name}`);

        // Read contract content
        let contractData;
        if (contract.source === 'verified') {
          // For verified contracts, we already have the content
          contractData = contract.content;
        } else {
          // Read from file
          const content = await fs.readFile(contract.path, 'utf8');
          contractData = contract.path.endsWith('.json')
            ? JSON.parse(content)
            : { sourceCode: content };
        }

        // Extract source code
        const sourceCode =
          contractData.sourceCode || contractData.source || contractData.code || '';

        // Analyze the contract for vulnerabilities
        const analysisResult = analyzeContractVulnerabilities(sourceCode, contract);

        // Save analysis result
        const analysisPath = path.join(
          config.contractStoragePath,
          'analyzed',
          `${contract.name.replace(/[^a-zA-Z0-9-_]/g, '_')}-${crypto.randomBytes(4).toString('hex')}.json`
        );

        await fs.writeJson(
          analysisPath,
          {
            contract: contract.name,
            path: contract.path,
            source: contract.source,
            timestamp,
            analysisResult,
          },
          { spaces: 2 }
        );

        // Add vulnerabilities to results
        if (analysisResult.vulnerabilities && analysisResult.vulnerabilities.length > 0) {
          results.items.push(...analysisResult.vulnerabilities);
          results.count += analysisResult.vulnerabilities.length;

          // Update category and severity counts
          analysisResult.vulnerabilities.forEach(vuln => {
            // Update by category
            if (!results.vulnerabilitiesByCategory[vuln.category]) {
              results.vulnerabilitiesByCategory[vuln.category] = 0;
            }
            results.vulnerabilitiesByCategory[vuln.category]++;

            // Update by severity
            if (vuln.severity) {
              results.vulnerabilitiesBySeverity[vuln.severity]++;
            }
          });
        }
      } catch (error) {
        console.error(`Error analyzing contract ${contract.name}:`, error);
      }
    }

    // Save categorization results
    const resultPath = path.join(
      config.contractStoragePath,
      'categorized',
      `${categorizationId}.json`
    );

    await fs.writeJson(resultPath, results, { spaces: 2 });

    return results;
  } catch (error) {
    console.error('Error categorizing contracts:', error);
    return {
      ...results,
      status: 'error',
      error: error.message,
    };
  }
}

/**
 * Analyze a contract for potential vulnerabilities
 * @param {string} sourceCode - Contract source code
 * @param {Object} contract - Contract metadata
 * @returns {Object} Analysis results
 */
function analyzeContractVulnerabilities(sourceCode, contract) {
  const vulnerabilities = [];
  const categories = {};

  // Check each vulnerability category
  for (const category of config.vulnerabilityCategorization) {
    const matchingPatterns = [];
    const lineMatches = [];

    // Check each pattern in the category
    for (const pattern of category.patterns) {
      const regex = new RegExp(pattern.pattern, 'g');
      const matches = [];

      // Find all matches in the source code
      const lines = sourceCode.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (regex.test(line)) {
          matches.push({
            line: i + 1,
            content: line.trim(),
          });
        }
        regex.lastIndex = 0; // Reset regex for next test
      }

      if (matches.length > 0) {
        matchingPatterns.push({
          pattern: pattern.pattern,
          matches,
        });

        lineMatches.push(...matches);
      }
    }

    // If any patterns matched, record a vulnerability
    if (matchingPatterns.length > 0) {
      // Create a category count
      categories[category.id] = lineMatches.length;

      // Add unique vulnerability findings (we'll merge similar lines)
      const uniqueLines = new Set();

      for (const match of lineMatches) {
        const lineKey = `${match.line}:${match.content}`;

        if (!uniqueLines.has(lineKey)) {
          uniqueLines.add(lineKey);

          vulnerabilities.push({
            id: `${category.id}-${vulnerabilities.length + 1}`,
            category: category.id,
            categoryName: category.name,
            description: category.description,
            severity: category.severity,
            line: match.line,
            code: match.content,
            contractName: contract.name,
            contractSource: contract.source,
            confidence: calculateConfidence(category, matchingPatterns.length, sourceCode),
            remediationSuggestion: getRemediationSuggestion(category.id),
          });
        }
      }
    }
  }

  return {
    contractName: contract.name,
    contractSource: contract.source,
    vulnerabilityCount: vulnerabilities.length,
    categoryCounts: categories,
    vulnerabilities,
  };
}

/**
 * Calculate confidence level for a vulnerability finding
 * @param {Object} category - Vulnerability category
 * @param {number} matchCount - Number of matching patterns
 * @param {string} sourceCode - Complete source code
 * @returns {string} Confidence level (high, medium, low)
 */
function calculateConfidence(category, matchCount, sourceCode) {
  // Simplified confidence calculation
  // In a real system, this would be more sophisticated

  if (matchCount >= 3) {
    return 'high';
  }

  if (matchCount === 2) {
    return 'medium';
  }

  return 'low';
}

/**
 * Get remediation suggestion for a vulnerability category
 * @param {string} categoryId - Category identifier
 * @returns {string} Remediation suggestion
 */
function getRemediationSuggestion(categoryId) {
  const suggestions = {
    reentrancy:
      "Implement a reentrancy guard or follow the checks-effects-interactions pattern. Consider using OpenZeppelin's ReentrancyGuard.",
    'access-control':
      "Implement proper access control modifiers. Use OpenZeppelin's Ownable or AccessControl contracts.",
    arithmetic:
      'Use SafeMath library or Solidity 0.8.0+ with built-in overflow checking. Be cautious with arithmetic operations.',
    'unchecked-return':
      'Always check return values from external calls. Prefer using the transfer() function for ETH transfers when possible.',
    'front-running':
      'Implement a commit-reveal scheme or use a private mempool solution like Flashbots.',
    dos: 'Avoid unbounded loops. Implement pull-over-push patterns for token distributions.',
    'tx-origin': 'Use msg.sender instead of tx.origin for authentication.',
  };

  return suggestions[categoryId] || 'Review the code for potential security issues.';
}

/**
 * Get verified contracts for analysis (simulated function)
 * @param {Array} networkFilter - Networks to filter by
 * @returns {Promise<Array>} Verified contracts
 */
async function getVerifiedContracts(networkFilter = []) {
  // In a real implementation, this would fetch verified contracts from APIs
  // For now, we'll simulate with generated data

  const contractCount = Math.floor(Math.random() * 20) + 5;
  const contracts = [];

  const networks =
    networkFilter.length > 0 ? networkFilter : ['ethereum', 'polygon', 'optimism', 'arbitrum'];

  for (let i = 0; i < contractCount; i++) {
    const network = networks[Math.floor(Math.random() * networks.length)];
    const contractName = `Simulated${['Token', 'Exchange', 'Vault', 'Staking', 'NFT'][Math.floor(Math.random() * 5)]}${i}`;

    // Generate a simple contract template based on type
    let sourceCode;
    const contractType = Math.floor(Math.random() * 5);

    switch (contractType) {
      case 0: // Token
        sourceCode = generateTokenContract(contractName);
        break;
      case 1: // Exchange
        sourceCode = generateExchangeContract(contractName);
        break;
      case 2: // Vault
        sourceCode = generateVaultContract(contractName);
        break;
      case 3: // Staking
        sourceCode = generateStakingContract(contractName);
        break;
      case 4: // NFT
        sourceCode = generateNFTContract(contractName);
        break;
      default:
        sourceCode = generateTokenContract(contractName);
    }

    contracts.push({
      name: contractName,
      path: `${network}/${contractName}`,
      source: 'verified',
      network,
      content: {
        sourceCode,
        version: '0.8.0',
      },
    });
  }

  return contracts;
}

/**
 * Generate a simulated token contract
 * @param {string} name - Contract name
 * @returns {string} Contract source code
 */
function generateTokenContract(name) {
  // Add potential vulnerabilities randomly
  const vulnerabilities = [];

  if (Math.random() > 0.7) vulnerabilities.push('reentrancy');
  if (Math.random() > 0.7) vulnerabilities.push('access-control');
  if (Math.random() > 0.7) vulnerabilities.push('arithmetic');

  let contract = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ${name} {
    string public name = "${name}";
    string public symbol = "${name.substring(0, 3).toUpperCase()}";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10 ** decimals;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    address public owner;
    
    constructor() {
        owner = msg.sender;
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        
        return true;
    }
    
    function approve(address spender, uint256 value) public returns (bool success) {
        allowance[msg.sender][spender] = value;
        return true;
    }
    
    function transferFrom(address from, address to, uint256 value) public returns (bool success) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Insufficient allowance");
        
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        
        return true;
    }
  `;

  // Add vulnerability code patterns based on random selection
  if (vulnerabilities.includes('reentrancy')) {
    contract += `
    function withdraw(uint256 amount) public {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
    `;
  }

  if (vulnerabilities.includes('access-control')) {
    contract += `
    function transferOwnership(address newOwner) public {
        // Missing access control
        owner = newOwner;
    }
    
    function emergencyWithdraw() public {
        // No access control check
        selfdestruct(payable(msg.sender));
    }
    `;
  }

  if (vulnerabilities.includes('arithmetic')) {
    contract += `
    function mint(address to, uint256 amount) public {
        // No overflow check in older Solidity versions
        // No access control
        totalSupply += amount;
        balanceOf[to] += amount;
    }
    `;
  }

  contract += `
}`;

  return contract;
}

/**
 * Generate a simulated exchange contract
 * @param {string} name - Contract name
 * @returns {string} Contract source code
 */
function generateExchangeContract(name) {
  // Add potential vulnerabilities randomly
  const vulnerabilities = [];

  if (Math.random() > 0.7) vulnerabilities.push('front-running');
  if (Math.random() > 0.7) vulnerabilities.push('unchecked-return');

  let contract = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ${name} {
    mapping(address => mapping(address => uint256)) public reserves;
    
    function swap(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut) public {
        require(reserves[address(this)][tokenIn] > 0, "Insufficient reserves");
        require(reserves[address(this)][tokenOut] > 0, "Insufficient reserves");
        
        uint256 amountOut = calculateAmountOut(tokenIn, tokenOut, amountIn);
        require(amountOut >= minAmountOut, "Slippage too high");
        
        // Transfer tokens
        // ERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        // ERC20(tokenOut).transfer(msg.sender, amountOut);
        
        reserves[address(this)][tokenIn] += amountIn;
        reserves[address(this)][tokenOut] -= amountOut;
    }
    
    function calculateAmountOut(address tokenIn, address tokenOut, uint256 amountIn) internal view returns (uint256) {
        uint256 reserveIn = reserves[address(this)][tokenIn];
        uint256 reserveOut = reserves[address(this)][tokenOut];
        
        return (amountIn * reserveOut) / (reserveIn + amountIn);
    }
  `;

  // Add vulnerability code patterns based on random selection
  if (vulnerabilities.includes('front-running')) {
    contract += `
    function executeOrder(uint256 price, uint256 expiration) public {
        require(block.timestamp < expiration, "Order expired");
        // Vulnerable to front-running due to visible parameters
        
        // Execute order logic...
    }
    `;
  }

  if (vulnerabilities.includes('unchecked-return')) {
    contract += `
    function withdrawFees(address token, uint256 amount) public {
        // Unchecked return value
        token.call(abi.encodeWithSignature("transfer(address,uint256)", msg.sender, amount));
    }
    `;
  }

  contract += `
}`;

  return contract;
}

/**
 * Generate a simulated vault contract
 * @param {string} name - Contract name
 * @returns {string} Contract source code
 */
function generateVaultContract(name) {
  // Add potential vulnerabilities randomly
  const vulnerabilities = [];

  if (Math.random() > 0.7) vulnerabilities.push('reentrancy');
  if (Math.random() > 0.7) vulnerabilities.push('tx-origin');

  let contract = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ${name} {
    mapping(address => uint256) public balances;
    address public admin;
    
    constructor() {
        admin = msg.sender;
    }
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
  `;

  // Add vulnerability code patterns based on random selection
  if (vulnerabilities.includes('reentrancy')) {
    contract += `
    function withdrawUnsafe(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        // Reentrancy vulnerability - state change after external call
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        balances[msg.sender] -= amount;
    }
    `;
  }

  if (vulnerabilities.includes('tx-origin')) {
    contract += `
    function withdrawAdmin(uint256 amount) public {
        // Using tx.origin is unsafe for authorization
        require(tx.origin == admin, "Not admin");
        payable(msg.sender).transfer(amount);
    }
    `;
  }

  contract += `
}`;

  return contract;
}

/**
 * Generate a simulated staking contract
 * @param {string} name - Contract name
 * @returns {string} Contract source code
 */
function generateStakingContract(name) {
  // Add potential vulnerabilities randomly
  const vulnerabilities = [];

  if (Math.random() > 0.7) vulnerabilities.push('dos');
  if (Math.random() > 0.7) vulnerabilities.push('arithmetic');

  let contract = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ${name} {
    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }
    
    mapping(address => Stake) public stakes;
    address[] public stakers;
    
    uint256 public rewardRate = 10; // 10% per year
    
    function stake() public payable {
        require(msg.value > 0, "Cannot stake 0");
        
        if (stakes[msg.sender].amount == 0) {
            stakers.push(msg.sender);
        }
        
        stakes[msg.sender].amount += msg.value;
        stakes[msg.sender].timestamp = block.timestamp;
    }
    
    function unstake() public {
        require(stakes[msg.sender].amount > 0, "No stake found");
        
        uint256 reward = calculateReward(msg.sender);
        uint256 amount = stakes[msg.sender].amount;
        
        stakes[msg.sender].amount = 0;
        
        payable(msg.sender).transfer(amount + reward);
    }
    
    function calculateReward(address user) public view returns (uint256) {
        uint256 stakingDuration = block.timestamp - stakes[user].timestamp;
        return stakes[user].amount * rewardRate * stakingDuration / (365 days * 100);
    }
  `;

  // Add vulnerability code patterns based on random selection
  if (vulnerabilities.includes('dos')) {
    contract += `
    function distributeRewards() public {
        // Unbounded loop - DOS vulnerability
        for (uint256 i = 0; i < stakers.length; i++) {
            address staker = stakers[i];
            uint256 reward = calculateReward(staker);
            payable(staker).transfer(reward);
            stakes[staker].timestamp = block.timestamp;
        }
    }
    `;
  }

  if (vulnerabilities.includes('arithmetic')) {
    contract += `
    function updateRewards(uint256 multiplier) public {
        // Arithmetic issue if multiplier is very large
        rewardRate = rewardRate * multiplier;
    }
    `;
  }

  contract += `
}`;

  return contract;
}

/**
 * Generate a simulated NFT contract
 * @param {string} name - Contract name
 * @returns {string} Contract source code
 */
function generateNFTContract(name) {
  // Add potential vulnerabilities randomly
  const vulnerabilities = [];

  if (Math.random() > 0.7) vulnerabilities.push('access-control');
  if (Math.random() > 0.7) vulnerabilities.push('unchecked-return');

  let contract = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ${name} {
    mapping(uint256 => address) public tokenOwner;
    mapping(uint256 => string) public tokenURI;
    mapping(address => uint256) public balances;
    
    uint256 public nextTokenId = 1;
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    function mint(string memory uri) public {
        uint256 tokenId = nextTokenId++;
        tokenOwner[tokenId] = msg.sender;
        tokenURI[tokenId] = uri;
        balances[msg.sender]++;
    }
    
    function transfer(address to, uint256 tokenId) public {
        require(tokenOwner[tokenId] == msg.sender, "Not the owner");
        
        tokenOwner[tokenId] = to;
        balances[msg.sender]--;
        balances[to]++;
    }
  `;

  // Add vulnerability code patterns based on random selection
  if (vulnerabilities.includes('access-control')) {
    contract += `
    function setTokenURI(uint256 tokenId, string memory uri) public {
        // Missing access control
        tokenURI[tokenId] = uri;
    }
    
    function batchMint(address[] memory recipients, string[] memory uris) public {
        // No access control
        for (uint256 i = 0; i < recipients.length; i++) {
            uint256 tokenId = nextTokenId++;
            tokenOwner[tokenId] = recipients[i];
            tokenURI[tokenId] = uris[i];
            balances[recipients[i]]++;
        }
    }
    `;
  }

  if (vulnerabilities.includes('unchecked-return')) {
    contract += `
    function withdrawFunds() public {
        // Unchecked return value
        owner.call{value: address(this).balance}("");
    }
    `;
  }

  contract += `
}`;

  return contract;
}

module.exports = {
  initialize,
  categorizeContracts,
};
