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
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";


//store Auth token
const AuthToken = Cookies.get("adminToken");

const PrivacyPolicyPage = () => {
  const [privacy, setPrivacy] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

   const router = useRouter();

  const fetchPrivacyContent = async () => {
    try {
      const response = await Api.get("admin/pages/policy");
      const data = await response.data;
      setPrivacy(data.data);
      setLoading(false);
    } catch (error) {
    throw new Error(error.message, "Error fetching privacy content");
    }
  };

  const savePrivacyContent = async () => {
    const data = {
      id: privacy._id,
      description: privacy.description,
    };

    try {
      setLoading(true);

      const res = await Api.patch("admin/pages/policy", data, {
        headers: { Authorization: `Bearer ${String(AuthToken)}`},
      });



      if (res.status === 200) {
        setLoading(false);
        Swal.fire({
          title: "Privacy content updated successfully!",
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

  useEffect(() => {
    // Fetch the privacy content from the server and set it to the state
    fetchPrivacyContent();
  }, []);
  return (
    <div>
      <div>
        <div className="relative flex items-center justify-center px-4 py-12 bg-gray-100 sm:px-6 lg:px-8 ">
          <div className="z-10 p-10 bg-white  lg:w-[70%] md:w-[80%] w-[90%] shadow-md rounded-xl">
            <div className="text-center">
              <h2 className="mt-5 text-3xl font-bold text-gray-900">
                Privacy Policy
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                {` This Terms and Condition read will be visible to your users..`}
              </p>
              <Link
                href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/privacy-policy`}
                target="_blank"
                className="text-blue-500 underline mb-10 "
              >
                click to view privacy policy page
              </Link>
            </div>
            <form className="mt-8 space-y-3">
              <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm font-bold tracking-wide text-gray-500">
                  Full Details
                </label>
                <EditorProvider>
                  <Editor
                    value={privacy.description}
                    onChange={(e) =>
                      setPrivacy({ ...privacy, description: e.target.value })
                    }
                    className="h-[80vh"
                  >
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
                onClick={savePrivacyContent}
                className="flex justify-center w-full p-4 py-2 my-5 font-semibold tracking-wide text-gray-100 transition duration-300 ease-in bg-blue-500 rounded-full shadow-lg cursor-pointer focus:outline-none focus:shadow-outline hover:bg-blue-600"
              >
                {loading ? <p>Loading...</p> : <p>Upload</p>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
