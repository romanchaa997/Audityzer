
import { prisma } from '@/lib/db'
import { addDays, addMonths, isBefore, isAfter } from 'date-fns'

export interface ComplianceFramework {
  id: string
  name: string
  version: string
  description: string
  requirements: any
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT'
  dueDate?: Date
  responsible: string
  createdAt: Date
  updatedAt: Date
}

export interface ComplianceControl {
  id: string
  frameworkId: string
  controlId: string
  name: string
  description: string
  category: 'TECHNICAL' | 'ADMINISTRATIVE' | 'PHYSICAL'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  status: 'NOT_IMPLEMENTED' | 'PARTIALLY_IMPLEMENTED' | 'IMPLEMENTED' | 'NOT_APPLICABLE' | 'DEFERRED'
  evidence?: any
  assessor?: string
  assessedAt?: Date
  nextReview?: Date
}

export interface ComplianceAssessment {
  id: string
  frameworkId: string
  assessmentType: 'SELF' | 'EXTERNAL' | 'CONTINUOUS'
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED'
  score?: number
  findings?: any
  recommendations?: any
  assessor: string
  startDate: Date
  endDate?: Date
  reportPath?: string
}

export interface ComplianceDashboard {
  overview: {
    totalFrameworks: number
    activeFrameworks: number
    overallScore: number
    controlsImplemented: number
    controlsTotal: number
    upcomingAssessments: number
  }
  frameworkStatus: {
    framework: string
    score: number
    status: string
    dueDate?: Date
    risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  }[]
  recentAssessments: ComplianceAssessment[]
  controlsByCategory: {
    category: string
    total: number
    implemented: number
    partiallyImplemented: number
    notImplemented: number
  }[]
  upcomingDeadlines: {
    framework: string
    dueDate: Date
    daysRemaining: number
    risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  }[]
}

export class ComplianceManagementService {
  static async createFramework(data: {
    name: string
    version?: string
    description: string
    requirements: any
    dueDate?: Date
    responsible: string
  }): Promise<ComplianceFramework | null> {
    try {
      const framework = await prisma.complianceFramework.create({
        data: {
          name: data.name,
          version: data.version || '1.0',
          description: data.description,
          requirements: data.requirements,
          dueDate: data.dueDate,
          responsible: data.responsible
        }
      })

      return {
        ...framework,
        status: framework.status as 'ACTIVE' | 'INACTIVE' | 'DRAFT',
        dueDate: framework.dueDate ?? undefined
      }
    } catch (error) {
      console.error('Error creating compliance framework:', error)
      return null
    }
  }

  static async createControl(data: {
    frameworkId: string
    controlId: string
    name: string
    description: string
    category: 'TECHNICAL' | 'ADMINISTRATIVE' | 'PHYSICAL'
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  }): Promise<ComplianceControl | null> {
    try {
      const control = await prisma.complianceControl.create({
        data: {
          frameworkId: data.frameworkId,
          controlId: data.controlId,
          name: data.name,
          description: data.description,
          category: data.category,
          priority: data.priority || 'MEDIUM'
        }
      })

      return {
        ...control,
        category: control.category as 'TECHNICAL' | 'ADMINISTRATIVE' | 'PHYSICAL',
        priority: control.priority as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
        assessor: control.assessor || undefined,
        assessedAt: control.assessedAt ?? undefined,
        nextReview: control.nextReview ?? undefined
      }
    } catch (error) {
      console.error('Error creating compliance control:', error)
      return null
    }
  }

  static async updateControlStatus(
    controlId: string,
    status: 'NOT_IMPLEMENTED' | 'PARTIALLY_IMPLEMENTED' | 'IMPLEMENTED' | 'NOT_APPLICABLE' | 'DEFERRED',
    evidence?: any,
    assessor?: string
  ): Promise<boolean> {
    try {
      await prisma.complianceControl.update({
        where: { id: controlId },
        data: {
          status,
          evidence,
          assessor,
          assessedAt: new Date(),
          nextReview: addMonths(new Date(), 6) // Review every 6 months
        }
      })

      return true
    } catch (error) {
      console.error('Error updating control status:', error)
      return false
    }
  }

  static async createAssessment(data: {
    frameworkId: string
    assessmentType: 'SELF' | 'EXTERNAL' | 'CONTINUOUS'
    assessor: string
    startDate: Date
    endDate?: Date
  }): Promise<ComplianceAssessment | null> {
    try {
      const assessment = await prisma.complianceAssessment.create({
        data: {
          frameworkId: data.frameworkId,
          assessmentType: data.assessmentType,
          assessor: data.assessor,
          startDate: data.startDate,
          endDate: data.endDate,
          status: 'PLANNED'
        }
      })

      return {
        ...assessment,
        status: assessment.status as 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED',
        assessmentType: assessment.assessmentType as 'SELF' | 'EXTERNAL' | 'CONTINUOUS',
        endDate: assessment.endDate ?? undefined,
        score: assessment.score ?? undefined,
        reportPath: assessment.reportPath || undefined
      }
    } catch (error) {
      console.error('Error creating assessment:', error)
      return null
    }
  }

