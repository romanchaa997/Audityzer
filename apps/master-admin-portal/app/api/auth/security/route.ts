
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { SecurityManager } from '@/lib/security'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic";

// Get security overview
export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has admin privileges
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user || !['SUPER_ADMIN', 'ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'Insufficient privileges' }, { status: 403 })
    }

    const [
      activeAlerts,
      recentFailedLogins,
      activeSessions,
      recentSecurityEvents
    ] = await Promise.all([
      // Active security alerts
      prisma.systemAlert.findMany({
        where: {
          resolved: false,
          category: 'SECURITY'
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      }),
      
      // Recent failed login attempts
      prisma.auditLog.findMany({
        where: {
          action: 'FAILED_LOGIN_ATTEMPT',
          timestamp: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
          }
        },
        include: {
          user: {
            select: {
              email: true,
              name: true
            }
          }
        },
        orderBy: { timestamp: 'desc' },
        take: 20
      }),
      
      // Active cross-platform sessions
      prisma.crossPlatformSession.findMany({
        where: {
          active: true,
          expiresAt: {
            gt: new Date()
          }
        },
        include: {
          user: {
            select: {
              email: true,
              name: true
            }
          },
          integration: {
            select: {
              displayName: true
            }
          }
        },
        orderBy: { lastAccessed: 'desc' },
        take: 50
      }),
      
      // Recent security events
      prisma.auditLog.findMany({
        where: {
          action: {
            in: [
              'SUCCESSFUL_LOGIN',
              'FAILED_LOGIN_ATTEMPT',
              'CROSS_PLATFORM_SESSION_CREATED',
              'SUSPICIOUS_ACTIVITY_DETECTED'
            ]
          },
          timestamp: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        },
        include: {
          user: {
            select: {
              email: true,
              name: true
            }
          }
        },
        orderBy: { timestamp: 'desc' },
        take: 100
      })
    ])

    // Calculate security metrics
    const securityMetrics = {
      totalAlerts: activeAlerts.length,
      criticalAlerts: activeAlerts.filter(alert => alert.severity === 'CRITICAL').length,
      failedLoginsToday: recentFailedLogins.length,
      activeSessions: activeSessions.length,
      suspiciousActivityEvents: recentSecurityEvents.filter(
        event => event.action === 'SUSPICIOUS_ACTIVITY_DETECTED'
      ).length
    }

    return NextResponse.json({
      metrics: securityMetrics,
      alerts: activeAlerts,
      failedLogins: recentFailedLogins,
      activeSessions,
      recentEvents: recentSecurityEvents.slice(0, 20)
    })

  } catch (error) {
    console.error('Error fetching security overview:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Create security alert
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, message, severity, category, platform, metadata } = await request.json()

    if (!title || !message || !severity || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await SecurityManager.createSecurityAlert({
      title,
      message,
      severity,
      category,
      platform,
      metadata
    })

    return NextResponse.json({ success: true, message: 'Security alert created' })

  } catch (error) {
    console.error('Error creating security alert:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Resolve security alert
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { alertId, action, comment } = await request.json()

    if (!alertId || !action) {
      return NextResponse.json({ error: 'Alert ID and action are required' }, { status: 400 })
    }

    // Update alert
    await prisma.systemAlert.update({
      where: { id: alertId },
      data: {
        resolved: action === 'RESOLVE',
        resolvedAt: action === 'RESOLVE' ? new Date() : null,
        resolvedBy: action === 'RESOLVE' ? session.user.id : null
      }
    })

    // Record response
    await prisma.alertResponse.create({
      data: {
        alertId,
        userId: session.user.id,
        action,
        comment
      }
    })

    return NextResponse.json({ success: true, message: 'Alert updated successfully' })

  } catch (error) {
    console.error('Error updating alert:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
