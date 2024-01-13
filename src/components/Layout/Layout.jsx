import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'

export default function Layout({ children }) {
  return (
    <>
    <Header />
    <div className='px-20 md:px-[7%]'>{children}</div>
    <Footer />
    </>
  )
}
