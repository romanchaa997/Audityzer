
// Advanced caching layer for enterprise features
interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
}

class EnterpriseCache {
  private cache = new Map<string, CacheItem<any>>()
  private readonly defaultTTL = 5 * 60 * 1000 // 5 minutes

  set<T>(key: string, data: T, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data as T
  }

  invalidate(pattern: string): void {
    const regex = new RegExp(pattern)
    for (const key of Array.from(this.cache.keys())) {
      if (regex.test(key)) {
        this.cache.delete(key)
      }
    }
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }

  // Auto-cleanup expired items
  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of Array.from(this.cache.entries())) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key)
      }
    }
  }
}

export const enterpriseCache = new EnterpriseCache()

// Auto-cleanup every 5 minutes
setInterval(() => {
  enterpriseCache.cleanup()
}, 5 * 60 * 1000)

// Cache decorators for common patterns
export function cached(ttl?: number) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const cacheKey = `${target.constructor.name}.${propertyName}:${JSON.stringify(args)}`
      
      let result = enterpriseCache.get(cacheKey)
      if (result !== null) {
        return result
      }

      result = await method.apply(this, args)
      enterpriseCache.set(cacheKey, result, ttl)
      
      return result
    }

    return descriptor
  }
}

// Specialized cache keys for enterprise features
export const CacheKeys = {
  BUSINESS_INTELLIGENCE: (category: string, period: string) => `bi:${category}:${period}`,
  INCIDENTS: (filters: string) => `incidents:${filters}`,
  WORKFLOWS: (status: string) => `workflows:${status}`,
  THREATS: (severity: string) => `threats:${severity}`,
  COMPLIANCE: (framework: string) => `compliance:${framework}`,
  OPTIMIZATIONS: (platform: string) => `optimizations:${platform}`,
  API_METRICS: (apiId: string, timeRange: string) => `api:${apiId}:${timeRange}`,
  SYSTEM_HEALTH: (timeRange: string) => `health:${timeRange}`
}
