/**
 * Advanced Pattern Recognition System for Web3 Vulnerabilities
 * Detects common and novel vulnerability patterns in smart contracts and DApps
 */

const crypto = require('crypto');
const ethers = require('ethers');

// Configuration for pattern recognition
const config = {
  patternThreshold: 0.75,
  detectionMode: 'advanced',
  enableMachineLearning: true,
  vulnerabilityPatterns: [
    // Re-entrancy patterns
    {
      id: 'REENTRANCY',
      name: 'Re-entrancy Vulnerability',
      description: 'State changes after external calls',
      patterns: [
        {
          type: 'code',
          regex: /(\.\s*transfer|\.\s*send|\.\s*call).*?;\s*([^;]*?state\s*change)/is,
        },
        {
          type: 'ast',
          nodeTypes: ['FunctionCall', 'Assignment'],
          conditions: ['externalCall', 'stateVariableWrite'],
        },
        { type: 'flow', sequence: ['externalCall', 'stateChange'] },
      ],
      severity: 'high',
      cwe: 'CWE-841',
    },
    // Access control patterns
    {
      id: 'MISSING_ACCESS_CONTROL',
      name: 'Missing Access Control',
      description: 'Critical functions without proper access controls',
      patterns: [
        {
          type: 'code',
          regex:
            /function\s+(\w+)\s*\([^)]*\)\s*(?:public|external)(?!\s*view|\s*pure)(?:(?!require\s*\(\s*(?:msg\.sender|_msgSender\s*\(\s*\))\s*==).)*?{/is,
        },
        {
          type: 'ast',
          nodeTypes: ['FunctionDefinition'],
          conditions: ['isPublicOrExternal', 'modifiesState', 'noAccessControl'],
        },
        { type: 'semantic', concepts: ['criticalFunction', 'noModifier', 'noRequireOwner'] },
      ],
      severity: 'high',
      cwe: 'CWE-284',
    },
    // Integer overflow/underflow
    {
      id: 'INTEGER_OVERFLOW',
      name: 'Integer Overflow/Underflow',
      description: 'Arithmetic operations without SafeMath or overflow checks',
      patterns: [
        {
          type: 'code',
          regex:
            /(?:uint\d*\s+\w+[^;]*?;.*?)(?:(?!using\s+SafeMath|require\s*\([^)]*?<=\s*\+|\^\s*=\s*0\.8).)*?(?:\+=|\-=|\*=|\/=|\+\+|\-\-)/is,
        },
        {
          type: 'ast',
          nodeTypes: ['BinaryOperation', 'Assignment'],
          conditions: ['arithmeticOp', 'noOverflowCheck'],
        },
        { type: 'semantic', concepts: ['unsafeArithmetic', 'notChecked'] },
      ],
      severity: 'medium',
      cwe: 'CWE-190',
    },
    // Flash loan attack vectors
    {
      id: 'FLASH_LOAN_VULNERABILITY',
      name: 'Flash Loan Attack Vector',
      description: 'Vulnerable price oracle or liquidity manipulation',
      patterns: [
        {
          type: 'code',
          regex: /(?:price|amount|value).*?=.*?(?:getReserves|balanceOf|getAmountOut)/is,
        },
        {
          type: 'ast',
          nodeTypes: ['FunctionCall', 'Assignment'],
          conditions: ['priceCalculation', 'usesSingleSource'],
        },
        { type: 'flow', sequence: ['getLiquidity', 'calculatePrice', 'swapTokens'] },
      ],
      severity: 'high',
      cwe: 'CWE-400',
    },
    // Unchecked return values
    {
      id: 'UNCHECKED_RETURN',
      name: 'Unchecked Return Value',
      description: 'Failed to check the return value of an external call',
      patterns: [
        { type: 'code', regex: /\.\s*(?:transfer|send|call)\s*\([^)]*\);(?!\s*require|\s*if)/is },
        {
          type: 'ast',
          nodeTypes: ['FunctionCall'],
          conditions: ['externalCall', 'returnValueNotChecked'],
        },
        { type: 'semantic', concepts: ['lowLevelCall', 'missingCheck'] },
      ],
      severity: 'medium',
      cwe: 'CWE-252',
    },
  ],
};

