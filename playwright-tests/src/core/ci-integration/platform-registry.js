/**
 * Mock Platform Registry for Playwright tests
 */

const CircleCIAdapter = require('./platforms/circleci-adapter');

/**
 * Class representing a registry of CI/CD platforms
 */
class PlatformRegistry {
  constructor() {
    this.platforms = {
      circleci: CircleCIAdapter,
      github: null, // Mock would be added here
      gitlab: null, // Mock would be added here
    };
  }

  /**
   * Register a platform adapter
   */
  registerPlatform(name, adapter) {
    this.platforms[name] = adapter;
    return true;
  }

  /**
   * Get a platform adapter
   */
  getPlatform(name) {
    if (!this.platforms[name]) {
      throw new Error(`Platform ${name} is not registered`);
    }
    return this.platforms[name];
  }

  /**
   * Check if a platform is available
   */
  isPlatformAvailable(name) {
    return !!this.platforms[name];
  }

  /**
   * Detect platform from environment
   */
  detectFromEnvironment() {
    // Mock implementation
    if (process.env.CIRCLECI) {
      return 'circleci';
    }
    if (process.env.GITHUB_ACTIONS) {
      return 'github';
    }
    if (process.env.GITLAB_CI) {
      return 'gitlab';
    }
    return null;
  }
}

module.exports = PlatformRegistry; 