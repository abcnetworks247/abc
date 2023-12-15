"use client"
import React from 'react'
import { useState } from 'react'

const CartItem = ({product}) => {
    console.log(product)
     
const [quantity, setQuantity] = useState(1);


const reduceItem = () => {
  if (quantity > 1) {
    setQuantity(quantity - 1);
  }
};

const increaseItem = () => {
  setQuantity(quantity + 1);
};

const calculateSubtotal = () => {
  return quantity * product.price;
};

  return (
    <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
      <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full px-4 mb-3 md:w-1/3">
            <div className="w-full h-96 md:h-24 md:w-24">
              <img
                src={product.image}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="w-2/3 px-4">
            <h2 className="mb-2 text-md font-bold dark:text-gray-400">
              {product.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 ">Picture frame</p>
          </div>
        </div>
      </div>
      <div className="hidden px-4 lg:block lg:w-2/12">
        <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
          $ {product.price}
        </p>
        <span className="text-xs text-gray-500 line-through dark:text-gray-400">
          $1500
        </span>
      </div>
      <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
        <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md dark:border-gray-700 ">
          <button
            className="py-2 hover:text-gray-700 dark:text-gray-400"
            onClick={reduceItem}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-dash"
              viewBox="0 0 16 16"
            >
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
          </button>
          <div className="w-12 px-2 py-4 text-center border-0 rounded-md dark:bg-gray-800 bg-gray-50 dark:text-gray-400 md:text-right">
            {quantity}
          </div>

          <button
            className="py-2 hover:text-gray-700 dark:text-gray-400"
            onClick={increaseItem}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
        <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
          ${calculateSubtotal().toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default CartItem