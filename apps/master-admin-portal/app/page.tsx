
import { Suspense } from 'react'
import DashboardPage from '@/components/pages/dashboard-page'

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPage />
    </Suspense>
  )
}
