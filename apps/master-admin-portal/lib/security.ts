
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'

const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

export class SecurityManager {
  static async checkAccountLockout(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return false
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return true // Account is locked
    }

    return false
  }

  static async recordFailedLogin(email: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return
    }

    const failedAttempts = user.failedLoginAttempts + 1
    const updateData: any = {
      failedLoginAttempts: failedAttempts
    }

    if (failedAttempts >= MAX_LOGIN_ATTEMPTS) {
      updateData.lockedUntil = new Date(Date.now() + LOCKOUT_DURATION)
    }

    await prisma.user.update({
      where: { email },
      data: updateData
    })

    // Log security event
    await this.logSecurityEvent({
      userId: user.id,
      action: 'FAILED_LOGIN_ATTEMPT',
      details: {
        email,
        attemptCount: failedAttempts,
        locked: failedAttempts >= MAX_LOGIN_ATTEMPTS
      }
    })
  }

  static async recordSuccessfulLogin(userId: string, ipAddress?: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLogin: new Date()
      }
    })

    // Log security event
    await this.logSecurityEvent({
      userId,
      action: 'SUCCESSFUL_LOGIN',
      details: {
        ipAddress,
        timestamp: new Date()
      }
    })
  }

  static async logSecurityEvent(event: {
    userId: string
    action: string
    details: any
    ipAddress?: string
    userAgent?: string
  }): Promise<void> {
    await prisma.auditLog.create({
      data: {
        userId: event.userId,
        action: event.action,
        resource: 'AUTHENTICATION',
        details: event.details,
        ipAddress: event.ipAddress,
        userAgent: event.userAgent,
        platform: 'MASTER_PORTAL'
      }
    })
  }

  static async detectSuspiciousActivity(userId: string): Promise<boolean> {
    const recentLogins = await prisma.auditLog.findMany({
      where: {
        userId,
        action: 'SUCCESSFUL_LOGIN',
        timestamp: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      },
      orderBy: { timestamp: 'desc' },
      take: 10
    })

    // Check for multiple logins from different IPs
    const uniqueIPs = new Set(
      recentLogins
        .map(log => log.ipAddress)
        .filter(ip => ip !== null)
    )

    if (uniqueIPs.size > 3) {
      await this.createSecurityAlert({
        title: 'Suspicious Login Activity',
        message: `User has logged in from ${uniqueIPs.size} different IP addresses in the last 24 hours`,
        severity: 'MEDIUM',
        category: 'SECURITY',
        metadata: {
          userId,
          uniqueIPs: Array.from(uniqueIPs),
          loginCount: recentLogins.length
        }
      })
      return true
    }

    return false
  }

  static async createSecurityAlert(alert: {
    title: string
    message: string
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    category: string
    platform?: string
    metadata?: any
  }): Promise<void> {
    await prisma.systemAlert.create({
      data: {
        title: alert.title,
        message: alert.message,
        severity: alert.severity,
        category: alert.category,
        platform: alert.platform,
        metadata: alert.metadata
      }
    })

    // If critical, also create notifications for admins
    if (alert.severity === 'CRITICAL') {
      const admins = await prisma.user.findMany({
        where: {
          role: {
            in: ['SUPER_ADMIN', 'ADMIN']
          },
          status: 'ACTIVE'
        }
      })

      for (const admin of admins) {
        await prisma.notification.create({
          data: {
            userId: admin.id,
            title: `🚨 Critical Security Alert`,
            message: alert.message,
            type: 'ERROR',
            platform: 'MASTER_PORTAL'
          }
        })
      }
    }
  }

  static async validatePasswordStrength(password: string): Promise<{
    isValid: boolean
    errors: string[]
  }> {
    const errors: string[] = []

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number')
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
  }

  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  static generateSecureToken(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  static async cleanupOldAuditLogs(retentionDays: number = 90): Promise<void> {
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000)
    
    await prisma.auditLog.deleteMany({
      where: {
        timestamp: {
          lt: cutoffDate
        }
      }
    })
  }
}

export default SecurityManager
