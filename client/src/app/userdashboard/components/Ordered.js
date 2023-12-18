
import React from 'react'

const Ordered = ({product}) => {
  return (
    <div className=" flex items-center justify-between mt-4 px-2 py-2 border border-gray-200 gap-8">
      <div className="flex items-center gap-2 grow-0">
        <div className="h-24 w-24 ">
          <img src={product.image} className="object-contain h-full w-full" />
        </div>
        <div className="flex flex-col">
          <p className="text-gray-600 line-clamp-1">{product.title}</p>
          <p className="text-sm text-gray-500">Order 33455</p>
          <div className="flex items-center justify-center bg-[#daa520] rounded-sm px-[2px] shadow-sm self-start">
            <p className="text-white">Delivered</p>
          </div>
        </div>
      </div>

      <div className="text-sm cursor-pointer text-red-500 shrink-0 flex items-center justify-center p-2 rounded-sm hover:bg-red-200">
        <p className="">
          See details
        </p>
      </div>
    </div>
  );
}

export default Ordered