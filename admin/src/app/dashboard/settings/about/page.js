"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  BtnBold,
  BtnItalic,
  createButton,
  BtnStrikeThrough,
  Editor,
  EditorProvider,
  BtnLink,
  Toolbar,
  BtnStyles,
  Separator,
} from "react-simple-wysiwyg";
import Api from "@/utils/Api";
import Cookies from "js-cookie";
import PopUpFilemanager from "@/components/filemanager/PopUpFilemanager";
import { UseFileManager } from "@/context/FileManagerProvidert";
import Image from "next/image";
import { useRouter, redirect } from "next/navigation";

//store Auth token
const AuthToken = Cookies.get("adminToken");

const About = () => {
  const [about, setAbout] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aboutImageSrc, setAboutImageSrc] = useState(null);
  const [allData, setAllData] = useState(null);

  const router = useRouter();

  const fetchAbout = async () => {
    try {
      const response = await Api.get("admin/pages/about");
      const data = await response.data;
      setAbout(data.data.description);
      setAboutImageSrc(data.data.image);
      setAllData(data.data);
      setLoading(false);
    } catch (error) {
      throw new Error(error.message, "Error fetching About Content");
    }
  };

  const saveAbout = async () => {
    const data = {
      id: allData._id,
      description: about,
      image: aboutImageSrc,
    };


    try {
      setLoading(true);
      const res = await Api.patch("admin/pages/about", data, {

        headers: { Authorization: `Bearer ${String(AuthToken)}` },
      });

      setLoading(false);
      if (res.status === 200) {
        Swal.fire({
          title: "Content updated successfully!",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        router.back();
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
      Swal.fire({
        title: error.message,
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const onChange = (e) => {
    setAbout(e.target.value);
  };

  const { handleOpen, size } = UseFileManager();

  const HandleDeleteAbout = () => {
    setAboutImageSrc(null);
  };

  useEffect(() => {
    // Fetch the privacy content from the server and set it to the state
    fetchAbout();
  }, []);

  return (
    <div>
      <div>
        <div className="relative flex items-center justify-center px-4 py-12 bg-gray-100 sm:px-6 lg:px-8 ">
          <div className="z-10 p-10 bg-white  lg:w-[70%] md:w-[80%] w-[90%] shadow-md rounded-xl">
            <div className="text-center">
              <h2 className="mt-5 text-3xl font-bold text-gray-900">
                About Us
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Lorem ipsum is placeholder text.
              </p>
            </div>
            <form className="mt-8 space-y-3">
              <div className="flex flex-col gap-5">
                <a href="#value=about">
                  <div className="flex items-center justify-center w-full">
                    <div
                      className="flex flex-col w-full h-32 border-2 border-gray-300 border-dashed rounded cursor-pointer hover:bg-gray-50"
                      onClick={() => handleOpen("lg")}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-10 h-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                        <p className="py-1 text-sm text-gray-600">
                          Upload a file or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </a>

                {aboutImageSrc && (
                  <div className="w-full relative">
                    <Image
                      className="w-full h-[50vh] object-cover rounded-lg"
                      src={aboutImageSrc}
                      height={500}
                      width={500}
                      alt=""
                    />
                    <div
                      className="cursor-pointer absolute top-4 right-4 p-2 bg-gray-200 rounded-full"
                      onClick={HandleDeleteAbout}
                    >
                      <svg
                        className="w-6 h-6 text-red-600 cursor-pointer"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm font-bold tracking-wide text-gray-500">
                  Full Details
                </label>
                <EditorProvider>
                  <Editor value={about} onChange={onChange} className="h-[80vh">
                    <Toolbar>
                      <BtnBold />
                      <Separator />
                      <BtnItalic />
                      <Separator />
                      <BtnLink />
                      <Separator />
                      <BtnStrikeThrough />
                      <Separator />
                      <BtnStyles />
                    </Toolbar>
                  </Editor>
                </EditorProvider>
              </div>
            </form>
            <div>
              <button
                onClick={saveAbout}
                className="flex justify-center w-full p-4 my-5 font-semibold tracking-wide text-gray-100 transition duration-300 ease-in bg-blue-500 rounded-full shadow-lg cursor-pointer focus:outline-none focus:shadow-outline hover:bg-blue-600"
              >
                {loading ? <p>Loading...</p> : <p>Upload</p>}
              </button>
            </div>
          </div>
        </div>
      </div>
      <PopUpFilemanager
        handleOpen={handleOpen}
        size={size}
        setAboutImageSrc={setAboutImageSrc}
      />
    </div>
  );
};

export default About;
