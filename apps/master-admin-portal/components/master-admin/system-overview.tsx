
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Activity, 
  Server, 
  Shield, 
  Database, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

interface SystemMetrics {
  system: string
  metrics: {
    [key: string]: {
      current: number
      average: number
      min: number
      max: number
      unit: string
      dataPoints: number
    }
  }
}

interface PlatformStatus {
  id: string
  name: string
  displayName: string
  status: 'CONNECTED' | 'DISCONNECTED' | 'ERROR' | 'MAINTENANCE'
  baseUrl: string
  lastSync: string
  recentLogs: any[]
}

export default function SystemOverview() {
  const [systemData, setSystemData] = useState<{
    summary: any
    platforms: PlatformStatus[]
    metrics: { [key: string]: SystemMetrics }
    alerts: any[]
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [timeRange, setTimeRange] = useState('1h')

  const fetchSystemData = async () => {
    try {
      const response = await fetch(`/api/system/health?timeRange=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setSystemData(data)
      }
    } catch (error) {
      console.error('Error fetching system data:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const triggerHealthCheck = async (platformId?: string) => {
    setRefreshing(true)
    try {
      await fetch('/api/system/health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platformId })
      })
      await fetchSystemData()
    } catch (error) {
      console.error('Error triggering health check:', error)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchSystemData()
    const interval = setInterval(fetchSystemData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [timeRange])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONNECTED':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'ERROR':
        return <XCircle className="h-4 w-4 text-red-400" />
      case 'MAINTENANCE':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONNECTED': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'ERROR': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'MAINTENANCE': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-400'
      case 'warning': return 'text-yellow-400'
      case 'critical': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading system overview...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!systemData) {
    return (
      <Alert className="border-red-500/50 bg-red-500/10">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>System Error</AlertTitle>
        <AlertDescription>
          Failed to load system overview data. Please try refreshing the page.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* System Health Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">System Overview</h2>
          <p className="text-gray-400">Real-time monitoring of all Audityzer platforms</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
          <Button
            onClick={() => triggerHealthCheck()}
            disabled={refreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh All
          </Button>
        </div>
      </div>

      {/* System Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Overall Health
            </CardTitle>
            <Activity className={`h-4 w-4 ${getHealthColor(systemData.summary.overallHealth)}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white capitalize">
              {systemData.summary.overallHealth}
            </div>
            <p className="text-xs text-gray-400">
              {systemData.summary.connectedPlatforms}/{systemData.summary.totalPlatforms} platforms connected
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Active Platforms
            </CardTitle>
            <Server className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {systemData.summary.connectedPlatforms}
            </div>
            <p className="text-xs text-gray-400">
              {systemData.summary.errorPlatforms} with errors
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Security Alerts
            </CardTitle>
            <Shield className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {systemData.alerts.length}
            </div>
            <p className="text-xs text-gray-400">
              Active system alerts
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              System Load
            </CardTitle>
            <Zap className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {systemData.summary?.systemLoad?.toFixed(1) || '0'}%
            </div>
            <p className="text-xs text-gray-400">
              Average CPU usage
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Status */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Server className="h-5 w-5" />
            Platform Status
          </CardTitle>
          <CardDescription>
            Current status of all integrated Audityzer platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemData.platforms.map((platform) => (
              <div key={platform.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-gray-800/30">
                <div className="flex items-center gap-4">
                  {getStatusIcon(platform.status)}
                  <div>
                    <h4 className="font-medium text-white">{platform.displayName}</h4>
                    <p className="text-sm text-gray-400">{platform.baseUrl}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(platform.status)}>
                    {platform.status}
                  </Badge>
                  <Button
                    onClick={() => triggerHealthCheck(platform.name)}
                    disabled={refreshing}
                    variant="outline"
                    size="sm"
                  >
                    Check
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      {systemData.alerts.length > 0 && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              Active Alerts
            </CardTitle>
            <CardDescription>
              System alerts requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemData.alerts.slice(0, 5).map((alert) => (
                <Alert key={alert.id} className="border-yellow-500/50 bg-yellow-500/10">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="text-yellow-400">{alert.title}</AlertTitle>
                  <AlertDescription className="text-gray-300">
                    {alert.message}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
