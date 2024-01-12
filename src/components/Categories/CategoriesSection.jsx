'use client';
import { getAllProfessions } from '@/services/getAllProfessions';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  useEffect(()=>{
    const getAll = ()=>{
      getAllProfessions((data)=>{setCategories(data)})
    }
    getAll();
  },[setCategories]);

  return (
    <div className=' bg-white rounded-2xl p-6 grid gap-8'>
      <h1 className='text-3xl font-bold'>Categories</h1>
      <div className={`${categories[0]?' justify-start':' justify-center'} flex items-center gap-8 flex-wrap px-4`}>
        {categories[0] ?
        categories.map((item)=>{
          return (<div 
            key={item?._id}
            onClick={()=>{
              router.push(`/categories/${item?.slug}`);
            }}
            className=' px-4 py-2 bg-primary rounded-lg text-white font-semibold cursor-pointer w-fit hover:bg-primary_dark'
          >
            {item?.name}
          </div>)
        }):
        <div className=' flex items-center justify-center'>
          <Loader2Icon className=' animate-spin' />
          </div>}
      </div>
    </div>
  )
}
