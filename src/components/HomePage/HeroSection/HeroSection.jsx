'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function HeroSection() {
    const [keyword, setKeyword] = useState('');
    const [selection, setSelection] = useState('talent');
    const router = useRouter();

    function handleKeyDown(e){
        if(e.key == 'Enter'){
            if(selection == 'talent'){
                router.push(`/talent?q=${keyword}`);
            }else if(selection == 'services'){
                router.push(`/services?q=${keyword}`);
            }else if(selection == 'jobs'){
                router.push(`/jobs?q=${keyword}`);
            }
        }
    }
  return (
    <div className="grid grid-cols-2 mt-6 p-4">
      <div className="font-bold text-5xl tracking-wider gap-4 flex flex-col items-start justify-center ">
        <h1 className=" ">
          <span className="text-primary">Skills</span> you need, delivered with{" "}
          <span className="text-primary">speed.</span>
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
            }}
          />
          <select 
          className="absolute top-2 right-5 bg-white rounded-lg py-2 px-3 cursor-pointer"
          value={selection} 
          onChange={(e)=>{
            setSelection(e.target.value);
          }}>
            <option value="talent">Talent</option>
            <option value="services">Services</option>
            <option value="jobs">Jobs</option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <Image
          height={400}
          width={400}
          alt="hero section image"
          src={"/heroimage.png"}
          className=""
        />
      </div>
    </div>
  );
}
