
'use client'

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Settings, 
  Database, 
  Server, 
  Shield, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Cpu,
  MonitorSpeaker,
  Wifi,
  RefreshCw
} from 'lucide-react'

interface SystemHealth {
  cpu: number
  memory: number
  disk: number
  network: number
  uptime: string
  lastBackup: string
  securityStatus: string
}

export default function AdminPage() {
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    cpu: 45,
    memory: 67,
    disk: 34,
    network: 89,
    uptime: '12 days, 4 hours',
    lastBackup: '2 hours ago',
    securityStatus: 'secure'
  })
  const [loading, setLoading] = useState(false)

  const refreshSystemHealth = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setSystemHealth(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 40) + 30,
        memory: Math.floor(Math.random() * 40) + 50,
        disk: Math.floor(Math.random() * 20) + 25,
        network: Math.floor(Math.random() * 20) + 80,
      }))
      setLoading(false)
    }, 1000)
  }

  const getHealthColor = (value: number, type: 'cpu' | 'memory' | 'disk' | 'network') => {
    const thresholds = {
      cpu: { warning: 70, critical: 85 },
      memory: { warning: 75, critical: 90 },
      disk: { warning: 80, critical: 95 },
      network: { warning: 30, critical: 10 }
    }
    
    const threshold = thresholds[type]
    if (type === 'network') {
      // Network is good when high
      if (value >= threshold.warning) return 'bg-green-500'
      if (value >= threshold.critical) return 'bg-yellow-500'
      return 'bg-red-500'
    } else {
      // CPU, Memory, Disk are good when low
      if (value >= threshold.critical) return 'bg-red-500'
      if (value >= threshold.warning) return 'bg-yellow-500'
      return 'bg-green-500'
    }
  }

  const systemServices = [
    { name: 'Analytics Engine', status: 'running', uptime: '99.9%', port: '8001' },
    { name: 'Multi-tenant API', status: 'running', uptime: '99.8%', port: '8002' },
    { name: 'Documentation Server', status: 'running', uptime: '99.7%', port: '8003' },
    { name: 'Database Cluster', status: 'running', uptime: '99.9%', port: '5432' },
    { name: 'Redis Cache', status: 'running', uptime: '99.6%', port: '6379' },
    { name: 'Message Queue', status: 'maintenance', uptime: '98.9%', port: '5672' },
  ]

  const securityAlerts = [
    { id: 1, type: 'info', message: 'SSL certificates renewed successfully', time: '2 hours ago' },
    { id: 2, type: 'warning', message: 'Unusual login pattern detected', time: '5 hours ago' },
    { id: 3, type: 'success', message: 'Security scan completed - no threats found', time: '1 day ago' },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">System Administration</h1>
            <p className="text-gray-400">
              Monitor and manage the Audityzer ecosystem infrastructure
            </p>
          </div>
          <Button 
            onClick={refreshSystemHealth}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Cpu className="h-8 w-8 text-blue-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-400">CPU Usage</p>
                    <p className="text-2xl font-bold text-white">{systemHealth.cpu}%</p>
                  </div>
                </div>
              </div>
              <Progress 
                value={systemHealth.cpu} 
                className="h-2"
                // @ts-ignore
                indicatorClassName={getHealthColor(systemHealth.cpu, 'cpu')}
              />
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <MonitorSpeaker className="h-8 w-8 text-green-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-400">Memory Usage</p>
                    <p className="text-2xl font-bold text-white">{systemHealth.memory}%</p>
                  </div>
                </div>
              </div>
              <Progress 
                value={systemHealth.memory} 
                className="h-2"
                // @ts-ignore
                indicatorClassName={getHealthColor(systemHealth.memory, 'memory')}
              />
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <HardDrive className="h-8 w-8 text-purple-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-400">Disk Usage</p>
                    <p className="text-2xl font-bold text-white">{systemHealth.disk}%</p>
                  </div>
                </div>
              </div>
              <Progress 
                value={systemHealth.disk} 
                className="h-2"
                // @ts-ignore
                indicatorClassName={getHealthColor(systemHealth.disk, 'disk')}
              />
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Wifi className="h-8 w-8 text-orange-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-400">Network</p>
                    <p className="text-2xl font-bold text-white">{systemHealth.network}%</p>
                  </div>
                </div>
              </div>
              <Progress 
                value={systemHealth.network} 
                className="h-2"
                // @ts-ignore
                indicatorClassName={getHealthColor(systemHealth.network, 'network')}
              />
            </CardContent>
          </Card>
        </div>

        {/* System Services */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Server className="h-5 w-5 text-blue-400" />
              System Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      service.status === 'running' ? 'bg-green-500' : 
                      service.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <h4 className="font-medium text-white">{service.name}</h4>
                      <p className="text-sm text-gray-400">Port {service.port}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-white">{service.uptime} uptime</p>
                      <Badge 
                        variant="secondary"
                        className={
                          service.status === 'running' 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : service.status === 'maintenance'
                            ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }
                      >
                        {service.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security & Backup Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                Security Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                  <span className="text-gray-300">Firewall Status</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                  <span className="text-gray-300">SSL Certificates</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Valid
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                  <span className="text-gray-300">Last Security Scan</span>
                  <span className="text-white">1 day ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                  <span className="text-gray-300">Failed Login Attempts</span>
                  <span className="text-yellow-400">3 (last 24h)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-400" />
                Backup & Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                  <span className="text-gray-300">Last Backup</span>
                  <span className="text-white">{systemHealth.lastBackup}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                  <span className="text-gray-300">Backup Status</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Successful
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                  <span className="text-gray-300">System Uptime</span>
                  <span className="text-white">{systemHealth.uptime}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                  <span className="text-gray-300">Next Maintenance</span>
                  <span className="text-yellow-400">In 3 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Security Alerts */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              Recent Security Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {securityAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center gap-3 p-3 bg-gray-750 rounded-lg">
                  {alert.type === 'info' && <CheckCircle className="h-4 w-4 text-blue-400" />}
                  {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-400" />}
                  {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-400" />}
                  
                  <div className="flex-1">
                    <p className="text-white text-sm">{alert.message}</p>
                    <p className="text-gray-400 text-xs">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
