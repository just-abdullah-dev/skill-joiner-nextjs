"use client";
import { userActions } from "@/store/reducers/userReducer";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const router = useRouter();
  const {userInfo} = useSelector(state=>state.user);
  const [showPassword, setShowPassowrd] = useState(false);
  const [isValidData, setIsValidData] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [email, setEmail] = useState({
    value: "",
    error: "",
  });
  const [password, setPassword] = useState({
    value: "",
    error: "",
  });

  const handleChangeEmail = (e) => {
    const EMAIL = e.target.value;
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (pattern.test(EMAIL)) {
      setEmail(() => {
        return { value: EMAIL, error: "" };
      });
      if (!isValidData && !email.error && !password.error) {
        setIsValidData(true);
      }
    } else {
      setEmail(() => {
        return { value: EMAIL, error: "Enter a valid email." };
      });
      if (isValidData) {
        setIsValidData(false);
      }
    }
  };

  function handleChangePassword(e) {
    const password = e.target.value;
    if (password.length < 6) {
      setPassword(() => {
        return {
          value: password,
          error: "Password must have atleast 6 characters.",
        };
      });
      if (isValidData) {
        setIsValidData(false);
      }
    } else {
      setPassword(() => {
        return { value: password, error: "" };
      });
      if (!isValidData && !email.error && !password.error) {
        setIsValidData(true);
      }
    }
  }

  useEffect(()=>{
    if(!userInfo?.success){
      toast('Already logged in!', {
        icon: '🔓',
      });
      router.push('/');
    }
  },[])

  async function handleFormSubmit() {
    setIsLoading(true);
    const url = `/api/superAdmin/login`;
    const body = {
      email: email.value.toLowerCase(),
      password: password.value,
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
    if (data?.success) {
      // dispatch(userActions.setUserInfo(data));
      localStorage.setItem('admin',JSON.stringify(data));
      toast('Logged in successfully!', {
        icon: '🔓',
      });
      router.push('/superadmin/code/dashboard');
    } else {
      toast.error(data?.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="mx-24 my-16">
      <div className="grid grid-cols-2">
        <div className="font-bold text-5xl leadin mt-16 ">
        <h1 className="">
          Super <span className="text-primary">Admin</span> Signin
        </h1>
          <br />
          <h1>
            Welcome back to <span className="text-primary">Skill-Joiner</span>
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="grid gap-8 w-[500px] rounded-2xl px-14 pt-4 pb-8 bg-white">
            <h1 className="text-3xl tracking-wide leading-loose font-bold text-center">
              Sign In
            </h1>
            <div>
              <input
                onChange={(e) => {
                  handleChangeEmail(e);
                }}
                value={email.value}
                className="inputTag w-full"
                type="email"
                placeholder="Your Email"
              />
              {email?.error && (
                <p className="mt-1 text-xs text-red-500">{email.error}</p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  value={password.value}
                  onChange={(e) => {
                    handleChangePassword(e);
                  }}
                  className="inputTag w-full"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your Password"
                />
                {showPassword ? (
                  <button
                    className="absolute right-6 bottom-3 cursor-pointer"
                    onClick={() => setShowPassowrd(false)}
                  >
                    <Eye />
                  </button>
                ) : (
                  <button
                    className="absolute right-6 bottom-3 cursor-pointer"
                    onClick={() => setShowPassowrd(true)}
                  >
                    <EyeOff />
                  </button>
                )}
              </div>
              {password?.error && (
                <p className="mt-1 text-xs text-red-500">{password.error}</p>
              )}
            </div>
            <button
              disabled={!isValidData || isLoading || !email.value || !password.value}
              onClick={handleFormSubmit}
              className="p-3 rounded-lg bg-primary text-white hover:bg-primary_dark disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ?
              <Loader2Icon className='animate-spin' />:
              'Sign In' }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
