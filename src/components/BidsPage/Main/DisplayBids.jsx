"use client";
import UserShortView from "@/components/User/UserShortView";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import getTimeAgoString from "@/utils/getTimeAgo";
import { getTimeForJob } from "@/services/getTimeForJob";
import { getBidsByJobId } from "@/services/getBidsByJobId";
import Link from "next/link";
import toast from "react-hot-toast";

function DisplayBids({ jobId }) {
  const [isViewBid, setIsViewBid] = useState({
    show: false,
    index: -1,
  });
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.user);
  const [bids, setBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const [showReverse, setShowReverse] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const get = () => {
      getBidsByJobId(jobId, (data) => {
        if (data?.success) {
          setBids(data?.data);
          setIsLoading(false);
          setIsError("");
        } else {
          setIsError(data?.message);
        }
      });
    };
    get();
  }, [jobId, setBids]);

  const shortDesc = (title) => {
    const maxLength = 300;
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`;
    } else {
      return title;
    }
  };

  const handleAcceptBid = (bidId, freelancerId)=>{
    const body = {
      freelancer: freelancerId,
      id: bidId,
      isAccepted: 'yes',
    };
    var requestOptions = {
      method: "PUT",
      redirect: "follow",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      body: JSON.stringify(body),
    };
  
    fetch(`/api/jobbid/isAccepted`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          toast.success(data?.message)
          setIsLoading(false);
          setIsError("");
        } else {
          setIsError(data?.message);
        }
        
      })
      .catch((error) => console.log("error", error));
  
  }
  return (
    <div className=" bg-white p-6 rounded-2xl">
      {/* jobs  */}
      {isError ? (
        <div className=" flex items-center justify-center w-full h-[300px] text-lg">
          {isError}
        </div>
      ) : isLoading ? (
        <div className=" flex items-center justify-center w-full h-[300px]">
          <Loader2Icon size={48} className="animate-spin" />
        </div>
      ) : (
        <div className="">
          <div className=" flex items-center justify-around bg-white py-4 w-full">
            <h1 className=" text-3xl">Bids{"("}{bids.length}{")"}</h1>
            <button
            className=" normalButtonTag w-[110px] bg-secondary"
            onClick={()=>{
              setBids(()=>{
                return bids.slice().reverse();
              });
              setShowReverse(!showReverse)
            }}
            >{showReverse?'See Oldest':'See Latest'}</button>
          </div>
          {bids[0] && (
            <div className="grid gap-6 grid-cols-1 w-full p-6">
              {bids.map((item, index) => {
                return (
                  <div
                    key={item?._id}
                    className=" p-4 rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_-1px_3px_8px] grid gap-4 even:bg-light-soft bg-gray-200"
                  >
                    {isViewBid?.show && isViewBid?.index == index ? (
                      <>
                        <div className=" flex">
                          {/* desc, all bid data download file option , usershortview  */}
                          <div className=" w-2/3">
                          <p>{item?.desc}</p>
                          <div className="flex items-center justify-around gap-4 text-base font-semibold">
                            <p>Time: {getTimeForJob(item?.time)}</p>
                            <p>Budget: {item?.budget} PKR</p>
                          </div>
                          <div className=" flex flex-wrap gap-4 p-8">
                          {item?.photos[0]&& item?.photos.map((pic, index)=>{
                              return (
                                <a
                                className=" actionButtonTag w-fit"
                                key={index} target="_blank" href={`/media/${pic}`} download >
                                  Download Image {index+1}
                                </a>
                              )
                            })}
                            {item?.videos[0]&& item?.videos.map((pic, index)=>{
                              return (
                                <a
                                className=" actionButtonTag w-fit"
                                key={index} target="_blank" href={`/media/${pic}`} download >
                                  Download Video {index+1}
                                </a>
                              )
                            })}
                            {item?.docs[0]&& item?.docs.map((pic, index)=>{
                              return (
                                <a
                                className=" actionButtonTag w-fit"
                                key={index} target="_blank" href={`/media/${pic}`} download >
                                  Download File {index+1}
                                </a>
                              )
                            })}
                          </div>
                          <div className=" flex items-end justify-end w-full ">
                          <button
                          onClick={()=>{
                            handleAcceptBid(item?._id,item?.user?._id);
                          }}
                          className=" normalButtonTag bg-green-500 hover:bg-green-600 text-white w-[150px]">
                            Accept
                          </button>
                          </div>
                          </div>
                          <div className=" w-1/3">
                            <UserShortView user={item?.user} />
                          </div>
                        </div>
                        <div className=" flex items-center justify-center">
                          <p
                            onClick={() => {
                              setIsViewBid(() => {
                                return { show: false, index: -1 };
                              });
                            }}
                            className=" w-fit bg-primary hover:bg-primary_dark text-white rounded-3xl py-1 px-4 cursor-pointer"
                          >
                            Show Less
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <p>{shortDesc(item?.desc)}</p>
                        <div className=" flex items-center justify-center">
                          <p
                            onClick={() => {
                              setIsViewBid(() => {
                                return { show: true, index: index };
                              });
                            }}
                            className=" w-fit bg-primary hover:bg-primary_dark text-white rounded-3xl py-1 px-4 cursor-pointer"
                          >
                            Show More
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default dynamic(() => Promise.resolve(DisplayBids), { ssr: false });
