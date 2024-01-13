"use client";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getProjects } from "@/services/getProjects";
import ProjectsTile from "./ProjectsTile";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    const getAll = () => {
      getProjects({keyword:"",limit:4}, (data) => {
        setProjects(data);
      });
    };
    getAll();
  }, [setProjects]);

  return (
    <div className=" bg-white rounded-2xl p-6 grid gap-8">
      <h1 className="text-3xl font-bold">Recent Projects</h1>
      <div className={` grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-6`}>
        {projects[0] && (
          projects.map((item) => {
            return <ProjectsTile key={item?._id} project={item} />;
          })
        )}
      </div>
      {!projects[0] && 
      <div className=" flex items-center justify-center">
      <Loader2Icon className=" animate-spin" />
    </div>}
    </div>
  );
}
