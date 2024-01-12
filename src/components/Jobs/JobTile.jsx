import getTimeAgoString from "@/utils/getTimeAgo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function JobTile({ job }) {
  const router = useRouter();
  const shortTitle = (title) => {
    const maxLength = 100;
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`;
    } else {
      return title;
    }
  };
  const shortDesc = (title) => {
    const maxLength = 400;
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`;
    } else {
      return title;
    }
  };

  const getTimeForJob = (t)=>{
    const time = parseInt(t,10);
    if(time > 0 && time < 30){
      return `Within ${t} ${t == 1? 'day':'days'}`;
    }else if(time >= 30 && time < 60){
      const month = parseInt(time/30,10);
      return `Within ${month} ${t == 1? 'month':'months'}`;
    }
  }

  return (
    <div key={job?.key} className="relative shadow-[0px_0px_25px_12px_#00000024] bg-white rounded-3xl">
      <div className="grid gap-2 py-6 px-8">
        <p className=" text-sm text-dark-grey">
          {getTimeAgoString(job?.updatedAt)}
        </p>
        {/* Title, description  */}
        <div className="grid gap-4 mb-4  cursor-pointer" onClick={() => {
              router.push(`/jobs/${job?._id}`);
            }}>
          <h1
            className=" tracking-wide text-xl font-semibold"
          >
            {shortTitle(job?.title)}
          </h1>
          <p>{shortDesc(job?.desc)}</p>
        </div>
        {/* Category & Skills  */}
        <div className="grid gap-6">
          {job?.profession[0] &&  
          <p className="labelTag">Category: <span className=" ml-4 text-base font-semibold text-secondary">{job?.profession[0]?.name}</span></p>}
          {job?.skills[0] && (
            <div className="flex gap-6 items-center">
            <p className="labelTag">Skills: </p>
            <div className="flex flex-wrap items-center gap-6">
              {job?.skills.map((item) => {
                return (<div
                  key={item?._id}
                  className=" rounded-lg w-fit px-2 py-1 bg-primary text-white"
                >
                  {item?.name}
                </div>);
              })}
            </div></div>
          )}
        </div>
        {/* user data and time budget  */}
        <div className="flex justify-between w-full items-center">
          {/* user data   */}
        <div
          className=" flex items-center gap-4 w-fit z-10 cursor-pointer"
          onClick={() => {
            router.push(`/users/${job?.user[0]?.username}`);
          }}
        >
          <Image
            className=" rounded-full aspect-square"
            height={34}
            width={34}
            src={`/media${job?.user[0]?.avatar}`}
            alt="DP"
          />
          <h1 className="font-semibold">{job?.user[0]?.name}</h1>
        </div>
        {/* time budget  */}
        <div className="flex items-center justify-end gap-4 text-sm font-semibold">
          <p>Time: {getTimeForJob(job?.time)}</p>
          <p>Budget: {job?.budget} PKR</p>
        </div>
        </div>
      </div>
    </div>
  );
}
