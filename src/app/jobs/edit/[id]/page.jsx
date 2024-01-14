import EditJob from '@/components/JobsPage/Edit/EditJob';
import Layout from '@/components/Layout/Layout';
import React from 'react';

export default function page({params}) {
  return (
    <Layout>
      <EditJob id={params?.id} />
    </Layout>
  )
}
