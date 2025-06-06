
const promClient = require('prom-client');

// Create a Registry to register the metrics
const register = new promClient.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'audityzer'
});

// Enable the collection of default metrics
promClient.collectDefaultMetrics({ register });

// Create custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

const activeConnections = new promClient.Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

const databaseQueries = new promClient.Counter({
  name: 'database_queries_total',
  help: 'Total number of database queries',
  labelNames: ['operation', 'table']
});

const auditScansTotal = new promClient.Counter({
  name: 'audit_scans_total',
  help: 'Total number of audit scans performed',
  labelNames: ['scan_type', 'status']
});

const auditScanDuration = new promClient.Histogram({
  name: 'audit_scan_duration_seconds',
  help: 'Duration of audit scans in seconds',
  labelNames: ['scan_type'],
  buckets: [1, 5, 10, 30, 60, 120, 300]
});

const vulnerabilitiesFound = new promClient.Counter({
  name: 'vulnerabilities_found_total',
  help: 'Total number of vulnerabilities found',
  labelNames: ['severity', 'category']
});

// Register custom metrics
register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestsTotal);
register.registerMetric(activeConnections);
register.registerMetric(databaseQueries);
register.registerMetric(auditScansTotal);
register.registerMetric(auditScanDuration);
register.registerMetric(vulnerabilitiesFound);

// Middleware to collect HTTP metrics
const metricsMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;
    
    httpRequestDuration
      .labels(req.method, route, res.statusCode)
      .observe(duration);
    
    httpRequestsTotal
      .labels(req.method, route, res.statusCode)
      .inc();
  });
  
  next();
};

// Function to track database queries
const trackDatabaseQuery = (operation, table) => {
  databaseQueries.labels(operation, table).inc();
};

// Function to track audit scans
const trackAuditScan = (scanType, status, duration) => {
  auditScansTotal.labels(scanType, status).inc();
  if (duration) {
    auditScanDuration.labels(scanType).observe(duration);
  }
};

// Function to track vulnerabilities
const trackVulnerability = (severity, category) => {
  vulnerabilitiesFound.labels(severity, category).inc();
};

// Function to update active connections
const updateActiveConnections = (count) => {
  activeConnections.set(count);
};

module.exports = {
  register,
  metricsMiddleware,
  trackDatabaseQuery,
  trackAuditScan,
  trackVulnerability,
  updateActiveConnections
};
