/**
 * Specialized Web3 Training Data Infrastructure
 *
 * This module handles the collection, preparation, and management
 * of specialized Web3 training data for vulnerability detection models.
 */

const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const { createHash } = require('crypto');

// Sources of vulnerability data
const DATA_SOURCES = {
  GITHUB_SECURITY: {
    url: 'https://api.github.com/search/issues',
    params: {
      q: 'is:issue label:security-advisory+ethereum',
      per_page: 100,
    },
    type: 'api',
  },
  AUDIT_REPORTS: {
    url: 'https://api.github.com/search/repositories',
    params: {
      q: 'audit+report+ethereum+solidity',
      per_page: 100,
    },
    type: 'api',
  },
  SOLODIT: {
    url: 'https://solodit.xyz/api/reports',
    type: 'api',
  },
  REKT_NEWS: {
    url: 'https://rekt.news/api/posts',
    type: 'api',
  },
  LOCAL_SAMPLES: {
    path: './data/vulnerability-samples',
    type: 'local',
  },
};

class Web3TrainingDataManager {
  constructor(config = {}) {
    this.config = {
      dataDir: config.dataDir || './data/web3-training',
      maxSamplesPerCategory: config.maxSamplesPerCategory || 1000,
      minSamplesPerCategory: config.minSamplesPerCategory || 50,
      apiKeys: config.apiKeys || {},
      ...config,
    };

    // Ensure data directory exists
    fs.ensureDirSync(this.config.dataDir);

    // Track data statistics
    this.stats = {
      totalSamples: 0,
      categoryCounts: {},
      lastUpdate: null,
    };

    // Load existing stats if available
    this.loadStats();
  }

