"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import FooterComp from "@/components/Footer/FooterComp";
import { ProductContext } from "../../../contexts/productContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import ProductSkeleton from "./ProductSkeleton";
import ImageGallery from "@/components/Products/ImageGallery";
import { UseProductProvider } from "../../../contexts/ProductProvider";
import { useSearchParams } from "next/navigation";
import { UseUserContext } from "../../../contexts/UserContext";
import Loadinganimate from "@/components/Loadinganimate";
import Api from "@/utils/Api";
import Nav1 from "@/components/navbar/Nav1";
import Sidebar from "@/components/sidebar/Sidebar";

const page = () => {

const router = useRouter();
const params = useSearchParams()
  const productid = params.get("id");
 const { UserData } = UseUserContext()
const {
  handleAddToCart,
  handleWishAdd,
  handleCartLoading,
} = UseProductProvider();
 
  const [localSelectedProduct, setLocalSelectedProduct] = useState({});
  
const [wishClick, setWishClick] = useState(false);

const handleWishClick = () => {
  setWishClick((prev) => !prev);
};
  
  
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const openGallery = () => {
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  console.log("local", localSelectedProduct);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getSingleProduct = async () => {
      try {

        const response = await Api.get(
          `admin/commerce/products/${productid}`
        );


        setLocalSelectedProduct(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error during product fetching:", error);
      }
    };

    getSingleProduct();
    console.log(localSelectedProduct)
  
  }, [productid]);
    

  
  return (
    <div className="bg-gray-200">
      <Nav1 />
      <div className="sticky top-0 z-50 bg-[#111827]">
        <Navbar />
      </div>
      <Sidebar />
      <div className="px-2 py-4 mb-2 mt-2 bg-white lg:w-[80%] lg:mx-auto">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li>
              <div className="flex items-center">
                <div
                  onClick={() => router.back()}
                  className="text-xs font-medium text-gray-700 cursor-pointer ms-1 whitespace-nowrap hover:text-blue-600 md:ms-2 "
                >
                  All products
                </div>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180"
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
                <span className="text-xs font-medium text-gray-500 ms-1 md:ms-2 line-clamp-1">
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
        <div className=" relative py-4 lg:py-12 overflow-hidden bg-white font-poppins overflow-y-auto lg:w-[80%] lg:h-[70%] lg:mx-auto mb-12 lg:rounded-sm">
          <div className="max-w-6xl px-4 py-4 mx-auto bg-white lg:py-8 md:px-6">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4 md:w-1/2 ">
                <div className="sticky top-0 overflow-hidden ">
                  <div
                    className="relative mb-6 lg:mb-10"
                    style={{ height: "450px" }}
                  >
                    <img
                      src={
                        localSelectedProduct && localSelectedProduct.thumbnail
                      }
                      alt=""
                      className="object-contain w-full h-full "
                      onClick={openGallery}
                    />
                  </div>
                  <div className="flex-wrap hidden md:flex ">
                    {localSelectedProduct.images.length > 0 &&
                      localSelectedProduct.images.map((item, index) => (
                        <div className="w-1/2 p-2 sm:w-1/4" key={index}>
                          <a
                            href="#"
                            className="block border border-blue-100 hover:border-blue-300 "
                          >
                            <img
                              src={item}
                              alt={`Product Image ${index}`}
                              className="object-cover w-full lg:h-32"
                              onClick={openGallery}
                            />
                          </a>
                        </div>
                      ))}
                  </div>

                  {/* Gallery Modal */}
                  {/* {isGalleryOpen && (
                    <ImageGallery
                      images={localSelectedProduct.images}
                      onClose={closeGallery}
                    />
                  )} */}
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 ">
                <div className="lg:pl-20">
                  <div className="pb-6 mb-8 border-b border-gray-200">
                    <span className="text-lg font-medium text-rose-500 ">
                      New
                    </span>
                    <h2
                      className="max-w-xl mt-2 mb-6 text-xl font-bold cursor-pointer "
                      onClick={() => console.log("My user data", UserData)}
                    >
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
                            );
                          })}
                      </ul>
                      <a className="mb-4 text-xs underline lg:mb-0" href="#">
                        Be the first to review the product
                      </a>
                    </div>
                    <p className="max-w-md mb-8 text-gray-700 ">{}</p>
                    {parse(
                      `${
                        localSelectedProduct && localSelectedProduct.description
                      }`
                    )}

                    <p className="inline-block text-2xl font-semibold text-gray-700 ">
                      <span>{`$ ${
                        localSelectedProduct && localSelectedProduct.price
                      }`}</span>
                      <span className="text-base font-normal text-gray-500 line-through ">
                        $1500.00
                      </span>
                    </p>
                  </div>

                  <div classNames="pb-6 mb-8 border-b border-gray-300 dark:border-gray-700"></div>

                  <div className="flex items-center mt-2 ">
                    <div className="mb-4 mr-4 lg:mb-0">
                      <div className="w-28 ">
                        {/* button */}
                        {/* <div className="flex items-center border-gray-100">
                          <span className="cursor-pointer rounded-l bg-gray-300 py-1 px-3.5 duration-100 hover:bg-gray-500 hover:text-blue-50">
                            {" "}
                            -{" "}
                          </span>

                          <span className="flex items-center justify-center w-8 h-8 text-xs text-center bg-white border outline-none">
                            {1}
                          </span>
                          <span className="px-3 py-1 duration-100 bg-gray-300 rounded-r cursor-pointer hover:bg-gray-500 hover:text-blue-50">
                            {" "}
                            +{" "}
                          </span>
                        </div> */}
                      </div>
                    </div>
                    <div className="mb-4 mr-4 lg:mb-0">
                      <button
                        onClick={
                          !UserData
                            ? (e) => {
                                e.stopPropagation();
                                router.push("/login");
                              }
                            : (e) => {
                                e.stopPropagation();
                                handleAddToCart(productid, UserData._id);
                              }
                        }
                        className="w-full h-10 p-2 mr-4 bg-blue-900 rounded-md text-gray-50 hover:bg-blue-600 "
                      >
                        {handleCartLoading ? <Loadinganimate color="white" /> : "Add to Cart"}
                      </button>
                    </div>
                    <div className="mb-4 mr-4 rounded-sm lg:mb-0">
                      <button className="flex items-center justify-center w-full h-10 p-2 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 hover:bg-blue-600 hover:border-blue-600 ">
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
                    <div className="mb-4 rounded-sm cursor-pointer lg:mb-0">
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
                            handleWishAdd(
                              localSelectedProduct._id,
                              UserData._id
                            );
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
                            handleWishAdd(
                              localSelectedProduct._id,
                              UserData._id
                            );
                            handleWishClick();
                          }}
                        >
                          <path d="M8 2.748L8 2.748C10.68 0.377 15.36 1.344 15.36 6.792C15.36 9.868 12.206 12.44 8.464 15.665C8.18 15.89 7.82 15.89 7.536 15.665C3.794 12.44 0.64 9.868 0.64 6.792C0.64 1.344 5.32 0.377 8 2.748Z"></path>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isGalleryOpen && (
            <ImageGallery
              images={localSelectedProduct.images}
              onClose={closeGallery}
            />
          )}
        </div>
      )}

      <FooterComp />
    </div>
  );
};

export default page;
