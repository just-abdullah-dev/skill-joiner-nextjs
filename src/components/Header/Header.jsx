"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/actions/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';

function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const {userInfo} = useSelector(state => state.user);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const logoutHandler = () => {
        dispatch(logout());
        router.push('/');
    }
    const toggleNavbar = () => {
        setIsOpen((prevState) => !prevState)
    }
    const navlinks = [
        // { path: "/", label: "Home" },
        { path: "/services", label: "Services" },
        { path: "/jobs", label: "Jobs" },
        { path: "/talent", label: "Talent" },
        { path: "/about", label: "About" },
      ];
    return (
        <header className=''>
        <nav className={`${isOpen ? 'flex-col' : 'flex-row'} px-8 py-3 flex justify-between items-center h-fit w-full fixed top-0 left-0 z-20 bg-white shadow-md md:shadow-sm`}>
            <div className={`${isOpen ? 'self-start' : ''} m-0 p-0 flex justify-between items-center w-[100%] md:w-auto`}>
                <Link href="/" className='font-bold text-3xl tracking-wider flex items-center justify-start gap-4'>
                    <Image
                        width={56}
                        height={56}
                        src={'/logo.png'}
                        alt="Logo image" />
                        Skill Joiner
                </Link>
                <div className={`md:hidden`}>
                    {isOpen ?
                        <X onClick={toggleNavbar} /> :
                        <Menu onClick={toggleNavbar} />}
                </div>
            </div>
            <div className={``}>
                <ul className={`${isOpen ? 'block' : 'hidden'} gap-8 items-center flex flex-col md:flex md:flex-row`}>
                    {
                        navlinks.map((item, index) => (
                            <li key={index}
                                className='text-md relative group font-bold'>
                                <Link
                                    onClick={isOpen ? toggleNavbar : null}
                                    className='mx-2'
                                    href={item.path}
                                    >{item.label}</Link>
                                <span className='text-md transition-all duration-500 absolute right-0 group-hover:opacity-100 group-hover:right-[90%] opacity-0'>|</span>
                            </li>
                        ))
                    }
                    {userInfo ?
                        <div className='relative'>
                            <button
                                className='text-primary flex text-md items-center gap-1 font-bold'
                                onClick={() => setProfileDropdown(!profileDropdown)}>
                                <div className='flex items-center justify-between gap-2'>
                                    {userInfo?.avatar && <Image width={46} height={46} className='rounded-full aspect-square' src={'/media'+userInfo?.avatar} alt="DP" />}
                                    <p>{userInfo?.name.split(" ")[0]}</p>
                                </div>
                                {profileDropdown ?
                                    <ChevronUp /> :
                                    <ChevronDown /> 
                                }

                            </button>
                            {profileDropdown ?
                                <div className='absolute top-8 right-2 rounded-2xl bg-white text-md font-bold w-28 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'>
                                    <button
                                        onClick={() => {
                                            setProfileDropdown(!profileDropdown);
                                            isOpen ? toggleNavbar() : null;
                                            router.push('/dashboard');
                                        }}
                                        className='px-3 py-2 rounded-t-2xl w-full hover:bg-black hover:text-white'>
                                        Dashboard
                                    </button>
                                    <button
                                        className='px-3 py-2 rounded-b-2xl w-full hover:bg-black hover:text-white'
                                        onClick={()=>{
                                            logoutHandler();
                                            isOpen ? toggleNavbar() : null;
                                        }}>
                                        Log Out
                                    </button>
                                </div> : <></>}
                        </div> :
                        <li>
                            <Link
                                onClick={isOpen ? toggleNavbar : null}
                                className={`font-bold bg-primary text-white rounded-xl px-4 py-2 hover:bg-primary_dark`}
                                href={'/register'}
                            >Sign Up
                            </Link>
                        </li>}

                </ul>
            </div>  
        </nav>
      <div className="mb-20"></div>
        </header>
    )
}
// export default Header;
export default dynamic (() => Promise.resolve(Header), {ssr: false})
