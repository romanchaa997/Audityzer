
import { prisma } from '@/lib/db'
import { addDays, subDays } from 'date-fns'

export interface ResourceOptimization {
  id: string
  resourceType: 'CPU' | 'MEMORY' | 'STORAGE' | 'NETWORK'
  platform: string
  currentUsage: number
  recommendedUsage?: number
  potentialSavings?: number
  optimizationType: 'SCALE_UP' | 'SCALE_DOWN' | 'MIGRATE' | 'TERMINATE'
  confidence: number
  impact: 'LOW' | 'MEDIUM' | 'HIGH'
  description: string
  implementation?: any
  status: 'PENDING' | 'IMPLEMENTED' | 'REJECTED' | 'EXPIRED'
  implementedBy?: string
  implementedAt?: Date
  validUntil: Date
  createdAt: Date
}

export interface OptimizationDashboard {
  summary: {
    totalRecommendations: number
    pendingRecommendations: number
    implementedRecommendations: number
    totalPotentialSavings: number
    actualSavings: number
  }
  recommendationsByType: {
    type: string
    count: number
    avgSavings: number
  }[]
  recommendationsByPlatform: {
    platform: string
    count: number
    potentialSavings: number
  }[]
  recentOptimizations: ResourceOptimization[]
  trends: {
    date: string
    recommendations: number
    implemented: number
    savings: number
  }[]
}

export interface ResourceMetrics {
  platform: string
  resourceType: string
  usage: number
  capacity: number
  utilization: number
  trend: 'INCREASING' | 'DECREASING' | 'STABLE'
  anomalies: boolean
}

export class ResourceOptimizationService {
  static async analyzeResources(): Promise<ResourceOptimization[]> {
    try {
      // Get current resource metrics
      const metrics = await this.getCurrentResourceMetrics()
      const recommendations: Omit<ResourceOptimization, 'id' | 'createdAt'>[] = []

      for (const metric of metrics) {
        const optimization = await this.generateOptimizationRecommendation(metric)
        if (optimization) {
          recommendations.push(optimization)
        }
      }

      // Save recommendations to database
      const createdRecommendations: ResourceOptimization[] = []
      for (const rec of recommendations) {
        const created = await this.createOptimizationRecommendation(rec)
        if (created) {
          createdRecommendations.push(created)
        }
      }

      return createdRecommendations
    } catch (error) {
      console.error('Error analyzing resources:', error)
      return []
    }
  }

  private static async getCurrentResourceMetrics(): Promise<ResourceMetrics[]> {
    try {
      // Get performance metrics from the last 24 hours
      const yesterday = subDays(new Date(), 1)
      const metrics = await prisma.performanceMetric.findMany({
        where: {
          timestamp: { gte: yesterday }
        },
        orderBy: { timestamp: 'desc' }
      })

      // Group by platform and metric type
      const grouped = metrics.reduce((acc, metric) => {
        const key = `${metric.system}-${metric.metricName}`
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(metric)
        return acc
      }, {} as Record<string, any[]>)

      const resourceMetrics: ResourceMetrics[] = []

      for (const [key, metricData] of Object.entries(grouped)) {
        const [platform, metricName] = key.split('-')
        
        if (!this.isResourceMetric(metricName)) continue

        const values = metricData.map(m => m.value)
        const avgUsage = values.reduce((sum, val) => sum + val, 0) / values.length
        const trend = this.calculateTrend(values)
        const anomalies = this.detectAnomalies(values)

        resourceMetrics.push({
          platform,
          resourceType: this.mapMetricToResourceType(metricName),
          usage: avgUsage,
          capacity: 100, // Assume 100% capacity for simplicity
          utilization: avgUsage,
          trend,
          anomalies
        })
      }

      return resourceMetrics
    } catch (error) {
      console.error('Error getting resource metrics:', error)
      return []
    }
  }

  private static isResourceMetric(metricName: string): boolean {
    const resourceMetrics = ['cpu_usage', 'memory_usage', 'disk_usage', 'network_usage']
    return resourceMetrics.some(rm => metricName.includes(rm))
  }

  private static mapMetricToResourceType(metricName: string): 'CPU' | 'MEMORY' | 'STORAGE' | 'NETWORK' {
    if (metricName.includes('cpu')) return 'CPU'
    if (metricName.includes('memory')) return 'MEMORY'
    if (metricName.includes('disk') || metricName.includes('storage')) return 'STORAGE'
    if (metricName.includes('network')) return 'NETWORK'
    return 'CPU' // Default
  }