  static async completeAssessment(
    assessmentId: string,
    score: number,
    findings?: any,
    recommendations?: any,
    reportPath?: string
  ): Promise<boolean> {
    try {
      await prisma.complianceAssessment.update({
        where: { id: assessmentId },
        data: {
          status: 'COMPLETED',
          score,
          findings,
          recommendations,
          reportPath,
          endDate: new Date()
        }
      })

      return true
    } catch (error) {
      console.error('Error completing assessment:', error)
      return false
    }
  }

  static async getComplianceDashboard(): Promise<ComplianceDashboard> {
    try {
      // Get all frameworks
      const frameworks = await prisma.complianceFramework.findMany({
        include: {
          controls: true,
          assessments: {
            orderBy: { startDate: 'desc' },
            take: 1
          }
        }
      })

      const activeFrameworks = frameworks.filter(f => f.status === 'ACTIVE')

      // Calculate overall metrics
      const totalControls = frameworks.reduce((sum, f) => sum + f.controls.length, 0)
      const implementedControls = frameworks.reduce(
        (sum, f) => sum + f.controls.filter(c => c.status === 'IMPLEMENTED').length,
        0
      )

      const overallScore = frameworks.length > 0
        ? frameworks.reduce((sum, f) => {
            const frameworkScore = this.calculateFrameworkScore(f.controls)
            return sum + frameworkScore
          }, 0) / frameworks.length
        : 0

      // Get upcoming assessments
      const upcomingAssessments = await prisma.complianceAssessment.count({
        where: {
          status: 'PLANNED',
          startDate: {
            gte: new Date(),
            lte: addDays(new Date(), 30)
          }
        }
      })

      // Framework status
      const frameworkStatus = frameworks.map(framework => {
        const score = this.calculateFrameworkScore(framework.controls)
        const risk = this.calculateRisk(framework, score)
        
        return {
          framework: framework.name,
          score: Math.round(score),
          status: framework.status,
          dueDate: framework.dueDate ?? undefined,
          risk
        }
      })

      // Recent assessments
      const recentAssessments = await prisma.complianceAssessment.findMany({
        orderBy: { startDate: 'desc' },
        take: 5
      })

      // Controls by category
      const allControls = frameworks.flatMap(f => f.controls)
      const categories = ['TECHNICAL', 'ADMINISTRATIVE', 'PHYSICAL']
      const controlsByCategory = categories.map(category => {
        const categoryControls = allControls.filter(c => c.category === category)
        return {
          category,
          total: categoryControls.length,
          implemented: categoryControls.filter(c => c.status === 'IMPLEMENTED').length,
          partiallyImplemented: categoryControls.filter(c => c.status === 'PARTIALLY_IMPLEMENTED').length,
          notImplemented: categoryControls.filter(c => c.status === 'NOT_IMPLEMENTED').length
        }
      })

      // Upcoming deadlines
      const upcomingDeadlines = frameworks
        .filter(f => f.dueDate && isAfter(f.dueDate, new Date()))
        .map(framework => {
          const daysRemaining = Math.ceil(
            (framework.dueDate!.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          )
          const risk = daysRemaining <= 7 ? 'CRITICAL' 
            : daysRemaining <= 30 ? 'HIGH'
            : daysRemaining <= 90 ? 'MEDIUM' : 'LOW'

          return {
            framework: framework.name,
            dueDate: framework.dueDate!, // We know it's not null because of the filter
            daysRemaining,
            risk: risk as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          }
        })
        .sort((a, b) => a.daysRemaining - b.daysRemaining)

      return {
        overview: {
          totalFrameworks: frameworks.length,
          activeFrameworks: activeFrameworks.length,
          overallScore: Math.round(overallScore),
          controlsImplemented: implementedControls,
          controlsTotal: totalControls,
          upcomingAssessments
        },
        frameworkStatus,
        recentAssessments: recentAssessments.map(assessment => ({
          ...assessment,
          score: assessment.score ?? undefined,
          endDate: assessment.endDate ?? undefined,
          reportPath: assessment.reportPath ?? undefined,
          status: assessment.status as 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED',
          assessmentType: assessment.assessmentType as 'SELF' | 'EXTERNAL' | 'CONTINUOUS'
        })),
        controlsByCategory,
        upcomingDeadlines
      }
    } catch (error) {
      console.error('Error fetching compliance dashboard:', error)
      return {
        overview: {
          totalFrameworks: 0,
          activeFrameworks: 0,
          overallScore: 0,
          controlsImplemented: 0,
          controlsTotal: 0,
          upcomingAssessments: 0
        },
        frameworkStatus: [],
        recentAssessments: [],
        controlsByCategory: [],
        upcomingDeadlines: []
      }
    }
  }

  private static calculateFrameworkScore(controls: any[]): number {
    if (controls.length === 0) return 0

    const weights = {
      IMPLEMENTED: 100,
      PARTIALLY_IMPLEMENTED: 50,
      NOT_IMPLEMENTED: 0,
      NOT_APPLICABLE: 100,
      DEFERRED: 25
    }

    const totalScore = controls.reduce((sum, control) => {
      return sum + (weights[control.status as keyof typeof weights] || 0)
    }, 0)

    return totalScore / controls.length
  }

  private static calculateRisk(framework: any, score: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    // Check if due date is approaching
    const isDueSoon = framework.dueDate && 
      isBefore(framework.dueDate, addDays(new Date(), 30))

    if (score < 50 || isDueSoon) return 'CRITICAL'
    if (score < 70) return 'HIGH'
    if (score < 85) return 'MEDIUM'
    return 'LOW'
  }

  static async getFrameworkControls(frameworkId: string): Promise<ComplianceControl[]> {
    try {
      const controls = await prisma.complianceControl.findMany({
        where: { frameworkId },
        orderBy: [
          { priority: 'desc' },
          { controlId: 'asc' }
        ]
      })

      return controls.map(control => ({
        ...control,
        category: control.category as 'TECHNICAL' | 'ADMINISTRATIVE' | 'PHYSICAL',
        priority: control.priority as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
        assessor: control.assessor || undefined,
        assessedAt: control.assessedAt ?? undefined,
        nextReview: control.nextReview ?? undefined
      }))
    } catch (error) {
      console.error('Error fetching framework controls:', error)
      return []
    }
  }

  static async generateComplianceReport(frameworkId: string): Promise<any> {
    try {
      const framework = await prisma.complianceFramework.findUnique({
        where: { id: frameworkId },
        include: {
          controls: true,
          assessments: {
            orderBy: { startDate: 'desc' },
            take: 5
          }
        }
      })

      if (!framework) return null

      const score = this.calculateFrameworkScore(framework.controls)
      const controlsBreakdown = {
        implemented: framework.controls.filter(c => c.status === 'IMPLEMENTED').length,
        partiallyImplemented: framework.controls.filter(c => c.status === 'PARTIALLY_IMPLEMENTED').length,
        notImplemented: framework.controls.filter(c => c.status === 'NOT_IMPLEMENTED').length,
        notApplicable: framework.controls.filter(c => c.status === 'NOT_APPLICABLE').length,
        deferred: framework.controls.filter(c => c.status === 'DEFERRED').length
      }

      const gaps = framework.controls
        .filter(c => c.status === 'NOT_IMPLEMENTED')
        .map(control => ({
          controlId: control.controlId,
          name: control.name,
          priority: control.priority,
          category: control.category
        }))

      return {
        framework: {
          name: framework.name,
          version: framework.version,
          score: Math.round(score),
          status: framework.status
        },
        summary: {
          totalControls: framework.controls.length,
          implementationRate: Math.round((controlsBreakdown.implemented / framework.controls.length) * 100),
          controlsBreakdown
        },
        gaps,
        recentAssessments: framework.assessments,
        recommendations: this.generateRecommendations(framework.controls, score),
        generatedAt: new Date()
      }
    } catch (error) {
      console.error('Error generating compliance report:', error)
      return null
    }
  }

  private static generateRecommendations(controls: any[], score: number): string[] {
    const recommendations = []

    if (score < 50) {
      recommendations.push('Immediate attention required - compliance score is critically low')
      recommendations.push('Prioritize implementation of high and critical priority controls')
    }

    const criticalControls = controls.filter(c => 
      c.priority === 'CRITICAL' && c.status === 'NOT_IMPLEMENTED'
    )
    if (criticalControls.length > 0) {
      recommendations.push(`Implement ${criticalControls.length} critical controls immediately`)
    }

    const overdueMControls = controls.filter(c => 
      c.nextReview && isBefore(c.nextReview, new Date())
    )
    if (overdueMControls.length > 0) {
      recommendations.push(`Review ${overdueMControls.length} overdue controls`)
    }

    if (score >= 85) {
      recommendations.push('Maintain current compliance level through regular reviews')
      recommendations.push('Consider implementing continuous monitoring controls')
    }

    return recommendations
  }

  static async getFrameworks(): Promise<ComplianceFramework[]> {
    try {
      const frameworks = await prisma.complianceFramework.findMany({
        orderBy: { createdAt: 'desc' }
      })

      return frameworks.map(framework => ({
        ...framework,
        status: framework.status as 'ACTIVE' | 'INACTIVE' | 'DRAFT',
        dueDate: framework.dueDate ?? undefined
      }))
    } catch (error) {
      console.error('Error fetching frameworks:', error)
      return []
    }
  }
}
