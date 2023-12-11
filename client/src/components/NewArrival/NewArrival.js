"use client"
import React from 'react'
import SingleArrival from './SingleArrival'
import { useContext } from 'react'
import { ProductContext } from '../../../contexts/productContext'


const NewArrival = () => {
     
    const {products} = useContext(ProductContext)
    
  return (
    <div className="container pb-16 " >
    <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">top new arrival</h2>
            
        <div className="grid grid-cols-1 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">

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