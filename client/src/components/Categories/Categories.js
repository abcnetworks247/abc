"use client"
import React from 'react'
import SingleCategory from './SingleCategory'
import { useContext } from 'react'
import { ProductContext } from '../../../contexts/productContext'
import { useEffect } from 'react'

const Categories = () => {
    const { products } = useContext(ProductContext);

    useEffect(()=>{
        console.log(products)
    }, [products])
    
  return (
    <div className="container py-14">
    <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">shop by category</h2>
    <div className="grid grid-cols-4 gap-4">
      
         {products.length > 0 ? (
          products.map(product => <SingleCategory key={product.id} product={product} />)
        ) : (
          <p>Loading...</p>
        )}

         
        
    </div>
</div>
  )
}

export default Categories