/**
 * Detects vulnerability patterns in smart contract code
 * @param {string} code - Contract source code
 * @param {Object} options - Detection options
 * @returns {Array} Detected vulnerabilities
 */
function detectVulnerabilities(code, options = {}) {
  const results = [];
  const mergedOptions = { ...config, ...options };

  try {
    // Process each vulnerability pattern
    for (const pattern of mergedOptions.vulnerabilityPatterns) {
      // Check code patterns first (regex-based)
      for (const codePattern of pattern.patterns.filter(p => p.type === 'code')) {
        const matches = [...code.matchAll(codePattern.regex)];

        for (const match of matches) {
          results.push({
            id: `${pattern.id}-${crypto.randomBytes(4).toString('hex')}`,
            patternId: pattern.id,
            name: pattern.name,
            description: pattern.description,
            severity: pattern.severity,
            cwe: pattern.cwe,
            confidence: calculateConfidence(match, pattern),
            location: findLocationInCode(code, match.index, match[0].length),
            matchedPattern: match[0],
            detectedAt: new Date().toISOString(),
          });
        }
      }
    }

    // Apply ML-based detection if enabled
    if (mergedOptions.enableMachineLearning) {
      const mlResults = applyMLDetection(code, mergedOptions);
      results.push(...mlResults);
    }

    // Remove duplicates and merge similar findings
    return deduplicateResults(results);
  } catch (error) {
    console.error('Error in vulnerability detection:', error);
    return [
      {
        id: `ERROR-${crypto.randomBytes(4).toString('hex')}`,
        name: 'Detection Error',
        description: `Error during pattern detection: ${error.message}`,
        severity: 'medium',
        confidence: 0.5,
        detectedAt: new Date().toISOString(),
      },
    ];
  }
}

/**
 * Calculate confidence score for a vulnerability match
 * @param {Array} match - Regex match result
 * @param {Object} pattern - Vulnerability pattern
 * @returns {number} Confidence score (0-1)
 */
function calculateConfidence(match, pattern) {
  // Base confidence
  let confidence = 0.7;

  // Adjust based on match quality
  if (match[0].length > 100) {
    confidence += 0.1; // Longer matches are more likely to be real
  }

  // Adjust based on pattern severity
  if (pattern.severity === 'high') {
    confidence += 0.05;
  } else if (pattern.severity === 'critical') {
    confidence += 0.1;
  }

  // Cap confidence at 0.95
  return Math.min(0.95, confidence);
}

/**
 * Find code location (line, column) from character index
 * @param {string} code - Source code
 * @param {number} index - Character index
 * @param {number} length - Match length
 * @returns {Object} Location information
 */
function findLocationInCode(code, index, length) {
  const lines = code.slice(0, index).split('\n');
  const lineNumber = lines.length;
  const columnNumber = lines[lines.length - 1].length + 1;

  // Extract the affected code snippet
  const allLines = code.split('\n');
  const startLine = Math.max(1, lineNumber - 2);
  const endLine = Math.min(allLines.length, lineNumber + 3);
  const codeSnippet = allLines.slice(startLine - 1, endLine).join('\n');

  return {
    line: lineNumber,
    column: columnNumber,
    length,
    startLine,
    endLine,
    snippet: codeSnippet,
  };
}

/**
 * Apply machine learning based detection
 * @param {string} code - Source code
 * @param {Object} options - Detection options
 * @returns {Array} ML-detected vulnerabilities
 */
