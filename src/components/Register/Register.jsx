"use client";
import React, { useState } from "react";
import RegisterAsStd from "./RegisterAsStd";
import RegisterAsClient from "./RegisterAsClient";

export default function Register() {
  const [btnText, setBtnText] = useState("");
  const [registerStd, setRegisterStd] = useState(false);
  const [registerClient, setRegisterClient] = useState(false);
  const option_1 = "Join as a Client";
  const option_2 = "Join as a Student";

  function handleJoinBtn(){
    if(btnText === option_1){
      setRegisterClient(true);
      setRegisterStd(false);
    }else if(btnText === option_2){
      setRegisterClient(false);
      setRegisterStd(true);
    }
  }
  return (
    <>
    {registerStd && <RegisterAsStd />}
    {registerClient && <RegisterAsClient />}
    {!registerClient && !registerStd &&
    <div className="mx-24 my-16">
    <div className="grid grid-cols-2">
      <div className="font-bold text-5xl tracking-wider mt-16 ">
        <h1 className="">
          Empower your <span className="text-primary">skills</span>, embraced
          the <span className="text-primary">community</span>.
        </h1>
        <br />
        <h1>
          Welcome to <span className="text-primary">Skill Joiner</span>
        </h1>
      </div>
      <div className="flex justify-center items-center mt-10">
        <div className="grid gap-8 w-[500px] rounded-2xl px-14 py-4 pb-6 bg-white">
          <h1 className="text-3xl tracking-wide font-bold text-center">
            Join Us!
          </h1>
          <div className="flex gap-4 items-center justify-around">
            <label
              className={`${
                btnText === option_1
                  ? "border-green-500 text-green-500"
                  : "border-secondary"
              } p-4 border-2 rounded-xl cursor-pointer`}
            >
              <input
                className="absolute opacity-0"
                type="radio"
                value={option_1}
                checked={btnText === option_1}
                onChange={() => setBtnText(option_1)}
              />
              {option_1}
            </label>
            <label
              className={`${
                btnText === option_2
                  ? "border-green-500 text-green-500"
                  : "border-secondary"
              } p-4 border-2 rounded-xl cursor-pointer`}
            >
              <input
                className="absolute opacity-0"
                type="radio"
                value={option_2}
                checked={btnText === option_2}
                onChange={() => setBtnText(option_2)}
              />
              {option_2}
            </label>
          </div>
          {btnText ? (
            <button 
            className="block p-3 rounded-lg bg-primary text-white hover:bg-primary_dark" 
            onClick={handleJoinBtn}
            >
              {btnText}
            </button>
          ) : (
            <button
              className="block p-6 rounded-lg bg-white text-white"
              disabled={true}
            ></button>
          )}
          <p className="text-sm font-semibold">
            Already have an account?
            <a
              href="/login"
              className="ml-4 text-primary font-semibold text-md"
            >
              Login Now
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>}
    
    </>
  );
}
