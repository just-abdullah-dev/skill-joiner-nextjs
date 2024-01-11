import { PenSquare } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ServicesTile({service}) {
    const router = useRouter();
  return (
    <div className='relative shadow-[0px_0px_25px_12px_#00000024] bg-white rounded-3xl' >
    <div
         onClick={()=>{
            router.push(`/services/edit/${service?._id}`);
        }} 
        className='absolute top-2 right-2 z-10 cursor-pointer'>
            <PenSquare />
        </div>
    <div
    className='grid gap-4 cursor-pointer' 
    onClick={()=>{
        router.push(`/services/${service?._id}`);
    }}
    >
        <div className=' overflow-hidden w-full'>
            <Image height={200} width={350} 
            alt='Thumbnail'
            className='aspect-video rounded-t-3xl' 
            src={service?.photos[0]?`/media/${service?.photos[0]}`:'/sample.jpg'} />
        </div>
        <div className='grid gap-4 px-4 mb-4'>
            <h1 className=' tracking-wide font-bold text-xl'>{service?.title}</h1>
            <div className='flex items-center justify-end gap-2'>
                <p className=''>Starting from </p><span className=' font-semibold text-lg'>{service?.packages[0]?.price} PKR</span>
            </div>
        </div>
    </div>    
    </div>
  )
}
