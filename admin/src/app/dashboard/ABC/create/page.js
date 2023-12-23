"use client";
import Image from "next/image";
import Link from "next/link";
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
import { useState } from "react";
import { UseFileManager } from "@/context/FileManagerProvidert";
import PopUpFilemanager from "@/components/filemanager/PopUpFilemanager";

function page() {

  const [html, setHtml] = useState("");

      // dialog open state thaat is recieved from filemanger context
      const {handleOpen, size } = UseFileManager()
  function onChange(e) {

    setHtml(e.target.value);
  }
  const [imageSrc, setImageSrc] = useState(
    "https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
  );
  const [full, setFull] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImageSrc(e.target.result); // this.setState({imageSrc: e.target.result})
        setFull(true);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold text-gray-900">
              Create a post!
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Lorem ipsum is placeholder text.
            </p>
          </div>
          <form className="mt-8 space-y-3" action="#" method="POST">
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Title
              </label>
              <input
                className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type=""
                placeholder="mail@gmail.com"
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Short Description
              </label>
              <textarea
                name=""
                id=""
                cols="10"
                rows="10"
                placeholder=" News details"
                className="text-base p-2 border h-20 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              ></textarea>
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Full Details
              </label>
              <EditorProvider>
                <Editor value={html} onChange={onChange}>
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
            <div className=" grid-cols-1 space-y-2 hidden">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Attach Document
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col justify-center items-center  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                      <img
                        className="has-mask h-36 object-center"
                        src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                        alt="freepik image"
                      />
                    </div>
                    <p className="pointer-none text-gray-500 ">
                      <span className="text-sm">Drag and drop</span> files here{" "}
                      <br /> or{" "}
                      <a
                        href=""
                        id=""
                        className="text-blue-600 hover:underline"
                      >
                        select a file
                      </a>{" "}
                      from your computer
                    </p>
                  </div>
                </label>
              </div>
            </div>
            <div className="border rounded h-80 w-full flex items-center shadow-lg justify-center">
              <div>
                <Image
                  src="/upload.jpg"
                  height={280}
                  width={280}
                  alt="upload"
                />
                <p className="border text-center text-base ">
                  {full ? (
                    <span className="text-green-500">Image Uploaded</span>
                  ) : (
                    <span className="text-blue-500 cursor-pointer"  onClick={() => handleOpen("lg")}>
                      Click here to select image
                    </span>
                  )}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              <span>File type: doc,pdf,types of images</span>
            </p>
            <div>
              <button
                type="submit"
                className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <PopUpFilemanager handleOpen={handleOpen} size={size}  />
    </div>
  );
}

export default page;
