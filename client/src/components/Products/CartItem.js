"use client";
import React from "react";
import { useState, useEffect } from "react";
import { UseProductProvider} from "../../../contexts/ProductProvider";


const CartItem = ({ product, updatePriceArray }) => {
  
  const { handleRemoveFromCart, cartProducts, updateProduct} =UseProductProvider();
  
  const [quantity, setQuantity] = useState(product.quantity)
  console.log(quantity)

  const reduceItem = () => {
    if (quantity > 1) {
      const decreasevalue = product.quantity = quantity - 1
      console.log('decrease value', decreasevalue);
      console.log("decrease  cartProducts", cartProducts);
      setQuantity(decreasevalue);
      const updatedProduct = { ...product, quantity: decreasevalue };
      updateProduct(updatedProduct);
      }
   
  };

  const increaseItem = () => {
    const value = product.quantity = quantity + 1;
    console.log('increased value', value);
    console.log('increased cartProduct', cartProducts);
    setQuantity(value);
    const updatedProduct = { ...product, quantity: value };
    updateProduct(updatedProduct);
   
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
            <h2 className="mb-2 text-md font-bold text-gray-900">{product.title}</h2>
            <p className="text-gray-500 ">Picture frame</p>
            <div onClick={(e)=>handleRemoveFromCart(e, product)} className="flex items-center justify-center bg-gray-100 cursor-pointer py-2 px-2 hover:bg-blue-300 w-fit rounded-md">
              <p className="text-blue-900 text-xs font-bold">REMOVE</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden px-4 lg:block lg:w-2/12">
        <p className="text-lg font-bold text-blue-900">$ {product.price}</p>
        <span className="text-xs text-gray-500 line-through">$1500</span>
      </div>
      <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
        <div className="flex items-center border-gray-100">
          <span
            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
            onClick={reduceItem}
          >
            {" "}
            -{" "}
          </span>

          <span className="h-8 w-8 border flex items-center justify-center bg-white text-center text-xs outline-none">
            {product.quantity}
          </span>
          <span
            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
            onClick={increaseItem}
          >
            {" "}
            +{" "}
          </span>
        </div>
      </div>
      <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
        <p className="text-lg font-bold text-blue-900">
          ${calculateSubtotal().toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
