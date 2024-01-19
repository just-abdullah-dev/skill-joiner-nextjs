'use client';
import Image from 'next/image';
import React from 'react'
import { useSelector } from 'react-redux';

export default function WelcomeUser() {
    const {userInfo} = useSelector((state)=>state.user);

  return (
    <div className=' flex items-center justify-around w-full h-[350px] text-5xl gap-4 px-12'>
        <div>
        Welcome <span className=' text-primary'>{userInfo?.name}!</span> 
        </div>
        <Image
        height={600}
        width={600}
        className=' aspect-auto'
        src={'/jobpost.jpg'}
        alt='Picture'
        />
    </div>
    
  )
}
