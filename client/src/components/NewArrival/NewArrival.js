"use client"
import React from 'react'
import SingleArrival from './SingleArrival'
import { useContext } from 'react'
import { ProductContext } from '../../../contexts/productContext'
import LoadingSkeleton from './Loadingskeleton'


const NewArrival = () => {
     
  const { products } = useContext(ProductContext)
  const numberOfSkeletons = 10
    
  return (
    <>
      <h2 className="text-xl font-medium text-gray-800  mb-6">
        Top new arrival
      </h2>

      <div className=" py-10  px-2  lg:px-28 bg-gray-50">
        {products.length > 0 ? (
          <div className="grid  px-2 sm:px-4  grid-cols-2 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.map((product) => (
              <SingleArrival key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <LoadingSkeleton numberOfSkeletons={numberOfSkeletons} />
        )}
      </div>
    </>
  );
}

export default NewArrival