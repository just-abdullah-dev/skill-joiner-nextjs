import Gradient from '@/components/GradientBG/Gradient'
import JobsDisplay from '@/components/JobsPage/Main/JobsDisplay'
import SearchBar from '@/components/JobsPage/Main/SearchBar'
import Layout from '@/components/Layout/Layout'
import React from 'react'

export default function page({searchParams}) {
  return (
    <Layout>
      <Gradient>
        <SearchBar />
        <JobsDisplay keyword={searchParams?.q} />
      </Gradient>
    </Layout>
  )
}
