"use client";
import {
  PlusCircle,
} from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ServicesTile from "../HomePage/Services/ServicesTile";

function Services({ userServices = [] }) {
  const [userServicesState, setUserServicesState] = useState(null);
  const router = useRouter();
  useEffect(() => {
    setUserServicesState(userServices);
  }, [userServices]);

  return (
    <div className="flex items-center justify-center">
      <div
        className={`relative flex flex-col flex-wrap justify-between gap-6 bg-white py-10 w-[800px] rounded-3xl shadow-[-6px_-1px_25px_5px_#00000024]`}
      >
        {/* Add Project btn  */}
          <button
            className="absolute top-10 right-10 scale-110"
            onClick={() => {
              router.push('/services/edit/new');
            }}
          >
            <PlusCircle className="stroke-primary" />
          </button>
        <h1 className="text-2xl font-bold ml-6">Services</h1>
        <hr />

        {/* Display existed projects  */}
        <div className="">
          {userServicesState && userServicesState.length > 0 ? (
            <div className="grid grid-cols-2 gap-12 p-10">
              {userServicesState.map((item) => {
                return (
                  <ServicesTile key={item?._id} service={item} />
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <h1>Click plus button to add project. </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Services), { ssr: false });
