import { PenSquare, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function ServicesTile({
  service,
  showEditBtn = true,
  showUserData = false,
}) {
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
      {showEditBtn && (
        <div
          onClick={() => {
            router.push(`/services/edit/${service?._id}`);
          }}
          className="absolute top-2 right-2 z-10 cursor-pointer"
        >
          <PenSquare />
        </div>
      )}
      <div
        className="grid gap-4"
        
      >
        {/* Thumbnail  */}
        <div className=" overflow-hidden w-full cursor-pointer"
        onClick={() => {
            router.push(`/services/${service?._id}`);
          }}
        >
          <Image
            height={200}
            width={350}
            alt="Thumbnail"
            className="aspect-video rounded-t-3xl"
            src={
              service?.photos[0]
                ? `/media/${service?.photos[0]}`
                : "/sample.jpg"
            }
          />
        </div>
        {/* user data  */}
        {showUserData && (
          <div 
          className=" flex items-center gap-4 px-4 w-fit z-10 cursor-pointer"
          onClick={() => {
            router.push(`/talent/${service?.user[0]?.username}`);
          }}
          >
            <Image
              className=" rounded-full aspect-square"
              height={34}
              width={34}
              src={`/media${service?.user[0]?.avatar}`}
              alt="DP"
              
            />
            <h1 className="font-semibold">{service?.user[0]?.name}</h1>
          </div>
        )}
        {/* title, reviews, price  */}
        <div className="grid gap-4 px-4 mb-4">
          {/* Title  */}
          <h1 className=" tracking-wide cursor-pointer"
          onClick={() => {
            router.push(`/services/${service?._id}`);
          }}
          >{shortTitle(service?.title)}</h1>
          <div className="flex items-center justify-between">
            <div className=" flex items-center justify-center gap-2">
              <p className="flex items-center justify-center gap-2">
                <StarIcon fill="#facc15" stroke="#facc15" strokeWidth={1} /> 4.3{" "}
              </p>
              <p className="">
                {"("}
                {service?.reviews.length}
                {")"}
              </p>
            </div>
            <div className="">
              <span className=" font-semibold text-md">
                From {service?.packages[0]?.price} PKR
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
