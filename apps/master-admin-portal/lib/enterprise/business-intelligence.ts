
import { prisma } from '@/lib/db'
import { subDays, subWeeks, subMonths, startOfDay, endOfDay, format } from 'date-fns'

export interface BusinessMetric {
  id: string
  category: string
  metricName: string
  value: number
  previousValue?: number
  target?: number
  unit?: string
  percentage?: number
  trend?: 'UP' | 'DOWN' | 'STABLE'
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY'
  dimensions?: any
  timestamp: Date
}

export interface BusinessIntelligenceData {
  revenue: {
    current: number
    previous: number
    trend: 'UP' | 'DOWN' | 'STABLE'
    target: number
    growth: number
  }
  usage: {
    activeUsers: number
    totalSessions: number
    averageSessionDuration: number
    platformDistribution: { platform: string; users: number; percentage: number }[]
  }
  performance: {
    averageResponseTime: number
    uptime: number
    errorRate: number
    throughput: number
  }
  customer: {
    satisfaction: number
    churnRate: number
    acquisitionRate: number
    retentionRate: number
  }
}

export class BusinessIntelligenceService {
  static async getMetricsByCategory(
    category: string,
    period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' = 'DAILY',
    limit: number = 30
  ): Promise<BusinessMetric[]> {
    try {
      const metrics = await prisma.businessIntelligenceMetric.findMany({
        where: {
          category: category.toUpperCase(),
          period
        },
        orderBy: {
          timestamp: 'desc'
        },
        take: limit
      })

      return metrics.map(metric => ({
        ...metric,
        period: metric.period as 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY',
        previousValue: metric.previousValue ?? undefined,
        target: metric.target ?? undefined,
        unit: metric.unit || undefined,
        percentage: metric.percentage ?? undefined,
        trend: metric.trend as 'UP' | 'DOWN' | 'STABLE'
      }))
    } catch (error) {
      console.error('Error fetching business metrics:', error)
      return []
    }
  }

  static async getBusinessIntelligence(timeRange: string = '30d'): Promise<BusinessIntelligenceData> {
    const days = parseInt(timeRange.replace('d', ''))
    const endDate = new Date()
    const startDate = subDays(endDate, days)

    try {
      // Revenue metrics
      const revenueMetrics = await this.getMetricsByCategory('REVENUE', 'DAILY', days)
      const currentRevenue = revenueMetrics[0]?.value || 0
      const previousRevenue = revenueMetrics[1]?.value || 0
      const revenueGrowth = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0

      // Usage metrics
      const usageMetrics = await this.getMetricsByCategory('USAGE', 'DAILY', days)
      const activeUsers = usageMetrics.find(m => m.metricName === 'active_users')?.value || 0
      const totalSessions = usageMetrics.find(m => m.metricName === 'total_sessions')?.value || 0
      const avgSessionDuration = usageMetrics.find(m => m.metricName === 'avg_session_duration')?.value || 0

      // Performance metrics
      const performanceMetrics = await this.getMetricsByCategory('PERFORMANCE', 'DAILY', days)
      const avgResponseTime = performanceMetrics.find(m => m.metricName === 'avg_response_time')?.value || 0
      const uptime = performanceMetrics.find(m => m.metricName === 'uptime')?.value || 99.9
      const errorRate = performanceMetrics.find(m => m.metricName === 'error_rate')?.value || 0.1
      const throughput = performanceMetrics.find(m => m.metricName === 'throughput')?.value || 0

      // Customer metrics
      const customerMetrics = await this.getMetricsByCategory('CUSTOMER', 'MONTHLY', 12)
      const satisfaction = customerMetrics.find(m => m.metricName === 'satisfaction_score')?.value || 85
      const churnRate = customerMetrics.find(m => m.metricName === 'churn_rate')?.value || 5
      const acquisitionRate = customerMetrics.find(m => m.metricName === 'acquisition_rate')?.value || 15
      const retentionRate = customerMetrics.find(m => m.metricName === 'retention_rate')?.value || 85

      // Platform distribution (mock data for now)
      const platformDistribution = [
        { platform: 'Analytics Dashboard', users: Math.floor(activeUsers * 0.4), percentage: 40 },
        { platform: 'Multi-tenant Management', users: Math.floor(activeUsers * 0.35), percentage: 35 },
        { platform: 'API Documentation', users: Math.floor(activeUsers * 0.25), percentage: 25 }
      ]

      return {
        revenue: {
          current: currentRevenue,
          previous: previousRevenue,
          trend: revenueGrowth > 0 ? 'UP' : revenueGrowth < 0 ? 'DOWN' : 'STABLE',
          target: currentRevenue * 1.2, // 20% growth target
          growth: revenueGrowth
        },
        usage: {
          activeUsers: Math.floor(activeUsers),
          totalSessions: Math.floor(totalSessions),
          averageSessionDuration: Math.floor(avgSessionDuration),
          platformDistribution
        },
        performance: {
          averageResponseTime: Math.floor(avgResponseTime),
          uptime: Math.round(uptime * 100) / 100,
          errorRate: Math.round(errorRate * 100) / 100,
          throughput: Math.floor(throughput)
        },
        customer: {
          satisfaction: Math.round(satisfaction),
          churnRate: Math.round(churnRate * 100) / 100,
          acquisitionRate: Math.round(acquisitionRate * 100) / 100,
          retentionRate: Math.round(retentionRate * 100) / 100
        }
      }
    } catch (error) {
      console.error('Error fetching business intelligence data:', error)
      // Return default data
      return {
        revenue: { current: 0, previous: 0, trend: 'STABLE', target: 0, growth: 0 },
        usage: { activeUsers: 0, totalSessions: 0, averageSessionDuration: 0, platformDistribution: [] },
        performance: { averageResponseTime: 0, uptime: 99.9, errorRate: 0, throughput: 0 },
        customer: { satisfaction: 85, churnRate: 5, acquisitionRate: 15, retentionRate: 85 }
      }
    }
  }

