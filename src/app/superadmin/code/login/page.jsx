import Login from '@/components/Auth/Admin/Login/Login'
import React from 'react'

export default function page() {
  return (
    <div>
        <div className="py-4 px-12 bg-secondary text-primary">
          <a href="/" className="font-semibold text-3xl tracking-wide ">Skill Joiner</a>
        </div>
        <Login />
    </div>
  )
}
