
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  Building2, 
  Settings, 
  Shield, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface ActivityItem {
  id: string
  action: string
  resource: string
  resourceId: string | null
  platform: string | null
  details: any
  timestamp: string
  user: {
    name: string | null
    email: string
  } | null
}

interface ActivityFeedProps {
  data: ActivityItem[]
}

export default function ActivityFeed({ data }: ActivityFeedProps) {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATE_USER':
      case 'UPDATE_USER':
      case 'DELETE_USER':
        return User
      case 'CREATE_PLATFORM':
      case 'UPDATE_PLATFORM':
        return Building2
      case 'LOGIN':
      case 'LOGOUT':
        return Shield
      case 'SYSTEM_UPDATE':
        return Settings
      case 'SECURITY_ALERT':
        return AlertTriangle
      case 'BACKUP_COMPLETE':
        return CheckCircle
      default:
        return FileText
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE_USER':
      case 'CREATE_PLATFORM':
      case 'BACKUP_COMPLETE':
        return 'text-green-400'
      case 'DELETE_USER':
      case 'SECURITY_ALERT':
        return 'text-red-400'
      case 'UPDATE_USER':
      case 'UPDATE_PLATFORM':
      case 'SYSTEM_UPDATE':
        return 'text-blue-400'
      case 'LOGIN':
      case 'LOGOUT':
        return 'text-purple-400'
      default:
        return 'text-gray-400'
    }
  }

  const getActionLabel = (action: string) => {
    return action.split('_').map(word => 
      word.charAt(0) + word.slice(1).toLowerCase()
    ).join(' ')
  }

  const getPlatformBadge = (platform: string | null) => {
    if (!platform) return null
    
    const colors = {
      'ANALYTICS': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'TENANT_MANAGEMENT': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'API_DOCS': 'bg-green-500/20 text-green-400 border-green-500/30',
      'ECOSYSTEM': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    }
    
    return (
      <Badge 
        variant="secondary" 
        className={`text-xs ${colors[platform as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}
      >
        {platform.replace('_', ' ')}
      </Badge>
    )
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-400" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {data.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-400">No recent activity</p>
              </div>
            ) : (
              data.map((activity) => {
                const ActionIcon = getActionIcon(activity.action)
                
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-750 transition-colors">
                    <div className={`p-2 rounded-lg bg-gray-700 ${getActionColor(activity.action)}`}>
                      <ActionIcon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-white">
                          {getActionLabel(activity.action)}
                        </p>
                        {getPlatformBadge(activity.platform)}
                      </div>
                      
                      <p className="text-sm text-gray-400 mb-2">
                        {activity.resource} {activity.resourceId ? `(${activity.resourceId})` : ''}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-blue-600 text-white text-xs">
                              {activity.user?.name?.charAt(0) || 'S'}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-400">
                            {activity.user?.name || 'System'}
                          </span>
                        </div>
                        
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
