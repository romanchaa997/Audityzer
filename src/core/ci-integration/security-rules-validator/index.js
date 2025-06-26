
/**
 * Security Rules Validator - Refactored Main Class
 */

const fs = require('fs');
const path = require('path');

const { SchemaLoader } = require('./schema-loader');
const { ComplianceChecker } = require('./compliance-checker');
const { L2Validator } = require('./l2-validator');
const { TemplateGenerator } = require('./template-generator');

class SecurityRulesValidator {
  constructor() {
    this.schemaLoader = new SchemaLoader();
    this.complianceChecker = new ComplianceChecker();
    this.l2Validator = new L2Validator();
    this.templateGenerator = new TemplateGenerator();
  }

  /**
   * Validates security rules configuration against schema
   */
  validate(rules) {
    try {
      const validator = this.schemaLoader.getValidator();
      const isValid = validator(rules);

      return {
        valid: isValid,
        errors: isValid ? [] : this.schemaLoader.formatErrors(validator.errors),
      };
    } catch (error) {
      return {
        valid: false,
        errors: [{ message: `Validation error: ${error.message}` }],
      };
    }
  }

  /**
   * Validates security rules from file
   */
  validateFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        return {
          valid: false,
          errors: [{ message: `File not found: ${filePath}` }],
        };
      }

      const content = fs.readFileSync(filePath, 'utf8');
      const rules = JSON.parse(content);
      
      return this.validate(rules);
    } catch (error) {
      return {
        valid: false,
        errors: [{ message: `File validation error: ${error.message}` }],
      };
    }
  }

  /**
   * Detects common misconfigurations
   */
  detectMisconfigurations(rules) {
    const issues = [];

    // Check for weak security settings
    if (rules.security && rules.security.level === 'low') {
      issues.push({
        type: 'security_level',
        severity: 'medium',
        message: 'Security level set to low - consider increasing to medium or high',
      });
    }

    // Check for disabled monitoring
    if (!rules.monitoring || !rules.monitoring.enabled) {
      issues.push({
        type: 'monitoring_disabled',
        severity: 'high',
        message: 'Monitoring is disabled - this reduces visibility into security events',
      });
    }

    // Check for missing encryption
    if (!rules.security || !rules.security.encryption || !rules.security.encryption.atRest) {
      issues.push({
        type: 'encryption_missing',
        severity: 'high',
        message: 'Data encryption at rest is not enabled',
      });
    }

    // Check for weak password policy
    if (rules.authentication && rules.authentication.passwordPolicy) {
      const policy = rules.authentication.passwordPolicy;
      if (policy.minLength < 8) {
        issues.push({
          type: 'weak_password_policy',
          severity: 'medium',
          message: 'Password minimum length is less than 8 characters',
        });
      }
    }

    return {
      issues,
      count: issues.length,
      severity_breakdown: this._categorizeBySeverity(issues),
    };
  }

  /**
   * Check compliance with security standards
   */
  checkCompliance(rules, standard) {
    return this.complianceChecker.checkCompliance(rules, standard);
  }

  /**
   * Validate L2 protocol specific rules
   */
  validateL2Protocol(rules, l2Protocol) {
    return this.l2Validator.validateL2Protocol(rules, l2Protocol);
  }

  /**
   * Validate bridge security configuration
   */
  validateBridgeSecurity(rules) {
    return this.l2Validator.validateBridgeSecurity(rules);
  }

  /**
   * Export validation results to SARIF format
   */
  exportToSARIF(rules, outputPath) {
    const validationResult = this.validate(rules);
    const misconfigurations = this.detectMisconfigurations(rules);
    
    const sarif = {
      version: '2.1.0',
      $schema: 'https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json',
      runs: [{
        tool: {
          driver: {
            name: 'Audityzer Security Rules Validator',
            version: '1.0.0',
            informationUri: 'https://audityzer.com',
          },
        },
        results: [
          ...this._convertToSarifResults(validationResult.errors, 'validation'),
          ...this._convertToSarifResults(misconfigurations.issues, 'misconfiguration'),
        ],
      }],
    };

    fs.writeFileSync(outputPath, JSON.stringify(sarif, null, 2));
    return sarif;
  }

  /**
   * Generate security rules template
   */
  generateTemplate() {
    return this.templateGenerator.generateTemplate();
  }

  /**
   * Generate L2-specific template
   */
  generateL2Template(l2Protocol) {
    return this.templateGenerator.generateL2Template(l2Protocol);
  }

  /**
   * Generate minimal template
   */
  generateMinimalTemplate() {
    return this.templateGenerator.generateMinimalTemplate();
  }

  /**
   * Generate enterprise template
   */
  generateEnterpriseTemplate() {
    return this.templateGenerator.generateEnterpriseTemplate();
  }

  // Private helper methods
  _categorizeBySeverity(issues) {
    const breakdown = { critical: 0, high: 0, medium: 0, low: 0 };
    issues.forEach(issue => {
      if (breakdown[issue.severity] !== undefined) {
        breakdown[issue.severity]++;
      }
    });
    return breakdown;
  }

  _convertToSarifResults(items, type) {
    return items.map(item => ({
      ruleId: `${type}_${item.type || 'generic'}`,
      level: this._mapSeverityToSarifLevel(item.severity),
      message: {
        text: item.message,
      },
      locations: [{
        physicalLocation: {
          artifactLocation: {
            uri: item.path || 'security-rules.json',
          },
        },
      }],
    }));
  }

  _mapSeverityToSarifLevel(severity) {
    const mapping = {
      critical: 'error',
      high: 'error',
      medium: 'warning',
      low: 'note',
    };
    return mapping[severity] || 'note';
  }
}

module.exports = SecurityRulesValidator;
