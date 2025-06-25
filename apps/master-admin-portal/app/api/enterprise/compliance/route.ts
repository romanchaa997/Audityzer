
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { ComplianceManagementService } from '@/lib/enterprise/compliance-management'
import { enterpriseCache, CacheKeys } from '@/lib/enterprise/caching'

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const frameworkId = searchParams.get('frameworkId')

    if (action === 'dashboard') {
      const cacheKey = 'compliance:dashboard'
      let dashboard = enterpriseCache.get(cacheKey)
      
      if (!dashboard) {
        dashboard = await ComplianceManagementService.getComplianceDashboard()
        enterpriseCache.set(cacheKey, dashboard, 10 * 60 * 1000) // Cache for 10 minutes
      }

      return NextResponse.json({ success: true, data: dashboard })
    }

    if (action === 'frameworks') {
      const cacheKey = 'compliance:frameworks'
      let frameworks = enterpriseCache.get(cacheKey)
      
      if (!frameworks) {
        frameworks = await ComplianceManagementService.getFrameworks()
        enterpriseCache.set(cacheKey, frameworks, 5 * 60 * 1000) // Cache for 5 minutes
      }

      return NextResponse.json({ success: true, data: frameworks })
    }

    if (action === 'controls' && frameworkId) {
      const cacheKey = `compliance:controls:${frameworkId}`
      let controls = enterpriseCache.get(cacheKey)
      
      if (!controls) {
        controls = await ComplianceManagementService.getFrameworkControls(frameworkId)
        enterpriseCache.set(cacheKey, controls, 5 * 60 * 1000) // Cache for 5 minutes
      }

      return NextResponse.json({ success: true, data: controls })
    }

    if (action === 'report' && frameworkId) {
      const cacheKey = `compliance:report:${frameworkId}`
      let report = enterpriseCache.get(cacheKey)
      
      if (!report) {
        report = await ComplianceManagementService.generateComplianceReport(frameworkId)
        enterpriseCache.set(cacheKey, report, 15 * 60 * 1000) // Cache for 15 minutes
      }

      if (!report) {
        return NextResponse.json({ error: 'Framework not found' }, { status: 404 })
      }

      return NextResponse.json({ success: true, data: report })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Compliance API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch compliance data' }, 
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

    if (action === 'createFramework') {
      const framework = await ComplianceManagementService.createFramework({
        ...body,
        responsible: session.user.id
      })

      if (!framework) {
        return NextResponse.json({ error: 'Failed to create framework' }, { status: 400 })
      }

      // Invalidate compliance cache
      enterpriseCache.invalidate('compliance:.*')

      return NextResponse.json({ success: true, data: framework })
    }

    if (action === 'createControl') {
      const control = await ComplianceManagementService.createControl(body)

      if (!control) {
        return NextResponse.json({ error: 'Failed to create control' }, { status: 400 })
      }

      // Invalidate compliance cache
      enterpriseCache.invalidate('compliance:.*')

      return NextResponse.json({ success: true, data: control })
    }

    if (action === 'updateControlStatus') {
      const { controlId, status, evidence } = body
      const success = await ComplianceManagementService.updateControlStatus(
        controlId,
        status,
        evidence,
        session.user.id
      )

      if (!success) {
        return NextResponse.json({ error: 'Failed to update control status' }, { status: 400 })
      }

      // Invalidate compliance cache
      enterpriseCache.invalidate('compliance:.*')

      return NextResponse.json({ success: true })
    }

    if (action === 'createAssessment') {
      const assessment = await ComplianceManagementService.createAssessment({
        ...body,
        assessor: session.user.id
      })

      if (!assessment) {
        return NextResponse.json({ error: 'Failed to create assessment' }, { status: 400 })
      }

      // Invalidate compliance cache
      enterpriseCache.invalidate('compliance:.*')

      return NextResponse.json({ success: true, data: assessment })
    }

    if (action === 'completeAssessment') {
      const { assessmentId, score, findings, recommendations, reportPath } = body
      const success = await ComplianceManagementService.completeAssessment(
        assessmentId,
        score,
        findings,
        recommendations,
        reportPath
      )

      if (!success) {
        return NextResponse.json({ error: 'Failed to complete assessment' }, { status: 400 })
      }

      // Invalidate compliance cache
      enterpriseCache.invalidate('compliance:.*')

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Compliance creation error:', error)
    return NextResponse.json(
      { error: 'Failed to process compliance request' }, 
      { status: 500 }
    )
  }
}
