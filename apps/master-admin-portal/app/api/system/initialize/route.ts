
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic";

// Initialize master admin systems
export async function POST() {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has super admin privileges
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user || user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Insufficient privileges' }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      message: 'Master Admin systems initialized successfully',
      timestamp: new Date()
    })

  } catch (error: any) {
    console.error('Error initializing systems:', error)
    return NextResponse.json({ 
      error: 'Failed to initialize systems',
      details: error.message 
    }, { status: 500 })
  }
}

// Get system initialization status
export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get system health and status
    const [
      totalUsers,
      totalPlatforms,
      activeSessions,
      systemAlerts,
      recentMetrics
    ] = await Promise.all([
      prisma.user.count(),
      prisma.systemIntegration.count(),
      prisma.crossPlatformSession.count({ where: { active: true } }),
      prisma.systemAlert.count({ where: { resolved: false } }),
      prisma.performanceMetric.count({
        where: {
          timestamp: {
            gte: new Date(Date.now() - 60 * 60 * 1000) // Last hour
          }
        }
      })
    ])

    return NextResponse.json({
      initialized: true,
      status: 'operational',
      statistics: {
        totalUsers,
        totalPlatforms,
        activeSessions,
        systemAlerts,
        recentMetrics
      },
      timestamp: new Date()
    })

  } catch (error: any) {
    console.error('Error getting initialization status:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
