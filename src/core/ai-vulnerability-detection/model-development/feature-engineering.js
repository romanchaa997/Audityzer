/**
 * Feature Engineering Module
 *
 * Extracts and processes features from smart contracts for
 * machine learning models to use for vulnerability detection.
 */

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

// Default configuration
let config = {
  dataStoragePath: null,
  featureStoragePath: null,
  enabledExtractors: ['codeMetrics', 'patternMatches', 'semanticEmbeddings'],
  codeMetrics: {
    enabled: true,
    complexityThreshold: 10,
  },
  patternMatches: {
    enabled: true,
    patternSets: ['reentrancy', 'access-control', 'arithmetic'],
  },
  semanticEmbeddings: {
    enabled: true,
    embeddingModel: 'code-davinci-002',
    embeddingDimension: 1536,
  },
};

// Vulnerability patterns for feature extraction
const vulnerabilityPatterns = {
  reentrancy: [
    { pattern: /\.call{value:[^}]*}\([^)]*\)/g, weight: 1.0 },
    { pattern: /\.call\.value\([^)]*\)/g, weight: 1.0 },
    { pattern: /function\s+withdraw/g, weight: 0.5 },
    { pattern: /msg\.sender\.call/g, weight: 0.8 },
  ],
  'access-control': [
    { pattern: /selfdestruct/g, weight: 1.0 },
    { pattern: /suicide/g, weight: 1.0 },
    { pattern: /function\s+\w+\s*\([^)]*\)\s*public/g, weight: 0.3 },
    { pattern: /function\s+\w+\s*\([^)]*\)\s*external/g, weight: 0.3 },
    { pattern: /onlyOwner/g, weight: -0.5 }, // Negative weight for protective measure
  ],
  arithmetic: [
    { pattern: /\+\+/g, weight: 0.3 },
    { pattern: /\-\-/g, weight: 0.3 },
    { pattern: /\w+\s*\+=\s*\w+/g, weight: 0.5 },
    { pattern: /\w+\s*\-=\s*\w+/g, weight: 0.5 },
    { pattern: /SafeMath/g, weight: -0.8 }, // Negative weight for protective measure
  ],
  'unchecked-return': [
    { pattern: /\.call\(/g, weight: 0.8 },
    { pattern: /\.send\(/g, weight: 0.8 },
    { pattern: /require\(.*\.send/g, weight: -0.5 }, // Negative weight for protective measure
    { pattern: /require\(.*\.call/g, weight: -0.5 }, // Negative weight for protective measure
  ],
  'front-running': [
    { pattern: /require\([^)]*block\.timestamp/g, weight: 0.8 },
    { pattern: /require\([^)]*block\.number/g, weight: 0.8 },
    { pattern: /block\.timestamp/g, weight: 0.5 },
  ],
  dos: [
    { pattern: /for\s*\(/g, weight: 0.5 },
    { pattern: /while\s*\(/g, weight: 0.5 },
    { pattern: /\.transfer\(/g, weight: 0.3 },
  ],
  'tx-origin': [
    { pattern: /tx\.origin/g, weight: 1.0 },
    { pattern: /require\([^)]*tx\.origin/g, weight: 1.0 },
  ],
};

// Track initialization state
let initialized = false;

/**
 * Initialize the feature engineering module
 * @param {Object} userConfig - Configuration options
 * @returns {Promise<boolean>} Success status
 */
async function initialize(userConfig = {}) {
  try {
    // Update configuration with user settings
    config = {
      ...config,
      ...userConfig,
      featureStoragePath:
        userConfig.featureStoragePath ||
        path.join(userConfig.dataStoragePath || '', 'feature-vectors'),
    };

    // Apply individual section configs
    if (userConfig.codeMetrics) {
      config.codeMetrics = { ...config.codeMetrics, ...userConfig.codeMetrics };
    }

    if (userConfig.patternMatches) {
      config.patternMatches = { ...config.patternMatches, ...userConfig.patternMatches };
    }

    if (userConfig.semanticEmbeddings) {
      config.semanticEmbeddings = {
        ...config.semanticEmbeddings,
        ...userConfig.semanticEmbeddings,
      };
    }

    // Ensure required directories exist
    if (config.featureStoragePath) {
      await fs.ensureDir(config.featureStoragePath);
    }

    initialized = true;
    return true;
  } catch (error) {
    console.error('Failed to initialize feature engineering module:', error);
    return false;
  }
}

/**
 * Extract features from a smart contract
 * @param {Object} options - Extraction options
 * @returns {Promise<Object>} Extracted features
 */
async function extractFeatures(options = {}) {
  const {
    contractCode,
    contractPath,
    extractors = config.enabledExtractors,
    saveFeatures = true,
  } = options;

  try {
    // Validate inputs
    let code = contractCode;

    if (!code && contractPath) {
      if (await fs.pathExists(contractPath)) {
        code = await fs.readFile(contractPath, 'utf8');
      } else {
        throw new Error(`Contract file not found: ${contractPath}`);
      }
    }

    if (!code) {
      throw new Error('Contract code is required for feature extraction');
    }

    // Generate a unique ID for this extraction
    const extractionId = `features-${crypto.randomBytes(4).toString('hex')}`;
    const timestamp = new Date().toISOString();

    // Extract features using enabled extractors
    const features = {
      id: extractionId,
      timestamp,
      contractSource: contractPath || 'inline-code',
      features: {},
    };

    // Extract code metrics if enabled
    if (extractors.includes('codeMetrics') && config.codeMetrics.enabled) {
      features.features.codeMetrics = extractCodeMetrics(code);
    }

    // Extract pattern matches if enabled
    if (extractors.includes('patternMatches') && config.patternMatches.enabled) {
      features.features.patternMatches = extractPatternMatches(code);
    }

    // Extract semantic embeddings if enabled
    if (extractors.includes('semanticEmbeddings') && config.semanticEmbeddings.enabled) {
      features.features.semanticEmbeddings = await extractSemanticEmbeddings(code);
    }

    // Save feature vector if requested
    if (saveFeatures && config.featureStoragePath) {
      const featurePath = path.join(config.featureStoragePath, `${extractionId}.json`);
      await fs.writeJson(featurePath, features, { spaces: 2 });
    }

    return features;
  } catch (error) {
    console.error('Error extracting features:', error);
    return {
      error: error.message,
      success: false,
    };
  }
}

/**
 * Extract code metrics from contract code
 * @param {string} code - Contract source code
 * @returns {Object} Code metrics
 */
function extractCodeMetrics(code) {
  // Split code into lines
  const lines = code.split('\n');
  const totalLines = lines.length;
  const nonEmptyLines = lines.filter(line => line.trim().length > 0).length;

  // Count functions
  const functionMatches = code.match(/function\s+\w+\s*\(/g) || [];
  const functionCount = functionMatches.length;

  // Count state variables
  const stateVarMatches =
    code.match(/^\s*(address|uint|int|bool|string|bytes|mapping)[^\(].*?;/gm) || [];
  const stateVarCount = stateVarMatches.length;

  // Count control structures
  const ifMatches = code.match(/if\s*\(/g) || [];
  const forMatches = code.match(/for\s*\(/g) || [];
  const whileMatches = code.match(/while\s*\(/g) || [];
  const controlStructureCount = ifMatches.length + forMatches.length + whileMatches.length;

  // Calculate complexity metrics
  let complexityScore = 0;
  complexityScore += functionCount * 1;
  complexityScore += stateVarCount * 0.5;
  complexityScore += ifMatches.length * 1;
  complexityScore += forMatches.length * 2;
  complexityScore += whileMatches.length * 2;

  // Check for external calls
  const externalCallMatches = code.match(/\.(call|send|transfer)\(/g) || [];
  const externalCallCount = externalCallMatches.length;

  // Check for modifiers
  const modifierMatches = code.match(/modifier\s+\w+\s*\(/g) || [];
  const modifierCount = modifierMatches.length;

  // Calculate normalized complexity
  const normalizedComplexity = Math.min(
    1.0,
    complexityScore / config.codeMetrics.complexityThreshold
  );

  return {
    lineCount: totalLines,
    nonEmptyLineCount: nonEmptyLines,
    functionCount,
    stateVarCount,
    controlStructureCount,
    externalCallCount,
    modifierCount,
    complexityScore,
    normalizedComplexity,
    isComplex: complexityScore > config.codeMetrics.complexityThreshold,
  };
}

/**
 * Extract pattern matches from contract code
 * @param {string} code - Contract source code
 * @returns {Object} Pattern matches
 */
function extractPatternMatches(code) {
  const results = {
    patternCounts: {},
    patternScores: {},
    vulnerabilityScores: {},
  };

  // Initialize scores
  for (const category in vulnerabilityPatterns) {
    results.patternCounts[category] = 0;
    results.patternScores[category] = 0;
  }

  // Process each pattern set
  for (const category in vulnerabilityPatterns) {
    // Skip if this pattern set is not enabled
    if (
      config.patternMatches.patternSets &&
      !config.patternMatches.patternSets.includes(category)
    ) {
      continue;
    }

    const patterns = vulnerabilityPatterns[category];
    let categoryScore = 0;

    for (const { pattern, weight } of patterns) {
      const matches = code.match(pattern) || [];
      const matchCount = matches.length;

      if (matchCount > 0) {
        categoryScore += matchCount * weight;
        results.patternCounts[category] += matchCount;
      }
    }

    // Normalize the score (0 to 1 range)
    results.patternScores[category] = Math.min(1.0, Math.max(0, categoryScore));
  }

  // Calculate overall vulnerability scores
  let hasVulnerability = false;
  let maxScore = 0;
  let maxCategory = null;

  for (const category in results.patternScores) {
    const score = results.patternScores[category];

    if (score > 0.5) {
      hasVulnerability = true;
    }

    if (score > maxScore) {
      maxScore = score;
      maxCategory = category;
    }
  }

  results.vulnerabilityScores = {
    hasVulnerability,
    maxScore,
    maxCategory,
    overallScore:
      Object.values(results.patternScores).reduce((sum, score) => sum + score, 0) /
      Object.keys(results.patternScores).length,
  };

  return results;
}

/**
 * Extract semantic embeddings from contract code
 * @param {string} code - Contract source code
 * @returns {Promise<Object>} Semantic embeddings
 */
async function extractSemanticEmbeddings(code) {
  // In a real implementation, this would call out to a language model API
  // For now, we'll simulate embeddings

  // Create a deterministic seed from the code
  const codeHash = crypto.createHash('sha256').update(code).digest('hex');
  const seed = parseInt(codeHash.substring(0, 8), 16);

  // Generate simulated embeddings
  const embeddingDimension = config.semanticEmbeddings.embeddingDimension || 1536;
  const embeddingVector = simulateEmbeddingVector(seed, embeddingDimension);

  return {
    model: config.semanticEmbeddings.embeddingModel,
    dimension: embeddingDimension,
    vector: embeddingVector,
  };
}

/**
 * Simulate an embedding vector for demonstration purposes
 * @param {number} seed - Random seed
 * @param {number} dimension - Embedding dimension
 * @returns {Array<number>} Simulated embedding vector
 */
function simulateEmbeddingVector(seed, dimension) {
  // Use the seed to generate deterministic but random-looking values
  const vector = [];

  for (let i = 0; i < dimension; i++) {
    // Generate a value between -1 and 1 using a simple PRNG
    const x = Math.sin(i * seed) * 10000;
    vector.push(Math.sin(x));
  }

  // Normalize the vector to unit length
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));

  return vector.map(val => val / magnitude);
}

/**
 * Prepare a feature vector for model input
 * @param {Object} features - Extracted features
 * @param {Array<string>} requiredFeatures - Features required by the model
 * @returns {Object} Prepared feature vector
 */
function prepareFeatureVector(features, requiredFeatures) {
  const result = {};

  // Only include requested features
  for (const featureType of requiredFeatures) {
    if (features.features[featureType]) {
      result[featureType] = features.features[featureType];
    }
  }

  // Flatten feature structure for model input if needed
  const flattenedFeatures = {};

  // Handle code metrics
  if (result.codeMetrics) {
    for (const [key, value] of Object.entries(result.codeMetrics)) {
      if (typeof value === 'number') {
        flattenedFeatures[`codeMetrics_${key}`] = value;
      }
    }
  }

  // Handle pattern matches
  if (result.patternMatches) {
    // Add pattern scores
    for (const [category, score] of Object.entries(result.patternMatches.patternScores)) {
      flattenedFeatures[`patternScore_${category}`] = score;
    }

    // Add vulnerability scores
    if (result.patternMatches.vulnerabilityScores) {
      flattenedFeatures.hasVulnerability = result.patternMatches.vulnerabilityScores
        .hasVulnerability
        ? 1
        : 0;
      flattenedFeatures.maxVulnerabilityScore = result.patternMatches.vulnerabilityScores.maxScore;
      flattenedFeatures.overallVulnerabilityScore =
        result.patternMatches.vulnerabilityScores.overallScore;
    }
  }

  // Handle semantic embeddings - keep these as a vector
  if (result.semanticEmbeddings && result.semanticEmbeddings.vector) {
    flattenedFeatures.semanticEmbeddings = result.semanticEmbeddings.vector;
  }

  return {
    raw: result,
    flattened: flattenedFeatures,
    vector: Object.values(flattenedFeatures).flatMap(v => (Array.isArray(v) ? v : [v])),
  };
}

module.exports = {
  initialize,
  extractFeatures,
  prepareFeatureVector,
};