function applyMLDetection(code, options) {
  // This would integrate with a real ML model in production
  // For now, we'll implement a simplified heuristic approach

  const results = [];

  // Check for potential proxy implementation issues
  if (
    code.includes('delegatecall') &&
    !code.includes('_delegate') &&
    !code.includes('fallback') &&
    code.includes('implementation')
  ) {
    results.push({
      id: `ML-PROXY-${crypto.randomBytes(4).toString('hex')}`,
      patternId: 'UNSAFE_DELEGATECALL',
      name: 'Unsafe Delegatecall in Proxy',
      description: 'Potential proxy implementation with unsafe delegatecall pattern',
      severity: 'high',
      cwe: 'CWE-829',
      confidence: 0.75,
      detectedBy: 'ml-heuristic',
      detectedAt: new Date().toISOString(),
    });
  }

  // Check for oracle manipulation
  if (
    (code.includes('oracle') || code.includes('price') || code.includes('rate')) &&
    code.includes('update') &&
    !code.includes('Chainlink') &&
    !code.includes('twap')
  ) {
    results.push({
      id: `ML-ORACLE-${crypto.randomBytes(4).toString('hex')}`,
      patternId: 'ORACLE_MANIPULATION',
      name: 'Oracle Manipulation Vulnerability',
      description: 'Custom price oracle without manipulation protection',
      severity: 'high',
      cwe: 'CWE-400',
      confidence: 0.8,
      detectedBy: 'ml-heuristic',
      detectedAt: new Date().toISOString(),
    });
  }

  return results;
}

/**
 * Deduplicate and merge similar findings
 * @param {Array} results - Detection results
 * @returns {Array} Deduplicated results
 */
function deduplicateResults(results) {
  const uniqueResults = [];
  const processedIds = new Set();

  // Sort by confidence (highest first)
  results.sort((a, b) => b.confidence - a.confidence);

  for (const result of results) {
    // Generate a signature for deduplication
    const signature = result.patternId + (result.location ? `-${result.location.line}` : '');

    if (!processedIds.has(signature)) {
      uniqueResults.push(result);
      processedIds.add(signature);
    }
  }

  return uniqueResults;
}

/**
 * Analyze transaction data for vulnerability patterns
 * @param {Array} transactions - Transaction data
 * @returns {Array} Detected vulnerabilities
 */
function analyzeTransactions(transactions) {
  const results = [];

  // Check for front-running opportunities
  const pendingValueTransfers = transactions
    .filter(
      tx => tx.status === 'pending' && (tx.value > 0 || tx.decodedCalldata?.name?.includes('swap'))
    )
    .map(tx => ({
      id: `FRONTRUN-${crypto.randomBytes(4).toString('hex')}`,
      patternId: 'FRONT_RUNNING',
      name: 'Front-Running Opportunity',
      description: 'Pending high-value transaction vulnerable to front-running',
      severity: 'medium',
      cwe: 'CWE-362',
      confidence: 0.7,
      transaction: tx.hash,
      value: ethers.utils.formatEther(tx.value || '0'),
      detectedAt: new Date().toISOString(),
    }));

  results.push(...pendingValueTransfers);

  // Check for flash loan attacks
  const largeSwaps = transactions
    .filter(
      tx =>
        tx.decodedCalldata?.name?.includes('swap') &&
        tx.decodedCalldata?.params?.amountIn > 1000000000000
    )
    .map(tx => ({
      id: `FLASHLOAN-${crypto.randomBytes(4).toString('hex')}`,
      patternId: 'FLASH_LOAN_ATTACK',
      name: 'Potential Flash Loan Attack',
      description: 'Large swap amount indicates possible flash loan attack',
      severity: 'high',
      cwe: 'CWE-400',
      confidence: 0.6,
      transaction: tx.hash,
      amount: tx.decodedCalldata?.params?.amountIn,
      detectedAt: new Date().toISOString(),
    }));

  results.push(...largeSwaps);

  return results;
}

module.exports = {
  detectVulnerabilities,
  analyzeTransactions,
  config,
};
