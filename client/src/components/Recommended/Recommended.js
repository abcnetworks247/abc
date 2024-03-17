"use client"

import React from 'react'
import SingleRecommend from './SingleRecommend'
import SingleArrival from '../NewArrival/SingleArrival'
import { useContext } from 'react'
import { ProductContext } from '../../../contexts/productContext'
import { UseProductProvider } from '../../../contexts/ProductProvider'
import LoadingSkeleton from '../NewArrival/Loadingskeleton'

const Recommended = () => {
  const { products } = UseProductProvider()
    const numberOfSkeletons = 4;
   
  return (
    <div className=" py-10 px-4 lg:px-28">
      <h2 className="text-xl font-semibold text-gray-800  mb-6">
        Recomended for you
      </h2>
      <div className="grid grid-cols-2 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.length > 0 ? (
          products
            .slice(0, 4)
            .map((product) => (
              <SingleArrival key={product._id} product={product} />
            ))
        ) : (
          <LoadingSkeleton numberOfSkeletons={numberOfSkeletons} />
        )}
        {/* the end */}
      </div>
    </div>
  );
}

export default Recommended
