"use client";
import { userActions } from "@/store/reducers/userReducer";
import { Loader2Icon, PenSquare } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function Profession({userProfession}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [professions, setProfessions] = useState([]);
  const [userProfessionState, setUserProfessionState] = useState(null);
  const [selection, setSelection] = useState('');
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.user);

  useEffect(() => {
    function getAll() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("/api/superAdmin/profession/getAll", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.success) {
            setProfessions(() => {
              return result?.data;
            });
          }
        })
        .catch((error) => console.log("error", error));
    }
    getAll();
  }, []);

  useEffect(()=>{
    setUserProfessionState(userProfession);
  },[userProfession]);

  async function handleProfessionUpdate() {
    setIsLoading(true);
    let id = null;
    for (let index = 0; index < professions.length; index++) {
      const item = professions[index];
      if (item?.name == selection) {
        id = item?._id;
        setUserProfessionState(item);
        setIsEdit(false);
        break;
      }
    }
    if (!id) {
      alert("Kindly select the profession from list.");
      setIsLoading(false);
      return;
    }
    
    var formdata = new FormData();
    const body = {
      profession: id,
    };
    formdata.append("document", JSON.stringify(body));

    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      body: formdata,
      redirect: "follow",
    };

    await fetch("/api/users/updateProfile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success("Profession Updated!");
        } else {
          toast.error(data?.message);
        }
      })
      .catch((error) => console.log("error", error));
    setIsLoading(false);
  }

  return (
    <div className={`${'flex items-start justify-start gap-6'} relative w-full`}>
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
      <h1 className="text-xl font-bold">Profession</h1>
      {isEdit ? 
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
        {professions &&
          professions.map((item) => {
            return (
              <option
                key={item?._id}
                value={item?.name}
              />
            );
          })}
      </datalist>
    </div>:
    <h1 className="text-lg font-bold">{userProfessionState?.name}</h1>}

      {/* update and close btn  */}
      {isEdit && (
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
            onClick={handleProfessionUpdate}
          >
            {isLoading ? <Loader2Icon className="animate-spin" /> : "Update"}
          </button>
        </div>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Profession), { ssr: false });

