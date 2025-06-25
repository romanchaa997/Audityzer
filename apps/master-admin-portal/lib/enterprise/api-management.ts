
import { prisma } from '@/lib/db'
import { subDays, subHours, format } from 'date-fns'

export interface ApiEndpoint {
  id: string
  apiName: string
  endpoint: string
  method: string
  description?: string
  version: string
  rateLimitPeriod: string
  rateLimitCount: number
  authRequired: boolean
  roles?: string[]
  status: 'ACTIVE' | 'DEPRECATED' | 'MAINTENANCE' | 'INACTIVE'
  documentation?: string
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface ApiAnalytics {
  id: string
  apiId: string
  timestamp: Date
  responseTime: number
  statusCode: number
  userAgent?: string
  ipAddress?: string
  userId?: string
  errorMessage?: string
  requestSize?: number
  responseSize?: number
}

export interface ApiDashboard {
  summary: {
    totalEndpoints: number
    activeEndpoints: number
    totalRequests: number
    errorRate: number
    avgResponseTime: number
    uptime: number
  }
  topEndpoints: {
    endpoint: string
    method: string
    requests: number
    avgResponseTime: number
    errorRate: number
  }[]
  statusCodeDistribution: {
    statusCode: number
    count: number
    percentage: number
  }[]
  trafficTrends: {
    time: string
    requests: number
    errors: number
    avgResponseTime: number
  }[]
  geographicDistribution: {
    country: string
    requests: number
    percentage: number
  }[]
  rateLimitingStats: {
    endpoint: string
    limit: number
    current: number
    breaches: number
  }[]
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: Date
  blocked?: boolean
}

export class ApiManagementService {
  static async createApiEndpoint(data: {
    apiName: string
    endpoint: string
    method: string
    description?: string
    version?: string
    rateLimitPeriod?: string
    rateLimitCount?: number
    authRequired?: boolean
    roles?: string[]
    documentation?: string
    tags?: string[]
  }): Promise<ApiEndpoint | null> {
    try {
      const apiEndpoint = await prisma.apiManagement.create({
        data: {
          apiName: data.apiName,
          endpoint: data.endpoint,
          method: data.method.toUpperCase(),
          description: data.description,
          version: data.version || '1.0',
          rateLimitPeriod: data.rateLimitPeriod || 'MINUTE',
          rateLimitCount: data.rateLimitCount || 100,
          authRequired: data.authRequired ?? true,
          roles: data.roles,
          documentation: data.documentation,
          tags: data.tags
        }
      })

      return {
        ...apiEndpoint,
        description: apiEndpoint.description || undefined,
        documentation: apiEndpoint.documentation || undefined,
        roles: apiEndpoint.roles as string[] | undefined,
        tags: apiEndpoint.tags as string[] | undefined
      }
    } catch (error) {
      console.error('Error creating API endpoint:', error)
      return null
    }
  }

  static async logApiRequest(data: {
    apiId: string
    responseTime: number
    statusCode: number
    userAgent?: string
    ipAddress?: string
    userId?: string
    errorMessage?: string
    requestSize?: number
    responseSize?: number
  }): Promise<boolean> {
    try {
      await prisma.apiAnalytics.create({
        data: {
          apiId: data.apiId,
          responseTime: data.responseTime,
          statusCode: data.statusCode,
          userAgent: data.userAgent,
          ipAddress: data.ipAddress,
          userId: data.userId,
          errorMessage: data.errorMessage,
          requestSize: data.requestSize,
          responseSize: data.responseSize
        }
      })

      return true
    } catch (error) {
      console.error('Error logging API request:', error)
      return false
    }
  }

  static async checkRateLimit(
    apiId: string, 
    userId?: string, 
    ipAddress?: string
  ): Promise<RateLimitResult> {
    try {
      const api = await prisma.apiManagement.findUnique({
        where: { id: apiId }
      })

      if (!api) {
        return { allowed: false, remaining: 0, resetTime: new Date() }
      }

      // Calculate time window based on rate limit period
      let timeWindow: Date
      switch (api.rateLimitPeriod) {
        case 'SECOND':
          timeWindow = subDays(new Date(), 0) // Current second
          break
        case 'MINUTE':
          timeWindow = subDays(new Date(), 0) // Current minute
          break
        case 'HOUR':
          timeWindow = subHours(new Date(), 1)
          break
        case 'DAY':
          timeWindow = subDays(new Date(), 1)
          break
        default:
          timeWindow = subDays(new Date(), 0)
      }

      // Count requests in the time window
      const requestCount = await prisma.apiAnalytics.count({
        where: {
          apiId,
          timestamp: { gte: timeWindow },
          ...(userId && { userId }),
          ...(ipAddress && { ipAddress })
        }
      })

      const remaining = Math.max(0, api.rateLimitCount - requestCount)
      const allowed = requestCount < api.rateLimitCount

      // Calculate reset time
      const resetTime = new Date()
      switch (api.rateLimitPeriod) {
        case 'SECOND':
          resetTime.setSeconds(resetTime.getSeconds() + 1)
          break
        case 'MINUTE':
          resetTime.setMinutes(resetTime.getMinutes() + 1)
          break
        case 'HOUR':
          resetTime.setHours(resetTime.getHours() + 1)
          break
        case 'DAY':
          resetTime.setDate(resetTime.getDate() + 1)
          break
      }

      return {
        allowed,
        remaining,
        resetTime,
        blocked: !allowed
      }
    } catch (error) {
      console.error('Error checking rate limit:', error)
      return { allowed: false, remaining: 0, resetTime: new Date() }
    }
  }

