"use client";
import {
  Loader2Icon,
  MinusCircle,
  PenSquare,
  PlusCircle,
  PlusIcon,
  X,
  XCircle,
} from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Education({ userEducation = [] }) {
  const [userEducationState, setUserEducationState] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateDocId, setUpdateDocId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const [degree, setDegree] = useState("");
  const [institute, setInstitute] = useState("");
  const [field, setField] = useState("");
  const [desc, setDesc] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setUserEducationState(userEducation);
  }, [userEducation]);

  async function handleDeleteEdu(id) {
    if(window.confirm('Do you want to remove this education?'))
    setUserEducationState((oldEdu) => {
      let array = [];
      oldEdu.map((item) => {
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

    fetch(`/api/users/education/deleteEducation?id=${id}`, requestOptions)
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
      handleAddEducation();
    } else if (isUpdate) {
      handleUpdateEducation();
    }
  };

  async function handleAddEducation() {
    setIsLoading(true);
    const body = {
      degree: degree,
      institute: institute,
      field: field,
      desc: desc,
      startDate: startDate,
      endDate: endDate,
      isCompleted: isCompleted ? "yes" : "no",
    };
    setUserEducationState((oldSkills) => [
      ...oldSkills,
      { ...body, _id: startDate },
    ]);

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      redirect: "follow",
      body: JSON.stringify(body),
    };
    fetch(`/api/users/education/addEducation`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
        } else {
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
    setDegree("");
    setDesc("");
    setStartDate("");
    setEndDate("");
    setIsCompleted(false);
    setInstitute("");
    setField("");
    setUpdateDocId("");
    setIsUpdate(false);
    setIsAdd(false);
    setIsLoading(false);
  }

  async function handleUpdateEducation() {
    setIsLoading(true);
    const body = {
      _id: updateDocId,
      degree: degree,
      institute: institute,
      field: field,
      desc: desc,
      startDate: startDate,
      endDate: endDate,
      isCompleted: isCompleted ? "yes" : "no",
    };

    let array = [];
    userEducationState.map((item) => {
      if (item?._id == updateDocId) {
        array.push({
          ...body,
          isCompleted: body?.isCompleted == "yes" ? true : false,
        });
        return;
      }
      array.push(item);
    });
    setUserEducationState(array);

    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      redirect: "follow",
      body: JSON.stringify(body),
    };
    fetch(`/api/users/education/updateEducation`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
        } else {
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
    setDegree("");
    setDesc("");
    setStartDate("");
    setEndDate("");
    setIsCompleted(false);
    setInstitute("");
    setField("");
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

        <h1 className="text-2xl font-bold ml-6">Education</h1>
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
                  setDegree("");
                  setDesc("");
                  setStartDate("");
                  setEndDate("");
                  setIsCompleted(false);
                  setInstitute("");
                  setField("");
                  setUpdateDocId("");
                  setIsUpdate(false);
                  setIsAdd(false);
                }}
              >
                <XCircle className="stroke-red-500" />
              </button>

              <div>
                <label className="labelTag" htmlFor="degree">
                  Degree:
                </label>
                <input
                  className="inputTag w-full"
                  type="text"
                  id="degree"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="labelTag" htmlFor="institute">
                  Institute:
                </label>
                <input
                  className="inputTag w-full"
                  type="text"
                  id="institute"
                  value={institute}
                  onChange={(e) => setInstitute(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="labelTag" htmlFor="field">
                  Field:
                </label>
                <input
                  className="inputTag w-full"
                  type="text"
                  id="field"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
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

              <div className={`${isCompleted ? "opacity-100" : "opacity-50"}`}>
                <label className="labelTag" htmlFor="endDate">
                  End Date:
                </label>
                <input
                  disabled={!isCompleted}
                  className="inputTag w-full disabled:cursor-not-allowed"
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <label className="labelTag" htmlFor="isCompleted">
                  Completed:
                </label>
                <input
                  className="inputTag scale-150"
                  type="checkbox"
                  id="isCompleted"
                  checked={isCompleted}
                  onChange={(e) => setIsCompleted(e.target.checked)}
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
        <div className="">
          {userEducationState && userEducationState.length > 0 ? (
            <div className="grid gap-6">
              {userEducationState.map((item) => {
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
                            setDegree(item?.degree);
                            setIsCompleted(item?.isCompleted);
                            setInstitute(item?.institute);
                            setField(item?.field);
                            setUpdateDocId(item?._id);
                            setDesc(item?.desc);
                            setStartDate(() => {
                              return item?.startDate.split("T")[0];
                            });
                            setEndDate(() => {
                              return item?.endDate.split("T")[0];
                            });
                            setIsUpdate(true);
                          }}
                          className="disabled:opacity-60 disabled:cursor-wait"
                        >
                          <PenSquare size={20} color="#595959" />
                        </button>
                        <button
                          disabled={isLoading}
                          onClick={() => {
                            handleDeleteEdu(item?._id);
                          }}
                          className="disabled:opacity-60 disabled:cursor-wait"
                        >
                          <MinusCircle className="stroke-red-500" />
                        </button>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-dark-grey">Degree:</h2>
                      <h1 className=" text-lg ">{item?.degree}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-dark-grey">
                        Institute:
                      </h2>
                      <h1 className=" text-lg ">{item?.institute}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-dark-grey">Field:</h2>
                        <h1 className=" text-lg ">{item?.field}</h1>
                      </div>
                    <div className="flex items-center gap-2">
                      
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-dark-grey">
                          Start Date:
                        </h2>
                        <h1 className=" text-lg ">
                          {`${new Date(
                            item?.startDate
                          ).getUTCDate()}-${new Date(
                            item?.startDate
                          ).toLocaleString("default", {
                            month: "short",
                          })}-${new Date(item?.startDate).getUTCFullYear()}`}
                        </h1>
                      </div>
                      {item?.isCompleted ? (
                        <div className="flex items-center gap-2">
                          <h2 className="font-semibold text-dark-grey">
                            End Date:
                          </h2>
                          <h1 className=" text-lg ">
                            {`${new Date(
                              item?.endDate
                            ).getUTCDate()}-${new Date(
                              item?.endDate
                            ).toLocaleString("default", {
                              month: "short",
                            })}-${new Date(item?.endDate).getUTCFullYear()}`}
                          </h1>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <h2 className="font-semibold text-dark-grey">
                            End Date:
                          </h2>
                          <h2 className="">Not yet completed.</h2>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-dark-grey">
                        Description:
                      </h2>
                      <h1 className=" text-md ">{item?.desc}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              Click plus button to education.
              {/* <Loader2Icon className="animate-spin" /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Education), { ssr: false });
