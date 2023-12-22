"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

const AllResults = ({ searchResults, setSearchResults }) => {
    
    const router = useRouter()
    const handleRoute = () => {
       router.push("/searchResults")
      setSearchResults(searchResults);
      console.log("route change")
       
    };

    return (
      <>
          <div
            className="absolute top-[40px] z-40 right-0 left-0 mt-2 bg-white border border-gray-300 shadow-md rounded-md p-2"
            >
                
            {searchResults.map((product) => (
              <div
                className="flex items-center cursor-pointer p-2 hover:bg-gray-100 rounded-md z-40"
                onClick={() => handleRoute()}
                key={product.id}
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
         
         
      </>
    );
}

export default AllResults