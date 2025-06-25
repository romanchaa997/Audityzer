
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/db'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret'
const MASTER_TOKEN_EXPIRY = '24h'
const PLATFORM_TOKEN_EXPIRY = '12h'

export interface MasterTokenPayload {
  userId: string
  email: string
  role: string
  sessionId: string
  platforms: string[]
  iat?: number
  exp?: number
}

export interface PlatformTokenPayload {
  userId: string
  email: string
  role: string
  platformId: string
  masterSessionId: string
  permissions: string[]
  iat?: number
  exp?: number
}

export class JWTManager {
  static generateMasterToken(payload: Omit<MasterTokenPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: MASTER_TOKEN_EXPIRY })
  }

  static generatePlatformToken(payload: Omit<PlatformTokenPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: PLATFORM_TOKEN_EXPIRY })
  }

  static verifyMasterToken(token: string): MasterTokenPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as MasterTokenPayload
    } catch (error) {
      console.error('Invalid master token:', error)
      return null
    }
  }

  static verifyPlatformToken(token: string): PlatformTokenPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as PlatformTokenPayload
    } catch (error) {
      console.error('Invalid platform token:', error)
      return null
    }
  }

  static async createCrossPlatformSession(
    userId: string,
    integrationId: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        platformAccess: {
          include: {
            platform: true
          }
        }
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    const platforms = user.platformAccess.map(access => access.platform.name)
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const masterToken = this.generateMasterToken({
      userId,
      email: user.email,
      role: user.role,
      sessionId,
      platforms
    })

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    const session = await prisma.crossPlatformSession.create({
      data: {
        userId,
        masterToken,
        integrationId,
        expiresAt,
        ipAddress,
        userAgent,
        active: true
      }
    })

    return {
      session,
      masterToken,
      expiresAt
    }
  }

  static async generatePlatformAccessToken(
    masterToken: string,
    platformId: string
  ) {
    const payload = this.verifyMasterToken(masterToken)
    if (!payload) {
      throw new Error('Invalid master token')
    }

    const session = await prisma.crossPlatformSession.findUnique({
      where: { masterToken },
      include: {
        user: {
          include: {
            platformAccess: {
              where: {
                platform: {
                  name: platformId
                }
              },
              include: {
                platform: true
              }
            }
          }
        }
      }
    })

    if (!session || !session.active || session.expiresAt < new Date()) {
      throw new Error('Invalid or expired session')
    }

    const platformAccess = session.user.platformAccess.find(
      access => access.platform.name === platformId
    )

    if (!platformAccess) {
      throw new Error('User does not have access to this platform')
    }

    const permissions = platformAccess.permissions as string[] || []

    const platformToken = this.generatePlatformToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      platformId,
      masterSessionId: session.id,
      permissions
    })

    // Update session with platform token
    await prisma.crossPlatformSession.update({
      where: { id: session.id },
      data: {
        platformToken,
        lastAccessed: new Date()
      }
    })

    return {
      platformToken,
      permissions,
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000) // 12 hours
    }
  }

  static async validateAndRefreshSession(masterToken: string) {
    const session = await prisma.crossPlatformSession.findUnique({
      where: { masterToken },
      include: {
        user: true,
        integration: true
      }
    })

    if (!session || !session.active) {
      return null
    }

    if (session.expiresAt < new Date()) {
      // Mark session as inactive
      await prisma.crossPlatformSession.update({
        where: { id: session.id },
        data: { active: false }
      })
      return null
    }

    // Update last accessed
    await prisma.crossPlatformSession.update({
      where: { id: session.id },
      data: { lastAccessed: new Date() }
    })

    return session
  }

  static async revokeCrossPlatformSession(masterToken: string) {
    return await prisma.crossPlatformSession.update({
      where: { masterToken },
      data: { active: false }
    })
  }

  static async revokeAllUserSessions(userId: string) {
    return await prisma.crossPlatformSession.updateMany({
      where: { userId },
      data: { active: false }
    })
  }

  static async cleanupExpiredSessions() {
    return await prisma.crossPlatformSession.updateMany({
      where: {
        expiresAt: { lt: new Date() },
        active: true
      },
      data: { active: false }
    })
  }
}

export default JWTManager
