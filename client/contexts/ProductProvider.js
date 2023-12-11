"use client"
import React from 'react'
import { ProductContext } from './productContext'
import { useEffect } from 'react'
import { useState } from 'react'

const ProductProvider = ({children}) => {

const [products, setProducts] = useState([])
const [hasFetchedData, setHasFetchedData] = useState(false);

useEffect(() => {
    if (!hasFetchedData) {
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
          setProducts(json);
          setHasFetchedData(true); // Update state to indicate that data has been fetched
        });
    }
  }, [hasFetchedData]);


  return (
    
    <ProductContext.Provider
    value={{
        products, 
        setProducts
      }}
    >
         {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider