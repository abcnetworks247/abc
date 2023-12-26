import { Button, Spinner } from "@material-tailwind/react";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import Image from "next/image";

const UploadPop = () => {
  const [uploadFile, setUploadFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [successful, setSuccessful] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadState, setUploadState] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    const imageUrl = URL.createObjectURL(selectedFile);
    setFileUrl(imageUrl);
    setUploadFile(selectedFile);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", uploadFile);

    const token = Cookies.get("adminToken");

    try {
      setLoading(true);
      setUploadState("Uploading, please wait...");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admin/file/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${String(token)}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setUploadState("File Uploaded Successfully 🎉🎉");
        setSuccessful(true);
        setLoading(false);

        setTimeout(() => {
          setSuccessful(null);
          handleOpen(null);
        }, 5000);
      } else {
        setLoading(false);
        setUploadState("Error: Try again later");

        setTimeout(() => {
          setSuccessful(null);
          handleOpen(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-start">
      <div className="relative w-full p-6 border-2 border-gray-300 border-dashed rounded-lg h-[50vh] flex flex-col items-center justify-center" id="dropzone">
        <form encType="multipart/form-data">
          <input type="file" className="absolute inset-0 z-50 w-full h-full opacity-0" onChange={handleImageChange} name="image" accept="image/*" />
        </form>
        <div className="text-center">
          {!fileUrl ? (
            <Image className="w-12 h-12 mx-auto" src="https://www.svgrepo.com/show/357902/image-upload.svg" alt="" height={200} width={200} />
          ) : (
            <Image className="w-[200px] h-[200px] object-cover mx-auto rounded-lg shadow-sm" src={fileUrl} alt="" height={200} width={200} />
          )}
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            <label htmlFor="file-upload" className="relative cursor-pointer">
              <span>Drag and drop</span>
              <span className="text-indigo-600"> or browse </span>
              <span> to upload</span>
              <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" />
            </label>
          </h3>
          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
        <img src="" className="hidden mx-auto mt-4 max-h-40" id="preview" />
        {successful && (
          <div className="absolute w-[50%] top-0 h-fit flex items-center justify-between bg-red-500">
            <Confetti className="w-[30vw]" />
          </div>
        )}
      </div>

      <div className="flex flex-row items-center justify-between mt-10">
        {!loading && <div className=""></div>}

        <div className="flex flex-row items-center gap-4 ml-5">
          {loading && <Spinner />}
          <span className="text-sm"> {uploadState}</span>
        </div>

        <div className="">
          <Button variant="text" color="red" onClick={() => handleOpen(null)} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" onClick={handleUpload} disabled={!fileUrl} className={`${!fileUrl ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <span>Upload</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadPop;
