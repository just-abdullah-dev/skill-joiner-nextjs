"use client";
import { userActions } from "@/store/reducers/userReducer";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function OTPVerification({email, name}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [code, setCode] = useState({
    value: null,
    error: "",
  });
  const [isValidData, setIsValidData] = useState(false);

  function handleChangeCode(e) {
    const code = e.target.value;
    if (code.length < 6) {
      setCode(() => {
        return { value: code, error: "Code must have atleast 6 digits." };
      });
      if (isValidData) {
        setIsValidData(false);
      }
    } else {
      setCode(() => {
        return { value: code, error: "" };
      });
      if (!isValidData && !code.error) {
        setIsValidData(true);
      }
    }
  }

  async function handleFormSubmit() {
    setIsLoading(true);
    const url = `/api/users/verifyOtp`;
    const body = {
      email,
      otp:code.value,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
      toast.success('Email successfully verified.');
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('account',JSON.stringify(data));
      router.push(`/`);
    } else {
      toast.error(data?.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="mx-24 my-16">
      <div className="grid grid-cols-2">
        <div className="tracking-wider mt-16 ">
          <h1 className="font-bold text-5xl">
            Hey! <span className="text-primary">{name}</span>
          </h1>
          <br />
          <p className="">
            We have sent a verification code to {email}. 
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="grid gap-8 w-[500px] rounded-2xl px-14 pt-4 pb-8 bg-white">
            <h1 className="text-3xl tracking-wide leading-loose font-bold text-center">
              Email Verification
            </h1>
            <div>
              <input
                onChange={(e) => {
                  handleChangeCode(e);
                }}
                value={code.value}
                className="block p-3 outline-none rounded-lg bg-light-soft w-full"
                type="number"
                placeholder="Enter code e.g 000000"
              />
              {code?.error && (
                <p className="mt-1 text-xs text-red-500">{code.error}</p>
              )}
            </div>
            
            <button
              disabled={!isValidData || isLoading}
              onClick={handleFormSubmit}
              className="p-3 rounded-lg bg-primary text-white hover:bg-primary_dark disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ?
              <Loader2Icon className='animate-spin' />:
              'Verify' }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
