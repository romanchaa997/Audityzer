
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
import { Switch } from '@/components/ui/switch'
import { 
  Zap, 
  Play, 
  Pause, 
  Trash2,
  Plus,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  GitBranch,
  BarChart3
} from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, BarChart } from 'recharts'
import { format } from 'date-fns'

interface Workflow {
  id: string
  name: string
  description?: string
  trigger: any
  actions: any[]
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'ARCHIVED'
  priority: number
  lastRun?: string
  nextRun?: string
  runCount: number
  successCount: number
  failureCount: number
  createdAt: string
}

interface WorkflowExecution {
  id: string
  workflowId: string
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'TIMEOUT'
  startedAt: string
  completedAt?: string
  duration?: number
  errorLog?: string
}

interface WorkflowStats {
  total: number
  successful: number
  failed: number
  running: number
  successRate: number
  avgDuration: number
}

export default function WorkflowAutomationDashboard() {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [executions, setExecutions] = useState<WorkflowExecution[]>([])
  const [stats, setStats] = useState<WorkflowStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    triggerType: 'MANUAL',
    actions: []
  })

  const fetchWorkflows = async () => {
    try {
      setLoading(true)
      const [workflowsResponse, statsResponse] = await Promise.all([
        fetch('/api/enterprise/workflows'),
        fetch('/api/enterprise/workflows?action=stats')
      ])

      if (workflowsResponse.ok) {
        const workflowsData = await workflowsResponse.json()
        setWorkflows(workflowsData.data)
      }

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData.data)
      }
    } catch (error) {
      console.error('Error fetching workflows:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchExecutions = async (workflowId: string) => {
    try {
      const response = await fetch(`/api/enterprise/workflows?action=executions&id=${workflowId}`)
      if (response.ok) {
        const data = await response.json()
        setExecutions(data.data)
      }
    } catch (error) {
      console.error('Error fetching executions:', error)
    }
  }

  const createWorkflow = async () => {
    try {
      const trigger = {
        type: newWorkflow.triggerType,
        ...(newWorkflow.triggerType === 'SCHEDULE' && { schedule: '0 0 * * *' }) // Daily
      }

      const actions = [
        {
          type: 'NOTIFICATION',
          config: {
            title: 'Workflow Executed',
            message: `Workflow ${newWorkflow.name} has been executed`,
            type: 'INFO'
          }
        }
      ]

      const response = await fetch('/api/enterprise/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          name: newWorkflow.name,
          description: newWorkflow.description,
          trigger,
          actions,
          priority: 5
        })
      })

      if (response.ok) {
        setCreateDialogOpen(false)
        setNewWorkflow({ name: '', description: '', triggerType: 'MANUAL', actions: [] })
        fetchWorkflows()
      }
    } catch (error) {
      console.error('Error creating workflow:', error)
    }
  }

  const executeWorkflow = async (workflowId: string) => {
    try {
      const response = await fetch('/api/enterprise/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'execute',
          workflowId
        })
      })

      if (response.ok) {
        fetchWorkflows()
        if (selectedWorkflow?.id === workflowId) {
          fetchExecutions(workflowId)
        }
      }
    } catch (error) {
      console.error('Error executing workflow:', error)
    }
  }

  const toggleWorkflowStatus = async (workflowId: string, status: 'ACTIVE' | 'INACTIVE') => {
    try {
      const response = await fetch('/api/enterprise/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle',
          workflowId,
          status
        })
      })

      if (response.ok) {
        fetchWorkflows()
      }
    } catch (error) {
      console.error('Error toggling workflow status:', error)
    }
  }

  const deleteWorkflow = async (workflowId: string) => {
    try {
      const response = await fetch('/api/enterprise/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          workflowId
        })
      })

      if (response.ok) {
        fetchWorkflows()
        if (selectedWorkflow?.id === workflowId) {
          setSelectedWorkflow(null)
        }
      }
    } catch (error) {
      console.error('Error deleting workflow:', error)
    }
  }

  useEffect(() => {
    fetchWorkflows()
  }, [])

  useEffect(() => {
    if (selectedWorkflow) {
      fetchExecutions(selectedWorkflow.id)
    }
  }, [selectedWorkflow])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'INACTIVE':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'DRAFT':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'ARCHIVED':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getExecutionStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'FAILED':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'RUNNING':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getExecutionStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4" />
      case 'FAILED':
        return <XCircle className="h-4 w-4" />
      case 'RUNNING':
        return <Activity className="h-4 w-4" />
      case 'PENDING':
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const formatDuration = (duration?: number) => {
    if (!duration) return 'N/A'
    const seconds = Math.floor(duration / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Zap className="h-8 w-8 animate-pulse text-blue-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading workflow automation...</p>
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
          <h2 className="text-2xl font-bold text-white mb-2">Workflow Automation</h2>
          <p className="text-gray-400">Automate system operations and processes</p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Workflow</DialogTitle>
              <DialogDescription>
                Create an automated workflow for system operations.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Name</Label>
                <Input
                  value={newWorkflow.name}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Workflow name"
                />
              </div>
              <div>
                <Label className="text-gray-300">Description</Label>
                <Textarea
                  value={newWorkflow.description}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={3}
                  placeholder="Workflow description"
                />
              </div>
              <div>
                <Label className="text-gray-300">Trigger Type</Label>
                <Select value={newWorkflow.triggerType} onValueChange={(value) => setNewWorkflow({ ...newWorkflow, triggerType: value })}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MANUAL">Manual</SelectItem>
                    <SelectItem value="SCHEDULE">Scheduled</SelectItem>
                    <SelectItem value="EVENT">Event-based</SelectItem>
                    <SelectItem value="THRESHOLD">Threshold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createWorkflow} className="bg-blue-600 hover:bg-blue-700">
                  Create Workflow
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-300">
                Total Executions
              </CardTitle>
              <Zap className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-blue-300">
                All time executions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-300">
                Success Rate
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.successRate.toFixed(1)}%</div>
              <p className="text-xs text-green-300">
                {stats.successful} successful
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/20 to-red-600/10 border-red-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-300">
                Failed Executions
              </CardTitle>
              <XCircle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.failed}</div>
              <p className="text-xs text-red-300">
                Require attention
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">
                Avg Duration
              </CardTitle>
              <Clock className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatDuration(stats.avgDuration)}</div>
              <p className="text-xs text-purple-300">
                Average execution time
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflows List */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Workflows</CardTitle>
              <CardDescription>Manage automated workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedWorkflow?.id === workflow.id
                        ? 'border-blue-500/50 bg-blue-500/10'
                        : 'border-gray-700 bg-gray-800/30'
                    }`}
                    onClick={() => setSelectedWorkflow(workflow)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-white">{workflow.name}</h3>
                          <Badge className={getStatusColor(workflow.status)}>
                            {workflow.status}
                          </Badge>
                        </div>
                        {workflow.description && (
                          <p className="text-sm text-gray-400 mb-2">{workflow.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Priority: {workflow.priority}</span>
                          <span>Runs: {workflow.runCount}</span>
                          <span>Success: {workflow.successCount}</span>
                          <span>Failed: {workflow.failureCount}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            executeWorkflow(workflow.id)
                          }}
                          disabled={workflow.status !== 'ACTIVE'}
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleWorkflowStatus(
                              workflow.id,
                              workflow.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
                            )
                          }}
                        >
                          {workflow.status === 'ACTIVE' ? (
                            <Pause className="h-3 w-3" />
                          ) : (
                            <Play className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteWorkflow(workflow.id)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {workflows.length === 0 && (
                  <div className="text-center py-8">
                    <GitBranch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No workflows created yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflow Details */}
        <div className="space-y-4">
          {selectedWorkflow ? (
            <>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Workflow Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">{selectedWorkflow.name}</h3>
                      {selectedWorkflow.description && (
                        <p className="text-sm text-gray-400 mt-1">{selectedWorkflow.description}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Status</span>
                        <Badge className={getStatusColor(selectedWorkflow.status)}>
                          {selectedWorkflow.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Priority</span>
                        <span className="text-white">{selectedWorkflow.priority}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Total Runs</span>
                        <span className="text-white">{selectedWorkflow.runCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Success Rate</span>
                        <span className="text-white">
                          {selectedWorkflow.runCount > 0
                            ? ((selectedWorkflow.successCount / selectedWorkflow.runCount) * 100).toFixed(1)
                            : 0}%
                        </span>
                      </div>
                      {selectedWorkflow.lastRun && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Last Run</span>
                          <span className="text-white">
                            {format(new Date(selectedWorkflow.lastRun), 'MMM dd, HH:mm')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Executions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {executions.slice(0, 5).map((execution) => (
                      <div key={execution.id} className="flex items-center justify-between p-2 rounded border border-gray-700">
                        <div className="flex items-center gap-2">
                          <Badge className={getExecutionStatusColor(execution.status)}>
                            {getExecutionStatusIcon(execution.status)}
                            {execution.status}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            {format(new Date(execution.startedAt), 'MMM dd, HH:mm')}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {formatDuration(execution.duration)}
                        </span>
                      </div>
                    ))}

                    {executions.length === 0 && (
                      <div className="text-center py-4">
                        <p className="text-gray-400 text-sm">No executions yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Select a workflow to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
