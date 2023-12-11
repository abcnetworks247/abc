"use client"
import React from 'react'
import { ProductContext } from './productContext'
import { useEffect } from 'react'
import { useState } from 'react'

const ProductProvider = ({children}) => {

const [products, setProducts] = useState([])
const [hasFetchedData, setHasFetchedData] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);

const handleProductClick = (product) => {
    setSelectedProduct(product);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


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
        setProducts,
        selectedProduct,
        isModalOpen,
        handleProductClick,
        openModal,
        closeModal
        

      }}
    >
         {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider