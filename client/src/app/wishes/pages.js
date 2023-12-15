"use client"
import React from 'react'
import Navbar from '@/components/navbar/Navbar'

const pages = () => {

  
  return (
    <div>
      <Navbar />
      <p>anything</p>
      {/* <div className=" py-10 px-4  lg:px-28 bg-gray-50">
        <h2 className="text-xl font-medium text-gray-800  mb-6">
          Saved Items
        </h2>

        <div className="grid px-4  grid-cols-2 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Wishlist.length > 0 ? (
            Wishlist.map((product) => (
              <Wishlistcard key={product.id} product={product} />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div> */}
    </div>
  );
}

export default pages