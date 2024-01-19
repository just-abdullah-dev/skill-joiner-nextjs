import JobsDashboard from '@/components/Dashboard/Jobs/JobsDashboard'
import DashboardSkeleton from '@/components/Dashboard/DashboardSkeleton'
import Layout from '@/components/Layout/Layout'
import React from 'react'

export default function page() {
  return (
    <Layout padding={false}>
        <DashboardSkeleton type={'jobs'}>
          <JobsDashboard />
        </DashboardSkeleton>
    </Layout>
  )
}
