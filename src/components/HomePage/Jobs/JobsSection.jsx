"use client";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getJobs } from "@/services/getJobs";
import JobTile from "./JobTile";

export default function JobsSection() {
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    const getAll = () => {
      getJobs({keyword:"",limit:4}, (data) => {
        if(data?.success){
          setJobs(data?.data);
        }else{
          toast?.error(data?.message)
        }
      });
    };
    getAll();
  }, [setJobs]);

  return (
    <div className=" bg-white rounded-2xl p-6 grid gap-8">
      <h1 className="text-3xl font-bold">Recent Jobs</h1>
      <div className={` grid gap-8 grid-cols-1 md:grid-cols-2 px-4`}>
        {jobs[0] && (
          jobs.map((item) => {
            return <JobTile key={item?._id} job={item} />;
          })
        )}
      </div>
      {!jobs[0] && 
      <div className=" flex items-center justify-center">
      <Loader2Icon className=" animate-spin" />
    </div>}
    </div>
  );
}
