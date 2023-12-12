"use client"
import React from 'react'
import SingleArrival from './SingleArrival'
import { useContext } from 'react'
import { ProductContext } from '../../../contexts/productContext'


const NewArrival = () => {
     
    const {products} = useContext(ProductContext)
    
  return (
    <div className=" py-10  lg:px-28" >
    <h2 className="text-xl font-medium text-gray-800  mb-6">Top new arrival</h2>
            
        <div className="grid grid-cols-2 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

            {products.length > 0 ? (
                products.map(product => <SingleArrival key={product.id} product={product} />)
                ) : (
                <p>Loading...</p>
            )}
        
        </div>
</div>
  )
}

export default NewArrival