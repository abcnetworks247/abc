"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import AllResults from "./AllResults";
import { useRouter } from "next/navigation";
import { UseProductProvider } from "../../../contexts/ProductProvider";
import Link from "next/link";

const SearchBar = () => {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { searchResults, handleSearch, allProducts, handleResultClick } = UseProductProvider()
  
  console.log("searchbar", searchResults)
  console.log("handleSearch", handleSearch)
  const dropDownRef = useRef(null);

  const handleDropdownRef = () => {
    dropDownRef.current.style.display = "none";
    handleDropdown();
  }; 

  const handleFocus = () => {
    setIsFocused((prev) => !prev);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const [isDropdown, setIsDropdown] = useState(false);
  const handleDropdown = () => {
    setIsDropdown((prev) => !prev);
  };

 const hasSearchResults = searchResults && searchResults.length > 0;


   



  return (
    <>
      {/* <form
        className={`${isFocused && "z-40"}  ${
          isDropdown && "z-[]"
        } hidden sm:block transition-all duration-300 relative`}
      > */}
      <form
        className={`${
          isFocused && "z-40"
        }  transition-all duration-300 relative border w-[90%] lg:w-[70%] h-10 bg-white gap-6 mx-auto border-gray-200 rounded-md`}
      >
        <div className="flex items-center relative h-full w-full cursor-pointer">
          <div
            onClick={handleDropdown}
            className="flex flex-row items-center h-full gap-4 text-sm font-medium text-gray-900 bg-gray-200 px-2 rounded-l-md"
          >
            <span>All</span>

            <svg
              className="w-2.5 h-2.5 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </div>{" "}
          {isDropdown && (
            <>
              <div
                id="dropdown"
                className={` absolute top-10 left-0 bg-white divide-y divide-gray-100  shadow w-44 border`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  {Array.from(
                    new Set(allProducts.map((product) => product.category))
                  ).map((category) => (
                    <li key={category}>
                      <Link
                        href={`/store/category/${category}`}
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          <div
            className={`relative grow flex flex-row justify-between h-full rounded-r-lg w-fit pl-2 ${
              isFocused && "z-40"
            }`}
          >
            <input
              type="search"
              id="search-dropdown"
              className="outline-none grow text-sm bg-transparent text-gray-900  placeholder-gray-400  "
              placeholder="Search here..."
              onFocus={handleFocus}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch(searchTerm);
              }}
            />{" "}
            <button
              onClick={(e) => handleResultClick(searchTerm, e)}
              className="bg-red-600 h-full w-8 flex items-center justify-center rounded-r-md shrink-0"
            >
              <svg
                className="w-4 h-full "
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
            </button>
          </div>
        </div>
        {isFocused && hasSearchResults && searchTerm && (
          <AllResults
            hasSearchResults={hasSearchResults}
            isFocused={isFocused}
            handleFocus={handleFocus}
            searchTerm={searchTerm}
          />
        )}
      </form>

      {/* {isFocused &&  (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-30"
          onClick={handleModalRef}
        ></div>
      )} */}
      {isDropdown && (
        <div
          className="fixed top-12 z-10 bg-black bg-opacity-30"
          ref={dropDownRef}
          onClick={handleDropdownRef}
        ></div>
      )}
    </>
  );
};

export default SearchBar;
