import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProjectsTile({ project }) {
  const router = useRouter();
  const shortTitle = (title) => {
    const maxLength = 60;
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`;
    } else {
      return title;
    }
  };

  return (
    <div className="relative shadow-[0px_0px_25px_12px_#00000024] bg-white rounded-3xl">
      <div className="grid gap-4">
        {/* Thumbnail  */}
        <div
          className=" overflow-hidden w-full cursor-pointer"
          onClick={() => {
            router.push(`/projects/${project?._id}`);
          }}
        >
          {project?.videos[0] ? (
            <video
              controls
              height={200}
              width={350}
              alt="Thumbnail"
              className="aspect-video rounded-t-3xl"
            >
              <source src={"/media/" + project?.videos[0]} type="video/mp4" />
            </video>
          ) : (
            <Image
              height={200}
              width={350}
              alt="Thumbnail"
              className="aspect-video rounded-t-3xl"
              src={
                project?.photos[0]
                  ? `/media/${project?.photos[0]}`
                  : "/sample.jpg"
              }
            />
          )}
        </div>
        {/* user data  */}
        <div
          className=" flex items-center gap-4 px-4 w-fit z-10 cursor-pointer"
          onClick={() => {
            router.push(`/talent/${project?.user[0]?.username}`);
          }}
        >
          <Image
            className=" rounded-full aspect-square"
            height={34}
            width={34}
            src={`/media${project?.user[0]?.avatar}`}
            alt="DP"
          />
          <h1 className="font-semibold">{project?.user[0]?.name}</h1>
        </div>

        {/* title  */}
        <div className="grid gap-4 px-4 mb-4">
          {/* Title  */}
          <h1
            className=" tracking-wide cursor-pointer"
            onClick={() => {
              router.push(`/projects/${project?._id}`);
            }}
          >
            {shortTitle(project?.title)}
          </h1>
        </div>
      </div>
    </div>
  );
}
