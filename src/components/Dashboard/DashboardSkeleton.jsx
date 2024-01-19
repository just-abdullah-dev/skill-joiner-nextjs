'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function DashboardSkeleton({children, type}) {
    const {userInfo}= useSelector((state)=>state.user);
    const router = useRouter();
    useEffect(()=>{
        if(!userInfo){
            router.push(`/`);
            toast.error('Login to access the page.')
        }
    },[userInfo])
    const linkOptions = [
        {name:'Profile', path:'profile'},
        {name:'Jobs', path:'jobs'},
        {name:'Orders', path:'orders'},
        {name:'Requests', path:'requests'},
    ];
    
  return (
   <>
   <div className=' bg-white h-[50px] w-full'></div>
   <div className=' w-full flex items-start'>
        <div className='  w-[20%] h-screen'>
            <div className=' flex items-start flex-col gap-2 w-[20%] fixed bg-white h-[50%]'>
                {linkOptions.map((item)=>{
                    if(!userInfo?.student && item?.path == 'requests'){
                        return;
                    }
                    return (
                        <Link
                        key={item?.path}
                        className={`${type == item?.path?' bg-secondary':' bg-primary'} p-4 pl-8 flex items-center justify-start w-full hover:bg-opacity-80 duration-300 shadow-md text-white text-lg`}
                        href={`/dashboard/${item?.path}`}>
                        {item?.name}</Link>
                    )
                })}
            </div>
        </div>
        <div className=' w-[80%]'>
        {children}
        </div>
    </div></>
  )
}

export default dynamic (() => Promise.resolve(DashboardSkeleton), {ssr: false})

