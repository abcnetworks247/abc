"use client"
import React from 'react'
import { UseProductProvider } from '../../../../../contexts/ProductProvider'
import { useParams } from 'next/navigation'
import SingleArrival from '@/components/NewArrival/SingleArrival'
import Navbar from '@/components/navbar/Navbar'
import { useEffect, useState } from 'react'
import FooterComp from '@/components/Footer/FooterComp'
import LoadingSkeleton from '@/components/NewArrival/Loadingskeleton'
import { useRouter } from 'next/navigation'
import Nav1 from '@/components/navbar/Nav1'



const page = () => {
  const { allProducts } = UseProductProvider()
   const [category, setCategory] = useState([]);
  const params = useParams()
  const cat = params.slug
 
  const numberOfSkeletons = 5
  const router = useRouter()

  useEffect(() => {
    const categoryProducts = allProducts.filter((product) => {
      return product.category === cat
    })
    setCategory(categoryProducts)
  },[])
 
     

    
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
              {/* <li className="inline-flex items-center">
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </a>
              </li> */}
              <li>
                <div className="flex items-center">
                  {/* <svg
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
                  </svg> */}
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
                    {params.slug}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="h-full px-2 py-10 lg:px-28 bg-gray-50">
          <div className="flex items-center justify-between p-4 bg-white border border-b border-gray-100">
            <p className="text-lg">{cat} </p>
            <p className="text-xs">{category.length} products found </p>
          </div>
          {category.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 px-2 sm:px-4 lg:gap-4 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {category.map((product) => (
                <SingleArrival key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <LoadingSkeleton numberOfSkeletons={numberOfSkeletons} />
          )}
        </div>
        <FooterComp />
      </>
    );
}

export default page
