
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const platformId = searchParams.get('platformId')
    const metricType = searchParams.get('type')
    const hours = parseInt(searchParams.get('hours') || '24')

    const since = new Date(Date.now() - hours * 60 * 60 * 1000)

    let where: any = {
      timestamp: { gte: since }
    }

    if (platformId) {
      where.platformId = platformId
    }

    if (metricType) {
      where.metricType = metricType
    }

    const metrics = await prisma.systemMetric.findMany({
      where,
      include: {
        platform: {
          select: {
            name: true,
            displayName: true
          }
        }
      },
      orderBy: { timestamp: 'desc' },
      take: 1000
    })

    // Generate summary statistics
    const summary = await prisma.systemMetric.groupBy({
      by: ['platformId', 'metricType', 'name'],
      where,
      _avg: { value: true },
      _max: { value: true },
      _min: { value: true },
      _count: true
    })

    return NextResponse.json({ metrics, summary })
  } catch (error) {
    console.error('Error fetching metrics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { platformId, metricType, name, value, unit } = await request.json()

    if (!platformId || !metricType || !name || value === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const metric = await prisma.systemMetric.create({
      data: {
        platformId,
        metricType,
        name,
        value: parseFloat(value),
        unit
      }
    })

    return NextResponse.json(metric, { status: 201 })
  } catch (error) {
    console.error('Error creating metric:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
