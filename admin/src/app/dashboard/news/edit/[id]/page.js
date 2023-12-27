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
import { useState, useEffect, useRef } from "react";
import { UseFileManager } from "@/context/FileManagerProvidert";
import PopUpFilemanager from "@/components/filemanager/PopUpFilemanager";
import { useParams } from "next/navigation";
import axios from "axios";
import Api from "@/utils/Api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";

const page = () => {
  const [html, setHtml] = useState("");

  // dialog open state that is recieved from filemanger context

  const { handleOpen, size } = UseFileManager();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState(" ");
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null);
  const [imageSrc, setImageSrc] = useState(
    "https://chatgen.ai/wp-content/uploads/2023/04/AI-chat-5-1200x675.png"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const AuthToken = Cookies.get("adminToken");
  const router = useRouter();

  const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admin/blog`;

  useEffect(() => {
    axios
      .get(`${baseUrl}/${id}`)
      .then((res) => {
        const data = res.data.blogdata;
        console.log(data);
        console.log(id);
        setPost(data);
        setTitle(data.title);
        setShortDescription(data.shortdescription);
        setCategory(data.category)
        setType(data.type);
        setHtml(data.longdescription);
        setImageSrc(data.blogimage);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  
  const handleChange = (e) => {
    setHtml(e.target.value);
  };

  return (
    <div>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold text-center text-black sm:text-3xl">
          Edit your post
        </h1>

        <p className="mt-5 text-sm font-medium text-center text-gray-700">
          Tweak, your blog, your audience are waiting...
        </p>

        {loading === true ? (
          <>loading...</>
        ) : (
          <>
            <form
              className="px-2 py-6 mt-6"
              encType="multipart/form-data"
            >
              <div>
                <label htmlFor="title" className="sr-only">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  className="w-full p-4 text-sm border border-gray-300 rounded-lg shadow-sm"
                  placeholder="Blog Title"
                  onChange={(e) => setTitle(e.target.value)}
                  min={74}
                />
              </div>
              <div>
                <label htmlFor="shortDescription" className="sr-only">
                  Short Description
                </label>
                <input
                  type="text"
                  value={shortDescription}
                  className="w-full p-4 text-sm border border-gray-300 rounded-lg shadow-sm"
                  min={92}
                  placeholder="Short Description"
                  onChange={(e) => setShortDescription(e.target.value)}
                />
              </div>
              <div className="w-full">
                <fieldset className="w-full border border-gray-300 rounded-lg">
                  <select
                    name="blog-category"
                    value={category}
                    className="block w-full px-3 py-4 text-sm text-gray-700 border-gray-300 rounded-md shadow-sm"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="uncategorized">Uncategorized</option>
                    <option value="technology">Technology</option>
                    <option value="travel">Travel</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="food-cuisine">Food & Cuisine</option>
                    <option value="health-wellness">Health & Wellness</option>
                    <option value="fashion">Fashion</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="personal-development">
                      Personal Development
                    </option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="sports">Sports</option>
                    <option value="business">Business</option>
                    <option value="marketing">Marketing</option>
                    <option value="arts-culture">Arts & Culture</option>
                    <option value="environment">Environment</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="politics">Politics</option>
                    <option value="science">Science</option>
                    <option value="food-drink">Food & Drink</option>
                    <option value="music">Music</option>
                    <option value="technology-gadgets">
                      Technology Gadgets
                    </option>
                    <option value="history">History</option>
                    <option value="travel-guides">Travel Guides</option>
                    <option value="family-parenting">Family & Parenting</option>
                    <option value="career">Career</option>
                    <option value="philosophy">Philosophy</option>
                    <option value="religion-spirituality">
                      Religion & Spirituality
                    </option>
                  </select>
                </fieldset>
              </div>


              

              <div className="my-10 h-[50vh] pb-16 pt-6">
                <label
                  htmlFor="longDescription"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  News Post Content
                </label>
                <EditorProvider>
                  <Editor value={html} onChange={handleChange}>
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
              <div>
                <Button
                  variant="gradient"
                  type="submit"
                  className="flex justify-center w-full p-4 my-5 font-semibold tracking-wide text-gray-100 transition duration-300 ease-in bg-blue-500 rounded-full shadow-lg cursor-pointer focus:outline-none focus:shadow-outline hover:bg-blue-600"
                >
                  Save
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
