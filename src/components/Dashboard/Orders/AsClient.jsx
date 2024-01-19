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
        `/api/users/orders/client/searchOrders?keyword=${keyword}`,
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

  console.log(orders);

  const handleCompleteOrder = async (orderId, title) => {
    setIsLoading(true);
    const body = {
      title: title,
      id: orderId,
    };

    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      redirect: "follow",
      body: JSON.stringify(body),
    };
    fetch(`/api/users/orders/client/completed`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
        } else {
          toast.error(result?.message);
        }
        window.location.reload();
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      {orderRevision?.orderId && (
        <AskRevesion
          goBack={() => {
            setOrderRevision(() => {
              return {
                orderId: "",
                title: "",
              };
            });
          }}
          css={" absolute -top-10 h-[500px] w-[1000px] z-10 bg-red-500"}
          orderId={orderRevision?.orderId}
          title={orderRevision?.title}
        />
      )}
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
                        {item?.serviceData[0]?.title}
                        {item?.serviceRequest[0]?.title}
                        {item?.jobPostData[0]?.title}
                      </h1>
                      <div className=" flex items-center gap-4 flex-row-reverse">
                        {item?.isCompleted && (
                          <p className=" actionButtonTag w-[150px]">
                            Completed
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
                        <div className=" w-4/5">
                          {item?.isDelivered && (
                            <div className=" flex flex-wrap gap-4 p-8">
                              <div>
                                <h1>Description: </h1>
                                {item?.deliveryData[0]?.desc}
                              </div>
                              {item?.deliveryData[0]?.photos[0] &&
                                item?.deliveryData[0]?.photos.map(
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
                              {item?.deliveryData[0]?.videos[0] &&
                                item?.deliveryData[0]?.videos.map(
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
                              {item?.deliveryData[0]?.docs[0] &&
                                item?.deliveryData[0]?.docs.map(
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
                          )}
                          {!item?.isCompleted && item?.isDelivered && (
                            <div className=" flex gap-3 items-center">
                              <button
                                onClick={() => {
                                  setOrderRevision(() => {
                                    return {
                                      orderId: item?._id,
                                      title:
                                        item?.serviceData[0]?.title ||
                                        item?.serviceRequest[0]?.title ||
                                        item?.jobPostData[0]?.title,
                                    };
                                  });
                                }}
                                className=" normalButtonTag bg-green-500 hover:bg-green-600"
                              >
                                Ask for Revision
                              </button>
                              <button
                                onClick={() => {
                                  handleCompleteOrder(
                                    item?._id,
                                    item?.serviceData[0]?.title ||
                                      item?.serviceRequest[0]?.title ||
                                      item?.jobPostData[0]?.title
                                  );
                                }}
                                className=" normalButtonTag bg-green-500 hover:bg-green-600"
                              >
                                Complete Order
                              </button>
                            </div>
                          )}
                          {!item?.isDelivered && !item?.isCompleted && (
                            <p className=" py-4 text-center">No update yet.</p>
                          )}
                        </div>
                        <div className=" w-1/5 ">
                          <p className=" mt-3 text-lg">Freelancer</p>
                          <UserShortView user={item?.freelancerData[0]} />
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