  private static calculateTrend(values: number[]): 'INCREASING' | 'DECREASING' | 'STABLE' {
    if (values.length < 2) return 'STABLE'

    const firstHalf = values.slice(0, Math.floor(values.length / 2))
    const secondHalf = values.slice(Math.floor(values.length / 2))

    const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length
    const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length

    const change = (secondAvg - firstAvg) / firstAvg
    
    if (change > 0.1) return 'INCREASING'
    if (change < -0.1) return 'DECREASING'
    return 'STABLE'
  }

  private static detectAnomalies(values: number[]): boolean {
    if (values.length < 3) return false

    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
    const stdDev = Math.sqrt(variance)

    // Check if any value is more than 2 standard deviations from the mean
    return values.some(val => Math.abs(val - mean) > 2 * stdDev)
  }

  private static async generateOptimizationRecommendation(
    metric: ResourceMetrics
  ): Promise<Omit<ResourceOptimization, 'id' | 'createdAt'> | null> {
    const { platform, resourceType, utilization, trend, anomalies } = metric

    let optimizationType: 'SCALE_UP' | 'SCALE_DOWN' | 'MIGRATE' | 'TERMINATE'
    let description: string
    let impact: 'LOW' | 'MEDIUM' | 'HIGH'
    let confidence: number
    let potentialSavings: number
    let recommendedUsage: number

    // Determine optimization based on utilization and trend
    if (utilization > 90) {
      optimizationType = 'SCALE_UP'
      description = `${resourceType} utilization is critically high at ${utilization.toFixed(1)}%. Consider scaling up resources.`
      impact = 'HIGH'
      confidence = trend === 'INCREASING' ? 90 : 70
      potentialSavings = 0 // Scaling up doesn't save money
      recommendedUsage = utilization * 0.8 // Target 80% utilization
    } else if (utilization < 20 && trend !== 'INCREASING') {
      optimizationType = 'SCALE_DOWN'
      description = `${resourceType} utilization is low at ${utilization.toFixed(1)}%. Consider scaling down resources.`
      impact = utilization < 10 ? 'HIGH' : 'MEDIUM'
      confidence = trend === 'DECREASING' ? 85 : 65
      potentialSavings = this.calculatePotentialSavings(resourceType, utilization)
      recommendedUsage = Math.max(utilization * 1.5, 30) // Target 30-45% utilization minimum
    } else if (anomalies) {
      optimizationType = 'MIGRATE'
      description = `${resourceType} shows anomalous behavior. Consider migrating to optimize performance.`
      impact = 'MEDIUM'
      confidence = 60
      potentialSavings = this.calculatePotentialSavings(resourceType, utilization) * 0.5
      recommendedUsage = utilization
    } else {
      // No optimization needed
      return null
    }

    return {
      resourceType: resourceType as 'CPU' | 'MEMORY' | 'STORAGE' | 'NETWORK',
      platform,
      currentUsage: utilization,
      recommendedUsage,
      potentialSavings,
      optimizationType,
      confidence,
      impact,
      description,
      implementation: this.generateImplementationSteps(optimizationType, resourceType),
      status: 'PENDING',
      validUntil: addDays(new Date(), 30) // Valid for 30 days
    }
  }

  private static calculatePotentialSavings(resourceType: string, utilization: number): number {
    // Base cost per resource type (mock values)
    const baseCosts = {
      CPU: 100,
      MEMORY: 80,
      STORAGE: 50,
      NETWORK: 30
    }

    const baseCost = baseCosts[resourceType as keyof typeof baseCosts] || 50
    const currentCost = baseCost * (utilization / 100)
    const optimizedCost = baseCost * 0.7 // Assume 30% savings from optimization
    
    return Math.max(0, currentCost - optimizedCost)
  }

