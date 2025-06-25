
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { 
  Globe, 
  Activity, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Settings,
  BarChart3,
  Zap,
  Shield,
  TrendingUp,
  Users
} from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar, BarChart, Pie, PieChart, Cell } from 'recharts'
import { format } from 'date-fns'

interface ApiDashboard {
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

interface ApiEndpoint {
  id: string
  apiName: string
  endpoint: string
  method: string
  description?: string
  version: string
  rateLimitPeriod: string
  rateLimitCount: number
  authRequired: boolean
  status: string
  createdAt: string
}

export default function ApiManagementDashboard() {
  const [dashboard, setDashboard] = useState<ApiDashboard | null>(null)
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('24h')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [createEndpointOpen, setCreateEndpointOpen] = useState(false)
  
  const [newEndpoint, setNewEndpoint] = useState({
    apiName: '',
    endpoint: '',
    method: 'GET',
    description: '',
    rateLimitCount: 100,
    rateLimitPeriod: 'MINUTE',
    authRequired: true
  })

  const fetchApiData = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)
      if (searchQuery) params.append('search', searchQuery)

      const [dashboardResponse, endpointsResponse] = await Promise.all([
        fetch(`/api/enterprise/api-management?action=dashboard&timeRange=${timeRange}`),
        fetch(`/api/enterprise/api-management?${params.toString()}`)
      ])

      if (dashboardResponse.ok) {
        const dashboardData = await dashboardResponse.json()
        setDashboard(dashboardData.data)
      }

