
import { prisma } from '@/lib/db'
import { addMinutes, addHours, addDays, parseISO } from 'date-fns'

export interface WorkflowTrigger {
  type: 'EVENT' | 'SCHEDULE' | 'MANUAL' | 'THRESHOLD'
  event?: string // For event-based triggers
  schedule?: string // Cron expression for scheduled triggers
  conditions?: any // Additional conditions
}

export interface WorkflowAction {
  type: 'EMAIL' | 'WEBHOOK' | 'API_CALL' | 'CREATE_INCIDENT' | 'UPDATE_STATUS' | 'NOTIFICATION'
  config: any // Action-specific configuration
}

export interface Workflow {
  id: string
  name: string
  description?: string
  trigger: WorkflowTrigger
  actions: WorkflowAction[]
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'ARCHIVED'
  priority: number
  conditions?: any
  schedule?: string
  lastRun?: Date
  nextRun?: Date
  runCount: number
  successCount: number
  failureCount: number
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface WorkflowExecution {
  id: string
  workflowId: string
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'TIMEOUT'
  startedAt: Date
  completedAt?: Date
  duration?: number
  input?: any
  output?: any
  errorLog?: string
  steps?: any
  triggeredBy?: string
}

export class WorkflowAutomationService {
  static async createWorkflow(data: {
    name: string
    description?: string
    trigger: WorkflowTrigger
    actions: WorkflowAction[]
    priority?: number
    conditions?: any
    createdBy: string
  }): Promise<Workflow | null> {
    try {
      const workflow = await prisma.workflowAutomation.create({
        data: {
          name: data.name,
          description: data.description,
          trigger: data.trigger as any,
          actions: data.actions as any,
          priority: data.priority || 5,
          conditions: data.conditions,
          schedule: data.trigger.schedule,
          createdBy: data.createdBy
        }
      })

      return {
        ...workflow,
        description: workflow.description || undefined,
        conditions: workflow.conditions ?? undefined,
        schedule: workflow.schedule || undefined,
        lastRun: workflow.lastRun ?? undefined,
        nextRun: workflow.nextRun ?? undefined,
        trigger: workflow.trigger as unknown as WorkflowTrigger,
        actions: workflow.actions as unknown as WorkflowAction[]
      }
    } catch (error) {
      console.error('Error creating workflow:', error)
      return null
    }
  }

  static async getWorkflows(filters: {
    status?: string[]
    createdBy?: string
    limit?: number
    offset?: number
  } = {}): Promise<Workflow[]> {
    try {
      const workflows = await prisma.workflowAutomation.findMany({
        where: {
          ...(filters.status && { status: { in: filters.status as any } }),
          ...(filters.createdBy && { createdBy: filters.createdBy })
        },
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'desc' }
        ],
        take: filters.limit || 50,
        skip: filters.offset || 0
      })

