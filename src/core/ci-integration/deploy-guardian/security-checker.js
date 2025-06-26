
/**
 * Security Checker for Smart Contract Deployments
 */

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class SecurityChecker {
  constructor(config) {
    this.config = config;
    this.tools = this._initializeSecurityTools();
  }

  _initializeSecurityTools() {
    const tools = {};

    // Check for Mythril
    try {
      const mythrilResult = spawnSync('myth', ['--version'], { encoding: 'utf8' });
      tools.mythril = mythrilResult.status === 0;
    } catch (error) {
      tools.mythril = false;
    }

    // Check for Slither
    try {
      const slitherResult = spawnSync('slither', ['--version'], { encoding: 'utf8' });
      tools.slither = slitherResult.status === 0;
    } catch (error) {
      tools.slither = false;
    }

    // Check for Solhint
    try {
      const solhintResult = spawnSync('solhint', ['--version'], { encoding: 'utf8' });
      tools.solhint = solhintResult.status === 0;
    } catch (error) {
      tools.solhint = false;
    }

    return tools;
  }

  async runSecurityChecks(contractPath) {
    const results = {
      timestamp: new Date().toISOString(),
      contractPath,
      tools: {},
      summary: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        info: 0,
      },
    };

    // Run Mythril analysis
    if (this.tools.mythril) {
      results.tools.mythril = await this._runMythril(contractPath);
      this._updateSummary(results.summary, results.tools.mythril);
    }

    // Run Slither analysis
    if (this.tools.slither) {
      results.tools.slither = await this._runSlither(contractPath);
      this._updateSummary(results.summary, results.tools.slither);
    }

    // Run Solhint analysis
    if (this.tools.solhint) {
      results.tools.solhint = await this._runSolhint(contractPath);
      this._updateSummary(results.summary, results.tools.solhint);
    }

    // Custom security checks
    results.tools.custom = await this._runCustomChecks(contractPath);
    this._updateSummary(results.summary, results.tools.custom);

    return results;
  }

  async _runMythril(contractPath) {
    try {
      const result = spawnSync('myth', ['analyze', contractPath, '--execution-timeout', '300'], {
        encoding: 'utf8',
        timeout: 300000,
      });

      return {
        success: result.status === 0,
        output: result.stdout,
        errors: result.stderr,
        issues: this._parseMythrilOutput(result.stdout),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        issues: [],
      };
    }
  }

  async _runSlither(contractPath) {
    try {
      const result = spawnSync('slither', [contractPath, '--json', '-'], {
        encoding: 'utf8',
        timeout: 300000,
      });

      return {
        success: result.status === 0,
        output: result.stdout,
        errors: result.stderr,
        issues: this._parseSlitherOutput(result.stdout),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        issues: [],
      };
    }
  }

  async _runSolhint(contractPath) {
    try {
      const result = spawnSync('solhint', [contractPath, '--formatter', 'json'], {
        encoding: 'utf8',
        timeout: 60000,
      });

      return {
        success: true,
        output: result.stdout,
        errors: result.stderr,
        issues: this._parseSolhintOutput(result.stdout),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        issues: [],
      };
    }
  }

  async _runCustomChecks(contractPath) {
    const issues = [];
    const contractContent = fs.readFileSync(contractPath, 'utf8');

    // Check for common vulnerabilities
    const vulnerabilityPatterns = [
      {
        pattern: /tx\.origin/g,
        severity: 'high',
        message: 'Use of tx.origin detected - potential phishing vulnerability',
      },
      {
        pattern: /block\.timestamp/g,
        severity: 'medium',
        message: 'Use of block.timestamp detected - potential manipulation vulnerability',
      },
      {
        pattern: /selfdestruct/g,
        severity: 'high',
        message: 'Use of selfdestruct detected - ensure proper access controls',
      },
      {
        pattern: /delegatecall/g,
        severity: 'high',
        message: 'Use of delegatecall detected - ensure input validation',
      },
    ];

    vulnerabilityPatterns.forEach(({ pattern, severity, message }) => {
      const matches = contractContent.match(pattern);
      if (matches) {
        issues.push({
          severity,
          message,
          count: matches.length,
          type: 'custom',
        });
      }
    });

    return {
      success: true,
      issues,
    };
  }

  _parseMythrilOutput(output) {
    // Parse Mythril output format
    const issues = [];
    // Implementation would parse the actual Mythril output
    return issues;
  }

  _parseSlitherOutput(output) {
    // Parse Slither JSON output
    const issues = [];
    try {
      const data = JSON.parse(output);
      // Implementation would parse the actual Slither output
    } catch (error) {
      // Handle parsing errors
    }
    return issues;
  }

  _parseSolhintOutput(output) {
    // Parse Solhint JSON output
    const issues = [];
    try {
      const data = JSON.parse(output);
      // Implementation would parse the actual Solhint output
    } catch (error) {
      // Handle parsing errors
    }
    return issues;
  }

  _updateSummary(summary, toolResult) {
    if (toolResult.issues) {
      toolResult.issues.forEach(issue => {
        const severity = issue.severity.toLowerCase();
        if (summary[severity] !== undefined) {
          summary[severity]++;
        }
      });
    }
  }

  validateSecurityThresholds(results) {
    const thresholds = this.config.get('securityThresholds');
    const summary = results.summary;

    return {
      passed: summary.critical <= thresholds.critical &&
              summary.high <= thresholds.high &&
              summary.medium <= thresholds.medium &&
              summary.low <= thresholds.low,
      violations: this._getThresholdViolations(summary, thresholds),
    };
  }

  _getThresholdViolations(summary, thresholds) {
    const violations = [];
    Object.keys(thresholds).forEach(severity => {
      if (summary[severity] > thresholds[severity]) {
        violations.push({
          severity,
          count: summary[severity],
          threshold: thresholds[severity],
        });
      }
    });
    return violations;
  }
}

module.exports = { SecurityChecker };
