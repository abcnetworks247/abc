"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { UseProductProvider } from '../../../contexts/ProductProvider'
import Link from 'next/link'

const SearchMobile = () => {

  
  const { searchProducts, setSearchResults } = UseProductProvider();
  const router = useRouter()
    
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
    <form className="sm:hidden h-12 border border-blue-100 shadow-sm ">
      <div class="flex items-center justify-between bg-white h-full px-4 ">
        {/* <!-- Left Arrow Icon --> */}
        <div onClick={() => router.push("/store")}>
          <svg
            className="text-gray-500 w-6 h-4"
            fill="none"
            stroke="blue"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
        </div>

        {/* <!-- Search Bar --> */}
        <input
          type="text"
          className=" h-full bg-transparent focus:outline-none "
          placeholder="Search..."
          onChange={handleSearch}
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
}

export default SearchMobile