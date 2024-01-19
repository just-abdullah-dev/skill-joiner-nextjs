import DashboardSkeleton from '@/components/Dashboard/DashboardSkeleton'
import ProfileSettings from '@/components/Dashboard/Profile/ProfileSettings'
import Layout from '@/components/Layout/Layout'
import React from 'react'

export default function page() {
  return (
    <Layout padding={false}>
      <DashboardSkeleton type={'profile'}>
        <ProfileSettings />
        </DashboardSkeleton>
    </Layout>
  )
}
