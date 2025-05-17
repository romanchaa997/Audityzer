/**
 * Audityzer Plugin API
 * Provides the interface for plugins to interact with the core framework
 */

/**
 * Create a plugin API instance for a specific plugin
 * @param {Object} pluginManager - The plugin manager instance
 * @param {Object} plugin - The plugin metadata
 * @returns {Object} The plugin API instance
 */
function createPluginAPI(pluginManager, plugin) {
  // Store plugin-specific data
  const pluginData = {
    name: plugin.name,
    type: plugin.manifest.type,
    registeredTestTypes: new Map(),
    registeredReporters: new Map(),
    registeredWallets: new Map(),
    registeredNetworks: new Map(),
  };

  return {
    /**
     * Register a new test type
     * @param {string} id - Unique identifier for the test type
     * @param {Object} definition - Test type definition
     */
    registerTestType(id, definition) {
      if (!definition || typeof definition !== 'object') {
        throw new Error(`Invalid test type definition for ${id}`);
      }

      const requiredProps = ['name', 'description', 'execute'];
      for (const prop of requiredProps) {
        if (!definition[prop]) {
          throw new Error(`Missing required property '${prop}' in test type definition for ${id}`);
        }
      }

      if (typeof definition.execute !== 'function') {
        throw new Error(
          `The 'execute' property must be a function in test type definition for ${id}`
        );
      }

      pluginData.registeredTestTypes.set(id, {
        id,
        pluginName: plugin.name,
        ...definition,
      });

      // Register hooks if defined
      if (definition.beforeTest && typeof definition.beforeTest === 'function') {
        pluginManager.registerHook('beforeTest', plugin.name, definition.beforeTest);
      }

      if (definition.afterTest && typeof definition.afterTest === 'function') {
        pluginManager.registerHook('afterTest', plugin.name, definition.afterTest);
      }

      return true;
    },

    /**
     * Register a new reporter
     * @param {string} id - Unique identifier for the reporter
     * @param {Object} definition - Reporter definition
     */
    registerReporter(id, definition) {
      if (!definition || typeof definition !== 'object') {
        throw new Error(`Invalid reporter definition for ${id}`);
      }

      const requiredProps = ['name', 'generate'];
      for (const prop of requiredProps) {
        if (!definition[prop]) {
          throw new Error(`Missing required property '${prop}' in reporter definition for ${id}`);
        }
      }

      if (typeof definition.generate !== 'function') {
        throw new Error(
          `The 'generate' property must be a function in reporter definition for ${id}`
        );
      }

      pluginData.registeredReporters.set(id, {
        id,
        pluginName: plugin.name,
        ...definition,
      });

      // Register hooks if defined
      if (definition.reportGeneration && typeof definition.reportGeneration === 'function') {
        pluginManager.registerHook('reportGeneration', plugin.name, definition.reportGeneration);
      }

      return true;
    },

    /**
     * Register a new wallet provider
     * @param {string} id - Unique identifier for the wallet provider
     * @param {Object} definition - Wallet provider definition
     */
    registerWallet(id, definition) {
      if (!definition || typeof definition !== 'object') {
        throw new Error(`Invalid wallet definition for ${id}`);
      }

      const requiredProps = ['name', 'connect', 'signTransaction'];
      for (const prop of requiredProps) {
        if (!definition[prop]) {
          throw new Error(`Missing required property '${prop}' in wallet definition for ${id}`);
        }
      }

      pluginData.registeredWallets.set(id, {
        id,
        pluginName: plugin.name,
        ...definition,
      });

      return true;
    },

    /**
     * Register a new blockchain network
     * @param {string} id - Unique identifier for the network
     * @param {Object} definition - Network definition
     */
    registerNetwork(id, definition) {
      if (!definition || typeof definition !== 'object') {
        throw new Error(`Invalid network definition for ${id}`);
      }

      const requiredProps = ['name', 'chainId', 'rpcUrl'];
      for (const prop of requiredProps) {
        if (!definition[prop]) {
          throw new Error(`Missing required property '${prop}' in network definition for ${id}`);
        }
      }

      pluginData.registeredNetworks.set(id, {
        id,
        pluginName: plugin.name,
        ...definition,
      });

      return true;
    },

    /**
     * Get all registered test types
     */
    getRegisteredTestTypes() {
      return Array.from(pluginData.registeredTestTypes.values());
    },

    /**
     * Get all registered reporters
     */
    getRegisteredReporters() {
      return Array.from(pluginData.registeredReporters.values());
    },

    /**
     * Get all registered wallet providers
     */
    getRegisteredWallets() {
      return Array.from(pluginData.registeredWallets.values());
    },

    /**
     * Get all registered networks
     */
    getRegisteredNetworks() {
      return Array.from(pluginData.registeredNetworks.values());
    },

    /**
     * Register a hook implementation
     * @param {string} hookName - Name of the hook
     * @param {Function} implementation - Hook implementation function
     */
    registerHook(hookName, implementation) {
      if (typeof implementation !== 'function') {
        throw new Error(`Hook implementation must be a function for ${hookName}`);
      }

      pluginManager.registerHook(hookName, plugin.name, implementation);
      return true;
    },

    /**
     * Log a message from the plugin
     * @param {string} level - Log level ('info', 'warning', 'error')
     * @param {string} message - Log message
     * @param {Object} data - Additional data
     */
    log(level, message, data = {}) {
      const logLevels = ['info', 'warning', 'error', 'debug'];

      if (!logLevels.includes(level)) {
        level = 'info';
      }

      const logEntry = {
        timestamp: new Date().toISOString(),
        plugin: plugin.name,
        level,
        message,
        data,
      };

      // In a real implementation, this would use a proper logging system
      if (level === 'error') {
        console.error(`[${plugin.name}]`, message, data);
      } else if (level === 'warning') {
        console.warn(`[${plugin.name}]`, message, data);
      } else if (level === 'debug') {
        console.debug(`[${plugin.name}]`, message, data);
      } else {
        console.log(`[${plugin.name}]`, message, data);
      }

      return logEntry;
    },

    /**
     * Get plugin metadata
     */
    getPluginInfo() {
      return {
        name: plugin.name,
        version: plugin.manifest.version,
        type: plugin.manifest.type,
        description: plugin.manifest.description,
      };
    },

    /**
     * Get plugin configuration
     */
    getConfig() {
      // This would be implemented to retrieve the current plugin configuration
      // For now, we return a placeholder
      return {};
    },

    /**
     * Get access to the core framework services
     * (Restricted access to prevent plugins from interfering with each other)
     */
    services: {
      /**
       * Get test execution context
       */
      async getTestContext() {
        // This would create a new browser context for tests
        return {
          async createBrowserContext() {
            // In a real implementation, this would set up a new browser context
            return {
              async newPage() {
                // This would return a new page in the browser context
                return {
                  // Page methods would be implemented here
                };
              },
            };
          },
        };
      },

      /**
       * Get wallet instance
       * @param {string} walletType - Type of wallet to create
       */
      async getWallet(walletType) {
        // This would return a wallet instance of the specified type
        // For now, it returns a placeholder
        return {
          connect: async () => {},
          signTransaction: async () => {},
        };
      },

      /**
       * Get reporting service
       */
      async getReportingService() {
        // This would return a service for generating reports
        return {
          generateReport: async () => {},
        };
      },
    },
  };
}

module.exports = { createPluginAPI };
