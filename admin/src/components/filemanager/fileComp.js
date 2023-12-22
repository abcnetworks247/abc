"use client";

import { Button, Checkbox, Option, Select } from "@material-tailwind/react";
import { MdOutlineDelete } from "react-icons/md";
import React from "react";

const FileComp = () => {

  const data = [
    {
      imageLink:
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
    },
    {
      imageLink:
        "https://demos.creative-tim.com/material-kit-pro/assets/img/examples/blog5.jpg",
    },
    {
      imageLink:
        "https://material-taillwind-pro-ct-tailwind-team.vercel.app/img/content2.jpg",
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1620064916958-605375619af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1493&q=80",
    },
  ];
  
  return (
    <div>
      <div className="">
        <div className="flex flex-wrap items-center justify-between pt-8 border-t-gray-600">
          <div className=" border-t-gray-500">
            <Checkbox label="Select All" className="text-gray-900" />
          </div>
          <div className="flex flex-row items-center gap-5">
            <button
              variant=""
              className="flex flex-row items-center gap-1 px-2 py-1 text-sm text-white bg-gray-900 rounded-md"
            >
              <MdOutlineDelete className="text-[18px] text-gray-100 hover:text-red-600 cursor-pointer" />
              Delete
            </button>

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
          {data.map(({ imageLink }, index) => (
            <div
              className="relative flex flex-col gap-4 p-4 rounded-lg shadow-sm"
              key={index}
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
      </div>
    </div>
  );
};

export default FileComp;
