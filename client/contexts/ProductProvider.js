'use client';
import React from 'react';
import { ProductContext } from './productContext';
import { useEffect, useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';
import { BiSolidRocket } from 'react-icons/bi';
import { UseUserContext } from './UserContext';

const ProductProvider = ({ children }) => {
  const { UserData } = UseUserContext();
  const socket = io.connect(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);
  const router = useRouter();

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [handleCartLoading, setHandleCartLoading] = useState(false);
  const [wishListLoading, setWishListLoading] = useState(false);
  const [query, setQuery] = useState('');
   const [products, setProducts] = useState([]);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const isDesktop = useMediaQuery({
    query: '(min-width: 600px)',
  });
  const [clickState, setClickState] = useState(false);
  const [screen, setScreen] = useState(!isTabletOrMobile);
  const [category, setCategory] = useState([]);

  console.log(UserData);

  const handleUser = () => {
    setClickState(true);
    // Open the modal when the link is clicked on mobile
    if (isTabletOrMobile) {
      // e.preventDefault(); // Prevent default navigation
      setScreen((prev) => !prev);
    }
  };

  const handleLinkClick = () => setUserNav(!isTabletOrMobile);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    router.push('/productdetails');
  };

  // add to cart socket
  const handleAddToCart = (productId, userId) => {
    const existingCartItem = cartProducts.find(
      (item) => item.product._id === productId
    );

    if (existingCartItem) {
      // If the product is already in cart, increment quantity by 1
      const updatedCart = cartProducts.map((item) => {
        if (item.product._id === productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });

      setCartProducts(updatedCart);
    } else {
      // If the product is not in cart, add it with quantity 1
      const productToAdd = products.find(
        (product) => product._id === productId
      );
      if (productToAdd) {
        const newCartItem = {
          _id: productToAdd._id,
          product: productToAdd,
          quantity: 1,
        };
        setCartProducts([...cartProducts, newCartItem]);
      }
    }

    // Emit a signal to notify the server about the cart update
    const cartdata = {
      productId: productId,
      userId: userId,
    };

    socket.emit('cartadd', cartdata);
  };

  // remove item from cart
  const handleRemoveFromCart = (productId, userId) => {
    console.log('my cart Products', cartProducts);

    const cartdata = {
      productId: productId,
      userId: userId,
    };

    socket.emit('cartremove', cartdata);

    const updatedCart = cartProducts.filter(
      (item) => item.product._id !== productId
    );
    setCartProducts(updatedCart);
  };

  // minus cart quantity
  const handleCartDecrease = (productId, userId) => {
    const updatedCart = cartProducts.map((item) => {
      if (item.product._id === productId) {
        // If quantity is already 1, don't decrement further
        if (item.quantity === 1) {
          return item;
        }
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    setCartProducts(updatedCart);

    const cartdata = {
      productId: productId,
      userId: userId,
    };

    socket.emit('cartminus', cartdata);
  };

  // get the cart products back from the server

  useEffect(() => {
    if (UserData) {
      setCartProducts(UserData.cart);
    }
  }, [UserData]);

  useEffect(() => {
    socket.on('cart', (cartItems) => {
      setHandleCartLoading(true);
      console.log('cart sent back');
      setCartProducts(cartItems);
      setHandleCartLoading(false);
    });
  }, [socket]);

  console.log('cart products from socket', cartProducts);

  useEffect(() => {
    if (!UserData) return;
    const fetchWishlistFromServer = async () => {
      try {
        // Map through the wishlist IDs and fetch product details
        const productsPromises = UserData.wishlist.map(async (productId) => {
          const productResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}admin/commerce/products/${productId}`
          );
          return productResponse.data; // Adjust to your server's response structure
        });

        const products = await Promise.all(productsPromises);

        setWishlist(products);
      } catch (error) {
        console.error('Error fetching wishlist from the server:', error);
      }
    };

    // Fetch wishlist from the server when the component mounts
    fetchWishlistFromServer();
  }, []);

  const handleWishAdd = (productId, userId) => {
    setWishListLoading(true);
    const wishdata = {
      productId: productId,
      userId: userId,
    };
    socket.emit('wishadd', wishdata);
  };

  //reevie the response from the server
  socket.on('wishlist', (userwishlist) => {
    setWishListLoading(true);
    // Update the local state with the updated
    console.log(userwishlist);
    setWishlist(userwishlist);
    setWishListLoading(false);
    console.log('returning wishlist', wishlist);
  });

  const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    addToWishlist(product);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

 
  


  console.log('provider search results', searchResults);

  const handleResultClick = (searchTerm, e) => {
    e.preventDefault();
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
        handleAddToWishlist,
        wishlist,

        setSearchResults,

        handleRemoveFromCart,
        handleLinkClick,
        isDesktop,
        isTabletOrMobile,
        screen,
        handleUser,
        clickState,
        category,
        handleResultClick,
        searchResults,
        setSearchResults,
        // fetchData,
        handleWishAdd,
        handleAddToCart,
        handleRemoveFromCart,
        handleCartDecrease,
        handleCartLoading,
        wishListLoading,
        query,
        setQuery,
        products,
        setProducts,
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
