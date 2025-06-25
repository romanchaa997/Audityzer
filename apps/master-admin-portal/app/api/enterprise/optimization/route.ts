
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { ResourceOptimizationService } from '@/lib/enterprise/resource-optimization'
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

    if (action === 'dashboard') {
      const cacheKey = `optimization:dashboard:${timeRange}`
      let dashboard = enterpriseCache.get(cacheKey)
      
      if (!dashboard) {
        dashboard = await ResourceOptimizationService.getOptimizationDashboard(timeRange)
        enterpriseCache.set(cacheKey, dashboard, 5 * 60 * 1000) // Cache for 5 minutes
      }

      return NextResponse.json({ success: true, data: dashboard })
    }

    if (action === 'analyze') {
      // This is a heavy operation, so we cache it longer
      const cacheKey = 'optimization:analysis'
      let analysis = enterpriseCache.get(cacheKey)
      
      if (!analysis) {
        analysis = await ResourceOptimizationService.analyzeResources()
        enterpriseCache.set(cacheKey, analysis, 30 * 60 * 1000) // Cache for 30 minutes
      }

      return NextResponse.json({ success: true, data: analysis })
    }

    // Get optimizations with filters
    const status = searchParams.get('status')
    const resourceType = searchParams.get('resourceType')
    const platform = searchParams.get('platform')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const filterKey = JSON.stringify({ status, resourceType, platform, limit, offset })
    const cacheKey = CacheKeys.OPTIMIZATIONS(filterKey)
    let optimizations = enterpriseCache.get(cacheKey)

    if (!optimizations) {
      optimizations = await ResourceOptimizationService.getOptimizations({
        status: status || undefined,
        resourceType: resourceType || undefined,
        platform: platform || undefined,
        limit,
        offset
      })
      enterpriseCache.set(cacheKey, optimizations, 3 * 60 * 1000) // Cache for 3 minutes
    }

    return NextResponse.json({ success: true, data: optimizations })
  } catch (error) {
    console.error('Optimization API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch optimization data' }, 
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

    if (action === 'implement') {
      const { optimizationId } = body
      const success = await ResourceOptimizationService.implementOptimization(
        optimizationId,
        session.user.id
      )

      if (!success) {
        return NextResponse.json({ error: 'Failed to implement optimization' }, { status: 400 })
      }

      // Invalidate optimization cache
      enterpriseCache.invalidate('optimization:.*')

      return NextResponse.json({ success: true })
    }

    if (action === 'reject') {
      const { optimizationId } = body
      const success = await ResourceOptimizationService.rejectOptimization(optimizationId)

      if (!success) {
        return NextResponse.json({ error: 'Failed to reject optimization' }, { status: 400 })
      }

      // Invalidate optimization cache
      enterpriseCache.invalidate('optimization:.*')

      return NextResponse.json({ success: true })
    }

    if (action === 'create') {
      const optimization = await ResourceOptimizationService.createOptimizationRecommendation(body)

      if (!optimization) {
        return NextResponse.json({ error: 'Failed to create optimization' }, { status: 400 })
      }

      // Invalidate optimization cache
      enterpriseCache.invalidate('optimization:.*')

      return NextResponse.json({ success: true, data: optimization })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Optimization creation error:', error)
    return NextResponse.json(
      { error: 'Failed to process optimization request' }, 
      { status: 500 }
    )
  }
}
