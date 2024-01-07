'use client';
import React, { useEffect, useState } from 'react'
import ProfileData from './ProfileData'
import ProfessionAndSkills from './Profession&Skills';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const router = useRouter();
  const {userInfo} = useSelector((state)=>state.user);
  const [userProfile, setUserProfile] = useState(null);
  useEffect(()=>{
    if(!userInfo){
      toast.error('You are not logged in.');
      router.push('/');
    }
    async function getProfile(){
var requestOptions = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${userInfo?.token}`,
  },
  redirect: 'follow'
};

fetch("http://localhost:3000/api/users/getProfile", requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result?.success){
      setUserProfile(()=>result?.data);
    }else{
      toast.error(result?.message);
    }
  })
  .catch(error => console.log('error', error));
    }
    getProfile();
  },[])
  return (
    <div className='flex flex-col items-center gap-6 my-32'>
        <ProfileData />
        <ProfessionAndSkills profession={userProfile?.profession} skills={userProfile?.skills} />
    </div>
  )
}
