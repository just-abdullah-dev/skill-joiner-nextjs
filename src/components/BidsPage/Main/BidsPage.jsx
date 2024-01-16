"use client";
import { getJobById } from "@/services/getJobById";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import DisplayBids from "./DisplayBids";

export default function BidsPage({ id }) {
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.user);
  const [job, setJob] = useState(null);
  const [bids, setBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    const get = () => {
      getJobById(id, (data) => {
        if (data?.success) {
          setJob(data?.data);
          if (data?.data?.user?._id != userInfo?._id) {
            toast.error("You didnot post this job.");
            router.push(`/jobs/${id}`);
          }
          setIsLoading(false);
          setIsError("");
        } else {
          setIsError(data?.message);
        }
      });
    };
    get();
  }, [id, setJob]);


  
  return (
    <div className=" p-6">
      {isError ? (
        <div className=" bg-white w-full h-[300px] text-lg flex items-center justify-center">
          {isError}
        </div>
      ) : isLoading ? (
        <div className=" flex items-center justify-center w-full h-[300px]">
          <Loader2Icon size={48} className=" animate-spin" />
        </div>
      ) : (
        // title
        <>
        <div className=" flex items-center justify-between text-3xl px-4 ">
          {job?.title}
        </div>
        <DisplayBids jobId={id} /></>
      )}
    </div>
  );
}
