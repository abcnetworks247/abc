"use client";
import React from "react";
import { ProductContext } from "./productContext";
import { useEffect, useState, useContext } from "react";

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [Wishlist, setWishlist] = useState([]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    openModal();
  };

  const handleAddToWishlist = (product) => {
    setWishlist((prev) => [...prev, product]);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addToCart = (e, product) => {
    e.stopPropagation();
    setCartProducts((prev) => [...prev, product]);
  };

  const handleCartClick = (e, product) => {
    e.stopPropagation();
    addToCart(e,product);
  };

  useEffect(() => {
    if (!hasFetchedData) {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => {
          setProducts(json);
          setHasFetchedData(true); // Update state to indicate that data has been fetched
        });
    }
  }, [hasFetchedData]);

  useEffect(() => {}, [cartProducts]);

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
        handleAddToWishlist,
        Wishlist,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export function UseProductProvider() {
  return useContext(ProductContext);
}
