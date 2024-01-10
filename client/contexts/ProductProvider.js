"use client";
import React from "react";
import { ProductContext } from "./productContext";
import { useEffect, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useRouter } from "next/navigation";
import io from "socket.io-client"


const ProductProvider = ({ children }) => {

  const socket = io.connect(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);
  const router = useRouter()


  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [wishlist, setWishlist] = useState(null);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  });
   const [clickState, setClickState] = useState(false);
  const [screen, setScreen] = useState(!isTabletOrMobile)
  const [category, setCategory] = useState([]);
  
  
  
  
  
  
  const handleUser = () => {
    setClickState(true)
    // Open the modal when the link is clicked on mobile
    if (isTabletOrMobile) {
      // e.preventDefault(); // Prevent default navigation
      setScreen(prev => !prev)
    } 
   
  };
  
 

  

  const handleLinkClick = () => setUserNav(!isTabletOrMobile)
  
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    router.push('/productDetails')
  };


  const handleWishAdd = (productId, userId) => {
     

     const wishdata = {
          productId: productId,
         userId:userId
     }
     socket.emit("wishadd", wishdata);
     console.log("wish emmited")
   };

  useEffect(() => {
     socket.on("alllike", (userwishlist) => {
       // Update the local state with the updated
       console.log(userwishlist)
       setWishlist(userwishlist);
       console.log("returning wishlist", wishlist);
     });
  },[socket])
    
  useEffect(() => {
    socket.on("wishlist", (userwishlist) => {
      // Update the local state with the updated
        
      setWishlist(userwishlist);
      console.log("returning wishlist", wishlist);
    });

  },[socket])
     
  
  
  // const addToWishlist = (product) => {
  //   // e.stopPropagation();
  //   // setWishlist((prev) => [...prev, product]);
  //   const updatedWish = [...Wishlist, product];
  //   setWishlist(updatedWish);
  //   // Update local storage
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("Wishlist", JSON.stringify(updatedWish));
  //   }
  // };






  const removeFromWishlist = (product) => {
    const newWishList = Wishlist.filter(
      (wishproduct) => product._id !== wishproduct._id
    );
      setWishlist(newWishList)
     if (typeof window !== "undefined") {
       localStorage.setItem("Wishlist", JSON.stringify(newWishList));
     }
  };
  const removeFromCart = (product) => {
    const newCartList = cartProducts.filter(
      (cartProduct) => product._id !== cartProduct._id
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
     product._id === updatedProduct._id ? updatedProduct : product
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
    (cartItem) => cartItem._id === product._id
    );
  console.log("existing item", existingCartItem)

  if (existingCartItem) {
    // If the item already exists in the cart, increase its quantity
    const updatedCart = cartProducts.map((cartItem) =>
      cartItem._id === product._id
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
  
  



  useEffect(() => {
    

    const savedWishItems = JSON.parse(
      typeof window !== "undefined"
        ? localStorage.getItem("Wishlist") || "[]"
        : "[]"
    );

    setWishlist(savedWishItems);
  }, []); // Empty dependency array means this useEffect runs only once when the component mounts

  

  useEffect(() => {
    // Retrieve cartProducts from local storage when component mounts

    const storedCartProducts = JSON.parse(
      typeof window !== "undefined"
        ? localStorage.getItem("cartProducts") || "[]"
        : "[]"
    );

  
    setCartProducts(storedCartProducts);
   
  }, []); // Empty dependency array means this useEffect runs only once when the component mounts


  // fetch allProducts
 
     const fetchData = async () => {
       try {
         const response = await axios.get(
           `${process.env.NEXT_PUBLIC_SERVER_URL}admin/commerce/products`
         );

         if (response.status !== 200) {
           throw new Error("Failed to fetch products");
         }

         const products = response.data;
         setAllProducts(products);
       } catch (error) {
         console.error(error.message);
       }
    };
  
    useEffect(() => {
     fetchData();
    }, []);
  
  const handleSearch = (searchTerm) => {
    
    console.log("hit", searchTerm)
    // Filter products based on the search term
    const filteredProducts = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredProducts);
    console.log("filtered", filteredProducts)
    console.log("allProduct in provider", allProducts)
  };

  console.log("provider search results", searchResults)

  const handleResultClick = (searchTerm, e) => {
    e.preventDefault()
    // Redirect to the results page with the search term
    router.push(`/searchResults?term=${searchTerm}`);
    
  }; 
 

 
  


  return (
    <ProductContext.Provider
      value={{
       
        cartProducts,
        selectedProduct,
        isModalOpen,
        handleProductClick,
        openModal,
        closeModal,
        handleCartClick,
        handleAddToWishlist,
        wishlist,

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
        category,
        allProducts,
        handleSearch,
        handleResultClick,
        searchResults,
        setSearchResults,
        fetchData,
        setAllProducts,
        handleWishAdd
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