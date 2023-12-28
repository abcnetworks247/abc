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
import { useState, useEffect, use } from "react";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [type, setType] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newType, setNewType] = useState("");
  const [category, setCategory] = useState([]);
  const [imageSrc, setImageSrc] = useState(
    "https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
  );
  const [full, setFull] = useState(true);
  const router = useRouter();

  // dialog open state that is recieved from filemanger context
  const { handleOpen, size } = UseFileManager();

  // function to handle the change of the html content
  function onChange(e) {
    setHtml(e.target.value);
  }

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
    if (e) {
      e.preventDefault();
    }
    const data = {
      title: title,
      type: newType,
      category: newCategory,
      shortdescription: shortDescription,
      longdescription: html,
      blogimage: imageSrc,
    };
    console.log(data);
    const response = await Api.post("admin/blog/create", data, {
      headers: { Authorization: `Bearer ${String(AuthToken)}` },
    });
    console.log(response);
    if (response.status === 201) {
      router.push("/dashboard/news/all-news");
    }
    else {
      console.log("error",);
    }
  };

  //fetch data from api
  const fetchData = async () => {
    try {
      const typeRes = await Api.get("admin/category/news/type");
      const catRes = await Api.get("admin/category/news/category");

      if (catRes.status === 200) {
        console.log("------------->>", catRes.data);
        setCategory(catRes.data.data);
        setLoading(false);
      }
      if (typeRes.status === 200) {
        console.log(typeRes.data.data);
        setType(typeRes.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //if error is true show error message
  if (error === true) {
    return (
      <div className="flex items-center justify-center h-full">
        <h1 className="text-2xl font-bold text-red-500">
          Something went wrong
        </h1>
      </div>
    );
  }

  return loading ? (
    <div className="flex items-center justify-center h-[70svh] lg:h-full">
      <svg
        className="w-20 h-20 mr-3 -ml-1 text-blue-500 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </div>
  ) : (
    <div>
      <div className="relative flex items-center justify-center px-4 py-12 bg-gray-100 sm:px-6 lg:px-8 ">
        <div className="z-10 p-10 bg-white  lg:w-[70%] md:w-[80%] w-[90%] shadow-md rounded-xl">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold text-gray-900">
              Create a post!
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Lorem ipsum is placeholder text.
              {newCategory && (
                <span className="text-green-500">{newCategory}</span>
              )}
              {"    "}
              {
                <span className="text-green-500">
                  {newType && <span>{newType}</span>}
                </span>
              }
            </p>
          </div>
          <form className="mt-8 space-y-3" action={handleUpload} method="POST">
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold tracking-wide text-gray-500">
                Title
              </label>
              <input
                className="p-2 text-base border bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type=""
                placeholder="Example: 10 Best Laptops"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={title}
                required
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              {/* a div with two option select for categories and type */}
              <div className="grid grid-cols-2 gap-2">
                <select
                  className="p-2 text-base border bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  name="type"
                  id="type"
                  required
                  onChange={(e) => setNewType(e.target.value)}
                >
                  <option hidden>Select Type</option>
                  {type &&
                    type.map((item) => {
                      return (
                        <option key={item._id} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>

                <select
                  className="p-2 text-base border bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  name="type"
                  id="type"
                  required
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <option hidden>Select Category</option>
                  {category &&
                    category.map((item) => {
                      return (
                        <option key={item._id} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <br />
              <label className="text-sm font-bold tracking-wide text-gray-500">
                Short Description
              </label>
              <textarea
                defaultValue={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                name=""
                id=""
                cols="10"
                rows="10"
                required
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
            </div>
            <div className="flex items-center justify-center w-full border rounded shadow-lg h-80">
              
                <div
                  className="flex flex-col w-full h-full  border-2 border-gray-300 border-dashed rounded cursor-pointer hover:bg-gray-50"
                  onClick={() => handleOpen("lg")}
                >
                  <div className="flex flex-col w-ful h-full items-center justify-center pt-5 pb-6">
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
