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
  // console.log(cartProducts)
  

  // console.log(products)
  console.log("hasFetchedData", hasFetchedData)
  
  
  
  
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
    router.push('/productDetails')
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
    //check first if the item exist in the cart
  const existingCartItem = cartProducts.find(
    (cartItem) => cartItem.id === product.id
    );
  console.log("existing item", existingCartItem)

  if (existingCartItem) {
    // If the item already exists in the cart, increase its quantity
    const updatedCart = cartProducts.map((cartItem) =>
      cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );

    setCartProducts(updatedCart);
    if (typeof window !== "undefined") {
      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
    }
  
    
  } else {
    // If the item is not in the cart, add it
    addToCart(e, product);
  }
  };


  const searchProducts = (query) => {
    // const regex = new RegExp(`^${query}`, "i");
    // Escape special characters in the query to avoid regex syntax errors
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Create a regular expression with the escaped query
    const regex = new RegExp(`^${escapedQuery}`, "i");

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

    
  
    const storedProducts = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("cachedProducts") || "[]"
      : "[]"
  );

    setCartProducts(storedCartProducts);
    setProducts(storedProducts)
  }, []); // Empty dependency array means this useEffect runs only once when the component mounts

  

useEffect(() => {
  const fetchData = async () => {
    try {
      if (!hasFetchedData) {
        const response = await fetch("https://fakestoreapi.com/products");
        const json = await response.json();

         const uniqueProducts = Array.from(new Set([...products, ...json]));
         setProducts(uniqueProducts);
        setHasFetchedData(true);

        if (typeof window !== "undefined") {
          localStorage.setItem("cachedProducts", JSON.stringify(json));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
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