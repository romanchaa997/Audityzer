
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Cpu, 
  HardDrive,
  MemoryStick,
  Wifi,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Lightbulb,
  Zap,
  Target
} from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar, BarChart, Area, AreaChart } from 'recharts'
import { format } from 'date-fns'

interface OptimizationDashboard {
  summary: {
    totalRecommendations: number
    pendingRecommendations: number
    implementedRecommendations: number
    totalPotentialSavings: number
    actualSavings: number
  }
  recommendationsByType: {
    type: string
    count: number
    avgSavings: number
  }[]
  recommendationsByPlatform: {
    platform: string
    count: number
    potentialSavings: number
  }[]
  recentOptimizations: any[]
  trends: {
    date: string
    recommendations: number
    implemented: number
    savings: number
  }[]
}

interface ResourceOptimization {
  id: string
  resourceType: string
  platform: string
  currentUsage: number
  recommendedUsage?: number
  potentialSavings?: number
  optimizationType: string
  confidence: number
  impact: string
  description: string
  status: string
  validUntil: string
  createdAt: string
}

export default function ResourceOptimizationDashboard() {
  const [dashboard, setDashboard] = useState<OptimizationDashboard | null>(null)
  const [optimizations, setOptimizations] = useState<ResourceOptimization[]>([])
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [timeRange, setTimeRange] = useState('30d')
  const [statusFilter, setStatusFilter] = useState('')
  const [resourceTypeFilter, setResourceTypeFilter] = useState('')

  const fetchOptimizationData = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)
      if (resourceTypeFilter) params.append('resourceType', resourceTypeFilter)

      const [dashboardResponse, optimizationsResponse] = await Promise.all([
        fetch(`/api/enterprise/optimization?action=dashboard&timeRange=${timeRange}`),
        fetch(`/api/enterprise/optimization?${params.toString()}`)
      ])

      if (dashboardResponse.ok) {
        const dashboardData = await dashboardResponse.json()
        setDashboard(dashboardData.data)
      }

      if (optimizationsResponse.ok) {
        const optimizationsData = await optimizationsResponse.json()
        setOptimizations(optimizationsData.data)
      }
    } catch (error) {
      console.error('Error fetching optimization data:', error)
    } finally {
      setLoading(false)
    }
  }

  const runAnalysis = async () => {
    try {
      setAnalyzing(true)
      const response = await fetch('/api/enterprise/optimization?action=analyze')
      if (response.ok) {
        fetchOptimizationData()
      }
    } catch (error) {
      console.error('Error running analysis:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  const implementOptimization = async (optimizationId: string) => {
    try {
      const response = await fetch('/api/enterprise/optimization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'implement',
          optimizationId
        })
      })

      if (response.ok) {
        fetchOptimizationData()
      }
    } catch (error) {
      console.error('Error implementing optimization:', error)
    }
  }

  const rejectOptimization = async (optimizationId: string) => {
    try {
      const response = await fetch('/api/enterprise/optimization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reject',
          optimizationId
        })
      })

      if (response.ok) {
        fetchOptimizationData()
      }
    } catch (error) {
      console.error('Error rejecting optimization:', error)
    }
  }

  useEffect(() => {
    fetchOptimizationData()
  }, [timeRange, statusFilter, resourceTypeFilter])

  const getResourceIcon = (resourceType: string) => {
    switch (resourceType) {
      case 'CPU':
        return <Cpu className="h-4 w-4" />
      case 'MEMORY':
        return <MemoryStick className="h-4 w-4" />
      case 'STORAGE':
        return <HardDrive className="h-4 w-4" />
      case 'NETWORK':
        return <Wifi className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const getOptimizationTypeColor = (type: string) => {
    switch (type) {
      case 'SCALE_UP':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'SCALE_DOWN':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'MIGRATE':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'TERMINATE':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'IMPLEMENTED':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'REJECTED':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'EXPIRED':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'HIGH':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'MEDIUM':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'LOW':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="h-4 w-4" />
      case 'IMPLEMENTED':
        return <CheckCircle className="h-4 w-4" />
      case 'REJECTED':
        return <XCircle className="h-4 w-4" />
      case 'EXPIRED':
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Target className="h-8 w-8 animate-pulse text-green-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading optimization dashboard...</p>
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
          <h2 className="text-2xl font-bold text-white mb-2">Resource Optimization</h2>
          <p className="text-gray-400">AI-powered resource optimization recommendations</p>
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
          <Button 
            onClick={runAnalysis} 
            disabled={analyzing}
            className="bg-green-600 hover:bg-green-700"
          >
            <Lightbulb className={`h-4 w-4 mr-2 ${analyzing ? 'animate-pulse' : ''}`} />
            {analyzing ? 'Analyzing...' : 'Run Analysis'}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      {dashboard && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-300">
                Total Recommendations
              </CardTitle>
              <Lightbulb className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{dashboard.summary.totalRecommendations}</div>
              <p className="text-xs text-blue-300">
                {dashboard.summary.pendingRecommendations} pending
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-300">
                Potential Savings
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {formatCurrency(dashboard.summary.totalPotentialSavings)}
              </div>
              <p className="text-xs text-green-300">
                Monthly savings potential
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">
                Actual Savings
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {formatCurrency(dashboard.summary.actualSavings)}
              </div>
              <p className="text-xs text-purple-300">
                From implemented optimizations
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-300">
                Implementation Rate
              </CardTitle>
              <Target className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboard.summary.totalRecommendations > 0
                  ? ((dashboard.summary.implementedRecommendations / dashboard.summary.totalRecommendations) * 100).toFixed(1)
                  : 0}%
              </div>
              <p className="text-xs text-orange-300">
                {dashboard.summary.implementedRecommendations} implemented
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-300">
                ROI
              </CardTitle>
              <Zap className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboard.summary.totalPotentialSavings > 0
                  ? ((dashboard.summary.actualSavings / dashboard.summary.totalPotentialSavings) * 100).toFixed(1)
                  : 0}%
              </div>
              <p className="text-xs text-yellow-300">
                Savings realization
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="mt-6 space-y-6">
          {/* Filters */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="IMPLEMENTED">Implemented</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                    <SelectItem value="EXPIRED">Expired</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={resourceTypeFilter} onValueChange={setResourceTypeFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="All Resource Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Resource Types</SelectItem>
                    <SelectItem value="CPU">CPU</SelectItem>
                    <SelectItem value="MEMORY">Memory</SelectItem>
                    <SelectItem value="STORAGE">Storage</SelectItem>
                    <SelectItem value="NETWORK">Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations List */}
          <div className="space-y-4">
            {optimizations.map((optimization) => (
              <Card key={optimization.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          {getResourceIcon(optimization.resourceType)}
                          <Badge className="bg-gray-600/50 text-gray-300">
                            {optimization.resourceType}
                          </Badge>
                        </div>
                        <Badge className={getOptimizationTypeColor(optimization.optimizationType)}>
                          {optimization.optimizationType}
                        </Badge>
                        <Badge className={getStatusColor(optimization.status)}>
                          {getStatusIcon(optimization.status)}
                          {optimization.status}
                        </Badge>
                        <Badge className={getImpactColor(optimization.impact)}>
                          {optimization.impact} IMPACT
                        </Badge>
                      </div>

                      <h3 className="text-lg font-medium text-white mb-2">{optimization.platform}</h3>
                      <p className="text-sm text-gray-400 mb-3">{optimization.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-400">Current Usage</p>
                          <p className="text-white font-bold">{optimization.currentUsage.toFixed(1)}%</p>
                        </div>
                        {optimization.recommendedUsage && (
                          <div>
                            <p className="text-xs text-gray-400">Recommended</p>
                            <p className="text-white font-bold">{optimization.recommendedUsage.toFixed(1)}%</p>
                          </div>
                        )}
                        {optimization.potentialSavings && (
                          <div>
                            <p className="text-xs text-gray-400">Potential Savings</p>
                            <p className="text-green-400 font-bold">{formatCurrency(optimization.potentialSavings)}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-gray-400">Confidence</p>
                          <div className="flex items-center gap-2">
                            <Progress value={optimization.confidence} className="flex-1 h-2" />
                            <span className="text-xs text-white">{optimization.confidence}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Created: {format(new Date(optimization.createdAt), 'MMM dd, yyyy')}</span>
                        <span>Valid until: {format(new Date(optimization.validUntil), 'MMM dd, yyyy')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {optimization.status === 'PENDING' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => implementOptimization(optimization.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Implement
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => rejectOptimization(optimization.id)}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {optimizations.length === 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-400">No optimization recommendations found</p>
                    <Button onClick={runAnalysis} className="mt-4 bg-green-600 hover:bg-green-700">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Run Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6 space-y-6">
          {dashboard && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recommendations by Type */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recommendations by Type</CardTitle>
                  <CardDescription>Distribution of optimization types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dashboard.recommendationsByType}>
                        <XAxis 
                          dataKey="type" 
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

              {/* Savings by Platform */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Savings by Platform</CardTitle>
                  <CardDescription>Potential savings breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboard.recommendationsByPlatform.map((platform) => (
                      <div key={platform.platform} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-white">{platform.platform}</span>
                            <span className="text-sm text-green-400 font-bold">
                              {formatCurrency(platform.potentialSavings)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-400">{platform.count} recommendations</span>
                            <span className="text-xs text-gray-400">
                              {dashboard.summary.totalPotentialSavings > 0
                                ? ((platform.potentialSavings / dashboard.summary.totalPotentialSavings) * 100).toFixed(1)
                                : 0}%
                            </span>
                          </div>
                          <Progress 
                            value={dashboard.summary.totalPotentialSavings > 0
                              ? (platform.potentialSavings / dashboard.summary.totalPotentialSavings) * 100
                              : 0
                            } 
                            className="h-2" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="trends" className="mt-6 space-y-6">
          {dashboard && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Optimization Trends</CardTitle>
                <CardDescription>Historical optimization data and implementation progress</CardDescription>
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
                      <Legend 
                        verticalAlign="top" 
                        height={36}
                        wrapperStyle={{ fontSize: '11px' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="recommendations" 
                        stackId="1"
                        stroke="#60B5FF" 
                        fill="#60B5FF"
                        fillOpacity={0.6}
                        name="Recommendations"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="implemented" 
                        stackId="2"
                        stroke="#72BF78" 
                        fill="#72BF78"
                        fillOpacity={0.6}
                        name="Implemented"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="savings" 
                        stroke="#FF9149" 
                        fill="transparent"
                        strokeWidth={2}
                        name="Savings ($)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