      return workflows.map(workflow => ({
        ...workflow,
        description: workflow.description ?? undefined,
        schedule: workflow.schedule ?? undefined,
        lastRun: workflow.lastRun ?? undefined,
        nextRun: workflow.nextRun ?? undefined,
        trigger: workflow.trigger as unknown as WorkflowTrigger,
        actions: workflow.actions as unknown as WorkflowAction[]
      }))
    } catch (error) {
      console.error('Error fetching workflows:', error)
      return []
    }
  }

  static async executeWorkflow(
    workflowId: string, 
    input?: any, 
    triggeredBy?: string
  ): Promise<WorkflowExecution | null> {
    try {
      const workflow = await prisma.workflowAutomation.findUnique({
        where: { id: workflowId }
      })

      if (!workflow || workflow.status !== 'ACTIVE') {
        return null
      }

      // Create execution record
      const execution = await prisma.workflowExecution.create({
        data: {
          workflowId,
          input,
          triggeredBy,
          status: 'RUNNING'
        }
      })

      try {
        // Execute workflow actions
        const actions = workflow.actions as unknown as WorkflowAction[]
        const results = []

        for (const action of actions) {
          const result = await this.executeAction(action, input)
          results.push(result)
        }

        // Update execution as completed
        const completedExecution = await prisma.workflowExecution.update({
          where: { id: execution.id },
          data: {
            status: 'COMPLETED',
            completedAt: new Date(),
            duration: Date.now() - execution.startedAt.getTime(),
            output: results,
            steps: results
          }
        })

        // Update workflow statistics
        await prisma.workflowAutomation.update({
          where: { id: workflowId },
          data: {
            lastRun: new Date(),
            runCount: { increment: 1 },
            successCount: { increment: 1 }
          }
        })

        return {
          ...completedExecution,
          completedAt: completedExecution.completedAt ?? undefined,
          triggeredBy: completedExecution.triggeredBy ?? undefined,
          errorLog: completedExecution.errorLog ?? undefined,
          duration: completedExecution.duration ?? undefined
        }
      } catch (error) {
        // Update execution as failed
        await prisma.workflowExecution.update({
          where: { id: execution.id },
          data: {
            status: 'FAILED',
            completedAt: new Date(),
            duration: Date.now() - execution.startedAt.getTime(),
            errorLog: error instanceof Error ? error.message : 'Unknown error'
          }
        })

        // Update workflow statistics
        await prisma.workflowAutomation.update({
          where: { id: workflowId },
          data: {
            lastRun: new Date(),
            runCount: { increment: 1 },
            failureCount: { increment: 1 }
          }
        })

        throw error
      }
    } catch (error) {
      console.error('Error executing workflow:', error)
      return null
    }
  }

  private static async executeAction(action: WorkflowAction, input?: any): Promise<any> {
    switch (action.type) {
      case 'EMAIL':
        return this.executeEmailAction(action.config, input)
      case 'WEBHOOK':
        return this.executeWebhookAction(action.config, input)
      case 'API_CALL':
        return this.executeApiCallAction(action.config, input)
      case 'CREATE_INCIDENT':
        return this.executeCreateIncidentAction(action.config, input)
      case 'UPDATE_STATUS':
        return this.executeUpdateStatusAction(action.config, input)
      case 'NOTIFICATION':
        return this.executeNotificationAction(action.config, input)
      default:
        throw new Error(`Unknown action type: ${action.type}`)
    }
  }

  private static async executeEmailAction(config: any, input?: any): Promise<any> {
    // Mock email sending
    console.log('Sending email:', config)
    return {
      success: true,
      action: 'EMAIL',
      recipient: config.to,
      subject: config.subject
    }
  }

  private static async executeWebhookAction(config: any, input?: any): Promise<any> {
    try {
      const response = await fetch(config.url, {
        method: config.method || 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...config.headers
        },
        body: JSON.stringify({
          ...config.payload,
          input
        })
      })

      const result = await response.json()
      return {
        success: response.ok,
        action: 'WEBHOOK',
        status: response.status,
        result
      }
    } catch (error) {
      return {
        success: false,
        action: 'WEBHOOK',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  private static async executeApiCallAction(config: any, input?: any): Promise<any> {
    try {
      const response = await fetch(config.endpoint, {
        method: config.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...config.headers
        },
        body: config.method !== 'GET' ? JSON.stringify(config.data) : undefined
      })

      const result = await response.json()
      return {
        success: response.ok,
        action: 'API_CALL',
        status: response.status,
        result
      }
    } catch (error) {
      return {
        success: false,
        action: 'API_CALL',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  private static async executeCreateIncidentAction(config: any, input?: any): Promise<any> {
    try {
      // Import IncidentManagementService
      const { IncidentManagementService } = await import('./incident-management')
      
      const incident = await IncidentManagementService.createIncident({
        title: config.title,
        description: config.description,
        severity: config.severity || 'MEDIUM',
        category: config.category || 'SYSTEM',
        reportedBy: config.reportedBy,
        affectedSystems: config.affectedSystems
      })

      return {
        success: !!incident,
        action: 'CREATE_INCIDENT',
        incidentId: incident?.incidentId
      }
    } catch (error) {
      return {
        success: false,
        action: 'CREATE_INCIDENT',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  private static async executeUpdateStatusAction(config: any, input?: any): Promise<any> {
    // Mock status update
    console.log('Updating status:', config)
    return {
      success: true,
      action: 'UPDATE_STATUS',
      resource: config.resource,
      status: config.status
    }
  }

  private static async executeNotificationAction(config: any, input?: any): Promise<any> {
    try {
      await prisma.notification.create({
        data: {
          userId: config.userId,
          title: config.title,
          message: config.message,
          type: config.type || 'INFO',
          platform: 'MASTER_ADMIN'
        }
      })

      return {
        success: true,
        action: 'NOTIFICATION',
        userId: config.userId
      }
    } catch (error) {
      return {
        success: false,
        action: 'NOTIFICATION',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  static async getWorkflowExecutions(
    workflowId: string,
    limit: number = 20
  ): Promise<WorkflowExecution[]> {
    try {
      const executions = await prisma.workflowExecution.findMany({
        where: { workflowId },
        orderBy: { startedAt: 'desc' },
        take: limit
      })

      return executions.map(execution => ({
        ...execution,
        completedAt: execution.completedAt ?? undefined,
        triggeredBy: execution.triggeredBy ?? undefined,
        errorLog: execution.errorLog ?? undefined,
        duration: execution.duration ?? undefined
      }))
    } catch (error) {
      console.error('Error fetching workflow executions:', error)
      return []
    }
  }

  static async toggleWorkflowStatus(workflowId: string, status: 'ACTIVE' | 'INACTIVE'): Promise<boolean> {
    try {
      await prisma.workflowAutomation.update({
        where: { id: workflowId },
        data: { status }
      })
      return true
    } catch (error) {
      console.error('Error toggling workflow status:', error)
      return false
    }
  }

  static async deleteWorkflow(workflowId: string): Promise<boolean> {
    try {
      await prisma.workflowAutomation.update({
        where: { id: workflowId },
        data: { status: 'ARCHIVED' }
      })
      return true
    } catch (error) {
      console.error('Error deleting workflow:', error)
      return false
    }
  }

  static async getWorkflowStats(timeRange: string = '30d'): Promise<any> {
    try {
      const days = parseInt(timeRange.replace('d', ''))
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      const executions = await prisma.workflowExecution.findMany({
        where: {
          startedAt: {
            gte: startDate
          }
        }
      })

      const total = executions.length
      const successful = executions.filter(e => e.status === 'COMPLETED').length
      const failed = executions.filter(e => e.status === 'FAILED').length
      const running = executions.filter(e => e.status === 'RUNNING').length

      const avgDuration = executions
        .filter(e => e.duration)
        .reduce((sum, e) => sum + (e.duration || 0), 0) / executions.length || 0

      return {
        total,
        successful,
        failed,
        running,
        successRate: total > 0 ? (successful / total) * 100 : 0,
        avgDuration: Math.round(avgDuration)
      }
    } catch (error) {
      console.error('Error fetching workflow stats:', error)
      return {
        total: 0,
        successful: 0,
        failed: 0,
        running: 0,
        successRate: 0,
        avgDuration: 0
      }
    }
  }
}
