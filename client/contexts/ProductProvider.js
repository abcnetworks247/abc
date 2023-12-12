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
const [cartProducts, setCartProducts] = useState([]);

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

  const addToCart = (product) => {
    setCartProducts(prev => [...prev, product]); 
  }

  
  const handleCartClick = (event, product) => {
    event.stopPropagation()
    addToCart(product);
    console.log(product)
  }


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

  useEffect(()=>{
    console.log(cartProducts)
  },[cartProducts])


  return (
    
    <ProductContext.Provider
    value={{
        products, 
        cartProducts,
        selectedProduct,
        isModalOpen,
        setProducts,
        handleProductClick,
        openModal,
        closeModal,
        handleCartClick,
      }}
    >
         {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider