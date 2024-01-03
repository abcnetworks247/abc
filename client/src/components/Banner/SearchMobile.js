"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { UseProductProvider } from "../../../contexts/ProductProvider";
import Link from "next/link";
import { useState } from "react";

const SearchMobile = () => {
  const { handleSearch, setSearchResults, allProducts } = UseProductProvider();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  

  return (
    <form className="sm:hidden h-12 border border-blue-100 shadow-sm p-3">
      <div class="flex items-center justify-between bg-white h-full px-4">
        {/* <!-- Left Arrow Icon --> */}
        <div onClick={() => router.back()}>
          <svg
            className="w-4 h-4 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="white"
              stroke-linecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        {/* <!-- Search Bar --> */}
        <input
          type="text"
          className=" h-full bg-transparent focus:outline-none "
          placeholder="Search..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(searchTerm);
          }}
          autoFocus
        />

        {/* <!-- Search Icon --> */}
        <svg
          className="text-gray-500 w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
      </div>
    </form>
  );
};

export default SearchMobile;
