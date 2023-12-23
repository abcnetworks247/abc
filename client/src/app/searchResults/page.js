"use client"
import React from 'react'
import Navbar from '@/components/navbar/Navbar'
import NewArrival from '@/components/NewArrival/NewArrival'
import { UseProductProvider } from '../../../contexts/ProductProvider'
import SingleArrival from '@/components/NewArrival/SingleArrival'
import LoadingSkeleton from '@/components/NewArrival/Loadingskeleton'
import FooterComp from '@/components/Footer/FooterComp'




const page = () => {
  const { searchResults } = UseProductProvider();
  const numberOfSkeletons= 5
  return (
    <div>
      <div className="bg-white sticky top-0 z-[10] mb-10">
        <Navbar />
      </div>
      <div className="mx-6 mb-2 ">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            {/* <li className="inline-flex items-center">
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </a>
              </li> */}
            <li>
              <div className="flex items-center">
                {/* <svg
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
                  </svg> */}
                <a
                  href="/store"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  All Products
                </a>
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
                   search
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="bg-gray-700 py-6 px-2">
        <h2 className="text-sm sm:text-md lg:text-lg font-medium text-white ">
          Search Results
        </h2>
      </div>
      <div className="px-2 py-10 mt-12  lg:px-28 bg-gray-50 h-full">
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