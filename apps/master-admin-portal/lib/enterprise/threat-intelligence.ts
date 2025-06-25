
import { prisma } from '@/lib/db'

export interface ThreatIntelligence {
  id: string
  threatType: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  source: string
  sourceType: 'IP' | 'DOMAIN' | 'HASH' | 'EMAIL'
  description: string
  indicators?: any
  mitigation?: string
  references?: any
  confidence: number
  status: 'ACTIVE' | 'RESOLVED' | 'FALSE_POSITIVE'
  firstSeen: Date
  lastSeen: Date
  reportedBy: string
}

export interface ThreatDetection {
  id: string
  threatId: string
  detectedAt: Date
  platform: string
  details: any
  action: 'BLOCKED' | 'ALLOWED' | 'QUARANTINED'
  automaticAction: boolean
  reviewedBy?: string
  reviewedAt?: Date
  status: 'PENDING' | 'REVIEWED' | 'RESOLVED'
}

export interface SecurityDashboard {
  threatSummary: {
    active: number
    resolved: number
    falsePositives: number
    critical: number
    high: number
    medium: number
    low: number
  }
  recentDetections: ThreatDetection[]
  topThreats: {
    threatType: string
    count: number
    severity: string
  }[]
  platformSecurity: {
    platform: string
    threats: number
    blocked: number
    status: 'SECURE' | 'WARNING' | 'CRITICAL'
  }[]
  trends: {
    date: string
    threats: number
    detections: number
    blocked: number
  }[]
}

export class ThreatIntelligenceService {
  static async createThreat(data: {
    threatType: string
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    source: string
    sourceType: 'IP' | 'DOMAIN' | 'HASH' | 'EMAIL'
    description: string
    indicators?: any
    mitigation?: string
    references?: any
    confidence?: number
    reportedBy: string
  }): Promise<ThreatIntelligence | null> {
    try {
      const threat = await prisma.threatIntelligence.create({
        data: {
          threatType: data.threatType,
          severity: data.severity,
          source: data.source,
          sourceType: data.sourceType,
          description: data.description,
          indicators: data.indicators,
          mitigation: data.mitigation,
          references: data.references,
          confidence: data.confidence || 50,
          reportedBy: data.reportedBy
        }
      })

      return {
        ...threat,
        status: threat.status as 'ACTIVE' | 'RESOLVED' | 'FALSE_POSITIVE',
        sourceType: threat.sourceType as 'IP' | 'DOMAIN' | 'HASH' | 'EMAIL',
        mitigation: threat.mitigation || undefined,
        references: threat.references ?? undefined
      }
    } catch (error) {
      console.error('Error creating threat intelligence:', error)
      return null
    }
  }

  static async createDetection(data: {
    threatId: string
    platform: string
    details: any
    action: 'BLOCKED' | 'ALLOWED' | 'QUARANTINED'
    automaticAction?: boolean
  }): Promise<ThreatDetection | null> {
    try {
      const detection = await prisma.threatDetection.create({
        data: {
          threatId: data.threatId,
          platform: data.platform,
          details: data.details,
          action: data.action,
          automaticAction: data.automaticAction || false
        }
      })

      // Update threat's last seen timestamp
      await prisma.threatIntelligence.update({
        where: { id: data.threatId },
        data: { lastSeen: new Date() }
      })

      return {
        ...detection,
        status: detection.status as 'PENDING' | 'RESOLVED' | 'REVIEWED',
        action: detection.action as 'BLOCKED' | 'ALLOWED' | 'QUARANTINED',
        reviewedBy: detection.reviewedBy || undefined,
        reviewedAt: detection.reviewedAt ?? undefined
      }
    } catch (error) {
      console.error('Error creating threat detection:', error)
      return null
    }
  }

  static async getThreats(filters: {
    severity?: string[]
    threatType?: string
    status?: string
    limit?: number
    offset?: number
  } = {}): Promise<ThreatIntelligence[]> {
    try {
      const threats = await prisma.threatIntelligence.findMany({
        where: {
          ...(filters.severity && { severity: { in: filters.severity as any } }),
          ...(filters.threatType && { threatType: filters.threatType }),
          ...(filters.status && { status: filters.status })
        },
        orderBy: [
          { severity: 'desc' },
          { lastSeen: 'desc' }
        ],
        take: filters.limit || 50,
        skip: filters.offset || 0
      })

      return threats.map(threat => ({
        ...threat,
        status: threat.status as 'ACTIVE' | 'RESOLVED' | 'FALSE_POSITIVE',
        sourceType: threat.sourceType as 'IP' | 'DOMAIN' | 'HASH' | 'EMAIL',
        mitigation: threat.mitigation || undefined,
        references: threat.references ?? undefined
      }))
    } catch (error) {
      console.error('Error fetching threats:', error)
      return []
    }
  }

