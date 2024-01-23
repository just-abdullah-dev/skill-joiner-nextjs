import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function TalentTile({user}) {
    const router = useRouter();
    const shortDesc = (title) => {
        const maxLength = 300;
        if (title.length > maxLength) {
          return `${title.substring(0, maxLength)}...`;
        } else {
          return title;
        }
      };
      const handleViewProfile = ()=>{
        router.push(`/talent/${user?.username}`);
      }
  return (
    <div className=' grid gap-4 shadow-[rgba(0,_0,_0,_0.24)_-1px_3px_8px] p-6 rounded-2xl'>
        {/* avatar name, country, bio */}
        <div
        onClick={handleViewProfile}
        className=' flex items-center gap-8 cursor-pointer'>
            <Image
            height={120}
            width={120}
            alt='Profile Picture'
            className=' aspect-square rounded-full shadow-lg'
            src={user?.avatar ? `/media${user?.avatar}`:'/sample.jpg'}
            />
            <div className=' grid gap-3'>
                <div className=' flex items-center gap-2'><h1 className=' text-xl font-semibld'>{user?.name}</h1><p className='text-sm'>, {user?.country}</p></div>
                <h1 className=' text-lg'>{user?.bio}</h1>
            </div>
        </div>
        <div className=' flex items-center flex-wrap gap-4'>
        {user?.skills[0] && user?.skills.map((item)=>{
            return <div
                key={item?.name}
                className=" rounded-lg w-fit px-2 py-1 bg-primary text-white"
              >
                {item?.name}
              </div>
        })}
        </div>
        <div className=' cursor-pointer'
        onClick={handleViewProfile}>{shortDesc(user?.about)}</div>
        <div className=' flex items-center justify-end gap-8'>
            <button 
        onClick={handleViewProfile} className=' w-[120px] outline outline-2 outline-primary hover:bg-primary text-primary py-1 text-lg rounded-lg hover:text-white'>
                Hire
            </button>
            <button 
        onClick={handleViewProfile} className=' w-[120px] outline outline-2 outline-green-400 hover:bg-green-400 text-green-400 py-1 rounded-lg text-lg hover:text-white'>
                View Profile
            </button>
        </div>
    </div>
  )
}
