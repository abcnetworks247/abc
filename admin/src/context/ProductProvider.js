"use client"
import React from 'react'
import { useContext } from 'react'
import { createContext } from 'react'



const ProductContext = createContext()

const ProductProvider = ({ children }) => {
 
 
  return (
    <ProductContext.Provider
      value={{
     
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

/**
 * Returns the product provider from the React context.
 * @returns {Object} The product provider.
 */
export function UseProductProvider() {
  return useContext(ProductContext);
}