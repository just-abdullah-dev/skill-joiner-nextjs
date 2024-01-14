import Layout from '@/components/Layout/Layout'
import DisplayService from '@/components/ServicesPage/ServiceDetail/DisplayService'
import React from 'react'

export default function page({params}) {
  return (
    <Layout>
        <DisplayService id={params?.id} />
    </Layout>
  )
}
