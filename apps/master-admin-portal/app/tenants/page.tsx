
'use client'

import DashboardLayout from '@/components/layout/dashboard-layout'
import PlatformIntegration from '@/components/platform/platform-integration'

export default function TenantsPage() {
  return (
    <DashboardLayout>
      <PlatformIntegration
        title="Multi-tenant Management"
        description="Comprehensive tenant and resource management platform"
        platformUrl="https://audityzer-tenants.example.com"
        fallbackContent={
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-4">Multi-tenant Platform Integration</h3>
            <p className="text-gray-400 mb-6">
              This would embed the live Multi-tenant Management platform. For demo purposes, 
              this shows the integration framework.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h4 className="text-lg font-medium text-white mb-2">Active Tenants</h4>
                <p className="text-3xl font-bold text-blue-400">56</p>
                <p className="text-sm text-gray-400">+12% this month</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h4 className="text-lg font-medium text-white mb-2">Monthly Revenue</h4>
                <p className="text-3xl font-bold text-green-400">$12.4K</p>
                <p className="text-sm text-gray-400">+8% growth</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h4 className="text-lg font-medium text-white mb-2">Resource Usage</h4>
                <p className="text-3xl font-bold text-purple-400">78%</p>
                <p className="text-sm text-gray-400">CPU/Memory</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h4 className="text-lg font-medium text-white mb-2">Support Tickets</h4>
                <p className="text-3xl font-bold text-yellow-400">3</p>
                <p className="text-sm text-gray-400">Open tickets</p>
              </div>
            </div>
          </div>
        }
      />
    </DashboardLayout>
  )
}
