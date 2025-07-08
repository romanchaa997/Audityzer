
import * as core from '@actions/core';
import * as github from '@actions/github';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

interface ScanResult {
  success: boolean;
  vulnerabilities: Vulnerability[];
  metrics: {
    scanTime: number;
    filesScanned: number;
  };
  artifacts?: {
    sarif?: string;
    report?: string;
  };
}

interface Vulnerability {
  type: string;
  severity: string;
  title: string;
  description: string;
  lineNumber?: number;
  recommendation: string;
  filePath: string;
}

async function run(): Promise<void> {
  try {
    // Get inputs
    const apiKey = core.getInput('api-key', { required: true });
    const repositoryUrl = core.getInput('repository-url') || `${github.context.payload.repository?.html_url}`;
    const scanPath = core.getInput('scan-path') || 'contracts/';
    const failOnSeverity = core.getInput('fail-on-severity') || 'HIGH';
    const outputFormat = core.getInput('output-format') || 'sarif';
    const uploadToGitHubSecurity = core.getInput('upload-to-github-security') === 'true';
    const commentOnPR = core.getInput('comment-on-pr') === 'true';
    const incrementalScan = core.getInput('incremental-scan') === 'true';

    core.info(`🚀 Starting Audityzer security scan for ${repositoryUrl}`);
    core.info(`📁 Scanning path: ${scanPath}`);
    core.info(`🔍 Incremental scan: ${incrementalScan}`);

    // Find Solidity files
    const solidityFiles = await findSolidityFiles(scanPath);
    
    if (solidityFiles.length === 0) {
      core.warning('No Solidity files found in the specified path');
      return;
    }

    core.info(`📄 Found ${solidityFiles.length} Solidity files`);

    // Prepare scan request
    const scanRequest = {
      repositoryUrl,
      triggerType: 'GITHUB_ACTION',
      triggerData: {
        event: github.context.eventName,
        ref: github.context.ref,
        sha: github.context.sha,
        actor: github.context.actor,
        workflow: github.context.workflow,
        job: github.context.job,
        runId: github.context.runId,
        files: incrementalScan ? await getChangedFiles() : solidityFiles
      },
      files: solidityFiles.map(file => ({
        path: file,
        content: fs.readFileSync(file, 'utf8')
      })),
      config: {
        incrementalScan,
        outputFormat
      }
    };

    // Call Audityzer API
    core.info('🔍 Initiating security scan...');
    const scanResult = await performScan(apiKey, scanRequest);

    // Process results
    const vulnerabilities = scanResult.vulnerabilities;
    const criticalCount = vulnerabilities.filter(v => v.severity === 'CRITICAL').length;
    const highCount = vulnerabilities.filter(v => v.severity === 'HIGH').length;
    const mediumCount = vulnerabilities.filter(v => v.severity === 'MEDIUM').length;
    const lowCount = vulnerabilities.filter(v => v.severity === 'LOW').length;

    core.info(`📊 Scan completed in ${scanResult.metrics.scanTime}ms`);
    core.info(`🛡️ Found ${vulnerabilities.length} vulnerabilities:`);
    core.info(`   🔴 Critical: ${criticalCount}`);
    core.info(`   🟠 High: ${highCount}`);
    core.info(`   🟡 Medium: ${mediumCount}`);
    core.info(`   🟢 Low: ${lowCount}`);

    // Set outputs
    core.setOutput('scan-results', JSON.stringify(scanResult));
    core.setOutput('vulnerabilities-found', vulnerabilities.length);
    core.setOutput('critical-count', criticalCount);
    core.setOutput('high-count', highCount);

    // Generate SARIF report
    if (outputFormat === 'sarif' || uploadToGitHubSecurity) {
      const sarifPath = await generateSarifReport(vulnerabilities);
      
      if (uploadToGitHubSecurity) {
        await uploadSarifToGitHub(sarifPath);
      }
    }

    // Comment on PR if enabled
    if (commentOnPR && github.context.eventName === 'pull_request') {
      await commentOnPullRequest(vulnerabilities);
    }

    // Check if build should fail
    const shouldFail = shouldFailBuild(vulnerabilities, failOnSeverity);
    if (shouldFail) {
      core.setFailed(`❌ Build failed due to ${failOnSeverity} or higher severity vulnerabilities found`);
    } else {
      core.info('✅ Security scan completed successfully');
    }

  } catch (error) {
    core.setFailed(`Action failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function findSolidityFiles(scanPath: string): Promise<string[]> {
  const files: string[] = [];
  
  function searchDirectory(dir: string) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        searchDirectory(fullPath);
      } else if (item.endsWith('.sol') || item.endsWith('.vy') || item.endsWith('.cairo')) {
        files.push(fullPath);
      }
    }
  }
  
  searchDirectory(scanPath);
  return files;
}

async function getChangedFiles(): Promise<string[]> {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) return [];

    const octokit = github.getOctokit(token);
    
    if (github.context.eventName === 'pull_request') {
      const { data: files } = await octokit.rest.pulls.listFiles({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        pull_number: github.context.issue.number,
      });
      
      return files
        .filter(file => file.filename.endsWith('.sol') || file.filename.endsWith('.vy'))
        .map(file => file.filename);
    }
    
    return [];
  } catch (error) {
    core.warning(`Could not get changed files: ${error}`);
    return [];
  }
}

async function performScan(apiKey: string, scanRequest: any): Promise<ScanResult> {
  try {
    const response = await axios.post(
      `${process.env.AUDITYZER_API_URL || 'https://api.audityzer.com'}/v1/scan`,
      scanRequest,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'audityzer-github-action/1.0.0'
        },
        timeout: 300000 // 5 minute timeout
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Scan API error: ${error.response?.status} ${error.response?.statusText}`);
    }
    throw error;
  }
}