  static async getDetections(filters: {
    threatId?: string
    platform?: string
    status?: string
    limit?: number
    offset?: number
  } = {}): Promise<ThreatDetection[]> {
    try {
      const detections = await prisma.threatDetection.findMany({
        where: {
          ...(filters.threatId && { threatId: filters.threatId }),
          ...(filters.platform && { platform: filters.platform }),
          ...(filters.status && { status: filters.status })
        },
        orderBy: { detectedAt: 'desc' },
        take: filters.limit || 50,
        skip: filters.offset || 0
      })

      return detections.map(detection => ({
        ...detection,
        status: detection.status as 'PENDING' | 'RESOLVED' | 'REVIEWED',
        action: detection.action as 'BLOCKED' | 'ALLOWED' | 'QUARANTINED',
        reviewedBy: detection.reviewedBy || undefined,
        reviewedAt: detection.reviewedAt ?? undefined
      }))
    } catch (error) {
      console.error('Error fetching detections:', error)
      return []
    }
  }

  static async getSecurityDashboard(timeRange: string = '30d'): Promise<SecurityDashboard> {
    try {
      const days = parseInt(timeRange.replace('d', ''))
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      // Get threat summary
      const threats = await prisma.threatIntelligence.findMany({
        where: {
          firstSeen: { gte: startDate }
        }
      })

      const threatSummary = {
        active: threats.filter(t => t.status === 'ACTIVE').length,
        resolved: threats.filter(t => t.status === 'RESOLVED').length,
        falsePositives: threats.filter(t => t.status === 'FALSE_POSITIVE').length,
        critical: threats.filter(t => t.severity === 'CRITICAL').length,
        high: threats.filter(t => t.severity === 'HIGH').length,
        medium: threats.filter(t => t.severity === 'MEDIUM').length,
        low: threats.filter(t => t.severity === 'LOW').length
      }

      // Get recent detections
      const recentDetections = await this.getDetections({ limit: 10 })

      // Get top threats
      const threatTypeMap = new Map<string, { count: number; severity: string }>()
      threats.forEach(threat => {
        const existing = threatTypeMap.get(threat.threatType) || { count: 0, severity: 'LOW' }
        threatTypeMap.set(threat.threatType, {
          count: existing.count + 1,
          severity: this.getHighestSeverity(existing.severity, threat.severity)
        })
      })

      const topThreats = Array.from(threatTypeMap.entries())
        .map(([threatType, data]) => ({
          threatType,
          count: data.count,
          severity: data.severity
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

      // Get platform security status
      const platforms = ['Analytics Dashboard', 'Multi-tenant Management', 'API Documentation', 'Master Admin']
      const platformSecurity = await Promise.all(
        platforms.map(async platform => {
          const detections = await this.getDetections({ platform, limit: 1000 })
          const threats = detections.length
          const blocked = detections.filter(d => d.action === 'BLOCKED').length
          
          let status: 'SECURE' | 'WARNING' | 'CRITICAL' = 'SECURE'
          if (threats > 50) status = 'CRITICAL'
          else if (threats > 10) status = 'WARNING'

          return { platform, threats, blocked, status }
        })
      )

      // Generate trends (mock data for now)
      const trends = []
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        trends.push({
          date: date.toISOString().split('T')[0],
          threats: Math.floor(Math.random() * 10) + 1,
          detections: Math.floor(Math.random() * 20) + 5,
          blocked: Math.floor(Math.random() * 15) + 3
        })
      }

      return {
        threatSummary,
        recentDetections,
        topThreats,
        platformSecurity,
        trends
      }
    } catch (error) {
      console.error('Error fetching security dashboard:', error)
      return {
        threatSummary: {
          active: 0, resolved: 0, falsePositives: 0,
          critical: 0, high: 0, medium: 0, low: 0
        },
        recentDetections: [],
        topThreats: [],
        platformSecurity: [],
        trends: []
      }
    }
  }

  private static getHighestSeverity(severity1: string, severity2: string): string {
    const severityOrder = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
    const index1 = severityOrder.indexOf(severity1)
    const index2 = severityOrder.indexOf(severity2)
    return severityOrder[Math.max(index1, index2)]
  }

  static async updateThreatStatus(
    threatId: string, 
    status: 'ACTIVE' | 'RESOLVED' | 'FALSE_POSITIVE'
  ): Promise<boolean> {
    try {
      await prisma.threatIntelligence.update({
        where: { id: threatId },
        data: { status }
      })
      return true
    } catch (error) {
      console.error('Error updating threat status:', error)
      return false
    }
  }

  static async reviewDetection(
    detectionId: string,
    reviewedBy: string,
    status: 'REVIEWED' | 'RESOLVED'
  ): Promise<boolean> {
    try {
      await prisma.threatDetection.update({
        where: { id: detectionId },
        data: {
          reviewedBy,
          reviewedAt: new Date(),
          status
        }
      })
      return true
    } catch (error) {
      console.error('Error reviewing detection:', error)
      return false
    }
  }

  static async searchThreats(query: string): Promise<ThreatIntelligence[]> {
    try {
      const threats = await prisma.threatIntelligence.findMany({
        where: {
          OR: [
            { source: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { threatType: { contains: query, mode: 'insensitive' } }
          ]
        },
        orderBy: { lastSeen: 'desc' },
        take: 20
      })

      return threats.map(threat => ({
        ...threat,
        status: threat.status as 'ACTIVE' | 'RESOLVED' | 'FALSE_POSITIVE',
        sourceType: threat.sourceType as 'IP' | 'DOMAIN' | 'HASH' | 'EMAIL',
        mitigation: threat.mitigation || undefined,
        references: threat.references ?? undefined
      }))
    } catch (error) {
      console.error('Error searching threats:', error)
      return []
    }
  }
}