  private static generateImplementationSteps(
    optimizationType: string, 
    resourceType: string
  ): any {
    const steps = {
      SCALE_UP: [
        'Analyze current workload patterns',
        'Increase resource allocation by 50%',
        'Monitor performance for 24 hours',
        'Adjust allocation if needed'
      ],
      SCALE_DOWN: [
        'Verify low utilization period consistency',
        'Reduce resource allocation by 30%',
        'Monitor for performance degradation',
        'Rollback if issues occur'
      ],
      MIGRATE: [
        'Identify optimal target platform',
        'Plan migration strategy',
        'Execute migration during low traffic',
        'Verify performance post-migration'
      ],
      TERMINATE: [
        'Confirm resource is no longer needed',
        'Backup any necessary data',
        'Gracefully shutdown resource',
        'Monitor for any dependencies'
      ]
    }

    return {
      type: optimizationType,
      resourceType,
      steps: steps[optimizationType as keyof typeof steps] || [],
      estimatedTime: optimizationType === 'MIGRATE' ? '2-4 hours' : '1-2 hours',
      riskLevel: optimizationType === 'SCALE_DOWN' ? 'MEDIUM' : 'LOW'
    }
  }

  static async createOptimizationRecommendation(
    data: Omit<ResourceOptimization, 'id' | 'createdAt'>
  ): Promise<ResourceOptimization | null> {
    try {
      const optimization = await prisma.resourceOptimization.create({
        data: {
          resourceType: data.resourceType,
          platform: data.platform,
          currentUsage: data.currentUsage,
          recommendedUsage: data.recommendedUsage,
          potentialSavings: data.potentialSavings,
          optimizationType: data.optimizationType,
          confidence: data.confidence,
          impact: data.impact,
          description: data.description,
          implementation: data.implementation,
          status: data.status,
          validUntil: data.validUntil
        }
      })

      return {
        ...optimization,
        resourceType: optimization.resourceType as 'CPU' | 'MEMORY' | 'STORAGE' | 'NETWORK',
        optimizationType: optimization.optimizationType as 'SCALE_UP' | 'SCALE_DOWN' | 'MIGRATE' | 'TERMINATE',
        status: optimization.status as 'IMPLEMENTED' | 'PENDING' | 'REJECTED' | 'EXPIRED',
        impact: optimization.impact as 'LOW' | 'MEDIUM' | 'HIGH',
        recommendedUsage: optimization.recommendedUsage ?? undefined,
        potentialSavings: optimization.potentialSavings ?? undefined,
        implementedBy: optimization.implementedBy ?? undefined,
        implementedAt: optimization.implementedAt ?? undefined
      }
    } catch (error) {
      console.error('Error creating optimization recommendation:', error)
      return null
    }
  }

