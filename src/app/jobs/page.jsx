import Gradient from '@/components/GradientBG/Gradient'
import JobsDisplay from '@/components/JobsPage/Main/JobsDisplay';
import Layout from '@/components/Layout/Layout'
import SearchBar from '@/components/TalentPage/Main/SearchBar';
import React from 'react'

export default function page({searchParams}) {
  return (
    <Layout>
      <Gradient>
        <SearchBar type={'jobs'} />
        <JobsDisplay keyword={searchParams?.q} />
      </Gradient>
    </Layout>
  )
}
