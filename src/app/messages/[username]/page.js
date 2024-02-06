import ChatPageSkeleton from '@/components/Chat/ChatPageSkeleton'
import PerChat from '@/components/Chat/PersonalChat'
import Layout from '@/components/Layout/Layout'
import React from 'react'

export default function page({params}) {
  return (
    <Layout padding={false}>
        <ChatPageSkeleton type={params?.username}>
            <PerChat/>
        </ChatPageSkeleton>
    </Layout>
  )
}
