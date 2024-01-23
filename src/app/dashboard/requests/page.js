import DashboardSkeleton from '@/components/Dashboard/DashboardSkeleton'
import RequestsDashboard from '@/components/Dashboard/Requests/RequestsDashboard'
import Layout from '@/components/Layout/Layout'
import React from 'react'

export default function page() {
  return (
    <Layout padding={false}>
        <DashboardSkeleton type={'requests'}>
          <RequestsDashboard />
        </DashboardSkeleton>
    </Layout>
  )
}
