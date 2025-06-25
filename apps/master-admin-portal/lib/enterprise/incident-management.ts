
import { prisma } from '@/lib/db'
import { addMinutes, addHours, addDays } from 'date-fns'

export interface Incident {
  id: string
  incidentId: string
  title: string
  description: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'URGENT'
  status: 'OPEN' | 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED' | 'CANCELLED'
  category: string
  affectedSystems?: string[]
  assignedTo?: string
  reportedBy: string
  resolvedBy?: string
  createdAt: Date
  updatedAt: Date
  acknowledgedAt?: Date
  resolvedAt?: Date
  slaTarget?: Date
  tags?: string[]
  metadata?: any
}

export interface IncidentTimeline {
  id: string
  action: string
  description: string
  timestamp: Date
  user: {
    id: string
    name: string
    email: string
  }
  metadata?: any
}

export interface IncidentStats {
  total: number
  open: number
  inProgress: number
  resolved: number
  mttr: number // Mean Time To Resolution in minutes
  mtta: number // Mean Time To Acknowledgment in minutes
  slaBreaches: number
  byCategory: { category: string; count: number }[]
  bySeverity: { severity: string; count: number }[]
}

export class IncidentManagementService {
  static async createIncident(data: {
    title: string
    description: string
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'URGENT'
    category: string
    affectedSystems?: string[]
    reportedBy: string
    tags?: string[]
    metadata?: any
  }): Promise<Incident | null> {
    try {
      // Generate incident ID
      const year = new Date().getFullYear()
      const count = await prisma.incidentManagement.count({
        where: {
          incidentId: {
            startsWith: `INC-${year}-`
          }
        }
      })
      const incidentId = `INC-${year}-${String(count + 1).padStart(3, '0')}`

      // Calculate SLA target based on severity
      const now = new Date()
      let slaTarget: Date
      switch (data.severity) {
        case 'CRITICAL':
        case 'URGENT':
          slaTarget = addMinutes(now, 30)
          break
        case 'HIGH':
          slaTarget = addHours(now, 2)
          break
        case 'MEDIUM':
          slaTarget = addHours(now, 8)
          break
        case 'LOW':
          slaTarget = addDays(now, 1)
          break
      }

      const incident = await prisma.incidentManagement.create({
        data: {
          incidentId,
          title: data.title,
          description: data.description,
          severity: data.severity,
          category: data.category,
          affectedSystems: data.affectedSystems,
          reportedBy: data.reportedBy,
          slaTarget,
          tags: data.tags,
          metadata: data.metadata,
          timeline: {
            create: {
              userId: data.reportedBy,
              action: 'CREATED',
              description: `Incident created: ${data.title}`
            }
          }
        }
      })

      return {
        ...incident,
        assignedTo: incident.assignedTo ?? undefined,
        resolvedBy: incident.resolvedBy ?? undefined,
        acknowledgedAt: incident.acknowledgedAt ?? undefined,
        resolvedAt: incident.resolvedAt ?? undefined,
        slaTarget: incident.slaTarget ?? undefined,
        affectedSystems: incident.affectedSystems as string[] | undefined,
        tags: incident.tags as string[] | undefined
      }
    } catch (error) {
      console.error('Error creating incident:', error)
      return null
    }
  }

  static async getIncident(id: string): Promise<(Incident & { timeline: IncidentTimeline[] }) | null> {
    try {
      const incident = await prisma.incidentManagement.findUnique({
        where: { id },
        include: {
          timeline: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            },
            orderBy: {
              timestamp: 'desc'
            }
          }
        }
      })

      if (!incident) return null

