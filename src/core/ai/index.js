/**
 * AI-Enhanced Vulnerability Detection System
 *
 * A comprehensive system for detecting, analyzing, and visualizing security vulnerabilities
 * in Web3 applications and smart contracts using machine learning techniques.
 */

const dataInfrastructure = require('./data-infrastructure');
const modelDevelopment = require('./model-development');
const testingIntegration = require('./testing-integration');
const advancedDetection = require('./advanced-detection');
const visualization = require('./visualization');
const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

// Import new components
const VulnerabilityClassifier = require('./model-development/vulnerability-classifier');
const RemediationGenerator = require('./model-development/remediation-generator');
const NovelAttackVectorDetector = require('./advanced-detection/pattern-recognition');
const Web3TrainingDataManager = require('./data-infrastructure/specialized-web3-training');

// Import core modules
const patternRecognition = require('./advanced-detection/pattern-recognition');
const modelInterface = require('./model-interface');

// Default configuration
const defaultConfig = {
  // System paths
  dataStoragePath: './data/vulnerability-data',

  // Phase configurations
  dataInfrastructure: {
    datasetPath: null, // Will be set during initialization
    contractStoragePath: null, // Will be set during initialization
    vulnerabilityCategorization: [],
  },

  modelDevelopment: {
    modelStoragePath: null, // Will be set during initialization
    activeModels: {},
    featureEngineeringConfig: {
      codeMetrics: {
        enabled: true,
      },
      patternMatches: {
        enabled: true,
      },
      semanticEmbeddings: {
        enabled: true,
      },
    },
  },

  testingIntegration: {
    testingStoragePath: null, // Will be set during initialization
    reportOutputPath: null, // Will be set during initialization
    testHooks: {
      beforeTest: true,
      afterTest: true,
      beforeTransaction: true,
    },
    alertingConfig: {
      enabled: true,
      failOnCritical: true,
    },
  },

  advancedDetection: {
    detectionStoragePath: null, // Will be set during initialization
    realTimeDetection: true,
    detectionStrategies: ['pattern', 'anomaly', 'behavior'],
    patternRecognition: {
      enabled: true,
      anomalyThreshold: 0.85,
      minPatternSupport: 3,
    },
  },

  visualization: {
    visualizationStoragePath: null, // Will be set during initialization
    enabledVisualizations: ['vulnerabilityTypes', 'severityDistribution', 'timelineTrends'],
  },

  // New configuration for AI components
  aiComponents: {
    vulnerabilityClassifier: {
      modelPath: null, // Will be set during initialization
      confidenceThreshold: 0.7,
    },
    remediationGenerator: {
      customRemediationsPath: null, // Will be set during initialization
    },
    novelAttackDetector: {
      knownPatternsPath: null, // Will be set during initialization
      anomalyThreshold: 0.85,
    },
    trainingDataManager: {
      dataDir: null, // Will be set during initialization
      apiKeys: {},
    },
  },
};

// Initialization state tracking
let initialized = false;
let initializationError = null;

// Instance storage for new components
let vulnerabilityClassifier = null;
let remediationGenerator = null;
let novelAttackDetector = null;
let trainingDataManager = null;

/**
 * Initialize the AI Vulnerability Detection System
 * @param {Object} options - Configuration options
 * @returns {Promise<Object>} Initialization result
 */
