
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Activity, Clock, AlertTriangle, CheckCircle } from 'lucide-react'

interface PlatformHealthData {
  id: string
  name: string
  status: string
  health: number
  uptime: number
  responseTime: number
  errors: number
}

interface PlatformHealthProps {
  data: PlatformHealthData[]
}

export default function PlatformHealth({ data }: PlatformHealthProps) {
  const getStatusIcon = (status: string, health: number) => {
    if (status === 'MAINTENANCE') return AlertTriangle
    if (health >= 90) return CheckCircle
    if (health >= 70) return Activity
    return AlertTriangle
  }

  const getStatusColor = (status: string, health: number) => {
    if (status === 'MAINTENANCE') return 'text-yellow-400'
    if (health >= 90) return 'text-green-400'
    if (health >= 70) return 'text-blue-400'
    return 'text-red-400'
  }

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'bg-green-500'
    if (health >= 70) return 'bg-blue-500'
    if (health >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-400" />
          Platform Health Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.map((platform) => {
            const StatusIcon = getStatusIcon(platform.status, platform.health)
            
            return (
              <div key={platform.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <StatusIcon className={`h-4 w-4 ${getStatusColor(platform.status, platform.health)}`} />
                    <div>
                      <h4 className="font-medium text-white">{platform.name}</h4>
                      <p className="text-sm text-gray-400">
                        {platform.status === 'MAINTENANCE' ? 'Under Maintenance' : 'Operational'}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary"
                    className={`
                      ${platform.health >= 90 ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                      ${platform.health >= 70 && platform.health < 90 ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : ''}
                      ${platform.health < 70 ? 'bg-red-500/20 text-red-400 border-red-500/30' : ''}
                    `}
                  >
                    {platform.health}% Health
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400 mb-1">Health Score</div>
                    <Progress 
                      value={platform.health} 
                      className="h-2"
                      // @ts-ignore
                      indicatorClassName={getHealthColor(platform.health)}
                    />
                    <div className="text-white font-medium mt-1">{platform.health}%</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 mb-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Uptime
                    </div>
                    <div className="text-white font-medium">{platform.uptime}%</div>
                    <div className="text-xs text-gray-400">Last 30 days</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 mb-1">Response Time</div>
                    <div className="text-white font-medium">{platform.responseTime}ms</div>
                    <div className="text-xs text-gray-400">
                      {platform.errors > 0 ? `${platform.errors} errors` : 'No errors'}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