  static async getApiDashboard(timeRange: string = '24h'): Promise<ApiDashboard> {
    try {
      const hours = timeRange.includes('h') ? parseInt(timeRange.replace('h', '')) : 24
      const startTime = subHours(new Date(), hours)

      // Get API analytics data
      const analytics = await prisma.apiAnalytics.findMany({
        where: {
          timestamp: { gte: startTime }
        },
        include: {
          api: true
        }
      })

      // Get all APIs
      const apis = await prisma.apiManagement.findMany()

      // Calculate summary
      const totalEndpoints = apis.length
      const activeEndpoints = apis.filter(api => api.status === 'ACTIVE').length
      const totalRequests = analytics.length
      const errorRequests = analytics.filter(a => a.statusCode >= 400).length
      const errorRate = totalRequests > 0 ? (errorRequests / totalRequests) * 100 : 0
      const avgResponseTime = analytics.length > 0 
        ? analytics.reduce((sum, a) => sum + a.responseTime, 0) / analytics.length 
        : 0
      const uptime = 99.9 // Mock uptime calculation

      // Top endpoints
      const endpointMap = new Map<string, {
        requests: number
        responseTime: number
        errors: number
        api: any
      }>()

      analytics.forEach(analytic => {
        const key = `${analytic.api.endpoint}-${analytic.api.method}`
        const existing = endpointMap.get(key) || { 
          requests: 0, 
          responseTime: 0, 
          errors: 0, 
          api: analytic.api 
        }
        
        endpointMap.set(key, {
          requests: existing.requests + 1,
          responseTime: existing.responseTime + analytic.responseTime,
          errors: existing.errors + (analytic.statusCode >= 400 ? 1 : 0),
          api: analytic.api
        })
      })

      const topEndpoints = Array.from(endpointMap.entries())
        .map(([key, data]) => ({
          endpoint: data.api.endpoint,
          method: data.api.method,
          requests: data.requests,
          avgResponseTime: data.requests > 0 ? data.responseTime / data.requests : 0,
          errorRate: data.requests > 0 ? (data.errors / data.requests) * 100 : 0
        }))
        .sort((a, b) => b.requests - a.requests)
        .slice(0, 10)

      // Status code distribution
      const statusCodeMap = new Map<number, number>()
      analytics.forEach(analytic => {
        const count = statusCodeMap.get(analytic.statusCode) || 0
        statusCodeMap.set(analytic.statusCode, count + 1)
      })

      const statusCodeDistribution = Array.from(statusCodeMap.entries())
        .map(([statusCode, count]) => ({
          statusCode,
          count,
          percentage: totalRequests > 0 ? (count / totalRequests) * 100 : 0
        }))
        .sort((a, b) => b.count - a.count)

      // Traffic trends (hourly)
      const trafficTrends = []
      for (let i = hours - 1; i >= 0; i--) {
        const hourStart = subHours(new Date(), i)
        const hourEnd = subHours(new Date(), i - 1)
        
        const hourAnalytics = analytics.filter(a => 
          a.timestamp >= hourStart && a.timestamp < hourEnd
        )
        
        trafficTrends.push({
          time: format(hourStart, 'HH:mm'),
          requests: hourAnalytics.length,
          errors: hourAnalytics.filter(a => a.statusCode >= 400).length,
          avgResponseTime: hourAnalytics.length > 0 
            ? hourAnalytics.reduce((sum, a) => sum + a.responseTime, 0) / hourAnalytics.length 
            : 0
        })
      }

      // Geographic distribution (mock data)
      const geographicDistribution = [
        { country: 'United States', requests: Math.floor(totalRequests * 0.4), percentage: 40 },
        { country: 'United Kingdom', requests: Math.floor(totalRequests * 0.2), percentage: 20 },
        { country: 'Germany', requests: Math.floor(totalRequests * 0.15), percentage: 15 },
        { country: 'Canada', requests: Math.floor(totalRequests * 0.1), percentage: 10 },
        { country: 'Others', requests: Math.floor(totalRequests * 0.15), percentage: 15 }
      ]

      // Rate limiting stats
      const rateLimitingStats = await Promise.all(
        apis.slice(0, 5).map(async api => {
          const recentRequests = await prisma.apiAnalytics.count({
            where: {
              apiId: api.id,
              timestamp: { gte: subHours(new Date(), 1) }
            }
          })

          return {
            endpoint: `${api.method} ${api.endpoint}`,
            limit: api.rateLimitCount,
            current: recentRequests,
            breaches: Math.max(0, recentRequests - api.rateLimitCount)
          }
        })
      )

      return {
        summary: {
          totalEndpoints,
          activeEndpoints,
          totalRequests,
          errorRate: Math.round(errorRate * 100) / 100,
          avgResponseTime: Math.round(avgResponseTime),
          uptime: Math.round(uptime * 100) / 100
        },
        topEndpoints,
        statusCodeDistribution,
        trafficTrends,
        geographicDistribution,
        rateLimitingStats
      }
    } catch (error) {
      console.error('Error fetching API dashboard:', error)
      return {
        summary: {
          totalEndpoints: 0,
          activeEndpoints: 0,
          totalRequests: 0,
          errorRate: 0,
          avgResponseTime: 0,
          uptime: 99.9
        },
        topEndpoints: [],
        statusCodeDistribution: [],
        trafficTrends: [],
        geographicDistribution: [],
        rateLimitingStats: []
      }
    }
  }

