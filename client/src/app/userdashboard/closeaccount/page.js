"use client"
import React from 'react'
import { UseProductProvider } from '../../../../contexts/ProductProvider';
import DeleteAccount from '../components/DeleteAccount';
const page = () => {
  const {screen} = UseProductProvider()
  return (
    <div
      className={` ${
        screen ? "hidden" : ""
      }  h-full w-full md:hidden absolute sm:static sm:block top-0 z-30 p-8 px-4 bg-white `}
      
    >
      <DeleteAccount />
    </div>
  );
}

export default page