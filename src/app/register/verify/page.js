import Gradient from "@/components/GradientBG/Gradient";
import OTPVerification from "@/components/Auth/User/Register/OTPVerification";
import React from "react";

export default function page({searchParams}) {
  return (
      <Gradient>
        <div className="py-4 px-12">
          <a href="/" className="font-bold text-3xl tracking-wider">Skill Joiner</a>
        </div>
        <OTPVerification email={searchParams.email} name={searchParams.name} />
      </Gradient>
  );
}

