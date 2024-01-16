import Link from 'next/link';
import React from 'react'

export default function DashboardSkeleton({children}) {
    const linkOptions = [
        {name:'Profile', path:'profile'},
        {name:'Jobs', path:'jobs'},
        {name:'Orders', path:'orders'},
    ];

  return (
   <>
   <div className=' bg-white h-[50px] w-full'></div>
   <div className=' w-full flex items-start'>
        <div className='  w-[20%] h-screen'>
            <div className=' flex items-start flex-col gap-6 w-[20%] fixed bg-white h-[50%]'>
                {linkOptions.map((item)=>{
                    return (
                        <Link
                        key={item?.path}
                        className=' p-4 pl-8 flex items-center justify-start w-full bg-primary shadow-md hover:bg-primary_dark text-white text-lg'
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
