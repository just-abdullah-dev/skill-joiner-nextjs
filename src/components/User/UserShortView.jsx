import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function UserShortView({user}) {
  return (
    <div className=' p-6 grid gap-4'>
        {/* avatar name username  */}
        <div className=' flex flex-col items-center gap-4'>
        <Image
            height={150}
            width={150}
            className=' aspect-square rounded-full shadow-lg'
            alt='Profile picture'
            src={`/media${user?.avatar}`}
            />
            <p className=' font-semibold text-lg'>{user?.name}</p>
            <Link href={`/talent/${user?.username}`} className=' text-sm text-dark-grey'>@{user?.username}</Link>
        </div>

        {/* bio about  */}
        <div className='grid gap-4 px-8'>
            <p className=' text-lg'>{user?.bio}</p>
            <p className=' text-base leading-8'>{user?.about}</p>
        </div>
    </div>
  )
}
