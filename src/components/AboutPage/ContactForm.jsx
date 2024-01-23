"use client";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    setIsLoading(true);
    toast.success('Message has been sent!');
    // var requestOptions = {
    //   method: "POST",
    //   redirect: "follow",
    //   body: JSON.stringify({ email }),
    // };
    // await fetch(`/api/superAdmin/newsletter/create`, requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if (result?.success) {
    //       toast.success(result?.message);
    //     } else {
    //       toast.error(result?.message);
    //     }
    //   })
    //   .catch((error) => console.log("error", error));
    setIsLoading(false);
    setEmail('');
    setMsg('');
    setName('');
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-2xl">
      <div className="bg-white px-20 flex flex-col items-start gap-6 justify-center">
        <div className="grid gap-2">
          <h1 className=" text-4xl font-bold">
            <span className=" text-primary">Contact Us</span>
          </h1>
          <p className="text-dark-grey text-sm font-semibold">
          Have questions, suggestions, or just want to say hello? We'd love to
          hear from you!
          </p>
        </div>
        {/* input div  */}
        <div className=" w-full px-10 grid gap-8">
          <input
            required
            type="text"
            placeholder="Your Name"
            className="inputTag w-full"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            required
            type="email"
            placeholder="Your Email"
            className="inputTag w-full"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <textarea
            type="text"
            placeholder="Your Message"
            className="inputTag w-full"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <button
            className="actionButtonTag w-full"
            onClick={handleSubmit}
            type="submit"
          >
            {isLoading ? "Loading..." : "Contact"}
          </button>
        </div>
      </div>
      <div className=" mx-auto">
        <Image
          src={"/contact.jpg"}
          height={500}
          width={500}
          className="aspect-auto"
          alt="Contact image"
        />
      </div>
      
    </div>
  );
}
