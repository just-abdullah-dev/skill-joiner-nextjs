"use client";
import UserShortView from "@/components/User/UserShortView";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AskRevesion from "./AskRevesion";
import toast from "react-hot-toast";

export default function AsClient() {
  const { userInfo } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showReverse, setShowReverse] = useState(false);
  const [showDelivery, setShowDelivery] = useState({
    status: false,
    index: -1,
  });
  const [orderRevision, setOrderRevision] = useState({
    orderId: "",
    title: "",
  });

  useEffect(() => {
    setIsLoading(true);
    const get = () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      fetch(
        `/api/servicerequest/client/searchRequests?keyword=${keyword}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data?.success) {
            setOrders(data?.data);
            setIsLoading(false);
            setIsError("");
          } else {
            setIsError(data?.message);
          }
        })
        .catch((error) => console.log("error", error));
    };
    get();
  }, [userInfo, setOrders]);

  const handleDeleteReq = (id)=>{
    setIsLoading(true);
    if(!window.confirm('Are sure to delete request?')){
      setIsLoading(false);
      return;
    }
    var requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      redirect: "follow",
    };
    fetch(`/api/servicerequest/delete?id=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
        } else {
          toast.error(result?.message);
        }
        setIsLoading(false);
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  }
  return (
    <>
      <button
        className=" normalButtonTag w-[110px] bg-secondary absolute top-3 right-24"
        onClick={() => {
          setOrders(() => {
            return orders.slice().reverse();
          });
          setShowReverse(!showReverse);
        }}
      >
        {showReverse ? "See Oldest" : "See Latest"}
      </button>
      <div className="grid gap-4">
        {isError ? (
          <div className=" bg-white w-full h-[300px] text-lg flex items-center justify-center">
            {isError}
          </div>
        ) : isLoading ? (
          <div className=" flex items-center justify-center w-full h-[300px]">
            <Loader2Icon size={48} className=" animate-spin" />
          </div>
        ) : (
          <div className=" px-6 grid gap-4">
            {orders[0] &&
              orders.map((item, index) => {
                return (
                  <div
                    key={item?._id}
                    className=" even:bg-light-soft bg-gray-200 p-4 rounded-2xl shadow-lg"
                  >
                    <div className=" flex items-center justify-between">
                      <h1 className=" text-lg">
                        {item?.title}
                      </h1>
                      {/* btn close details , see details and status accepted or rejected  */}
                      <div className=" flex items-center gap-4 flex-row-reverse">
                        {item?.isAccepted && (
                          <p className=" normalButtonTag bg-green-500 w-[150px]">
                            Accepted
                          </p>
                        )}
                        {item?.isRejected && (
                          <p className=" normalButtonTag bg-red-600 w-[150px]">
                            Rejected
                          </p>
                        )}
                        {showDelivery?.status &&
                          showDelivery?.index == index && (
                            <button
                              className=" normalButtonTag w-[150px] bg-secondary"
                              onClick={() => {
                                setShowDelivery(() => {
                                  return {
                                    status: false,
                                    index: index,
                                  };
                                });
                              }}
                            >
                              Close Details
                            </button>
                          )}
                        {!showDelivery?.status && (
                          <button
                            className=" normalButtonTag w-[150px] bg-secondary"
                            onClick={() => {
                              setShowDelivery(() => {
                                return {
                                  status: true,
                                  index: index,
                                };
                              });
                            }}
                          >
                            See Details
                          </button>
                        )}
                      </div>
                    </div>

                    {showDelivery?.status && showDelivery?.index == index && (
                      <div className=" flex ">
                        {/* desc and attachments  */}
                        <div className=" w-4/5">
                              <div>
                                <h1 className=" text-lg font-semibold">Description: </h1>
                                {item?.desc}
                              </div>
                              <div className=" flex gap-6 items-center text-lg mt-2">
                            <p>Budget: {item?.budget}</p>
                            <p>
                              Time:{" "}
                              {item?.time == "1"
                                ? item?.time + " day"
                                : item?.time + " days"}
                            </p>
                          </div>
                            <div className=" flex flex-wrap gap-4 p-8">
                              {item?.photos[0] &&
                                item?.photos.map(
                                  (pic, index) => {
                                    return (
                                      <a
                                        className=" actionButtonTag w-fit"
                                        key={index}
                                        target="_blank"
                                        href={`/media/${pic}`}
                                        download
                                      >
                                        Download Image {index + 1}
                                      </a>
                                    );
                                  }
                                )}
                              {item?.videos[0] &&
                                item?.videos.map(
                                  (pic, index) => {
                                    return (
                                      <a
                                        className=" actionButtonTag w-fit"
                                        key={index}
                                        target="_blank"
                                        href={`/media/${pic}`}
                                        download
                                      >
                                        Download Video {index + 1}
                                      </a>
                                    );
                                  }
                                )}
                              {item?.docs[0] &&
                                item?.docs.map(
                                  (pic, index) => {
                                    return (
                                      <a
                                        className=" actionButtonTag w-fit"
                                        key={index}
                                        target="_blank"
                                        href={`/media/${pic}`}
                                        download
                                      >
                                        Download File {index + 1}
                                      </a>
                                    );
                                  }
                                )}
                            </div>
                            {!item?.isAccepted && (
                          <button
                          onClick={()=>{
                            handleDeleteReq(item?._id);
                          }}
                          className=" normalButtonTag bg-red-600 w-[150px] float-right relative">
                            Delete Request
                          </button>
                        )}
                        </div>
                        {/* Request To User  */}
                        <div className=" w-1/5 ">
                          <p className=" mt-3 text-lg">Request to</p>
                          <UserShortView user={item?.requestTo[0]} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
}
