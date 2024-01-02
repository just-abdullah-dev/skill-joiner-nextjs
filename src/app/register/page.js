import Gradient from "@/components/BG/Gradient";
import Register from "@/components/Register/Register";
import React from "react";

export default function page() {
  return (

      <Gradient>
        <div className="py-4 px-12">
          <a href="/" className="font-bold text-3xl tracking-wider">Skill Joiner</a>
        </div>
        <Register />
      </Gradient>
  );
}
