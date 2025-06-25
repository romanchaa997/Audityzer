
'use client'

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/layout/dashboard-layout'
import UserManagement from '@/components/users/user-management'

export default function UsersPage() {
  return (
    <DashboardLayout>
      <UserManagement />
    </DashboardLayout>
  )
}