      return {
        ...incident,
        assignedTo: incident.assignedTo ?? undefined,
        resolvedBy: incident.resolvedBy ?? undefined,
        acknowledgedAt: incident.acknowledgedAt ?? undefined,
        resolvedAt: incident.resolvedAt ?? undefined,
        slaTarget: incident.slaTarget ?? undefined,
        affectedSystems: incident.affectedSystems as string[] | undefined,
        tags: incident.tags as string[] | undefined,
        timeline: incident.timeline.map(t => ({
          id: t.id,
          action: t.action,
          description: t.description,
          timestamp: t.timestamp,
          user: {
            ...t.user,
            name: t.user.name || 'Unknown User'
          },
          metadata: t.metadata
        }))
      }
    } catch (error) {
      console.error('Error fetching incident:', error)
      return null
    }
  }

  static async getIncidents(filters: {
    status?: string[]
    severity?: string[]
    category?: string
    assignedTo?: string
    limit?: number
    offset?: number
  } = {}): Promise<Incident[]> {
    try {
      const incidents = await prisma.incidentManagement.findMany({
        where: {
          ...(filters.status && { status: { in: filters.status as any } }),
          ...(filters.severity && { severity: { in: filters.severity as any } }),
          ...(filters.category && { category: filters.category }),
          ...(filters.assignedTo && { assignedTo: filters.assignedTo })
        },
        orderBy: [
          { severity: 'desc' },
          { createdAt: 'desc' }
        ],
        take: filters.limit || 50,
        skip: filters.offset || 0
      })

      return incidents.map(incident => ({
        ...incident,
        assignedTo: incident.assignedTo ?? undefined,
        resolvedBy: incident.resolvedBy ?? undefined,
        acknowledgedAt: incident.acknowledgedAt ?? undefined,
        resolvedAt: incident.resolvedAt ?? undefined,
        slaTarget: incident.slaTarget ?? undefined,
        affectedSystems: incident.affectedSystems as string[] | undefined,
        tags: incident.tags as string[] | undefined
      }))
    } catch (error) {
      console.error('Error fetching incidents:', error)
      return []
    }
  }

  static async updateIncidentStatus(
    incidentId: string, 
    status: 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED' | 'CANCELLED',
    userId: string,
    comment?: string
  ): Promise<boolean> {
    try {
      const now = new Date()
      const updateData: any = { status }
      
      if (status === 'ACKNOWLEDGED') {
        updateData.acknowledgedAt = now
      } else if (status === 'RESOLVED' || status === 'CLOSED') {
        updateData.resolvedAt = now
        updateData.resolvedBy = userId
      }

      await prisma.incidentManagement.update({
        where: { id: incidentId },
        data: {
          ...updateData,
          timeline: {
            create: {
              userId,
              action: status,
              description: comment || `Incident status changed to ${status}`
            }
          }
        }
      })

      return true
    } catch (error) {
      console.error('Error updating incident status:', error)
      return false
    }
  }

  static async assignIncident(incidentId: string, assignedTo: string, assignedBy: string): Promise<boolean> {
    try {
      await prisma.incidentManagement.update({
        where: { id: incidentId },
        data: {
          assignedTo,
          timeline: {
            create: {
              userId: assignedBy,
              action: 'ASSIGNED',
              description: `Incident assigned to user ${assignedTo}`
            }
          }
        }
      })

      return true
    } catch (error) {
      console.error('Error assigning incident:', error)
      return false
    }
  }

  static async getIncidentStats(timeRange: string = '30d'): Promise<IncidentStats> {
    try {
      const days = parseInt(timeRange.replace('d', ''))
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      const incidents = await prisma.incidentManagement.findMany({
        where: {
          createdAt: {
            gte: startDate
          }
        }
      })

      const total = incidents.length
      const open = incidents.filter(i => i.status === 'OPEN').length
      const inProgress = incidents.filter(i => i.status === 'IN_PROGRESS').length
      const resolved = incidents.filter(i => ['RESOLVED', 'CLOSED'].includes(i.status)).length

      // Calculate MTTR (Mean Time To Resolution)
      const resolvedIncidents = incidents.filter(i => i.resolvedAt)
      const mttr = resolvedIncidents.length > 0 
        ? resolvedIncidents.reduce((sum, incident) => {
            const duration = incident.resolvedAt!.getTime() - incident.createdAt.getTime()
            return sum + duration
          }, 0) / resolvedIncidents.length / (1000 * 60) // Convert to minutes
        : 0

      // Calculate MTTA (Mean Time To Acknowledgment)
      const acknowledgedIncidents = incidents.filter(i => i.acknowledgedAt)
      const mtta = acknowledgedIncidents.length > 0
        ? acknowledgedIncidents.reduce((sum, incident) => {
            const duration = incident.acknowledgedAt!.getTime() - incident.createdAt.getTime()
            return sum + duration
          }, 0) / acknowledgedIncidents.length / (1000 * 60) // Convert to minutes
        : 0

      // Calculate SLA breaches
      const slaBreaches = incidents.filter(incident => {
        if (!incident.slaTarget) return false
        const targetTime = incident.slaTarget.getTime()
        const resolutionTime = incident.resolvedAt?.getTime() || Date.now()
        return resolutionTime > targetTime
      }).length

      // Group by category
      const categoryMap = new Map<string, number>()
      incidents.forEach(incident => {
        const count = categoryMap.get(incident.category) || 0
        categoryMap.set(incident.category, count + 1)
      })
      const byCategory = Array.from(categoryMap.entries()).map(([category, count]) => ({
        category,
        count
      }))

      // Group by severity
      const severityMap = new Map<string, number>()
      incidents.forEach(incident => {
        const count = severityMap.get(incident.severity) || 0
        severityMap.set(incident.severity, count + 1)
      })
      const bySeverity = Array.from(severityMap.entries()).map(([severity, count]) => ({
        severity,
        count
      }))

      return {
        total,
        open,
        inProgress,
        resolved,
        mttr: Math.round(mttr),
        mtta: Math.round(mtta),
        slaBreaches,
        byCategory,
        bySeverity
      }
    } catch (error) {
      console.error('Error fetching incident stats:', error)
      return {
        total: 0,
        open: 0,
        inProgress: 0,
        resolved: 0,
        mttr: 0,
        mtta: 0,
        slaBreaches: 0,
        byCategory: [],
        bySeverity: []
      }
    }
  }

  static async createRootCauseAnalysis(data: {
    incidentId: string
    rootCause: string
    contributingFactors?: any
    preventiveMeasures?: string
    lessonsLearned?: string
    analyzedBy: string
  }): Promise<boolean> {
    try {
      await prisma.rootCauseAnalysis.create({
        data: {
          incidentId: data.incidentId,
          rootCause: data.rootCause,
          contributingFactors: data.contributingFactors,
          preventiveMeasures: data.preventiveMeasures,
          lessonsLearned: data.lessonsLearned,
          analyzedBy: data.analyzedBy
        }
      })

      return true
    } catch (error) {
      console.error('Error creating root cause analysis:', error)
      return false
    }
  }
}
