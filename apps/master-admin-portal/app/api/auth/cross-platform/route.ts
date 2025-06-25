
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { JWTManager } from '@/lib/jwt'
import { SecurityManager } from '@/lib/security'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic";

// Create cross-platform session
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { platformId } = await request.json()
    
    if (!platformId) {
      return NextResponse.json({ error: 'Platform ID is required' }, { status: 400 })
    }

    // Find the integration
    const integration = await prisma.systemIntegration.findUnique({
      where: { platformName: platformId }
    })

    if (!integration) {
      return NextResponse.json({ error: 'Platform integration not found' }, { status: 404 })
    }

    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Create cross-platform session
    const result = await JWTManager.createCrossPlatformSession(
      session.user.id,
      integration.id,
      ipAddress,
      userAgent
    )

    // Log the cross-platform session creation
    await SecurityManager.logSecurityEvent({
      userId: session.user.id,
      action: 'CROSS_PLATFORM_SESSION_CREATED',
      details: {
        platformId,
        integrationId: integration.id,
        sessionId: result.session.id
      },
      ipAddress,
      userAgent
    })

    return NextResponse.json({
      success: true,
      masterToken: result.masterToken,
      expiresAt: result.expiresAt,
      sessionId: result.session.id
    })

  } catch (error: any) {
    console.error('Error creating cross-platform session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Get platform access token
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const masterToken = searchParams.get('masterToken')
    const platformId = searchParams.get('platformId')

    if (!masterToken || !platformId) {
      return NextResponse.json({ error: 'Master token and platform ID are required' }, { status: 400 })
    }

    // Validate master token and generate platform token
    const result = await JWTManager.generatePlatformAccessToken(masterToken, platformId)

    return NextResponse.json({
      success: true,
      platformToken: result.platformToken,
      permissions: result.permissions,
      expiresAt: result.expiresAt
    })

  } catch (error: any) {
    console.error('Error generating platform token:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

// Validate session
export async function PUT(request: NextRequest) {
  try {
    const { masterToken } = await request.json()

    if (!masterToken) {
      return NextResponse.json({ error: 'Master token is required' }, { status: 400 })
    }

    const session = await JWTManager.validateAndRefreshSession(masterToken)

    if (!session) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        userId: session.userId,
        active: session.active,
        expiresAt: session.expiresAt,
        lastAccessed: session.lastAccessed,
        platform: session.integration.displayName
      }
    })

  } catch (error: any) {
    console.error('Error validating session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Revoke session
export async function DELETE(request: NextRequest) {
  try {
    const { masterToken } = await request.json()

    if (!masterToken) {
      return NextResponse.json({ error: 'Master token is required' }, { status: 400 })
    }

    await JWTManager.revokeCrossPlatformSession(masterToken)

    return NextResponse.json({ success: true, message: 'Session revoked successfully' })

  } catch (error: any) {
    console.error('Error revoking session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