async function generateSarifReport(vulnerabilities: Vulnerability[]): Promise<string> {
  const sarif = {
    $schema: 'https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json',
    version: '2.1.0',
    runs: [
      {
        tool: {
          driver: {
            name: 'Audityzer',
            version: '1.0.0',
            informationUri: 'https://audityzer.com',
            rules: []
          }
        },
        results: []
      }
    ]
  };

  const addedRuleIds = new Set();

  vulnerabilities.forEach(vuln => {
    const ruleId = `audityzer-${vuln.type.toLowerCase()}`;
    
    // Add rule if not already added
    if (!addedRuleIds.has(ruleId)) {
      sarif.runs[0].tool.driver.rules.push({
        id: ruleId,
        shortDescription: { text: vuln.title },
        fullDescription: { text: vuln.description },
        defaultConfiguration: {
          level: vuln.severity === 'CRITICAL' || vuln.severity === 'HIGH' ? 'error' : 'warning'
        },
        help: {
          text: vuln.recommendation,
          markdown: `## Recommendation\n\n${vuln.recommendation}`
        }
      });
      addedRuleIds.add(ruleId);
    }

    // Add result
    sarif.runs[0].results.push({
      ruleId,
      level: vuln.severity === 'CRITICAL' || vuln.severity === 'HIGH' ? 'error' : 'warning',
      message: { text: vuln.description },
      locations: [
        {
          physicalLocation: {
            artifactLocation: { uri: vuln.filePath },
            region: {
              startLine: vuln.lineNumber || 1,
              startColumn: 1
            }
          }
        }
      ],
      properties: {
        severity: vuln.severity,
        type: vuln.type
      }
    });
  });

  const sarifPath = path.join(process.cwd(), 'audityzer-results.sarif');
  fs.writeFileSync(sarifPath, JSON.stringify(sarif, null, 2));
  
  core.info(`📄 SARIF report generated: ${sarifPath}`);
  return sarifPath;
}

async function uploadSarifToGitHub(sarifPath: string): Promise<void> {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      core.warning('GITHUB_TOKEN not available, skipping SARIF upload');
      return;
    }

    const octokit = github.getOctokit(token);
    const sarifContent = fs.readFileSync(sarifPath, 'utf8');

    await octokit.rest.codeScanning.uploadSarif({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      commit_sha: github.context.sha,
      ref: github.context.ref,
      sarif: Buffer.from(sarifContent).toString('base64'),
      tool_name: 'Audityzer'
    });

    core.info('✅ SARIF report uploaded to GitHub Security tab');
  } catch (error) {
    core.warning(`Failed to upload SARIF: ${error}`);
  }
}

async function commentOnPullRequest(vulnerabilities: Vulnerability[]): Promise<void> {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token || !github.context.issue.number) return;

    const octokit = github.getOctokit(token);
    
    const criticalCount = vulnerabilities.filter(v => v.severity === 'CRITICAL').length;
    const highCount = vulnerabilities.filter(v => v.severity === 'HIGH').length;
    const mediumCount = vulnerabilities.filter(v => v.severity === 'MEDIUM').length;
    const lowCount = vulnerabilities.filter(v => v.severity === 'LOW').length;

    const emoji = criticalCount > 0 ? '🔴' : highCount > 0 ? '🟠' : '✅';
    
    let comment = `## ${emoji} Audityzer Security Scan Results\n\n`;
    comment += `**Summary:**\n`;
    comment += `- 🔴 Critical: ${criticalCount}\n`;
    comment += `- 🟠 High: ${highCount}\n`;
    comment += `- 🟡 Medium: ${mediumCount}\n`;
    comment += `- 🟢 Low: ${lowCount}\n\n`;

    if (vulnerabilities.length > 0) {
      comment += `**Top Issues:**\n`;
      const topIssues = vulnerabilities
        .filter(v => v.severity === 'CRITICAL' || v.severity === 'HIGH')
        .slice(0, 5);
      
      topIssues.forEach(vuln => {
        const severityEmoji = vuln.severity === 'CRITICAL' ? '🔴' : '🟠';
        comment += `- ${severityEmoji} **${vuln.title}** in \`${vuln.filePath}\`\n`;
        comment += `  ${vuln.description}\n\n`;
      });
    }

    comment += `\n*🛡️ Powered by [Audityzer](https://audityzer.com)*`;

    await octokit.rest.issues.createComment({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: github.context.issue.number,
      body: comment
    });

    core.info('✅ PR comment added with scan results');
  } catch (error) {
    core.warning(`Failed to comment on PR: ${error}`);
  }
}

function shouldFailBuild(vulnerabilities: Vulnerability[], failOnSeverity: string): boolean {
  const severityLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
  const threshold = severityLevels.indexOf(failOnSeverity.toUpperCase());
  
  if (threshold === -1) return false;
  
  return vulnerabilities.some(vuln => {
    const vulnLevel = severityLevels.indexOf(vuln.severity.toUpperCase());
    return vulnLevel >= threshold;
  });
}

// Run the action
run().catch(error => {
  core.setFailed(`Action failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
});
