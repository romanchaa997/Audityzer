
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get overview statistics
    const [
      totalUsers,
      activeUsers,
      totalPlatforms,
      activePlatforms,
      recentActivity,
      platformMetrics
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: {
          status: 'ACTIVE',
          lastLogin: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        }
      }),
      prisma.platform.count(),
      prisma.platform.count({
        where: { status: 'ACTIVE' }
      }),
      prisma.auditLog.findMany({
        take: 10,
        orderBy: { timestamp: 'desc' },
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      }),
      prisma.systemMetric.findMany({
        where: {
          timestamp: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
          }
        },
        include: {
          platform: {
            select: {
              name: true,
              displayName: true
            }
          }
        },
        orderBy: { timestamp: 'desc' },
        take: 100
      })
    ])

    // Calculate platform health scores (simulated)
    const platformHealth = await prisma.platform.findMany({
      include: {
        systemMetrics: {
          where: {
            timestamp: {
              gte: new Date(Date.now() - 60 * 60 * 1000) // Last hour
            }
          },
          orderBy: { timestamp: 'desc' },
          take: 10
        }
      }
    })

    const healthScores = platformHealth.map(platform => ({
      id: platform.id,
      name: platform.displayName,
      status: platform.status,
      health: Math.floor(Math.random() * 30) + 70, // Simulated health score 70-100%
      uptime: Math.floor(Math.random() * 5) + 95, // Simulated uptime 95-100%
      responseTime: Math.floor(Math.random() * 100) + 50, // Simulated response time 50-150ms
      errors: Math.floor(Math.random() * 10) // Simulated error count 0-10
    }))

    // User activity trends (last 7 days)
    const userActivity = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)
      
      const count = await prisma.auditLog.count({
        where: {
          timestamp: {
            gte: dayStart,
            lt: dayEnd
          }
        }
      })
      
      userActivity.push({
        date: dayStart.toISOString().split('T')[0],
        count
      })
    }

    return NextResponse.json({
      overview: {
        totalUsers,
        activeUsers,
        totalPlatforms,
        activePlatforms,
        userGrowth: Math.floor(Math.random() * 20) + 5, // Simulated growth %
        systemLoad: Math.floor(Math.random() * 30) + 40 // Simulated system load %
      },
      recentActivity,
      platformHealth: healthScores,
      userActivity,
      platformMetrics: platformMetrics.slice(0, 20)
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
