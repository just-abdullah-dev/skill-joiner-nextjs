"use client";
import { ArrowLeftCircleIcon, Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function AskRevesion({ css, orderId, title, goBack }) {
  const {userInfo} = useSelector((state)=>state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const body = {
      title: title,
      desc: desc,
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
    fetch(`/api/users/orders/client/revision`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
        } else {
          toast.error(result?.message);
        }
        setIsLoading(false);
        goBack();

      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div
      className={
        css +
        " bg-white rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_0px_30px] left-4 p-6"
      }
    >
      <div className=" relative font-semibold text-center text-4xl py-4 flex gap-4 items-center justify-center">
        <ArrowLeftCircleIcon
          size={36}
          className=" cursor-pointer"
          onClick={() => {
            goBack();
          }}
        />
        <h1>Ask for </h1> <span className=" text-primary">Revision</span>{" "}
      </div>
      <form onSubmit={handleSubmit} className="grid flex-wrap gap-8 w-full">
        {/* desc  */}
        <div>
          <label className="labelTag" htmlFor="desc">
            Description:
          </label>
          <textarea
            className="inputTag w-full"
            id="desc"
            value={desc}
            placeholder="Write a detailed reason for why you need revision."
            onChange={(e) => setDesc(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="actionButtonTag">
          {isLoading ? <Loader2Icon className="animate-spin" /> : "Deliver"}
        </button>
      </form>
    </div>
  );
}

export default dynamic(() => Promise.resolve(AskRevesion), { ssr: false });
