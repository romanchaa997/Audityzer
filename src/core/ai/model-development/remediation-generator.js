/**
 * Automated Remediation Suggestion Generator
 *
 * This module generates remediation suggestions for detected vulnerabilities
 * using pattern matching and contextual analysis.
 */

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const modelInterface = require('../model-interface');

// Common remediation templates for different vulnerability types
const REMEDIATION_TEMPLATES = {
  REENTRANCY: [
    {
      pattern: 'external call after state',
      suggestion:
        'Follow the Checks-Effects-Interactions pattern: perform all state changes before making external calls',
      code: `// Before external call
this.userBalances[msg.sender] = 0;

// Then make external call
(bool success, ) = msg.sender.call{value: amount}("");
require(success, "Transfer failed");`,
    },
    {
      pattern: 'reentrant',
      suggestion: 'Use a reentrancy guard modifier',
      code: `// Add a reentrancy guard
bool private locked;

modifier nonReentrant() {
    require(!locked, "Reentrant call");
    locked = true;
    _;
    locked = false;
}

function withdraw() external nonReentrant {
    // function implementation
}`,
    },
  ],
  ACCESS_CONTROL: [
    {
      pattern: 'missing authorization',
      suggestion: 'Add access control checks using modifiers',
      code: `// Define an owner variable
address private owner;

// Set it in constructor
constructor() {
    owner = msg.sender;
}

// Add access control modifier
modifier onlyOwner() {
    require(msg.sender == owner, "Not authorized");
    _;
}

// Use modifier on sensitive functions
function sensitiveFunction() external onlyOwner {
    // function implementation
}`,
    },
  ],
  ARITHMETIC: [
    {
      pattern: 'overflow',
      suggestion: 'Use SafeMath library or Solidity 0.8.0+ with built-in overflow checks',
      code: `// For Solidity < 0.8.0, use SafeMath
using SafeMath for uint256;
uint256 result = a.add(b);

// For Solidity 0.8.0+, use built-in overflow protection
// No special code needed, just make sure pragma is 0.8.0 or higher
// pragma solidity ^0.8.0;
uint256 result = a + b; // Will revert on overflow`,
    },
  ],
  CROSS_CHAIN: [
    {
      pattern: 'bridge',
      suggestion: 'Implement proper message verification and replay protection',
      code: `// Track processed message IDs
mapping(bytes32 => bool) public processedMessages;

// Verify and process incoming messages
function processMessage(bytes32 messageId, bytes memory data, bytes memory proof) external {
    // Verify message is from trusted source (implementation depends on bridge)
    require(verifyMessageSource(data, proof), "Invalid message source");
    
    // Check for replay
    require(!processedMessages[messageId], "Message already processed");
    
    // Mark as processed
    processedMessages[messageId] = true;
    
    // Process message
    // ...
}`,
    },
  ],
  FRONT_RUNNING: [
    {
      pattern: 'front-running',
      suggestion: 'Use commit-reveal pattern or set appropriate slippage limits',
      code: `// Commit-reveal example
mapping(address => bytes32) public commitments;

// Step 1: User commits hash
function commit(bytes32 hash) external {
    commitments[msg.sender] = hash;
}

// Step 2: User reveals after min blocks passed
function reveal(uint256 value, bytes32 secret) external {
    // Recreate hash to verify
    bytes32 hash = keccak256(abi.encodePacked(value, secret, msg.sender));
    require(commitments[msg.sender] == hash, "Invalid commitment");
    
    // Process the revealed value
    // ...
    
    // Clear commitment
    delete commitments[msg.sender];
}`,
    },
  ],
};

// Configuration with default settings
let config = {
  confidenceThreshold: 0.7,
  useAI: true,
  templatePath: path.join(__dirname, '../data/remediation-templates'),
  customRemediationPath: path.join(__dirname, '../data/custom-remediations'),
  enableCodeGeneration: true,
};

// Initialize flag
let initialized = false;

/**
 * Initialize the remediation generator
 * @param {Object} options - Configuration options
 * @returns {Promise<Object>} Initialization result
 */
