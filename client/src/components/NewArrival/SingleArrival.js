"use client";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../contexts/productContext";
import { UseProductProvider } from "../../../contexts/ProductProvider";


const SingleArrival = ({ product }) => {
  const { handleProductClick, handleCartClick, rating } = useContext(ProductContext);
  const { handleAddToWishlist , handleRemoveFromWishlist} = UseProductProvider()
  const [hoverState, setHoverState] = useState(false)
  const [wishClick, setWishClick] = useState(false)

  const handleWishClick = () => {
    setWishClick((prev)=>!prev)
  }
  

  if (!handleProductClick) {
    console.error("handleProductClick is not available in the context.");
    return null;
  }

  
  return (
    <div
      className="mt-56 bg-white rounded shadow cursor-pointer"
      onClick={() => handleProductClick(product)}
      onMouseEnter={() => setHoverState(true)}
    >
      <div className="relative  py-6 group shadow-md">
        <div className="relative flex items-center shadow-sm justify-center w-full h-64 mb-4  -mt-56 overflow-hidden rounded -top-full bg-white ">
          <img
            className="object-contain w-[70%] h-full transition-all group-hover:scale-110 bg-transparent"
            src={product.image}
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
                      handleWishClick()
                    handleRemoveFromWishlist(e, product)} 
                    }
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
                        handleWishClick()
                        handleAddToWishlist(e, product);
                      }}
                  
                  >
                    <path d="M8 2.748L8 2.748C10.68 0.377 15.36 1.344 15.36 6.792C15.36 9.868 12.206 12.44 8.464 15.665C8.18 15.89 7.82 15.89 7.536 15.665C3.794 12.44 0.64 9.868 0.64 6.792C0.64 1.344 5.32 0.377 8 2.748Z"></path>
                  </svg>
                )}
              </div>
            </a>
            <a
              className="flex items-center"
              onClick={(e) => handleCartClick(e, product)}
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
          

            {Array(rating)
              .fill()
              .map((_, i) => {
                return (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#D4AF37"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
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
