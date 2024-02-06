import ChatPageSkeleton from '@/components/Chat/ChatPageSkeleton'
import PerChat from '@/components/Chat/PersonalChat'
import Layout from '@/components/Layout/Layout'
import React from 'react'

export default function page() {
  return (
    <Layout padding={false}>
      <ChatPageSkeleton>
        <div>detaisl of chat goes here</div>
      </ChatPageSkeleton>
    </Layout>
  )
}
