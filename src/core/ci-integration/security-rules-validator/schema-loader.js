
/**
 * Schema Loader for Security Rules Validation
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

class SchemaLoader {
  constructor() {
    this.ajv = new Ajv({ allErrors: true });
    addFormats(this.ajv);
    this.schemas = new Map();
  }

  loadSchema(schemaName = 'security-rules-schema') {
    if (this.schemas.has(schemaName)) {
      return this.schemas.get(schemaName);
    }

    try {
      const schemaPath = path.join(__dirname, `${schemaName}.json`);
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
      const validator = this.ajv.compile(schema);
      
      this.schemas.set(schemaName, { schema, validator });
      return this.schemas.get(schemaName);
    } catch (error) {
      console.error(`Error loading schema ${schemaName}:`, error);
      throw new Error(`Failed to load schema: ${schemaName}`);
    }
  }

  getValidator(schemaName = 'security-rules-schema') {
    const schemaData = this.loadSchema(schemaName);
    return schemaData.validator;
  }

  getSchema(schemaName = 'security-rules-schema') {
    const schemaData = this.loadSchema(schemaName);
    return schemaData.schema;
  }

  formatErrors(errors) {
    return errors.map(error => ({
      path: error.instancePath || error.dataPath,
      message: error.message,
      value: error.data,
      schema: error.schemaPath,
      keyword: error.keyword,
    }));
  }
}

module.exports = { SchemaLoader };
