
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  Building2,
  Code2,
  Users,
  Settings,
  FileText,
  Home,
  Shield,
  Activity,
  Database,
  Zap,
  ChevronDown,
  ChevronRight,
  Circle,
  Crown,
  Globe,
  Eye,
  Lock,
  AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const mainNavigation = [
  {
    title: 'Overview',
    href: '/',
    icon: Home,
    badge: null
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    badge: { text: 'Live', variant: 'success' as const }
  },
  {
    title: 'Multi-tenant',
    href: '/tenants',
    icon: Building2,
    badge: { text: '12', variant: 'default' as const }
  },
  {
    title: 'API Docs',
    href: '/developers',
    icon: Code2,
    badge: null
  },
]

const managementNavigation = [
  {
    title: 'User Management',
    href: '/users',
    icon: Users,
    badge: null
  },
  {
    title: 'System Admin',
    href: '/admin',
    icon: Settings,
    badge: { text: '2', variant: 'warning' as const }
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileText,
    badge: null
  },
]

const masterAdminNavigation = [
  {
    title: 'Master Portal',
    href: '/master-admin',
    icon: Crown,
    badge: { text: 'Admin', variant: 'special' as const }
  }
]

const monitoringItems = [
  {
    title: 'System Health',
    href: '/monitoring/health',
    icon: Activity,
    status: 'healthy'
  },
  {
    title: 'Performance',
    href: '/monitoring/performance',
    icon: Zap,
    status: 'healthy'
  },
  {
    title: 'Security',
    href: '/monitoring/security',
    icon: Shield,
    status: 'healthy'
  },
  {
    title: 'Database',
    href: '/monitoring/database',
    icon: Database,
    status: 'healthy'
  },
  {
    title: 'Integrations',
    href: '/monitoring/integrations',
    icon: Globe,
    status: 'healthy'
  },
]

const securityItems = [
  {
    title: 'Access Control',
    href: '/security/access',
    icon: Lock,
    status: 'secure'
  },
  {
    title: 'Audit Logs',
    href: '/security/audit',
    icon: Eye,
    status: 'secure'
  },
  {
    title: 'Threat Detection',
    href: '/security/threats',
    icon: AlertTriangle,
    status: 'secure'
  },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [monitoringExpanded, setMonitoringExpanded] = useState(false)
  const [securityExpanded, setSecurityExpanded] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': 
      case 'secure': 
        return 'text-green-400'
      case 'warning': return 'text-yellow-400'
      case 'error': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getBadgeVariant = (variant: string) => {
    switch (variant) {
      case 'success': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'special': return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30'
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-72 transform border-r border-gray-800 bg-gray-900 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Navigation content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Master Admin Section */}
            <div className="mb-8">
              <h2 className="mb-4 px-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">
                Master Control
              </h2>
              <nav className="space-y-1">
                {masterAdminNavigation.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg"
                          : "text-gray-300 hover:bg-gradient-to-r hover:from-yellow-600/20 hover:to-orange-600/20 hover:text-yellow-400"
                      )}
                    >
                      <div className="flex items-center">
                        <Icon className="mr-3 h-5 w-5" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className={cn("text-xs", getBadgeVariant(item.badge.variant))}
                        >
                          {item.badge.text}
                        </Badge>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Platform Navigation */}
            <div className="mb-8">
              <h2 className="mb-4 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Platforms
              </h2>
              <nav className="space-y-1">
                {mainNavigation.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      )}
                    >
                      <div className="flex items-center">
                        <Icon className="mr-3 h-5 w-5" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className={cn("text-xs", getBadgeVariant(item.badge.variant))}
                        >
                          {item.badge.text}
                        </Badge>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Management */}
            <div className="mb-8">
              <h2 className="mb-4 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Management
              </h2>
              <nav className="space-y-1">
                {managementNavigation.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      )}
                    >
                      <div className="flex items-center">
                        <Icon className="mr-3 h-5 w-5" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className={cn("text-xs", getBadgeVariant(item.badge.variant))}
                        >
                          {item.badge.text}
                        </Badge>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* System Monitoring */}
            <div className="mb-6">
              <Collapsible open={monitoringExpanded} onOpenChange={setMonitoringExpanded}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="mb-2 flex w-full items-center justify-between px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-400 hover:text-gray-300"
                  >
                    <span>System Monitoring</span>
                    {monitoringExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  {monitoringItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-blue-600 text-white"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        )}
                      >
                        <div className="flex items-center">
                          <Icon className="mr-3 h-4 w-4" />
                          <span>{item.title}</span>
                        </div>
                        <Circle className={cn("h-2 w-2 fill-current", getStatusColor(item.status))} />
                      </Link>
                    )
                  })}
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Security */}
            <div>
              <Collapsible open={securityExpanded} onOpenChange={setSecurityExpanded}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="mb-2 flex w-full items-center justify-between px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-400 hover:text-gray-300"
                  >
                    <span>Security</span>
                    {securityExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  {securityItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-blue-600 text-white"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        )}
                      >
                        <div className="flex items-center">
                          <Icon className="mr-3 h-4 w-4" />
                          <span>{item.title}</span>
                        </div>
                        <Circle className={cn("h-2 w-2 fill-current", getStatusColor(item.status))} />
                      </Link>
                    )
                  })}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* System Status Footer */}
          <div className="border-t border-gray-800 p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">System Status</span>
                <div className="flex items-center gap-2">
                  <Circle className="h-2 w-2 fill-current text-green-400" />
                  <span className="text-green-400">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Security Level</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                  <Shield className="h-2 w-2 mr-1" />
                  High
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
