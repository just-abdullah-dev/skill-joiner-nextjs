"use client";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    setIsLoading(true);
    var requestOptions = {
      method: "POST",
      redirect: "follow",
      body: JSON.stringify({ email }),
    };
    await fetch(`/api/superAdmin/newsletter/create`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
        } else {
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
    setIsLoading(false);
    setEmail('');
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-2xl">
      <div>
        <Image
          src={"/newsletter.png"}
          height={600}
          width={600}
          className="aspect-auto"
          alt="Newsletter illustration image"
        />
      </div>
      <div className="bg-white px-20 flex flex-col items-start gap-6 justify-center">
        <div className="grid gap-2">
          <h1 className=" text-4xl font-bold">
            <span className=" text-primary">Subscribe</span> to our Newsletter!
          </h1>
          <p className="text-dark-grey font-semibold">
            Get ahead with our newsletter – your source for insider updates.
          </p>
        </div>
        {/* input div  */}
        <div className=" w-full px-10 grid gap-8">
          <input
            type="email"
            placeholder="Your Email"
            className="inputTag w-full"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button
            className="actionButtonTag w-full"
            onClick={handleSubmit}
            type="submit"
          >
            {isLoading ? "Loading..." : "Subscribe"}
          </button>
        </div>
      </div>
    </div>
  );
}
