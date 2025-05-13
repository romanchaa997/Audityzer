/**
 * @fileoverview CircleCI Integration Adapter
 *
 * This module provides an integration adapter for CircleCI that enables
 * generating CircleCI configuration, running tests, and reporting results.
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const yaml = require('js-yaml');

/**
 * CircleCI Integration Adapter
 * Creates and manages CircleCI pipeline configurations for Web3FuzzForge
 */
class CircleCIAdapter {
  /**
   * Create a new CircleCI adapter
   * @param {Object} config - Configuration object
   */
  constructor(config = {}) {
    this.config = {
      circleApiToken: config.circleApiToken || process.env.CIRCLE_API_TOKEN,
      projectSlug: config.projectSlug || process.env.CIRCLE_PROJECT_SLUG,
      configPath: config.configPath || '.circleci/config.yml',
      orbs: config.orbs || {
        node: 'circleci/node@5.1',
        playwright: 'playwright-community/playwright@1.0.0',
      },
      extraSteps: config.extraSteps || [],
      ...config,
    };
  }

  /**
   * Generate a CircleCI configuration for Web3FuzzForge
   * @param {Object} options - Generation options
   * @returns {Object} Generated configuration object
   */
  generateConfig(options = {}) {
    const {
      nodeVersion = '18.16',
      browsers = ['chromium'],
      runOnPush = true,
      runOnPR = true,
      cacheEnabled = true,
      reportFormat = 'html',
      includeTests = true,
      includeSecurity = true,
      includeDeployment = false,
    } = options;

    // Basic CircleCI configuration
    const config = {
      version: 2.1,
      orbs: this.config.orbs,
      jobs: {
        test: {
          docker: [
            {
              image: `cimg/node:${nodeVersion}-browsers`,
            },
          ],
          steps: [
            'checkout',
            {
              setup_remote_docker: {
                version: '20.10.14',
              },
            },
          ],
        },
      },
      workflows: {
        version: 2,
        main: {
          jobs: ['test'],
        },
      },
    };

    // Add cache handling
    if (cacheEnabled) {
      config.jobs.test.steps.push({
        restore_cache: {
          keys: ['v1-dependencies-{{ checksum "package.json" }}', 'v1-dependencies-'],
        },
      });
    }

    // Add installation steps
    config.jobs.test.steps.push({
      run: {
        name: 'Install dependencies',
        command: 'npm ci',
      },
    });

    // Add Playwright browser installation if needed
    if (browsers && browsers.length > 0) {
      config.jobs.test.steps.push({
        run: {
          name: 'Install Playwright browsers',
          command: `npx playwright install ${browsers.join(' ')}`,
        },
      });
    }

    // Add caching step
    if (cacheEnabled) {
      config.jobs.test.steps.push({
        save_cache: {
          paths: ['node_modules'],
          key: 'v1-dependencies-{{ checksum "package.json" }}',
        },
      });
    }

    // Add test run command
    if (includeTests) {
      config.jobs.test.steps.push({
        run: {
          name: 'Run tests',
          command: 'npm test',
        },
      });
    }

    // Add security check command
    if (includeSecurity) {
      config.jobs.test.steps.push({
        run: {
          name: 'Run security checks',
          command: 'npx web3fuzzforge analyze',
        },
      });
    }

    // Add deployment validation if requested
    if (includeDeployment) {
      config.jobs.test.steps.push({
        run: {
          name: 'Validate deployments',
          command: 'npx web3fuzzforge deploy-validate',
        },
      });
    }

    // Store test results
    config.jobs.test.steps.push({
      store_test_results: {
        path: './test-results',
      },
    });

    // Store artifacts (test results, screenshots, etc.)
    config.jobs.test.steps.push({
      store_artifacts: {
        path: './test-results',
        destination: 'test-results',
      },
    });

    // Add any extra steps
    if (this.config.extraSteps && this.config.extraSteps.length > 0) {
      config.jobs.test.steps = [...config.jobs.test.steps, ...this.config.extraSteps];
    }

    // Set up when to run the workflow
    if (runOnPush || runOnPR) {
      config.workflows.main.triggers = [];

      if (runOnPush) {
        config.workflows.main.triggers.push({
          schedule: {
            cron: '0 0 * * *',
            filters: {
              branches: {
                only: ['main', 'master'],
              },
            },
          },
        });
      }

      if (runOnPR) {
        config.workflows.main.filters = {
          branches: {
            ignore: [],
          },
        };
      }
    }

    return config;
  }

  /**
   * Write the CircleCI configuration to a file
   * @param {Object} config - Configuration object to write
   * @param {string} outputPath - Path to write the file to
   * @returns {string} Path to the written configuration file
   */
  writeConfig(config, outputPath = this.config.configPath) {
    // Ensure the output directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Convert the config object to YAML and write it
    const yamlStr = yaml.dump(config);
    fs.writeFileSync(outputPath, yamlStr, 'utf8');

    return outputPath;
  }

  /**
   * Generate and write a CircleCI configuration
   * @param {Object} options - Generation options
   * @param {string} outputPath - Path to write the config to
   * @returns {string} Path to the written configuration file
   */
  generateConfigFile(options = {}, outputPath = this.config.configPath) {
    const config = this.generateConfig(options);
    return this.writeConfig(config, outputPath);
  }

  /**
   * Get CircleCI pipeline status
   * @param {string} pipelineId - Pipeline ID
   * @returns {Promise<Object>} Pipeline status
   */
  async getPipelineStatus(pipelineId) {
    if (!this.config.circleApiToken) {
      throw new Error('CircleCI API token is required to get pipeline status');
    }

    try {
      const response = await axios.get(`https://circleci.com/api/v2/pipeline/${pipelineId}`, {
        headers: {
          'Circle-Token': this.config.circleApiToken,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(`Failed to get pipeline status: ${error.message}`);
    }
  }

  /**
   * Generate default CircleCI configuration for a Web3FuzzForge project
   * @param {string} outputPath - Where to write the configuration
   * @returns {string} Path to the written configuration file
   */
  generateDefaultConfig(outputPath = this.config.configPath) {
    // Default options for Web3FuzzForge tests
    const defaultOptions = {
      nodeVersion: '18.16',
      browsers: ['chromium'],
      runOnPush: true,
      runOnPR: true,
      cacheEnabled: true,
      reportFormat: 'html',
      includeTests: true,
      includeSecurity: true,
    };

    return this.generateConfigFile(defaultOptions, outputPath);
  }
}

module.exports = CircleCIAdapter;
