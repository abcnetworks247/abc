"use client";

import {
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const page = () => {
  const [allproductCategory, setAllProductCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadState, setUploadState] = useState(null);
  const [name, setName] = useState("");
  const [editname, setEditName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [editid, setEditid] = useState(null);
  const handleOpen = () => setOpen(!open);

  const token = Cookies.get("adminToken");

  useEffect(() => {
    const HandleFetch = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admin/category/product/category`
        );

        if (response.status === 200) {
          setAllProductCategory(response.data.data);
        }
      } catch (error) {}
    };

    HandleFetch();
  });

  const handleCreate = async () => {
    try {
      console.log("Name:", name);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admin/category/product/category`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${String(token)}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response Data:", response.data);

      if (response.status === 201) {
        setName("");

        // if (typeof window !== "undefined") {
        //   window.location.reload();
        // }
      } else {
        console.error("Unexpected response status:", response.status);
        // Handle the unexpected status code appropriately
      }
    } catch (error) {
      console.error("Error creating category:", error);
      // Handle the error or show an error message to the user
    }
  };

  const handleDelete = async (newid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          console.log("ID:", newid);

          const response = axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admin/category/product/category`,
            {
              data: { id: newid }, // Send id in the request body
              headers: {
                Authorization: `Bearer ${String(token)}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Response Data:", response.data);

          if (response.status === 200) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="#">Why do I have this issue?</a>',
            });
            // if (typeof window !== "undefined") {
            //   window.location.reload();
            // }
          } else {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          console.error("Error deleting category:", error);
          // Handle the error or show an error message to the user
        }
      }
    });
  };

  const handleEdit = (newid) => {
    console.log(newid);
    try {
      console.log("ID:", newid);

      const fildata = {
        id: newid,
        name: editname,
      };

      const response = axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admin/category/product/category`,
        fildata,
        {
          // Send id in the request body
          headers: {
            Authorization: `Bearer ${String(token)}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response Data:", response.data);

      if (response.status !== 200) {
        setUploadState("File Uploaded Successfully 🎉🎉");
        setSuccessful(true);
        handleOpen(null);
        setLoading(false);

        // if (typeof window !== "undefined") {
        //   window.location.reload();
        // }
      } else {
        setLoading(false);
        setUploadState("Error: Try again later");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      // Handle the error or show an error message to the user
    }
  };

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-10 px-5 mt-10 md:flex-row">
        <div className="flex flex-col items-start justify-start w-full p-8">
          <h1 className="mb-4 ml-5 text-lg font-semibold" Name>
            All Product Category
          </h1>

          {allproductCategory && (
            <div className="w-full overflow-hidden bg-white shadow sm:rounded-md overflow-y-auto max-h-[60vh]">
              <ul>
                {allproductCategory.map((item) => (
                  <li key={item.id} className="border border-b border-gray-200">
                    <div className="px-4 py-3 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="max-w-2xl mt-1 text-sm font-semibold text-gray-500">
                          {item.name}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-sm font-medium text-gray-500">
                          Status: <span className="text-green-600">Active</span>
                        </p>

                        {item.name === "Uncategorized" ? (
                          <></>
                        ) : (
                          <div className="flex flex-row items-start gap-4">
                            <Tooltip content="Edit">
                              <IconButton
                                variant="text"
                                onClick={() => {
                                  setEditName(item.name);
                                  handleOpen();
                                }}
                              >
                                <FiEdit className="text-xl text-indigo-500 cursor-pointer indigo-600" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Delete">
                              <IconButton
                                variant="text"
                                onClick={() => {
                                  let id = item._id;
                                  handleDelete(id);
                                }}
                              >
                                <MdOutlineDeleteForever className="text-xl text-red-600 cursor-pointer indigo-600" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        )}
                      </div>
                    </div>
                    <Dialog open={open} handler={handleOpen}>
                      <DialogHeader>Edit Category.</DialogHeader>
                      <DialogBody>
                        <div
                          className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm"
                          Name
                        >
                          <h1 className="mb-4 text-lg font-semibold" Name>
                            Update this Category
                          </h1>
                          <p className="mb-6 text-sm text-gray-600" Name>
                            this category will be associated to your product
                            when created.
                          </p>
                          <div className="mb-4" Name>
                            <input
                              type="text"
                              placeholder="write here..."
                              value={editname}
                              className="w-full px-4 py-2 text-gray-700 border rounded-lg email-input focus:border-blue-500"
                              onChange={(e) => setEditName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </DialogBody>
                      <DialogFooter>
                        <div className="flex flex-row justify-between w-full mt-10">
                          {!loading && <div className=""></div>}

                          <div className="flex flex-row items-center gap-4 ml-5">
                            {loading && <Spinner />}
                            <span className="text-sm"> {uploadState}</span>
                          </div>

                          <div className="">
                            <Button
                              variant="text"
                              color="red"
                              onClick={() => handleOpen(null)}
                              className="mr-1"
                            >
                              <span>Cancel</span>
                            </Button>
                            <Button
                              variant="gradient"
                              onClick={() => {
                                let id = item._id;
                                handleEdit(id);
                              }}
                              disabled={!editname}
                              className={`${
                                !editname
                                  ? "cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                            >
                              <span>Upload</span>
                            </Button>
                          </div>
                        </div>
                      </DialogFooter>
                    </Dialog>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="w-full">
          <div className="flex items-center justify-start">
            <div
              className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm"
              Name
            >
              <h1 className="mb-4 text-lg font-semibold" Name>
                Create New Category
              </h1>
              <p className="mb-6 text-sm text-gray-600" Name>
                this category will be associated to your product when created.
              </p>
              <div className="mb-4" Name>
                <input
                  type="text"
                  placeholder="write here..."
                  className="w-full px-4 py-2 text-gray-700 border rounded-lg email-input focus:border-blue-500"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <button
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                onClick={handleCreate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=""></div>
    </div>
  );
};

export default page;
