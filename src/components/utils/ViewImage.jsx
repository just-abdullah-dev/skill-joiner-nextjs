import { X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function ViewImage({src, setViewImageSrc}) {
  return (
    <div className='relative z-50 bg-slate-700 bg-opacity-60 flex items-center justify-center w-screen h-screen'>
        <div 
        onClick={()=>{
            setViewImageSrc('');
        }}
        className=' shadow-2xl flex items-center justify-center p-2 rounded-full bg-white absolute top-5 right-5 hover:bg-[#dbd9d9] cursor-pointer'>
            <X size={50} strokeWidth={1} className='stroke-black' />
        </div>
        <div className='flex items-center justify-center bg-white rounded-xl p-12'>
            <Image 
            width={2400}
            height={800}
            className='aspect-auto rounded-sm'
            src={src}
            />
        </div>
    </div>
  )
}
