"use client"
import React from 'react'
import ProductDetail from './ProductDetail'
import { useContext } from 'react';
import { ProductContext } from '../../../contexts/productContext';

const ProductModal = ( ) => {
    const { isModalOpen, closeModal, selectedProduct } = useContext(ProductContext);

    if (!isModalOpen || !selectedProduct) {
        return null; 
      }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0  bg-white/50 backdrop-blur-lg backdrop-saturate-150  z-[1000] flex justify-center items-center">
        <div className="w-full max-w-5xl h-full overflow-auto p-6 bg-white rounded-lg">
        <ProductDetail
        />
        </div>  
  </div>
  )
}

export default ProductModal