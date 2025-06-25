
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { 
  Shield, 
  AlertTriangle, 
  Lock, 
  Eye, 
  Users, 
  Activity,
  XCircle,
  CheckCircle,
  Clock,
  Globe,
  Smartphone
} from 'lucide-react'
import { format } from 'date-fns'

interface SecurityMetrics {
  totalAlerts: number
  criticalAlerts: number
  failedLoginsToday: number
  activeSessions: number
  suspiciousActivityEvents: number
}

interface SecurityAlert {
  id: string
  title: string
  message: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  category: string
  platform?: string
  resolved: boolean
  createdAt: string
  metadata?: any
}

interface FailedLogin {
  id: string
  action: string
  timestamp: string
  details: any
  ipAddress?: string
  user?: {
    email: string
    name?: string
  }
}

interface ActiveSession {
  id: string
  userId: string
  active: boolean
  expiresAt: string
  lastAccessed: string
  ipAddress?: string
  user: {
    email: string
    name?: string
  }
  integration: {
    displayName: string
  }
}

export default function SecurityCenter() {
  const [securityData, setSecurityData] = useState<{
    metrics: SecurityMetrics
    alerts: SecurityAlert[]
    failedLogins: FailedLogin[]
    activeSessions: ActiveSession[]
    recentEvents: any[]
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedAlert, setSelectedAlert] = useState<SecurityAlert | null>(null)
  const [alertResponse, setAlertResponse] = useState('')

  const fetchSecurityData = async () => {
    try {
      const response = await fetch('/api/auth/security')
      if (response.ok) {
        const data = await response.json()
        setSecurityData(data)
      }
    } catch (error) {
      console.error('Error fetching security data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAlertAction = async (alertId: string, action: string, comment?: string) => {
    try {
      await fetch('/api/auth/security', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alertId,
          action,
          comment
        })
      })
      await fetchSecurityData()
      setSelectedAlert(null)
      setAlertResponse('')
    } catch (error) {
      console.error('Error handling alert:', error)
    }
  }

  useEffect(() => {
    fetchSecurityData()
    const interval = setInterval(fetchSecurityData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'LOW': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return <XCircle className="h-4 w-4 text-red-400" />
      case 'HIGH': return <AlertTriangle className="h-4 w-4 text-orange-400" />
      case 'MEDIUM': return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case 'LOW': return <AlertTriangle className="h-4 w-4 text-blue-400" />
      default: return <AlertTriangle className="h-4 w-4 text-gray-400" />
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Shield className="h-8 w-8 animate-pulse text-blue-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading security center...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!securityData) {
    return (
      <Alert className="border-red-500/50 bg-red-500/10">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Security Error</AlertTitle>
        <AlertDescription>
          Failed to load security data. Please check your permissions and try again.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Security Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Security Center</h2>
          <p className="text-gray-400">Monitor security events and manage system access</p>
        </div>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          <Shield className="h-3 w-3 mr-1" />
          Protected
        </Badge>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {securityData.metrics.totalAlerts}
            </div>
            <p className="text-xs text-gray-400">
              {securityData.metrics.criticalAlerts} critical
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Failed Logins
            </CardTitle>
            <Lock className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {securityData.metrics.failedLoginsToday}
            </div>
            <p className="text-xs text-gray-400">
              Today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Active Sessions
            </CardTitle>
            <Users className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {securityData.metrics.activeSessions}
            </div>
            <p className="text-xs text-gray-400">
              Cross-platform
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Suspicious Activity
            </CardTitle>
            <Eye className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {securityData.metrics.suspiciousActivityEvents}
            </div>
            <p className="text-xs text-gray-400">
              This week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Security Score
            </CardTitle>
            <Shield className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              95%
            </div>
            <p className="text-xs text-gray-400">
              Excellent
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Security Tabs */}
      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="alerts" className="data-[state=active]:bg-gray-700">
            Security Alerts
          </TabsTrigger>
          <TabsTrigger value="sessions" className="data-[state=active]:bg-gray-700">
            Active Sessions
          </TabsTrigger>
          <TabsTrigger value="failed-logins" className="data-[state=active]:bg-gray-700">
            Failed Logins
          </TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-gray-700">
            Security Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Security Alerts
              </CardTitle>
              <CardDescription>
                Active security alerts requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              {securityData.alerts.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-400" />
                  <p>No active security alerts</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {securityData.alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start justify-between p-4 rounded-lg border border-gray-700 bg-gray-800/30">
                      <div className="flex items-start gap-3">
                        {getSeverityIcon(alert.severity)}
                        <div className="space-y-1">
                          <h4 className="font-medium text-white">{alert.title}</h4>
                          <p className="text-sm text-gray-400">{alert.message}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {format(new Date(alert.createdAt), 'MMM dd, yyyy HH:mm')}
                            </span>
                            {alert.platform && (
                              <Badge variant="outline" className="text-xs">
                                {alert.platform}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedAlert(alert)}
                            >
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-800 border-gray-700">
                            <DialogHeader>
                              <DialogTitle className="text-white">{alert.title}</DialogTitle>
                              <DialogDescription className="text-gray-400">
                                Security Alert Details
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium text-white mb-2">Message</h4>
                                <p className="text-gray-400">{alert.message}</p>
                              </div>
                              {alert.metadata && (
                                <div>
                                  <h4 className="font-medium text-white mb-2">Additional Details</h4>
                                  <pre className="text-xs bg-gray-900 p-3 rounded-lg text-gray-400 overflow-auto">
                                    {JSON.stringify(alert.metadata, null, 2)}
                                  </pre>
                                </div>
                              )}
                              <div>
                                <h4 className="font-medium text-white mb-2">Response</h4>
                                <Textarea
                                  placeholder="Add your response or resolution notes..."
                                  value={alertResponse}
                                  onChange={(e) => setAlertResponse(e.target.value)}
                                  className="bg-gray-900 border-gray-700"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  onClick={() => handleAlertAction(alert.id, 'ACKNOWLEDGE', alertResponse)}
                                  variant="outline"
                                  size="sm"
                                >
                                  Acknowledge
                                </Button>
                                <Button
                                  onClick={() => handleAlertAction(alert.id, 'RESOLVE', alertResponse)}
                                  size="sm"
                                >
                                  Resolve
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-green-400" />
                Active Cross-Platform Sessions
              </CardTitle>
              <CardDescription>
                Currently active user sessions across all platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityData.activeSessions.map((session) => (
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
                      {session.ipAddress && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Globe className="h-3 w-3" />
                          {session.ipAddress}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Last active: {format(new Date(session.lastAccessed), 'HH:mm')}
                      </div>
                      <div>
                        Expires: {format(new Date(session.expiresAt), 'MMM dd, HH:mm')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="failed-logins" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="h-5 w-5 text-red-400" />
                Recent Failed Login Attempts
              </CardTitle>
              <CardDescription>
                Failed authentication attempts in the last 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityData.failedLogins.map((attempt) => (
                  <div key={attempt.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-gray-800/30">
                    <div className="flex items-center gap-4">
                      <XCircle className="h-4 w-4 text-red-400" />
                      <div>
                        <div className="font-medium text-white">
                          {attempt.user?.email || 'Unknown user'}
                        </div>
                        <div className="text-sm text-gray-400">
                          Failed login attempt
                        </div>
                      </div>
                      {attempt.ipAddress && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Globe className="h-3 w-3" />
                          {attempt.ipAddress}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      {format(new Date(attempt.timestamp), 'MMM dd, HH:mm')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-400" />
                Recent Security Events
              </CardTitle>
              <CardDescription>
                Security-related events and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityData.recentEvents.slice(0, 10).map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-gray-800/30">
                    <div className="flex items-center gap-4">
                      <Activity className="h-4 w-4 text-blue-400" />
                      <div>
                        <div className="font-medium text-white">
                          {event.action.replace('_', ' ').toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </div>
                        <div className="text-sm text-gray-400">
                          {event.user?.email || 'System'}
                        </div>
                      </div>
                      {event.ipAddress && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Globe className="h-3 w-3" />
                          {event.ipAddress}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      {format(new Date(event.timestamp), 'MMM dd, HH:mm')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
