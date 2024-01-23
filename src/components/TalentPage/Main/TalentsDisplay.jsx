'use client';
import { getUsers } from '@/services/getTalent';
import React, { useEffect, useState } from 'react';
import TalentTile from './TalentTile';
import { Loader2Icon } from 'lucide-react';

export default function TalentsDisplay({keyword}) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState('');

    useEffect(() => {
      setIsLoading(true);
      setIsError('');
      const getAll = () => {
        getUsers({keyword:keyword,limit:20}, (data) => {
          if(data?.success){
            setUsers(data?.data);
            setIsError('');
          }else{
            setIsError(data?.message);
          }
          setIsLoading(false);
        });
      };
      getAll();
    }, [setUsers, keyword]);

  return (
    <div className=' bg-white p-6 rounded-2xl'>
    {/* jobs  */}
    {isError ? 
    <div className=' flex items-center justify-center w-full h-[300px] text-lg'>{isError}</div>:
    isLoading ?
      <div className=' flex items-center justify-center w-full h-[300px]'>
        
      <Loader2Icon size={48} className='animate-spin' />
      </div>:
      users[0] &&
        <div className='grid gap-10 p-12'>
            {users.map((item)=>{
                return (
                  <TalentTile key={item?._id} user={item} />
                  )
            })}
        </div>
        }
</div>
  )
}