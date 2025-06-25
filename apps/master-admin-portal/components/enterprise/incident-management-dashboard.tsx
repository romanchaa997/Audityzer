
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle,
  Plus,
  User,
  Calendar,
  BarChart3,
  TrendingUp,
  Activity,
  Zap
} from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, BarChart, Pie, PieChart, Cell, Legend } from 'recharts'
import { format } from 'date-fns'

interface Incident {
  id: string
  incidentId: string
  title: string
  description: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'URGENT'
  status: 'OPEN' | 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED' | 'CANCELLED'
  category: string
  affectedSystems?: string[]
  assignedTo?: string
  reportedBy: string
  createdAt: string
  updatedAt: string
  slaTarget?: string
}

interface IncidentStats {
  total: number
  open: number
  inProgress: number
  resolved: number
  mttr: number
  mtta: number
  slaBreaches: number
  byCategory: { category: string; count: number }[]
  bySeverity: { severity: string; count: number }[]
}

export default function IncidentManagementDashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [stats, setStats] = useState<IncidentStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [filters, setFilters] = useState({
    status: '',
    severity: '',
    category: ''
  })

  const [newIncident, setNewIncident] = useState({
    title: '',
    description: '',
    severity: 'MEDIUM',
    category: 'SYSTEM',
    affectedSystems: []
  })

  const fetchIncidents = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters.status) params.append('status', filters.status)
      if (filters.severity) params.append('severity', filters.severity)
      if (filters.category) params.append('category', filters.category)

      const [incidentsResponse, statsResponse] = await Promise.all([
        fetch(`/api/enterprise/incidents?${params.toString()}`),
        fetch('/api/enterprise/incidents?action=stats')
      ])

      if (incidentsResponse.ok) {
        const incidentsData = await incidentsResponse.json()
        setIncidents(incidentsData.data)
      }

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData.data)
      }
    } catch (error) {
      console.error('Error fetching incidents:', error)
    } finally {
      setLoading(false)
    }
  }

  const createIncident = async () => {
    try {
      const response = await fetch('/api/enterprise/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          ...newIncident
        })
      })

      if (response.ok) {
        setCreateDialogOpen(false)
        setNewIncident({
          title: '',
          description: '',
          severity: 'MEDIUM',
          category: 'SYSTEM',
          affectedSystems: []
        })
        fetchIncidents()
      }
    } catch (error) {
      console.error('Error creating incident:', error)
    }
  }

  const updateIncidentStatus = async (incidentId: string, status: string) => {
    try {
      const response = await fetch('/api/enterprise/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateStatus',
          incidentId,
          status
        })
      })

      if (response.ok) {
        fetchIncidents()
      }
    } catch (error) {
      console.error('Error updating incident status:', error)
    }
  }

  useEffect(() => {
    fetchIncidents()
  }, [filters])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
      case 'URGENT':
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
      case 'OPEN':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'ACKNOWLEDGED':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'IN_PROGRESS':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'RESOLVED':
      case 'CLOSED':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OPEN':
        return <AlertTriangle className="h-4 w-4" />
      case 'ACKNOWLEDGED':
        return <Clock className="h-4 w-4" />
      case 'IN_PROGRESS':
        return <Activity className="h-4 w-4" />
      case 'RESOLVED':
      case 'CLOSED':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <XCircle className="h-4 w-4" />
    }
  }

  const COLORS = ['#60B5FF', '#FF9149', '#FF9898', '#FF90BB', '#80D8C3']

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 animate-pulse text-red-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading incident management...</p>
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
          <h2 className="text-2xl font-bold text-white mb-2">Incident Management</h2>
          <p className="text-gray-400">Monitor and manage system incidents</p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Incident
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Incident</DialogTitle>
              <DialogDescription>
                Report a new system incident for tracking and resolution.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Title</Label>
                <Input
                  value={newIncident.title}
                  onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Brief incident description"
                />
              </div>
              <div>
                <Label className="text-gray-300">Description</Label>
                <Textarea
                  value={newIncident.description}
                  onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={3}
                  placeholder="Detailed incident description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Severity</Label>
                  <Select value={newIncident.severity} onValueChange={(value) => setNewIncident({ ...newIncident, severity: value })}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="CRITICAL">Critical</SelectItem>
                      <SelectItem value="URGENT">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Category</Label>
                  <Select value={newIncident.category} onValueChange={(value) => setNewIncident({ ...newIncident, category: value })}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SYSTEM">System</SelectItem>
                      <SelectItem value="SECURITY">Security</SelectItem>
                      <SelectItem value="PERFORMANCE">Performance</SelectItem>
                      <SelectItem value="INTEGRATION">Integration</SelectItem>
                      <SelectItem value="DATA">Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createIncident} className="bg-red-600 hover:bg-red-700">
                  Create Incident
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-red-500/20 to-red-600/10 border-red-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-300">
                Total Incidents
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-red-300">
                {stats.open} currently open
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-300">
                MTTR
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.mttr}m</div>
              <p className="text-xs text-yellow-300">
                Mean time to resolution
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-300">
                MTTA
              </CardTitle>
              <Zap className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.mtta}m</div>
              <p className="text-xs text-blue-300">
                Mean time to acknowledgment
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">
                SLA Breaches
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.slaBreaches}</div>
              <p className="text-xs text-purple-300">
                This month
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs defaultValue="incidents" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
          <TabsTrigger value="incidents">Active Incidents</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="mt-6 space-y-6">
          {/* Filters */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="OPEN">Open</SelectItem>
                    <SelectItem value="ACKNOWLEDGED">Acknowledged</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="RESOLVED">Resolved</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.severity} onValueChange={(value) => setFilters({ ...filters, severity: value })}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="All Severities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Severities</SelectItem>
                    <SelectItem value="CRITICAL">Critical</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="LOW">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="SYSTEM">System</SelectItem>
                    <SelectItem value="SECURITY">Security</SelectItem>
                    <SelectItem value="PERFORMANCE">Performance</SelectItem>
                    <SelectItem value="INTEGRATION">Integration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Incidents List */}
          <div className="space-y-4">
            {incidents.map((incident) => (
              <Card key={incident.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="font-mono text-xs bg-gray-600/50 text-gray-300">
                          {incident.incidentId}
                        </Badge>
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                        <Badge className={getStatusColor(incident.status)}>
                          {getStatusIcon(incident.status)}
                          {incident.status}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-medium text-white mb-1">{incident.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{incident.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(incident.createdAt), 'MMM dd, HH:mm')}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          Category: {incident.category}
                        </div>
                        {incident.affectedSystems && incident.affectedSystems.length > 0 && (
                          <span>Systems: {incident.affectedSystems.join(', ')}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {incident.status === 'OPEN' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateIncidentStatus(incident.id, 'ACKNOWLEDGED')}
                        >
                          Acknowledge
                        </Button>
                      )}
                      {incident.status === 'ACKNOWLEDGED' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateIncidentStatus(incident.id, 'IN_PROGRESS')}
                        >
                          Start Work
                        </Button>
                      )}
                      {incident.status === 'IN_PROGRESS' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateIncidentStatus(incident.id, 'RESOLVED')}
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {incidents.length === 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-400">No incidents found matching your filters</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6 space-y-6">
          {stats && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Incidents by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.byCategory}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          dataKey="count"
                          nameKey="category"
                        >
                          {stats.byCategory.map((entry, index) => (
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

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Incidents by Severity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.bySeverity}>
                        <XAxis 
                          dataKey="severity" 
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
                        <Bar dataKey="count" fill="#60B5FF" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="trends" className="mt-6 space-y-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Incident Trends</CardTitle>
              <CardDescription>Historical incident data and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Trend analysis will be available with more historical data</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
