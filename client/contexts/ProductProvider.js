"use client";
import React from "react";
import { ProductContext } from "./productContext";
import { useEffect, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

const ProductProvider = ({ children }) => {
  const router = useRouter()
  const [products, setProducts] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [Wishlist, setWishlist] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  });
   const [clickState, setClickState] = useState(false);
  const [screen, setScreen] = useState(!isTabletOrMobile)
  const [category, setCategory] = useState([]);
  console.log(cartProducts)
  

  console.log(products)
  
  
  
  
  const handleUser = () => {
    setClickState(true)
    // Open the modal when the link is clicked on mobile
    if (isTabletOrMobile) {
      // e.preventDefault(); // Prevent default navigation
      setScreen(prev => !prev)
    } 
   
  };
  
  const MAX_RATING = 5;
  const MIN_RATING = 1;

  const [rating] = useState(Math.floor(Math.random() * (5 - 1 + 1)) + 1);

  const handleLinkClick = () => setUserNav(!isTabletOrMobile)
  
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    router.push(`/store/${product.id}}`)
  };

  const addToWishlist = (product) => {
    // e.stopPropagation();
    // setWishlist((prev) => [...prev, product]);
    const updatedWish = [...Wishlist, product];
    setWishlist(updatedWish);
    // Update local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("Wishlist", JSON.stringify(updatedWish));
    }
  };

  const removeFromWishlist = (product) => {
    const newWishList = Wishlist.filter(
      (wishproduct) => product.id !== wishproduct.id
    );
      setWishlist(newWishList)
     if (typeof window !== "undefined") {
       localStorage.setItem("Wishlist", JSON.stringify(newWishList));
     }
  };
  const removeFromCart = (product) => {
    const newCartList = cartProducts.filter(
      (cartProduct) => product.id !== cartProduct.id
    );
    setCartProducts(newCartList)
    
     if (typeof window !== "undefined") {
       localStorage.setItem("cartProducts", JSON.stringify(newCartList));
     }
  };

   const handleRemoveFromCart = (e, product) => {
     e.stopPropagation();
     removeFromCart(product);
   };
  const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    addToWishlist(product);
  };

  

  const handleRemoveFromWishlist = (e, product) => {
    e.stopPropagation();
    removeFromWishlist(product);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addToCart = (e, product) => {
    e.stopPropagation();
    const updatedProduct ={...product, quantity:1}
    const updatedCart = [...cartProducts, updatedProduct];
    setCartProducts(updatedCart);
    // Update local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
    }
  };

 const updateProduct = (updatedProduct) => {
   const updatedCart = cartProducts.map((product) =>
     product.id === updatedProduct.id ? updatedProduct : product
   );

   setCartProducts(updatedCart);

   // Update local storage
   if (typeof window !== "undefined") {
     localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
   }
 };


  const handleCartClick = (e, product) => {
    e.stopPropagation();
    addToCart(e, product);
  };


  const searchProducts = (query) => {
    const regex = new RegExp(`^${query}`, "i");
    const results = products.filter((product) => regex.test(product.title));

    setSearchResults(results);
  };

  useEffect(() => {
    

    const savedWishItems = JSON.parse(
      typeof window !== "undefined"
        ? localStorage.getItem("Wishlist") || "[]"
        : "[]"
    );

    setWishlist(savedWishItems);
  }, []); // Empty dependency array means this useEffect runs only once when the component mounts

  // Retrieve products from local storage

  useEffect(() => {
    // Retrieve cartProducts from local storage when component mounts

    const storedCartProducts = JSON.parse(
      typeof window !== "undefined"
        ? localStorage.getItem("cartProducts") || "[]"
        : "[]"
    );

    setCartProducts(storedCartProducts);
  }, []); // Empty dependency array means this useEffect runs only once when the component mounts

  const storedProducts = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("cachedProducts") || "[]"
      : "[]"
  );

 const fetchProductsByCategory = async (category) => {
   try {
     // Assuming you have an API endpoint for fetching products by category
     const response = await fetch(
       `https://fakestoreapi.com/products/category/${category}`
     );
     const data = await response.json();

     // Update the products state with the fetched data
     setCategory(data);
     router.push(`/store/category/${category}`)
   } catch (error) {
     console.error("Error fetching products:", error);
   }
 };


  useEffect(() => {
    if (storedProducts.length > 0) {
      setProducts(storedProducts);
      setHasFetchedData(true);
    } else {
      if (!hasFetchedData) {
        fetch("https://fakestoreapi.com/products")
          .then((res) => res.json())
          .then((json) => {
            setProducts(json);
            setHasFetchedData(true); // Update state to indicate that data has been fetched
            if (typeof window !== "undefined") {
              localStorage.setItem("cachedProducts", JSON.stringify(json));
            }
          });
      }
    }
  }, [hasFetchedData]);

  

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
        handleRemoveFromWishlist,
        removeFromCart,
        handleRemoveFromCart,
        handleLinkClick,
        isDesktop,
        isTabletOrMobile,
        screen,
        handleUser,
        clickState,
        updateProduct,
        fetchProductsByCategory,
        category
       
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