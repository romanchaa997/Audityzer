/**
 * @fileoverview Static analysis integration for smart contracts
 *
 * This module provides integration with popular static analysis tools
 * like Slither and Mythril for smart contract security analysis.
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

class StaticAnalysisIntegration {
  constructor(config = {}) {
    this.config = {
      tools: {
        slither: config.tools?.slither || true,
        mythril: config.tools?.mythril || true,
        solhint: config.tools?.solhint || true,
        echidna: config.tools?.echidna || false,
      },
      solcVersion: config.solcVersion || '0.8.17',
      outputDir: config.outputDir || './test-results/static-analysis',
      ...config,
    };

    this.toolVersions = {
      slither: null,
      mythril: null,
      solhint: null,
      echidna: null,
    };

    this.results = {
      slither: null,
      mythril: null,
      solhint: null,
      echidna: null,
    };
  }

  /**
   * Check if required tools are installed and get their versions
   * @returns {Promise<Object>} Tool availability and versions
   */
  async checkToolAvailability() {
    const toolsAvailability = {
      slither: false,
      mythril: false,
      solhint: false,
      echidna: false,
    };

    try {
      // Check Slither
      if (this.config.tools.slither) {
        try {
          const slitherVersion = await exec('slither --version');
          this.toolVersions.slither = slitherVersion.stdout.trim();
          toolsAvailability.slither = true;
          console.log(`Slither found: ${this.toolVersions.slither}`);
        } catch (error) {
          console.warn('Slither not found or not properly installed');
          console.log('To install Slither: pip3 install slither-analyzer');
        }
      }

      // Check Mythril
      if (this.config.tools.mythril) {
        try {
          const mythrilVersion = await exec('myth version');
          this.toolVersions.mythril = mythrilVersion.stdout.trim();
          toolsAvailability.mythril = true;
          console.log(`Mythril found: ${this.toolVersions.mythril}`);
        } catch (error) {
          console.warn('Mythril not found or not properly installed');
          console.log('To install Mythril: pip3 install mythril');
        }
      }

      // Check Solhint
      if (this.config.tools.solhint) {
        try {
          const solhintVersion = await exec('solhint --version');
          this.toolVersions.solhint = solhintVersion.stdout.trim();
          toolsAvailability.solhint = true;
          console.log(`Solhint found: ${this.toolVersions.solhint}`);
        } catch (error) {
          console.warn('Solhint not found or not properly installed');
          console.log('To install Solhint: npm install -g solhint');
        }
      }

      // Check Echidna
      if (this.config.tools.echidna) {
        try {
          const echidnaVersion = await exec('echidna --version');
          this.toolVersions.echidna = echidnaVersion.stdout.trim();
          toolsAvailability.echidna = true;
          console.log(`Echidna found: ${this.toolVersions.echidna}`);
        } catch (error) {
          console.warn('Echidna not found or not properly installed');
          console.log('To install Echidna: https://github.com/crytic/echidna#installation');
        }
      }

      return {
        available: toolsAvailability,
        versions: this.toolVersions,
      };
    } catch (error) {
      console.error('Error checking tool availability:', error);
      return {
        available: toolsAvailability,
        versions: this.toolVersions,
        error: error.message,
      };
    }
  }

  /**
   * Ensure output directory exists
   * @param {string} specificPath - Specific subdirectory to create
   * @returns {string} Created directory path
   */
  ensureOutputDirectory(specificPath = '') {
    const outputPath = path.join(this.config.outputDir, specificPath);

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    return outputPath;
  }

  /**
   * Run Slither analysis on a contract
   * @param {string} contractPath - Path to the contract or project
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} Analysis results
   */
  async runSlitherAnalysis(contractPath, options = {}) {
    if (!contractPath) {
      throw new Error('Contract path is required for Slither analysis');
    }

    const slitherOptions = {
      json: options.json !== false,
      markdown: options.markdown || false,
      ...options,
    };

    try {
      const availability = await this.checkToolAvailability();
      if (!availability.available.slither) {
        throw new Error('Slither is not available. Please install it first.');
      }

      // Prepare output directory
      const outputDir = this.ensureOutputDirectory('slither');
      const jsonOutputPath = path.join(outputDir, 'slither-results.json');
      const mdOutputPath = slitherOptions.markdown
        ? path.join(outputDir, 'slither-results.md')
        : null;

      // Build command
      let command = `slither ${contractPath}`;
      if (slitherOptions.json) {
        command += ` --json ${jsonOutputPath}`;
      }
      if (slitherOptions.markdown) {
        command += ` --markdown-root ${contractPath} --markdown ${mdOutputPath}`;
      }

      console.log(`Running Slither analysis on: ${contractPath}`);
      console.log(`Command: ${command}`);

      // Execute Slither
      const { stdout, stderr } = await exec(command);

      // Parse results
      const results = {
        success: true,
        tool: 'slither',
        stdout,
        stderr,
        findings: [],
      };

      // Parse JSON output if available
      if (slitherOptions.json && fs.existsSync(jsonOutputPath)) {
        const jsonResults = JSON.parse(fs.readFileSync(jsonOutputPath, 'utf8'));
        results.findings = this.parseSlitherResults(jsonResults);
        results.jsonPath = jsonOutputPath;
      }

      // Add markdown path if available
      if (slitherOptions.markdown && mdOutputPath && fs.existsSync(mdOutputPath)) {
        results.markdownPath = mdOutputPath;
      }

      this.results.slither = results;
      return results;
    } catch (error) {
      console.error('Error running Slither analysis:', error);
      return {
        success: false,
        tool: 'slither',
        error: error.message,
        command: `slither ${contractPath}`,
      };
    }
  }

  /**
   * Parse Slither JSON results into standardized format
   * @param {Object} results - Raw Slither results
   * @returns {Array} Parsed findings
   */
  parseSlitherResults(results) {
    if (!results || !results.results || !results.results.detectors) {
      return [];
    }

    const findings = [];

    results.results.detectors.forEach(detector => {
      detector.elements.forEach(element => {
        findings.push({
          id: detector.check,
          name: detector.check,
          description: element.description || detector.description,
          severity: this.mapSlitherSeverity(detector.impact),
          confidence: detector.confidence,
          category: 'security',
          locations: element.source_mapping.filename_lines.map(fileLine => ({
            file: fileLine[0],
            lines: fileLine[1],
          })),
          code: element.source_mapping.lines ? element.source_mapping.lines.join('\n') : '',
          recommendations: detector.recommendation || [],
        });
      });
    });

    return findings;
  }

  /**
   * Map Slither severity to standardized severity
   * @param {string} severity - Slither severity
   * @returns {string} Standardized severity
   */
  mapSlitherSeverity(severity) {
    const severityMap = {
      high: 'critical',
      medium: 'high',
      low: 'medium',
      informational: 'low',
    };

    return severityMap[severity] || severity;
  }

  /**
   * Run Mythril analysis on a contract
   * @param {string} contractPath - Path to the contract file
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} Analysis results
   */
  async runMythrilAnalysis(contractPath, options = {}) {
    if (!contractPath) {
      throw new Error('Contract path is required for Mythril analysis');
    }

    const mythrilOptions = {
      json: options.json !== false,
      timeout: options.timeout || 120,
      solcVersion: options.solcVersion || this.config.solcVersion,
      ...options,
    };

    try {
      const availability = await this.checkToolAvailability();
      if (!availability.available.mythril) {
        throw new Error('Mythril is not available. Please install it first.');
      }

      // Prepare output directory
      const outputDir = this.ensureOutputDirectory('mythril');
      const jsonOutputPath = path.join(outputDir, 'mythril-results.json');

      // Build command
      let command = `myth analyze ${contractPath} --solv ${mythrilOptions.solcVersion} --max-depth 10 --execution-timeout ${mythrilOptions.timeout}`;
      if (mythrilOptions.json) {
        command += ' -o json';
      }

      console.log(`Running Mythril analysis on: ${contractPath}`);
      console.log(`Command: ${command}`);

      // Execute Mythril and capture output
      const process = spawn('bash', ['-c', command], { stdio: 'pipe' });

      let stdout = '';
      let stderr = '';

      process.stdout.on('data', data => {
        stdout += data.toString();
      });

      process.stderr.on('data', data => {
        stderr += data.toString();
      });

      // Wait for the process to complete
      const exitCode = await new Promise(resolve => {
        process.on('close', resolve);
      });

      // Parse results
      const results = {
        success: exitCode === 0,
        tool: 'mythril',
        stdout,
        stderr,
        findings: [],
      };

      // Parse JSON results from stdout
      if (mythrilOptions.json) {
        try {
          const jsonResults = JSON.parse(stdout);
          fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonResults, null, 2));
          results.findings = this.parseMythrilResults(jsonResults);
          results.jsonPath = jsonOutputPath;
        } catch (error) {
          console.error('Error parsing Mythril JSON results:', error);
          results.jsonParseError = error.message;
        }
      }

      this.results.mythril = results;
      return results;
    } catch (error) {
      console.error('Error running Mythril analysis:', error);
      return {
        success: false,
        tool: 'mythril',
        error: error.message,
        command: `myth analyze ${contractPath}`,
      };
    }
  }

  /**
   * Parse Mythril JSON results into standardized format
   * @param {Array} results - Raw Mythril results
   * @returns {Array} Parsed findings
   */
  parseMythrilResults(results) {
    if (!results || !Array.isArray(results)) {
      return [];
    }

    const findings = [];

    results.forEach(issue => {
      findings.push({
        id: issue.swc_id || issue.title,
        name: issue.title,
        description:
          issue.description.head + (issue.description.tail ? '\n\n' + issue.description.tail : ''),
        severity: this.mapMythrilSeverity(issue.severity),
        confidence: 'high',
        category: 'security',
        locations: issue.locations.map(location => ({
          file: location.sourceMap.source_list[0],
          lines: [
            parseInt(location.sourceMap.start),
            parseInt(location.sourceMap.start + location.sourceMap.length),
          ],
        })),
        code: issue.code ? issue.code : '',
        recommendations: [issue.description.head],
      });
    });

    return findings;
  }

  /**
   * Map Mythril severity to standardized severity
   * @param {string} severity - Mythril severity
   * @returns {string} Standardized severity
   */
  mapMythrilSeverity(severity) {
    const severityMap = {
      High: 'critical',
      Medium: 'high',
      Low: 'medium',
      Informational: 'low',
    };

    return severityMap[severity] || severity;
  }

  /**
   * Run Solhint analysis on a contract
   * @param {string} contractPath - Path to the contract or directory
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} Analysis results
   */
  async runSolhintAnalysis(contractPath, options = {}) {
    if (!contractPath) {
      throw new Error('Contract path is required for Solhint analysis');
    }

    const solhintOptions = {
      json: options.json !== false,
      configFile: options.configFile || '.solhint.json',
      ...options,
    };

    try {
      const availability = await this.checkToolAvailability();
      if (!availability.available.solhint) {
        throw new Error('Solhint is not available. Please install it first.');
      }

      // Prepare output directory
      const outputDir = this.ensureOutputDirectory('solhint');
      const jsonOutputPath = path.join(outputDir, 'solhint-results.json');

      // Build command
      let command = `solhint ${contractPath}`;
      if (fs.existsSync(solhintOptions.configFile)) {
        command += ` -c ${solhintOptions.configFile}`;
      }
      if (solhintOptions.json) {
        command += ' -f json';
      }

      console.log(`Running Solhint analysis on: ${contractPath}`);
      console.log(`Command: ${command}`);

      // Execute Solhint
      const { stdout, stderr } = await exec(command);

      // Parse results
      const results = {
        success: true,
        tool: 'solhint',
        stdout,
        stderr,
        findings: [],
      };

      // Parse JSON results from stdout
      if (solhintOptions.json) {
        try {
          const jsonResults = JSON.parse(stdout);
          fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonResults, null, 2));
          results.findings = this.parseSolhintResults(jsonResults);
          results.jsonPath = jsonOutputPath;
        } catch (error) {
          console.error('Error parsing Solhint JSON results:', error);
          results.jsonParseError = error.message;
        }
      }

      this.results.solhint = results;
      return results;
    } catch (error) {
      console.error('Error running Solhint analysis:', error);
      return {
        success: false,
        tool: 'solhint',
        error: error.message,
        command: `solhint ${contractPath}`,
      };
    }
  }

  /**
   * Parse Solhint JSON results into standardized format
   * @param {Array} results - Raw Solhint results
   * @returns {Array} Parsed findings
   */
  parseSolhintResults(results) {
    if (!results || !Array.isArray(results)) {
      return [];
    }

    const findings = [];

    results.forEach(file => {
      if (!file.reports || !Array.isArray(file.reports)) return;

      file.reports.forEach(issue => {
        findings.push({
          id: issue.ruleId,
          name: issue.ruleId,
          description: issue.message,
          severity: this.mapSolhintSeverity(issue.severity),
          confidence: 'high',
          category: 'linting',
          locations: [
            {
              file: file.filePath,
              lines: [issue.line, issue.line],
            },
          ],
          code: '',
          recommendations: [issue.message],
        });
      });
    });

    return findings;
  }

  /**
   * Map Solhint severity to standardized severity
   * @param {number} severity - Solhint severity (0=off, 1=warning, 2=error, 3=critical)
   * @returns {string} Standardized severity
   */
  mapSolhintSeverity(severity) {
    const severityMap = {
      3: 'critical',
      2: 'high',
      1: 'medium',
      0: 'low',
    };

    return severityMap[severity] || 'medium';
  }

  /**
   * Run Echidna fuzzing on a contract
   * @param {string} contractPath - Path to the contract or project
   * @param {Object} options - Fuzzing options
   * @returns {Promise<Object>} Fuzzing results
   */
  async runEchidnaFuzzing(contractPath, options = {}) {
    if (!contractPath) {
      throw new Error('Contract path is required for Echidna fuzzing');
    }

    const echidnaOptions = {
      configPath: options.configPath || null,
      corpus: options.corpus || null,
      testMode: options.testMode || 'property', // property, assertion, or dapptest
      testLimit: options.testLimit || 50000,
      seqLen: options.seqLen || 100,
      contractAddr: options.contractAddr || null,
      deployer: options.deployer || null,
      format: options.format || 'json', // json, text, or none
      timeout: options.timeout || 300, // 5 minutes by default
      ...options,
    };

    try {
      const availability = await this.checkToolAvailability();
      if (!availability.available.echidna) {
        throw new Error('Echidna is not available. Please install it first.');
      }

      // Prepare output directory
      const outputDir = this.ensureOutputDirectory('echidna');
      const jsonOutputPath = path.join(outputDir, 'echidna-results.json');

      // Build command
      let command = `echidna ${contractPath}`;

      // Add configuration file if specified
      if (echidnaOptions.configPath) {
        command += ` --config ${echidnaOptions.configPath}`;
      } else {
        // Add individual options
        command += ` --test-mode ${echidnaOptions.testMode}`;
        command += ` --test-limit ${echidnaOptions.testLimit}`;
        command += ` --seq-len ${echidnaOptions.seqLen}`;
        command += ` --format ${echidnaOptions.format}`;
        command += ` --timeout ${echidnaOptions.timeout}`;

        if (echidnaOptions.corpus) {
          command += ` --corpus-dir ${echidnaOptions.corpus}`;
        }

        if (echidnaOptions.contractAddr) {
          command += ` --contract-addr ${echidnaOptions.contractAddr}`;
        }

        if (echidnaOptions.deployer) {
          command += ` --deployer ${echidnaOptions.deployer}`;
        }
      }

      // Add output option
      command += ` --output ${jsonOutputPath}`;

      console.log(`Running Echidna fuzzing on: ${contractPath}`);
      console.log(`Command: ${command}`);

      // Execute Echidna
      const { stdout, stderr } = await exec(command);

      // Parse results
      const results = {
        success: true,
        tool: 'echidna',
        stdout,
        stderr,
        findings: [],
      };

      // Parse JSON output if available
      if (fs.existsSync(jsonOutputPath)) {
        const jsonResults = JSON.parse(fs.readFileSync(jsonOutputPath, 'utf8'));
        results.findings = this.parseEchidnaResults(jsonResults);
        results.jsonPath = jsonOutputPath;
      }

      this.results.echidna = results;
      return results;
    } catch (error) {
      console.error('Error running Echidna fuzzing:', error);
      return {
        success: false,
        tool: 'echidna',
        error: error.message,
        command,
      };
    }
  }

  /**
   * Parse Echidna JSON results into standardized format
   * @param {Object} results - Raw Echidna results
   * @returns {Array} Parsed findings
   */
  parseEchidnaResults(results) {
    if (!results || !results.corpus || !results.testResults) {
      return [];
    }

    const findings = [];

    // Process failed tests
    Object.entries(results.testResults).forEach(([testName, result]) => {
      if (!result.success) {
        // Get the call sequence that triggered the failure
        const callSequence = result.callSequence ? result.callSequence : [];

        findings.push({
          id: `echidna-failed-test-${testName}`,
          name: `Failed Fuzzing Test: ${testName}`,
          description: `Echidna property test "${testName}" was violated.`,
          severity: 'high',
          confidence: 'high',
          category: 'fuzzing',
          callSequence,
          testName,
          gas: result.gas || null,
        });
      }
    });

    return findings;
  }

  /**
   * Merge results from all tools
   * @returns {Object} Merged results
   */
  mergeResults() {
    const allFindings = [];
    let totalIssues = 0;
    const issueCounts = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      informational: 0,
    };

    // Process Slither results
    if (this.results.slither && this.results.slither.success) {
      this.results.slither.findings.forEach(finding => {
        allFindings.push({
          ...finding,
          tool: 'slither',
        });
        totalIssues++;
        issueCounts[finding.severity] = (issueCounts[finding.severity] || 0) + 1;
      });
    }

    // Process Mythril results
    if (this.results.mythril && this.results.mythril.success) {
      this.results.mythril.findings.forEach(finding => {
        allFindings.push({
          ...finding,
          tool: 'mythril',
        });
        totalIssues++;
        issueCounts[finding.severity] = (issueCounts[finding.severity] || 0) + 1;
      });
    }

    // Process Solhint results
    if (this.results.solhint && this.results.solhint.success) {
      this.results.solhint.findings.forEach(finding => {
        allFindings.push({
          ...finding,
          tool: 'solhint',
        });
        totalIssues++;
        issueCounts[finding.severity] = (issueCounts[finding.severity] || 0) + 1;
      });
    }

    // Process Echidna results
    if (this.results.echidna && this.results.echidna.success) {
      this.results.echidna.findings.forEach(finding => {
        allFindings.push({
          ...finding,
          tool: 'echidna',
        });
        totalIssues++;
        issueCounts[finding.severity] = (issueCounts[finding.severity] || 0) + 1;
      });
    }

    return {
      summary: {
        totalIssues,
        issueCounts,
      },
      findings: allFindings,
    };
  }

  /**
   * Generate a combined static analysis report
   * @param {string} outputPath - Path to write the report
   * @returns {Object} Generated report
   */
  generateReport(outputPath = './test-results/static-analysis/report.json') {
    try {
      const mergedResults = this.mergeResults();

      // Create report structure
      const report = {
        timestamp: new Date().toISOString(),
        summary: mergedResults.summary,
        findings: mergedResults.findings,
        tools: {
          slither: this.results.slither
            ? {
                available: !!this.toolVersions.slither,
                version: this.toolVersions.slither,
                issueCount: this.results.slither.findings
                  ? this.results.slither.findings.length
                  : 0,
              }
            : null,
          mythril: this.results.mythril
            ? {
                available: !!this.toolVersions.mythril,
                version: this.toolVersions.mythril,
                issueCount: this.results.mythril.findings
                  ? this.results.mythril.findings.length
                  : 0,
              }
            : null,
          solhint: this.results.solhint
            ? {
                available: !!this.toolVersions.solhint,
                version: this.toolVersions.solhint,
                issueCount: this.results.solhint.findings
                  ? this.results.solhint.findings.length
                  : 0,
              }
            : null,
          echidna: this.results.echidna
            ? {
                available: !!this.toolVersions.echidna,
                version: this.toolVersions.echidna,
                issueCount: this.results.echidna.findings
                  ? this.results.echidna.findings.length
                  : 0,
              }
            : null,
        },
      };

      // Ensure output directory exists
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write report to file
      fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
      console.log(`Static analysis report generated at: ${outputPath}`);

      return report;
    } catch (error) {
      console.error('Error generating static analysis report:', error);
      return {
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Generate a markdown report from the results
   * @param {string} outputPath - Path to write the markdown report
   * @returns {boolean} Success status
   */
  generateMarkdownReport(outputPath = './test-results/static-analysis/report.md') {
    try {
      const mergedResults = this.mergeResults();

      // Create markdown content
      let markdown = '# Smart Contract Static Analysis Report\n\n';
      markdown += `Generated on: ${new Date().toLocaleString()}\n\n`;

      // Add summary
      markdown += '## Summary\n\n';
      markdown += '| Severity | Count |\n';
      markdown += '|----------|-------|\n';
      markdown += `| Critical | ${mergedResults.summary.issueCounts.critical || 0} |\n`;
      markdown += `| High     | ${mergedResults.summary.issueCounts.high || 0} |\n`;
      markdown += `| Medium   | ${mergedResults.summary.issueCounts.medium || 0} |\n`;
      markdown += `| Low      | ${mergedResults.summary.issueCounts.low || 0} |\n`;
      markdown += `| Info     | ${mergedResults.summary.issueCounts.informational || 0} |\n`;
      markdown += `| **Total**   | **${mergedResults.summary.totalIssues}** |\n\n`;

      // Add tools information
      markdown += '## Tools Used\n\n';
      markdown += '| Tool | Version | Issues Found |\n';
      markdown += '|------|---------|-------------|\n';

      if (mergedResults.tools.slither && mergedResults.tools.slither.available) {
        markdown += `| Slither | ${mergedResults.tools.slither.version || 'N/A'} | ${mergedResults.tools.slither.issueCount} |\n`;
      }

      if (mergedResults.tools.mythril && mergedResults.tools.mythril.available) {
        markdown += `| Mythril | ${mergedResults.tools.mythril.version || 'N/A'} | ${mergedResults.tools.mythril.issueCount} |\n`;
      }

      if (mergedResults.tools.solhint && mergedResults.tools.solhint.available) {
        markdown += `| Solhint | ${mergedResults.tools.solhint.version || 'N/A'} | ${mergedResults.tools.solhint.issueCount} |\n`;
      }

      if (mergedResults.tools.echidna && mergedResults.tools.echidna.available) {
        markdown += `| Echidna | ${mergedResults.tools.echidna.version || 'N/A'} | ${mergedResults.tools.echidna.issueCount} |\n`;
      }

      markdown += '\n';

      // Add findings
      markdown += '## Findings\n\n';

      // Group findings by severity
      const findingsBySeverity = {
        critical: [],
        high: [],
        medium: [],
        low: [],
        info: [],
      };

      mergedResults.findings.forEach(finding => {
        findingsBySeverity[finding.severity] = findingsBySeverity[finding.severity] || [];
        findingsBySeverity[finding.severity].push(finding);
      });

      // Add findings by severity
      ['critical', 'high', 'medium', 'low', 'info'].forEach(severity => {
        if (findingsBySeverity[severity] && findingsBySeverity[severity].length > 0) {
          markdown += `### ${severity.charAt(0).toUpperCase() + severity.slice(1)} Severity Issues\n\n`;

          findingsBySeverity[severity].forEach((finding, index) => {
            markdown += `#### ${index + 1}. ${finding.name}\n\n`;
            markdown += `**Tool:** ${finding.tool}\n\n`;
            markdown += `**Description:** ${finding.description}\n\n`;

            if (finding.locations && finding.locations.length > 0) {
              markdown += '**Locations:**\n\n';
              finding.locations.forEach(location => {
                markdown += `- ${location.file}:${location.lines.join('-')}\n`;
              });
              markdown += '\n';
            }

            if (finding.recommendations && finding.recommendations.length > 0) {
              markdown += '**Recommendations:**\n\n';
              finding.recommendations.forEach(recommendation => {
                markdown += `- ${recommendation}\n`;
              });
              markdown += '\n';
            }

            markdown += '---\n\n';
          });
        }
      });

      // Ensure output directory exists
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write markdown to file
      fs.writeFileSync(outputPath, markdown);
      console.log(`Markdown report generated at: ${outputPath}`);

      return true;
    } catch (error) {
      console.error('Error generating markdown report:', error);
      return false;
    }
  }

  /**
   * Merge static analysis results with dynamic test results
   * @param {Object} staticResults - Static analysis results
   * @param {Object} dynamicResults - Dynamic test results
   * @returns {Object} Combined results
   */
  mergeWithDynamicResults(dynamicResults) {
    try {
      const staticResults = this.mergeResults();

      // Create combined results
      const combinedResults = {
        timestamp: new Date().toISOString(),
        summary: {
          static: staticResults.summary,
          dynamic: {
            totalIssues: dynamicResults.securityIssues ? dynamicResults.securityIssues.length : 0,
            passed: dynamicResults.summary ? dynamicResults.summary.passed : 0,
            failed: dynamicResults.summary ? dynamicResults.summary.failed : 0,
            skipped: dynamicResults.summary ? dynamicResults.summary.skipped : 0,
          },
          combined: {
            totalIssues:
              staticResults.summary.totalIssues +
              (dynamicResults.securityIssues ? dynamicResults.securityIssues.length : 0),
          },
        },
        findings: {
          static: staticResults.findings,
          dynamic: dynamicResults.securityIssues || [],
        },
      };

      return combinedResults;
    } catch (error) {
      console.error('Error merging static and dynamic results:', error);
      return {
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}

module.exports = StaticAnalysisIntegration;
