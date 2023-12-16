"use client"
import React from 'react'
import Navbar from '@/components/navbar/Navbar'
import NewArrival from '@/components/NewArrival/NewArrival'
import { UseProductProvider } from '../../../contexts/ProductProvider'
import SingleArrival from '@/components/NewArrival/SingleArrival'




const page = () => {
    const { searchResults } = UseProductProvider();
  return (
    <div>
       <div className="bg-white sticky top-0 z-[10] mb-10">
        <Navbar />
      </div>
      <div className="px-4 py-10 mt-12  lg:px-28">
        <h2 className="mb-6 text-xl font-medium text-gray-800">
          Results
        </h2>

        <div className="grid grid-cols-2 gap-4 px-4 lg:gap-4 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <SingleArrival key={product.id} product={product} />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default page