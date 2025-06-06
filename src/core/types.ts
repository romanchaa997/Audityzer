
export interface AuditConfig {
  target: string;
  rules: string[];
  output: string;
  format: 'json' | 'html' | 'xml';
  timeout?: number;
  retries?: number;
}

export interface AuditResult {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  score: number;
  timestamp: string;
  target: string;
  issues: AuditIssue[];
  metrics: AuditMetrics;
  duration: number;
}

export interface AuditIssue {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  title: string;
  description: string;
  recommendation: string;
}

export interface AuditMetrics {
  performance: number;
  security: number;
  accessibility: number;
  bestPractices: number;
}

export interface SecurityRule {
  id: string;
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
}

export interface PerformanceMetrics {
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  totalBlockingTime: number;
}
