"use client"
import { Button } from "@material-tailwind/react"

import { useState } from 'react';
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
} from 'react-simple-wysiwyg';


export default function page() {
  const [html, setHtml] = useState('my <b>HTML</b>');
  const inputStyles = {

    textDecoration: 'line-through',
    color: 'gray', // Adjust the color as needed
  };
  function onChange(e) {
    setHtml(e.target.value);
  }
  return (
    <div>
      <div className="grid max-w-2xl mx-auto mt-8">
  {/* <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
    <img
      className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
      alt="Bordered avatar"
    />
    <div className="flex flex-col space-y-5 sm:ml-8">
      <button
        type="button"
        className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
      >
        Change picture
      </button>
      <button
        type="button"
        className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
      >
        Delete picture
      </button>
    </div>
  </div> */}

  


<div className="relative px-4 w-full max-w-2xl h-full md:h-auto mb-4">
  <div className="relative bg-white rounded-2xl shadow-xl shadow-gray-700">
    <div className="flex justify-between items-start p-5 rounded-t border-b">
      <h3 className="text-xl font-semibold">Add Product</h3>
      <button
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
        data-modal-toggle="product-modal"
      >
       
      </button>
    </div>
    <div className="p-6 space-y-6">
      <form action="#">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="product-name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product Name
            </label>
            <input
              type="text"
              name="product-name"
              id="product-name"
              className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
              placeholder="Apple Imac 27”"
              required=""
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
              placeholder="Electronics"
              required=""
            />
          </div>
        
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
              style={inputStyles}
             
              required=""
            />
          </div>


          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="discount"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              discount
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
              placeholder="$2300"
          
              required=""
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor="product-details"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product Details
            </label>
            <EditorProvider>
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
        <div className="mt-3">
          <p    className="block mb-2 text-sm font-medium text-gray-900">Produt Thumbnail</p>

        <div className="flex my-4 space-x-5">

       
          <div>
            <img
              src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/products/apple-imac-3.png"
              className="h-24"
              alt="imac image"
            />
            <a href="#" className="cursor-pointer">
              <svg
                className="-mt-5 w-6 h-6 text-red-600"
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
            </a>
          </div>
        </div>
        <div className="flex justify-center items-center w-full">
          <label className="flex flex-col w-full h-32 rounded border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
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
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input type="file" className="hidden" />
          </label>
        </div>
        </div>

        
        <div className="mt-3">
        <p    className="block mb-2 text-sm font-medium text-gray-900">Produt Gallery</p>
        <div className="flex my-4 space-x-5">
          <div>
            <img
              src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/products/apple-imac-1.png"
              className="h-24"
              alt="imac image"
            />
            <a href="#" className="cursor-pointer">
              <svg
                className="-mt-5 w-6 h-6 text-red-600"
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
            </a>
          </div>
          <div>
            <img
              src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/products/apple-imac-2.png"
              className="h-24"
              alt="imac image"
            />
            <a href="#" className="cursor-pointer">
              <svg
                className="-mt-5 w-6 h-6 text-red-600"
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
            </a>
          </div>
          <div>
            <img
              src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/products/apple-imac-3.png"
              className="h-24"
              alt="imac image"
            />
            <a href="#" className="cursor-pointer">
              <svg
                className="-mt-5 w-6 h-6 text-red-600"
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
            </a>
          </div>
        </div>
        <div className="flex justify-center items-center w-full">
          <label className="flex flex-col w-full h-32 rounded border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
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
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input type="file" className="hidden" />
          </label>
        </div>
        </div>
      </form>
    </div>
    <div className="p-6 rounded-b border-t border-gray-200">
      <Button variant="black" color="black"
        
        type="submit"
      >
        Save all
      </Button>
    </div>
  </div>
</div>




</div>

    </div>
  )
}
