import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Partners() {
  return (
    <div className=' w-full my-10'>
        <div className=' bg-primary text-3xl text-white font-bold text-center py-3'>
            Our Partners
        </div>
        <div className=' bg-white py-6 flex items-center justify-evenly gap-10 flex-wrap'>
            <Image
            src={'/logo.png'}
            alt={'Skill Joiner'}
            height={85}
            width={85}
            className=' aspect-auto'
            />
            <Link href={'https://paf-iast.edu.pk/'}>
            <Image
            src={'/pafiast.png'}
            alt={'PAF-IAST'}
            height={100}
            width={100}
            className=' aspect-auto'
            />
            </Link>
            <Link href={'https://github.com/just-abdullah-dev/'}>
            <h1 className=' text-7xl font-black text-secondary' alt='Just Solutions'>
                JS
            </h1>
            </Link>
        </div>
    </div>
  )
}
