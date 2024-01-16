"use client";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../contexts/productContext";
import { UseProductProvider } from "../../../contexts/ProductProvider";
import { useRouter } from "next/navigation";
import { UserContextProvider } from "../../../contexts/UserContext";
import { UseUserContext } from "../../../contexts/UserContext";


const SingleArrival = ({ product }) => {
  const router = useRouter()
  const { UserData } = UseUserContext();

  const {
  
    handleWishAdd,
    handleAddToCart
  } = UseProductProvider();
  const [hoverState, setHoverState] = useState(false)
  const [wishClick, setWishClick] = useState(false)

  const handleWishClick = () => {
    setWishClick((prev)=>!prev)
  }
  

  
  return (
    <div
      className="mt-56 bg-white rounded shadow cursor-pointer"
      onClick={() => router.push(`/productDetails/?id=${product._id}`)}
      onMouseEnter={() => setHoverState(true)}
    >
      <div className="relative  py-6 group ">
        <div className="relative flex items-center shadow-sm justify-center w-full h-64 mb-4  -mt-56 overflow-hidden rounded -top-full bg-white ">
          <img
            className="object-contain w-[70%] h-full transition-all group-hover:scale-110 bg-transparent"
            src={product.thumbnail}
            alt=""
          />
          <div className="absolute flex flex-col top-4 right-4 z-[2]">
            <a className="  flex items-center  ">
              <div
                className={`relative flex cursor-pointer hover:scale-125 items-center justify-center p-3 mb-3 transition-all 
                 sm:group-hover:translate-x-0  sm:translate-x-20 bg-white rounded   wishlist  group`}
              >
                {wishClick ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    className={`bi bi-heart-fill}`}
                    viewBox="0 0 16 16"
                    style={{ fill: "#FF6666" }}
                  
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishAdd(product._id, UserData._id);
                      handleWishClick();
                    }}
                  >
                    <path d="M8 2.748L8 2.748C10.68 0.377 15.36 1.344 15.36 6.792C15.36 9.868 12.206 12.44 8.464 15.665C8.18 15.89 7.82 15.89 7.536 15.665C3.794 12.44 0.64 9.868 0.64 6.792C0.64 1.344 5.32 0.377 8 2.748Z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    className={`bi bi-heart`}
                    viewBox="0 0 16 16"
                    stroke="red"
                    fill="none"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishAdd(product._id, UserData._id);
                      handleWishClick();
                    }}
                  >
                    <path d="M8 2.748L8 2.748C10.68 0.377 15.36 1.344 15.36 6.792C15.36 9.868 12.206 12.44 8.464 15.665C8.18 15.89 7.82 15.89 7.536 15.665C3.794 12.44 0.64 9.868 0.64 6.792C0.64 1.344 5.32 0.377 8 2.748Z"></path>
                  </svg>
                )}
              </div>
            </a>
             <a
              className="flex items-center"
              // onClick={(e) => handleCartClick(e, product)}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product._id, UserData._id);
              
              }}
            >
              <div
                className={`relative flex cursor-pointer hover:scale-125 items-center justify-center p-3 mb-3 transition-all 
                 sm:group-hover:translate-x-0  sm:translate-x-20 bg-white rounded   wishlist  group`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="blue"
                  className="bi bi-cart2"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                </svg>
              </div>
            </a>
          </div>
        </div>
        <div className="px-3">
          <a href="#">
            <h2 className="mb-2 text-sm font-semibold text-gray-800 line-clamp-1">
              {product.title}
            </h2>
          </a>
          <p className="mb-3 text-lg font-bold text-gray-600 flex gap-3 items-center">
            <span>$ {product.price}</span>
            <span className="text-xs font-semibold text-gray-500 line-through ">
              $ {product.price}
            </span>
          </p>
          <div className="flex gap-1 text-orange-400">
            {Array(5)
              .fill()
              .map((_, i) => {
                const rating = product.rating;
                const filledStars = Math.floor(rating);
                const hasHalfStar = rating - filledStars >= 0.5;

                return (
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill={i < filledStars ? "red" : "none"}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                        stroke={i < filledStars ? "" : "#000000"}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleArrival;
