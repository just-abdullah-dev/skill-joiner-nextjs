"use client";
import { getAllCountries } from "@/services/getAllCountries";
import { Loader2Icon, PenSquare } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Country({ userCountry }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userCountryState, setUserCountryState] = useState(null);
  const [selection, setSelection] = useState("");
  const { userInfo } = useSelector((state) => state.user);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getAll = ()=>{
      getAllCountries((data)=>{setCountries(data);})
    }
    getAll();
  }, []);

  useEffect(() => {
    setUserCountryState(userCountry);
  }, [userCountry]);

  async function handleUpdateCountry() {
    setIsLoading(true);
    if (!selection) {
      alert("Kindly select the country from list.");
      setIsLoading(false);
      return;
    }

    var formdata = new FormData();
    const body = {
      country: selection,
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
          toast.success("Country Updated!");
          setUserCountryState(selection);
        } else {
          toast.error(data?.message);
        }
      })
      .catch((error) => console.log("error", error));
      setIsEdit(false);
    setIsLoading(false);
  }

  return (
    <div
      className={`${"flex items-start justify-start gap-6"} relative w-full`}
    >
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
      <h1 className="text-xl font-bold">Country</h1>
      {isEdit ? (
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
            {countries &&
              countries.map((item, index) => {
                return <option key={index} value={item?.name?.common} />;
              })}
          </datalist>
        </div>
      ) : (
        <h1 className="text-lg font-bold">{userCountryState}</h1>
      )}

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
            onClick={handleUpdateCountry}
          >
            {isLoading ? <Loader2Icon className="animate-spin" /> : "Update"}
          </button>
        </div>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Country), { ssr: false });
