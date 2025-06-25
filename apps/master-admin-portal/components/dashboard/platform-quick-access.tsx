
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  Building2, 
  Code2, 
  ExternalLink, 
  Activity,
  Users,
  Database,
  Settings
} from 'lucide-react'
import Link from 'next/link'

const platforms = [
  {
    name: 'Analytics Dashboard',
    description: 'Real-time analytics and insights',
    href: 'https://audityzer-analytics-production.up.railway.app',
    icon: BarChart3,
    status: 'live',
    stats: { users: 1234, uptime: '99.9%' },
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    external: true
  },
  {
    name: 'Multi-tenant Management',
    description: 'Tenant and resource management',
    href: 'https://audityzer-tenant-mgmt.loca.lt',
    icon: Building2,
    status: 'live',
    stats: { tenants: 84, billing: '$152K' },
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    external: true
  },
  {
    name: 'API Documentation',
    description: 'Developer tools and guides',
    href: '/developers',
    icon: Code2,
    status: 'active',
    stats: { endpoints: 89, calls: '2.3M' },
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    external: false
  }
]

const quickActions = [
  {
    title: 'User Management',
    description: 'Manage users and permissions',
    href: '/users',
    icon: Users,
    color: 'text-blue-400'
  },
  {
    title: 'System Admin',
    description: 'System configuration and monitoring',
    href: '/admin',
    icon: Settings,
    color: 'text-orange-400'
  },
  {
    title: 'Database Health',
    description: 'Monitor database performance',
    href: '/monitoring/database',
    icon: Database,
    color: 'text-green-400'
  },
  {
    title: 'System Health',
    description: 'Overall system monitoring',
    href: '/monitoring/health',
    icon: Activity,
    color: 'text-red-400'
  }
]

export default function PlatformQuickAccess() {
  return (
    <div className="space-y-6">
      {/* Main Platforms */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Platform Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {platforms.map((platform) => {
              const Icon = platform.icon
              
              return (
                <div
                  key={platform.name}
                  className="group relative p-4 rounded-lg border border-gray-700 bg-gray-750 hover:bg-gray-700 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${platform.bgColor}`}>
                      <Icon className={`h-5 w-5 ${platform.color}`} />
                    </div>
                    <Badge 
                      variant="secondary"
                      className={platform.status === 'live' 
                        ? "bg-blue-500/20 text-blue-400 border-blue-500/30" 
                        : "bg-green-500/20 text-green-400 border-green-500/30"
                      }
                    >
                      {platform.status}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-white mb-1">{platform.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{platform.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    {Object.entries(platform.stats).map(([key, value]) => (
                      <div key={key}>
                        <span className="capitalize">{key}: </span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    {platform.external ? (
                      <a href={platform.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <span>Access Platform</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link href={platform.href} className="flex items-center gap-2">
                        <span>Access Platform</span>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group p-4 rounded-lg border border-gray-700 bg-gray-750 hover:bg-gray-700 transition-all duration-200 text-center"
                >
                  <div className="flex justify-center mb-3">
                    <Icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <h4 className="font-medium text-white text-sm mb-1">{action.title}</h4>
                  <p className="text-xs text-gray-400">{action.description}</p>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
