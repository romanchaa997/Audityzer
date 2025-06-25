
'use client'

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/layout/dashboard-layout'
import OverviewCards from '@/components/dashboard/overview-cards'
import PlatformHealth from '@/components/dashboard/platform-health'
import ActivityFeed from '@/components/dashboard/activity-feed'
import UserActivityChart from '@/components/dashboard/user-activity-chart'
import PlatformQuickAccess from '@/components/dashboard/platform-quick-access'
import { Loader2 } from 'lucide-react'

interface DashboardData {
  overview: {
    totalUsers: number
    activeUsers: number
    totalPlatforms: number
    activePlatforms: number
    userGrowth: number
    systemLoad: number
  }
  recentActivity: any[]
  platformHealth: any[]
  userActivity: any[]
  platformMetrics: any[]
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard')
        if (response.ok) {
          const dashboardData = await response.json()
          setData(dashboardData)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-400">Failed to load dashboard data</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to Audityzer Ecosystem
          </h1>
          <p className="text-gray-400">
            Your unified portal for analytics, multi-tenant management, and developer tools
          </p>
        </div>

        {/* Overview Cards */}
        <OverviewCards data={data.overview} />

        {/* Platform Quick Access */}
        <PlatformQuickAccess />

        {/* Charts and Health Monitoring */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <UserActivityChart data={data.userActivity} />
          <PlatformHealth data={data.platformHealth} />
        </div>

        {/* Recent Activity */}
        <ActivityFeed data={data.recentActivity} />
      </div>
    </DashboardLayout>
  )
}
