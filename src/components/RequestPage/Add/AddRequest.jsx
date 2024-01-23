"use client";
import {
  Loader2Icon,
  PlusCircle,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getAllProfessions } from "@/services/getAllProfessions";
import { getAllSkills } from "@/services/getAllSkills";

function AddRequest({ userId }) {
  const { userInfo } = useSelector((state) => state.user);
  const [professions, setProfessions] = useState([]);
  const [skills, setSkills] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [budget, setBudget] = useState("");
  const [desc, setDesc] = useState("");
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    if (!userInfo) {
      router.push("/");
      toast.error("Log in to get access.");
    }
  }, [router, userInfo]);

  useEffect(() => {
    const getAll = () => {
      getAllProfessions((data) => {
        setProfessions(data);
      });
      getAllSkills((data) => {
        setSkills(data);
      });
    };
    getAll();
  }, []);

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
      requestTo: userId,
      title: title,
      desc: desc,
      time: time,
      budget: budget,
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
    fetch(`/api/servicerequest/create`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          router.push(`/dashboard/requests`);
        } else {
          toast.error(result?.message);
        }
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="mb-24 grid gap-6">
      <div className="bg-white relative font-semibold text-center text-4xl py-4 flex gap-2 items-center justify-center">
        <h1>Request a </h1> <span className=' text-primary'>Service</span>{" "} 
      </div>
      {/* Form for request.  */}
        <div
          id="form"
          className="flex items-center justify-center relative pt-4 w-full"
        >
          <form onSubmit={handleSubmit} className="grid flex-wrap gap-8 w-full">
          {/* title  */}
          <div>
                <label className="labelTag" htmlFor="title">
                  Title:
                </label>
                <input
                  className="inputTag w-full"
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
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
              {isLoading ? (
                <Loader2Icon className="animate-spin" />
              ) : "Request"}
            </button>
          </form>
        </div>
    </div>
  );
}
export default dynamic(() => Promise.resolve(AddRequest), { ssr: false });
