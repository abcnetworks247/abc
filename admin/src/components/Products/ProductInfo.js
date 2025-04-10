"use client";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { IconButton, Tooltip } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProductInfo = ({ title, category, id, price, handleRefresh }) => {

  const router = useRouter()
  const handleDelete = async (productId) => {
    try {
      const adminToken = Cookies.get("adminToken");
  
      // Show confirmation dialog using SweetAlert2
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Your product will be deleted after this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#000000",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete!",
      });
  
      // If user confirmed the deletion
      if (result.isConfirmed) {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER_URL}admin/commerce/products`,
          {
            headers: {
              Authorization: `Bearer ${String(adminToken)}`,
              "Content-Type": "application/json",
            },
            data: { id: productId },
          }
        );
  
        // Check if the deletion was successful (HTTP status code 204)
        if (response.status === 204) {
          // Show success message using SweetAlert2
          Swal.fire({
            title: "Successful!",
            text: "Your product has been deleted",
            icon: "success",
          });
  
          // Reload the page if it's in a browser environment
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        } else {
          // Show an error message using SweetAlert2 for unsuccessful deletion
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      }
    } catch (error) {
      console.error("Error during product deletion:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleEdit = (id) => {
    router.push(`/dashboard/eccomerce/editproduct/?id=${id}`)
  }

  const handleOpen = (id) => {
    router.push(`/dashboard/eccomerce/editproduct/?id=${id}`);
  };
  
  return (
    <>
      <tr className="hover:bg-gray-100">
        <td className="p-4 w-4">
          <div className="flex items-center">
            <input
              id="checkbox-{{ .id }}"
              aria-describedby="checkbox-1"
              type="checkbox"
              className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
            />
            <label htmlFor="checkbox-{{ .id }}" className="sr-only">
              checkbox
            </label>
          </div>
        </td>
        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
          <div className="text-sm font-normal text-gray-500">{title}</div>
        </td>
        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
          <div className="text-sm font-normal text-gray-500">{category}</div>
        </td>
        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
          {id}
        </td>
        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-700">
          {price}
        </td>
        <td className="p-4 whitespace-nowrap space-x-2">
          <Tooltip content="View">
            <IconButton variant="text">
              <Link
                href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/productdetails/?id=${id}`}
                target="_blank"
              >
                <svg
                  className="w-5 h-5 cursor-pointer"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#737373"
                  // onClick={() => handleOpen(id)}
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z"
                      stroke="#737373"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="#737373"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                  </g>
                </svg>
              </Link>

              {/* <PencilIcon className="h-4 w-4" /> */}
            </IconButton>
          </Tooltip>

          <Tooltip content="Edit">
            <IconButton variant="text">
              <svg
                onClick={() => handleEdit(id)}
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                />
              </svg>

              {/* <PencilIcon className="h-4 w-4" /> */}
            </IconButton>
          </Tooltip>

          <Tooltip content="Delete">
            <IconButton variant="text">
              <svg
                width="64px"
                height="64px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
                className="h-5 w-5"
                onClick={() => handleDelete(id)}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M10 12V17"
                    stroke="#000000"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                  <path
                    d="M14 12V17"
                    stroke="#000000"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                  <path
                    d="M4 7H20"
                    stroke="#000000"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                  <path
                    d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                    stroke="#000000"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                  <path
                    d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                    stroke="#000000"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </g>
              </svg>

              {/* <PencilIcon className="h-4 w-4" /> */}
            </IconButton>
          </Tooltip>
        </td>
      </tr>
    </>
  );
};

export default ProductInfo;
