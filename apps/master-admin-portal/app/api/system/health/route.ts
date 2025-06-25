
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import SystemIntegrationManager from '@/lib/system-integration'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic";

// Get system health overview
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '1h'

    const integrationManager = SystemIntegrationManager.getInstance()
    
    const [
      platformConnections,
      systemMetrics,
      recentConnectionLogs,
      activeAlerts
    ] = await Promise.all([
      integrationManager.getPlatformConnections(),
      integrationManager.getSystemMetrics(timeRange),
      prisma.connectionLog.findMany({
        take: 20,
        orderBy: { timestamp: 'desc' },
        include: {
          integration: {
            select: {
              displayName: true,
              platformName: true
            }
          }
        }
      }),
      prisma.systemAlert.findMany({
        where: {
          resolved: false,
          category: { in: ['SYSTEM', 'INTEGRATION'] }
        },
        orderBy: { createdAt: 'desc' }
      })
    ])

    // Calculate health summary
    const healthSummary = {
      totalPlatforms: platformConnections.length,
      connectedPlatforms: platformConnections.filter(p => p.status === 'CONNECTED').length,
      errorPlatforms: platformConnections.filter(p => p.status === 'ERROR').length,
      maintenancePlatforms: platformConnections.filter(p => p.status === 'MAINTENANCE').length,
      overallHealth: 'healthy' as 'healthy' | 'warning' | 'critical'
    }

    if (healthSummary.errorPlatforms > 0) {
      healthSummary.overallHealth = 'critical'
    } else if (healthSummary.maintenancePlatforms > 0) {
      healthSummary.overallHealth = 'warning'
    }

    // Group metrics by system
    const metricsBySystem = systemMetrics.reduce((acc, metric) => {
      if (!acc[metric.system]) {
        acc[metric.system] = {}
      }
      if (!acc[metric.system][metric.metricName]) {
        acc[metric.system][metric.metricName] = []
      }
      acc[metric.system][metric.metricName].push({
        value: metric.value,
        timestamp: metric.timestamp,
        unit: metric.unit
      })
      return acc
    }, {} as any)

    return NextResponse.json({
      summary: healthSummary,
      platforms: platformConnections.map(platform => ({
        id: platform.id,
        name: platform.platformName,
        displayName: platform.displayName,
        status: platform.status,
        baseUrl: platform.baseUrl,
        lastSync: platform.lastSync,
        recentLogs: platform.connectionLogs
      })),
      metrics: metricsBySystem,
      recentLogs: recentConnectionLogs,
      alerts: activeAlerts
    })

  } catch (error) {
    console.error('Error fetching system health:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Trigger manual health check
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { platformId } = await request.json()

    const integrationManager = SystemIntegrationManager.getInstance()

    if (platformId) {
      // Check specific platform
      const integration = await prisma.systemIntegration.findUnique({
        where: { platformName: platformId }
      })

      if (!integration) {
        return NextResponse.json({ error: 'Platform not found' }, { status: 404 })
      }

      // Trigger health check for specific platform
      await integrationManager.performAllHealthChecks()
      
      return NextResponse.json({ 
        success: true, 
        message: `Health check triggered for ${integration.displayName}` 
      })
    } else {
      // Check all platforms
      await integrationManager.performAllHealthChecks()
      
      return NextResponse.json({ 
        success: true, 
        message: 'Health check triggered for all platforms' 
      })
    }

  } catch (error) {
    console.error('Error triggering health check:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
