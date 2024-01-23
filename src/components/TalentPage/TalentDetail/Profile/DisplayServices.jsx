"use client";
import ServicesTile from "@/components/HomePage/Services/ServicesTile";
import dynamic from "next/dynamic";
import React from "react";

function DisplayServices({ services = [] }) {
  return (
     <div
        className={`relative flex flex-col flex-wrap justify-between gap-2 bg-white py-10 w-full rounded-3xl shadow-[-6px_-1px_25px_5px_#00000024]`}
      >
        <h1 className="text-2xl font-bold ml-12 ">Services</h1>
        <hr />
        {/* Display existed projects  */}
        <div className="">
          {services && services.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 p-10">
              {services.map((item) => {
                return (
                  <ServicesTile showEditBtn={false} key={item?._id} service={item} />
                );
              })}
            </div>
          )}
        </div>
      </div>
  );
}

export default dynamic(() => Promise.resolve(DisplayServices), { ssr: false });