  static async getOptimizationDashboard(timeRange: string = '30d'): Promise<OptimizationDashboard> {
    try {
      const days = parseInt(timeRange.replace('d', ''))
      const startDate = subDays(new Date(), days)

      const optimizations = await prisma.resourceOptimization.findMany({
        where: {
          createdAt: { gte: startDate }
        },
        orderBy: { createdAt: 'desc' }
      })

      const totalRecommendations = optimizations.length
      const pendingRecommendations = optimizations.filter(o => o.status === 'PENDING').length
      const implementedRecommendations = optimizations.filter(o => o.status === 'IMPLEMENTED').length
      const totalPotentialSavings = optimizations.reduce((sum, o) => sum + (o.potentialSavings || 0), 0)
      const actualSavings = optimizations
        .filter(o => o.status === 'IMPLEMENTED')
        .reduce((sum, o) => sum + (o.potentialSavings || 0), 0)

      // Group by optimization type
      const typeMap = new Map<string, { count: number; savings: number }>()
      optimizations.forEach(opt => {
        const existing = typeMap.get(opt.optimizationType) || { count: 0, savings: 0 }
        typeMap.set(opt.optimizationType, {
          count: existing.count + 1,
          savings: existing.savings + (opt.potentialSavings || 0)
        })
      })

      const recommendationsByType = Array.from(typeMap.entries()).map(([type, data]) => ({
        type,
        count: data.count,
        avgSavings: data.count > 0 ? data.savings / data.count : 0
      }))

      // Group by platform
      const platformMap = new Map<string, { count: number; savings: number }>()
      optimizations.forEach(opt => {
        const existing = platformMap.get(opt.platform) || { count: 0, savings: 0 }
        platformMap.set(opt.platform, {
          count: existing.count + 1,
          savings: existing.savings + (opt.potentialSavings || 0)
        })
      })

      const recommendationsByPlatform = Array.from(platformMap.entries()).map(([platform, data]) => ({
        platform,
        count: data.count,
        potentialSavings: data.savings
      }))

      // Recent optimizations
      const recentOptimizations = optimizations.slice(0, 10)

      // Generate trends (simplified)
      const trends = []
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const dayOptimizations = optimizations.filter(o => 
          o.createdAt.toDateString() === date.toDateString()
        )
        
        trends.push({
          date: date.toISOString().split('T')[0],
          recommendations: dayOptimizations.length,
          implemented: dayOptimizations.filter(o => o.status === 'IMPLEMENTED').length,
          savings: dayOptimizations.reduce((sum, o) => sum + (o.potentialSavings || 0), 0)
        })
      }

      return {
        summary: {
          totalRecommendations,
          pendingRecommendations,
          implementedRecommendations,
          totalPotentialSavings: Math.round(totalPotentialSavings),
          actualSavings: Math.round(actualSavings)
        },
        recommendationsByType,
        recommendationsByPlatform,
        recentOptimizations: recentOptimizations.map(opt => ({
          ...opt,
          resourceType: opt.resourceType as 'CPU' | 'MEMORY' | 'STORAGE' | 'NETWORK',
          optimizationType: opt.optimizationType as 'SCALE_UP' | 'SCALE_DOWN' | 'MIGRATE' | 'TERMINATE',
          status: opt.status as 'IMPLEMENTED' | 'PENDING' | 'REJECTED' | 'EXPIRED',
          impact: opt.impact as 'LOW' | 'MEDIUM' | 'HIGH',
          recommendedUsage: opt.recommendedUsage ?? undefined,
          potentialSavings: opt.potentialSavings ?? undefined,
          implementedBy: opt.implementedBy ?? undefined,
          implementedAt: opt.implementedAt ?? undefined
        })),
        trends
      }
    } catch (error) {
      console.error('Error fetching optimization dashboard:', error)
      return {
        summary: {
          totalRecommendations: 0,
          pendingRecommendations: 0,
          implementedRecommendations: 0,
          totalPotentialSavings: 0,
          actualSavings: 0
        },
        recommendationsByType: [],
        recommendationsByPlatform: [],
        recentOptimizations: [],
        trends: []
      }
    }
  }

  static async implementOptimization(
    optimizationId: string,
    implementedBy: string
  ): Promise<boolean> {
    try {
      await prisma.resourceOptimization.update({
        where: { id: optimizationId },
        data: {
          status: 'IMPLEMENTED',
          implementedBy,
          implementedAt: new Date()
        }
      })

      return true
    } catch (error) {
      console.error('Error implementing optimization:', error)
      return false
    }
  }

  static async rejectOptimization(optimizationId: string): Promise<boolean> {
    try {
      await prisma.resourceOptimization.update({
        where: { id: optimizationId },
        data: { status: 'REJECTED' }
      })

      return true
    } catch (error) {
      console.error('Error rejecting optimization:', error)
      return false
    }
  }

  static async getOptimizations(filters: {
    status?: string
    resourceType?: string
    platform?: string
    limit?: number
    offset?: number
  } = {}): Promise<ResourceOptimization[]> {
    try {
      const optimizations = await prisma.resourceOptimization.findMany({
        where: {
          ...(filters.status && { status: filters.status as any }),
          ...(filters.resourceType && { resourceType: filters.resourceType as any }),
          ...(filters.platform && { platform: filters.platform })
        },
        orderBy: [
          { impact: 'desc' },
          { potentialSavings: 'desc' },
          { createdAt: 'desc' }
        ],
        take: filters.limit || 50,
        skip: filters.offset || 0
      })

      return optimizations.map(optimization => ({
        ...optimization,
        resourceType: optimization.resourceType as 'CPU' | 'MEMORY' | 'STORAGE' | 'NETWORK',
        optimizationType: optimization.optimizationType as 'SCALE_UP' | 'SCALE_DOWN' | 'MIGRATE' | 'TERMINATE',
        status: optimization.status as 'IMPLEMENTED' | 'PENDING' | 'REJECTED' | 'EXPIRED',
        impact: optimization.impact as 'LOW' | 'MEDIUM' | 'HIGH',
        recommendedUsage: optimization.recommendedUsage ?? undefined,
        potentialSavings: optimization.potentialSavings ?? undefined,
        implementedBy: optimization.implementedBy ?? undefined,
        implementedAt: optimization.implementedAt ?? undefined
      }))
    } catch (error) {
      console.error('Error fetching optimizations:', error)
      return []
    }
  }
}
