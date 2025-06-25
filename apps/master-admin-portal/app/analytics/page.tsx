
'use client'

import DashboardLayout from '@/components/layout/dashboard-layout'
import PlatformIntegration from '@/components/platform/platform-integration'

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <PlatformIntegration
        title="Analytics Dashboard"
        description="Real-time analytics and insights platform"
        platformUrl="https://audityzer-analytics.example.com"
        fallbackContent={
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-4">Analytics Platform Integration</h3>
            <p className="text-gray-400 mb-6">
              This would embed the live Analytics Dashboard platform. For demo purposes, 
              this shows the integration framework.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h4 className="text-lg font-medium text-white mb-2">Real-time Metrics</h4>
                <p className="text-3xl font-bold text-blue-400">1,234</p>
                <p className="text-sm text-gray-400">Active Users</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h4 className="text-lg font-medium text-white mb-2">System Performance</h4>
                <p className="text-3xl font-bold text-green-400">99.9%</p>
                <p className="text-sm text-gray-400">Uptime</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h4 className="text-lg font-medium text-white mb-2">Data Processing</h4>
                <p className="text-3xl font-bold text-purple-400">2.3M</p>
                <p className="text-sm text-gray-400">Events/Day</p>
              </div>
            </div>
          </div>
        }
      />
    </DashboardLayout>
  )
}
