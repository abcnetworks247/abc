"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import AllResults from "./AllResults";
import { UseProductProvider } from "../../../contexts/ProductProvider";
import { useRouter } from "next/navigation";


const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { searchProducts, setSearchResults, searchResults } = UseProductProvider();
  // const searchBarRef = useRef(null);
  
   const router = useRouter();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

 
  
  
  const hasSearchResults = searchResults && searchResults.length > 0;
  
  

  const handleSearch = (e) => {
    const query = e.target.value;
    if (!query || query === "") {
      // If the query is empty, clear the searchResults
      setSearchResults([]);
    } else {
      // If there is a query, perform the search
      searchProducts(query);
    }
  };
  return (
    <>
      <form
        className={`${
          isFocused ? "z-20" : "z-10"
        } hidden sm:block transition-all duration-300 relative`}
      
      >
        <div className="flex h-full">
          <label
            for="search-dropdown"
            className="mb-2 text-sm font-medium sr-only dark:text-white"
          >
            Your Email
          </label>
          {/* <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          className="flex-shrink-0  inline-flex items-center 
        h-full py-2   bg-opacity-25 border border-gray-300  
        hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:hover:bg-gray-600
"
          type="button"
        ></button> */}
          <div className="h-full px-4 flex flex-row rounded-s-lg items-center justify-center gap-2 mr-1 text-sm font-medium  text-center text-gray-900 bg-white">
            All categories{" "}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </div>
          <div
            id="dropdown"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdown-button"
            >
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Mockups
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Templates
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Design
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Logos
                </button>
              </li>
            </ul>
          </div>
          <div className="relative w-fit h-full flex flex-row rounded-r-lg">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-[30vw] py-2 bg-white outline-none border-none  text-lg text-gray-900 rounded-e-xl border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search here..."
              required
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleSearch}
            />{" "}
            <button className="bg-blue-500 absolute right-0 top-0 h-full  w-[4vw] flex items-center justify-center  rounded-e-lg">
              <svg
                className="w-6 h-6 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
        {hasSearchResults && (
          <AllResults
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            isFocused={isFocused}
          />
        )}
      </form>

      {isFocused && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10"
          onClick={handleBlur}
        ></div>
      )}
    </>
  );
};

export default SearchBar;
