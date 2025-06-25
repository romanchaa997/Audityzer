
import { User as PrismaUser, Platform as PrismaPlatform, PlatformAccess, AuditLog, SystemMetric, Notification } from '@prisma/client'

export interface User extends PrismaUser {
  _count?: {
    platformAccess: number
  }
}

export interface Platform extends PrismaPlatform {
  _count?: {
    platformAccess: number
    systemMetrics: number
  }
}

export interface ExtendedPlatformAccess extends PlatformAccess {
  user: Pick<User, 'id' | 'name' | 'email'>
  platform: Pick<Platform, 'id' | 'name' | 'displayName'>
}

export interface ExtendedAuditLog extends AuditLog {
  user?: Pick<User, 'name' | 'email'> | null
}

export interface ExtendedSystemMetric extends SystemMetric {
  platform: Pick<Platform, 'name' | 'displayName'>
}

export interface DashboardData {
  overview: {
    totalUsers: number
    activeUsers: number
    totalPlatforms: number
    activePlatforms: number
    userGrowth: number
    systemLoad: number
  }
  recentActivity: ExtendedAuditLog[]
  platformHealth: PlatformHealthData[]
  userActivity: UserActivityData[]
  platformMetrics: ExtendedSystemMetric[]
}

export interface PlatformHealthData {
  id: string
  name: string
  status: string
  health: number
  uptime: number
  responseTime: number
  errors: number
}

export interface UserActivityData {
  date: string
  count: number
}

export interface SystemHealthData {
  cpu: number
  memory: number
  disk: number
  network: number
  uptime: string
  lastBackup: string
  securityStatus: string
}

export interface NotificationData extends Notification {
  user: Pick<User, 'name' | 'email'>
}

// NextAuth types extension
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role?: string
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
    image?: string | null
    role?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role?: string
  }
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  pages: number
}

// Form types
export interface CreateUserForm {
  name: string
  email: string
  password: string
  role: string
  department?: string
  position?: string
}

export interface SignInForm {
  email: string
  password: string
}

export interface UpdateUserForm {
  name?: string
  email?: string
  role?: string
  department?: string
  position?: string
  status?: string
}

// Chart data types
export interface ChartDataPoint {
  name: string
  value: number
  color?: string
}

export interface TimeSeriesDataPoint {
  timestamp: string
  value: number
  label?: string
}

export interface MultiSeriesDataPoint {
  timestamp: string
  [key: string]: number | string
}

// Platform integration types
export interface PlatformIntegrationConfig {
  title: string
  description: string
  url: string
  healthCheckEndpoint?: string
  embedEnabled: boolean
  ssoEnabled: boolean
}

export interface PlatformHealthStatus {
  platform: string
  status: 'online' | 'offline' | 'maintenance' | 'error'
  lastChecked: string
  responseTime?: number
  version?: string
}

// Role and permission types
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'USER' | 'VIEWER'
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING'
export type PlatformStatus = 'ACTIVE' | 'MAINTENANCE' | 'INACTIVE' | 'ERROR'
export type NotificationType = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR' | 'ALERT'

export interface Permission {
  read: boolean
  write: boolean
  delete: boolean
  admin: boolean
}

export interface RolePermissions {
  [key: string]: Permission
}

// Search and filter types
export interface SearchFilters {
  search?: string
  status?: string
  role?: string
  department?: string
  platform?: string
  dateFrom?: string
  dateTo?: string
}

export interface SortOptions {
  field: string
  direction: 'asc' | 'desc'
}

// Export configuration
export interface ExportConfig {
  format: 'csv' | 'xlsx' | 'pdf'
  fields: string[]
  filters?: SearchFilters
  dateRange?: {
    from: string
    to: string
  }
}
