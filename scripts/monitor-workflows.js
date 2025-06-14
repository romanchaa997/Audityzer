#!/usr/bin/env node

/**
 * GitHub Actions Workflow Health Monitor
 * Monitors workflow status and provides health reports
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'romanchaa997';
const REPO_NAME = 'Audityzer';

class WorkflowMonitor {
  constructor() {
    this.token = process.env.GITHUB_TOKEN;
    this.headers = {
      'User-Agent': 'Audityzer-Workflow-Monitor',
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (this.token) {
      this.headers['Authorization'] = `token ${this.token}`;
    }
  }

  async makeRequest(endpoint) {
    return new Promise((resolve, reject) => {
      const url = `${GITHUB_API_BASE}${endpoint}`;
      
      https.get(url, { headers: this.headers }, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (error) {
            reject(new Error(`Failed to parse JSON: ${error.message}`));
          }
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
  }

  async getWorkflowRuns(limit = 50) {
    try {
      const endpoint = `/repos/${REPO_OWNER}/${REPO_NAME}/actions/runs?per_page=${limit}`;
      const response = await this.makeRequest(endpoint);
      return response.workflow_runs || [];
    } catch (error) {
      console.error('Error fetching workflow runs:', error.message);
      return [];
    }
  }

  async getWorkflows() {
    try {
      const endpoint = `/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows`;
      const response = await this.makeRequest(endpoint);
      return response.workflows || [];
    } catch (error) {
      console.error('Error fetching workflows:', error.message);
      return [];
    }
  }

  analyzeWorkflowHealth(runs) {
    const stats = {
      total: runs.length,
      success: 0,
      failure: 0,
      cancelled: 0,
      in_progress: 0,
      skipped: 0,
      workflows: {},
      recent_failures: []
    };

    runs.forEach(run => {
      // Count by status
      switch (run.conclusion || run.status) {
        case 'success':
          stats.success++;
          break;
        case 'failure':
          stats.failure++;
          if (new Date(run.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)) {
            stats.recent_failures.push({
              name: run.name,
              url: run.html_url,
              created_at: run.created_at,
              head_commit: run.head_commit?.message?.substring(0, 50) + '...'
            });
          }
          break;
        case 'cancelled':
          stats.cancelled++;
          break;
        case 'in_progress':
        case 'queued':
          stats.in_progress++;
          break;
        case 'skipped':
          stats.skipped++;
          break;
      }

      // Count by workflow
      const workflowName = run.name;
      if (!stats.workflows[workflowName]) {
        stats.workflows[workflowName] = {
          total: 0,
          success: 0,
          failure: 0,
          success_rate: 0
        };
      }
      
      stats.workflows[workflowName].total++;
      if (run.conclusion === 'success') {
        stats.workflows[workflowName].success++;
      } else if (run.conclusion === 'failure') {
        stats.workflows[workflowName].failure++;
      }
      
      stats.workflows[workflowName].success_rate = 
        (stats.workflows[workflowName].success / stats.workflows[workflowName].total * 100).toFixed(1);
    });

    return stats;
  }

  generateReport(stats) {
    const successRate = (stats.success / stats.total * 100).toFixed(1);
    
    let report = `# Audityzer Workflow Health Report\n\n`;
    report += `Generated: ${new Date().toISOString()}\n\n`;
    
    report += `## Overall Statistics\n`;
    report += `- **Total Runs**: ${stats.total}\n`;
    report += `- **Success Rate**: ${successRate}%\n`;
    report += `- **Successful**: ${stats.success}\n`;
    report += `- **Failed**: ${stats.failure}\n`;
    report += `- **Cancelled**: ${stats.cancelled}\n`;
    report += `- **In Progress**: ${stats.in_progress}\n`;
    report += `- **Skipped**: ${stats.skipped}\n\n`;

    if (stats.recent_failures.length > 0) {
      report += `## Recent Failures (Last 24h)\n`;
      stats.recent_failures.forEach(failure => {
        report += `- **${failure.name}**: [View Run](${failure.url})\n`;
        report += `  - Commit: ${failure.head_commit}\n`;
        report += `  - Time: ${new Date(failure.created_at).toLocaleString()}\n\n`;
      });
    }

    report += `## Workflow Performance\n`;
    Object.entries(stats.workflows)
      .sort((a, b) => parseFloat(b[1].success_rate) - parseFloat(a[1].success_rate))
      .forEach(([name, data]) => {
        const status = data.success_rate >= 80 ? '✅' : data.success_rate >= 50 ? '⚠️' : '❌';
        report += `- ${status} **${name}**: ${data.success_rate}% (${data.success}/${data.total})\n`;
      });

    return report;
  }

  async generateHealthReport() {
    console.log('🔍 Fetching workflow data...');
    
    const runs = await this.getWorkflowRuns(100);
    if (runs.length === 0) {
      console.log('❌ No workflow runs found');
      return;
    }

    console.log(`📊 Analyzing ${runs.length} workflow runs...`);
    const stats = this.analyzeWorkflowHealth(runs);
    
    const report = this.generateReport(stats);
    
    // Save report
    const reportsDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    const reportPath = path.join(reportsDir, 'workflow-health.md');
    fs.writeFileSync(reportPath, report);
    
    console.log(`✅ Health report generated: ${reportPath}`);
    console.log(`📈 Overall success rate: ${(stats.success / stats.total * 100).toFixed(1)}%`);
    
    if (stats.recent_failures.length > 0) {
      console.log(`⚠️  ${stats.recent_failures.length} recent failures detected`);
    }

    return stats;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const monitor = new WorkflowMonitor();
  
  monitor.generateHealthReport()
    .then(stats => {
      if (stats && stats.recent_failures.length > 0) {
        process.exit(1); // Exit with error if there are recent failures
      }
    })
    .catch(error => {
      console.error('❌ Error:', error.message);
      process.exit(1);
    });
}

export default WorkflowMonitor;
