import React from "react";

export default function Gradient({ children }) {
  return (
    <>
      <div className="relative">
      <div className="absolute flex justify-around items-center h-fit w-full">
        <div className="blob w-[800px] h-[800px] rounded-[999px] absolute top-0 right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200"></div>
        <div className="blob w-[300px] h-[300px] rounded-[999px] absolute bottom-[-10px] left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-br from-green-100 via-cyan-200 to-blue-300"></div>
        {/* <div class="blob w-[600px] h-[600px] rounded-[999px] absolute bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-br from-slate-100 via-teal-100 to-indigo-100"></div>
        <div class="blob w-[1000px] h-[1000px] rounded-[999px] absolute bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-br from-red-200 via-gray-100 to-blue-100"></div> */}
      </div>
      </div>
      {children}
    </>
  );
}
