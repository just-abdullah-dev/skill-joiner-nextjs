import Gradient from "@/components/BG/Gradient";
import OTPVerification from "@/components/Register/OTPVerification";
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

