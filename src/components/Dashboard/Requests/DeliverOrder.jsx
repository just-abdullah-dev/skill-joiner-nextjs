"use client";
import { ArrowLeftCircleIcon, Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function DeliverOrder({ css, orderId, title, goBack }) {
    const {userInfo} = useSelector((state)=>state.user);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [docs, setDocs] = useState([]);

  const handleFileChange = (event, type) => {
    const files = event.target.files;
    switch (type) {
      case "photos":
        setPhotos([...photos, ...files]);
        break;
      case "videos":
        setVideos([...videos, ...files]);
        break;
      case "docs":
        setDocs([...docs, ...files]);
        break;
      default:
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const body = {
      title: title,
      desc: desc,
      id: orderId,
    };

    let formdata = new FormData();
    formdata.append("body", JSON.stringify(body));
    photos.forEach((pic) => {
      formdata.append("photos", pic, pic?.name);
    });

    videos.forEach((vid) => {
      formdata.append("videos", vid, vid?.name);
    });

    docs.forEach((doc) => {
      formdata.append("docs", doc, doc?.name);
    });

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      redirect: "follow",
      body: formdata,
    };
    fetch(`/api/users/orders/freelancer/deliverOrder`, requestOptions)
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
        <h1>Deliver </h1> <span className=" text-primary">Order</span>{" "}
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
            placeholder="Type any message for your client"
            onChange={(e) => setDesc(e.target.value)}
            required
          ></textarea>
        </div>

        {/* photos, videos and docs  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="labelTag">Upload Photos</h3>
            <input
              className="inputTag text-dark-grey w-full"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, "photos")}
            />
          </div>
          <div>
            <h3 className="labelTag">Upload Videos</h3>
            <input
              className="inputTag text-dark-grey w-full"
              type="file"
              accept="video/*"
              multiple
              onChange={(e) => handleFileChange(e, "videos")}
            />
          </div>
          <div>
            <h3 className="labelTag">Documents</h3>
            <input
              className="inputTag text-dark-grey w-full"
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, "docs")}
            />
          </div>
        </div>

        <button type="submit" className="actionButtonTag">
          {isLoading ? <Loader2Icon className="animate-spin" /> : "Deliver"}
        </button>
      </form>
    </div>
  );
}

export default dynamic(() => Promise.resolve(DeliverOrder), { ssr: false });
