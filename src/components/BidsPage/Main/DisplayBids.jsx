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
        <div>
          <div className=" flex items-center justify-around">
            <h1 className=" text-3xl">Bids</h1>
            <p>See Latest</p>
          </div>
          {bids[0] && (
            <div className="grid gap-6 grid-cols-1 w-full p-6">
              {bids.map((item, index) => {
                return (
                  <div
                    key={item?._id}
                    className=" p-4 bg-white rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_-1px_3px_8px] grid gap-4"
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