  static async createMetric(metric: Omit<BusinessMetric, 'id' | 'timestamp'>): Promise<BusinessMetric | null> {
    try {
      const created = await prisma.businessIntelligenceMetric.create({
        data: {
          category: metric.category.toUpperCase(),
          metricName: metric.metricName,
          value: metric.value,
          previousValue: metric.previousValue ?? undefined,
          target: metric.target ?? undefined,
          unit: metric.unit || undefined,
          percentage: metric.percentage ?? undefined,
          trend: metric.trend,
          period: metric.period,
          dimensions: metric.dimensions
        }
      })

      return {
        ...created,
        period: created.period as 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY',
        trend: created.trend as 'UP' | 'DOWN' | 'STABLE',
        previousValue: created.previousValue ?? undefined,
        target: created.target ?? undefined,
        unit: created.unit || undefined,
        percentage: created.percentage ?? undefined
      }
    } catch (error) {
      console.error('Error creating business metric:', error)
      return null
    }
  }

  static async generatePredictiveAnalytics(category: string, days: number = 30): Promise<any> {
    try {
      const metrics = await this.getMetricsByCategory(category, 'DAILY', days)
      
      if (metrics.length < 7) {
        return null
      }

      // Simple linear regression for trend prediction
      const values = metrics.slice(0, 7).reverse().map(m => m.value)
      const n = values.length
      const xSum = values.reduce((sum, _, i) => sum + i, 0)
      const ySum = values.reduce((sum, val) => sum + val, 0)
      const xySum = values.reduce((sum, val, i) => sum + (i * val), 0)
      const x2Sum = values.reduce((sum, _, i) => sum + (i * i), 0)

      const slope = (n * xySum - xSum * ySum) / (n * x2Sum - xSum * xSum)
      const intercept = (ySum - slope * xSum) / n

      // Predict next 7 days
      const predictions = []
      for (let i = n; i < n + 7; i++) {
        const predictedValue = slope * i + intercept
        predictions.push({
          day: i - n + 1,
          predicted: Math.max(0, predictedValue),
          confidence: Math.max(0, 100 - (i - n) * 10) // Decreasing confidence
        })
      }

      return {
        category,
        trend: slope > 0 ? 'INCREASING' : slope < 0 ? 'DECREASING' : 'STABLE',
        slope: Math.round(slope * 100) / 100,
        predictions,
        accuracy: 85 - Math.min(20, Math.abs(slope) * 5) // Mock accuracy
      }
    } catch (error) {
      console.error('Error generating predictive analytics:', error)
      return null
    }
  }
}
