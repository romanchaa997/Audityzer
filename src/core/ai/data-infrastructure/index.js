/**
 * Phase 1: Data Infrastructure
 *
 * This module handles the collection, processing, and storage of vulnerability data
 * for training and evaluation of AI models.
 */

const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Import utility modules
const vulnDatasetManager = require('./vulnerability-dataset');
const transactionPatternCollector = require('./transaction-pattern-collector');
const smartContractCategorizer = require('./smart-contract-categorizer');
const testOutcomeAggregator = require('./test-outcome-aggregator');

// Default storage directories
const DEFAULT_DATA_DIR = path.join(process.cwd(), 'data', 'vulnerability-data');
const DEFAULT_MODEL_DIR = path.join(process.cwd(), 'data', 'ml-models');

// System state
let initialized = false;
let config = {
  dataStoragePath: DEFAULT_DATA_DIR,
  modelStoragePath: DEFAULT_MODEL_DIR,
  enableCloudBackup: false,
  cloudStorageConfig: null,
  autoUpdateDatasets: true,
  dataCollectionFrequency: 'daily',
};

/**
 * Initialize the data infrastructure system
 * @param {Object} userConfig - Configuration options
 * @returns {Promise<boolean>} Success status
 */
async function initialize(userConfig = {}) {
  try {
    // Merge user config with defaults
    config = { ...config, ...userConfig };

    // Ensure data directories exist
    await fs.ensureDir(config.dataStoragePath);
    await fs.ensureDir(config.modelStoragePath);
    await fs.ensureDir(path.join(config.dataStoragePath, 'raw'));
    await fs.ensureDir(path.join(config.dataStoragePath, 'processed'));
    await fs.ensureDir(path.join(config.dataStoragePath, 'labeled'));

    // Initialize components
    await vulnDatasetManager.initialize(config);
    await transactionPatternCollector.initialize(config);
    await smartContractCategorizer.initialize(config);
    await testOutcomeAggregator.initialize(config);

    // Track initialization state
    initialized = true;
    console.log('Data infrastructure initialized successfully');

    return true;
  } catch (error) {
    console.error('Failed to initialize data infrastructure:', error);
    return false;
  }
}

/**
 * Collect vulnerability data from various sources
 * @param {Object} options - Collection options
 * @returns {Promise<Object>} Collection results
 */
async function collectVulnerabilityData(options = {}) {
  ensureInitialized();

  const collectionId = uuidv4();
  const timestamp = new Date().toISOString();
  const results = {
    collectionId,
    timestamp,
    sources: [],
    totalVulnerabilities: 0,
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
    // Collect data from public vulnerability databases
    if (options.publicDatabases !== false) {
      const publicDbResults = await collectFromPublicDatabases(options);
      results.sources.push({
        name: 'public-databases',
        count: publicDbResults.count,
        status: 'success',
      });
      results.totalVulnerabilities += publicDbResults.count;
      mergeVulnerabilityStats(results, publicDbResults);
    }

    // Collect data from test outcomes
    if (options.testOutcomes !== false) {
      const testResults = await testOutcomeAggregator.collectFromTests(options.testDataPath);
      results.sources.push({
        name: 'test-outcomes',
        count: testResults.count,
        status: 'success',
      });
      results.totalVulnerabilities += testResults.count;
      mergeVulnerabilityStats(results, testResults);
    }

    // Collect data from transaction patterns
    if (options.transactionPatterns !== false) {
      const transactionResults = await transactionPatternCollector.collectPatterns(options);
      results.sources.push({
        name: 'transaction-patterns',
        count: transactionResults.count,
        status: 'success',
      });
      results.totalVulnerabilities += transactionResults.count;
      mergeVulnerabilityStats(results, transactionResults);
    }

    // Collect data from smart contract analysis
    if (options.smartContracts !== false) {
      const contractResults = await smartContractCategorizer.categorizeContracts(options);
      results.sources.push({
        name: 'smart-contracts',
        count: contractResults.count,
        status: 'success',
      });
      results.totalVulnerabilities += contractResults.count;
      mergeVulnerabilityStats(results, contractResults);
    }

    // Save collection results
    const resultsPath = path.join(
      config.dataStoragePath,
      'collection-results',
      `${collectionId}.json`
    );
    await fs.ensureDir(path.dirname(resultsPath));
    await fs.writeJson(resultsPath, results, { spaces: 2 });

    return results;
  } catch (error) {
    console.error('Error collecting vulnerability data:', error);
    return {
      ...results,
      status: 'error',
      error: error.message,
    };
  }
}

