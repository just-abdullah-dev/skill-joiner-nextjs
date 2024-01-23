"use client";
import {
  Eye,
  Loader2Icon,
  MinusCircle,
  PenSquare,
  PlusCircle,
  X,
  XCircle,
} from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getAllProfessions } from "@/services/getAllProfessions";
import { getAllSkills } from "@/services/getAllSkills";
import { getServiceById } from "@/services/getServiceById";
import Link from "next/link";
import Pricing from "./Pricing";

function EditService({ id }) {
  const { userInfo } = useSelector((state) => state.user);
  const [professions, setProfessions] = useState([]);
  const [skills, setSkills] = useState([]);
  const router = useRouter();
  const [service, setService] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [slug, setSlug] = useState("");
  const [publish, setPublish] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [serviceProfession, setServiceProfession] = useState("");
  const [serviceSkills, setServiceSkills] = useState([]);

  const [professionSelection, setProfessionSelection] = useState("");
  const [skillSelection, setSkillSelection] = useState("");

  useEffect(() => {
    if (!userInfo) {
      router.push("/");
      toast.error("Log in to get access.");
    }
    if (!userInfo?.student) {
      router.push("/");
      toast.error("Sign up as student to get access.");
    }
  }, [router, userInfo]);

  useEffect(() => {
    const getAll = () => {
      getAllProfessions((data) => {
        setProfessions(data);
      });
      getAllSkills((data) => {
        setSkills(data);
      });
    };
    getAll();
  }, []);

  useEffect(() => {
    if (id != "new") {
      const get = () => {
        getServiceById(id, (data) => {
          setService(data);
        });
      };
      get();
      setIsUpdate(true);
    } else if (id == "new") {
      setIsAdd(true);
    }
  }, []);

  useEffect(() => {
    if (service) {
      setTitle(service?.title);
      setSlug(service?.slug);
      setDesc(service?.desc);
      setPublish(service?.publish);
      setServiceProfession(service?.profession);
      setProfessionSelection(service?.profession?.name);
      setServiceSkills(service?.skills);
    }
  }, [service]);

  const handleAddSkill = () => {
      for (let index = 0; index < serviceSkills.length; index++) {
        const skill = serviceSkills[index];
        if (skillSelection == skill?.name) {
          alert("Skill already added.");
          return;
        }
      }
      let skill_id = null;
    for (let index = 0; index < skills.length; index++) {
      const item = skills[index];
      if (item?.name == skillSelection) {
        setServiceSkills(oldSkills=>[...oldSkills, item]);
        setSkillSelection('');
        skill_id = item?._id;
        break;
      }
    }
    if (!skill_id) {
      alert("Kindly select a skill from list.");
      return;
    }
    
  
  }

  const handleFileChange = (event, type) => {
    const files = event.target.files;
    switch (type) {
      case "photos":
        setPhotos([...photos, ...files]);
        break;
      case "videos":
        setVideos([...videos, ...files]);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdd) {
      handleAddService();
    } else if (isUpdate) {
      handleUpdateService();
    }
  };

  async function handleAddService() {
    setIsLoading(true);

    let pro_id = null;
    for (let index = 0; index < professions.length; index++) {
      const item = professions[index];
      if (item?.name == professionSelection) {
        pro_id = item?._id;
        setServiceProfession(item?._id);
        break;
      }
    }
    if (!pro_id) {
      alert("Kindly select the profession from list.");
      setIsLoading(false);
      return;
    }
    if (!serviceSkills[0]) {
      alert("Kindly add atleast one skill.");
      setIsLoading(false);
      return;
    }
    let skills_id = [];
    serviceSkills.map((item)=>{
      skills_id.push(item?._id);
    })
    const body = {
      title: title,
      desc: desc,
      slug: slug,
      publish: publish ? "yes" : "no",
      profession: serviceProfession ? serviceProfession : pro_id,
      skills: skills_id,
    };
    
    let formdata = new FormData();
    formdata.append("body", JSON.stringify(body));
    photos.forEach((pic) => {
      formdata.append("photos", pic, pic?.name);
    });

    videos.forEach((vid) => {
      formdata.append("videos", vid, vid?.name);
    });

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      redirect: "follow",
      body: formdata,
    };
    fetch(`/api/users/services/addService`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          router.push(`/services/edit/${result?.data?._id}`)
        } else {
          toast.error(result?.message);
        }
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  }

  async function handleUpdateService() {
    setIsLoading(true);
    
    let pro_id = null;
    for (let index = 0; index < professions.length; index++) {
      const item = professions[index];
      if (item?.name == professionSelection) {
        pro_id = item?._id;
        setServiceProfession(item?._id);
        break;
      }
    }
    
      if (!pro_id) {
        alert("Kindly select the profession from list.");
        setIsLoading(false);
        return;
      }
    
    if (!serviceSkills[0]) {
      alert("Kindly add atleast one skill.");
      setIsLoading(false);
      return;
    }
    let skills_id = [];
    serviceSkills.map((item)=>{
      skills_id.push(item?._id);
    })
    const body = {
      _id: id,
      title: title,
      desc: desc,
      slug: slug,
      publish: publish ? "yes" : "no",
      profession: serviceProfession ? serviceProfession : pro_id,
      skills: skills_id,
    };
    let formdata = new FormData();
    formdata.append("body", JSON.stringify(body));
    photos.forEach((pic) => {
      formdata.append("photos", pic, pic?.name);
    });

    videos.forEach((vid) => {
      formdata.append("videos", vid, vid?.name);
    });

    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      redirect: "follow",
      body: formdata,
    };
    fetch(`/api/users/services/updateService`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          toast.success('Click preview to see it.')
        } else {
          toast.error(result?.message);
        }
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  }


  return (
    <div className="mb-24 grid gap-6">
      <div className="bg-white relative font-semibold text-center text-4xl py-4">
        <h1>Services</h1>{" "}
        {isUpdate && (
          <Link
            className="absolute top-6 right-10 text-base"
            href={`/services/${slug}`}
          >
            Preview
          </Link>
        )}
      </div>
      {/* Form for addition or updation of project.  */}
      {(isAdd || isUpdate) && (
        <div
          id="form"
          className="flex items-center justify-center relative pt-4 w-full"
        >
          <form onSubmit={handleSubmit} className="grid flex-wrap gap-8 w-full">
            {/* title, slug  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="labelTag" htmlFor="title">
                  Title:
                </label>
                <input
                  className="inputTag w-full"
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="labelTag" htmlFor="slug">
                  Slug:
                </label>
                <input
                  className="inputTag w-full"
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </div>
            </div>
            {/* desc  */}
            <div>
              <label className="labelTag" htmlFor="desc">
                Description:
              </label>
              <textarea
                className="inputTag w-full"
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              ></textarea>
            </div>
            {/* profession, skills  */}
            <div className="flex gap-6 items-start justify-start">
              <div className=" w-1/3">
                <label className=" labelTag">Profession:</label>
                <input
                  className="inputTag w-full"
                  type="text"
                  list="optionsList1"
                  value={professionSelection}
                  placeholder="Search or type SPACE to see list"
                  onChange={(e) => {
                    setProfessionSelection(e.target.value);
                  }}
                />
                <datalist id="optionsList1" className="">
                  {professions &&
                    professions.map((item) => {
                      return <option key={item?._id} value={item?.name} />;
                    })}
                </datalist>
              </div>
              <div className=" w-2/3 flex gap-6">
                <div className="w-1/2 relative">
                  <label className=" labelTag">Skills:</label>
                  <PlusCircle className="absolute top-9 cursor-pointer right-3" onClick={handleAddSkill} />
                  <input
                    className="inputTag w-full"
                    type="text"
                    list="optionsList"
                    placeholder="Search or type SPACE to see list"
                    onChange={(e)=>{
                      setSkillSelection(e.target.value);
                    }}
                    value={skillSelection}
                  />
                  <datalist id="optionsList" className="">
                    {skills.length > 0 &&
                      skills.map((item) => {
                        return <option key={item?._id} value={item?.name} />;
                      })}
                  </datalist>
                </div>
                <div className="flex items-center flex-wrap gap-6 w-1/2">
                  {serviceSkills &&
                    serviceSkills.map((item) => {
                      return (
                        <div
                          key={item?._id}
                          className="flex items-center justify-around rounded-lg w-fit px-2 h-[35px] bg-primary gap-2 text-white"
                        >
                          <h1 className="">{item?.name}</h1>
                          <button
                            disabled={isLoading}
                            onClick={() => {
                              setServiceSkills((oldSkills)=>{
                                let array = [];
                                oldSkills.map((skill)=>{
                                  if(skill?._id != item?._id){
                                    array.push(skill);
                                  }
                                })
                                return array;
                              });
                            }}
                            className="disabled:opacity-60 disabled:cursor-wait"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            {/* photos, videos and publish  */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="labelTag">Upload Photos</h3>
                <input
                  className="inputTag text-dark-grey w-full"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e, "photos")}
                />
              </div>
              <div>
                <h3 className="labelTag">Upload Videos</h3>
                <input
                  className="inputTag text-dark-grey w-full"
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => handleFileChange(e, "videos")}
                />
              </div>
              <div className="flex gap-4 items-center justify-around">
                <label
                  className={`${
                    !publish
                      ? "border-green-500 text-green-500"
                      : "border-red-600 text-red-600"
                  } p-3 mt-4 w-full border-2 rounded-xl cursor-pointer text-center`}
                >
                  <input
                    className="absolute opacity-0"
                    type="checkbox"
                    onChange={() => setPublish(!publish)}
                  />
                  {publish ? "Unpublish" : "Publish"}
                </label>
              </div>
            </div>

            <button type="submit" className="actionButtonTag">
              {isLoading ? (
                <Loader2Icon className="animate-spin" />
              ) : isAdd ? (
                "Add"
              ) : (
                "Update"
              )}
            </button>
          </form>
        </div>
      )}
      {isUpdate && 
      <Pricing serviceId={service?._id} servicePackages={service?.packages} />}
    </div>
  );
}
export default dynamic(() => Promise.resolve(EditService), { ssr: false });
