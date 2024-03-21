"use client"
import React from 'react'

import SingleArrival from '@/components/NewArrival/SingleArrival'
import Navbar from '@/components/navbar/Navbar'
import { useEffect, useState } from 'react'
import FooterComp from '@/components/Footer/FooterComp'
import LoadingSkeleton from '@/components/NewArrival/Loadingskeleton'
import { useRouter } from 'next/navigation'
import Nav1 from '@/components/navbar/Nav1'
import { useSearchParams } from 'next/navigation'
import { Catamaran } from 'next/font/google'
import axios from 'axios'


const page = () => {
  
  const params = useSearchParams()
  const cat = params.get("cat")
  const [CategoryProducts, setCategoryProducts] = useState([])
  const [categoryLoading, setCategoryLoading] = useState(false);
  const numberOfSkeletons = 5
  const router = useRouter()

  useEffect(() => {
    const getProductsByCategory = async () => {
      try {
        setCategoryLoading(true);
        const response = await axios.get(
          `https://abc-server-nazd.onrender.com/api/v1/admin/commerce/productcategory?category=${cat}`
        );

        if (response.status === 200) {
          const returnedProducts = response.data;
          setCategoryProducts(returnedProducts);
          setCategoryLoading(false);
        } else {
          console.error("Error fetching search results");
          setCategoryLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setCategoryLoading(false);
      }
    };

    getProductsByCategory();
  }, []);
 
     

    
    return (
      <>
        <Nav1 />
        <div className="bg-[#111827] sticky top-0 z-[10] mb-10">
          <Navbar />
        </div>
        {/* bread crumb */}
        <div className="mx-6 mb-2 ">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li>
                <div className="flex items-center">
                  <div
                    onClick={() => router.back()}
                    className="text-sm font-medium text-gray-700 ms-1 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    store
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
                  <span className="text-sm font-medium text-gray-500 ms-1 md:ms-2 dark:text-gray-400">
                    {cat}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="h-full px-2 py-10 lg:px-28 bg-gray-50">
          <div className="flex items-center justify-between p-4 bg-white border border-b border-gray-100">
            <p className="text-lg">{cat} </p>
            <p className="text-xs">{CategoryProducts.length} products found </p>
          </div>
          {categoryLoading ? (
            <LoadingSkeleton numberOfSkeletons={numberOfSkeletons} />
          ) : (
            <div className="grid grid-cols-2 gap-4 px-2 sm:px-4 lg:gap-4 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {CategoryProducts.map((product) => (
                <SingleArrival key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
        <FooterComp />
      </>
    );
}

export default page
