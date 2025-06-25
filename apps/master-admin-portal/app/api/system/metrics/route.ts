
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic";

// Get system metrics
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '1h'
    const system = searchParams.get('system')
    const metricName = searchParams.get('metricName')

    const timeRangeMap: { [key: string]: number } = {
      '1h': 60 * 60 * 1000,
      '6h': 6 * 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    }

    const timeAgo = new Date(Date.now() - (timeRangeMap[timeRange] || timeRangeMap['1h']))

    let whereClause: any = {
      timestamp: { gte: timeAgo }
    }

    if (system) {
      whereClause.system = system
    }

    if (metricName) {
      whereClause.metricName = metricName
    }

    const [metrics, systems] = await Promise.all([
      prisma.performanceMetric.findMany({
        where: whereClause,
        orderBy: { timestamp: 'asc' }
      }),
      prisma.performanceMetric.groupBy({
        by: ['system'],
        where: { timestamp: { gte: timeAgo } }
      })
    ])

    // Group metrics by system and metric name
    const groupedMetrics: any = {}
    metrics.forEach(metric => {
      if (!groupedMetrics[metric.system]) {
        groupedMetrics[metric.system] = {}
      }
      if (!groupedMetrics[metric.system][metric.metricName]) {
        groupedMetrics[metric.system][metric.metricName] = []
      }
      groupedMetrics[metric.system][metric.metricName].push({
        value: metric.value,
        timestamp: metric.timestamp,
        unit: metric.unit,
        tags: metric.tags
      })
    })

    // Calculate aggregated statistics
    const aggregatedStats: any = {}
    Object.keys(groupedMetrics).forEach(systemName => {
      aggregatedStats[systemName] = {}
      Object.keys(groupedMetrics[systemName]).forEach(metricName => {
        const values = groupedMetrics[systemName][metricName]
        const numericValues = values.map((v: any) => v.value)
        
        aggregatedStats[systemName][metricName] = {
          current: numericValues[numericValues.length - 1] || 0,
          average: numericValues.reduce((a: number, b: number) => a + b, 0) / numericValues.length || 0,
          min: Math.min(...numericValues) || 0,
          max: Math.max(...numericValues) || 0,
          unit: values[0]?.unit || '',
          dataPoints: values.length
        }
      })
    })

    return NextResponse.json({
      timeRange,
      systems: systems.map(s => s.system),
      metrics: groupedMetrics,
      aggregated: aggregatedStats,
      totalDataPoints: metrics.length
    })

  } catch (error: any) {
    console.error('Error fetching system metrics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Record custom metric
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { system, metricName, value, unit, tags } = await request.json()

    if (!system || !metricName || value === undefined) {
      return NextResponse.json({ 
        error: 'System, metricName, and value are required' 
      }, { status: 400 })
    }

    const metric = await prisma.performanceMetric.create({
      data: {
        system,
        metricName,
        value: parseFloat(value),
        unit: unit || '',
        tags: tags || null
      }
    })

    return NextResponse.json({
      success: true,
      metric: {
        id: metric.id,
        system: metric.system,
        metricName: metric.metricName,
        value: metric.value,
        unit: metric.unit,
        timestamp: metric.timestamp
      }
    })

  } catch (error: any) {
    console.error('Error recording metric:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Get real-time system overview
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get latest metrics for each system
    const latestMetrics = await prisma.performanceMetric.findMany({
      where: {
        timestamp: {
          gte: new Date(Date.now() - 5 * 60 * 1000) // Last 5 minutes
        }
      },
      orderBy: { timestamp: 'desc' }
    })

    // Group by system and get latest values
    const systemOverview: any = {}
    latestMetrics.forEach(metric => {
      if (!systemOverview[metric.system]) {
        systemOverview[metric.system] = {}
      }
      if (!systemOverview[metric.system][metric.metricName] ||
          systemOverview[metric.system][metric.metricName].timestamp < metric.timestamp) {
        systemOverview[metric.system][metric.metricName] = {
          value: metric.value,
          unit: metric.unit,
          timestamp: metric.timestamp
        }
      }
    })

    // Get platform status
    const platforms = await prisma.systemIntegration.findMany({
      select: {
        platformName: true,
        displayName: true,
        status: true,
        lastSync: true
      }
    })

    // Get active alerts count
    const alertsCount = await prisma.systemAlert.count({
      where: { resolved: false }
    })

    const platformsData: any = {}
    platforms.forEach(platform => {
      platformsData[platform.platformName] = {
        displayName: platform.displayName,
        status: platform.status,
        lastSync: platform.lastSync
      }
    })

    return NextResponse.json({
      timestamp: new Date(),
      systems: systemOverview,
      platforms: platformsData,
      alertsCount
    })

  } catch (error: any) {
    console.error('Error fetching system overview:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
