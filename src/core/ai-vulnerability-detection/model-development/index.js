/**
 * Phase 2: Model Development
 *
 * This module handles the development, training, and evaluation of
 * machine learning models for vulnerability detection.
 */

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const VulnerabilityClassifier = require('./vulnerability-classifier');

// Default model configurations
const DEFAULT_MODELS = [
  {
    id: 'vuln-classifier-base',
    type: 'classifier',
    algorithm: 'randomForest',
    target: 'hasVulnerability',
    features: ['codeMetrics', 'patternMatches', 'semanticEmbeddings'],
    hyperparameters: {
      numTrees: 100,
      maxDepth: 15,
      minSamplesLeaf: 3,
    },
    testMetrics: {},
    createdAt: null,
    updatedAt: null,
    status: 'inactive',
  },
  {
    id: 'severity-classifier',
    type: 'classifier',
    algorithm: 'xgboost',
    target: 'severityLevel',
    features: ['codeMetrics', 'patternMatches', 'semanticEmbeddings', 'contractType'],
    hyperparameters: {
      numRounds: 100,
      maxDepth: 6,
      eta: 0.3,
      subsample: 0.8,
    },
    testMetrics: {},
    createdAt: null,
    updatedAt: null,
    status: 'inactive',
  },
  {
    id: 'vulnerability-type-classifier',
    type: 'multiClassifier',
    algorithm: 'neuralNetwork',
    target: 'vulnerabilityType',
    features: [
      'codeMetrics',
      'patternMatches',
      'semanticEmbeddings',
      'contractType',
      'codeStructure',
    ],
    hyperparameters: {
      hiddenLayers: [64, 32],
      activation: 'relu',
      dropout: 0.2,
      learningRate: 0.001,
    },
    testMetrics: {},
    createdAt: null,
    updatedAt: null,
    status: 'inactive',
  },
];

// Default configuration
let config = {
  dataStoragePath: null,
  modelStoragePath: null,
  defaultDatasetId: null,
  activeModels: {},
  models: [...DEFAULT_MODELS],
  featureEngineeringConfig: {
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
    },
  },
};

// Track initialization state
let initialized = false;

/**
 * Initialize the model development system
 * @param {Object} userConfig - Configuration options
 * @returns {Promise<boolean>} Success status
 */
async function initialize(userConfig = {}) {
  try {
    // Merge user config with defaults
    config = {
      ...config,
      ...userConfig,
      modelStoragePath:
        userConfig.modelStoragePath || path.join(userConfig.dataStoragePath || '', 'ml-models'),
      featureEngineeringConfig: {
        ...config.featureEngineeringConfig,
        ...userConfig.featureEngineeringConfig,
      },
    };

    // Ensure model directories exist
    await fs.ensureDir(config.modelStoragePath);
    await fs.ensureDir(path.join(config.modelStoragePath, 'trained-models'));
    await fs.ensureDir(path.join(config.modelStoragePath, 'model-checkpoints'));
    await fs.ensureDir(path.join(config.modelStoragePath, 'feature-vectors'));

    // Load any existing model metadata
    await loadModelMetadata();

    initialized = true;
    console.log('Model development system initialized successfully');

    return true;
  } catch (error) {
    console.error('Failed to initialize model development system:', error);
    return false;
  }
}

/**
 * Load metadata for existing models
 * @returns {Promise<boolean>} Success status
 */
async function loadModelMetadata() {
  try {
    const metadataPath = path.join(config.modelStoragePath, 'model-metadata.json');

    if (await fs.pathExists(metadataPath)) {
      const metadata = await fs.readJson(metadataPath);

      if (metadata.models && Array.isArray(metadata.models)) {
        // Update the default model configs with any saved metadata
        const modelMap = new Map(metadata.models.map(model => [model.id, model]));

        config.models = config.models.map(model => {
          const savedModel = modelMap.get(model.id);
          return savedModel ? { ...model, ...savedModel } : model;
        });

        // Add any additional models not in the defaults
        for (const savedModel of metadata.models) {
          if (!config.models.some(m => m.id === savedModel.id)) {
            config.models.push(savedModel);
          }
        }
      }

      if (metadata.activeModels) {
        config.activeModels = metadata.activeModels;
      }
    }

    return true;
  } catch (error) {
    console.error('Error loading model metadata:', error);
    return false;
  }
}

