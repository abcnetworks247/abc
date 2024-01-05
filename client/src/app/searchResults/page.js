"use client"
import React from 'react'
import Navbar from '@/components/navbar/Navbar'
import NewArrival from '@/components/NewArrival/NewArrival'

import SingleArrival from '@/components/NewArrival/SingleArrival'
import LoadingSkeleton from '@/components/NewArrival/Loadingskeleton'
import FooterComp from '@/components/Footer/FooterComp'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { UseProductProvider } from '../../../contexts/ProductProvider'
import Link from 'next/link'
import ProductNav from '@/components/Products/ProductNav'



const page = () => {
   
  const { searchResults, handleSearch, setSearchResult } = UseProductProvider()
  
  const params = useSearchParams()

  const searchTerm = params.get("term")
  console.log("result page", searchTerm)

 const hasResults =
   searchResults &&
   searchResults.some((product) => product.title.includes(searchTerm));

  useEffect(() => {
   console.log("useEffect triggered with searchTerm:", searchTerm);
   if (!searchResults) {
       console.log("useeffect", searchTerm);
       handleSearch(searchTerm);
    }
    
}, []);

  

 
 

  
  
  const numberOfSkeletons= 5
  return (
    <div className="relative bg-gray-50">
      <div className="bg-white sticky top-0 z-[10] mb-10">
        <Navbar />
      </div>
      <ProductNav /> 
      <div className="mx-6 mb-2 bg-white p-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li>
              <div className="flex items-center">
                <Link
                  href="/store"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Store
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                  {searchTerm}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="px-2 py-2 lg:px-28 h-full">
        {hasResults ? (
          <div className="px-2 grid grid-cols-2 gap-4 sm:px-4 lg:gap-4 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {searchResults.map((product) => (
              <SingleArrival key={product.id} product={product} />
            ))}
          </div>
        ) : searchResults === null ? (
          // Loading state
          <LoadingSkeleton numberOfSkeletons={numberOfSkeletons} />
        ) : (
          // No results found
          <div className="text-center mt-8">
            <div>
              <h3>Hmmm...</h3>
              <p className="text-gray-500">
                We couldn't find any match for "{searchTerm}".
              </p>
              <p className="text-sm text-gray-500">
                {" "}
                Double check your search for any typos or spelling error - or
                try a different search term
              </p>
            </div>

            {/* You can add additional suggestions or links here */}
          </div>
        )}
      </div>
      <FooterComp />
    </div>
  );
}

export default page