
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Search,
  TrendingUp,
  Activity,
  Globe,
  Server,
  Lock,
  UserX,
  Bug,
  Zap
} from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar, BarChart, Area, AreaChart } from 'recharts'
import { format } from 'date-fns'

interface SecurityDashboard {
  threatSummary: {
    active: number
    resolved: number
    falsePositives: number
    critical: number
    high: number
    medium: number
    low: number
  }
  recentDetections: any[]
  topThreats: {
    threatType: string
    count: number
    severity: string
  }[]
  platformSecurity: {
    platform: string
    threats: number
    blocked: number
    status: 'SECURE' | 'WARNING' | 'CRITICAL'
  }[]
  trends: {
    date: string
    threats: number
    detections: number
    blocked: number
  }[]
}

interface ThreatIntelligence {
  id: string
  threatType: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  source: string
  sourceType: 'IP' | 'DOMAIN' | 'HASH' | 'EMAIL'
  description: string
  confidence: number
  status: 'ACTIVE' | 'RESOLVED' | 'FALSE_POSITIVE'
  firstSeen: string
  lastSeen: string
}

interface ThreatDetection {
  id: string
  threatId: string
  detectedAt: string
  platform: string
  details: any
  action: 'BLOCKED' | 'ALLOWED' | 'QUARANTINED'
  automaticAction: boolean
  status: 'PENDING' | 'REVIEWED' | 'RESOLVED'
}

