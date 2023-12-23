"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ClickableSearch = () => {
  const router = useRouter();
  return (
    <div
      class="flex items-center w-full bg-white border  border-gray-300 rounded p-2 cursor-pointer transition duration-300 hover:border-blue-500 sm:hidden"
      onClick={() => router.push("/searchproduct")}
    >
      <svg
        className="w-4 h-4 ml-2 mr-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="black"
          stroke-linecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>

      <div class="text-gray-600">Search here...</div>
    </div>
  );
};

export default ClickableSearch;
