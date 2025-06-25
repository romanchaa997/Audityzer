
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Building2, Activity, TrendingUp, AlertTriangle, Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface OverviewData {
  totalUsers: number
  activeUsers: number
  totalPlatforms: number
  activePlatforms: number
  userGrowth: number
  systemLoad: number
}

interface OverviewCardsProps {
  data: OverviewData
}

export default function OverviewCards({ data }: OverviewCardsProps) {
  const cards = [
    {
      title: 'Total Users',
      value: data.totalUsers.toLocaleString(),
      change: `+${data.userGrowth}%`,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      trend: 'up'
    },
    {
      title: 'Active Users',
      value: data.activeUsers.toLocaleString(),
      change: `${Math.round((data.activeUsers / data.totalUsers) * 100)}%`,
      icon: Activity,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      trend: 'up'
    },
    {
      title: 'Platforms',
      value: `${data.activePlatforms}/${data.totalPlatforms}`,
      change: 'Operational',
      icon: Building2,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      trend: 'stable'
    },
    {
      title: 'System Load',
      value: `${data.systemLoad}%`,
      change: data.systemLoad > 80 ? 'High' : data.systemLoad > 60 ? 'Medium' : 'Low',
      icon: data.systemLoad > 80 ? AlertTriangle : TrendingUp,
      color: data.systemLoad > 80 ? 'text-red-400' : data.systemLoad > 60 ? 'text-yellow-400' : 'text-green-400',
      bgColor: data.systemLoad > 80 ? 'bg-red-500/10' : data.systemLoad > 60 ? 'bg-yellow-500/10' : 'bg-green-500/10',
      trend: data.systemLoad > 80 ? 'down' : 'up'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        
        return (
          <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {card.value}
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      card.trend === 'up' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                        : card.trend === 'down'
                        ? 'bg-red-500/20 text-red-400 border-red-500/30'
                        : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }`}
                  >
                    {card.change}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
