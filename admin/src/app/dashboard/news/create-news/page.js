/**
 * Represents the page component for creating news.
 * @component
 * @returns {JSX.Element} The JSX element for the page component.
 */
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
import Api from "@/utils/Api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


function page() {
  /**
   * Represents the state of the HTML content.
   * @type {string}
   */
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  // dialog open state that is recieved from filemanger context
  const { handleOpen, size } = UseFileManager();

  // function to handle the change of the html content
  function onChange(e) {
    setHtml(e.target.value);
  }
  const [imageSrc, setImageSrc] = useState(
    "https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
  );
  const [full, setFull] = useState(false);

  // function to handle the change of the image
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // check if the file is an image
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImageSrc(e.target.result); // this.setState({imageSrc: e.target.result})
        setFull(true);
      };

      reader.readAsDataURL(file);
    }
  };

  //store Auth token
  const AuthToken = Cookies.get("adminToken");
  // function to handle the click of the upload button
  const handleUpload = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      shortdescription: shortDescription,
      longdescription: html,
      image: imageSrc,
    };
    const response = await Api.post("/blog/create", data, {
      headers: { Authorization: `Bearer ${String(AuthToken)}` },
    });
    console.log(response);
    if (response.status === 200) {
      router.push("/dashboard/news");
    }
  };

  return (
    <div>
      <div className="relative flex items-center justify-center px-4 py-12 bg-gray-100 sm:px-6 lg:px-8 ">
        <div className="z-10 p-10 bg-white  lg:w-[70%] md:w-[80%] w-[90%] shadow-md rounded-xl">
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
              <label className="text-sm font-bold tracking-wide text-gray-500">
                Title
              </label>
              <input
                className="p-2 text-base border bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type=""
                placeholder="mail@gmail.com"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={title}
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold tracking-wide text-gray-500">
                Short Description
              </label>
              <textarea
                defaultChecked={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                name=""
                id=""
                cols="10"
                rows="10"
                placeholder=" News details"
                className="h-20 p-2 text-base border bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              ></textarea>
              <label className="text-sm font-bold tracking-wide text-gray-500">
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
            <div className="hidden grid-cols-1 space-y-2 ">
              <label className="text-sm font-bold tracking-wide text-gray-500">
                Attach Document
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full p-10 text-center border-4 border-dashed rounded-lg h-60 group">
                  <div className="flex flex-col items-center justify-center w-full h-full text-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div className="flex flex-auto w-2/5 mx-auto -mt-10 max-h-48">
                      <img
                        className="object-center has-mask h-36"
                        src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                        alt="freepik image"
                      />
                    </div>
                    <p className="text-gray-500 pointer-none ">
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
            <div className="flex items-center justify-center w-full border rounded shadow-lg h-80">
              <div>
                <Image
                  src="/upload.jpg"
                  height={280}
                  width={280}
                  alt="upload"
                />
                <p className="text-base text-center border ">
                  {full ? (
                    <span className="text-green-500">Image Uploaded</span>
                  ) : (
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleOpen("lg")}
                    >
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
                className="flex justify-center w-full p-4 my-5 font-semibold tracking-wide text-gray-100 transition duration-300 ease-in bg-blue-500 rounded-full shadow-lg cursor-pointer focus:outline-none focus:shadow-outline hover:bg-blue-600"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>

      <PopUpFilemanager handleOpen={handleOpen} size={size} />
    </div>
  );
}

export default page;