/**
 * Collect vulnerabilities from public security databases
 * @param {Object} options - Collection options
 * @returns {Promise<Object>} Collection results
 */
async function collectFromPublicDatabases(options = {}) {
  const sources = [
    { name: 'swc-registry', enabled: true },
    { name: 'consensys-known-attacks', enabled: true },
    { name: 'openzeppelin-security', enabled: true },
    { name: 'etherscan-verified-contracts', enabled: true },
    { name: 'github-security-advisories', enabled: true },
  ];

  const results = {
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

  // Process each enabled source
  for (const source of sources.filter(s => s.enabled)) {
    try {
      // Simulate data collection from each source
      // In a real implementation, this would be API calls to external sources
      const sourceData = await simulateSourceCollection(source.name);
      results.items.push(...sourceData);
      results.count += sourceData.length;

      // Update category and severity counts
      sourceData.forEach(item => {
        // Update by category
        if (!results.vulnerabilitiesByCategory[item.category]) {
          results.vulnerabilitiesByCategory[item.category] = 0;
        }
        results.vulnerabilitiesByCategory[item.category]++;

        // Update by severity
        results.vulnerabilitiesBySeverity[item.severity]++;
      });
    } catch (error) {
      console.error(`Error collecting from ${source.name}:`, error);
    }
  }

  return results;
}

/**
 * Simulate data collection from a source (placeholder for real API implementation)
 * @param {string} sourceName - Name of the data source
 * @returns {Promise<Array>} Collected data items
 */
async function simulateSourceCollection(sourceName) {
  // This is a placeholder that would be replaced with real API calls
  // For now, we return synthetic data to simulate the collection process
  const counts = {
    'swc-registry': 25,
    'consensys-known-attacks': 15,
    'openzeppelin-security': 20,
    'etherscan-verified-contracts': 30,
    'github-security-advisories': 10,
  };

  const count = counts[sourceName] || 5;
  const categories = [
    'reentrancy',
    'access-control',
    'arithmetic',
    'front-running',
    'unchecked-return',
  ];
  const severities = ['critical', 'high', 'medium', 'low', 'info'];

  return Array.from({ length: count }, (_, i) => ({
    id: `${sourceName}-${i + 1}`,
    source: sourceName,
    title: `Simulated vulnerability ${i + 1} from ${sourceName}`,
    description: `This is a simulated vulnerability for testing purposes from ${sourceName}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    timestamp: new Date().toISOString(),
    metadata: {
      simulatedData: true,
      sourceType: sourceName,
    },
  }));
}

/**
 * Merge vulnerability statistics from a collection into the results object
 * @param {Object} results - Results object to update
 * @param {Object} collectionData - Collection data to merge
 */
function mergeVulnerabilityStats(results, collectionData) {
  // Merge category data
  Object.entries(collectionData.vulnerabilitiesByCategory || {}).forEach(([category, count]) => {
    if (!results.vulnerabilitiesByCategory[category]) {
      results.vulnerabilitiesByCategory[category] = 0;
    }
    results.vulnerabilitiesByCategory[category] += count;
  });

  // Merge severity data
  Object.entries(collectionData.vulnerabilitiesBySeverity || {}).forEach(([severity, count]) => {
    results.vulnerabilitiesBySeverity[severity] += count;
  });
}

/**
 * Ensure the system is initialized before performing operations
 * @throws {Error} If system is not initialized
 */
function ensureInitialized() {
  if (!initialized) {
    throw new Error('Data infrastructure has not been initialized. Call initialize() first.');
  }
}

module.exports = {
  initialize,
  collectVulnerabilityData,
  vulnDatasetManager,
  transactionPatternCollector,
  smartContractCategorizer,
  testOutcomeAggregator,
};
