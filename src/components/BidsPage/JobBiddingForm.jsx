"use client";
import { ArrowLeftCircleIcon, Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function JobBiddingForm({ jobId, goBack }) {
  const { userInfo } = useSelector((state) => state.user);
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");
  const [budget, setBudget] = useState("");
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const body = {
      desc: desc,
      time: time,
      budget: budget,
      jobPost: jobId,
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
    fetch(`/api/jobbid/create`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          goBack();
        } else {
          toast.error(result?.message);
        }
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  }

  // As full-stack developer I am confident that I will developed this whole project till deployment. It will be one in all option for you.
  return (
    <div className="mb-24 grid gap-6">
      <div className="bg-white relative font-semibold text-center text-4xl py-4 flex gap-4 items-center justify-center">
        <ArrowLeftCircleIcon
          size={36}
          className=" cursor-pointer"
          onClick={() => {
            if (window.confirm("Want to go back?")) {
              goBack();
            }
          }}
        />
        <h1>Bid on </h1> <span className=" text-primary">Job</span>{" "}
      </div>
      {/* Form for addition or updation of project.  */}

      <div
        id="form"
        className="flex items-center justify-center relative pt-4 w-full"
      >
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
              onChange={(e) => setDesc(e.target.value)}
              required
            ></textarea>
          </div>
          {/* time, budget  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="labelTag" htmlFor="time">
                Time in days:
              </label>
              <input
                className="inputTag w-full"
                type="number"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="labelTag" htmlFor="budget">
                Budget:
              </label>
              <input
                className="inputTag w-full"
                type="text"
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </div>
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
            {isLoading ? <Loader2Icon className="animate-spin" /> : "Bid"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default dynamic(() => Promise.resolve(JobBiddingForm), { ssr: false });
