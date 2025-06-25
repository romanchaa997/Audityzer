
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const platforms = await prisma.platform.findMany({
      include: {
        _count: {
          select: {
            platformAccess: true,
            systemMetrics: true
          }
        }
      },
      orderBy: { displayName: 'asc' }
    })

    return NextResponse.json(platforms)
  } catch (error) {
    console.error('Error fetching platforms:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, displayName, description, url, icon, healthCheck } = await request.json()

    if (!name || !displayName || !url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const platform = await prisma.platform.create({
      data: {
        name,
        displayName,
        description,
        url,
        icon: icon || 'Building',
        healthCheck,
        version: '1.0.0'
      }
    })

    // Log audit trail
    await prisma.auditLog.create({
      data: {
        userId: session.user?.id,
        action: 'CREATE_PLATFORM',
        resource: 'PLATFORM',
        resourceId: platform.id,
        details: { name: platform.name, url: platform.url }
      }
    })

    return NextResponse.json(platform, { status: 201 })
  } catch (error) {
    console.error('Error creating platform:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
