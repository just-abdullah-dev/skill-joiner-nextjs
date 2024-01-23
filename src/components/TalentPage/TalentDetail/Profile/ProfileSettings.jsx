"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";  
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ProfileData from "./ProfileData";
import CountryProfessionAndSkills from "./Profession&Skills";
import Education from "./DisplayEducation";
import Portfolio from "./Portfolio";
import Services from "./Services";
import { Loader2Icon } from "lucide-react";

export default function ProfileSettings() {
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    if (!userInfo) {
      toast.error("You are not logged in.");
      router.push("/");
    }
    async function getProfile() {
      const body = {
        username: userInfo?.username
      }
      var requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
        body: JSON.stringify(body),
      };

      fetch("/api/users/getProfile", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.success) {
            setUserProfile(() => result?.data);
          } else {
            toast.error(result?.message);
          }
        })
        .catch((error) => console.log("error", error));
    }
    getProfile();
  }, [userInfo]);
  return (
    <div className="flex flex-col items-center gap-6 relative">
      {userProfile ? (
        <>
        <ProfileData />
        <CountryProfessionAndSkills profession={userProfile?.profession} skills={userProfile?.skills} country={userProfile?.country} />
        <Education userEducation={userProfile?.education} />
        {userInfo?.student &&
        <><Portfolio userPortfolio={userProfile?.portfolio} />
        <Services userServices={userProfile?.services} /></>}
        </>
      ) : (
        <div className=' flex items-center justify-center w-full h-[300px]'>
        
      <Loader2Icon size={48} className='animate-spin' />
      </div>
      )}
    </div>
  );
}
