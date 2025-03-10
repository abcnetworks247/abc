"use client";

import { Router } from "next/router";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Editform = ({
  formData,
  handleEdit,
  setFormData,
  handleInputChange,
  handleSubmit,
  handleImageChange,
  selectedPhoto,
  loading,
  setLoading,
}) => {
  const router = useRouter();
  // const inputRef = useRef(null)
  console.log("formdata edit", formData);
  return (
    // <form className="max-w-md mx-auto" onSubmit={handleSubmit}>

    <form
      className="mx-auto"
      onSubmit={(e) => handleSubmit(e)}
      encType="multipart/form-data"
    >
      <div className="flex items-center justify-between mb-2 cursor-pointer lg:flex-row-reverse ">
        {/* edit */}
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200"
          onClick={() => handleEdit()}
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#737373"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
                fill="#737373"
              ></path>
            </g>
          </svg>
        </div>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          className="w-full px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
          type="text"
          name="fullname"
          placeholder="Fulll name"
          value={formData.fullname}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      {/* First and last name */}

      {/* Email address */}

      <div className="relative z-0 w-full mb-5 group">
        <input
          className="w-full px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
          type="text"
          name="email"
          placeholder="Email"
          value={formData?.email}
          onChange={(e) => handleInputChange(e)}
          readOnly
        />
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          className="w-full px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
          type="text"
          name="phonenumber"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor=""
          className="block mb-2 text-sm font-medium dark:text-gray-400"
        >
          Shipping Address
        </label>
        <textarea
          name="shippingaddress"
          value={formData?.shippingaddress}
          onChange={(e) => handleInputChange(e)}
          type="text"
          placeholder=" Enter our shipping address.."
          className="w-full px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
        ></textarea>
      </div>

      <div className="mb-6 ">
        <label
          htmlFor=""
          class="block mb-2 text-sm font-medium dark:text-gray-400"
        >
          Profile picture
        </label>
        <div className="py-2 shrink-0">
          <img
            src={selectedPhoto ? selectedPhoto : formData.userdp}
            alt=""
            className="object-cover rounded-full w-11 h-11"
          />
        </div>
        <label htmlFor="" className="block pt-2">
          <input
            type="file"
            onChange={(e) => handleImageChange(e)}
            id="userphoto"
            name="userphoto"
            accept="image/*"
            className="block w-full text-sm text-slate-500 "
          />
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Save
      </button>
    </form>
  );
};

export default Editform;
