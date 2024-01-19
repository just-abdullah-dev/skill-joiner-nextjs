import DashboardSkeleton from '@/components/Dashboard/DashboardSkeleton'
import Layout from '@/components/Layout/Layout'
import React from 'react'

export default function page() {
  return (
    <Layout padding={false}>
        <DashboardSkeleton type={'requests'}>
          Request page
        </DashboardSkeleton>
    </Layout>
  )
}