  /**
   * Load data statistics from file
   */
  loadStats() {
    const statsPath = path.join(this.config.dataDir, 'stats.json');

    try {
      if (fs.existsSync(statsPath)) {
        this.stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));
        console.log(
          `Loaded stats: ${this.stats.totalSamples} samples across ${Object.keys(this.stats.categoryCounts).length} categories`
        );
      }
    } catch (error) {
      console.warn(`Could not load data stats: ${error.message}`);
    }
  }

  /**
   * Save data statistics to file
   */
  saveStats() {
    const statsPath = path.join(this.config.dataDir, 'stats.json');

    try {
      this.stats.lastUpdate = new Date().toISOString();
      fs.writeFileSync(statsPath, JSON.stringify(this.stats, null, 2), 'utf8');
    } catch (error) {
      console.error(`Failed to save data stats: ${error.message}`);
    }
  }

  /**
   * Generate a unique ID for a sample
   * @param {Object} sample - The data sample
   * @returns {string} - Unique ID
   */
  generateSampleId(sample) {
    const content = JSON.stringify(sample);
    return createHash('sha256').update(content).digest('hex').substring(0, 16);
  }

  /**
   * Process and store a vulnerability sample
   * @param {Object} sample - The vulnerability sample
   * @param {string} category - Vulnerability category
   */
  storeSample(sample, category) {
    // Generate unique ID for the sample
    const sampleId = this.generateSampleId(sample);

    // Prepare sample with metadata
    const processedSample = {
      ...sample,
      id: sampleId,
      category,
      addedAt: new Date().toISOString(),
      source: sample.source || 'unknown',
    };

    // Create category directory if it doesn't exist
    const categoryDir = path.join(this.config.dataDir, category);
    fs.ensureDirSync(categoryDir);

    // Write sample to file
    const samplePath = path.join(categoryDir, `${sampleId}.json`);
    fs.writeFileSync(samplePath, JSON.stringify(processedSample, null, 2), 'utf8');

    // Update stats
    this.stats.totalSamples++;
    this.stats.categoryCounts[category] = (this.stats.categoryCounts[category] || 0) + 1;
    this.saveStats();

    return sampleId;
  }

  /**
   * Collect vulnerability data from API sources
   * @param {Object} source - API source configuration
   * @returns {Promise<Array>} - Collected samples
   */
  async collectFromApiSource(source) {
    try {
      // Set up request headers with API keys if available
      const headers = {};
      if (source.name === 'GITHUB_SECURITY' && this.config.apiKeys.github) {
        headers.Authorization = `token ${this.config.apiKeys.github}`;
      }

      // Make API request
      const response = await axios.get(source.url, {
        params: source.params,
        headers,
      });

      // Process response based on source type
      let samples = [];

      if (source.name === 'GITHUB_SECURITY') {
        // Process GitHub security advisories
        samples = response.data.items.map(item => ({
          title: item.title,
          description: item.body,
          url: item.html_url,
          createdAt: item.created_at,
          source: 'github_security',
        }));
      } else if (source.name === 'SOLODIT') {
        // Process Solodit audit reports
        samples = response.data.map(report => ({
          title: report.title,
          description: report.description,
          url: report.url,
          findings: report.findings,
          source: 'solodit',
        }));
      } else if (source.name === 'REKT_NEWS') {
        // Process Rekt News posts
        samples = response.data.map(post => ({
          title: post.title,
          description: post.content,
          url: post.url,
          lossAmount: post.lossAmount,
          date: post.date,
          source: 'rekt_news',
        }));
      }

      console.log(`Collected ${samples.length} samples from ${source.name}`);
      return samples;
    } catch (error) {
      console.error(`Error collecting from ${source.name}: ${error.message}`);
      return [];
    }
  }

  /**
   * Collect vulnerability samples from local files
   * @param {Object} source - Local source configuration
   * @returns {Array} - Collected samples
   */
  collectFromLocalSource(source) {
    try {
      const samples = [];
      const sourcePath = source.path;

      if (!fs.existsSync(sourcePath)) {
        console.warn(`Local source path does not exist: ${sourcePath}`);
        return samples;
      }

      // Read all JSON files in the directory
      const files = fs.readdirSync(sourcePath).filter(file => file.endsWith('.json'));

      // Process each file
      files.forEach(file => {
        try {
          const filePath = path.join(sourcePath, file);
          const sampleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

          // Add source information
          sampleData.source = 'local_sample';
          samples.push(sampleData);
        } catch (error) {
          console.warn(`Error processing file ${file}: ${error.message}`);
        }
      });

      console.log(`Collected ${samples.length} samples from local source`);
      return samples;
    } catch (error) {
      console.error(`Error collecting from local source: ${error.message}`);
      return [];
    }
  }

  /**
   * Categorize a vulnerability sample
   * @param {Object} sample - The vulnerability sample
   * @returns {string} - Determined category
   */
  categorizeSample(sample) {
    // Simple keyword-based categorization
    const textToAnalyze = `${sample.title || ''} ${sample.description || ''}`.toLowerCase();

    const categoryKeywords = {
      REENTRANCY: ['reentrancy', 'reentrant', 'external call after state'],
      ACCESS_CONTROL: ['access control', 'authorization', 'permission'],
      FLASH_LOAN_ATTACK: ['flash loan', 'price manipulation'],
      FRONT_RUNNING: ['front-running', 'transaction ordering', 'mev'],
      CROSS_CHAIN: ['bridge', 'cross-chain', 'layerzero', 'message passing'],
      ARITHMETIC: ['overflow', 'underflow', 'arithmetic', 'division by zero'],
      ORACLE_MANIPULATION: ['oracle', 'price feed', 'chainlink'],
    };

    // Find matching category
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => textToAnalyze.includes(keyword))) {
        return category;
      }
    }

    return 'OTHER';
  }

  /**
   * Collect and process vulnerability data
   * @returns {Promise<Object>} - Collection statistics
   */
  async collectData() {
    const startTime = Date.now();
    const stats = {
      collected: 0,
      stored: 0,
      bySources: {},
      byCategory: {},
    };

    // Process API sources
    for (const [sourceName, sourceConfig] of Object.entries(DATA_SOURCES)) {
      stats.bySources[sourceName] = 0;

      if (sourceConfig.type === 'api') {
        const samples = await this.collectFromApiSource({
          ...sourceConfig,
          name: sourceName,
        });

        // Process and store samples
        for (const sample of samples) {
          const category = this.categorizeSample(sample);

          // Only store if we need more samples for this category
          if (
            !this.stats.categoryCounts[category] ||
            this.stats.categoryCounts[category] < this.config.maxSamplesPerCategory
          ) {
            this.storeSample(sample, category);
            stats.stored++;

            // Track by category
            stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
          }

          stats.collected++;
          stats.bySources[sourceName]++;
        }
      } else if (sourceConfig.type === 'local') {
        const samples = this.collectFromLocalSource(sourceConfig);

        // Process and store samples
        for (const sample of samples) {
          const category = this.categorizeSample(sample);

          // Only store if we need more samples for this category
          if (
            !this.stats.categoryCounts[category] ||
            this.stats.categoryCounts[category] < this.config.maxSamplesPerCategory
          ) {
            this.storeSample(sample, category);
            stats.stored++;

            // Track by category
            stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
          }

          stats.collected++;
          stats.bySources[sourceName]++;
        }
      }
    }

    // Calculate duration
    stats.duration = (Date.now() - startTime) / 1000;

    console.log(`Data collection complete. Collected: ${stats.collected}, Stored: ${stats.stored}`);
    return stats;
  }

  /**
   * Get all samples for a category
   * @param {string} category - Vulnerability category
   * @returns {Array} - Samples for the category
   */
  getSamplesForCategory(category) {
    const categoryDir = path.join(this.config.dataDir, category);

    if (!fs.existsSync(categoryDir)) {
      console.warn(`Category directory does not exist: ${categoryDir}`);
      return [];
    }

    const files = fs.readdirSync(categoryDir).filter(file => file.endsWith('.json'));

    const samples = [];
    files.forEach(file => {
      try {
        const filePath = path.join(categoryDir, file);
        const sample = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        samples.push(sample);
      } catch (error) {
        console.warn(`Error reading sample file ${file}: ${error.message}`);
      }
    });

    return samples;
  }

  /**
   * Get training and validation data for model training
   * @param {Object} options - Options for data preparation
   * @returns {Object} - Training and validation datasets
   */
  prepareModelData(options = {}) {
    const { validationSplit = 0.2, includeCategories = null, excludeCategories = [] } = options;

    const allData = {
      training: [],
      validation: [],
    };

    // Get available categories
    const categories = fs.existsSync(this.config.dataDir)
      ? fs
          .readdirSync(this.config.dataDir)
          .filter(dir => fs.statSync(path.join(this.config.dataDir, dir)).isDirectory())
      : [];

    // Filter categories if specified
    const categoriesToProcess = includeCategories
      ? categories.filter(cat => includeCategories.includes(cat))
      : categories.filter(cat => !excludeCategories.includes(cat));

    // Process each category
    categoriesToProcess.forEach(category => {
      const samples = this.getSamplesForCategory(category);

      // Skip if we don't have enough samples
      if (samples.length < this.config.minSamplesPerCategory) {
        console.warn(
          `Skipping category ${category} with only ${samples.length} samples (minimum: ${this.config.minSamplesPerCategory})`
        );
        return;
      }

      // Shuffle samples
      const shuffledSamples = [...samples].sort(() => Math.random() - 0.5);

      // Split into training and validation
      const validationCount = Math.max(1, Math.floor(samples.length * validationSplit));
      const trainingCount = samples.length - validationCount;

      const trainingSamples = shuffledSamples.slice(0, trainingCount);
      const validationSamples = shuffledSamples.slice(trainingCount);

      // Add to datasets
      allData.training.push(
        ...trainingSamples.map(sample => ({
          ...sample,
          label: category,
        }))
      );

      allData.validation.push(
        ...validationSamples.map(sample => ({
          ...sample,
          label: category,
        }))
      );
    });

    console.log(
      `Prepared model data: ${allData.training.length} training samples, ${allData.validation.length} validation samples`
    );

    return allData;
  }

  /**
   * Export datasets for model training
   * @param {Object} options - Export options
   * @returns {Object} - Paths to export files
   */
  exportDatasets(options = {}) {
    const {
      exportDir = './data/model-training',
      format = 'json',
      includeMetadata = true,
    } = options;

    // Ensure export directory exists
    fs.ensureDirSync(exportDir);

    // Prepare data
    const modelData = this.prepareModelData(options);

    // Format for export
    const exportData = {
      training: modelData.training.map(sample => {
        const formatted = {
          text: `${sample.title || ''} ${sample.description || ''}`,
          label: sample.label,
        };

        if (includeMetadata) {
          formatted.metadata = {
            id: sample.id,
            source: sample.source,
            addedAt: sample.addedAt,
          };
        }

        return formatted;
      }),

      validation: modelData.validation.map(sample => {
        const formatted = {
          text: `${sample.title || ''} ${sample.description || ''}`,
          label: sample.label,
        };

        if (includeMetadata) {
          formatted.metadata = {
            id: sample.id,
            source: sample.source,
            addedAt: sample.addedAt,
          };
        }

        return formatted;
      }),
    };

    // Export files
    const paths = {};

    if (format === 'json') {
      // Export as JSON
      paths.training = path.join(exportDir, 'training-data.json');
      paths.validation = path.join(exportDir, 'validation-data.json');

      fs.writeFileSync(paths.training, JSON.stringify(exportData.training, null, 2), 'utf8');
      fs.writeFileSync(paths.validation, JSON.stringify(exportData.validation, null, 2), 'utf8');
    } else if (format === 'csv') {
      // Export as CSV
      paths.training = path.join(exportDir, 'training-data.csv');
      paths.validation = path.join(exportDir, 'validation-data.csv');

      // Create CSV content
      const createCsv = data => {
        const headers = ['text', 'label'];
        if (includeMetadata) {
          headers.push('id', 'source', 'added_at');
        }

        const rows = [headers.join(',')];

        data.forEach(item => {
          const row = [`"${item.text.replace(/"/g, '""')}"`, `"${item.label}"`];

          if (includeMetadata) {
            row.push(
              `"${item.metadata.id}"`,
              `"${item.metadata.source}"`,
              `"${item.metadata.addedAt}"`
            );
          }

          rows.push(row.join(','));
        });

        return rows.join('\n');
      };

      fs.writeFileSync(paths.training, createCsv(exportData.training), 'utf8');
      fs.writeFileSync(paths.validation, createCsv(exportData.validation), 'utf8');
    }

    console.log(`Exported datasets to ${exportDir}`);
    return paths;
  }
}

module.exports = Web3TrainingDataManager;
