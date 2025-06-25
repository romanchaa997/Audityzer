
import { prisma } from '@/lib/db'
import { SecurityManager } from '@/lib/security'
import WebSocketManager from '@/lib/websocket'

export interface PlatformHealthStatus {
  platform: string
  status: 'healthy' | 'warning' | 'error' | 'unknown'
  responseTime?: number
  uptime?: number
  lastCheck: Date
  details?: any
}

export interface SystemMetrics {
  platform: string
  cpu: number
  memory: number
  diskUsage: number
  activeUsers: number
  requestsPerMinute: number
  errorRate: number
  timestamp: Date
}

export class SystemIntegrationManager {
  private static instance: SystemIntegrationManager
  private healthCheckInterval: NodeJS.Timeout | null = null
  private metricsCollectionInterval: NodeJS.Timeout | null = null

  static getInstance(): SystemIntegrationManager {
    if (!SystemIntegrationManager.instance) {
      SystemIntegrationManager.instance = new SystemIntegrationManager()
    }
    return SystemIntegrationManager.instance
  }

  async initialize() {
    console.log('Initializing System Integration Manager...')
    
    // Start health check monitoring
    this.startHealthCheckMonitoring()
    
    // Start metrics collection
    this.startMetricsCollection()

    // Setup initial integrations
    await this.setupInitialIntegrations()
  }

  private async setupInitialIntegrations() {
    const integrations = [
      {
        platformName: 'audityzer-analytics',
        displayName: 'Analytics Dashboard',
        baseUrl: 'http://localhost:3001',
        healthEndpoint: 'http://localhost:3001/api/health',
        config: {
          type: 'analytics',
          features: ['dashboards', 'reports', 'ai-insights']
        }
      },
      {
        platformName: 'audityzer-tenant',
        displayName: 'Multi-tenant Management',
        baseUrl: 'http://localhost:3002',
        healthEndpoint: 'http://localhost:3002/api/health',
        config: {
          type: 'tenant-management',
          features: ['tenant-management', 'billing', 'resources']
        }
      },
      {
        platformName: 'audityzer-api-docs',
        displayName: 'API Documentation',
        baseUrl: 'http://localhost:3003',
        healthEndpoint: 'http://localhost:3003/api/health',
        config: {
          type: 'documentation',
          features: ['api-docs', 'developer-tools', 'sdk']
        }
      }
    ]

    for (const integration of integrations) {
      await this.upsertIntegration(integration)
    }
  }

  private async upsertIntegration(integration: any) {
    try {
      await prisma.systemIntegration.upsert({
        where: { platformName: integration.platformName },
        update: {
          displayName: integration.displayName,
          baseUrl: integration.baseUrl,
          healthEndpoint: integration.healthEndpoint,
          config: integration.config,
          updatedAt: new Date()
        },
        create: integration
      })
      console.log(`Integration setup completed for ${integration.displayName}`)
    } catch (error) {
      console.error(`Failed to setup integration for ${integration.displayName}:`, error)
    }
  }

  private startHealthCheckMonitoring() {
    // Run health checks every 2 minutes
    this.healthCheckInterval = setInterval(async () => {
      await this.performAllHealthChecks()
    }, 2 * 60 * 1000)

    // Run initial health check
    setTimeout(() => this.performAllHealthChecks(), 5000)
  }

  private startMetricsCollection() {
    // Collect metrics every 30 seconds
    this.metricsCollectionInterval = setInterval(async () => {
      await this.collectAllMetrics()
    }, 30 * 1000)
  }

  async performAllHealthChecks() {
    const integrations = await prisma.systemIntegration.findMany({
      where: {
        status: { not: 'DISCONNECTED' }
      }
    })

    const healthResults: PlatformHealthStatus[] = []

    for (const integration of integrations) {
      const health = await this.performHealthCheck(integration)
      healthResults.push(health)

      // Update integration status
      await prisma.systemIntegration.update({
        where: { id: integration.id },
        data: {
          status: this.mapHealthToStatus(health.status) as any,
          lastSync: new Date()
        }
      })
    }

    // Emit real-time health updates
    const wsManager = WebSocketManager.getInstance()
    wsManager.emitToChannel('system:health', 'health-update', healthResults)

    // Check for critical issues
    const criticalIssues = healthResults.filter(h => h.status === 'error')
    if (criticalIssues.length > 0) {
      await this.handleCriticalHealthIssues(criticalIssues)
    }
  }

  private async performHealthCheck(integration: any): Promise<PlatformHealthStatus> {
    if (!integration.healthEndpoint) {
      return {
        platform: integration.platformName,
        status: 'unknown',
        lastCheck: new Date(),
        details: { message: 'No health endpoint configured' }
      }
    }

    try {
      const startTime = Date.now()
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch(integration.healthEndpoint, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Audityzer-Master-Portal/1.0',
          ...(integration.apiKey && { 'Authorization': `Bearer ${integration.apiKey}` })
        }
      })

      clearTimeout(timeout)
      const responseTime = Date.now() - startTime

      let status: 'healthy' | 'warning' | 'error' = 'healthy'
      let details: any = {}

