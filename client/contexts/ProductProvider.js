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
  const MAX_RATING = 5;
  const MIN_RATING = 1;

  const [rating] = useState(Math.floor(Math.random() * (5 - 1 + 1)) + 1);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    openModal();
  };

  const addToWishlist = (e, product) => {
    e.stopPropagation();
    setWishlist((prev) => [...prev, product]);
  };
  const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    addToWishlist(e, product);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addToCart = (e, product) => {
    e.stopPropagation();
    const updatedCart = [...cartProducts, product];
    setCartProducts(updatedCart);
    // Update local storage
    localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
  };

  const handleCartClick = (e, product) => {
    e.stopPropagation();
    addToCart(e, product);
  };


  useEffect(() => {
    // Retrieve cartProducts from local storage when component mounts
    const storedCartProducts = JSON.parse(
      localStorage.getItem("cartProducts") || "[]"
    );
    setCartProducts(storedCartProducts);
  }, []); // Empty dependency array means this useEffect runs only once when the component mounts

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
        rating,
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