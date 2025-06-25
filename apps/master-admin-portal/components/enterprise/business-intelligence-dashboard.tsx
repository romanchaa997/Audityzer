
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
  Users, 
  Activity, 
  BarChart3,
  Target,
  Brain,
  Zap,
  AlertCircle
} from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar, BarChart, Pie, PieChart, Cell } from 'recharts'

interface BusinessIntelligenceData {
  revenue: {
    current: number
    previous: number
    trend: 'UP' | 'DOWN' | 'STABLE'
    target: number
    growth: number
  }
  usage: {
    activeUsers: number
    totalSessions: number
    averageSessionDuration: number
    platformDistribution: { platform: string; users: number; percentage: number }[]
  }
  performance: {
    averageResponseTime: number
    uptime: number
    errorRate: number
    throughput: number
  }
  customer: {
    satisfaction: number
    churnRate: number
    acquisitionRate: number
    retentionRate: number
  }
}

export default function BusinessIntelligenceDashboard() {
  const [data, setData] = useState<BusinessIntelligenceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedCategory, setSelectedCategory] = useState('REVENUE')
  const [predictiveData, setPredictiveData] = useState<any>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/enterprise/business-intelligence?timeRange=${timeRange}`)
      if (response.ok) {
        const result = await response.json()
        setData(result.data)
      }
    } catch (error) {
      console.error('Error fetching BI data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPredictiveAnalytics = async () => {
    try {
      const response = await fetch(`/api/enterprise/business-intelligence?action=predictive&category=${selectedCategory}&timeRange=${timeRange}`)
      if (response.ok) {
        const result = await response.json()
        setPredictiveData(result.data)
      }
    } catch (error) {
      console.error('Error fetching predictive analytics:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [timeRange])

  useEffect(() => {
    fetchPredictiveAnalytics()
  }, [selectedCategory, timeRange])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'UP':
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case 'DOWN':
        return <TrendingDown className="h-4 w-4 text-red-400" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
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

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  const COLORS = ['#60B5FF', '#FF9149', '#FF9898', '#FF90BB', '#80D8C3', '#A19AD3']

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Brain className="h-8 w-8 animate-pulse text-blue-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading business intelligence...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="text-red-400">Failed to load business intelligence data</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Business Intelligence</h2>
          <p className="text-gray-400">Advanced analytics and predictive insights</p>
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
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchData} variant="outline" size="sm">
            <Brain className="h-4 w-4 mr-2" />
            Refresh Analytics
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-300">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(data.revenue.current)}
            </div>
            <div className="flex items-center gap-1 mt-1">
              {getTrendIcon(data.revenue.trend)}
              <p className="text-xs text-green-300">
                {data.revenue.growth > 0 ? '+' : ''}{data.revenue.growth.toFixed(1)}% from last period
              </p>
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>Target</span>
                <span>{formatCurrency(data.revenue.target)}</span>
              </div>
              <Progress 
                value={(data.revenue.current / data.revenue.target) * 100} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-300">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatNumber(data.usage.activeUsers)}
            </div>
            <p className="text-xs text-blue-300 mt-1">
              {formatNumber(data.usage.totalSessions)} total sessions
            </p>
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>Avg Session</span>
                <span>{Math.floor(data.usage.averageSessionDuration / 60)}m</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-300">
              System Uptime
            </CardTitle>
            <Activity className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.performance.uptime}%
            </div>
            <p className="text-xs text-purple-300 mt-1">
              {data.performance.averageResponseTime}ms avg response
            </p>
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>Error Rate</span>
                <span>{data.performance.errorRate}%</span>
              </div>
              <Progress value={100 - data.performance.errorRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-300">
              Customer Satisfaction
            </CardTitle>
            <Target className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.customer.satisfaction}%
            </div>
            <p className="text-xs text-orange-300 mt-1">
              {data.customer.retentionRate}% retention rate
            </p>
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>Churn Rate</span>
                <span>{data.customer.churnRate}%</span>
              </div>
              <Progress value={100 - data.customer.churnRate} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Distribution */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Platform Distribution</CardTitle>
                <CardDescription>User distribution across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.usage.platformDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="users"
                        nameKey="platform"
                      >
                        {data.usage.platformDistribution.map((entry, index) => (
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

            {/* Revenue Trends */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Revenue Trends</CardTitle>
                <CardDescription>Revenue performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Current Period</p>
                      <p className="text-2xl font-bold text-white">{formatCurrency(data.revenue.current)}</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {getTrendIcon(data.revenue.trend)}
                      {data.revenue.growth > 0 ? '+' : ''}{data.revenue.growth.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Previous Period</span>
                      <span className="text-white">{formatCurrency(data.revenue.previous)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Target</span>
                      <span className="text-white">{formatCurrency(data.revenue.target)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Achievement</span>
                      <span className="text-white">
                        {((data.revenue.current / data.revenue.target) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictive" className="mt-6 space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="REVENUE">Revenue</SelectItem>
                <SelectItem value="USAGE">Usage</SelectItem>
                <SelectItem value="PERFORMANCE">Performance</SelectItem>
                <SelectItem value="CUSTOMER">Customer</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={fetchPredictiveAnalytics} variant="outline" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Generate Predictions
            </Button>
          </div>

          {predictiveData && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Predictive Analytics - {selectedCategory}
                </CardTitle>
                <CardDescription>
                  AI-powered predictions for the next 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={predictiveData.predictions}>
                          <XAxis 
                            dataKey="day" 
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
                          <Line 
                            type="monotone" 
                            dataKey="predicted" 
                            stroke="#60B5FF" 
                            strokeWidth={2}
                            dot={{ fill: '#60B5FF', strokeWidth: 2, r: 4 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="confidence" 
                            stroke="#FF9149" 
                            strokeDasharray="5 5"
                            strokeWidth={1}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Trend</p>
                      <Badge className={`${
                        predictiveData.trend === 'INCREASING' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        predictiveData.trend === 'DECREASING' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      }`}>
                        {predictiveData.trend}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Slope</p>
                      <p className="text-white font-mono">{predictiveData.slope}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Accuracy</p>
                      <div className="flex items-center gap-2">
                        <Progress value={predictiveData.accuracy} className="flex-1 h-2" />
                        <span className="text-sm text-white">{predictiveData.accuracy}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="usage" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Platform Usage</CardTitle>
                <CardDescription>User activity across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.usage.platformDistribution}>
                      <XAxis 
                        dataKey="platform" 
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
                      <Bar dataKey="users" fill="#60B5FF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Usage Metrics</CardTitle>
                <CardDescription>Key usage statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Active Users</span>
                    <span className="text-xl font-bold text-white">{formatNumber(data.usage.activeUsers)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Total Sessions</span>
                    <span className="text-xl font-bold text-white">{formatNumber(data.usage.totalSessions)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Avg Session Duration</span>
                    <span className="text-xl font-bold text-white">{Math.floor(data.usage.averageSessionDuration / 60)}m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Sessions per User</span>
                    <span className="text-xl font-bold text-white">
                      {(data.usage.totalSessions / data.usage.activeUsers).toFixed(1)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-300">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{data.performance.averageResponseTime}ms</div>
                <p className="text-xs text-gray-400 mt-1">Average response time</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-300">Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{data.performance.uptime}%</div>
                <p className="text-xs text-gray-400 mt-1">System availability</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-300">Error Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{data.performance.errorRate}%</div>
                <p className="text-xs text-gray-400 mt-1">Request error rate</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-300">Throughput</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{formatNumber(data.performance.throughput)}</div>
                <p className="text-xs text-gray-400 mt-1">Requests per minute</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
