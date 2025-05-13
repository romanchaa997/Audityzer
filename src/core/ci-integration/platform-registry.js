/**
 * @fileoverview CI/CD Platform Registry
 *
 * This module provides a registry for all supported CI/CD platform adapters
 * and handles automatic detection and instantiation of the appropriate adapter.
 */

const GitHubAdapter = require('./platforms/github-adapter');
const GitLabAdapter = require('./platforms/gitlab-adapter');
const CircleCIAdapter = require('./platforms/circleci-adapter');

class PlatformRegistry {
  constructor() {
    this.platformAdapters = {
      github: GitHubAdapter,
      gitlab: GitLabAdapter,
      circle: CircleCIAdapter,
    };

    this.detectedPlatform = null;
    this.currentAdapter = null;
  }

  /**
   * Detect the current CI/CD platform based on environment variables
   * @returns {string} Detected platform name or null if not in CI environment
   */
  detectPlatform() {
    if (process.env.GITHUB_ACTIONS) {
      this.detectedPlatform = 'github';
    } else if (process.env.GITLAB_CI) {
      this.detectedPlatform = 'gitlab';
    } else if (process.env.JENKINS_URL) {
      this.detectedPlatform = 'jenkins';
    } else if (process.env.TF_BUILD) {
      this.detectedPlatform = 'azure';
    } else if (process.env.TRAVIS) {
      this.detectedPlatform = 'travis';
    } else if (process.env.CIRCLECI) {
      this.detectedPlatform = 'circle';
    } else {
      this.detectedPlatform = null;
    }

    return this.detectedPlatform;
  }

  /**
   * Get the appropriate adapter for the current or specified platform
   * @param {string} platformName - Platform name to get adapter for (optional)
   * @param {Object} config - Configuration for the adapter
   * @returns {Object} Platform adapter instance
   */
  getAdapter(platformName = null, config = {}) {
    const platform = platformName || this.detectedPlatform || this.detectPlatform();

    if (!platform) {
      console.log('No CI/CD platform detected. Using default implementation.');
      // Return a default adapter implementation
      return {
        formatResults: results => results,
        generateReport: () => {
          console.log('No specific platform reporting available.');
        },
      };
    }

    if (!this.platformAdapters[platform]) {
      console.warn(`Platform '${platform}' is detected but no adapter is available.`);
      return null;
    }

    try {
      const AdapterClass = this.platformAdapters[platform];
      this.currentAdapter = new AdapterClass(config);
      return this.currentAdapter;
    } catch (error) {
      console.error(`Error instantiating adapter for platform '${platform}':`, error);
      return null;
    }
  }

  /**
   * Register a new platform adapter
   * @param {string} platformName - Name of the platform
   * @param {Class} adapterClass - Adapter class for the platform
   * @returns {boolean} Success status
   */
  registerAdapter(platformName, adapterClass) {
    if (!platformName || !adapterClass) {
      console.error('Platform name and adapter class are required for registration');
      return false;
    }

    this.platformAdapters[platformName] = adapterClass;
    console.log(`Registered adapter for platform: ${platformName}`);
    return true;
  }

  /**
   * List all registered platform adapters
   * @returns {Array} List of registered platforms
   */
  listRegisteredPlatforms() {
    return Object.keys(this.platformAdapters);
  }

  /**
   * Check if a specific platform adapter is registered
   * @param {string} platformName - Name of the platform to check
   * @returns {boolean} True if the platform is registered
   */
  hasAdapter(platformName) {
    return !!this.platformAdapters[platformName];
  }
}

module.exports = PlatformRegistry;
