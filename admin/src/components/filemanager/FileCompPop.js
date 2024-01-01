"use client";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Button,
  CardFooter,
  Checkbox,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { MdOutlineDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { usePathname, useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";

const FileCompPop = ({ setThumbnail, handleOpen, setGallery, setImageSrc }) => {
  const [fileData, setFileData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkurl, setCheckUrl] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const socket = io.connect(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);

    const handleFileManagerUpdate = (data) => {
      console.log("This is filemanager", data);
      setFileData(data);
    };

    socket.on("filemanager", handleFileManagerUpdate);

    return () => {
      socket.off("filemanager", handleFileManagerUpdate);
    };
  }, []);

  const itemsPerPage = 12;

  const handleFileCheck = (item) => {
    setCheckUrl((prevCheckUrl) => {
      if (!prevCheckUrl.find((url) => url._id === item._id)) {
        console.log("This is the check array", [...prevCheckUrl, item]);
        return [...prevCheckUrl, item];
      } else {
        const filteredCheckUrl = prevCheckUrl.filter(
          (url) => url._id !== item._id
        );
        console.log("Removed from check array", filteredCheckUrl);
        return filteredCheckUrl;
      }
    });
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const HandleAdd = () => {
    if (typeof window !== "undefined") {
      const fragment = window.location.hash;
      const valueWithoutPrefix = fragment.replace("#value=", "");

      if (valueWithoutPrefix === "thumbnail") {
        if (checkurl.length === 1) {
          let newthumbnail = checkurl.slice(0, 1);
          setThumbnail(newthumbnail[0].secure_url);
          handleOpen(null);
        } else {
          alert("You can only select 1 product thumbnail");
        }
      }

      if (valueWithoutPrefix === "gallery") {
        if (checkurl.length === 3) {
          let newgallery = checkurl.slice(0, 3);
          setGallery(newgallery);
          handleOpen(null);
        } else {
          alert("You can only select 3 product gallery");
        }
      }

      if (valueWithoutPrefix === "newsimage") {
        if (checkurl.length === 1) {
          let newsimage = checkurl.slice(0, 1);
          setImageSrc(newsimage[0].secure_url);
          handleOpen(null);
        } else {
          alert("You can only select 1 news image");
        }
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortedItems = Array.isArray(fileData)
    ? [...fileData].sort((a, b) => {
        const aValue = a[sortOption] ?? "";
        const bValue = b[sortOption] ?? "";

        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      })
    : [];

  const filteredItems = (fileData || []).filter((item) => {
    const originalname = item?.originalname || ""; // Ensure originalname is defined

    return originalname.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!fileData) {
    return (
      <div className="flex items-center justify-center h-full">
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
    );
  }

  return (
    <div>
      <div className="h-[70vh]">
        <div className="flex flex-wrap items-center justify-between pt-8 border-t-gray-600">
          <div className="flex flex-row items-center gap-3 ml-4">
            {checkurl.length > 0 ? (
              <button
                variant=""
                className="flex flex-row items-center gap-1 px-2 py-1 pr-2 text-sm text-white bg-green-600 rounded-md"
                onClick={() => HandleAdd()}
              >
                <IoAdd className="text-[18px] text-gray-100 cursor-pointer" />
                Add
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-row items-center gap-5">
            <Select
              variant="outlined"
              label="Sort By:"
              className="text-gray-900"
              value={sortOption}
              onChange={(value) => handleSortChange(value)}
            >
              <Option className="text-gray-900">Sort By Newest</Option>
              <Option className="text-gray-900">Sort By Oldest</Option>
            </Select>
            <div className="relative flex w-full gap-2 md:w-max">
              <div className="relative h-10 w-full min-w-[288px]">
                <input
                  type="search"
                  className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder="Search here..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="!absolute right-1 top-1 select-none rounded bg-blue-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-gray-500/10 transition-all hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {currentItems &&
            currentItems.map((item) => (
              <div
                className="relative flex flex-col gap-4 p-4 rounded-lg shadow-sm"
                key={item._id}
              >
                <div>
                  <img
                    className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                    src={item.secure_url}
                    alt="gallery-photo"
                  />
                </div>

                <span className="w-[80%] overflow-hidden text-sm whitespace-nowrap text-ellipsis">
                  {item.originalname}
                </span>
                <div className="absolute z-10 flex flex-row items-center justify-between top-3 w-[80%]">
                  <Checkbox
                    className="cursor-pointer"
                    onChange={() => {
                      handleFileCheck(item);
                    }}
                  />
                  <></>
                </div>
              </div>
            ))}
        </div>
        <CardFooter className="flex items-center justify-between p-4 border-t border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {Math.ceil(fileData.length / itemsPerPage)}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= fileData.length}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </div>
    </div>
  );
};

export default FileCompPop;
