
'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/dashboard-layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import SystemOverview from '@/components/master-admin/system-overview'
import RealTimeMetrics from '@/components/master-admin/real-time-metrics'
import SecurityCenter from '@/components/master-admin/security-center'
import CrossPlatformManager from '@/components/master-admin/cross-platform-manager'
import BusinessIntelligenceDashboard from '@/components/enterprise/business-intelligence-dashboard'
import IncidentManagementDashboard from '@/components/enterprise/incident-management-dashboard'
import WorkflowAutomationDashboard from '@/components/enterprise/workflow-automation-dashboard'
import AdvancedSecurityDashboard from '@/components/enterprise/advanced-security-dashboard'
import ComplianceManagementDashboard from '@/components/enterprise/compliance-management-dashboard'
import ResourceOptimizationDashboard from '@/components/enterprise/resource-optimization-dashboard'
import ApiManagementDashboard from '@/components/enterprise/api-management-dashboard'
import { 
  Shield, 
  Activity, 
  Globe, 
  BarChart3, 
  AlertTriangle,
  Crown,
  Brain,
  Zap,
  GitBranch,
  FileText,
  Target,
  Settings,
  TrendingUp
} from 'lucide-react'

export const dynamic = "force-dynamic"

export default function MasterAdminPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Master Admin Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Crown className="h-8 w-8 text-yellow-500" />
              <div>
                <h1 className="text-3xl font-bold text-white">Enterprise Master Admin Portal</h1>
                <p className="text-gray-400">
                  Advanced enterprise command center with AI-powered insights and automation
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              <Shield className="h-3 w-3 mr-1" />
              Super Admin Access
            </Badge>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              All Systems Operational
            </Badge>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-300">
                System Health
              </CardTitle>
              <Activity className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">98.7%</div>
              <p className="text-xs text-blue-300">
                Overall platform uptime
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-300">
                Security Status
              </CardTitle>
              <Shield className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Secure</div>
              <p className="text-xs text-green-300">
                Zero critical threats
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">
                Active Workflows
              </CardTitle>
              <GitBranch className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-purple-300">
                Automation running
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-300">
                Cost Optimization
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$2.4K</div>
              <p className="text-xs text-orange-300">
                Monthly savings identified
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enterprise Master Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 bg-gray-800/50 p-1">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-1 text-xs"
            >
              <Activity className="h-3 w-3" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="business-intelligence" 
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white flex items-center gap-1 text-xs"
            >
              <Brain className="h-3 w-3" />
              <span className="hidden sm:inline">BI</span>
            </TabsTrigger>
            <TabsTrigger 
              value="incidents" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white flex items-center gap-1 text-xs"
            >
              <AlertTriangle className="h-3 w-3" />
              <span className="hidden sm:inline">Incidents</span>
            </TabsTrigger>
            <TabsTrigger 
              value="workflows" 
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white flex items-center gap-1 text-xs"
            >
              <GitBranch className="h-3 w-3" />
              <span className="hidden sm:inline">Workflows</span>
            </TabsTrigger>
            <TabsTrigger 
              value="advanced-security" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white flex items-center gap-1 text-xs"
            >
              <Shield className="h-3 w-3" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger 
              value="compliance" 
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white flex items-center gap-1 text-xs"
            >
              <FileText className="h-3 w-3" />
              <span className="hidden sm:inline">Compliance</span>
            </TabsTrigger>
            <TabsTrigger 
              value="optimization" 
              className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white flex items-center gap-1 text-xs"
            >
              <Target className="h-3 w-3" />
              <span className="hidden sm:inline">Optimization</span>
            </TabsTrigger>
            <TabsTrigger 
              value="api-management" 
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white flex items-center gap-1 text-xs"
            >
              <Globe className="h-3 w-3" />
              <span className="hidden sm:inline">APIs</span>
            </TabsTrigger>
            <TabsTrigger 
              value="metrics" 
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white flex items-center gap-1 text-xs"
            >
              <BarChart3 className="h-3 w-3" />
              <span className="hidden sm:inline">Metrics</span>
            </TabsTrigger>
            <TabsTrigger 
              value="platforms" 
              className="data-[state=active]:bg-orange-600 data-[state=active]:text-white flex items-center gap-1 text-xs"
            >
              <Globe className="h-3 w-3" />
              <span className="hidden sm:inline">Platforms</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <SystemOverview />
          </TabsContent>

          <TabsContent value="business-intelligence" className="mt-6">
            <BusinessIntelligenceDashboard />
          </TabsContent>

          <TabsContent value="incidents" className="mt-6">
            <IncidentManagementDashboard />
          </TabsContent>

          <TabsContent value="workflows" className="mt-6">
            <WorkflowAutomationDashboard />
          </TabsContent>

          <TabsContent value="advanced-security" className="mt-6">
            <AdvancedSecurityDashboard />
          </TabsContent>

          <TabsContent value="compliance" className="mt-6">
            <ComplianceManagementDashboard />
          </TabsContent>

          <TabsContent value="optimization" className="mt-6">
            <ResourceOptimizationDashboard />
          </TabsContent>

          <TabsContent value="api-management" className="mt-6">
            <ApiManagementDashboard />
          </TabsContent>

          <TabsContent value="metrics" className="mt-6">
            <RealTimeMetrics />
          </TabsContent>

          <TabsContent value="platforms" className="mt-6">
            <CrossPlatformManager />
          </TabsContent>
        </Tabs>

        {/* Enterprise Emergency Controls */}
        <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Enterprise Emergency Controls
            </CardTitle>
            <CardDescription className="text-red-300">
              Critical enterprise-grade system administration functions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-red-500/20 border-red-500/50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                    <h4 className="font-medium text-white mb-2">Global Lockdown</h4>
                    <p className="text-xs text-red-300 mb-4">
                      Emergency shutdown of all systems
                    </p>
                    <Button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm">
                      Emergency Lock
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-500/20 border-orange-500/50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Shield className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                    <h4 className="font-medium text-white mb-2">Security Sweep</h4>
                    <p className="text-xs text-orange-300 mb-4">
                      Comprehensive security audit
                    </p>
                    <Button className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm">
                      Start Sweep
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-500/20 border-yellow-500/50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <h4 className="font-medium text-white mb-2">Auto-Optimize</h4>
                    <p className="text-xs text-yellow-300 mb-4">
                      Apply all pending optimizations
                    </p>
                    <Button className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm">
                      Auto-Optimize
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-500/20 border-blue-500/50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Settings className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-medium text-white mb-2">System Restart</h4>
                    <p className="text-xs text-blue-300 mb-4">
                      Graceful restart of all services
                    </p>
                    <Button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm">
                      Restart All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
