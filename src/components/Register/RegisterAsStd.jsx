"use client";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterAsStd() {
  const router = useRouter();
  const [showPassword, setShowPassowrd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState({
    value: "",
    error: "",
  });
  const [email, setEmail] = useState({
    value: "",
    error: "",
  });
  const [password, setPassword] = useState({
    value: "",
    error: "",
  });
  const [isValidData, setIsValidData] = useState(false);

  const handleChangeEmail = (e) => {
    const EMAIL = e.target.value;
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (pattern.test(EMAIL)) {
      setEmail(() => {
        return { value: EMAIL, error: "" };
      });
      if (!isValidData && !name.error && !email.error && !password.error) {
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
  function handleChangeName(e) {
    const name = e.target.value;
    if (name.length < 2) {
      setName(() => {
        return { value: name, error: "Name must have atleast 2 characters." };
      });
      if (isValidData) {
        setIsValidData(false);
      }
    } else {
      setName(() => {
        return { value: name, error: "" };
      });
      if (!isValidData && !name.error && !email.error && !password.error) {
        setIsValidData(true);
      }
    }
  }

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
      if (!isValidData && !name.error && !email.error && !password.error) {
        setIsValidData(true);
      }
    }
  }

  async function handleFormSubmit() {
    setIsLoading(true);
    let username = email.value.split("@")[0];
    const url = `/api/users/registerAsStd`;
    const body = {
      email: email.value,
      name: name.value,
      password: password.value,
      username,
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
      router.push(`/register/verify?email=${email.value}&name=${name.value}`);
    } else {
      toast.error(data?.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="mx-24 my-16">
      <div className="grid grid-cols-2">
        <div className="font-bold text-5xl tracking-wider mt-16 ">
        <h1 className=''><span className='text-primary'>Join us</span> and find exciting <span className='text-primary'>opportunities</span> ahead.</h1><br/>
          <h1>
            Welcome to <span className="text-primary">Skill Joiner</span>
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="grid gap-8 w-[500px] rounded-2xl px-14 pt-4 pb-8 bg-white">
            <h1 className="text-3xl tracking-wide leading-loose font-bold text-center">
              Sign Up
            </h1>
            <div>
              <input
                onChange={(e) => {
                  handleChangeName(e);
                }}
                value={name.value}
                className="block p-3 outline-none rounded-lg bg-light-soft w-full"
                type="text"
                placeholder="Your Full Name..."
              />
              {name?.error && (
                <p className="mt-1 text-xs text-red-500">{name.error}</p>
              )}
            </div>
            <div>
              <input
                onChange={(e) => {
                  handleChangeEmail(e);
                }}
                value={email.value}
                className="block p-3 outline-none rounded-lg bg-light-soft w-full"
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
                  className="block p-3 outline-none rounded-lg bg-light-soft w-full"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Strong Password"
                />
                {showPassword ? (
                  <button
                    className="absolute right-6 bottom-3"
                    onClick={() => setShowPassowrd(false)}
                  >
                    <Eye />
                  </button>
                ) : (
                  <button
                    className="absolute right-6 bottom-3"
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
              disabled={!isValidData || isLoading}
              onClick={handleFormSubmit}
              className="p-3 rounded-lg bg-primary text-white hover:bg-primary_dark disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ?
              <Loader2Icon className='animate-spin' />:
              'Sign Up' }
            </button>
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
    </div>
  );
}