async function initialize(options = {}) {
  if (initialized) {
    return { status: 'already-initialized' };
  }

  try {
    // Merge user config with defaults
    const config = {
      ...defaultConfig,
      ...options,
    };

    // Ensure data storage path is set
    if (!config.dataStoragePath) {
      throw new Error('Data storage path must be provided');
    }

    // Set up sub-module storage paths if not provided
    if (!config.dataInfrastructure.datasetPath) {
      config.dataInfrastructure.datasetPath = `${config.dataStoragePath}/datasets`;
    }

    if (!config.dataInfrastructure.contractStoragePath) {
      config.dataInfrastructure.contractStoragePath = `${config.dataStoragePath}/contracts`;
    }

    if (!config.modelDevelopment.modelStoragePath) {
      config.modelDevelopment.modelStoragePath = `${config.dataStoragePath}/models`;
    }

    if (!config.testingIntegration.testingStoragePath) {
      config.testingIntegration.testingStoragePath = `${config.dataStoragePath}/testing`;
    }

    if (!config.testingIntegration.reportOutputPath) {
      config.testingIntegration.reportOutputPath = `${config.dataStoragePath}/reports`;
    }

    if (!config.advancedDetection.detectionStoragePath) {
      config.advancedDetection.detectionStoragePath = `${config.dataStoragePath}/advanced-detection`;
    }

    if (!config.visualization.visualizationStoragePath) {
      config.visualization.visualizationStoragePath = `${config.dataStoragePath}/visualizations`;
    }

    // Set up paths for new AI components
    if (!config.aiComponents.vulnerabilityClassifier.modelPath) {
      config.aiComponents.vulnerabilityClassifier.modelPath = `${config.dataStoragePath}/models/vulnerability-classifier`;
    }

    if (!config.aiComponents.remediationGenerator.customRemediationsPath) {
      config.aiComponents.remediationGenerator.customRemediationsPath = `${config.dataStoragePath}/models/custom-remediations.json`;
    }

    if (!config.aiComponents.novelAttackDetector.knownPatternsPath) {
      config.aiComponents.novelAttackDetector.knownPatternsPath = `${config.dataStoragePath}/data/known-patterns.json`;
    }

    if (!config.aiComponents.trainingDataManager.dataDir) {
      config.aiComponents.trainingDataManager.dataDir = `${config.dataStoragePath}/data/web3-training`;
    }

    // Initialize each module in order
    console.log('Initializing AI Vulnerability Detection System...');

    // Phase 1: Data Infrastructure
    console.log('Initializing Data Infrastructure...');
    const dataInfrastructureInit = await dataInfrastructure.initialize({
      dataStoragePath: config.dataStoragePath,
      ...config.dataInfrastructure,
    });

    if (!dataInfrastructureInit) {
      throw new Error('Failed to initialize Data Infrastructure module');
    }

    // Phase 2: Model Development
    console.log('Initializing Model Development...');
    const modelDevelopmentInit = await modelDevelopment.initialize({
      dataStoragePath: config.dataStoragePath,
      ...config.modelDevelopment,
    });

    if (!modelDevelopmentInit) {
      throw new Error('Failed to initialize Model Development module');
    }

    // Phase 3: Testing Integration
    // Pass model development module reference for integration
    console.log('Initializing Testing Integration...');
    const testingIntegrationInit = await testingIntegration.initialize({
      dataStoragePath: config.dataStoragePath,
      modelDevelopment, // Pass reference to model module
      ...config.testingIntegration,
    });

    if (!testingIntegrationInit) {
      throw new Error('Failed to initialize Testing Integration module');
    }

    // Phase 4: Advanced Detection (if available)
    let advancedDetectionInit = true;
    if (advancedDetection && typeof advancedDetection.initialize === 'function') {
      console.log('Initializing Advanced Detection...');
      advancedDetectionInit = await advancedDetection.initialize({
        dataStoragePath: config.dataStoragePath,
        modelDevelopment, // Pass reference to model module
        ...config.advancedDetection,
      });

      if (!advancedDetectionInit) {
        console.warn('Warning: Failed to initialize Advanced Detection module');
      }
    }

    // Phase 5: Visualization (if available)
    let visualizationInit = true;
    if (visualization && typeof visualization.initialize === 'function') {
      console.log('Initializing Visualization...');
      visualizationInit = await visualization.initialize({
        dataStoragePath: config.dataStoragePath,
        ...config.visualization,
      });

      if (!visualizationInit) {
        console.warn('Warning: Failed to initialize Visualization module');
      }
    }

    // Initialize new AI components
    console.log('Initializing AI Components...');

    // Initialize vulnerability classifier
    vulnerabilityClassifier = new VulnerabilityClassifier(
      config.aiComponents.vulnerabilityClassifier
    );

    // Initialize remediation generator
    remediationGenerator = new RemediationGenerator(config.aiComponents.remediationGenerator);

    // Initialize novel attack detector
    novelAttackDetector = new NovelAttackVectorDetector(config.aiComponents.novelAttackDetector);

    // Initialize specialized Web3 training data manager
    trainingDataManager = new Web3TrainingDataManager(config.aiComponents.trainingDataManager);

    // Set initialization state
    initialized = true;
    console.log('AI Vulnerability Detection System initialized successfully');

    return {
      status: 'success',
      config,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error initializing AI Vulnerability Detection System:', error);
    initializationError = error;

    return {
      status: 'error',
      error: error.message,
      details: error.stack,
    };
  }
}

/**
 * Check if the system is initialized
 * @returns {boolean} Initialization status
 */
function isInitialized() {
  return initialized;
}

/**
 * Get the initialization error if any
 * @returns {Error|null} Initialization error
 */
function getInitializationError() {
  return initializationError;
}

/**
 * Analyze a smart contract for vulnerabilities
 * @param {Object} options - Analysis options
 * @returns {Promise<Object>} Analysis results
 */
async function analyzeContract(options) {
  if (!initialized) {
    throw new Error('AI Vulnerability Detection System is not initialized');
  }

  const {
    contractPath,
    contractCode,
    contractName,
    chain = 'ethereum',
    solcVersion,
    includeRemediations = true,
    detectionMode = 'standard',
    confidenceThreshold = 0.6,
  } = options;

  try {
    // Generate a unique analysis ID
    const analysisId = `analysis-${crypto.randomBytes(4).toString('hex')}`;
    const timestamp = new Date().toISOString();

    // Get contract code - either from options or by reading file
    let code = contractCode;
    if (!code && contractPath) {
      if (fs.existsSync(contractPath)) {
        code = fs.readFileSync(contractPath, 'utf8');
      } else {
        throw new Error(`Contract file not found: ${contractPath}`);
      }
    }

    if (!code) {
      throw new Error('Contract code is required for analysis');
    }

    // Initialize results object
    const results = {
      analysisId,
      timestamp,
      contractName: contractName || path.basename(contractPath || 'unknown', '.sol'),
      chain,
      detectionMode,
      vulnerabilities: [],
      stats: {
        totalIssues: 0,
        criticalIssues: 0,
        highIssues: 0,
        mediumIssues: 0,
        lowIssues: 0,
        infoIssues: 0,
      },
    };

    // Detect vulnerabilities using pattern recognition
    const patternVulnerabilities = patternRecognition.detectVulnerabilities(code, {
      enableMachineLearning: detectionMode === 'advanced' || detectionMode === 'full',
    });

    // Filter based on confidence threshold and classify
    const filteredVulnerabilities = patternVulnerabilities
      .filter(v => v.confidence >= confidenceThreshold)
      .map(v =>
        vulnerabilityClassifier.classifyVulnerability({
          ...v,
          code: v.matchedPattern || '',
          contractName: results.contractName,
        })
      );

    results.vulnerabilities.push(...filteredVulnerabilities);

    // Use AI model for more advanced detection if in advanced/full mode
    if (
      (detectionMode === 'advanced' || detectionMode === 'full') &&
      config.aiComponents.vulnerabilityClassifier.modelPath
    ) {
      const aiVulnerabilities = await detectWithAI(code, {
        contractName: results.contractName,
        chain,
      });

      // Add AI results that aren't duplicates
      const existingIds = new Set(results.vulnerabilities.map(v => v.patternId));
      const uniqueAiVulns = aiVulnerabilities.filter(v => !existingIds.has(v.patternId));

      results.vulnerabilities.push(...uniqueAiVulns);
    }

    // Generate remediation suggestions if requested
    if (includeRemediations && results.vulnerabilities.length > 0) {
      const remediations = await generateRemediations(results.vulnerabilities);
      results.remediations = remediations;
    }

    // Update statistics
    results.stats.totalIssues = results.vulnerabilities.length;
    results.stats.criticalIssues = results.vulnerabilities.filter(
      v => v.severity === 'critical'
    ).length;
    results.stats.highIssues = results.vulnerabilities.filter(v => v.severity === 'high').length;
    results.stats.mediumIssues = results.vulnerabilities.filter(
      v => v.severity === 'medium'
    ).length;
    results.stats.lowIssues = results.vulnerabilities.filter(v => v.severity === 'low').length;
    results.stats.infoIssues = results.vulnerabilities.filter(v => v.severity === 'info').length;

    // Save report if configured
    if (config.reporting.saveReports) {
      await saveReport(results);
    }

    return results;
  } catch (error) {
    console.error('Error in contract analysis:', error);
    return {
      success: false,
      error: error.message,
      details: error.stack,
    };
  }
}

/**
 * Detect vulnerabilities using AI models
 * @param {string} code - Contract code
 * @param {Object} options - Detection options
 * @returns {Promise<Array>} Detected vulnerabilities
 */
async function detectWithAI(code, options) {
  try {
    if (!modelInterface.isInitialized()) {
      console.warn('Model interface not initialized, skipping AI detection');
      return [];
    }

    // Get vulnerability analysis from AI model
    const analysisResult = await modelInterface.analyzeCode(code, {
      promptTemplate: 'smart-contract-security',
      ...options,
    });

    // Transform AI model output to standard vulnerability format
    return (analysisResult.vulnerabilities || []).map(v => ({
      id: `AI-${crypto.randomBytes(4).toString('hex')}`,
      patternId: v.type || 'UNKNOWN',
      name: v.name || v.type || 'Unknown Vulnerability',
      description: v.description || 'No description provided',
      severity: v.severity || 'medium',
      confidence: v.confidence || 0.7,
      cwe: v.cwe || null,
      location: v.location || null,
      code: v.code || null,
      detectedBy: 'ai-model',
      detectedAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error in AI detection:', error);
    return [];
  }
}

/**
 * Generate remediation suggestions for vulnerabilities
 * @param {Array} vulnerabilities - The vulnerabilities to generate remediation for
 * @returns {Promise<Object>} - Remediation report
 */
async function generateRemediations(vulnerabilities) {
  if (!initialized) {
    throw new Error('AI Vulnerability Detection System is not initialized');
  }

  try {
    // Ensure vulnerabilities are classified
    const classifiedVulnerabilities = vulnerabilities.map(vuln => {
      // If not already classified, classify it
      if (!vuln.classification) {
        return vulnerabilityClassifier.classifyVulnerability(vuln);
      }
      return vuln;
    });

    // Generate remediation report
    return await remediationGenerator.generateRemediationReport(classifiedVulnerabilities);
  } catch (error) {
    console.error('Error generating remediations:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Save analysis report to file
 * @param {Object} report - The analysis report to save
 * @returns {Promise<string>} Path to saved report
 */
async function saveReport(report) {
  const reportDir = config.reporting.reportDirectory;
  fs.ensureDirSync(reportDir);

  // Generate filename based on contract name and timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${report.contractName}-${timestamp}.json`;
  const reportPath = path.join(reportDir, filename);

  // Write report to file
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

  // Generate visualization if enabled
  if (config.reporting.enableVisualization) {
    try {
      const visualizationPath = reportPath.replace('.json', '.html');
      await visualization.generateVulnerabilityVisualization(report, visualizationPath);
    } catch (visualizationError) {
      console.warn('Error generating visualization:', visualizationError.message);
    }
  }

  return reportPath;
}

/**
 * Analyze transaction data for potential vulnerabilities
 * @param {Object} options - Analysis options
 * @returns {Promise<Object>} Analysis results
 */
async function analyzeTransactions(options) {
  if (!initialized) {
    throw new Error('AI Vulnerability Detection System is not initialized');
  }

  const {
    transactions,
    chain = 'ethereum',
    includeRemediations = true,
    confidenceThreshold = 0.6,
  } = options;

  try {
    // Generate unique analysis ID
    const analysisId = `tx-analysis-${crypto.randomBytes(4).toString('hex')}`;
    const timestamp = new Date().toISOString();

    if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
      throw new Error('Valid transaction data array is required');
    }

    // Initialize results
    const results = {
      analysisId,
      timestamp,
      chain,
      transactionCount: transactions.length,
      vulnerabilities: [],
      stats: {
        totalIssues: 0,
        criticalIssues: 0,
        highIssues: 0,
        mediumIssues: 0,
        lowIssues: 0,
      },
    };

    // Detect vulnerabilities in transactions
    const txVulnerabilities = patternRecognition
      .analyzeTransactions(transactions)
      .filter(v => v.confidence >= confidenceThreshold);

    results.vulnerabilities.push(...txVulnerabilities);

    // Update statistics
    results.stats.totalIssues = results.vulnerabilities.length;
    results.stats.criticalIssues = results.vulnerabilities.filter(
      v => v.severity === 'critical'
    ).length;
    results.stats.highIssues = results.vulnerabilities.filter(v => v.severity === 'high').length;
    results.stats.mediumIssues = results.vulnerabilities.filter(
      v => v.severity === 'medium'
    ).length;
    results.stats.lowIssues = results.vulnerabilities.filter(v => v.severity === 'low').length;

    // Generate remediation suggestions if requested
    if (includeRemediations && results.vulnerabilities.length > 0) {
      const remediations = await generateRemediations(results.vulnerabilities);
      results.remediations = remediations;
    }

    // Save report if configured
    if (config.reporting.saveReports) {
      const reportDir = config.reporting.reportDirectory;
      fs.ensureDirSync(reportDir);

      const reportPath = path.join(
        reportDir,
        `tx-analysis-${timestamp.replace(/[:.]/g, '-')}.json`
      );
      fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');
    }

    return results;
  } catch (error) {
    console.error('Error in transaction analysis:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = {
  // Main functions
  initialize,
  isInitialized,
  getInitializationError,
  analyzeContract,
  analyzeTransactions,
  generateRemediations,

  // Phase 1: Data Infrastructure
  dataInfrastructure,

  // Phase 2: Model Development
  modelDevelopment,

  // Phase 3: Testing Integration
  testingIntegration,

  // Phase 4: Advanced Detection (optional)
  advancedDetection,

  // Phase 5: Visualization (optional)
  visualization,

  // Export new functionality
  detectWithAI,

  // Export component classes
  VulnerabilityClassifier,
  RemediationGenerator,
  NovelAttackVectorDetector,
  Web3TrainingDataManager,
  patternRecognition,
  modelInterface,
};