async function initialize(options = {}) {
  try {
    // Merge config with options
    config = { ...config, ...options };

    // Create directories if they don't exist
    fs.ensureDirSync(config.templatePath);
    fs.ensureDirSync(config.customRemediationPath);

    // Save predefined templates
    if (!fs.existsSync(path.join(config.templatePath, 'base-templates.json'))) {
      fs.writeFileSync(
        path.join(config.templatePath, 'base-templates.json'),
        JSON.stringify(REMEDIATION_TEMPLATES, null, 2),
        'utf8'
      );
    }

    initialized = true;

    return {
      status: 'success',
      message: 'Remediation generator initialized successfully',
    };
  } catch (error) {
    console.error('Error initializing remediation generator:', error);
    return {
      status: 'error',
      message: error.message,
    };
  }
}

/**
 * Generate remediation suggestions for vulnerabilities
 * @param {Array} vulnerabilities - Detected vulnerabilities
 * @returns {Promise<Object>} Remediation report
 */
async function generateRemediationReport(vulnerabilities) {
  if (!initialized) {
    throw new Error('Remediation generator not initialized');
  }

  try {
    const report = {
      generatedAt: new Date().toISOString(),
      vulnerabilityCount: vulnerabilities.length,
      remediations: [],
    };

    // Process each vulnerability
    for (const vulnerability of vulnerabilities) {
      // Determine the vulnerability type or pattern ID
      const vulnType =
        vulnerability.patternId || vulnerability.classification || vulnerability.type || 'UNKNOWN';

      // Check if we have a template for this vulnerability type
      if (REMEDIATION_TEMPLATES[vulnType]) {
        // Use predefined template
        const template = REMEDIATION_TEMPLATES[vulnType];

        report.remediations.push({
          vulnerabilityId: vulnerability.id,
          vulnerabilityName: vulnerability.name,
          title: vulnType,
          description: template.suggestion,
          solutions: template.code ? [template] : [],
          references: [],
          confidence: 0.95,
          remediationId: `rem-${crypto.randomBytes(4).toString('hex')}`,
        });
      } else {
        // No predefined template, generate custom remediation if AI is enabled
        if (config.useAI && config.enableCodeGeneration) {
          const aiRemediation = await generateAIRemediation(vulnerability);
          report.remediations.push(aiRemediation);
        } else {
          // Fallback to generic suggestions
          report.remediations.push(generateGenericRemediation(vulnerability));
        }
      }
    }

    return report;
  } catch (error) {
    console.error('Error generating remediation report:', error);
    return {
      status: 'error',
      message: error.message,
    };
  }
}

/**
 * Generate remediation using AI model
 * @param {Object} vulnerability - Vulnerability to fix
 * @returns {Promise<Object>} AI-generated remediation
 */
async function generateAIRemediation(vulnerability) {
  try {
    // Check if model interface is available
    if (!modelInterface || !modelInterface.isInitialized()) {
      throw new Error('Model interface not available');
    }

    // Create prompt for remediation generation
    const prompt = `
Generate a secure fix for the following smart contract vulnerability:

Vulnerability Type: ${vulnerability.patternId || vulnerability.classification || vulnerability.type || 'Unknown'}
Name: ${vulnerability.name}
Description: ${vulnerability.description}
Severity: ${vulnerability.severity || 'medium'}
${vulnerability.code ? `Affected Code: ${vulnerability.code}` : ''}

Please provide:
1. A brief explanation of the vulnerability
2. At least two alternative solutions with example code
3. References to security best practices or standards

Format your response as JSON with the following structure:
{
  "title": "Fix [Vulnerability Name]",
  "description": "Brief explanation of the issue",
  "solutions": [
    {
      "title": "Solution 1 Name",
      "description": "Description of solution 1",
      "code": "// Example code for solution 1"
    },
    {
      "title": "Solution 2 Name",
      "description": "Description of solution 2",
      "code": "// Example code for solution 2"
    }
  ],
  "references": [
    {
      "title": "Reference 1",
      "url": "URL to reference 1"
    }
  ]
}
`;

    // Get response from model
    const aiResponse = await modelInterface.generateCompletion(prompt, {
      temperature: 0.2,
      maxTokens: 1500,
      stopSequences: [],
    });

    // Parse JSON response
    try {
      // Extract JSON if the response has other text around it
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : aiResponse;

      const parsedResponse = JSON.parse(jsonStr);

      // Format and return remediation
      return {
        vulnerabilityId: vulnerability.id,
        vulnerabilityName: vulnerability.name,
        title: parsedResponse.title,
        description: parsedResponse.description,
        solutions: parsedResponse.solutions,
        references: parsedResponse.references,
        confidence: 0.8, // AI-generated remediations have lower confidence than templates
        generatedBy: 'ai',
        remediationId: `ai-rem-${crypto.randomBytes(4).toString('hex')}`,
      };
    } catch (parseError) {
      console.warn('Failed to parse AI response as JSON:', parseError.message);
      return generateGenericRemediation(vulnerability);
    }
  } catch (error) {
    console.error('Error generating AI remediation:', error);
    return generateGenericRemediation(vulnerability);
  }
}

