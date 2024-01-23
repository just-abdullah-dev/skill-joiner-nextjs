"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Loader2Icon } from "lucide-react";
import DisplayEducation from "./Profile/DisplayEducation";
import DisplayServices from "./Profile/DisplayServices";
import ShowPortfolio from "./Profile/ShowPortfolio";
import ShareOnMedia from "@/components/utils/ShareOnMedia";

export default function DisplayTalent({ username }) {
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getProfile() {
      const body = {
        username: username,
      };
      var requestOptions = {
        method: "POST",
        body: JSON.stringify(body),
      };

      fetch("/api/users/getProfile", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.success) {
            setUser(() => result?.data);
          } else {
            toast.error(result?.message);
          }
        })
        .catch((error) => console.log("error", error));
    }
    getProfile();
  }, [userInfo, username]);

  return (
    <div className="flex flex-col items-start gap-6 relative mt-32 w-full">
      {user ? (
        <div className=" grid gap-10 w-full">
          <div className=" top-20 right-8 fixed z-50">
            <ShareOnMedia
              showHeading={false}
              css={"grid grid-cols-1 gap-8"}
              URL={`https://skilljoiner.com/talent/${username}`}
            />
          </div>
          <div className=" top-32 right-32 fixed z-50">
            <button
            disabled={userInfo?._id == user?._id || !userInfo}
            onClick={()=>{
              router.push(`/requests/add/${user?._id}`);
            }}
            className=" py-2 bg-primary hover:bg-white border-white rounded-xl w-[120px] text-lg disabled:cursor-not-allowed disabled:opacity-70 text-white border hover:border-primary hover:text-primary">
              Request
            </button>
          </div>
          {/* show profile normal data over here  */}
          <div className=" flex items-center gap-8">
            <Image
              height={200}
              width={200}
              alt="Profile Picture"
              className=" aspect-square rounded-full shadow-lg"
              src={user?.avatar ? `/media${user?.avatar}` : "/sample.jpg"}
            />
            <div className=" grid gap-3">
              <div className=" flex flex-col items-start gap-2">
                <h1 className=" text-xl font-semibld">{user?.name}</h1>
                <p>@{user?.username}</p>
              </div>
              <h1 className=" text-lg">{user?.bio}</h1>
            </div>
          </div>
          <p className=" text-base leading-8">{user?.about}</p>
          {/* country profession and skills  */}
          <div className=" grid gap-4">
            <h1 className=" text-lg flex gap-4">
              <span className=" text-dark-grey">Country:</span>
              {user?.country}
            </h1>
            <h1 className=" text-lg flex gap-4">
              <span className=" text-dark-grey">Profession:</span>
              {user?.profession?.name}
            </h1>
            <div className=" flex items-center flex-wrap gap-4">
              <span className=" text-dark-grey text-lg py-2">Skills:</span>
              {user?.skills[0] &&
                user?.skills.map((item) => {
                  return (
                    <div
                      key={item?.name}
                      className=" rounded-lg w-fit px-2 py-1 bg-primary text-white"
                    >
                      {item?.name}
                    </div>
                  );
                })}
            </div>
          </div>
          {/* services and portflio  */}
          {user?.student && (
            <>
              {user?.services.length > 0 && (
                <DisplayServices services={user?.services} />
              )}
              {user?.portfolio.length > 0 && (
                <ShowPortfolio portfolio={user?.portfolio} />
              )}
            </>
          )}
          {/* education  */}
          {user?.education.length > 0 && (
            <DisplayEducation educations={user?.education} />
          )}
        </div>
      ) : (
        <div className=" flex items-center justify-center w-full h-[300px]">
          <Loader2Icon size={48} className="animate-spin" />
        </div>
      )}
    </div>
  );
}
