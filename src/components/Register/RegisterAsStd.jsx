"use client";
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

export default function RegisterAsStd() {
  const [showPassword, setShowPassowrd] = useState(false);
  return (
    <div className='mx-24 my-16'>
      <div className='grid grid-cols-2'>
      <div className='font-bold text-5xl tracking-wider mt-16 '>
        <h1 className=''>Empower your <span className='text-primary'>skills</span>, embraced the <span className='text-primary'>community</span>.</h1><br/>
        <h1>Welcome to <span className='text-primary'>Skill Joiner</span></h1>
      </div>
      <div className="flex justify-center items-center">
          <div className="grid gap-8 w-[500px] rounded-2xl px-14 pt-4 pb-8 bg-white">
          <h1 className='text-3xl tracking-wide leading-loose font-bold text-center'>Sign Up</h1>
            <input
              className="block p-3 outline-none rounded-lg bg-light-soft"
              type="text"
              placeholder="Your Full Name..."
            />
            <input
              className="block p-3 outline-none rounded-lg bg-light-soft"
              type="email"
              placeholder="Your Email"
            />
            <div className='relative'>
            <input
              className="block p-3 outline-none rounded-lg bg-light-soft w-full"
              type={showPassword?'text':'password'}
              placeholder="Create Strong Password"
            />
            {showPassword?
            <button className='absolute right-6 bottom-3' onClick={()=>setShowPassowrd(false)}><Eye /></button>:
            <button className='absolute right-6 bottom-3' onClick={()=>setShowPassowrd(true)}><EyeOff /></button>
          }
            
            </div>
            <button className="block p-3 rounded-lg bg-primary text-white hover:bg-primary_dark">
              Sign Up
            </button>
            <p className='text-sm font-semibold'>Already have an account?<a href='/login' className='ml-4 text-primary font-semibold text-md'>Login Now</a></p>

          </div>
      </div>
    </div>
    </div>
    
  )
}
