
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { WorkflowAutomationService } from '@/lib/enterprise/workflow-automation'
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
    const workflowId = searchParams.get('id')
    const timeRange = searchParams.get('timeRange') || '30d'

    if (action === 'stats') {
      const cacheKey = `workflows:stats:${timeRange}`
      let stats = enterpriseCache.get(cacheKey)
      
      if (!stats) {
        stats = await WorkflowAutomationService.getWorkflowStats(timeRange)
        enterpriseCache.set(cacheKey, stats, 5 * 60 * 1000) // Cache for 5 minutes
      }

      return NextResponse.json({ success: true, data: stats })
    }

    if (action === 'executions' && workflowId) {
      const limit = parseInt(searchParams.get('limit') || '20')
      const executions = await WorkflowAutomationService.getWorkflowExecutions(workflowId, limit)
      return NextResponse.json({ success: true, data: executions })
    }

    // Get workflows with filters
    const status = searchParams.get('status')?.split(',')
    const createdBy = searchParams.get('createdBy')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const filterKey = JSON.stringify({ status, createdBy, limit, offset })
    const cacheKey = CacheKeys.WORKFLOWS(filterKey)
    let workflows = enterpriseCache.get(cacheKey)

    if (!workflows) {
      workflows = await WorkflowAutomationService.getWorkflows({
        status: status || undefined,
        createdBy: createdBy || undefined,
        limit,
        offset
      })
      enterpriseCache.set(cacheKey, workflows, 3 * 60 * 1000) // Cache for 3 minutes
    }

    return NextResponse.json({ success: true, data: workflows })
  } catch (error) {
    console.error('Workflows API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workflows' }, 
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
      const workflow = await WorkflowAutomationService.createWorkflow({
        ...body,
        createdBy: session.user.id
      })

      if (!workflow) {
        return NextResponse.json({ error: 'Failed to create workflow' }, { status: 400 })
      }

      // Invalidate workflows cache
      enterpriseCache.invalidate('workflows:.*')

      return NextResponse.json({ success: true, data: workflow })
    }

    if (action === 'execute') {
      const { workflowId, input } = body
      const execution = await WorkflowAutomationService.executeWorkflow(
        workflowId,
        input,
        session.user.id
      )

      if (!execution) {
        return NextResponse.json({ error: 'Failed to execute workflow' }, { status: 400 })
      }

      return NextResponse.json({ success: true, data: execution })
    }

    if (action === 'toggle') {
      const { workflowId, status } = body
      const success = await WorkflowAutomationService.toggleWorkflowStatus(workflowId, status)

      if (!success) {
        return NextResponse.json({ error: 'Failed to toggle workflow status' }, { status: 400 })
      }

      // Invalidate workflows cache
      enterpriseCache.invalidate('workflows:.*')

      return NextResponse.json({ success: true })
    }

    if (action === 'delete') {
      const { workflowId } = body
      const success = await WorkflowAutomationService.deleteWorkflow(workflowId)

      if (!success) {
        return NextResponse.json({ error: 'Failed to delete workflow' }, { status: 400 })
      }

      // Invalidate workflows cache
      enterpriseCache.invalidate('workflows:.*')

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Workflows creation error:', error)
    return NextResponse.json(
      { error: 'Failed to process workflow request' }, 
      { status: 500 }
    )
  }
}
