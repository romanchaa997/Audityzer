/**
 * Web3FuzzForge Plugin Manager
 * Handles plugin discovery, loading, and lifecycle management
 */

const fs = require('fs');
const path = require('path');
const { createPluginAPI } = require('./plugin-api');
const Ajv = require('ajv');

class PluginManager {
  constructor(options = {}) {
    this.options = {
      pluginDirs: [
        path.resolve(process.cwd(), 'plugins'),
        path.resolve(process.cwd(), 'node_modules'),
      ],
      ...options,
    };

    this.plugins = {
      test: new Map(),
      wallet: new Map(),
      reporter: new Map(),
      network: new Map(),
    };

    this.pluginInstances = new Map();
    this.hooks = {};
    this.ajv = new Ajv();
  }

  /**
   * Discover all available plugins in the configured directories
   */
  async discoverPlugins() {
    const discoveredPlugins = [];

    for (const dir of this.options.pluginDirs) {
      if (!fs.existsSync(dir)) continue;

      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        // Check if this is a Web3FuzzForge plugin (has plugin.json)
        const pluginJsonPath = path.join(dir, entry.name, 'plugin.json');
        if (!fs.existsSync(pluginJsonPath)) {
          // Check if it might be in node_modules with web3fuzzforge-plugin prefix
          if (entry.name.startsWith('web3fuzzforge-plugin-')) {
            const packageJsonPath = path.join(dir, entry.name, 'package.json');
            if (fs.existsSync(packageJsonPath)) {
              const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
              if (packageJson.web3fuzzforgePlugin) {
                discoveredPlugins.push({
                  name: entry.name,
                  manifest: packageJson.web3fuzzforgePlugin,
                  path: path.join(dir, entry.name),
                });
              }
            }
          }
          continue;
        }

        try {
          const manifest = JSON.parse(fs.readFileSync(pluginJsonPath, 'utf8'));
          discoveredPlugins.push({
            name: entry.name,
            manifest,
            path: path.join(dir, entry.name),
          });
        } catch (error) {
          console.error(`Error loading plugin manifest for ${entry.name}:`, error);
        }
      }
    }

    return discoveredPlugins;
  }

  /**
   * Load and initialize all discovered plugins
   */
  async loadPlugins() {
    const discoveredPlugins = await this.discoverPlugins();
    const loadedPlugins = [];

    for (const plugin of discoveredPlugins) {
      try {
        const isValid = this.validatePluginManifest(plugin.manifest);

        if (!isValid) {
          console.error(`Invalid plugin manifest for ${plugin.name}`);
          continue;
        }

        const pluginModule = require(
          path.join(plugin.path, plugin.manifest.entryPoint || 'index.js')
        );
        const pluginType = plugin.manifest.type;

        if (!this.plugins[pluginType]) {
          this.plugins[pluginType] = new Map();
        }

        // Create plugin API instance for this plugin
        const api = createPluginAPI(this, plugin);

        // Initialize the plugin
        const instance = typeof pluginModule === 'function' ? pluginModule(api) : pluginModule;

        this.pluginInstances.set(plugin.name, {
          instance,
          manifest: plugin.manifest,
          api,
        });

        if (instance && typeof instance.init === 'function') {
          await instance.init();
        }

        this.plugins[pluginType].set(plugin.name, {
          name: plugin.name,
          manifest: plugin.manifest,
          instance,
        });

        loadedPlugins.push({
          name: plugin.name,
          type: pluginType,
          version: plugin.manifest.version,
        });

        console.log(`Loaded plugin: ${plugin.name} (${pluginType})`);
      } catch (error) {
        console.error(`Error loading plugin ${plugin.name}:`, error);
      }
    }

    return loadedPlugins;
  }

  /**
   * Validate a plugin manifest against the schema
   */
  validatePluginManifest(manifest) {
    const schema = {
      type: 'object',
      required: ['name', 'version', 'type'],
      properties: {
        name: { type: 'string' },
        version: { type: 'string' },
        type: { type: 'string', enum: ['test', 'wallet', 'reporter', 'network'] },
        description: { type: 'string' },
        entryPoint: { type: 'string' },
        configSchema: { type: 'string' },
        dependencies: { type: 'object' },
        author: { type: 'string' },
        license: { type: 'string' },
      },
    };

    const validate = this.ajv.compile(schema);
    return validate(manifest);
  }

  /**
   * Get all plugins of a specific type
   */
  getPluginsByType(type) {
    return Array.from(this.plugins[type]?.values() || []);
  }

  /**
   * Get a specific plugin by name
   */
  getPluginByName(name) {
    for (const typePlugins of Object.values(this.plugins)) {
      if (typePlugins.has(name)) {
        return typePlugins.get(name);
      }
    }
    return null;
  }

  /**
   * Register a hook implementation for a plugin
   */
  registerHook(hookName, pluginName, implementation) {
    if (!this.hooks[hookName]) {
      this.hooks[hookName] = [];
    }

    this.hooks[hookName].push({
      pluginName,
      implementation,
    });
  }

  /**
   * Execute all registered implementations for a hook
   */
  async executeHook(hookName, context) {
    if (!this.hooks[hookName]) return [];

    const results = [];

    for (const hook of this.hooks[hookName]) {
      try {
        const result = await hook.implementation(context);
        results.push({
          pluginName: hook.pluginName,
          result,
        });
      } catch (error) {
        console.error(`Error executing hook ${hookName} from plugin ${hook.pluginName}:`, error);
        results.push({
          pluginName: hook.pluginName,
          error,
        });
      }
    }

    return results;
  }

  /**
   * Configure a specific plugin
   */
  async configurePlugin(pluginName, config) {
    const pluginInfo = this.getPluginByName(pluginName);

    if (!pluginInfo) {
      throw new Error(`Plugin ${pluginName} not found`);
    }

    const { instance, manifest } = pluginInfo;

    // Validate configuration against schema if available
    if (manifest.configSchema) {
      const schemaPath = path.join(
        path.dirname(require.resolve(`${pluginName}/package.json`)),
        manifest.configSchema
      );

      if (fs.existsSync(schemaPath)) {
        const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
        const validate = this.ajv.compile(schema);

        if (!validate(config)) {
          throw new Error(
            `Invalid configuration for plugin ${pluginName}: ${this.ajv.errorsText(validate.errors)}`
          );
        }
      }
    }

    // Apply configuration to the plugin
    if (instance && typeof instance.configure === 'function') {
      await instance.configure(config);
    }

    return true;
  }

  /**
   * Unload all plugins and perform cleanup
   */
  async unloadPlugins() {
    for (const [pluginName, { instance }] of this.pluginInstances.entries()) {
      if (instance && typeof instance.cleanup === 'function') {
        try {
          await instance.cleanup();
        } catch (error) {
          console.error(`Error cleaning up plugin ${pluginName}:`, error);
        }
      }
    }

    this.pluginInstances.clear();

    for (const typePlugins of Object.values(this.plugins)) {
      typePlugins.clear();
    }

    this.hooks = {};
  }
}

module.exports = PluginManager;
