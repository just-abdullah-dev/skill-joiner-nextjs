import Gradient from '@/components/GradientBG/Gradient'
import Dashboard from '@/components/Dashboard/Dashboard';
import Layout from '@/components/Layout/Layout';
import React from 'react'

export default function page() {
  return (
    <Layout>
      <Gradient>
        <Dashboard />
      </Gradient>
    </Layout>
  )
}
