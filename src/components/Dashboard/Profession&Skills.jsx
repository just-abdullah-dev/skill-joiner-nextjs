import React from 'react'
import Profession from './Profession'
import Skills from './Skills'

export default function ProfessionAndSkills({skills, profession}) {
  return (
    <div className='relative flex flex-col flex-wrap items-center justify-between 
    gap-6 bg-white py-10 px-24 w-[800px] rounded-3xl shadow-[-6px_-1px_25px_5px_#00000024]'>
        <Profession userProfession={profession} />
        <Skills userSkills={skills} />
    </div>
  )
}
