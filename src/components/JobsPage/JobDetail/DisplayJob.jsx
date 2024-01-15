"use client";
import UserShortView from "@/components/User/UserShortView";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ShareOnMedia from "@/components/utils/ShareOnMedia";
// import PricingOpt from "./PricingOpt";
// import RelatedServices from "./RelatedServices";
import { getJobById } from "@/services/getJobById";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import getTimeAgoString from "@/utils/getTimeAgo";
import { getTimeForJob } from "@/services/getTimeForJob";
import JobBiddingForm from "./JobBiddingForm";
import ViewBid from "./ViewBid";

function DisplayJob({ id }) {
  const [isViewBid, setIsViewBid] = useState(false);
  const router = useRouter();
  const [isBid, setIsBid] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    const get = () => {
      getJobById(id, (data) => {
        if (data?.success) {
          setJob(data?.data);
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
    <>
      {isError ? (
        <div className=" bg-white w-full h-[300px] text-lg flex items-center justify-center">
          {isError}
        </div>
      ) : isLoading ? (
        <div className=" flex items-center justify-center w-full h-[300px]">
          <Loader2Icon size={48} className=" animate-spin" />
        </div>
      ) : isBid?
      isViewBid?
      (
        <ViewBid goBack={()=>{setIsBid(false);setIsViewBid(false);}} />
      ):
      (
        <JobBiddingForm jobId={id} goBack={()=>{setIsBid(false)}} />
      ):(
        <div className=" py-16 grid gap-10">
          {/* title  */}
          <div className=" flex items-center justify-between text-3xl px-4 ">
            {job?.title}
            {job?.user?._id == userInfo?._id ? (
              
              <button
              onClick={() => {
                router.push(`/jobs/bids/${id}`);
              }}
              className=" actionButtonTag text-base mr-36"
            >
              View Bids
            </button>
            ) : userInfo && userInfo?.student ? 
            (
              job?.biders[0] && job?.biders.includes(userInfo?._id)
            )?
            (
              <button
                onClick={() => {
                  setIsViewBid(true);
                  setIsBid(true);
                }}
                disabled={job?.isHired}
                className=" actionButtonTag text-base mr-36"
              >
                View Bid
              </button>
            ):(
              <button
                onClick={() => {
                  setIsBid(true);
                }}
                disabled={job?.isHired}
                className=" actionButtonTag text-base mr-36"
              >
                {job?.isHired ? "Hired" : "Bid on Job"}
              </button>
            ) : (
              <p className="text-base mr-24">
                Sign up as student to bid on job.
              </p>
            )}
          </div>
          {/* others details and description  */}
          <div className=" flex ">
            {/* jobs details  */}
            <div className="  bg-white rounded-2xl w-2/3 p-6 pt-0 grid gap-6">
              {/* time budget  */}
              <div className="flex items-center justify-around gap-4 text-base font-semibold">
                <p>Time: {getTimeForJob(job?.time)}</p>
                <p>Budget: {job?.budget} PKR</p>
              </div>
              {/* Description  */}
              <p className=" leading-8 p-6">{job?.desc}</p>
              {/* images, videos  */}
              <div className=" w-full flex items-center justify-center ">
                <Image
                  height={700}
                  width={700}
                  className=" aspect-auto"
                  alt="Picture"
                  src={
                    job?.photos[0] ? `/media/${job?.photos[0]}` : "/sample.jpg"
                  }
                />
              </div>
              {/* profession  */}
              <div className=" flex gap-4 items-center">
                <h1 className=" font-semibold text-lg">Category</h1>
                <p>{job?.profession?.name}</p>
              </div>

              {/* skills  */}
              <div className="grid gap-2">
                <h1 className=" font-semibold text-lg">Skills</h1>
                <div className="flex gap-4 flex-wrap px-4">
                  {job?.skills.map((item) => {
                    return (
                      <div
                        key={item?._id}
                        className=" bg-primary p-2 rounded-lg text-white text-center w-fit"
                      >
                        {item?.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2nd column user  */}
            <div className="  w-1/3">
              <div className=" grid gap-2 text-dark-grey">
                <p>{getTimeAgoString(job?.updatedAt)}</p>
                <p>Posted By:</p>
              </div>
              <UserShortView user={job?.user} />
              <ShareOnMedia
                URL={typeof window !== "undefined" ? window.location.href : ""}
              />
            </div>
          </div>
        </div>
      )
      }
    </>
  );
}
export default dynamic(() => Promise.resolve(DisplayJob), { ssr: false });
