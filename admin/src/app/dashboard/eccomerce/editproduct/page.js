"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { Button } from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import PopUpFilemanager from '@/components/filemanager/PopUpFilemanager';
import { UseFileManager } from '@/context/FileManagerProvidert';
import {
  BtnBold,
  BtnItalic,
  createButton,
  BtnStrikeThrough,
  Editor,
  EditorProvider,
  BtnLink,
  Toolbar,
  BtnStyles,
  Separator,
} from "react-simple-wysiwyg";

const page = () => {
const params = useSearchParams();

const productId = params.get("id");
    
   const [product, setProduct] = useState({});
   const [uploadedCat, setUploadedCat] = useState(null);
   const [title, setTitle] = useState("");
   const [html, setHtml] = useState("");
   const [price, setPrice] = useState(0);
   const [discountPercentage, setDiscountPercentage] = useState(0);
   const [rating, setRating] = useState(0.0);
   const [stock, setStock] = useState(0);
   const [brand, setBrand] = useState("none");
   const [category, setCategory] = useState("");
   const [color, setColor] = useState("none");
   const [warranty, setWarranty] = useState(0);
   const [weight, setWeight] = useState(0);
   const [thumbnail, setThumbnail] = useState(null);
   const [gallery, setGallery] = useState(null);

console.log("fetched gallery", gallery)
    
    useEffect(() => {
      const getSingleProduct = async () => {
        try {
          console.log("fetching product");
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}admin/commerce/products/${productId}`
          );
          setProduct(response.data);
        } catch (error) {
          console.error("Error during product fetching:", error);
        }
      };

      getSingleProduct();
      console.log(product);
    }, [productId]);
    
    useEffect(() => {

        setTitle(product.title || "");
        setHtml(product.description || "");
        setPrice(product.price || 0);
        setDiscountPercentage(product.discountPercentage || 0);
        setRating(product.rating || 0);
        setStock(product.stock || 0)
        setBrand(product.brand || "");
        setCategory(product.category || "");
        setColor(product.color || "");
        setWarranty(product.warranty || "");
        setWeight(product.weight || 0);
        setGallery(product.images || "");
        setThumbnail(product.thumbnail || "");
       
    
    }, [product]);
    

 

const { handleOpen, size } = UseFileManager();

function onChange(e) {
    setHtml(e.target.value);
    }
    
  


    
    

    const patchProduct = async (e) => {
      e.preventDefault();
      console.log("patch started");

      

      try {
        const updatedFormData = {
          title: title,
          description: html,
          price: price,
          discountPercentage: discountPercentage,
          rating: rating,
          stock: stock,
          brand: brand,
          category: category,
          thumbnail: thumbnail,
          images: gallery,
          color: color,
          warranty: warranty,
          weight: weight,
        };

        console.log("Form data before submission", updatedFormData);

        const adminToken = Cookies.get("adminToken");
        console.log("My token", adminToken);
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}admin/commerce/products`,
          updatedFormData,

          {
            headers: {
              Authorization: `Bearer ${String(adminToken)}`,
            },
            "Content-Type": "application/json",
          }
        );
          console.log("patch complete")
          alert("patch complete")
        console.log("Response from backend", response);
      } catch (error) {
        console.error("An error in patching product", error);
      }
    };

     const HandleDeleteThumbnail = () => {
       setThumbnail(null);
    };
    
     useEffect(() => {
      
       const HandleFetch = async () => {
         try {
           const response = await axios.get(
             `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/product/category`
           );

           if (response.status === 200) {
             setUploadedCat(response.data.data);
           }
         } catch (error) {
           console.log("damn error", error);
         }
       };

       HandleFetch();
     }, []);

    

  return (
    <div>
      <div className="grid max-w-2xl mx-auto mt-8 mb-32">
        <div className="relative w-full h-full max-w-2xl px-4 mb-4 md:h-auto">
          <form
            onSubmit={(e) => patchProduct(e)}
            className="relative bg-white rounded-lg shadow-md shadow-gray-300"
          >
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">Edit Product</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="product-modal"
              ></button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <div className="grid grid-cols-6 gap-6">
                  {/* product title */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="product-name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                      placeholder="Apple Imac 27”"
                      required=""
                     value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  {/* product category */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Category
                    </label>
                    <select
                      className="p-2 text-base border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-indigo-500"
                      name="category"
                      id="category"
                      required
                      value={category}
                     onChange={(e) => setCategory(e.target.value)}
                    >
                        <option>Select category</option>
                      {uploadedCat &&
                        uploadedCat.map((item) => {
                          return <option value={item.name}>{item.name}</option>;
                        })}
                    </select>
                  </div>

                  {/* price */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                      placeholder="$2300"
                      required=""
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  {/* rating */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="rating"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Rating
                    </label>
                    <input
                      type="text"
                      name="rating"
                      id="rating"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                      placeholder="4.2"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </div>

                  {/* discount */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="discount"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      discount
                    </label>
                    <input
                      type="number"
                      name="discountPercentage"
                      id="discountPercentage"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                      placeholder="2300"
                      value={discountPercentage}
                     onChange={(e) => setDiscountPercentage(e.target.value)}
                    />
                  </div>

                  {/* stock */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="stock"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Stock left
                    </label>
                    <input
                      type="number"
                      name="stock"
                      id="stock"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                      placeholder="15"
                      required=""
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>

                  {/* brand */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      id="brand"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                      placeholder="Nike"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>

                  {/* weight */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="weight"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Weight
                    </label>
                    <input
                      type="number"
                      name="weight"
                      id="weight"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                      placeholder="25 kg"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>

                  {/* warranty */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="warranty"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Warranty
                    </label>
                    <input
                      type="number"
                      name="warranty"
                      id="warranty"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                      placeholder="15"
                      required=""
                      value={warranty}
                     onChange={(e) => setWarranty(e.target.value)}
                    />
                  </div>

                  {/* color */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="color"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Color
                    </label>
                    <input
                      type="text"
                      name="color"
                      id="color"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                      placeholder="Red"
                      value={color}
                     onChange={(e) => setColor(e.target.value)}
                    />
                  </div>

                  {/* description */}
                  <div className="col-span-full">
                    <label
                      htmlFor="product-details"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Product Details
                    </label>
                    <EditorProvider>
                    
                       {/* <Editor value={html} onChange={onChange}>  */}
                       <Editor value={html} onChange={onChange}> 
                        <Toolbar>
                          <BtnBold />
                          <Separator />
                          <BtnItalic />
                          <Separator />
                          <BtnLink />
                          <Separator />
                          <BtnStrikeThrough />
                          <Separator />
                          <BtnStyles />
                        </Toolbar>
                      </Editor>
                    </EditorProvider>
                  </div>
                </div>

                {/* thumbnail */}
                <div className="mt-3">
                  <p className="block mb-2 text-sm font-medium text-gray-900">
                    Produt Thumbnail
                  </p>

                  {thumbnail && (
                    <div className="flex my-4 space-x-5">
                      <div>
                        <img
                          src={thumbnail}
                          className="h-24"
                          alt="imac image"
                        />

                        <div
                          className="cursor-pointer"
                          onClick={HandleDeleteThumbnail}
                        >
                          <svg
                            className="w-6 h-6 -mt-5 text-red-600 cursor-pointer"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  <a href="#value=thumbnail">
                    <div className="flex items-center justify-center w-full">
                      <div
                        className="flex flex-col w-full h-32 border-2 border-gray-300 border-dashed rounded cursor-pointer hover:bg-gray-50"
                        onClick={() => handleOpen("lg")}
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                          </svg>
                          <p className="py-1 text-sm text-gray-600">
                            Upload a file or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                        {/* <input
                        type="file"
                        name="thumbnail"
                        onClick ={(e)=>handleThumbNail(e)}
                      /> */}
                      </div>
                    </div>
                  </a>
                </div>

                {/* images */}
                <div className="mt-3">
                  <p className="block mb-2 text-sm font-medium text-gray-900">
                    Product Gallery
                  </p>
                  {gallery  && (
                    <div className="flex my-4 space-x-5">
                      {gallery.map((item) => (
                        <div>
                          <img
                            src={item}
                            className="h-24"
                            alt="imac image"
                          />
                          <div
                            className="cursor-pointer"
                            // onClick={() => HandleDeleteGallery(item._id)}
                          >
                            <svg
                              className="w-6 h-6 -mt-5 text-red-600 cursor-pointer"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <a href="#value=gallery">
                    <div className="flex items-center justify-center w-full">
                      <div
                        className="flex flex-col w-full h-32 border-2 border-gray-300 border-dashed rounded cursor-pointer hover:bg-gray-50"
                        onClick={() => handleOpen("lg")}
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                          </svg>
                          <p className="py-1 text-sm text-gray-600">
                            Upload a file or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 rounded-b">
              <Button variant="black" color="black" type="submit">
                Publish
              </Button>
            </div>
          </form>
        </div>
        <PopUpFilemanager
          handleOpen={handleOpen}
          size={size}
          setThumbnail={setThumbnail}
          setGallery={setGallery}
        />
      </div>
    </div>
  );
}

export default page
