'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function SearchBar({type}) {
    const [keyword, setKeyword] = useState('');
    const router = useRouter();

    function handleKeyDown(e){
        if(e.key == 'Enter'){ 
                router.push(`/${type}?q=${keyword}`); 
        }
    }
    // Find the perfect match for your needs
  return (
    <div className=' flex items-center pt-28 pb-20 '>
        <div className="font-bold text-5xl tracking-wider gap-4 flex flex-col items-start justify-center w-[50%]">
        <h1 className=" ">
          Find the <span className="text-primary">perfect</span> match for your{" "}
          <span className="text-primary">needs</span>
          <br />
        </h1>
        <h1 className=" text-lg tracking-normal font-semibold">
          Let <span className="text-primary">Skill Joiner</span> be your talent
          shortcut.
        </h1>
        <div className="font-normal text-base w-full relative">
          <input
            value={keyword}
            type="text"
            placeholder="What are you looking for?"
            className="inputTag w-full"
            onKeyDown={(e)=>{
                handleKeyDown(e);
            }}
            onChange={(e)=>{
                setKeyword(e.target.value)
                if(e.target.value == ''){
                  router.push(`/${type}?q=`)
                }
            }}
          />
        </div>
      </div>
    </div>
  )
}