      if (endpointsResponse.ok) {
        const endpointsData = await endpointsResponse.json()
        setEndpoints(endpointsData.data)
      }
    } catch (error) {
      console.error('Error fetching API data:', error)
    } finally {
      setLoading(false)
    }
  }

  const createEndpoint = async () => {
    try {
      const response = await fetch('/api/enterprise/api-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'createEndpoint',
          ...newEndpoint
        })
      })

      if (response.ok) {
        setCreateEndpointOpen(false)
        setNewEndpoint({
          apiName: '',
          endpoint: '',
          method: 'GET',
          description: '',
          rateLimitCount: 100,
          rateLimitPeriod: 'MINUTE',
          authRequired: true
        })
        fetchApiData()
      }
    } catch (error) {
      console.error('Error creating endpoint:', error)
    }
  }

  const updateEndpointStatus = async (apiId: string, status: string) => {
    try {
      const response = await fetch('/api/enterprise/api-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateStatus',
          apiId,
          status
        })
      })

      if (response.ok) {
        fetchApiData()
      }
    } catch (error) {
      console.error('Error updating endpoint status:', error)
    }
  }

  const updateRateLimit = async (apiId: string, rateLimitCount: number, rateLimitPeriod: string) => {
    try {
      const response = await fetch('/api/enterprise/api-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateRateLimit',
          apiId,
          rateLimitCount,
          rateLimitPeriod
        })
      })

      if (response.ok) {
        fetchApiData()
      }
    } catch (error) {
      console.error('Error updating rate limit:', error)
    }
  }

  const deleteEndpoint = async (apiId: string) => {
    try {
      const response = await fetch('/api/enterprise/api-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          apiId
        })
      })

      if (response.ok) {
        fetchApiData()
      }
    } catch (error) {
      console.error('Error deleting endpoint:', error)
    }
  }

  useEffect(() => {
    fetchApiData()
  }, [timeRange, statusFilter, searchQuery])

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'POST':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'PUT':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'DELETE':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'PATCH':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'DEPRECATED':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'MAINTENANCE':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'INACTIVE':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircle className="h-4 w-4" />
      case 'DEPRECATED':
        return <AlertTriangle className="h-4 w-4" />
      case 'MAINTENANCE':
        return <Settings className="h-4 w-4" />
      case 'INACTIVE':
        return <XCircle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  const COLORS = ['#60B5FF', '#FF9149', '#FF9898', '#72BF78', '#A19AD3']

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Globe className="h-8 w-8 animate-pulse text-blue-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading API management dashboard...</p>
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
          <h2 className="text-2xl font-bold text-white mb-2">API Management</h2>
          <p className="text-gray-400">Monitor and manage API endpoints and traffic</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={createEndpointOpen} onOpenChange={setCreateEndpointOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Endpoint
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Add API Endpoint</DialogTitle>
                <DialogDescription>
                  Register a new API endpoint for monitoring and management.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">API Name</Label>
                    <Input
                      value={newEndpoint.apiName}
                      onChange={(e) => setNewEndpoint({ ...newEndpoint, apiName: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="User Management API"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Method</Label>
                    <Select value={newEndpoint.method} onValueChange={(value) => setNewEndpoint({ ...newEndpoint, method: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                        <SelectItem value="PATCH">PATCH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Endpoint</Label>
                  <Input
                    value={newEndpoint.endpoint}
                    onChange={(e) => setNewEndpoint({ ...newEndpoint, endpoint: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="/api/v1/users"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Description</Label>
                  <Input
                    value={newEndpoint.description}
                    onChange={(e) => setNewEndpoint({ ...newEndpoint, description: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Endpoint description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Rate Limit</Label>
                    <Input
                      type="number"
                      value={newEndpoint.rateLimitCount}
                      onChange={(e) => setNewEndpoint({ ...newEndpoint, rateLimitCount: parseInt(e.target.value) })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Period</Label>
                    <Select value={newEndpoint.rateLimitPeriod} onValueChange={(value) => setNewEndpoint({ ...newEndpoint, rateLimitPeriod: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SECOND">Second</SelectItem>
                        <SelectItem value="MINUTE">Minute</SelectItem>
                        <SelectItem value="HOUR">Hour</SelectItem>
                        <SelectItem value="DAY">Day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newEndpoint.authRequired}
                    onCheckedChange={(checked) => setNewEndpoint({ ...newEndpoint, authRequired: checked })}
                  />
                  <Label className="text-gray-300">Require Authentication</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setCreateEndpointOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createEndpoint} className="bg-blue-600 hover:bg-blue-700">
                    Add Endpoint
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      {dashboard && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-300">
                Total Requests
              </CardTitle>
              <Activity className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatNumber(dashboard.summary.totalRequests)}</div>
              <p className="text-xs text-blue-300">
                {dashboard.summary.activeEndpoints} active endpoints
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-300">
                Response Time
              </CardTitle>
              <Clock className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{dashboard.summary.avgResponseTime}ms</div>
              <p className="text-xs text-green-300">
                Average response time
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/20 to-red-600/10 border-red-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-300">
                Error Rate
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{dashboard.summary.errorRate.toFixed(2)}%</div>
              <p className="text-xs text-red-300">
                Request error rate
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">
                Uptime
              </CardTitle>
              <Shield className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{dashboard.summary.uptime}%</div>
              <p className="text-xs text-purple-300">
                System availability
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {dashboard && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Traffic Trends */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Traffic Trends</CardTitle>
                  <CardDescription>API request patterns over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dashboard.trafficTrends}>
                        <XAxis 
                          dataKey="time" 
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
                        <Legend 
                          verticalAlign="top" 
                          height={36}
                          wrapperStyle={{ fontSize: '11px' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="requests" 
                          stroke="#60B5FF" 
                          strokeWidth={2}
                          dot={{ fill: '#60B5FF', strokeWidth: 2, r: 4 }}
                          name="Requests"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="errors" 
                          stroke="#FF6363" 
                          strokeWidth={2}
                          dot={{ fill: '#FF6363', strokeWidth: 2, r: 4 }}
                          name="Errors"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Status Code Distribution */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Status Code Distribution</CardTitle>
                  <CardDescription>HTTP response status breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dashboard.statusCodeDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          dataKey="count"
                          nameKey="statusCode"
                        >
                          {dashboard.statusCodeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1f2937', 
                            border: '1px solid #374151',
                            borderRadius: '0.5rem',
                            fontSize: '11px'
                          }}
                        />
                        <Legend 
                          verticalAlign="bottom" 
                          height={36}
                          wrapperStyle={{ fontSize: '11px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Top Endpoints */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Top Endpoints</CardTitle>
                  <CardDescription>Most frequently accessed endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboard.topEndpoints.slice(0, 5).map((endpoint, index) => (
                      <div key={`${endpoint.method}-${endpoint.endpoint}`} className="flex items-center justify-between p-2 rounded border border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded bg-blue-500/20">
                            <span className="text-xs font-bold text-blue-400">{index + 1}</span>
                          </div>
                          <Badge className={getMethodColor(endpoint.method)}>
                            {endpoint.method}
                          </Badge>
                          <span className="text-sm text-white font-mono">{endpoint.endpoint}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-white">{formatNumber(endpoint.requests)}</div>
                          <div className="text-xs text-gray-400">{endpoint.avgResponseTime}ms avg</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Geographic Distribution */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Geographic Distribution</CardTitle>
                  <CardDescription>Requests by country</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboard.geographicDistribution.map((country) => (
                      <div key={country.country} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-white">{country.country}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-400">{country.percentage}%</span>
                          <span className="text-sm text-white">{formatNumber(country.requests)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="endpoints" className="mt-6 space-y-6">
          {/* Filters */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search endpoints..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="DEPRECATED">Deprecated</SelectItem>
                    <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={fetchApiData} variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Endpoints List */}
          <div className="space-y-4">
            {endpoints.map((endpoint) => (
              <Card key={endpoint.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getMethodColor(endpoint.method)}>
                          {endpoint.method}
                        </Badge>
                        <Badge className={getStatusColor(endpoint.status)}>
                          {getStatusIcon(endpoint.status)}
                          {endpoint.status}
                        </Badge>
                        <Badge className="bg-gray-600/50 text-gray-300">
                          v{endpoint.version}
                        </Badge>
                        {endpoint.authRequired && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            <Shield className="h-3 w-3 mr-1" />
                            AUTH
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <h3 className="text-lg font-medium text-white">{endpoint.apiName}</h3>
                          <p className="text-gray-400 font-mono">{endpoint.endpoint}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Rate Limit</p>
                          <p className="text-white">{endpoint.rateLimitCount}/{endpoint.rateLimitPeriod}</p>
                        </div>
                      </div>
                      {endpoint.description && (
                        <p className="text-sm text-gray-400 mb-2">{endpoint.description}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Created: {format(new Date(endpoint.createdAt), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateEndpointStatus(
                          endpoint.id, 
                          endpoint.status === 'ACTIVE' ? 'MAINTENANCE' : 'ACTIVE'
                        )}
                      >
                        {endpoint.status === 'ACTIVE' ? 'Disable' : 'Enable'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteEndpoint(endpoint.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {endpoints.length === 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No API endpoints found</p>
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
                  <CardTitle className="text-white">Request Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dashboard.trafficTrends}>
                        <XAxis 
                          dataKey="time" 
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
                        <Bar dataKey="requests" fill="#60B5FF" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">API Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Total Endpoints</span>
                      <span className="text-xl font-bold text-white">{dashboard.summary.totalEndpoints}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Active Endpoints</span>
                      <span className="text-xl font-bold text-white">{dashboard.summary.activeEndpoints}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Total Requests</span>
                      <span className="text-xl font-bold text-white">{formatNumber(dashboard.summary.totalRequests)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Success Rate</span>
                      <span className="text-xl font-bold text-white">
                        {(100 - dashboard.summary.errorRate).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="monitoring" className="mt-6 space-y-6">
          {dashboard && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Rate Limiting Status</CardTitle>
                <CardDescription>Current rate limiting statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboard.rateLimitingStats.map((stat) => (
                    <div key={stat.endpoint} className="p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-mono">{stat.endpoint}</span>
                        <Badge className={stat.breaches > 0 ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}>
                          {stat.breaches > 0 ? `${stat.breaches} breaches` : 'Within limits'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                        <span>Current: {stat.current}</span>
                        <span>Limit: {stat.limit}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${stat.current >= stat.limit ? 'bg-red-500' : 'bg-blue-500'}`}
                          style={{ width: `${Math.min((stat.current / stat.limit) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
