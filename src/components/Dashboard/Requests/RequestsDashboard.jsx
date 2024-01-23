"use client";
import { getJobsByUserId } from "@/services/getJobsByUserId";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AsClient from "./AsClient";
import AsSeller from "./AsSeller";

export default function RequestsDashboard() {
  const { userInfo } = useSelector((state) => state.user);
  const [isClient, setIsClient] = useState(true);
  const [isSeller, setIsSeller] = useState(false);

  return (
    <div className=" flex items-center justify-center p-6">
      <div className="p-4 bg-white rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_-1px_3px_8px] grid gap-4 w-full relative">
        <div className=" flex items-center justify-around">
          <h1 className=" text-3xl">Requests</h1>
        </div>
        {userInfo?.student ? (
          <div className=" flex items-center w-full">
            <div
              onClick={() => {
                setIsClient(true);
                setIsSeller(false);
              }}
              className={`${
                isClient ? "bg-primary text-white" : "bg-white"
              } text-xl w-1/2 hover:bg-primary py-2 text-center hover:text-white duration-200 cursor-pointer`}
            >
              My Requests
            </div>
            <div
              onClick={() => {
                setIsSeller(true);
                setIsClient(false);
              }}
              className={`${
                isSeller ? "bg-primary text-white" : "bg-white"
              } text-xl w-1/2 hover:bg-primary py-2 text-center hover:text-white duration-200 cursor-pointer`}
            >
              Received Requests
            </div>
          </div>
        ) : (
          <AsClient />
        )}

        {userInfo?.student && isClient ? (
          <AsClient />
        ) : isSeller ? (
          <AsSeller />
        ) : null}
      </div>
    </div>
  );
}
