"use client"
import React from 'react'
import Navbar from '@/components/navbar/Navbar'
import { UseProductProvider } from '../../../contexts/ProductProvider'
import Wishlistcard from '@/components/NewArrival/Wishlistcard'
import Link from 'next/link'
import FooterComp from '@/components/Footer/FooterComp'
import Sidebar from '@/components/sidebar/Sidebar'

const page = () => {

    const {Wishlist } = UseProductProvider()
    
    return (
      <div>
        <Navbar />
        <Sidebar />
        {Wishlist.length > 0 ? (
          <div className="px-4 py-10 lg:px-28 bg-gray-50 h-contain">
            <h2 className="mb-6 text-xl font-medium text-gray-800 ">
              Saved Items
            </h2>

            <div className="grid grid-cols-2 gap-4 px-4 lg:gap-4 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Wishlist.map((product) => (
                <Wishlistcard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-auto bg-gray-100 h-[73vh] lg:h-screen sm:flex sm:items-center sm:justify-center ">
            <div className="bg-white sm:w-[30vw] sm:h-[40vh] h-full  flex flex-col justify-center items-center sm:shadow-md sm:rounded-md">
                            
                <img src="/assets/images/basket.png" className='w-32 h-auto'/>
                <p className='text-bold'>You have no saved items</p>

              <Link href="/store" className="text-sm text-blue-500 underline">
                Go back to store
              </Link>
            </div>
          </div>
            )}
            <FooterComp/>
      </div>
    );
}

export default page