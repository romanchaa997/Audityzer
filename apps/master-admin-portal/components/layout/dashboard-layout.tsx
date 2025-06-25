
'use client'

import { useState } from 'react'
import Header from './header'
import Sidebar from './sidebar'
import AuthGuard from '@/components/auth/auth-guard'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-900">
        <Header 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          isMenuOpen={sidebarOpen}
        />
        <div className="flex">
          <Sidebar 
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <main className="flex-1 lg:ml-72 p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
