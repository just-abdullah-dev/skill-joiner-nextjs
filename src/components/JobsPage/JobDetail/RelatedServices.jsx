'use client';
import ServicesTile from '@/components/HomePage/Services/ServicesTile';
import { getServices } from '@/services/getServices';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function RelatedServices({keyword, id}) {
    const [services, setServices] = useState([]);
    useEffect(() => {
      const getAll = () => {
        getServices({keyword:keyword,limit:6}, (data) => {
          if(data?.success){
            setServices(data?.data);
          }else{
            toast?.error(data?.message)
          }
        });
      };
      getAll();
    }, [setServices, keyword]);

  return (
    <div className=' bg-white p-6 rounded-2xl '>

        <h1 className="text-3xl font-bold">Related Services</h1>
        {/* services  */}
        {services[0] &&
        <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 px-4 p-12'>
            {services.map((item)=>{
                if(id != item?._id){
                    return (
                        <ServicesTile showUserData={true} showEditBtn={false} service={item} />
                    )
                }
            })}
        </div>}
    </div>
  )
}
