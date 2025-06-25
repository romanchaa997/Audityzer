
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  FileText,
  Plus,
  Download,
  Eye,
  Settings,
  Target,
  Calendar,
  BarChart3
} from 'lucide-react'
import { Pie, PieChart, ResponsiveContainer, Cell, Bar, BarChart, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { format, isBefore, addDays } from 'date-fns'

interface ComplianceDashboard {
  overview: {
    totalFrameworks: number
    activeFrameworks: number
    overallScore: number
    controlsImplemented: number
    controlsTotal: number
    upcomingAssessments: number
  }
  frameworkStatus: {
    framework: string
    score: number
    status: string
    dueDate?: string
    risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  }[]
  recentAssessments: any[]
  controlsByCategory: {
    category: string
    total: number
    implemented: number
    partiallyImplemented: number
    notImplemented: number
  }[]
  upcomingDeadlines: {
    framework: string
    dueDate: string
    daysRemaining: number
    risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  }[]
}

interface ComplianceFramework {
  id: string
  name: string
  version: string
  description: string
  status: string
  dueDate?: string
  responsible: string
  createdAt: string
}

interface ComplianceControl {
  id: string
  frameworkId: string
  controlId: string
  name: string
  description: string
  category: string
  priority: string
  status: string
  assessedAt?: string
  nextReview?: string
}

export default function ComplianceManagementDashboard() {
  const [dashboard, setDashboard] = useState<ComplianceDashboard | null>(null)
  const [frameworks, setFrameworks] = useState<ComplianceFramework[]>([])
  const [selectedFramework, setSelectedFramework] = useState<ComplianceFramework | null>(null)
  const [controls, setControls] = useState<ComplianceControl[]>([])
  const [loading, setLoading] = useState(true)
  const [createFrameworkOpen, setCreateFrameworkOpen] = useState(false)
  
  const [newFramework, setNewFramework] = useState({
    name: '',
    description: '',
    dueDate: ''
  })

  const fetchComplianceData = async () => {
    try {
      setLoading(true)
      const [dashboardResponse, frameworksResponse] = await Promise.all([
        fetch('/api/enterprise/compliance?action=dashboard'),
        fetch('/api/enterprise/compliance?action=frameworks')
      ])

      if (dashboardResponse.ok) {
        const dashboardData = await dashboardResponse.json()
        setDashboard(dashboardData.data)
      }

      if (frameworksResponse.ok) {
        const frameworksData = await frameworksResponse.json()
        setFrameworks(frameworksData.data)
      }
    } catch (error) {
      console.error('Error fetching compliance data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchFrameworkControls = async (frameworkId: string) => {
    try {
      const response = await fetch(`/api/enterprise/compliance?action=controls&frameworkId=${frameworkId}`)
      if (response.ok) {
        const data = await response.json()
        setControls(data.data)
      }
    } catch (error) {
      console.error('Error fetching controls:', error)
    }
  }

  const createFramework = async () => {
    try {
      const response = await fetch('/api/enterprise/compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'createFramework',
          name: newFramework.name,
          description: newFramework.description,
          dueDate: newFramework.dueDate ? new Date(newFramework.dueDate) : null,
          requirements: {}
        })
      })

      if (response.ok) {
        setCreateFrameworkOpen(false)
        setNewFramework({ name: '', description: '', dueDate: '' })
        fetchComplianceData()
      }
    } catch (error) {
      console.error('Error creating framework:', error)
    }
  }

  const updateControlStatus = async (controlId: string, status: string) => {
    try {
      const response = await fetch('/api/enterprise/compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateControlStatus',
          controlId,
          status
        })
      })

      if (response.ok) {
        if (selectedFramework) {
          fetchFrameworkControls(selectedFramework.id)
        }
        fetchComplianceData()
      }
    } catch (error) {
      console.error('Error updating control status:', error)
    }
  }

  const generateReport = async (frameworkId: string) => {
    try {
      const response = await fetch(`/api/enterprise/compliance?action=report&frameworkId=${frameworkId}`)
      if (response.ok) {
        const data = await response.json()
        console.log('Compliance report:', data.data)
        // In a real app, this would trigger a download
        alert('Report generated successfully!')
      }
    } catch (error) {
      console.error('Error generating report:', error)
    }
  }

  useEffect(() => {
    fetchComplianceData()
  }, [])

  useEffect(() => {
    if (selectedFramework) {
      fetchFrameworkControls(selectedFramework.id)
    }
  }, [selectedFramework])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'IMPLEMENTED':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'PARTIALLY_IMPLEMENTED':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'NOT_IMPLEMENTED':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'NOT_APPLICABLE':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'DEFERRED':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'IMPLEMENTED':
        return <CheckCircle className="h-4 w-4" />
      case 'NOT_IMPLEMENTED':
        return <XCircle className="h-4 w-4" />
      case 'PARTIALLY_IMPLEMENTED':
        return <Clock className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const COLORS = ['#72BF78', '#FF9149', '#FF6363', '#A19AD3', '#80D8C3']

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Shield className="h-8 w-8 animate-pulse text-blue-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading compliance dashboard...</p>
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
          <h2 className="text-2xl font-bold text-white mb-2">Compliance Management</h2>
          <p className="text-gray-400">Monitor and manage regulatory compliance</p>
        </div>
        <Dialog open={createFrameworkOpen} onOpenChange={setCreateFrameworkOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Framework
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Add Compliance Framework</DialogTitle>
              <DialogDescription>
                Add a new compliance framework to track and manage.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Framework Name</Label>
                <Select value={newFramework.name} onValueChange={(value) => setNewFramework({ ...newFramework, name: value })}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SOC2">SOC 2</SelectItem>
                    <SelectItem value="GDPR">GDPR</SelectItem>
                    <SelectItem value="HIPAA">HIPAA</SelectItem>
                    <SelectItem value="ISO27001">ISO 27001</SelectItem>
                    <SelectItem value="PCI-DSS">PCI DSS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Description</Label>
                <Textarea
                  value={newFramework.description}
                  onChange={(e) => setNewFramework({ ...newFramework, description: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Framework description"
                />
              </div>
              <div>
                <Label className="text-gray-300">Due Date (Optional)</Label>
                <Input
                  type="date"
                  value={newFramework.dueDate}
                  onChange={(e) => setNewFramework({ ...newFramework, dueDate: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setCreateFrameworkOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createFramework} className="bg-blue-600 hover:bg-blue-700">
                  Add Framework
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Cards */}
      {dashboard && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-300">
                Overall Score
              </CardTitle>
              <Target className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{dashboard.overview.overallScore}%</div>
              <p className="text-xs text-blue-300">
                Compliance rating
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-300">
                Controls Implemented
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboard.overview.controlsImplemented}/{dashboard.overview.controlsTotal}
              </div>
              <p className="text-xs text-green-300">
                {dashboard.overview.controlsTotal > 0 
                  ? ((dashboard.overview.controlsImplemented / dashboard.overview.controlsTotal) * 100).toFixed(1)
                  : 0}% complete
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">
                Active Frameworks
              </CardTitle>
              <FileText className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboard.overview.activeFrameworks}/{dashboard.overview.totalFrameworks}
              </div>
              <p className="text-xs text-purple-300">
                Frameworks active
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-300">
                Upcoming Assessments
              </CardTitle>
              <Calendar className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{dashboard.overview.upcomingAssessments}</div>
              <p className="text-xs text-orange-300">
                Next 30 days
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="controls">Controls</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {dashboard && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Framework Status */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Framework Status</CardTitle>
                  <CardDescription>Compliance status by framework</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboard.frameworkStatus.map((framework) => (
                      <div key={framework.framework} className="flex items-center justify-between p-3 rounded-lg border border-gray-700">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium text-white">{framework.framework}</h4>
                            <Badge className={getRiskColor(framework.risk)}>
                              {framework.risk}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                                <span>Score</span>
                                <span>{framework.score}%</span>
                              </div>
                              <Progress value={framework.score} className="h-2" />
                            </div>
                            {framework.dueDate && (
                              <div className="text-right">
                                <p className="text-xs text-gray-400">Due</p>
                                <p className="text-xs text-white">
                                  {format(new Date(framework.dueDate), 'MMM dd')}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Controls by Category */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Controls by Category</CardTitle>
                  <CardDescription>Implementation status by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dashboard.controlsByCategory}>
                        <XAxis 
                          dataKey="category" 
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
                        <Legend 
                          verticalAlign="top" 
                          height={36}
                          wrapperStyle={{ fontSize: '11px' }}
                        />
                        <Bar dataKey="implemented" stackId="a" fill="#72BF78" name="Implemented" />
                        <Bar dataKey="partiallyImplemented" stackId="a" fill="#FF9149" name="Partial" />
                        <Bar dataKey="notImplemented" stackId="a" fill="#FF6363" name="Not Implemented" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card className="lg:col-span-2 bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Upcoming Deadlines</CardTitle>
                  <CardDescription>Critical compliance deadlines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboard.upcomingDeadlines.map((deadline) => (
                      <div key={deadline.framework} className="flex items-center justify-between p-3 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="font-medium text-white">{deadline.framework}</p>
                            <p className="text-sm text-gray-400">
                              Due {format(new Date(deadline.dueDate), 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getRiskColor(deadline.risk)}>
                            {deadline.risk}
                          </Badge>
                          <span className="text-sm text-white">
                            {deadline.daysRemaining} days
                          </span>
                        </div>
                      </div>
                    ))}

                    {dashboard.upcomingDeadlines.length === 0 && (
                      <div className="text-center py-4">
                        <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                        <p className="text-gray-400">No upcoming deadlines</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="frameworks" className="mt-6 space-y-6">
          <div className="space-y-4">
            {frameworks.map((framework) => (
              <Card 
                key={framework.id} 
                className={`bg-gray-800/50 border-gray-700 cursor-pointer transition-colors ${
                  selectedFramework?.id === framework.id ? 'border-blue-500/50 bg-blue-500/10' : ''
                }`}
                onClick={() => setSelectedFramework(framework)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-white">{framework.name}</h3>
                        <Badge className="bg-gray-600/50 text-gray-300">
                          v{framework.version}
                        </Badge>
                        <Badge className={getStatusColor(framework.status)}>
                          {framework.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{framework.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Created: {format(new Date(framework.createdAt), 'MMM dd, yyyy')}</span>
                        {framework.dueDate && (
                          <span>Due: {format(new Date(framework.dueDate), 'MMM dd, yyyy')}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          generateReport(framework.id)
                        }}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Report
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedFramework(framework)
                        }}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {frameworks.length === 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No compliance frameworks added yet</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="controls" className="mt-6 space-y-6">
          {selectedFramework ? (
            <div className="space-y-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    {selectedFramework.name} Controls
                  </CardTitle>
                  <CardDescription>
                    Manage controls for {selectedFramework.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {controls.map((control) => (
                      <div key={control.id} className="p-4 rounded-lg border border-gray-700">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className="font-mono text-xs bg-gray-600/50 text-gray-300">
                                {control.controlId}
                              </Badge>
                              <Badge className={getPriorityColor(control.priority)}>
                                {control.priority}
                              </Badge>
                              <Badge className={getStatusColor(control.status)}>
                                {getStatusIcon(control.status)}
                                {control.status}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-white mb-1">{control.name}</h4>
                            <p className="text-sm text-gray-400 mb-2">{control.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Category: {control.category}</span>
                              {control.assessedAt && (
                                <span>Assessed: {format(new Date(control.assessedAt), 'MMM dd, yyyy')}</span>
                              )}
                              {control.nextReview && (
                                <span>Next Review: {format(new Date(control.nextReview), 'MMM dd, yyyy')}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            {control.status === 'NOT_IMPLEMENTED' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateControlStatus(control.id, 'PARTIALLY_IMPLEMENTED')}
                              >
                                Start
                              </Button>
                            )}
                            {control.status === 'PARTIALLY_IMPLEMENTED' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateControlStatus(control.id, 'IMPLEMENTED')}
                              >
                                Complete
                              </Button>
                            )}
                            {control.status === 'IMPLEMENTED' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateControlStatus(control.id, 'PARTIALLY_IMPLEMENTED')}
                              >
                                Review
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {controls.length === 0 && (
                      <div className="text-center py-8">
                        <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">No controls found for this framework</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Select a framework to view its controls</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="reports" className="mt-6 space-y-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Compliance Reports</CardTitle>
              <CardDescription>Generate and download compliance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {frameworks.map((framework) => (
                  <div key={framework.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-700">
                    <div>
                      <h4 className="font-medium text-white">{framework.name}</h4>
                      <p className="text-sm text-gray-400">Generate compliance report</p>
                    </div>
                    <Button
                      onClick={() => generateReport(framework.id)}
                      variant="outline"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                ))}

                {frameworks.length === 0 && (
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No frameworks available for reporting</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
