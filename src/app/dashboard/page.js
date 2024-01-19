import DashboardSkeleton from '@/components/Dashboard/DashboardSkeleton';
import WelcomeUser from '@/components/Dashboard/WelcomeUser';
import Layout from '@/components/Layout/Layout';
import React from 'react';

export default function page() {
  return (
    <Layout padding={false}>
      <DashboardSkeleton>
<WelcomeUser />
        </DashboardSkeleton>
    </Layout>
  )
}
