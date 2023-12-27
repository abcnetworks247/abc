"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Option,
  Select,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MdOutlineDelete } from "react-icons/md";
import UploadComp from "@/components/filemanager/UploadComp";
import { UseFileManager } from "@/context/FileManagerProvidert";
import io from "socket.io-client";
import FileComp from "@/components/filemanager/fileComp";

const Page = () => {
  // dialog open state thaat is recieved from filemanger context
  const { handleOpen, size } = UseFileManager();

  const [fileData, setFileData] = useState(null);

  // const socket = io.connect(`${process.env.NEXT_PUBLIC_SERVER_URL}`);

  useEffect(() => {
    const socket = io.connect(`${process.env.NEXT_PUBLIC_SERVER_URL}`);

    const handleFileManagerUpdate = (data) => {
      console.log("this is filemanager", data);
      setFileData(data);
    };

    // Attach the event listener when the component mounts
    socket.on("filemanager", handleFileManagerUpdate);

    // Cleanup the event listener when the component unmounts
    return () => {
      socket.off("filemanager", handleFileManagerUpdate);
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="px-10 py-10">
      <div className="flex flex-row items-center justify-between">
        <p>All uploaded files</p>
        <Button
          variant=""
          className="flex items-center gap-3 bg-red-600"
          onClick={() => handleOpen("sm")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload Files
        </Button>
      </div>
      <Dialog open={size === "md"} size={size || "md"} handler={handleOpen}>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
      </Dialog>

      <FileComp fileData={fileData} />
      <UploadComp handleOpen={handleOpen} size={size} />
    </div>
  );
};

export default Page;
