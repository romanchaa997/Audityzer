
export const mockAuditConfig = {
  target: 'https://example.com',
  rules: ['security', 'performance', 'accessibility'],
  output: './test-output',
  format: 'json' as const,
  timeout: 30000,
  retries: 3
};

export const mockAuditResult = {
  id: 'audit-123',
  status: 'completed' as const,
  score: 85,
  timestamp: '2025-06-02T00:00:00.000Z',
  target: 'https://example.com',
  issues: [
    {
      id: 'issue-1',
      severity: 'medium' as const,
      category: 'security',
      title: 'Missing HTTPS redirect',
      description: 'The application should redirect HTTP traffic to HTTPS',
      recommendation: 'Implement HTTPS redirect in server configuration'
    },
    {
      id: 'issue-2',
      severity: 'low' as const,
      category: 'performance',
      title: 'Large bundle size',
      description: 'JavaScript bundle is larger than recommended',
      recommendation: 'Consider code splitting and lazy loading'
    }
  ],
  metrics: {
    performance: 78,
    security: 92,
    accessibility: 85,
    bestPractices: 88
  },
  duration: 15000
};

export const mockSecurityRules = [
  {
    id: 'https-redirect',
    name: 'HTTPS Redirect',
    description: 'Ensures all HTTP traffic is redirected to HTTPS',
    severity: 'high' as const,
    category: 'security'
  },
  {
    id: 'csp-header',
    name: 'Content Security Policy',
    description: 'Checks for proper CSP headers',
    severity: 'high' as const,
    category: 'security'
  },
  {
    id: 'xss-protection',
    name: 'XSS Protection',
    description: 'Validates XSS protection mechanisms',
    severity: 'medium' as const,
    category: 'security'
  }
];

export const mockPerformanceMetrics = {
  firstContentfulPaint: 1200,
  largestContentfulPaint: 2500,
  firstInputDelay: 100,
  cumulativeLayoutShift: 0.1,
  totalBlockingTime: 300
};
