import BidsPage from '@/components/BidsPage/Main/BidsPage'
import Layout from '@/components/Layout/Layout'
import React from 'react'

export default function page({params}) {
  return (
    <Layout>
      <BidsPage id={params?.id} />
    </Layout>
  )
}