      if (response.ok) {
        try {
          const healthData = await response.json()
          details = healthData
          
          // Determine status based on response data
          if (healthData.status === 'error' || healthData.errors?.length > 0) {
            status = 'error'
          } else if (responseTime > 2000 || healthData.status === 'warning') {
            status = 'warning'
          }
        } catch {
          // If JSON parsing fails but response is ok, still consider healthy
          details = { message: 'Health check successful' }
        }
      } else {
        status = 'error'
        details = { 
          message: `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status
        }
      }

      // Log the health check
      await prisma.connectionLog.create({
        data: {
          integrationId: integration.id,
          status: response.ok ? 'SUCCESS' : 'FAILURE',
          responseTime,
          statusCode: response.status,
          responseDetails: details
        }
      })

      return {
        platform: integration.platformName,
        status,
        responseTime,
        lastCheck: new Date(),
        details
      }

    } catch (error) {
      // Log the failed health check
      await prisma.connectionLog.create({
        data: {
          integrationId: integration.id,
          status: 'FAILURE',
          errorMessage: error instanceof Error ? error.message : String(error)
        }
      })

      return {
        platform: integration.platformName,
        status: 'error',
        lastCheck: new Date(),
        details: { message: error instanceof Error ? error.message : String(error) }
      }
    }
  }

  private async collectAllMetrics() {
    const integrations = await prisma.systemIntegration.findMany({
      where: {
        status: 'CONNECTED'
      }
    })

    for (const integration of integrations) {
      await this.collectPlatformMetrics(integration)
    }

    // Also collect master portal metrics
    await this.collectMasterPortalMetrics()
  }

  private async collectPlatformMetrics(integration: any) {
    try {
      const metricsEndpoint = `${integration.baseUrl}/api/metrics`
      
      const response = await fetch(metricsEndpoint, {
        method: 'GET',
        headers: {
          ...(integration.apiKey && { 'Authorization': `Bearer ${integration.apiKey}` })
        }
      })

      if (response.ok) {
        const metrics = await response.json()
        
        // Store metrics in database
        const metricsToStore = [
          { name: 'cpu_usage', value: metrics.cpu || 0, unit: 'percent' },
          { name: 'memory_usage', value: metrics.memory || 0, unit: 'percent' },
          { name: 'active_users', value: metrics.activeUsers || 0, unit: 'count' },
          { name: 'requests_per_minute', value: metrics.requestsPerMinute || 0, unit: 'count' },
          { name: 'error_rate', value: metrics.errorRate || 0, unit: 'percent' }
        ]

        for (const metric of metricsToStore) {
          await prisma.performanceMetric.create({
            data: {
              system: integration.platformName,
              metricName: metric.name,
              value: metric.value,
              unit: metric.unit
            }
          })
        }

        // Emit real-time metrics
        const wsManager = WebSocketManager.getInstance()
        wsManager.emitToPlatform(integration.platformName, 'metrics-update', {
          platform: integration.platformName,
          metrics: metricsToStore,
          timestamp: new Date()
        })
      }
    } catch (error) {
      console.error(`Failed to collect metrics for ${integration.platformName}:`, error)
    }
  }

  private async collectMasterPortalMetrics() {
    // Simulate master portal metrics collection
    const metrics = {
      cpu: Math.random() * 30 + 20, // 20-50%
      memory: Math.random() * 40 + 30, // 30-70%
      activeUsers: await prisma.user.count({ where: { status: 'ACTIVE' } }),
      requestsPerMinute: Math.floor(Math.random() * 100) + 50,
      errorRate: Math.random() * 2 // 0-2%
    }

    const metricsToStore = [
      { name: 'cpu_usage', value: metrics.cpu, unit: 'percent' },
      { name: 'memory_usage', value: metrics.memory, unit: 'percent' },
      { name: 'active_users', value: metrics.activeUsers, unit: 'count' },
      { name: 'requests_per_minute', value: metrics.requestsPerMinute, unit: 'count' },
      { name: 'error_rate', value: metrics.errorRate, unit: 'percent' }
    ]

    for (const metric of metricsToStore) {
      await prisma.performanceMetric.create({
        data: {
          system: 'master-portal',
          metricName: metric.name,
          value: metric.value,
          unit: metric.unit
        }
      })
    }

    // Emit real-time metrics
    const wsManager = WebSocketManager.getInstance()
    wsManager.broadcast('master-metrics-update', {
      platform: 'master-portal',
      metrics: metricsToStore,
      timestamp: new Date()
    })
  }

  private mapHealthToStatus(health: string): string {
    switch (health) {
      case 'healthy': return 'CONNECTED'
      case 'warning': return 'MAINTENANCE'
      case 'error': return 'ERROR'
      default: return 'DISCONNECTED'
    }
  }

  private async handleCriticalHealthIssues(issues: PlatformHealthStatus[]) {
    for (const issue of issues) {
      await SecurityManager.createSecurityAlert({
        title: `Critical Platform Issue: ${issue.platform}`,
        message: `Platform ${issue.platform} is experiencing critical issues: ${issue.details?.message || 'Unknown error'}`,
        severity: 'CRITICAL',
        category: 'SYSTEM',
        platform: issue.platform,
        metadata: {
          healthStatus: issue,
          autoDetected: true
        }
      })
    }
  }

  async getPlatformConnections() {
    return await prisma.systemIntegration.findMany({
      include: {
        connectionLogs: {
          take: 5,
          orderBy: { timestamp: 'desc' }
        }
      }
    })
  }

  async getSystemMetrics(timeRange: string = '1h') {
    const timeRangeMap = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000
    }

    const timeAgo = new Date(Date.now() - (timeRangeMap[timeRange as keyof typeof timeRangeMap] || timeRangeMap['1h']))

    return await prisma.performanceMetric.findMany({
      where: {
        timestamp: {
          gte: timeAgo
        }
      },
      orderBy: { timestamp: 'desc' }
    })
  }

  stop() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval)
    }
    if (this.metricsCollectionInterval) {
      clearInterval(this.metricsCollectionInterval)
    }
  }
}

export default SystemIntegrationManager
