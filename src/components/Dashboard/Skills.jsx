"use client";
import { Loader2Icon, PenSquare, X } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Skills({ userSkills = [] }) {
  const [userSkillsState, setUserSkillsState] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selection, setSelection] = useState("");
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    function getAll() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("/api/superAdmin/skills/getAll", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.success) {
            setSkills(() => {
              return result?.data;
            });
          }
        })
        .catch((error) => console.log("error", error));
    }
    getAll();
  }, []);

  useEffect(()=>{
    setUserSkillsState(userSkills);
  },[userSkills]);

  async function handleSkillUpdate() {
    setIsLoading(true);
    for (let index = 0; index < userSkillsState.length; index++) {
      const skill = userSkillsState[index];
      if (selection == skill?.name) {
        alert("Skill already added.");
        setIsLoading(false);
        return;
      }
    }
    
    let id = null;
    for (let index = 0; index < skills.length; index++) {
      const item = skills[index];
      if (item?.name == selection) {
        setUserSkillsState(oldSkills=>[...oldSkills, item]);
        id = item?._id;
        break;
      }
    }
    if (!id) {
      alert("Kindly select a skill from list.");
      setIsLoading(false);
      return;
    }
    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      redirect: "follow",
    };

    fetch(`/api/users/skills/addSkill?id=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result?.success){
          toast.success(result?.message);
        }else{
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
    setIsLoading(false);
  }

  async function handleDeleteSkill(id){  
    setUserSkillsState((oldSkills)=>{
      let array = [];
      oldSkills.map((skill)=>{
        if(skill?._id != id){
          array.push(skill);
        }
      })
      return array;
    });

    var requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      redirect: 'follow'
    };
    
    fetch(`/api/users/skills/deleteSkill?id=${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result?.success){
          toast.success(result?.message);
        }else{
          toast.error(result?.message);
        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className={`${""} grid gap-6 relative w-full`}>
      {/* edit btn  */}
      {!isEdit && (
        <PenSquare
          size={20}
          color="#595959"
          className="absolute top-0 right-0 cursor-pointer"
          onClick={() => {
            setIsEdit(true);
          }}
        />
      )}

      <div className=" flex items-start justify-start gap-6">
        <h1 className="text-xl font-bold">Skills</h1>
        {userSkillsState && userSkillsState.length > 0 ? (
          <div className="flex items-center flex-wrap gap-6">
            {userSkillsState && userSkillsState.map((item) => {
              return (
                <div
                  key={item?._id}
                  className="flex items-center justify-around rounded-lg w-fit px-2 h-[35px] bg-primary gap-2 text-white"
                >
                  <h1 className="">{item?.name}</h1>
                  <button
                    disabled={isLoading}
                    onClick={() => {
                      handleDeleteSkill(item?._id);
                    }}
                    className="disabled:opacity-60 disabled:cursor-wait"
                  >
                    <X size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center flex-wrap gap-3">
            {Array(3)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="w-[120px] h-[35px] rounded-lg bg-dark-hard animate-pulse"
                ></div>
              ))}
          </div>
        )}
      </div>
      {isEdit && (
        <div className="flex items-center">
          <div className="">
            <input
              className="inputTag w-[275px]"
              type="text"
              list="optionsList"
              placeholder="Search or type SPACE to see list"
              onChange={(e) => {
                setSelection(e.target.value);
              }}
            />
            <datalist id="optionsList" className="">
              {skills &&
                skills.map((item) => {
                  return <option key={item?._id} value={item?.name} />;
                })}
            </datalist>
          </div>
          {/* update and close btn  */}

          <div className="flex items-end gap-6 justify-end w-full">
            <button
              className="normalButtonTag bg-red-500 w-[40%]"
              onClick={() => {
                setIsEdit(false);
              }}
            >
              Close
            </button>
            <button
              disabled={isLoading}
              className="actionButtonTag w-[40%]"
              onClick={handleSkillUpdate}
            >
              {isLoading ? <Loader2Icon className="animate-spin" /> : "Add"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Skills), { ssr: false });
