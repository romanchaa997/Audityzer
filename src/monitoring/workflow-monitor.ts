
import { logger } from '../utils/logger';

export interface WorkflowRun {
  id: string;
  name: string;
  status: 'success' | 'failure' | 'in_progress' | 'cancelled';
  conclusion: string;
  created_at: string;
  updated_at: string;
  html_url: string;
}

export interface WorkflowMetrics {
  totalRuns: number;
  successRate: number;
  failureRate: number;
  averageRunTime: number;
  recentRuns: WorkflowRun[];
}

export class WorkflowMonitor {
  private static instance: WorkflowMonitor;
  private metrics: Map<string, WorkflowMetrics> = new Map();

  static getInstance(): WorkflowMonitor {
    if (!WorkflowMonitor.instance) {
      WorkflowMonitor.instance = new WorkflowMonitor();
    }
    return WorkflowMonitor.instance;
  }

  async fetchWorkflowRuns(owner: string, repo: string): Promise<WorkflowRun[]> {
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/runs?per_page=100`);
      const data = await response.json();
      
      return data.workflow_runs.map((run: any) => ({
        id: run.id.toString(),
        name: run.name,
        status: run.status,
        conclusion: run.conclusion,
        created_at: run.created_at,
        updated_at: run.updated_at,
        html_url: run.html_url
      }));
    } catch (error) {
      logger.error('Failed to fetch workflow runs:', error);
      return [];
    }
  }

  calculateMetrics(runs: WorkflowRun[]): WorkflowMetrics {
    const totalRuns = runs.length;
    const successfulRuns = runs.filter(run => run.conclusion === 'success').length;
    const failedRuns = runs.filter(run => run.conclusion === 'failure').length;
    
    const successRate = totalRuns > 0 ? (successfulRuns / totalRuns) * 100 : 0;
    const failureRate = totalRuns > 0 ? (failedRuns / totalRuns) * 100 : 0;

    return {
      totalRuns,
      successRate,
      failureRate,
      averageRunTime: 0, // Would need additional API calls to calculate
      recentRuns: runs.slice(0, 10)
    };
  }

  async updateMetrics(owner: string, repo: string): Promise<void> {
    logger.info('Updating workflow metrics...');
    
    const runs = await this.fetchWorkflowRuns(owner, repo);
    const workflowGroups = new Map<string, WorkflowRun[]>();
    
    // Group runs by workflow name
    runs.forEach(run => {
      if (!workflowGroups.has(run.name)) {
        workflowGroups.set(run.name, []);
      }
      workflowGroups.get(run.name)!.push(run);
    });

    // Calculate metrics for each workflow
    workflowGroups.forEach((workflowRuns, workflowName) => {
      const metrics = this.calculateMetrics(workflowRuns);
      this.metrics.set(workflowName, metrics);
      
      logger.info(`${workflowName}: ${metrics.successRate.toFixed(1)}% success rate`);
    });
  }

  getMetrics(workflowName?: string): WorkflowMetrics | Map<string, WorkflowMetrics> {
    if (workflowName) {
      return this.metrics.get(workflowName) || {
        totalRuns: 0,
        successRate: 0,
        failureRate: 0,
        averageRunTime: 0,
        recentRuns: []
      };
    }
    return this.metrics;
  }

  generateReport(): string {
    let report = '# Workflow Health Report\n\n';
    report += `Generated: ${new Date().toISOString()}\n\n`;
    
    this.metrics.forEach((metrics, workflowName) => {
      report += `## ${workflowName}\n`;
      report += `- Total Runs: ${metrics.totalRuns}\n`;
      report += `- Success Rate: ${metrics.successRate.toFixed(1)}%\n`;
      report += `- Failure Rate: ${metrics.failureRate.toFixed(1)}%\n`;
      report += `- Status: ${metrics.successRate >= 80 ? '✅ Healthy' : metrics.successRate >= 50 ? '⚠️ Warning' : '❌ Critical'}\n\n`;
    });
    
    return report;
  }
}

export const workflowMonitor = WorkflowMonitor.getInstance();
