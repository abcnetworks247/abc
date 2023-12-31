"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import FooterComp from "@/components/Footer/FooterComp";
import { ProductContext } from "../../../contexts/productContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import ProductSkeleton from "./ProductSkeleton";
const page = () => {
    const router = useRouter();
  const { selectedProduct, products } = useContext(ProductContext);
    const params = useParams();
     const [localSelectedProduct, setLocalSelectedProduct] = useState(selectedProduct || {});
   console.log("local", localSelectedProduct)
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
     console.log("Saving to localStorage:", selectedProduct);
      if (!selectedProduct) return
       localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
   }, [selectedProduct]);

     // Load selectedProduct from localStorage when the component mounts
     useEffect(() => {
       const storedProduct = localStorage.getItem("selectedProduct");
       

       const isReloading = sessionStorage.getItem("isReloading");
         
        if (storedProduct && isReloading) {
          const parsedProduct = JSON.parse(storedProduct);
          setLocalSelectedProduct(parsedProduct);
          setLoading(false); // Set loading to false once data is loaded
        } else {
          // Set the reloading flag for the next reload
          sessionStorage.setItem("isReloading", "true");
        }
     }, []);
   
   

  return (
    <div className="bg-gray-200">
      <div className="bg-white sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="px-2 py-4 mb-2 mt-2 bg-white lg:w-[80%] lg:mx-auto">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li>
              <div className="flex items-center">
                <div
                  onClick={() => router.back()}
                  className="ms-1  whitespace-nowrap  text-xs font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                >
                  All products
                </div>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-xs font-medium text-gray-500 md:ms-2 dark:text-gray-400 line-clamp-1">
                  {localSelectedProduct.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {loading ? (
        <ProductSkeleton />
      ) : (
        <div className=" relative py-12 overflow-hidden bg-white font-poppins dark:bg-gray-800 overflow-y-auto lg:w-[80%] lg:h-[70%] lg:mx-auto mb-12 lg:rounded-sm">
          <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6 bg-white">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4 md:w-1/2 ">
                <div className="sticky top-0 overflow-hidden ">
                  <div
                    className="relative mb-6 lg:mb-10"
                    style={{ height: "450px" }}
                  >
                    <img
                      src={localSelectedProduct && localSelectedProduct.thumbnail}
                      alt=""
                      className="object-contain w-full h-full "
                    />
                  </div>
                  <div className="flex-wrap hidden md:flex ">
                    <div className="w-1/2 p-2 sm:w-1/4">
                      <a
                        href="#"
                        className="block border border-blue-100 dark:border-gray-700 dark:hover:border-gray-600 hover:border-blue-300 "
                      >
                        <img
                          src={
                            localSelectedProduct && localSelectedProduct.thumbnail
                          }
                          alt=""
                          className="object-cover w-full lg:h-32"
                        />
                      </a>
                    </div>
                    <div className="w-1/2 p-2 sm:w-1/4">
                      <a
                        href="#"
                        className="block border border-blue-100 dark:border-transparent dark:hover:border-gray-600 hover:border-blue-300"
                      >
                        <img
                          src={
                            localSelectedProduct && localSelectedProduct.thumbnail
                          }
                          alt=""
                          className="object-cover w-full lg:h-32"
                        />
                      </a>
                    </div>
                    <div className="w-1/2 p-2 sm:w-1/4">
                      <a
                        href="#"
                        className="block border border-blue-100 dark:border-transparent dark:hover:border-gray-600 hover:border-blue-300"
                      >
                        <img
                          src={
                            localSelectedProduct && localSelectedProduct.thumbnail
                          }
                          alt=""
                          className="object-cover w-full lg:h-32"
                        />
                      </a>
                    </div>
                    <div className="w-1/2 p-2 sm:w-1/4">
                      <a
                        href="#"
                        className="block border border-blue-100 dark:border-transparent dark:hover:border-gray-600 hover:border-blue-300"
                      >
                        <img
                          src={
                            localSelectedProduct && localSelectedProduct.thumbnail
                          }
                          alt=""
                          className="object-cover w-full lg:h-32"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 ">
                <div className="lg:pl-20">
                  <div className="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-medium text-rose-500 dark:text-rose-200">
                      New
                    </span>
                    <h2 className="max-w-xl mt-2 mb-6 text-xl font-bold dark:text-gray-300 md:text-4xl">
                      {localSelectedProduct && localSelectedProduct.title}
                    </h2>
                    <div className="flex flex-wrap items-center mb-6">
                      <ul className="flex mb-4 mr-2 lg:mb-0">
                        {Array(5)
                          .fill()
                          .map((_, i) => {
                            const rating = localSelectedProduct.rating;
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
                            )
                          })}
                      </ul>
                      <a
                        className="mb-4 text-xs underline dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0"
                        href="#"
                      >
                        Be the first to review the product
                      </a>
                    </div>
                    <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                      {localSelectedProduct && localSelectedProduct.description}
                    </p>
                    <div className="p-4 mb-8 border border-gray-300 dark:border-gray-700">
                      <h2 className="mb-4 text-xl font-semibold dark:text-gray-400">
                        Real time{" "}
                        <span className="px-2 bg-blue-500 text-gray-50 rounded-full">
                          26
                        </span>{" "}
                        visitors right now!{" "}
                      </h2>
                      <div className="mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">
                        Hurry up! left {localSelectedProduct.stock} in Stock
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5  dark:bg-gray-600">
                        <div
                          className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>
                    <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                      <span>{`$ ${
                        localSelectedProduct && localSelectedProduct.price
                      }`}</span>
                      <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400">
                        $1500.00
                      </span>
                    </p>
                  </div>
                  <div className="mb-8">
                    <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                      Color
                    </h2>
                    <div className="flex flex-wrap -mb-2">
                      <button className="p-1 mb-2 mr-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400 ">
                        <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                      </button>
                      <button className="p-1 mb-2 mr-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400">
                        <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                      </button>
                      <button className="p-1 mb-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                      </button>
                      <button className="p-1 mb-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400">
                        <div className="w-6 h-6 rounded-full bg-sky-400"></div>
                      </button>
                    </div>
                  </div>
                  <div classNames="pb-6 mb-8 border-b border-gray-300 dark:border-gray-700">
                    <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                      Size
                    </h2>
                    <div className="flex flex-wrap -mb-2">
                      <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">
                        XL
                      </button>
                      <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                        S
                      </button>
                      <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                        M
                      </button>
                      <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                        XS
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center mt-2 ">
                    <div className="mb-4 mr-4 lg:mb-0">
                      <div className="w-28 ">
                        {/* button */}
                        <div className="flex items-center border-gray-100">
                          <span className="cursor-pointer rounded-l bg-gray-300 py-1 px-3.5 duration-100 hover:bg-gray-500 hover:text-blue-50">
                            {" "}
                            -{" "}
                          </span>

                          <span className="h-8 w-8 border flex items-center justify-center bg-white text-center text-xs outline-none">
                            {1}
                          </span>
                          <span className="cursor-pointer rounded-r bg-gray-300 py-1 px-3 duration-100 hover:bg-gray-500 hover:text-blue-50">
                            {" "}
                            +{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 mr-4 lg:mb-0">
                      <button className="w-full h-10 p-2 mr-4 rounded-md bg-blue-900 dark:text-gray-200 text-gray-50 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500">
                        Buy Now
                      </button>
                    </div>
                    <div className="mb-4 mr-4 lg:mb-0 rounded-sm">
                      <button className="flex items-center justify-center w-full h-10 p-2 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-cart"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                      </button>
                    </div>
                    <div className="mb-4 lg:mb-0 rounded-sm">
                      <button className="flex items-center justify-center w-full h-10 p-2 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className=" bi bi-heart"
                          viewBox="0 0 16 16"
                        >
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <FooterComp />
    </div>
  );
};

export default page;
