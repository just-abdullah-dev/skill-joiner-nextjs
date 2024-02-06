"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function ChatPageSkeleton({ children, type }) {
  const { userInfo } = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      router.push(`/`);
      toast.error("Login to access the page.");
    }
  }, [userInfo]);
  const linkOptions = [
    { name: "Abdullah", path: "abdullah" },
    { name: "Abbas", path: "abbas" },
    { name: "Zaighum", path: "zaighum" },
    { name: "Qasim", path: "qasim" },
  ];

  return (
    <>
      <div className=" bg-white h-[50px] w-full"></div>
      <div className=" w-full flex items-start">
        <div className="  w-[20%] h-screen">
          <div className=" flex items-start flex-col gap-2 w-[20%] fixed bg-white h-[50%]">
            {linkOptions.map((item) => {
              return (
                <Link
                  key={item?.path}
                  className={`${
                    type == item?.path ? " bg-secondary" : " bg-primary"
                  } px-4 py-2 flex items-center justify-start w-full hover:bg-opacity-80 duration-300 shadow-md text-white text-lg`}
                  href={`/messages/${item?.path}`}
                >
                  <div className=" flex items-center gap-6">
                    <Image
                    className=" aspect-square rounded-full"
                    height={50}
                    width={50}
                    src={'/sample.jpg'}
                    alt="DP"
                    />
                    {item?.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className=" w-[80%]">{children}</div>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(ChatPageSkeleton), { ssr: false });
