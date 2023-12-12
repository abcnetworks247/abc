import React from 'react'



const SingleCategory = ({product}) => {
  return (
    <div className="relative overflow-hidden h-[40vh] w-[40vh] rounded-lg shadow-md group">
      <img src={product.image} alt="category 1" className="w-full" />
      <a
        href="#"
        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
      >
        {product.category}
      </a>
    </div>
  );
}

export default SingleCategory