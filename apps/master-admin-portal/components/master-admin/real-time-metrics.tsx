
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts'
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Users, 
  Zap, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react'

interface MetricData {
  value: number
  timestamp: string
  unit: string
}

interface SystemMetrics {
  [system: string]: {
    [metricName: string]: MetricData[]
  }
}

interface AggregatedMetrics {
  [system: string]: {
    [metricName: string]: {
      current: number
      average: number
      min: number
      max: number
      unit: string
      dataPoints: number
    }
  }
}

export default function RealTimeMetrics() {
  const [metricsData, setMetricsData] = useState<{
    metrics: SystemMetrics
    aggregated: AggregatedMetrics
    systems: string[]
  } | null>(null)
  const [selectedSystem, setSelectedSystem] = useState<string>('master-portal')
  const [timeRange, setTimeRange] = useState('1h')
  const [loading, setLoading] = useState(true)

  const fetchMetrics = async () => {
    try {
      const response = await fetch(`/api/system/metrics?timeRange=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setMetricsData(data)
        if (data.systems.length > 0 && !data.systems.includes(selectedSystem)) {
          setSelectedSystem(data.systems[0])
        }
      }
    } catch (error) {
      console.error('Error fetching metrics:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()
    const interval = setInterval(fetchMetrics, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [timeRange])

  const formatChartData = (metricName: string, systemName: string) => {
    if (!metricsData?.metrics[systemName]?.[metricName]) return []
    
    return metricsData.metrics[systemName][metricName].map(point => ({
      timestamp: new Date(point.timestamp).toLocaleTimeString(),
      value: point.value,
      unit: point.unit
    }))
  }

  const getMetricIcon = (metricName: string) => {
    switch (metricName) {
      case 'cpu_usage': return <Cpu className="h-4 w-4" />
      case 'memory_usage': return <HardDrive className="h-4 w-4" />
      case 'active_users': return <Users className="h-4 w-4" />
      case 'requests_per_minute': return <Activity className="h-4 w-4" />
      case 'error_rate': return <AlertTriangle className="h-4 w-4" />
      default: return <Zap className="h-4 w-4" />
    }
  }

  const getMetricColor = (metricName: string) => {
    switch (metricName) {
      case 'cpu_usage': return '#60B5FF'
      case 'memory_usage': return '#FF9149'
      case 'active_users': return '#80D8C3'
      case 'requests_per_minute': return '#A19AD3'
      case 'error_rate': return '#FF6363'
      default: return '#72BF78'
    }
  }

  const getTrendIndicator = (current: number, average: number) => {
    const diff = ((current - average) / average) * 100
    if (Math.abs(diff) < 5) return <Minus className="h-4 w-4 text-gray-400" />
    if (diff > 0) return <TrendingUp className="h-4 w-4 text-green-400" />
    return <TrendingDown className="h-4 w-4 text-red-400" />
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Activity className="h-8 w-8 animate-pulse text-blue-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading real-time metrics...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!metricsData) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="pt-6">
          <p className="text-center text-gray-400">No metrics data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Real-time Metrics</h2>
          <p className="text-gray-400">Live performance monitoring across all systems</p>
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
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.systems.map((system) => {
          const systemMetrics = metricsData.aggregated[system] || {}
          const cpuUsage = systemMetrics.cpu_usage?.current || 0
          const memoryUsage = systemMetrics.memory_usage?.current || 0
          
          return (
            <Card 
              key={system} 
              className={`bg-gray-800/50 border-gray-700 cursor-pointer transition-all hover:bg-gray-800/70 ${
                selectedSystem === system ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedSystem(system)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300 capitalize">
                  {system.replace('-', ' ')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>CPU</span>
                      <span>{cpuUsage.toFixed(1)}%</span>
                    </div>
                    <Progress value={cpuUsage} className="h-1" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>Memory</span>
                      <span>{memoryUsage.toFixed(1)}%</span>
                    </div>
                    <Progress value={memoryUsage} className="h-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Detailed Metrics */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="performance" className="data-[state=active]:bg-gray-700">
            Performance
          </TabsTrigger>
          <TabsTrigger value="usage" className="data-[state=active]:bg-gray-700">
            Resource Usage
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-gray-700">
            System Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* CPU and Memory Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-blue-400" />
                  CPU Usage
                </CardTitle>
                <CardDescription>
                  Real-time CPU utilization for {selectedSystem}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formatChartData('cpu_usage', selectedSystem)}>
                      <XAxis 
                        dataKey="timestamp" 
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                        interval="preserveStartEnd"
                      />
                      <YAxis 
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                        domain={[0, 100]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '6px',
                          fontSize: '11px'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#60B5FF"
                        fill="#60B5FF"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-orange-400" />
                  Memory Usage
                </CardTitle>
                <CardDescription>
                  Real-time memory utilization for {selectedSystem}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formatChartData('memory_usage', selectedSystem)}>
                      <XAxis 
                        dataKey="timestamp" 
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                        interval="preserveStartEnd"
                      />
                      <YAxis 
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                        domain={[0, 100]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '6px',
                          fontSize: '11px'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#FF9149"
                        fill="#FF9149"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          {/* Metric Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(metricsData.aggregated[selectedSystem] || {}).map(([metricName, data]) => (
              <Card key={metricName} className="bg-gray-800/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    {metricName.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </CardTitle>
                  {getMetricIcon(metricName)}
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">
                        {data.current.toFixed(1)}
                      </span>
                      {getTrendIndicator(data.current, data.average)}
                    </div>
                    <div className="text-xs text-gray-400">
                      <span>Avg: {data.average.toFixed(1)} {data.unit}</span>
                      <br />
                      <span>Range: {data.min.toFixed(1)} - {data.max.toFixed(1)}</span>
                    </div>
                    {(metricName.includes('usage') || metricName.includes('rate')) && (
                      <Progress 
                        value={data.current} 
                        className="h-2"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          {/* Activity Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-400" />
                  Active Users
                </CardTitle>
                <CardDescription>
                  User activity over time for {selectedSystem}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formatChartData('active_users', selectedSystem)}>
                      <XAxis 
                        dataKey="timestamp" 
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                        interval="preserveStartEnd"
                      />
                      <YAxis 
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '6px',
                          fontSize: '11px'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#80D8C3"
                        strokeWidth={2}
                        dot={{ fill: '#80D8C3', strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-400" />
                  Requests per Minute
                </CardTitle>
                <CardDescription>
                  Request volume for {selectedSystem}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={formatChartData('requests_per_minute', selectedSystem)}>
                      <XAxis 
                        dataKey="timestamp" 
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                        interval="preserveStartEnd"
                      />
                      <YAxis 
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '6px',
                          fontSize: '11px'
                        }}
                      />
                      <Bar
                        dataKey="value"
                        fill="#A19AD3"
                        radius={[2, 2, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
