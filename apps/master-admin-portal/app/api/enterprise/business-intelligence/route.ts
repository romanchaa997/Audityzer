
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { BusinessIntelligenceService } from '@/lib/enterprise/business-intelligence'
import { enterpriseCache, CacheKeys } from '@/lib/enterprise/caching'

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const period = searchParams.get('period') || 'DAILY'
    const timeRange = searchParams.get('timeRange') || '30d'
    const action = searchParams.get('action')

    if (action === 'predictive' && category) {
      const cacheKey = `bi:predictive:${category}:${timeRange}`
      let result = enterpriseCache.get(cacheKey)
      
      if (!result) {
        const days = parseInt(timeRange.replace('d', ''))
        result = await BusinessIntelligenceService.generatePredictiveAnalytics(category, days)
        enterpriseCache.set(cacheKey, result, 10 * 60 * 1000) // Cache for 10 minutes
      }

      return NextResponse.json({ success: true, data: result })
    }

    if (category) {
      const cacheKey = CacheKeys.BUSINESS_INTELLIGENCE(category, period)
      let metrics = enterpriseCache.get(cacheKey)
      
      if (!metrics) {
        metrics = await BusinessIntelligenceService.getMetricsByCategory(
          category, 
          period as any, 
          parseInt(timeRange.replace('d', ''))
        )
        enterpriseCache.set(cacheKey, metrics, 5 * 60 * 1000) // Cache for 5 minutes
      }

      return NextResponse.json({ success: true, data: metrics })
    }

    // Get comprehensive business intelligence data
    const cacheKey = `bi:dashboard:${timeRange}`
    let data = enterpriseCache.get(cacheKey)
    
    if (!data) {
      data = await BusinessIntelligenceService.getBusinessIntelligence(timeRange)
      enterpriseCache.set(cacheKey, data, 5 * 60 * 1000) // Cache for 5 minutes
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Business Intelligence API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch business intelligence data' }, 
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
    const metric = await BusinessIntelligenceService.createMetric(body)

    if (!metric) {
      return NextResponse.json({ error: 'Failed to create metric' }, { status: 400 })
    }

    // Invalidate related cache
    enterpriseCache.invalidate(`bi:${body.category.toUpperCase()}:.*`)
    enterpriseCache.invalidate('bi:dashboard:.*')

    return NextResponse.json({ success: true, data: metric })
  } catch (error) {
    console.error('Business Intelligence creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create business intelligence metric' }, 
      { status: 500 }
    )
  }
}
