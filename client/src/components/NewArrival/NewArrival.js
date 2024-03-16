"use client"
import { useEffect, useState } from 'react'
import React from 'react'
import SingleArrival from './SingleArrival'
import { useContext } from 'react'
import { ProductContext } from '../../../contexts/productContext'
import LoadingSkeleton from './Loadingskeleton'
import axios from 'axios'



const NewArrival = () => {
  // const { products } = useContext(ProductContext);
  const numberOfSkeletons = 10;
   const [products, setProducts] = useState([]);
   const [totalPages, setTotalPages] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);

   const fetchProducts = async (page, perPage) => {
     try {
       const response = await axios.get(
         `https://abc-server-nazd.onrender.com/api/v1/admin/commerce/products?page=${page}&perPage=${perPage}`
       );

       if (response.status == 200) {
          const { products, totalPages, page: currentPage } = response.data;

          setProducts(products);
          setTotalPages(totalPages);
          setCurrentPage(currentPage);
       } else {
         console.log("Error fetching product")
       }

      
     } catch (error) {
       console.error(error);
        
     }
   };

   useEffect(() => {
     fetchProducts(currentPage, 10); // Fetch products on mount with initial page and perPage
   }, []); // Empty dependency array means this effect runs only once on mount

   const handlePageClick = (page) => {
     setCurrentPage(page);
     fetchProducts(page, 10); // Fetch products for the selected page
   };

  return (
    <>
      <h2 className="text-xl ml-6 lg:ml-28 font-medium text-gray-800  mb-6">
        Top new arrival
      </h2>

      <div className=" py-10  px-2  lg:px-28 bg-gray-50">
        {products.length > 0 ? (
          <div className="grid  px-2 sm:px-4  grid-cols-2 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.map((product) => (
              <SingleArrival key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <LoadingSkeleton numberOfSkeletons={numberOfSkeletons} />
        )}

        {/* <div className="sm:flex items-center w-full sm:justify-between p-4">
          <div className="flex items-center mb-4 sm:mb-0">
            <div
              className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
            >
              <svg
                className="w-7 h-7"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <a className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2"
            >
              <svg
                className="w-7 h-7"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg" 
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <span className="text-sm font-normal text-gray-500">
              Showing{" "}
              <span className="text-gray-900 font-semibold">
                {indexOfFirstProduct + 1}-
                {Math.min(indexOfLastProduct, allProducts.length)}
              </span>{" "}
              of{" "}
              <span className="text-gray-900 font-semibold">
                {allProducts.length}
              </span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrevPage}
              variant="gradient"
              className="flex flex-row items-center gap-1"
            >
              <svg
                className="-ml-1 mr-1 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className="flex flex-row items-center gap-1"
            >
              Next
              <svg
                className="-mr-1 ml-1 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div> */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === pageNum
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
                onClick={() => handlePageClick(pageNum)}
              >
                {pageNum}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default NewArrival