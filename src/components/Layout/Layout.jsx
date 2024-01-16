import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'

export default function Layout({ children, padding = true }) {
  return (
    <>
    <Header />
    <div className={padding?'px-20 md:px-[7%]':''}>{children}</div>
    <Footer />
    </>
  )
}