/**
 * Save the current model metadata
 * @returns {Promise<boolean>} Success status
 */
async function saveModelMetadata() {
  try {
    const metadataPath = path.join(config.modelStoragePath, 'model-metadata.json');

    const metadata = {
      models: config.models,
      activeModels: config.activeModels,
      lastUpdated: new Date().toISOString(),
    };

    await fs.writeJson(metadataPath, metadata, { spaces: 2 });
    return true;
  } catch (error) {
    console.error('Error saving model metadata:', error);
    return false;
  }
}

/**
 * Train a model with the given configuration
 * @param {Object} options - Training options
 * @returns {Promise<Object>} Training results
 */
async function trainModel(options = {}) {
  if (!initialized) {
    throw new Error('Model development system has not been initialized');
  }

  const {
    modelId,
    datasetId = config.defaultDatasetId,
    hyperparameterTuning = false,
    evaluateAfterTraining = true,
    saveCheckpoints = true,
  } = options;

  try {
    // Validate inputs
    if (!modelId) {
      throw new Error('Model ID is required');
    }

    if (!datasetId) {
      throw new Error('Dataset ID is required');
    }

    // Find the model configuration
    const modelConfig = config.models.find(m => m.id === modelId);

    if (!modelConfig) {
      throw new Error(`Model with ID ${modelId} not found`);
    }

    console.log(`Training model ${modelId} with dataset ${datasetId}...`);

    // In a real implementation, this would call out to actual model training code
    // For now, we'll simulate the training process

    // Simulate training time
    const startTime = Date.now();
    await new Promise(resolve => setTimeout(resolve, 1000));
    const endTime = Date.now();

    // Generate simulated metrics
    const trainingMetrics = {
      accuracy: Math.random() * 0.3 + 0.7, // 70-100%
      precision: Math.random() * 0.3 + 0.7,
      recall: Math.random() * 0.3 + 0.7,
      f1Score: Math.random() * 0.3 + 0.7,
      trainingTime: endTime - startTime,
      epochs: 100,
      convergenceEpoch: Math.floor(Math.random() * 80) + 20,
    };

    // Update model metadata
    const modelIndex = config.models.findIndex(m => m.id === modelId);

    if (modelIndex >= 0) {
      config.models[modelIndex] = {
        ...config.models[modelIndex],
        status: 'trained',
        trainMetrics: trainingMetrics,
        lastTrainedAt: new Date().toISOString(),
      };
    }

    // Simulate evaluation if requested
    if (evaluateAfterTraining) {
      console.log('Evaluating model...');

      // Simulate evaluation metrics
      const evaluationMetrics = {
        accuracy: trainingMetrics.accuracy * (0.9 + Math.random() * 0.1), // Slightly worse than training
        precision: trainingMetrics.precision * (0.9 + Math.random() * 0.1),
        recall: trainingMetrics.recall * (0.9 + Math.random() * 0.1),
        f1Score: trainingMetrics.f1Score * (0.9 + Math.random() * 0.1),
        confusionMatrix: [
          [Math.floor(Math.random() * 50) + 50, Math.floor(Math.random() * 10)],
          [Math.floor(Math.random() * 10), Math.floor(Math.random() * 50) + 50],
        ],
      };

      // Update model metadata with evaluation metrics
      if (modelIndex >= 0) {
        config.models[modelIndex].testMetrics = evaluationMetrics;
      }
    }

    // Save metadata
    await saveModelMetadata();

    return {
      success: true,
      modelId,
      status: 'trained',
      metrics: trainingMetrics,
      evaluationMetrics: evaluateAfterTraining ? config.models[modelIndex].testMetrics : null,
    };
  } catch (error) {
    console.error('Error training model:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Analyze a contract for vulnerabilities using trained models
 * @param {Object} options - Analysis options
 * @returns {Promise<Object>} Analysis results
 */
async function analyzeContract(options = {}) {
  if (!initialized) {
    throw new Error('Model development system has not been initialized');
  }

  const {
    contractCode,
    contractPath,
    modelIds = Object.keys(config.activeModels),
    detailedResults = true,
  } = options;

  try {
    // Validate inputs
    if (!contractCode && !contractPath) {
      throw new Error('Either contractCode or contractPath must be provided');
    }

    // Read contract code if path is provided
    let code = contractCode;
    if (!code && contractPath) {
      if (await fs.pathExists(contractPath)) {
        code = await fs.readFile(contractPath, 'utf8');
      } else {
        throw new Error(`Contract file not found: ${contractPath}`);
      }
    }

    // Create a unique ID for this analysis
    const analysisId = `analysis-${crypto.randomBytes(4).toString('hex')}`;

    // In a real implementation, this would extract features and run models
    // For now, we'll simulate the analysis process

    // Simulate running models
    const results = [];
    const vulnerabilityTypes = [
      'reentrancy',
      'access-control',
      'arithmetic',
      'unchecked-return',
      'front-running',
      'dos',
      'tx-origin',
    ];

    // For demo purposes, randomly select 0-3 vulnerability types
    const selectedTypes = [];
    const vulnCount = Math.floor(Math.random() * 4); // 0 to 3 vulnerabilities

    for (let i = 0; i < vulnCount; i++) {
      const typeIndex = Math.floor(Math.random() * vulnerabilityTypes.length);
      const type = vulnerabilityTypes[typeIndex];

      if (!selectedTypes.includes(type)) {
        selectedTypes.push(type);
      }
    }

    // Generate simulated results
    if (selectedTypes.length > 0) {
      results.push({
        modelId: 'vuln-classifier-base',
        modelType: 'classifier',
        target: 'hasVulnerability',
        prediction: true,
        confidence: Math.random() * 0.3 + 0.7, // 70-100%
      });

      results.push({
        modelId: 'vulnerability-type-classifier',
        modelType: 'multiClassifier',
        target: 'vulnerabilityType',
        prediction: selectedTypes,
        confidence: selectedTypes.map(() => Math.random() * 0.3 + 0.7),
      });

      results.push({
        modelId: 'severity-classifier',
        modelType: 'classifier',
        target: 'severityLevel',
        prediction: Math.random() > 0.7 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
        confidence: Math.random() * 0.3 + 0.7,
      });
    } else {
      results.push({
        modelId: 'vuln-classifier-base',
        modelType: 'classifier',
        target: 'hasVulnerability',
        prediction: false,
        confidence: Math.random() * 0.3 + 0.7,
      });
    }

    // Process results into consolidated vulnerability report
    const vulnerabilities = processModelResults(results, code);

    const analysisResult = {
      analysisId,
      timestamp: new Date().toISOString(),
      contractSource: contractPath || 'inline-code',
      vulnerabilitiesFound: vulnerabilities.length > 0,
      vulnerabilityCount: vulnerabilities.length,
      vulnerabilities,
      detailedResults: detailedResults ? results : null,
    };

    // Save analysis result
    const resultPath = path.join(config.modelStoragePath, 'analysis-results', `${analysisId}.json`);

    await fs.ensureDir(path.dirname(resultPath));
    await fs.writeJson(resultPath, analysisResult, { spaces: 2 });

    return analysisResult;
  } catch (error) {
    console.error('Error analyzing contract:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Process model results into vulnerability findings
 * @param {Array} results - Model prediction results
 * @param {string} contractCode - Contract source code
 * @returns {Array} Vulnerability findings
 */
function processModelResults(results, contractCode) {
  const vulnerabilities = [];

  // Process classifier model results
  const hasVulnResult = results.find(r => r.target === 'hasVulnerability');

  if (hasVulnResult && hasVulnResult.prediction) {
    // Process vulnerability type classifier results
    const typeResults = results.find(r => r.target === 'vulnerabilityType');
    const severityResults = results.find(r => r.target === 'severityLevel');

    if (typeResults) {
      // For multi-class classification, we might have multiple types
      const types = Array.isArray(typeResults.prediction)
        ? typeResults.prediction
        : [typeResults.prediction];

      const confidences = Array.isArray(typeResults.confidence)
        ? typeResults.confidence
        : [typeResults.confidence];

      for (let i = 0; i < types.length; i++) {
        const type = types[i];
        const confidence = confidences[i] || typeResults.confidence;

        // Determine severity
        let severity = 'medium'; // Default
        if (severityResults) {
          severity = severityResults.prediction;
        }

        vulnerabilities.push({
          id: `${type}-${vulnerabilities.length + 1}`,
          type,
          severity,
          confidence,
          description: getVulnerabilityDescription(type),
          remediation: getRemediationSuggestion(type),
          locations: findVulnerableLocations(type, contractCode),
        });
      }
    } else {
      // Generic vulnerability with no specific type
      vulnerabilities.push({
        id: 'generic-vuln-1',
        type: 'unknown',
        severity: 'medium',
        confidence: hasVulnResult.confidence,
        description: 'Potential security vulnerability detected',
        remediation: 'Review the code for potential security issues',
        locations: [],
      });
    }
  }

  return vulnerabilities;
}

/**
 * Get vulnerability description
 * @param {string} type - Vulnerability type
 * @returns {string} Description
 */
function getVulnerabilityDescription(type) {
  const descriptions = {
    reentrancy:
      'Reentrancy vulnerability detected - contract state could be manipulated by a malicious contract called from this contract.',
    'access-control':
      'Access control vulnerability detected - sensitive functions may be callable by unauthorized users.',
    arithmetic:
      'Arithmetic vulnerability detected - potential for integer overflow, underflow, or precision issues.',
    'unchecked-return':
      'Unchecked return values detected - function return values are not properly validated.',
    'front-running':
      'Front-running vulnerability detected - transactions could be front-run by miners or other users.',
    dos: 'Denial of Service vulnerability detected - contract could be rendered unusable by malicious actors.',
    'tx-origin':
      'tx.origin usage for authentication detected - can be bypassed in certain scenarios.',
    'gas-optimization':
      'Gas optimization issues detected - contract is using more gas than necessary.',
    'solidity-version':
      'Outdated Solidity version detected - newer versions have important security improvements.',
  };

  return descriptions[type] || 'Unknown vulnerability type';
}

/**
 * Get remediation suggestion
 * @param {string} type - Vulnerability type
 * @returns {string} Remediation suggestion
 */
function getRemediationSuggestion(type) {
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
    'gas-optimization':
      'Optimize storage usage, minimize on-chain logic, and avoid redundant operations.',
    'solidity-version':
      'Update to a more recent Solidity version (at least 0.8.0) which includes built-in overflow checking.',
  };

  return suggestions[type] || 'Review the code for potential security issues.';
}

/**
 * Find vulnerable code locations
 * @param {string} type - Vulnerability type
 * @param {string} contractCode - Contract source code
 * @returns {Array} Vulnerable locations
 */
function findVulnerableLocations(type, contractCode) {
  // This is a simplified implementation
  // In a real implementation, this would use AST parsing and more sophisticated analysis

  const patterns = {
    reentrancy: [/\.call{value:[^}]*}\([^)]*\)/g, /\.call\.value\([^)]*\)/g],
    'access-control': [/function\s+\w+\s*\([^)]*\)\s*public/g, /selfdestruct/g, /suicide/g],
    arithmetic: [/\+\+/g, /\-\-/g, /\w+\s*\+=\s*\w+/g, /\w+\s*\-=\s*\w+/g],
    'unchecked-return': [/\.call\(/g, /\.send\(/g],
    'front-running': [/require\([^)]*block\.timestamp/g, /require\([^)]*block\.number/g],
    dos: [/for\s*\(/g, /while\s*\(/g],
    'tx-origin': [/tx\.origin/g],
  };

  const typePatterns = patterns[type] || [];
  const locations = [];

  if (typePatterns.length > 0) {
    // Split code into lines for line number tracking
    const lines = contractCode.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNumber = i + 1;

      for (const pattern of typePatterns) {
        if (pattern.test(line)) {
          locations.push({
            line: lineNumber,
            content: line.trim(),
          });
          break; // Only add each line once
        }
      }
    }
  }

  return locations;
}

/**
 * Create a new vulnerability classifier instance
 * @param {Object} options - Classifier options
 * @returns {VulnerabilityClassifier} Classifier instance
 */
function createClassifier(options = {}) {
  if (!initialized) {
    console.warn('Model development module not initialized, using default classifier settings');
  }

  const classifierOptions = {
    modelPath:
      options.modelPath || path.join(config.modelStoragePath || './models', 'classification'),
    taxonomyPath:
      options.taxonomyPath ||
      path.join(config.dataStoragePath || './data', 'vulnerability-taxonomy.json'),
    ...options,
  };

  return new VulnerabilityClassifier(classifierOptions);
}

module.exports = {
  initialize,
  trainModel,
  analyzeContract,
  createClassifier,
  VulnerabilityClassifier,
};
