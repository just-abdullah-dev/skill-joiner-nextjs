"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";  
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ProfileData from "./ProfileData";
import CountryProfessionAndSkills from "./Profession&Skills";
import Education from "./Education";
import Portfolio from "./Portfolio";
import Services from "./Services";

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
      var requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
        redirect: "follow",
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
    <div className="flex flex-col items-center gap-6 my-32 relative">
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
        <div>Loading...</div>
      )}
    </div>
  );
}
