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


const page = () => {
   
  const { searchResults, handleSearch, setSearchResult } = UseProductProvider()
  
  const params = useSearchParams()

  const searchTerm = params.get("term")
  console.log("result page", searchTerm)


  useEffect(() => {
   console.log("useEffect triggered with searchTerm:", searchTerm);
   if (!searchResults) {
       console.log("useeffect", searchTerm);
       handleSearch(searchTerm);
    }
    
}, []);

  

 
 

  
  
  const numberOfSkeletons= 5
  return (
    <div className="bg-gray-50">
      <div className="bg-[#111827] sticky top-0 z-[10] mb-10">
        <Navbar />
      </div>
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
        {searchResults.length > 0 ? (
          <div className="px-2  grid grid-cols-2 gap-4 sm:px-4 lg:gap-4 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {searchResults.map((product) => (
              <SingleArrival key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <LoadingSkeleton numberOfSkeletons={numberOfSkeletons} />
        )}
      </div>
      <FooterComp />
    </div>
  );
}

export default page