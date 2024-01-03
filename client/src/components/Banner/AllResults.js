"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { UseProductProvider } from '../../../contexts/ProductProvider';

const AllResults = ({ isFocused,  handleFocus, searchTerm}) => {
  const modalRef = useRef(null);
   const {handleResultClick, searchResults} = UseProductProvider()
  console.log("all results", searchResults)
  
  

   const handleModalRef = () => {
     modalRef.current.style.display = "none";
     handleFocus();
  };  
  

    return (
      <>
        <div className="absolute top-[40px] z-50 right-0 left-0 mt-2 bg-white border border-gray-300 shadow-md rounded-md p-2">
          {searchResults.map((product) => (
            <div
              className="flex items-center cursor-pointer p-2 hover:bg-gray-100 rounded-md z-40"
              onClick={() => handleResultClick(searchTerm)}
              key={product._id}
            >
              <svg
                className="w-4 h-4 text-gray-500 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              {product.title}
            </div>
          ))}
        </div>
        {isFocused && (
          <div
            className="fixed inset-0 z-10 bg-black bg-opacity-30"
            onClick={handleModalRef}
            ref={modalRef}
          
          ></div>
        )}
      </>
    );
}

export default AllResults