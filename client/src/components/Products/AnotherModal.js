"use client"
import React from 'react'
import ProductDetail from './ProductDetail'
import { useContext } from 'react';
import { ProductContext } from '../../../contexts/productContext';

const AnotherModal = () => {
    const { isModalOpen, closeModal, selectedProduct } = useContext(ProductContext);

    if (!isModalOpen || !selectedProduct) {
        return null; 
      }

  return (
<div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">

{/* <!-- hoverlay  --> */}
<div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

<div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
    {/* <!-- Add modal content here --> */}
    <div className="modal-content py-4 text-left px-6">
        <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Modal Title</p>
            <div className="modal-close cursor-pointer z-50">
                <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                    viewBox="0 0 18 18">
                    <path d="M1.39 1.393l15.318 15.314m-15.318 0L16.706 1.393" />
                </svg>
            </div>
        </div>
        <p>Modal content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at purus urna.
            Vestibulum nec erat in diam rutrum posuere. Fusce gravida orci nec mi volutpat euismod. Proin aliquet,
            lacus sit amet egestas rhoncus, turpis nulla laoreet urna, nec ultricies nibh urna eu sapien. </p>

        <div className="mt-4 flex justify-end">
            <button className="modal-close px-4 bg-gray-100 p-3 rounded-lg text-black hover:bg-gray-200">Cancel</button>
            <button className="px-4 bg-purple-500 p-3 ml-3 rounded-lg text-white hover:bg-purple-400">Save</button>
        </div>
    </div>
</div>

</div>
  )
}

export default AnotherModal