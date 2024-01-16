import { getTimeForJob } from '@/services/getTimeForJob';
import { ArrowLeftCircleIcon } from 'lucide-react';
import React from 'react'

export default function ViewBid({goBack}) {
  return (
    <div className="mb-24 grid gap-6">
      <div className="bg-white relative font-semibold text-center text-4xl py-4 flex gap-4 items-center justify-center">
        <ArrowLeftCircleIcon
          size={36}
          className=" cursor-pointer"
          onClick={() => {
            goBack();
          }}
        />
        <h1>Your </h1> <span className=" text-primary">Bid</span>{" "}
      </div>
      <div className=' grid gap-4'>
          <div>
            <h1>Description: </h1>
            <p>Description goes here</p>
          </div>
          <div className="flex items-center justify-around gap-4 text-base font-semibold">
            <p>Time: 3 days
                {/* {getTimeForJob(job?.time)} */}
            </p>
            <p>Budget: 400 PKR</p>
            <p>Status: Not accepted yet.</p>
          </div>

      </div>
    </div>
  )
}
