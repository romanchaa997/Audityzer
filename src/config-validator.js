/**
 * Configuration Validator Module
 * 
 * Validates configuration files against JSON schema to ensure they are properly formatted.
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

/**
 * Validate a configuration object against a JSON schema
 * @param {Object} config - Configuration object to validate
 * @param {Object} schema - JSON schema to validate against
 * @returns {Object} Validation result with success flag and errors
 */
export function validateConfig(config, schema) {
  try {
    // Simple validation for required fields
    const errors = [];

    if (schema.required) {
      for (const requiredField of schema.required) {
        if (config[requiredField] === undefined) {
          errors.push(`Missing required field: ${requiredField}`);
        }
      }
    }

    // Validate properties if defined
    if (schema.properties) {
      for (const [propName, propSchema] of Object.entries(schema.properties)) {
        if (config[propName] !== undefined) {
          // Type validation
          if (propSchema.type && !validateType(config[propName], propSchema.type)) {
            errors.push(`Invalid type for ${propName}: expected ${propSchema.type}`);
          }

          // Enum validation
          if (propSchema.enum && !propSchema.enum.includes(config[propName])) {
            errors.push(`Invalid value for ${propName}: must be one of [${propSchema.enum.join(', ')}]`);
          }

          // Minimum/maximum validation for numbers
          if (propSchema.type === 'number' || propSchema.type === 'integer') {
            if (propSchema.minimum !== undefined && config[propName] < propSchema.minimum) {
              errors.push(`Invalid value for ${propName}: must be >= ${propSchema.minimum}`);
            }
            if (propSchema.maximum !== undefined && config[propName] > propSchema.maximum) {
              errors.push(`Invalid value for ${propName}: must be <= ${propSchema.maximum}`);
            }
          }

          // Pattern validation for strings
          if (propSchema.type === 'string' && propSchema.pattern) {
            const regex = new RegExp(propSchema.pattern);
            if (!regex.test(config[propName])) {
              errors.push(`Invalid format for ${propName}: must match pattern ${propSchema.pattern}`);
            }
          }
        }
      }
    }

    return {
      success: errors.length === 0,
      errors
    };
  } catch (error) {
    return {
      success: false,
      errors: [`Validation error: ${error.message}`]
    };
  }
}

/**
 * Validate a value against a JSON schema type
 * @param {any} value - Value to validate
 * @param {string} type - JSON schema type
 * @returns {boolean} True if the value matches the type
 */
function validateType(value, type) {
  switch (type) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'integer':
      return Number.isInteger(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'array':
      return Array.isArray(value);
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'null':
      return value === null;
    default:
      return true; // Unknown type, assume valid
  }
}

/**
 * Load and validate a configuration file
 * @param {string} configPath - Path to the configuration file
 * @param {string} schemaPath - Path to the JSON schema file
 * @returns {Object} Loaded and validated configuration
 */
export async function loadAndValidateConfig(configPath, schemaPath) {
  try {
    // Check if config file exists
    if (!await fs.pathExists(configPath)) {
      throw new Error(`Configuration file not found: ${configPath}`);
    }

    // Check if schema file exists
    if (!await fs.pathExists(schemaPath)) {
      throw new Error(`Schema file not found: ${schemaPath}`);
    }

    // Load config and schema
    const config = await fs.readJson(configPath);
    const schema = await fs.readJson(schemaPath);

    // Validate config against schema
    const validation = validateConfig(config, schema);

    if (!validation.success) {
      console.error(chalk.red('Configuration validation failed:'));
      validation.errors.forEach(error => console.error(chalk.red(`- ${error}`)));
      throw new Error('Invalid configuration');
    }

    return config;
  } catch (error) {
    console.error(chalk.red(`Error loading configuration: ${error.message}`));
    throw error;
  }
}

/**
 * Create a default configuration file if it doesn't exist
 * @param {string} configPath - Path to the configuration file
 * @param {Object} defaultConfig - Default configuration object
 * @returns {Promise<boolean>} True if the file was created, false if it already existed
 */
export async function createDefaultConfig(configPath, defaultConfig) {
  try {
    // Check if config file already exists
    if (await fs.pathExists(configPath)) {
      return false; // File already exists
    }

    // Create directory if it doesn't exist
    await fs.ensureDir(path.dirname(configPath));

    // Write default config
    await fs.writeJson(configPath, defaultConfig, { spaces: 2 });

    console.log(chalk.green(`Created default configuration at: ${configPath}`));
    return true;
  } catch (error) {
    console.error(chalk.red(`Error creating default configuration: ${error.message}`));
    throw error;
  }
}

export default {
  validateConfig,
  loadAndValidateConfig,
  createDefaultConfig
};