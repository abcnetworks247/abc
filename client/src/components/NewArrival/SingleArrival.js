"use client";
import React from "react";
import { useContext, useEffect } from "react";
import { ProductContext } from "../../../contexts/productContext";
import { UseProductProvider } from "../../../contexts/ProductProvider";

const SingleArrival = ({ product }) => {
  const { handleProductClick, handleCartClick, rating } = useContext(ProductContext);
  const { handleAddToWishlist } = UseProductProvider()

  if (!handleProductClick) {
    console.error("handleProductClick is not available in the context.");
    return null;
  }

  
  return (
    <div
      className="mt-56 bg-white rounded shadow cursor-pointer"
      onClick={() => handleProductClick(product)}
    >
      <div className="relative z-20 py-6 group">
        <div className="relative flex items-center justify-center w-full h-64 mb-4  -mt-56 overflow-hidden rounded -top-full ">
          <img
            className="object-contain w-[70%] h-full transition-all group-hover:scale-110"
            src={product.image}
            alt=""
          />
          <div className="absolute flex flex-col top-4 right-4 z-[2]">
            <a
              className="flex items-center"
              onClick={(e) => handleAddToWishlist(e, product)}
            >
              <div className="relative flex cursor-pointer hover:scale-125 items-center justify-center p-3 mb-3 transition-all bg-white rounded dark:bg-gray-700 dark:text-white  wishlist   dark:hover:bg-blue-600 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  className={`bi bi-heart-fill}`}
                  viewBox="0 0 16 16"
                  style={{ fill: "#FF6666" }}
                >
                  <path d="M8 2.748L8 2.748C10.68 0.377 15.36 1.344 15.36 6.792C15.36 9.868 12.206 12.44 8.464 15.665C8.18 15.89 7.82 15.89 7.536 15.665C3.794 12.44 0.64 9.868 0.64 6.792C0.64 1.344 5.32 0.377 8 2.748Z"></path>
                </svg>
              </div>
            </a>
            <a
              className="flex items-center"
              onClick={(e) => handleCartClick(e, product)}
            >
              <div className="relative flex items-center justify-center cursor-pointer hover:scale-125 p-3 mb-3 transition-all  bg-white rounded dark:bg-gray-700 dark:text-white wishlist dark:hover:bg-blue-600 group">
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
            <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
              {product.title}
            </h2>
          </a>
          <p className="mb-3 text-lg font-bold text-blue-500 dark:text-blue-300 ">
            <span>$ {product.price}</span>
            <span className="text-xs font-semibold text-gray-400 line-through ">
              $ {product.price}
            </span>
          </p>
          <div className="flex gap-1 text-orange-400">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg> */}

            {Array(rating)
              .fill()
              .map((_, i) => {
                return (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="blue"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                );
              })}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="blue"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-star"
              viewBox="0 0 16 16"
            >
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
            </svg> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleArrival;
