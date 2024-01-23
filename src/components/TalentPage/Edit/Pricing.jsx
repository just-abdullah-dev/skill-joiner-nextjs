"use client";
import {
  Loader2Icon,
  MinusCircle,
  PenSquare,
  PlusCircle,
  XCircle,
} from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
let isFirstRun = true;
function Pricing({ servicePackages = [], serviceId }) {
  const [packages, setPackages] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateDocId, setUpdateDocId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const set = ()=>{
      setPackages(servicePackages);
    }
    if(servicePackages[0] && isFirstRun){
      set();
      isFirstRun = false;
    }
  }, [servicePackages, isFirstRun]);

  async function handleDeletePkg(id) {
    if (window.confirm("Do you want to remove this package?"))
      setPackages((oldPkg) => {
        let array = [];
        oldPkg.map((item) => {
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

    fetch(`/api/users/services/packages/delete?id=${id}`, requestOptions)
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
      handleAddPkg();
    } else if (isUpdate) {
      handleUpdatePkg();
    }
  };

  async function handleAddPkg() {
    setIsLoading(true);
    const body = {
      serviceId: serviceId,
      title: title,
      price: price,
      time: time,
      desc: desc,
    };
    setPackages((oldPkg) => [...oldPkg, { ...body, _id: price }]);

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      redirect: "follow",
      body: JSON.stringify(body),
    };
    fetch(`/api/users/services/packages/add`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
        } else {
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
    setTime("");
    setDesc("");
    setTitle("");
    setPrice("");
    setUpdateDocId("");
    setIsUpdate(false);
    setIsAdd(false);
    setIsLoading(false);
  }

  async function handleUpdatePkg() {
    setIsLoading(true);
    const body = {
      _id: updateDocId,
      title: title,
      price: price,
      time: time,
      desc: desc,
    };

    let array = [];
    packages.map((item) => {
      if (item?._id == updateDocId) {
        array.push({
          ...body,
        });
        return;
      }
      array.push(item);
    });
    setPackages(array);

    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      redirect: "follow",
      body: JSON.stringify(body),
    };
    fetch(`/api/users/services/packages/update`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
        } else {
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
    setTime("");
    setDesc("");
    setTitle("");
    setPrice("");
    setUpdateDocId("");
    setIsUpdate(false);
    setIsAdd(false);
    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`relative flex flex-col flex-wrap justify-between gap-6 bg-white p-10 w-[800px] rounded-3xl shadow-[-6px_-1px_25px_5px_#00000024]`}
      >
        {/* edit btn  */}
        {packages.length < 3 && !isAdd && (
          <button
            className="absolute top-10 right-10 scale-110"
            onClick={() => {
              setIsAdd(true);
            }}
          >
            <PlusCircle className="stroke-primary" />
          </button>
        )}
        {packages.length == 3 && <p className=" text-sm text-dark-grey absolute top-10 right-10">Only 3 packages are allowed.</p>}

        <h1 className="text-2xl font-bold ml-6">Pricing</h1>
        <hr />
        {(isAdd || isUpdate) && (
          <div className="flex items-center justify-center relative pt-4">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 flex-wrap gap-8"
            >
              <button
                className="absolute top-0 right-8 scale-110"
                onClick={() => {
                  setTime("");
                  setDesc("");
                  setTitle("");
                  setPrice("");
                  setUpdateDocId("");
                  setIsUpdate(false);
                  setIsAdd(false);
                  setIsLoading(false);
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
                <input
                  className="inputTag w-full"
                  type="text"
                  id="desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="labelTag" htmlFor="price">
                  Price:
                </label>
                <input
                  className="inputTag w-full"
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="labelTag" htmlFor="time">
                  Time in days:
                </label>
                <input
                  className="inputTag w-full"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                ></input>
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
        <div className="">
          {packages && packages.length > 0 ? (
            <div className="grid gap-6">
              {packages.map((item) => {
                return (
                  <div
                    key={item?._id}
                    className="rounded-lg bg-rd-300 gap-4 tracking-wide relative px-12 py-6 shadow-[rgba(0,_0,_0,_0.24)_-1px_3px_8px]"
                  >
                    {!isUpdate && (
                      <div className="absolute top-2 right-2 flex gap-3">
                        <button
                          disabled={isLoading}
                          onClick={() => {
                            setTime(item?.time);
                            setDesc(item?.desc);
                            setTitle(item?.title);
                            setPrice(item?.price);
                            setUpdateDocId(item?._id);
                            setIsUpdate(true);
                          }}
                          className="disabled:opacity-60 disabled:cursor-wait"
                        >
                          <PenSquare size={20} color="#595959" />
                        </button>
                        <button
                          disabled={isLoading}
                          onClick={() => {
                            handleDeletePkg(item?._id);
                          }}
                          className="disabled:opacity-60 disabled:cursor-wait"
                        >
                          <MinusCircle className="stroke-red-500" />
                        </button>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-dark-grey">Title:</h2>
                      <h1 className=" text-lg ">{item?.title}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-dark-grey">
                        Description:
                      </h2>
                      <h1 className=" text-md ">{item?.desc}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-dark-grey">
                        Time:
                      </h2>
                      <h1 className=" text-lg ">{item?.time}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-dark-grey">Price:</h2>
                      <h1 className=" text-lg ">{item?.price} PKR</h1>
                    </div>
                  
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Loader2Icon className="animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Pricing), { ssr: false });
