"use client";
import {
  Loader2Icon,
  PlusCircle,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getAllProfessions } from "@/services/getAllProfessions";
import { getAllSkills } from "@/services/getAllSkills";
import Link from "next/link";
import { getJobById } from "@/services/getJobById";

function EditJob({ id }) {
  const { userInfo } = useSelector((state) => state.user);
  const [professions, setProfessions] = useState([]);
  const [skills, setSkills] = useState([]);
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [budget, setBudget] = useState("");
  const [desc, setDesc] = useState("");
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [docs, setDocs] = useState([]);
  const [jobProfession, setJobProfession] = useState("");
  const [jobSkills, setJobSkills] = useState([]);

  const [professionSelection, setProfessionSelection] = useState("");
  const [skillSelection, setSkillSelection] = useState("");

  useEffect(() => {
    if (!userInfo) {
      router.push("/");
      toast.error("Log in to get access.");
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
        getJobById(id, (data) => {
          setJob(data);
        });
      };
      get();
      setIsUpdate(true);
    } else if (id == "new") {
      setIsAdd(true);
    }
  }, []);

  useEffect(() => {
    if (job) {
      setTitle(job?.title);
      setDesc(job?.desc);
      setTime(job?.time);
      setBudget(job?.budget);
      setJobProfession(job?.profession);
      setProfessionSelection(job?.category?.name);
      setJobSkills(job?.skills);
    }
  }, [job]);

  const handleAddSkill = () => {
      for (let index = 0; index < jobSkills.length; index++) {
        const skill = jobSkills[index];
        if (skillSelection == skill?.name) {
          alert("Skill already added.");
          return;
        }
      }
      let skill_id = null;
    for (let index = 0; index < skills.length; index++) {
      const item = skills[index];
      if (item?.name == skillSelection) {
        setJobSkills(oldSkills=>[...oldSkills, item]);
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
        case "docs":
        setDocs([...docs, ...files]);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdd) {
      handleAddJob();
    } else if (isUpdate) {
      handleUpdateJob();
    }
  };

  async function handleAddJob() {
    setIsLoading(true);

    let pro_id = null;
    for (let index = 0; index < professions.length; index++) {
      const item = professions[index];
      if (item?.name == professionSelection) {
        pro_id = item?._id;
        setJobProfession(item?._id);
        break;
      }
    }
    if (!pro_id) {
      alert("Kindly select the profession from list.");
      setIsLoading(false);
      return;
    }
    if (!jobSkills[0]) {
      alert("Kindly add atleast one skill.");
      setIsLoading(false);
      return;
    }
    let skills_id = [];
    jobSkills.map((item)=>{
      skills_id.push(item?._id);
    })
    const body = {
      title: title,
      desc: desc,
      time: time,
      budget: budget,
      category: jobProfession ? jobProfession : pro_id,
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

    docs.forEach((doc) => {
      formdata.append("docs", doc, doc?.name);
    });

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      redirect: "follow",
      body: formdata,
    };
    fetch(`/api/jobpost/create`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          router.push(`/jobs/edit/${result?.data?._id}`)
        } else {
          toast.error(result?.message);
        }
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  }

  async function handleUpdateJob() {
    setIsLoading(true);
    
    let pro_id = null;
    for (let index = 0; index < professions.length; index++) {
      const item = professions[index];
      if (item?.name == professionSelection) {
        pro_id = item?._id;
        setJobProfession(item?._id);
        break;
      }
    }
      if (!pro_id) {
        alert("Kindly select the profession from list.");
        setIsLoading(false);
        return;
      }
    
    if (!jobSkills[0]) {
      alert("Kindly add atleast one skill.");
      setIsLoading(false);
      return;
    }
    let skills_id = [];
    jobSkills.map((item)=>{
      skills_id.push(item?._id);
    })
    const body = {
      _id: id,
      title: title,
      desc: desc,
      time: time,
      budget: budget,
      category: jobProfession ? jobProfession : pro_id,
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
    docs.forEach((doc) => {
      formdata.append("docs", doc, doc?.name);
    });

    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      redirect: "follow",
      body: formdata,
    };
    fetch(`/api/jobpost/update`, requestOptions)
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
      <div className="bg-white relative font-semibold text-center text-4xl py-4 flex gap-2 items-center justify-center">
        <h1>{isAdd?'Post a ':'Update a '}</h1> <span className=' text-primary'>Job</span>{" "} 
        {isUpdate && (
          <Link
            className="absolute top-6 right-10 text-base"
            href={`/jobs/${id}`}
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
          {/* title  */}
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
            {/* time, budget  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div>
                <label className="labelTag" htmlFor="time">
                  Time in days:
                </label>
                <input
                  className="inputTag w-full"
                  type="number"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="labelTag" htmlFor="budget">
                  Budget:
                </label>
                <input
                  className="inputTag w-full"
                  type="text"
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                />
              </div>
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
                  {jobSkills &&
                    jobSkills.map((item) => {
                      return (
                        <div
                          key={item?._id}
                          className="flex items-center justify-around rounded-lg w-fit px-2 h-[35px] bg-primary gap-2 text-white"
                        >
                          <h1 className="">{item?.name}</h1>
                          <button
                            disabled={isLoading}
                            onClick={() => {
                              setJobSkills((oldSkills)=>{
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
            {/* photos, videos and docs  */}
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
              <div>
                <h3 className="labelTag">Documents</h3>
                <input
                  className="inputTag text-dark-grey w-full"
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, "docs")}
                />
              </div>
            </div>

            <button type="submit" className="actionButtonTag">
              {isLoading ? (
                <Loader2Icon className="animate-spin" />
              ) : isAdd ? (
                "Post"
              ) : (
                "Update"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
export default dynamic(() => Promise.resolve(EditJob), { ssr: false });
