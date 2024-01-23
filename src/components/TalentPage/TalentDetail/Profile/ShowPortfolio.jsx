"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

function ShowPortfolio({ portfolio = [] }) {
  
  return (
    <div className="flex items-center justify-center">
      <div
        className={`relative flex flex-col flex-wrap justify-between gap-6 bg-white p-10 w-full rounded-3xl shadow-[-6px_-1px_25px_5px_#00000024]`}
      >

        <h1 className="text-2xl font-bold ml-6">Portfolio</h1>
        <hr />

        {/* Display existed projects  */}
        <div className="">
          {portfolio && portfolio.length > 0 && (
            <div className="grid gap-6">
              {portfolio.map((item) => {
                return (
                  <div
                  key={item?._id}>
                    <div
                      key={item?._id}
                      className="rounded-lg bg-rd-300 grid gap-4 relative px-12 py-6 shadow-[rgba(0,_0,_0,_0.24)_-1px_3px_8px]"
                    >
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
          )}
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(ShowPortfolio), { ssr: false });
