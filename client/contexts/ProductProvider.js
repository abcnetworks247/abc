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
  const [searchResults, setSearchResults] = useState([]);
  const MAX_RATING = 5;
  const MIN_RATING = 1;

  const [rating] = useState(Math.floor(Math.random() * (5 - 1 + 1)) + 1);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    openModal();
  };

  const addToWishlist = ( product) => {
    // e.stopPropagation();
    setWishlist((prev) => [...prev, product]);
   
  };

  const removeFromWishlist = ( product) => {
    const newWishList = Wishlist.filter((wishproduct) => product.id !== wishproduct.id)
    setWishlist(newWishList)
  }
  const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    addToWishlist(product);
  };

  const handleRemoveFromWishlist = (e, product) => {
    e.stopPropagation();
    removeFromWishlist(product);
  }
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

  // const searchProducts = (query) => {
  //   const results = products.filter(
  //     (product) =>
  //       product.title.toLowerCase().includes(query.toLowerCase()) ||
  //       product.category.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setSearchResults(results);
  // };

  const searchProducts = (query) => {
    const regex = new RegExp(`^${query}`, "i");
    const results = products.filter((product) => regex.test(product.title));

    setSearchResults(results);
  };

  useEffect(() => {
    // Retrieve cartProducts from local storage when component mounts
    const storedCartProducts = JSON.parse(
      localStorage.getItem("cartProducts") || "[]"
    );
    setCartProducts(storedCartProducts);
  }, []); // Empty dependency array means this useEffect runs only once when the component mounts

  // Retrieve products from local storage
  const storedProducts = JSON.parse(
    localStorage.getItem("cachedProducts") || "[]"
  );

  useEffect(() => {
    if (storedProducts.length > 0) {
       setProducts(storedProducts);
       setHasFetchedData(true);
    } 
    else {
       if (!hasFetchedData) {
         fetch("https://fakestoreapi.com/products")
           .then((res) => res.json())
           .then((json) => {
             setProducts(json);
             setHasFetchedData(true); // Update state to indicate that data has been fetched

             localStorage.setItem("cachedProducts", JSON.stringify(json));
           });
       }
      
    }
   
  }, [hasFetchedData]);

  console.log(Wishlist);

  // useEffect(() => {}, [cartProducts]);

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
        searchProducts,
        searchResults,
        setSearchResults,
        handleRemoveFromWishlist
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