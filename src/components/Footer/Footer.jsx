import React from "react";

export default function Footer() {
  return (
    <footer className="text-gray-400 bg-secondary">
      <div className=" flex justify-around">
        {/* logo navigation links etc  */}
        <div className="">
          <div>
            {/* <Image width={100} height={100} src='/../../assets/logo.png'></Image> */}
            <h1 className="text-2xl font-bold text-primary">Skill Joiner</h1>
          </div>
          <ul className="tracking-wider m-1">
            <li className="">
              <a href="">Home</a>
            </li>
            <li className="">
              <a href="/services">Services</a>
            </li>
            <li className="">
              <a href="/jobs">Jobs</a>
            </li>
            <li className="">
              <a href="/talent">Talent</a>
            </li>
            <li className="">
              <a href="/about">About</a>
            </li>
          </ul>
        </div>

        {/* terms & conditions links etc  */}
        <div></div>

        {/* Social media links etc  */}
        <div>
          <ul className="tracking-wider">
            <li className="">
              <a href="">Facebook</a>
            </li>
            <li className="">
              <a href="/Instagram">Instagram</a>
            </li>
            <li className="">
              <a href="/jobs">X</a>
            </li>
            <li className="">
              <a href="/talent">Twitch</a>
            </li>
            <li className="">
              <a href="/about"></a>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center">All rights are reserved. &copy; Skill Joiner 2024</p>
    </footer>
  );
}
