import Gradient from "@/components/GradientBG/Gradient";
import Login from "@/components/Auth/User/Login/Login";
import React from "react";

export default function page() {
  return (

      <Gradient>
        <div className="py-4 px-12">
          <a href="/" className="font-bold text-3xl tracking-wider">Skill Joiner</a>
        </div>
        <Login />
      </Gradient>
  );
}
