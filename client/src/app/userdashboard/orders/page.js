"use client"
import React from 'react'
import { UseProductProvider } from '../../../../contexts/ProductProvider';
import Ordered from '../components/Ordered'


const page = () => {
  const { cartProducts } = UseProductProvider();
  return (
    <div className="hidden sm:block sm:basis-3/4 bg-white min-h-max sm:shadow-md sm:rounded-sm">
      {cartProducts.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center">
            <div className="w-[200p] h-[200px]">
              <img
                src="/assets/images/purchaseOrder.png"
                className="object-contain w-full h-full"
              />
            </div>

            <p className='text-sm '> It looks like you haven't made any purchases yet</p>
          </div>
        </div>
      ) : (
        <>
          <p className="accountInformation px-4 py-2 text-bold ">Orders</p>

          <div className="mx-2 py-2">
            {cartProducts.map((product) => (
              <Ordered key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default page