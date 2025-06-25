
import SystemIntegrationManager from '@/lib/system-integration'
import WebSocketManager from '@/lib/websocket'
import { JWTManager } from '@/lib/jwt'
import { SecurityManager } from '@/lib/security'

export class ServerInitializer {
  private static instance: ServerInitializer
  private initialized = false

  static getInstance(): ServerInitializer {
    if (!ServerInitializer.instance) {
      ServerInitializer.instance = new ServerInitializer()
    }
    return ServerInitializer.instance
  }

  async initialize() {
    if (this.initialized) {
      return
    }

    console.log('🚀 Initializing Audityzer Master Admin Portal...')

    try {
      // Initialize System Integration Manager
      const integrationManager = SystemIntegrationManager.getInstance()
      await integrationManager.initialize()
      console.log('✅ System Integration Manager initialized')

      // Schedule cleanup tasks
      this.scheduleCleanupTasks()
      console.log('✅ Cleanup tasks scheduled')

      // Seed initial system configurations
      await this.seedSystemConfigurations()
      console.log('✅ System configurations seeded')

      this.initialized = true
      console.log('🎉 Master Admin Portal initialization complete!')

    } catch (error) {
      console.error('❌ Failed to initialize Master Admin Portal:', error)
      throw error
    }
  }

  private scheduleCleanupTasks() {
    // Clean up expired sessions every hour
    setInterval(async () => {
      try {
        await JWTManager.cleanupExpiredSessions()
        console.log('🧹 Cleaned up expired sessions')
      } catch (error) {
        console.error('Error cleaning up sessions:', error)
      }
    }, 60 * 60 * 1000) // 1 hour

    // Clean up old audit logs every day at 2 AM
    setInterval(async () => {
      try {
        await SecurityManager.cleanupOldAuditLogs(90) // Keep 90 days
        console.log('🧹 Cleaned up old audit logs')
      } catch (error) {
        console.error('Error cleaning up audit logs:', error)
      }
    }, 24 * 60 * 60 * 1000) // 24 hours

    // Health check cleanup every 6 hours
    setInterval(async () => {
      try {
        const integrationManager = SystemIntegrationManager.getInstance()
        await integrationManager.performAllHealthChecks()
        console.log('🏥 Performed scheduled health checks')
      } catch (error) {
        console.error('Error performing health checks:', error)
      }
    }, 6 * 60 * 60 * 1000) // 6 hours
  }

  private async seedSystemConfigurations() {
    const { prisma } = await import('@/lib/db')
    
    const configs = [
      {
        category: 'SECURITY',
        key: 'session_timeout',
        value: '24',
        description: 'Session timeout in hours',
        dataType: 'number'
      },
      {
        category: 'SECURITY',
        key: 'max_failed_logins',
        value: '5',
        description: 'Maximum failed login attempts before lockout',
        dataType: 'number'
      },
      {
        category: 'SECURITY',
        key: 'lockout_duration',
        value: '15',
        description: 'Account lockout duration in minutes',
        dataType: 'number'
      },
      {
        category: 'MONITORING',
        key: 'health_check_interval',
        value: '120',
        description: 'Health check interval in seconds',
        dataType: 'number'
      },
      {
        category: 'MONITORING',
        key: 'metrics_retention_days',
        value: '30',
        description: 'Number of days to retain metrics',
        dataType: 'number'
      },
      {
        category: 'INTEGRATION',
        key: 'connection_timeout',
        value: '10',
        description: 'Connection timeout in seconds',
        dataType: 'number'
      },
      {
        category: 'INTEGRATION',
        key: 'retry_attempts',
        value: '3',
        description: 'Number of retry attempts for failed connections',
        dataType: 'number'
      },
      {
        category: 'PERFORMANCE',
        key: 'cpu_alert_threshold',
        value: '85',
        description: 'CPU usage threshold for alerts (percentage)',
        dataType: 'number'
      },
      {
        category: 'PERFORMANCE',
        key: 'memory_alert_threshold',
        value: '90',
        description: 'Memory usage threshold for alerts (percentage)',
        dataType: 'number'
      }
    ]

    for (const config of configs) {
      try {
        await prisma.systemConfiguration.upsert({
          where: {
            category_key: {
              category: config.category,
              key: config.key
            }
          },
          update: {
            updatedBy: 'SYSTEM',
            updatedAt: new Date()
          },
          create: {
            ...config,
            updatedBy: 'SYSTEM'
          }
        })
      } catch (error) {
        console.error(`Failed to seed config ${config.category}.${config.key}:`, error)
      }
    }
  }

  stop() {
    if (!this.initialized) {
      return
    }

    const integrationManager = SystemIntegrationManager.getInstance()
    integrationManager.stop()

    this.initialized = false
    console.log('🛑 Master Admin Portal stopped')
  }
}

export default ServerInitializer
