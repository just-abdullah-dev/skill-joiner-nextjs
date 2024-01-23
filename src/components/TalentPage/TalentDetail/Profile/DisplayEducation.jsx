"use client";
import dynamic from "next/dynamic";
import React from "react";

function DisplayEducation({ educations = [] }) {
  return (
    <div
        className={`relative flex flex-col flex-wrap justify-between gap-6 bg-white p-10 rounded-3xl shadow-[-6px_-1px_25px_5px_#00000024] w-full`}
      >
        <h1 className="text-2xl font-bold ml-6">Education</h1>
        <hr />
        <div className="">
          {educations && educations.length > 0 && (
            <div className="grid gap-6">
              {educations.map((item) => {
                return (
                  <div
                    key={item?._id}
                    className="rounded-lg bg-rd-300 gap-4 tracking-wide relative px-12 py-6 shadow-[rgba(0,_0,_0,_0.24)_-1px_3px_8px] w-full"
                  >
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
          )}
        </div>
      </div>
  );
}

export default dynamic(() => Promise.resolve(DisplayEducation), { ssr: false });
