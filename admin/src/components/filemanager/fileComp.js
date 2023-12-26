"use client";

import {
  Button,
  CardFooter,
  Checkbox,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { MdOutlineDelete } from "react-icons/md";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const FileComp = () => {
  const [fileData, setFileData] = useState(null);
  
  const socket = io.connect(`${process.env.NEXT_PUBLIC_SERVER_URL}`);


  useEffect(() => {
    socket.on("filemanager", ({ filemanager }) => {
      console.log("this is filemanager", filemanager);
      setFileData(filemanager);
    });
  
    return () => socket.disconnect();
  }, [socket]);

  return (
    <div>
      <div className="">
        <div className="flex flex-wrap items-center justify-between pt-8 sm:items-end md:items-center border-t-gray-600">
          <div className=" border-t-gray-500">
            <Checkbox label="Select All" className="text-gray-900" />
          </div>
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <div className="flex flex-row items-center gap-5">
              <Button
                variant="gradient"
                className="flex flex-row items-center gap-1 px-2 py-1 text-sm text-white normal-case bg-gray-900 rounded-md"
              >
                <MdOutlineDelete className="text-[18px] text-gray-100 hover:text-red-600 cursor-pointer" />
                Delete
              </Button>

              <Select
                variant="outlined"
                label="Sort By:"
                className="text-gray-900"
              >
                <Option className="text-gray-900">Sort By Newest</Option>
                <Option className="text-gray-900">Sort By Oldest</Option>
                <Option className="text-gray-900">Sort By A-Z</Option>
                <Option className="text-gray-900">Sort By Z-A</Option>
              </Select>
            </div>
            <div class="relative flex w-full gap-2 md:w-max">
              <div class="relative h-10 w-full min-w-[288px]">
                <input
                  type="search"
                  class="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder="Search here..."
                />
              </div>
              <button
                class="!absolute right-1 top-1 select-none rounded bg-blue-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-gray-500/10 transition-all hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2 md:grid-cols-4">
          {fileData && fileData.map(({ secure_url, _id }) => (
            <div
              className="relative flex flex-col gap-4 p-4 rounded-lg shadow-sm"
              key={_id}
            >
              <div className="">
                <img
                  className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                  src={imageLink}
                  alt="gallery-photo"
                />
              </div>

              <span className="text-sm">image description.png</span>
              <div className="absolute z-10 flex flex-row items-center justify-between top-3 w-[80%]">
                <Checkbox className="cursor-pointer" />
                <MdOutlineDelete className="text-[26px] text-gray-300 hover:text-red-600 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
        <CardFooter className="flex items-center justify-between p-4 border-t border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </div>
    </div>
  );
};

export default FileComp;
