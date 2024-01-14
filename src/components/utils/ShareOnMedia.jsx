'use client';
import { Twitter, Facebook, Instagram, Copy, Linkedin, LinkIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ShareOnMedia({URL}) {
    const [url,setUrl] = useState('');
    useEffect(()=>{
        const set = ()=>{
            setUrl(URL);
        }
        set();
    },[URL,setUrl]);

  function copyToClipboard() {
    const textarea = document.createElement("textarea");
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    toast.success("Copied to clipboard!");
  }

  let socialMediaIcons = [
    {
      icon: <Twitter />,
      url: `https://twitter.com/share?url=${encodeURIComponent(url)}`,
    },
    {
      icon: <Facebook />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    },
    {
      icon: <Instagram />,
      url: `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
    },
    {
      icon: <Linkedin />,
      url: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
        url
      )}`,
    },
  ];
  return (
    <div className=" bg-white rounded-2xl px-2 py-8 grid gap-8">
      <h1 className="text-3xl font-bold">Share on</h1>
        <div className="grid gap-8 grid-cols-2 md:grid-cols-5">
        <div className=" flex items-center justify-center">
        <LinkIcon
            onClick={copyToClipboard}
            className=" scale-125 cursor-pointer"
          />
        </div>
          {socialMediaIcons.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className=" flex items-center justify-center scale-125"
            >
              {item.icon}
            </Link>
          ))}
          
        </div>
    </div>
  );
}
