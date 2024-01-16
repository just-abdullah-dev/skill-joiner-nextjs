import DashboardSkeleton from '@/components/Dashboard/DashboardSkeleton'
import ProfileSettings from '@/components/Dashboard/ProfileSettings'
import Layout from '@/components/Layout/Layout'
import React from 'react'

export default function page() {
  return (
    <Layout padding={false}>
      <DashboardSkeleton>
        <ProfileSettings />
        </DashboardSkeleton>
    </Layout>
  )
}