/**
 * Generate generic remediation when specific templates or AI are unavailable
 * @param {Object} vulnerability - Vulnerability to fix
 * @returns {Object} Generic remediation
 */
function generateGenericRemediation(vulnerability) {
  // Map severity to general security guidance
  const securityGuidance = {
    critical: [
      {
        title: 'Implement Formal Verification',
        description:
          'Consider using formal verification tools to mathematically prove the security of your contract',
        code: '// Refer to tools like Certora, SMTChecker, or similar formal verification platforms',
      },
      {
        title: 'Comprehensive Security Audit',
        description: 'Engage a professional security firm for thorough smart contract auditing',
        code: '// Follow auditor recommendations and implement all suggested fixes',
      },
    ],
    high: [
      {
        title: 'Follow Standard Security Patterns',
        description: 'Implement established security patterns and use audited libraries',
        code: '// Consider using OpenZeppelin contracts for standard functionality\nimport "@openzeppelin/contracts/security/ReentrancyGuard.sol";\nimport "@openzeppelin/contracts/access/Ownable.sol";',
      },
      {
        title: 'Extensive Testing',
        description: 'Implement extensive unit and integration tests focusing on security aspects',
        code: '// Use tools like Hardhat, Foundry, or Brownie for comprehensive testing',
      },
    ],
    medium: [
      {
        title: 'Code Review and Testing',
        description: 'Conduct thorough code review and implement test cases for identified issues',
        code: '// Follow the checks-effects-interactions pattern\n// Ensure proper access control on all sensitive functions',
      },
    ],
    low: [
      {
        title: 'Follow Best Practices',
        description: 'Ensure code follows Web3 security best practices',
        code: '// Refer to security checklists and guidelines for smart contract development',
      },
    ],
  };

  // Get guidance based on severity
  const severity = vulnerability.severity || 'medium';
  const guidance = securityGuidance[severity] || securityGuidance.medium;

  return {
    vulnerabilityId: vulnerability.id,
    vulnerabilityName: vulnerability.name,
    title: `Fix ${vulnerability.name || vulnerability.patternId || 'Security Issue'}`,
    description: `This is a ${severity} severity issue that needs to be addressed. ${vulnerability.description || ''}`,
    solutions: guidance,
    references: [
      {
        title: 'Smart Contract Best Practices',
        url: 'https://consensys.github.io/smart-contract-best-practices/',
      },
      { title: 'SWC Registry', url: 'https://swcregistry.io/' },
    ],
    confidence: 0.6, // Generic remediations have lower confidence
    generatedBy: 'generic',
    remediationId: `gen-rem-${crypto.randomBytes(4).toString('hex')}`,
  };
}

module.exports = {
  initialize,
  generateRemediationReport,
  generateAIRemediation,
  generateGenericRemediation,
  REMEDIATION_TEMPLATES,
};
