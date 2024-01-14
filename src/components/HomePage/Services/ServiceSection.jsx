"use client";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import ServicesTile from "./ServicesTile";
import { getServices } from "@/services/getServices";
import toast from "react-hot-toast";

export default function ServiceSection() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const getAll = () => {
      getServices({keyword:'',limit:4}, (data) => {
        if(data?.success){
          setServices(data?.data);
        }else{
          toast?.error(data?.message)
        }
      });
    };
    getAll();
  }, [setServices]);

  return (
    <div className=" bg-white rounded-2xl p-6 grid gap-8">
      <h1 className="text-3xl font-bold">Popular Services</h1>
      <div className={` grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4`}>
        {services[0] && (
          services.map((item) => {
            return <ServicesTile key={item?._id} showEditBtn={false} showUserData={true} service={item} />;
          })
        )}
      </div>
      {!services[0] && 
      <div className=" flex items-center justify-center">
      <Loader2Icon className=" animate-spin" />
    </div>}
    </div>
  );
}
