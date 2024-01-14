'use client';
import ServicesTile from '@/components/HomePage/Services/ServicesTile';
import { getServices } from '@/services/getServices'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function ServicesDisplay({keyword}) {
    const [services, setServices] = useState([]);
    useEffect(() => {
      const getAll = () => {
        getServices({keyword:keyword,limit:20}, (data) => {
          if(data?.success){
            setServices(data?.data);
          }else{
            toast?.error(data?.message)
          }
        });
      };
      getAll();
    }, [setServices, keyword]);
    console.log(services);

  return (
    <div className=' bg-white p-6 rounded-2xl'>

{/* <h1 className="text-3xl font-bold">Services</h1> */}
        {/* services  */}
        {services[0] &&
        <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 p-12'>
            {services.map((item)=>{
                return <ServicesTile showUserData={true} showEditBtn={false} service={item} />
            })}
        </div>}
    </div>
  )
}