export default function AdvancedSecurityDashboard() {
  const [dashboard, setDashboard] = useState<SecurityDashboard | null>(null)
  const [threats, setThreats] = useState<ThreatIntelligence[]>([])
  const [detections, setDetections] = useState<ThreatDetection[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('30d')

  const fetchSecurityData = async () => {
    try {
      setLoading(true)
      const [dashboardResponse, threatsResponse, detectionsResponse] = await Promise.all([
        fetch(`/api/enterprise/security?action=dashboard&timeRange=${timeRange}`),
        fetch('/api/enterprise/security?action=threats'),
        fetch('/api/enterprise/security?action=detections')
      ])

      if (dashboardResponse.ok) {
        const dashboardData = await dashboardResponse.json()
        setDashboard(dashboardData.data)
      }

      if (threatsResponse.ok) {
        const threatsData = await threatsResponse.json()
        setThreats(threatsData.data)
      }

      if (detectionsResponse.ok) {
        const detectionsData = await detectionsResponse.json()
        setDetections(detectionsData.data)
      }
    } catch (error) {
      console.error('Error fetching security data:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchThreats = async () => {
    if (!searchQuery.trim()) {
      fetchSecurityData()
      return
    }

    try {
      const response = await fetch(`/api/enterprise/security?action=search&q=${encodeURIComponent(searchQuery)}`)
      if (response.ok) {
        const data = await response.json()
        setThreats(data.data)
      }
    } catch (error) {
      console.error('Error searching threats:', error)
    }
  }

  const updateThreatStatus = async (threatId: string, status: string) => {
    try {
      const response = await fetch('/api/enterprise/security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateThreatStatus',
          threatId,
          status
        })
      })

      if (response.ok) {
        fetchSecurityData()
      }
    } catch (error) {
      console.error('Error updating threat status:', error)
    }
  }

  const reviewDetection = async (detectionId: string, status: string) => {
    try {
      const response = await fetch('/api/enterprise/security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reviewDetection',
          detectionId,
          status
        })
      })

      if (response.ok) {
        fetchSecurityData()
      }
    } catch (error) {
      console.error('Error reviewing detection:', error)
    }
  }

  useEffect(() => {
    fetchSecurityData()
  }, [timeRange])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'HIGH':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'MEDIUM':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'LOW':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'RESOLVED':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'FALSE_POSITIVE':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'REVIEWED':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getPlatformStatusColor = (status: string) => {
    switch (status) {
      case 'SECURE':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'WARNING':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'BLOCKED':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'ALLOWED':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'QUARANTINED':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getThreatTypeIcon = (threatType: string) => {
    switch (threatType.toLowerCase()) {
      case 'malware':
        return <Bug className="h-4 w-4" />
      case 'phishing':
        return <UserX className="h-4 w-4" />
      case 'intrusion':
        return <Lock className="h-4 w-4" />
      case 'ddos':
        return <Zap className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Shield className="h-8 w-8 animate-pulse text-red-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading security dashboard...</p>
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
          <h2 className="text-2xl font-bold text-white mb-2">Advanced Security</h2>
          <p className="text-gray-400">Threat intelligence and security monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchSecurityData} variant="outline" size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Threat Summary Cards */}
      {dashboard && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-red-500/20 to-red-600/10 border-red-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-300">
                Active Threats
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{dashboard.threatSummary.active}</div>
              <p className="text-xs text-red-300">
                {dashboard.threatSummary.critical} critical
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-300">
                High Severity
              </CardTitle>
              <Shield className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{dashboard.threatSummary.high}</div>
              <p className="text-xs text-orange-300">
                Require attention
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-300">
                Resolved
              </CardTitle>
              <Eye className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{dashboard.threatSummary.resolved}</div>
              <p className="text-xs text-green-300">
                This period
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-300">
                Detection Rate
              </CardTitle>
              <Activity className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboard.threatSummary.active > 0 
                  ? ((dashboard.threatSummary.resolved / (dashboard.threatSummary.active + dashboard.threatSummary.resolved)) * 100).toFixed(1)
                  : 0}%
              </div>
              <p className="text-xs text-blue-300">
                Response effectiveness
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="threats">Threat Intelligence</TabsTrigger>
          <TabsTrigger value="detections">Detections</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {dashboard && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Security Trends */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Security Trends</CardTitle>
                  <CardDescription>Threat activity over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={dashboard.trends}>
                        <XAxis 
                          dataKey="date" 
                          tickLine={false}
                          tick={{ fontSize: 10 }}
                        />
                        <YAxis 
                          tickLine={false}
                          tick={{ fontSize: 10 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1f2937', 
                            border: '1px solid #374151',
                            borderRadius: '0.5rem',
                            fontSize: '11px'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="threats" 
                          stackId="1"
                          stroke="#FF6363" 
                          fill="#FF6363"
                          fillOpacity={0.6}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="detections" 
                          stackId="1"
                          stroke="#60B5FF" 
                          fill="#60B5FF"
                          fillOpacity={0.6}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="blocked" 
                          stackId="1"
                          stroke="#72BF78" 
                          fill="#72BF78"
                          fillOpacity={0.6}
                        />
                        <Legend 
                          verticalAlign="top" 
                          height={36}
                          wrapperStyle={{ fontSize: '11px' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Platform Security Status */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Platform Security</CardTitle>
                  <CardDescription>Security status by platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboard.platformSecurity.map((platform) => (
                      <div key={platform.platform} className="flex items-center justify-between p-3 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-3">
                          <Server className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-white">{platform.platform}</p>
                            <p className="text-xs text-gray-400">{platform.threats} threats, {platform.blocked} blocked</p>
                          </div>
                        </div>
                        <Badge className={getPlatformStatusColor(platform.status)}>
                          {platform.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Threats */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Top Threat Types</CardTitle>
                  <CardDescription>Most common threat categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboard.topThreats.map((threat, index) => (
                      <div key={threat.threatType} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded bg-blue-500/20">
                            <span className="text-xs font-bold text-blue-400">{index + 1}</span>
                          </div>
                          {getThreatTypeIcon(threat.threatType)}
                          <span className="text-sm text-white">{threat.threatType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(threat.severity)}>
                            {threat.severity}
                          </Badge>
                          <span className="text-sm text-gray-400">{threat.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Detections */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Detections</CardTitle>
                  <CardDescription>Latest security detections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboard.recentDetections.slice(0, 5).map((detection) => (
                      <div key={detection.id} className="flex items-center justify-between p-2 rounded border border-gray-700">
                        <div className="flex items-center gap-2">
                          <Badge className={getActionColor(detection.action)}>
                            {detection.action}
                          </Badge>
                          <span className="text-xs text-gray-400">{detection.platform}</span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {format(new Date(detection.detectedAt), 'MMM dd, HH:mm')}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="threats" className="mt-6 space-y-6">
          {/* Search */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search threats by source, type, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && searchThreats()}
                />
                <Button onClick={searchThreats} variant="outline" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Threats List */}
          <div className="space-y-4">
            {threats.map((threat) => (
              <Card key={threat.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity}
                        </Badge>
                        <Badge className={getStatusColor(threat.status)}>
                          {threat.status}
                        </Badge>
                        <Badge className="bg-gray-600/50 text-gray-300">
                          {threat.threatType}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-400">Source</p>
                          <p className="text-white font-mono">{threat.source}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Source Type</p>
                          <p className="text-white">{threat.sourceType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Confidence</p>
                          <p className="text-white">{threat.confidence}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Last Seen</p>
                          <p className="text-white">{format(new Date(threat.lastSeen), 'MMM dd, yyyy HH:mm')}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300">{threat.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {threat.status === 'ACTIVE' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateThreatStatus(threat.id, 'RESOLVED')}
                          >
                            Resolve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateThreatStatus(threat.id, 'FALSE_POSITIVE')}
                          >
                            False Positive
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {threats.length === 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-400">No threats found</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="detections" className="mt-6 space-y-6">
          <div className="space-y-4">
            {detections.map((detection) => (
              <Card key={detection.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getActionColor(detection.action)}>
                          {detection.action}
                        </Badge>
                        <Badge className={getStatusColor(detection.status)}>
                          {detection.status}
                        </Badge>
                        <Badge className="bg-gray-600/50 text-gray-300">
                          {detection.platform}
                        </Badge>
                        {detection.automaticAction && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            AUTO
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-400">Detected At</p>
                          <p className="text-white">{format(new Date(detection.detectedAt), 'MMM dd, yyyy HH:mm:ss')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Platform</p>
                          <p className="text-white">{detection.platform}</p>
                        </div>
                      </div>
                      {detection.details && (
                        <div className="bg-gray-700/50 p-3 rounded">
                          <p className="text-sm text-gray-300">
                            Detection Details: {JSON.stringify(detection.details, null, 2)}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {detection.status === 'PENDING' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => reviewDetection(detection.id, 'REVIEWED')}
                          >
                            Review
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => reviewDetection(detection.id, 'RESOLVED')}
                          >
                            Resolve
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {detections.length === 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Eye className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-400">No detections found</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6 space-y-6">
          {dashboard && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Threat Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dashboard.topThreats}>
                        <XAxis 
                          dataKey="threatType" 
                          tickLine={false}
                          tick={{ fontSize: 10 }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis 
                          tickLine={false}
                          tick={{ fontSize: 10 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1f2937', 
                            border: '1px solid #374151',
                            borderRadius: '0.5rem',
                            fontSize: '11px'
                          }}
                        />
                        <Bar dataKey="count" fill="#60B5FF" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Security Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Total Threats</span>
                      <span className="text-xl font-bold text-white">
                        {dashboard.threatSummary.active + dashboard.threatSummary.resolved}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Resolution Rate</span>
                      <span className="text-xl font-bold text-white">
                        {dashboard.threatSummary.active + dashboard.threatSummary.resolved > 0
                          ? ((dashboard.threatSummary.resolved / (dashboard.threatSummary.active + dashboard.threatSummary.resolved)) * 100).toFixed(1)
                          : 0}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">False Positives</span>
                      <span className="text-xl font-bold text-white">{dashboard.threatSummary.falsePositives}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Critical Threats</span>
                      <span className="text-xl font-bold text-white">{dashboard.threatSummary.critical}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
