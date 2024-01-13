import Layout from '@/components/Layout/Layout';
import EditService from '@/components/ServicesPage/Edit/EditService';
import React from 'react';

export default function page({params}) {
  return (
    <Layout>
      <EditService id={params?.id} />
    </Layout>
  )
}
