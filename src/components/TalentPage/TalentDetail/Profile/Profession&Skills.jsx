import React from 'react'
import Profession from './Profession'
import Skills from './Skills'
import Country from './Country'

export default function CountryProfessionAndSkills({skills, profession, country}) {
  return (
    <div className='relative flex flex-col flex-wrap items-center justify-between 
    gap-6 bg-white py-10 px-24 w-[800px] rounded-3xl shadow-[-6px_-1px_25px_5px_#00000024]'>
        <Country userCountry={country} />
        <hr/>
        <Profession userProfession={profession} />
        <hr/>
        <Skills userSkills={skills} />
    </div>
  )
}
