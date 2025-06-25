
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Globe, 
  Key, 
  Link, 
  RefreshCw, 
  Settings, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  ExternalLink,
  Shield,
  Database,
  Users,
  Activity
} from 'lucide-react'
import { format } from 'date-fns'

interface PlatformIntegration {
  id: string
  platformName: string
  displayName: string
  baseUrl: string
  status: 'CONNECTED' | 'DISCONNECTED' | 'ERROR' | 'MAINTENANCE' | 'SYNCING'
  lastSync: string
  healthEndpoint?: string
  config?: any
  connectionLogs: Array<{
    id: string
    status: string
    responseTime?: number
    statusCode?: number
    timestamp: string
    errorMessage?: string
  }>
}

interface CrossPlatformSession {
  id: string
  userId: string
  masterToken: string
  platformToken?: string
  expiresAt: string
  lastAccessed: string
  active: boolean
  user: {
    email: string
    name?: string
  }
  integration: {
    displayName: string
  }
}

export default function CrossPlatformManager() {
  const [platforms, setPlatforms] = useState<PlatformIntegration[]>([])
  const [sessions, setSessions] = useState<CrossPlatformSession[]>([])
  const [loading, setLoading] = useState(true)
  const [testingConnection, setTestingConnection] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformIntegration | null>(null)

  const fetchPlatformData = async () => {
    try {
      const [platformsResponse, sessionsResponse] = await Promise.all([
        fetch('/api/system/health'),
        fetch('/api/auth/cross-platform')
      ])

      if (platformsResponse.ok) {
        const platformData = await platformsResponse.json()
        setPlatforms(platformData.platforms || [])
      }

      // Note: sessions endpoint might not exist yet, handle gracefully
      if (sessionsResponse.ok) {
        const sessionData = await sessionsResponse.json()
        setSessions(sessionData.sessions || [])
      }
    } catch (error) {
      console.error('Error fetching platform data:', error)
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async (platformId: string) => {
    setTestingConnection(platformId)
    try {
      await fetch('/api/system/health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platformId })
      })
      await fetchPlatformData()
    } catch (error) {
      console.error('Error testing connection:', error)
    } finally {
      setTestingConnection(null)
    }
  }

  const createCrossPlatformSession = async (platformId: string) => {
    try {
      const response = await fetch('/api/auth/cross-platform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platformId })
      })

      if (response.ok) {
        const data = await response.json()
        // Handle successful session creation
        await fetchPlatformData()
        return data
      }
    } catch (error) {
      console.error('Error creating cross-platform session:', error)
    }
  }

  useEffect(() => {
    fetchPlatformData()
    const interval = setInterval(fetchPlatformData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONNECTED':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'ERROR':
        return <XCircle className="h-4 w-4 text-red-400" />
      case 'MAINTENANCE':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case 'SYNCING':
        return <RefreshCw className="h-4 w-4 text-blue-400 animate-spin" />
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONNECTED': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'ERROR': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'MAINTENANCE': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'SYNCING': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Globe className="h-8 w-8 animate-pulse text-blue-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading platform integrations...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Cross-Platform Manager</h2>
          <p className="text-gray-400">Manage integrations and connections across all Audityzer platforms</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => fetchPlatformData()}
            variant="outline"
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Platforms
            </CardTitle>
            <Globe className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {platforms.length}
            </div>
            <p className="text-xs text-gray-400">
              Integrated platforms
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Connected
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {platforms.filter(p => p.status === 'CONNECTED').length}
            </div>
            <p className="text-xs text-gray-400">
              Active connections
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Errors
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {platforms.filter(p => p.status === 'ERROR').length}
            </div>
            <p className="text-xs text-gray-400">
              Connection issues
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Active Sessions
            </CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {sessions.filter(s => s.active).length}
            </div>
            <p className="text-xs text-gray-400">
              Cross-platform sessions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Management Tabs */}
      <Tabs defaultValue="platforms" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="platforms" className="data-[state=active]:bg-gray-700">
            Platform Status
          </TabsTrigger>
          <TabsTrigger value="sessions" className="data-[state=active]:bg-gray-700">
            Active Sessions
          </TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-gray-700">
            Connection Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {platforms.map((platform) => (
              <Card key={platform.id} className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(platform.status)}
                      <div>
                        <CardTitle className="text-white">{platform.displayName}</CardTitle>
                        <CardDescription>{platform.platformName}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(platform.status)}>
                      {platform.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400">Base URL:</span>
                      <span className="text-white font-mono text-xs">{platform.baseUrl}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(platform.baseUrl, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    {platform.healthEndpoint && (
                      <div className="flex items-center gap-2 text-sm">
                        <Activity className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-400">Health Check:</span>
                        <span className="text-white font-mono text-xs">{platform.healthEndpoint}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm">
                      <RefreshCw className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400">Last Sync:</span>
                      <span className="text-white">
                        {platform.lastSync ? format(new Date(platform.lastSync), 'MMM dd, HH:mm') : 'Never'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Button
                      onClick={() => testConnection(platform.platformName)}
                      disabled={testingConnection === platform.platformName}
                      variant="outline"
                      size="sm"
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${testingConnection === platform.platformName ? 'animate-spin' : ''}`} />
                      Test Connection
                    </Button>
                    
                    <Button
                      onClick={() => createCrossPlatformSession(platform.platformName)}
                      size="sm"
                      disabled={platform.status !== 'CONNECTED'}
                    >
                      <Key className="h-4 w-4 mr-2" />
                      Create Session
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedPlatform(platform)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-white">{platform.displayName}</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Platform integration details and configuration
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-white mb-2">Connection Info</h4>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="text-gray-400">Platform ID:</span>
                                  <span className="text-white ml-2 font-mono">{platform.platformName}</span>
                                </div>
                                <div>
                                  <span className="text-gray-400">Status:</span>
                                  <Badge className={`ml-2 ${getStatusColor(platform.status)}`}>
                                    {platform.status}
                                  </Badge>
                                </div>
                                <div>
                                  <span className="text-gray-400">Base URL:</span>
                                  <span className="text-white ml-2 font-mono text-xs break-all">{platform.baseUrl}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-white mb-2">Recent Activity</h4>
                              <div className="space-y-2">
                                {platform.connectionLogs.slice(0, 3).map((log) => (
                                  <div key={log.id} className="text-xs">
                                    <div className="flex items-center gap-2">
                                      {log.status === 'SUCCESS' ? (
                                        <CheckCircle className="h-3 w-3 text-green-400" />
                                      ) : (
                                        <XCircle className="h-3 w-3 text-red-400" />
                                      )}
                                      <span className="text-gray-400">
                                        {format(new Date(log.timestamp), 'HH:mm:ss')}
                                      </span>
                                      {log.responseTime && (
                                        <span className="text-gray-500">
                                          {log.responseTime}ms
                                        </span>
                                      )}
                                    </div>
                                    {log.errorMessage && (
                                      <div className="text-red-400 ml-5">
                                        {log.errorMessage}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {platform.config && (
                            <div>
                              <h4 className="font-medium text-white mb-2">Configuration</h4>
                              <pre className="text-xs bg-gray-900 p-3 rounded-lg text-gray-400 overflow-auto max-h-32">
                                {JSON.stringify(platform.config, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                Active Cross-Platform Sessions
              </CardTitle>
              <CardDescription>
                Currently active user sessions across platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sessions.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                  <p>No active cross-platform sessions</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-gray-800/30">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-400 rounded-full" />
                          <span className="font-medium text-white">
                            {session.user.name || session.user.email}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {session.integration.displayName}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {session.active ? 'Active' : 'Expired'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <div>
                          Last accessed: {format(new Date(session.lastAccessed), 'HH:mm')}
                        </div>
                        <div>
                          Expires: {format(new Date(session.expiresAt), 'MMM dd, HH:mm')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-400" />
                Connection Logs
              </CardTitle>
              <CardDescription>
                Recent connection attempts and health checks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {platforms.map((platform) =>
                  platform.connectionLogs.slice(0, 2).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-gray-800/30">
                      <div className="flex items-center gap-4">
                        {log.status === 'SUCCESS' ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-400" />
                        )}
                        <div>
                          <div className="font-medium text-white">
                            {platform.displayName}
                          </div>
                          <div className="text-sm text-gray-400">
                            {log.errorMessage || 'Health check successful'}
                          </div>
                        </div>
                        {log.responseTime && (
                          <Badge variant="outline" className="text-xs">
                            {log.responseTime}ms
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {format(new Date(log.timestamp), 'MMM dd, HH:mm:ss')}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
