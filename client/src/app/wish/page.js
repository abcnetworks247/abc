"use client"
import React from 'react'
import Navbar from '@/components/navbar/Navbar'
import { UseProductProvider } from '../../../contexts/ProductProvider'
import Wishlistcard from '@/components/NewArrival/Wishlistcard'
import Link from 'next/link'
import FooterComp from '@/components/Footer/FooterComp'

const page = () => {

    const {Wishlist } = UseProductProvider()
    
    return (
      <div>
        <Navbar />
        {Wishlist.length > 0 ? (
          <div className=" py-10 px-4  lg:px-28 bg-gray-50 h-contain">
            <h2 className="text-xl font-medium text-gray-800 mb-6 ">
              Saved Items
            </h2>

            <div className="grid px-4  grid-cols-2 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Wishlist.map((product) => (
                <Wishlistcard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="sm:flex sm:items-center sm:justify-center h-screen w-auto bg-gray-100  ">
            <div className="bg-white sm:w-[30vw] sm:h-[40vh] h-full  flex flex-col justify-center items-center sm:shadow-md sm:rounded-md">
                            
                <img src="/assets/images/basket.png" className='h-24 w-24'/>
                <p className='text-bold'>You have no saved items</p>

              <Link href="/store" className="text-sm underline text-blue-500">
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