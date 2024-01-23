"use client";
import UserShortView from "@/components/User/UserShortView";
import { getServiceById } from "@/services/getServiceById";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PricingOpt from "./PricingOpt";
import ShareOnMedia from "@/components/utils/ShareOnMedia";
import RelatedServices from "./RelatedServices";

export default function DisplayService({ id }) {
  const [service, setService] = useState(null);
  useEffect(() => {
    const get = () => {
      getServiceById(id, (data) => {
        if (data?.success) {
          setService(data?.data);
        } else {
          toast.error(data?.message);
        }
      });
    };
    get();
  }, [id, setService]);
  return (
    <div className="  py-16 grid gap-10">
      {/* title  */}
      <div className=" text-3xl px-4">{service?.title}</div>

      {/* others details and description  */}
      <div className=" flex ">
        {/* services details  */}
        <div className="  bg-white rounded-2xl w-2/3 p-6 grid gap-10">
          {/* images, videos  */}
          <div className=" aspect-video w-full flex items-center justify-center">
            <Image
              height={700}
              width={700}
              className=" aspect-auto"
              alt="Picture"
              src={service?.photos[0]?`/media/${service?.photos[0]}`:'/sample.jpg'}
            />
          </div>

          {/* Description  */}
          <p className=" leading-8 p-6">{service?.desc}</p>

          <div className=" relative">
            {/* Pricing  */}
          {service && 
          <PricingOpt packages={service?.packages} />}
          </div>

          {/* profession  */}
          <div className=" flex gap-4 items-center">
            
        <h1 className=" font-semibold text-lg">Profession</h1>
          <p>{service?.profession?.name}</p>
          </div>

          {/* skills  */}
          <div className="grid gap-2">
            <h1 className=" font-semibold text-lg">Skills</h1>
            <div className="flex gap-4 flex-wrap px-4">
            {service?.skills.map((item)=>{
                return (
                    <div key={item?._id} className=" bg-primary p-2 rounded-lg text-white text-center w-fit">
                        {item?.name}
                    </div>
                );
            })}
            </div>
          </div>

          {/* Related services  */}
          {service && 
          <RelatedServices keyword={service?.profession?.name} id={id} />}
        </div>

        {/* 2nd column user  */}
        <div className="  w-1/3">
          <UserShortView user={service?.user} />
          <ShareOnMedia URL={typeof window !== 'undefined' ? window.location.href : ''} />
        </div>
      </div>
    </div>
  );
}
