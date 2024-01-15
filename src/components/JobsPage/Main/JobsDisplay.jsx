'use client';
import JobTile from '@/components/HomePage/Jobs/JobTile';
import { getJobs } from '@/services/getJobs';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function JobsDisplay({keyword}) {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState('');
    useEffect(() => {
      setIsLoading(true);
      const getAll = () => {
        getJobs({keyword:keyword,limit:20}, (data) => {
          if(data?.success){
            setJobs(data?.data);
            setIsLoading(false);
            setIsError('');
          }else{
            setIsError(data?.message)
          }
        });
      };
      getAll();
    }, [setJobs, keyword]);

  return (
    <div className=' bg-white p-6 rounded-2xl'>
        {/* jobs  */}
        {isError ? 
        <div className=' flex items-center justify-center w-full h-[300px] text-lg'>{isError}</div>:
        isLoading ?
          <div className=' flex items-center justify-center w-full h-[300px]'>
            
          <Loader2Icon size={48} className='animate-spin' />
          </div>:
          jobs[0] &&
            <div className='grid gap-8 grid-cols-1 sm:grid-cols-2'>
                {jobs.map((item)=>{
                    return (
                      <JobTile key={item?._id} job={item} />
                    )
                })}
            </div>}
    </div>
  )
}
