
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { ApiManagementService } from '@/lib/enterprise/api-management'
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
    const apiId = searchParams.get('apiId')
    const timeRange = searchParams.get('timeRange') || '24h'

    if (action === 'dashboard') {
      const cacheKey = `api:dashboard:${timeRange}`
      let dashboard = enterpriseCache.get(cacheKey)
      
      if (!dashboard) {
        dashboard = await ApiManagementService.getApiDashboard(timeRange)
        enterpriseCache.set(cacheKey, dashboard, 5 * 60 * 1000) // Cache for 5 minutes
      }

      return NextResponse.json({ success: true, data: dashboard })
    }

    if (action === 'metrics' && apiId) {
      const cacheKey = CacheKeys.API_METRICS(apiId, timeRange)
      let metrics = enterpriseCache.get(cacheKey)
      
      if (!metrics) {
        metrics = await ApiManagementService.getApiMetrics(apiId, timeRange)
        enterpriseCache.set(cacheKey, metrics, 3 * 60 * 1000) // Cache for 3 minutes
      }

      return NextResponse.json({ success: true, data: metrics })
    }

    if (action === 'rateLimit' && apiId) {
      const userId = searchParams.get('userId')
      const ipAddress = searchParams.get('ipAddress')
      
      const result = await ApiManagementService.checkRateLimit(apiId, userId || undefined, ipAddress || undefined)
      return NextResponse.json({ success: true, data: result })
    }

    // Get API endpoints with filters
    const status = searchParams.get('status')
    const method = searchParams.get('method')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const filterKey = JSON.stringify({ status, method, search, limit, offset })
    const cacheKey = `api:endpoints:${filterKey}`
    let endpoints = enterpriseCache.get(cacheKey)

    if (!endpoints) {
      endpoints = await ApiManagementService.getApiEndpoints({
        status: status || undefined,
        method: method || undefined,
        search: search || undefined,
        limit,
        offset
      })
      enterpriseCache.set(cacheKey, endpoints, 3 * 60 * 1000) // Cache for 3 minutes
    }

    return NextResponse.json({ success: true, data: endpoints })
  } catch (error) {
    console.error('API Management API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch API management data' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action } = body

    if (action === 'createEndpoint') {
      const endpoint = await ApiManagementService.createApiEndpoint(body)

      if (!endpoint) {
        return NextResponse.json({ error: 'Failed to create API endpoint' }, { status: 400 })
      }

      // Invalidate API cache
      enterpriseCache.invalidate('api:.*')

      return NextResponse.json({ success: true, data: endpoint })
    }

    if (action === 'updateStatus') {
      const { apiId, status } = body
      const success = await ApiManagementService.updateApiStatus(apiId, status)

      if (!success) {
        return NextResponse.json({ error: 'Failed to update API status' }, { status: 400 })
      }

      // Invalidate API cache
      enterpriseCache.invalidate('api:.*')

      return NextResponse.json({ success: true })
    }

    if (action === 'updateRateLimit') {
      const { apiId, rateLimitCount, rateLimitPeriod } = body
      const success = await ApiManagementService.updateRateLimit(
        apiId,
        rateLimitCount,
        rateLimitPeriod
      )

      if (!success) {
        return NextResponse.json({ error: 'Failed to update rate limit' }, { status: 400 })
      }

      // Invalidate API cache
      enterpriseCache.invalidate('api:.*')

      return NextResponse.json({ success: true })
    }

    if (action === 'logRequest') {
      const success = await ApiManagementService.logApiRequest(body)

      if (!success) {
        return NextResponse.json({ error: 'Failed to log API request' }, { status: 400 })
      }

      // Don't cache request logs as they're real-time
      return NextResponse.json({ success: true })
    }

    if (action === 'delete') {
      const { apiId } = body
      const success = await ApiManagementService.deleteApiEndpoint(apiId)

      if (!success) {
        return NextResponse.json({ error: 'Failed to delete API endpoint' }, { status: 400 })
      }

      // Invalidate API cache
      enterpriseCache.invalidate('api:.*')

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('API Management creation error:', error)
    return NextResponse.json(
      { error: 'Failed to process API management request' }, 
      { status: 500 }
    )
  }
}
