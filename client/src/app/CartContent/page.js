"use client";

import React from "react";
import Navbar from "@/components/navbar/Navbar";
import { ProductContext } from "../../../contexts/productContext";
import CartItem from "@/components/Products/CartItem";
import { useContext, useEffect } from "react";
import { UseProductProvider } from "../../../contexts/ProductProvider";
import Sidebar from "@/components/sidebar/Sidebar";
import FooterComp from "@/components/Footer/FooterComp";
import Link from "next/link"
import { useState} from "react";

const page = () => {
  const { cartProducts } = UseProductProvider();
  //  console.log("cartproduct", cartProducts)
  const shippingFee = 5;

  const price = cartProducts.map((product) => product.price * product.quantity)
  console.log("price", price)
 
  const totalPrice = cartProducts.reduce(
    (accumulator, product) =>
      accumulator + product.quantity * product.price, 0
  )
  console.log(totalPrice)
 
  const grandTotal = totalPrice + shippingFee
  
  
 
  




 
 
 
  

  console.log("cart value", cartProducts);
  return (
    <>
      <div className="bg-[#111827] sticky top-0 z-[10] mb-10">
        <Navbar />
      </div>
      <Sidebar />
      <section className="pb-8 bg-white font-poppins">
        {cartProducts.length === 0 ? (
          <div className="flex items-center justify-center sm:h-[80vh]  sm:mx-12 sm:shadow-lg sm:py-7 ">
            <div className="flex flex-col items-center  gap-2">
              <img
                src="/assets/images/emptycart.jpg"
                className="w-[200px] h-[200px] object-contain"
              />
              <p className="text-[#575746]">Your cart is empty</p>
              <p className="text-sm ml-3  text-center text-[#313133]  ">
                Why not explore our latest products and discover something you
                love
              </p>
              <Link
                href="/store"
                className="flex items-center justify-center p-2 bg-blue-600 shadow-md rounded-sm cursor-pointer  hover:bg-blue-700"
              >
                <p className="text-white">Explore now</p>
              </Link>
            </div>
          </div>
        ) : (
          <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6 lg:px-36">
            <div>
              <h2 className="mb-8 text-xl font-bold dark:text-gray-700">
                Your Cart
              </h2>
              <div className="p-6 mb-8 border bg-white border-opacity-[80%] rounded-lg shadow-md">
                <div className="flex-wrap items-center hidden mb-6 -mx-4 md:flex md:mb-8">
                  <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                    <h2 className="font-bold text-gray-500 ">Product name</h2>
                  </div>
                  <div className="hidden px-4 lg:block lg:w-2/12">
                    <h2 className="font-bold text-gray-500 ">Price</h2>
                  </div>
                  <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                    <h2 className="font-bold text-gray-500 ">Quantity</h2>
                  </div>
                  <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                    <h2 className="font-bold text-gray-500"> Subtotal</h2>
                  </div>
                </div>
                <div className="py-4 mb-8 border-t border-b border-gray-300 border-opacity-[80%]">
                  {cartProducts.map((product) => (
                    <CartItem key={product._id} product={product} />
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap justify-between">
                <div className="w-full px-4 mb-4 lg:w-1/2 ">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-gray-700 dark:text-gray-400">
                      Apply Coupon
                    </span>
                    <input
                      type="text"
                      className="w-full py-1.5 px-4 rounded-lg font-normal placeholder-gray-400 border lg:flex-1 border-gray-200 text-gray-400"
                      placeholder="x304k45"
                      required
                    />
                    <button className="inline-block w-full py-1.5 font-bold text-center text-gray-100 bg-blue-500 rounded-md lg:w-32 hover:bg-blue-600">
                      Apply
                    </button>
                  </div>
                </div>
                <div className="w-full h-full p-6 mt-6 bg-white border rounded-lg shadow-md md:mt-0 md:w-1/3">
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-700">Subtotal</p>
                    <p className="text-gray-700">${totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">Shipping</p>
                    <p className="text-gray-700">${shippingFee}</p>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <p className="text-lg font-bold">Total</p>
                    <div className="" Name>
                      <p className="mb-1 text-lg font-bold">
                        ${grandTotal.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-700">including VAT</p>
                    </div>
                  </div>
                  <button
                    className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                    Name
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <FooterComp />
    </>
  );
};

export default page;
