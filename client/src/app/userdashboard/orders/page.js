"use client"
import React from 'react'
import { UseProductProvider } from '../../../../contexts/ProductProvider';
import Ordered from '../components/Ordered';
const page = () => {
  const { cartProducts } = UseProductProvider();
  return (
    <div className="hidden sm:block sm:basis-3/4 bg-white min-h-max sm:shadow-md sm:rounded-sm">
      <p className="accountInformation px-4 py-2 text-bold ">Orders</p>

      <div className="mx-2 py-2">
       
        {
          cartProducts.map((product) =>
            <Ordered
              key={product.id}
              product={product}
          />)
           }
        {/* <div clasName="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-16 w-16 bg-gray-200"></div>
            
          </div>
        </div> */}

        {/* <div clasName="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-16 w-16 bg-gray-200"></div>
            
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default page