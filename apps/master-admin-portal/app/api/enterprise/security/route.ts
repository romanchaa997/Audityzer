
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { ThreatIntelligenceService } from '@/lib/enterprise/threat-intelligence'
import { enterpriseCache, CacheKeys } from '@/lib/enterprise/caching'

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const timeRange = searchParams.get('timeRange') || '30d'
    const query = searchParams.get('q')

    if (action === 'dashboard') {
      const cacheKey = `security:dashboard:${timeRange}`
      let dashboard = enterpriseCache.get(cacheKey)
      
      if (!dashboard) {
        dashboard = await ThreatIntelligenceService.getSecurityDashboard(timeRange)
        enterpriseCache.set(cacheKey, dashboard, 5 * 60 * 1000) // Cache for 5 minutes
      }

      return NextResponse.json({ success: true, data: dashboard })
    }

    if (action === 'search' && query) {
      const threats = await ThreatIntelligenceService.searchThreats(query)
      return NextResponse.json({ success: true, data: threats })
    }

    if (action === 'threats') {
      const severity = searchParams.get('severity')?.split(',')
      const threatType = searchParams.get('threatType')
      const status = searchParams.get('status')
      const limit = parseInt(searchParams.get('limit') || '50')
      const offset = parseInt(searchParams.get('offset') || '0')

      const filterKey = JSON.stringify({ severity, threatType, status, limit, offset })
      const cacheKey = CacheKeys.THREATS(filterKey)
      let threats = enterpriseCache.get(cacheKey)

      if (!threats) {
        threats = await ThreatIntelligenceService.getThreats({
          severity: severity || undefined,
          threatType: threatType || undefined,
          status: status || undefined,
          limit,
          offset
        })
        enterpriseCache.set(cacheKey, threats, 3 * 60 * 1000) // Cache for 3 minutes
      }

      return NextResponse.json({ success: true, data: threats })
    }

    if (action === 'detections') {
      const threatId = searchParams.get('threatId')
      const platform = searchParams.get('platform')
      const status = searchParams.get('status')
      const limit = parseInt(searchParams.get('limit') || '50')
      const offset = parseInt(searchParams.get('offset') || '0')

      const detections = await ThreatIntelligenceService.getDetections({
        threatId: threatId || undefined,
        platform: platform || undefined,
        status: status || undefined,
        limit,
        offset
      })

      return NextResponse.json({ success: true, data: detections })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Security API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch security data' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action } = body

    if (action === 'createThreat') {
      const threat = await ThreatIntelligenceService.createThreat({
        ...body,
        reportedBy: session.user.id
      })

      if (!threat) {
        return NextResponse.json({ error: 'Failed to create threat' }, { status: 400 })
      }

      // Invalidate security cache
      enterpriseCache.invalidate('security:.*')
      enterpriseCache.invalidate('threats:.*')

      return NextResponse.json({ success: true, data: threat })
    }

    if (action === 'createDetection') {
      const detection = await ThreatIntelligenceService.createDetection(body)

      if (!detection) {
        return NextResponse.json({ error: 'Failed to create detection' }, { status: 400 })
      }

      // Invalidate security cache
      enterpriseCache.invalidate('security:.*')

      return NextResponse.json({ success: true, data: detection })
    }

    if (action === 'updateThreatStatus') {
      const { threatId, status } = body
      const success = await ThreatIntelligenceService.updateThreatStatus(threatId, status)

      if (!success) {
        return NextResponse.json({ error: 'Failed to update threat status' }, { status: 400 })
      }

      // Invalidate security cache
      enterpriseCache.invalidate('security:.*')
      enterpriseCache.invalidate('threats:.*')

      return NextResponse.json({ success: true })
    }

    if (action === 'reviewDetection') {
      const { detectionId, status } = body
      const success = await ThreatIntelligenceService.reviewDetection(
        detectionId,
        session.user.id,
        status
      )

      if (!success) {
        return NextResponse.json({ error: 'Failed to review detection' }, { status: 400 })
      }

      // Invalidate security cache
      enterpriseCache.invalidate('security:.*')

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Security creation error:', error)
    return NextResponse.json(
      { error: 'Failed to process security request' }, 
      { status: 500 }
    )
  }
}
