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
import Swal from "sweetalert2";

const FileComp = ({ fileData }) => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [checkurl, setCheckUrl] = useState([]);

  const handleFileCheck = function (imageurl) {
    let imgurl = String(imageurl);

    setCheckUrl((prevCheckurl) => {
      if (!prevCheckurl.includes(imgurl)) {
        console.log("This is the check array", [imgurl, ...prevCheckurl]);
        return [imgurl, ...prevCheckurl];
      } else {
        const filteredCheckurl = prevCheckurl.filter((url) => url !== imgurl);
        console.log("Removed from check array", filteredCheckurl);
        return filteredCheckurl;
      }
    });
  };

  const handleSingleDelete = function (id) {
    console.log("this is the image id", id);
    Swal.fire({
      title: "Are you sure?",
      text: "your file will be deleted after this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const response = axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/account`,
            {
              headers: {
                Authorization: `Bearer ${String(token)}`,
              },
            }
          );

          if (response.status !== 200) {
            console.log("opps something went wrong, try again");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="#">Why do I have this issue?</a>',
            });
          }

          Cookies.remove("authtoken");
          if (typeof window !== "undefined") {
            window.location.reload();
          }

          Swal.fire({
            title: "We hate to see you go!",
            text: "Your account has been deleted",
            icon: "success",
          });
        } catch (error) {}
      }
    });
  };

  const handleSelectAll = () => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = fileData.slice(indexOfFirstItem, indexOfLastItem);

  const allImageUrls = currentItems.map((item) => String(item.secure_url));

  if (checkurl.length === allImageUrls.length) {
    // If all items on the current page are already selected, clear the array
    setCheckUrl([]);
  } else {
    // If not all items on the current page are selected, add them to the array
    setCheckUrl(allImageUrls);
  }
};

  if (!fileData) {
    // If fileData is not available yet, you can return a loading state or null
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
    ); // or return null;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = fileData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="">
        <div className="flex flex-wrap items-center justify-between pt-8 sm:items-end md:items-center border-t-gray-600">
          <div className=" border-t-gray-500">
            <Checkbox
              label="Select All"
              className="text-gray-900"
              checked={checkurl.length === fileData.length}
              onChange={handleSelectAll}
            />
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
            <div className="relative flex w-full gap-2 md:w-max">
              <div className="relative h-10 w-full min-w-[288px]">
                <input
                  type="search"
                  className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder="Search here..."
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
            currentItems.map(({ secure_url, _id, originalname }) => (
              <div
                className="relative flex flex-col gap-4 p-4 rounded-lg shadow-sm"
                key={_id}
              >
                <div>
                  <img
                    className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                    src={secure_url}
                    alt="gallery-photo"
                  />
                </div>

                <span className="w-[80%] overflow-hidden text-sm whitespace-nowrap text-ellipsis">
                  {originalname}
                </span>
                <div className="absolute z-10 flex flex-row items-center justify-between top-3 w-[80%]">
                  <Checkbox
                    className="cursor-pointer"
                    onChange={() => {
                      let imageurl = secure_url;
                      handleFileCheck(imageurl);
                    }}
                  />

                  {checkurl.length === 0 && (
                    <MdOutlineDelete
                      className="text-[26px] text-gray-300 hover:text-red-600 cursor-pointer"
                      onClick={() => {
                        let id = _id;
                        handleSingleDelete(id);
                      }}
                    />
                  )}
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

export default FileComp;
