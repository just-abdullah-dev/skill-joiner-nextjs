"use client";
import {
  Loader2Icon,
  MinusCircle,
  PenSquare,
  PlusCircle,
  XCircle,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ViewImage from "../../utils/ViewImage";
import { useRouter } from "next/navigation";

function Portfolio({ userPortfolio = [] }) {
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [userPortfolioState, setUserPortfolioState] = useState(null);
  const router = useRouter();

  const [updateDocId, setUpdateDocId] = useState("");
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setUserPortfolioState(userPortfolio);
  }, [userPortfolio]);

  async function handleDeleteProject(id) {
    if (window.confirm("Do you want to remove this project?"))
      setUserPortfolioState((oldProj) => {
        let array = [];
        oldProj.map((item) => {
          if (item?._id != id) {
            array.push(item);
          }
        });
        return array;
      });

    var requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      redirect: "follow",
    };

    fetch(`/api/users/portfolio/deleteProject?id=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
        } else {
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdd) {
      handleAddProject();
    } else if (isUpdate) {
      handleUpdateProject();
    }
  };

  async function handleAddProject() {
    setIsLoading(true);
    const body = {
      title: title,
      desc: desc,
      start: startDate,
      end: endDate,
    };
    setUserPortfolioState((oldSkills) => [
      ...oldSkills,
      { ...body, _id: startDate, photos: photos, videos: videos },
    ]);

    let formdata = new FormData();
    formdata.append("body", JSON.stringify(body));
    photos.forEach((pic) => {
      formdata.append("photos", pic, pic?.name);
    });

    videos.forEach((vid) => {
      formdata.append("videos", vid, vid?.name);
    });

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      redirect: "follow",
      body: formdata,
    };
    fetch(`/api/users/portfolio/addProject`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
        } else {
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
    setTitle("");
    setDesc("");
    setStartDate("");
    setEndDate("");
    setPhotos([]);
    setVideos([]);
    setUpdateDocId("");

    setIsUpdate(false);
    setIsAdd(false);
    setIsLoading(false);
  }

  async function handleUpdateProject() {
    setIsLoading(true);
    const body = {
      _id: updateDocId,
      title: title,
      desc: desc,
      start: startDate,
      end: endDate,
    };

    let formdata = new FormData();
    formdata.append("body", JSON.stringify(body));
    photos.forEach((pic) => {
      formdata.append("photos", pic, pic?.name);
    });

    videos.forEach((vid) => {
      formdata.append("videos", vid, vid?.name);
    });

    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      redirect: "follow",
      body: formdata,
    };
    fetch(`/api/users/portfolio/updateProject`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          let array = [];
          userPortfolioState.map((item) => {
            if (item?._id == updateDocId) {
              array.push(result?.data);
              return;
            }
            array.push(item);
          });
          setUserPortfolioState(array);
        } else {
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
    setTitle("");
    setDesc("");
    setStartDate("");
    setEndDate("");
    setPhotos([]);
    setVideos([]);
    setUpdateDocId("");

    setIsUpdate(false);
    setIsAdd(false);
    setIsLoading(false);
  }

  const handleFileChange = (event, type) => {
    const files = event.target.files;
    switch (type) {
      case "photos":
        setPhotos([...photos, ...files]);
        break;
      case "videos":
        setVideos([...videos, ...files]);
        break;
      default:
        break;
    }
  };

  const [viewImageSrc, setViewImageSrc] = useState("");
  function viewImage(src) {
    setViewImageSrc(src);
  }
  return (
    <div className="flex items-center justify-center">
      {viewImageSrc && (
        <div className="absolute right-0 left-0">
          <ViewImage src={viewImageSrc} setViewImageSrc={setViewImageSrc} />
        </div>
      )}
      <div
        className={`relative flex flex-col flex-wrap justify-between gap-6 bg-white p-10 w-[800px] rounded-3xl shadow-[-6px_-1px_25px_5px_#00000024]`}
      >
        {/* Add Project btn  */}
        {!isAdd && (
          <button
            className="absolute top-10 right-10 scale-110"
            onClick={() => {
              setIsAdd(true);
            }}
          >
            <PlusCircle className="stroke-primary" />
          </button>
        )}

        <h1 className="text-2xl font-bold ml-6">Portfolio</h1>
        <hr />

        {/* Form for addition or updation of project.  */}
        {(isAdd || isUpdate) && (
          <div id="form" className="flex items-center justify-center relative pt-4">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 flex-wrap gap-8"
            >
              <button
                className="absolute top-0 right-8 scale-110"
                onClick={() => {
                  setTitle("");
                  setDesc("");
                  setStartDate("");
                  setEndDate("");
                  setPhotos([]);
                  setVideos([]);
                  setUpdateDocId("");
                  setIsUpdate(false);
                  setIsAdd(false);
                }}
              >
                <XCircle className="stroke-red-500" />
              </button>

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
              <div>
                <h3 className="labelTag">Upload Photos</h3>
                <input
                  className="inputTag text-dark-grey"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e, "photos")}
                />
              </div>
              <div>
                <h3 className="labelTag">Upload Videos</h3>
                <input
                  className="inputTag text-dark-grey"
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => handleFileChange(e, "videos")}
                />
              </div>

              <div>
                <label className="labelTag" htmlFor="startDate">
                  Start Date:
                </label>
                <input
                  className="inputTag w-full"
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="labelTag" htmlFor="endDate">
                  End Date:
                </label>
                <input
                  className="inputTag w-full disabled:cursor-not-allowed"
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <button type="submit" className="actionButtonTag">
                {isLoading ? (
                  <Loader2Icon className="animate-spin" />
                ) : isAdd ? (
                  "Add"
                ) : (
                  "Update"
                )}
              </button>
            </form>
          </div>
        )}

        {/* Display existed projects  */}
        <div className="">
          {userPortfolioState && userPortfolioState.length > 0 ? (
            <div className="grid gap-6">
              {userPortfolioState.map((item) => {
                return (
                  <div
                  key={item?._id}>
                    <div
                      key={item?._id}
                      className="rounded-lg bg-rd-300 grid gap-4 relative px-12 py-6 shadow-[rgba(0,_0,_0,_0.24)_-1px_3px_8px]"
                    >
                      {!isUpdate && (
                        <div className="absolute top-2 right-2 flex gap-3">
                          <button
                            disabled={isLoading}
                            onClick={() => {
                              setTitle(item?.title);
                              setUpdateDocId(item?._id);
                              setDesc(item?.desc);
                              setStartDate(() => {
                                return item?.start.split("T")[0];
                              });
                              setEndDate(() => {
                                return item?.end.split("T")[0];
                              });
                              setIsUpdate(true);
                              router.push('#form');
                            }}
                            className="disabled:opacity-60 disabled:cursor-wait"
                          >
                            <PenSquare size={20} color="#595959" />
                          </button>
                          <button
                            disabled={isLoading}
                            onClick={() => {
                              handleDeleteProject(item?._id);
                            }}
                            className="disabled:opacity-60 disabled:cursor-wait"
                          >
                            <MinusCircle className="stroke-red-500" />
                          </button>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        {/* <h2 className="font-semibold text-dark-grey">Title:</h2> */}
                        <h1 className="text-xl font-medium tracking-wide">{item?.title}</h1>
                      </div>
                      <div className="flex items-start gap-2">
                        {/* <h2 className="font-semibold text-dark-grey">
                        Description:
                      </h2> */}
                        <h1 className="tracking-wide leading-8">
                          {item?.desc}
                        </h1>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <h2 className="font-semibold text-dark-grey">
                            Start Date:
                          </h2>
                          <h1 className="font-bol">
                            {`${new Date(item?.start).getUTCDate()}-${new Date(
                              item?.start
                            ).toLocaleString("default", {
                              month: "short",
                            })}-${new Date(item?.start).getUTCFullYear()}`}
                          </h1>
                        </div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-semibold text-dark-grey">
                            End Date:
                          </h2>
                          <h1 className="font-bol">
                            {`${new Date(item?.end).getUTCDate()}-${new Date(
                              item?.end
                            ).toLocaleString("default", {
                              month: "short",
                            })}-${new Date(item?.end).getUTCFullYear()}`}
                          </h1>
                        </div>
                      </div>
                      {item?.photos.length > 0 && (
                        <div>
                          <h1 className="font-semibold text-dark-grey">
                            Images
                          </h1>
                          <div className="flex gap-3 shadow-sm my-4 items-center justify-center">
                            {item?.photos.map((pic, index) => (
                              <Image
                                key={index}
                                width={200}
                                height={200}
                                className="rounded-xl aspect-video cursor-pointer"
                                src={"/media/" + pic}
                                alt={`Image ${index + 1}`}
                                onClick={() => {
                                  viewImage(`/media/${pic}`);
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      {item?.videos.length > 0 && (
                        <div>
                          <h1 className="font-semibold text-dark-grey">
                            Video
                          </h1>
                          <div className="flex gap-3 shadow-sm my-4 justify-center items-center">
                            {item?.videos.map((video, index) => (
                              <video
                                key={index}
                                width={200}
                                height={200}
                                className="rounded-xl aspect-video"
                                controls
                              >
                                <source
                                  src={"/media/" + video}
                                  type="video/mp4"
                                />
                              </video>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              {/* <Loader2Icon className="animate-spin" /> */}
              <h1>
                {isAdd
                  ? "No project has added yet."
                  : "Click plus button to add project."}
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Portfolio), { ssr: false });
