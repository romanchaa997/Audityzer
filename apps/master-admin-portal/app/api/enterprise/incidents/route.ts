
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { IncidentManagementService } from '@/lib/enterprise/incident-management'
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
    const incidentId = searchParams.get('id')
    const timeRange = searchParams.get('timeRange') || '30d'

    if (action === 'stats') {
      const cacheKey = `incidents:stats:${timeRange}`
      let stats = enterpriseCache.get(cacheKey)
      
      if (!stats) {
        stats = await IncidentManagementService.getIncidentStats(timeRange)
        enterpriseCache.set(cacheKey, stats, 5 * 60 * 1000) // Cache for 5 minutes
      }

      return NextResponse.json({ success: true, data: stats })
    }

    if (incidentId) {
      const incident = await IncidentManagementService.getIncident(incidentId)
      if (!incident) {
        return NextResponse.json({ error: 'Incident not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true, data: incident })
    }

    // Get incidents with filters
    const status = searchParams.get('status')?.split(',')
    const severity = searchParams.get('severity')?.split(',')
    const category = searchParams.get('category')
    const assignedTo = searchParams.get('assignedTo')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const filterKey = JSON.stringify({ status, severity, category, assignedTo, limit, offset })
    const cacheKey = CacheKeys.INCIDENTS(filterKey)
    let incidents = enterpriseCache.get(cacheKey)

    if (!incidents) {
      incidents = await IncidentManagementService.getIncidents({
        status: status || undefined,
        severity: severity || undefined,
        category: category || undefined,
        assignedTo: assignedTo || undefined,
        limit,
        offset
      })
      enterpriseCache.set(cacheKey, incidents, 2 * 60 * 1000) // Cache for 2 minutes
    }

    return NextResponse.json({ success: true, data: incidents })
  } catch (error) {
    console.error('Incidents API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch incidents' }, 
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

    if (action === 'create') {
      const incident = await IncidentManagementService.createIncident({
        ...body,
        reportedBy: session.user.id
      })

      if (!incident) {
        return NextResponse.json({ error: 'Failed to create incident' }, { status: 400 })
      }

      // Invalidate incidents cache
      enterpriseCache.invalidate('incidents:.*')

      return NextResponse.json({ success: true, data: incident })
    }

    if (action === 'updateStatus') {
      const { incidentId, status, comment } = body
      const success = await IncidentManagementService.updateIncidentStatus(
        incidentId,
        status,
        session.user.id,
        comment
      )

      if (!success) {
        return NextResponse.json({ error: 'Failed to update incident status' }, { status: 400 })
      }

      // Invalidate incidents cache
      enterpriseCache.invalidate('incidents:.*')

      return NextResponse.json({ success: true })
    }

    if (action === 'assign') {
      const { incidentId, assignedTo } = body
      const success = await IncidentManagementService.assignIncident(
        incidentId,
        assignedTo,
        session.user.id
      )

      if (!success) {
        return NextResponse.json({ error: 'Failed to assign incident' }, { status: 400 })
      }

      // Invalidate incidents cache
      enterpriseCache.invalidate('incidents:.*')

      return NextResponse.json({ success: true })
    }

    if (action === 'rootCause') {
      const success = await IncidentManagementService.createRootCauseAnalysis({
        ...body,
        analyzedBy: session.user.id
      })

      if (!success) {
        return NextResponse.json({ error: 'Failed to create root cause analysis' }, { status: 400 })
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Incidents creation error:', error)
    return NextResponse.json(
      { error: 'Failed to process incident request' }, 
      { status: 500 }
    )
  }
}
