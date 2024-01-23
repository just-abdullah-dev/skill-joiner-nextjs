import Layout from '@/components/Layout/Layout'
import AddRequest from '@/components/RequestPage/Add/AddRequest'
import React from 'react'

export default function page({params}) {
  return (
    <Layout>
        <AddRequest userId={params?.userId} />
    </Layout>
  )
}
