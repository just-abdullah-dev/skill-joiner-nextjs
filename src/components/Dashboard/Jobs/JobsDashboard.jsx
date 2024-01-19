'use client';
import { getJobsByUserId } from '@/services/getJobsByUserId';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function JobsDashboard() {
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.user);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const [showReverse, setShowReverse] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const get = () => {
      getJobsByUserId(userInfo?.token, (data) => {
        if (data?.success) {
          setJobs(data?.data);
          setIsLoading(false);
          setIsError("");
        } else {
          setIsError(data?.message);
        }
      });
    };
    get();
  }, [userInfo, setJobs]);

  return (
    <div className=' flex items-center justify-center p-6'>
      <div className='p-4 bg-white rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_-1px_3px_8px] grid gap-4 w-full'>
        <div className=' flex items-center justify-around'>
          <h1 className=' text-3xl'>Jobs</h1>
          <button
            className=" normalButtonTag w-[110px] bg-secondary"
            onClick={()=>{
              setJobs(()=>{
                return jobs.slice().reverse();
              });
              setShowReverse(!showReverse)
            }}
            >{showReverse?'See Oldest':'See Latest'}</button>
        </div>
        <div className='grid gap-4'>
          {isError?
          <div className=" bg-white w-full h-[300px] text-lg flex items-center justify-center">
          {isError}
        </div>:
          isLoading?
          <div className=" flex items-center justify-center w-full h-[300px]">
          <Loader2Icon size={48} className=" animate-spin" />
        </div>:
        (<div className=' px-6 grid gap-4'>
          {jobs[0]&& jobs.map((item)=>{
          return (
            <div
          key={item?._id}
          className=' even:bg-light-soft bg-gray-200 p-4 rounded-2xl shadow-lg flex items-center justify-between'
          >
            <Link className='' href={`/jobs/${item?._id}`}>{item?.title}</Link>
            <button
            onClick={()=>{
              if(item?.isHired){
                router.push(`/dashboard/orders#${item?._id}`);
              }else{
                router.push(`/jobs/bids/${item?._id}`);
              }
            }}
            className=' actionButtonTag w-[150px]'>
              {item?.isHired?'See Order':'See Bids'}
            </button>
          </div>
          )
        })}
        </div>)

          }
        </div>
      </div>
    </div>
  )
}