  static async getApiEndpoints(filters: {
    status?: string
    method?: string
    search?: string
    limit?: number
    offset?: number
  } = {}): Promise<ApiEndpoint[]> {
    try {
      const endpoints = await prisma.apiManagement.findMany({
        where: {
          ...(filters.status && { status: filters.status as any }),
          ...(filters.method && { method: filters.method }),
          ...(filters.search && {
            OR: [
              { apiName: { contains: filters.search, mode: 'insensitive' } },
              { endpoint: { contains: filters.search, mode: 'insensitive' } },
              { description: { contains: filters.search, mode: 'insensitive' } }
            ]
          })
        },
        orderBy: { createdAt: 'desc' },
        take: filters.limit || 50,
        skip: filters.offset || 0
      })

      return endpoints.map(endpoint => ({
        ...endpoint,
        description: endpoint.description || undefined,
        documentation: endpoint.documentation || undefined,
        roles: endpoint.roles as string[] | undefined,
        tags: endpoint.tags as string[] | undefined
      }))
    } catch (error) {
      console.error('Error fetching API endpoints:', error)
      return []
    }
  }

  static async updateApiStatus(
    apiId: string, 
    status: 'ACTIVE' | 'DEPRECATED' | 'MAINTENANCE' | 'INACTIVE'
  ): Promise<boolean> {
    try {
      await prisma.apiManagement.update({
        where: { id: apiId },
        data: { status }
      })

      return true
    } catch (error) {
      console.error('Error updating API status:', error)
      return false
    }
  }

  static async updateRateLimit(
    apiId: string,
    rateLimitCount: number,
    rateLimitPeriod: string
  ): Promise<boolean> {
    try {
      await prisma.apiManagement.update({
        where: { id: apiId },
        data: {
          rateLimitCount,
          rateLimitPeriod
        }
      })

      return true
    } catch (error) {
      console.error('Error updating rate limit:', error)
      return false
    }
  }

  static async getApiMetrics(apiId: string, timeRange: string = '24h'): Promise<any> {
    try {
      const hours = timeRange.includes('h') ? parseInt(timeRange.replace('h', '')) : 24
      const startTime = subHours(new Date(), hours)

      const analytics = await prisma.apiAnalytics.findMany({
        where: {
          apiId,
          timestamp: { gte: startTime }
        },
        orderBy: { timestamp: 'desc' }
      })

      const totalRequests = analytics.length
      const successfulRequests = analytics.filter(a => a.statusCode < 400).length
      const failedRequests = totalRequests - successfulRequests
      const avgResponseTime = analytics.length > 0
        ? analytics.reduce((sum, a) => sum + a.responseTime, 0) / analytics.length
        : 0

      const requestsByHour = []
      for (let i = hours - 1; i >= 0; i--) {
        const hourStart = subHours(new Date(), i)
        const hourEnd = subHours(new Date(), i - 1)
        
        const hourRequests = analytics.filter(a => 
          a.timestamp >= hourStart && a.timestamp < hourEnd
        )
        
        requestsByHour.push({
          hour: format(hourStart, 'HH:mm'),
          requests: hourRequests.length,
          avgResponseTime: hourRequests.length > 0
            ? hourRequests.reduce((sum, a) => sum + a.responseTime, 0) / hourRequests.length
            : 0
        })
      }

      return {
        summary: {
          totalRequests,
          successfulRequests,
          failedRequests,
          successRate: totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0,
          avgResponseTime: Math.round(avgResponseTime)
        },
        trends: requestsByHour,
        recentRequests: analytics.slice(0, 20)
      }
    } catch (error) {
      console.error('Error fetching API metrics:', error)
      return {
        summary: {
          totalRequests: 0,
          successfulRequests: 0,
          failedRequests: 0,
          successRate: 0,
          avgResponseTime: 0
        },
        trends: [],
        recentRequests: []
      }
    }
  }

  static async deleteApiEndpoint(apiId: string): Promise<boolean> {
    try {
      await prisma.apiManagement.update({
        where: { id: apiId },
        data: { status: 'INACTIVE' }
      })

      return true
    } catch (error) {
      console.error('Error deleting API endpoint:', error)
      return false
    }
  }
}
