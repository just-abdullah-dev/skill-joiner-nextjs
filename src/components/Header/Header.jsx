import React from 'react';
import Image from 'next/image';
// import { images } from '@/constants';

export default function Header() {
  return (
    <header>
      <nav className='flex justify-between items-center py-4 px-12 bg-white fixed top-0 left-0 w-full'>
        <div>
            {/* <Image width={100} height={100} src='/../../assets/logo.png'></Image> */}
            <h1 className='font-bold text-3xl tracking-wider'>Skill Joiner</h1>
        </div>
        <ul className='flex gap-12 items-center tracking-wider'>
            <li className='hover:font-semibold'><a href="">Home</a></li>
            <li className='hover:font-semibold'><a href="/services">Services</a></li>
            <li className='hover:font-semibold'><a href="/jobs">Jobs</a></li>
            <li className='hover:font-semibold'><a href="/talent">Talent</a></li>
            <li className='hover:font-semibold'><a href="/about">About</a></li>
            <li className='hover:font-semibold'>
              <a className='bg-primary text-white rounded-xl px-4 py-2 hover:bg-primary_dark' href='/register'>Sign Up</a>
            </li>
        </ul>
       {/* <div>
            <Image width={100} height={100} src='/../../assets/logo.png'></Image>
            <h1 className='text-xl font-bold'>DP</h1>
        </div>  */}
    </nav>
    <div className='mb-20'></div>
    </header>
  )
}
