'use client';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react';


export default function ForClientSection() {
    const router = useRouter();
  return (
    <div className='bg-white rounded-2xl p-6'>
        <h1 className=' text-3xl font-bold'>For Client</h1>
        <div className=' grid grid-cols-2 '>
    <div className="grid">
    <div className="flex items-center justify-center ">
        <Image
          height={350}
          width={350}
          alt="hero section image"
          src={"/jobpost.jpg"}
          className=" aspect-auto"
        />
      </div>
      <div className="font-semibold text-2xl flex items-center justify-center ">
        <div
        onClick={()=>{
            router.push('/jobs/edit/new');
        }}
        className=' bg-primary text-white hover:bg-white hover:text-primary p-4 rounded-xl w-[40%] cursor-pointer'>
            Post a job and hire a expert -{">"}
        </div>
      </div>
      
    </div>
    <div className="grid">
    <div className="flex items-center justify-center ">
      <Image
        height={350}
        width={350}
        alt="hero section image"
        src={"/servicereq.jpg"}
        className=" aspect-auto"
      />
    </div>
    <div className="font-semibold text-2xl flex items-center justify-center">
    <div 
    onClick={()=>{
        router.push('/talent');
    }}
    className=' bg-primary text-white hover:bg-white hover:text-primary p-4 rounded-xl w-[40%] cursor-pointer'
    >
            Request a service from favourite -{">"}
        </div>
    </div>
   
  </div>
  </div>

    </div>
  )
}
