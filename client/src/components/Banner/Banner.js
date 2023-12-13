import React from 'react'
import SearchBar from './SearchBar'
import SearchMobile from './SearchMobile';
const Banner = () => {
  return (
    // <div className="bg-cover bg-no-repeat bg-center py-36 bg-[url('/assets/images/banner-bg.jpg')] h-[38vh]">
    // <div className="bg-cover bg-no-repeat bg-center py-36 bg-[url('/assets/images/banner-bg.jpg')] h-[38vh]">
    <div
      className="flex flex-col justify-center items-center 
       bg-cover bg-no-repeat bg-center py-36 bg-[url('/assets/images/banner-bg.jpg')] h-[50vh] w-[100vw] "
    >
      <div className='flex flex-col items-center justify-center gap-4'>
        <p className="text-xl text-center text-gray-700 mt-10">
          Search All Products
        </p>
        <SearchBar />
        <SearchMobile/>
      </div>

      {/* <div className="">
            <a href="#" className="bg-primary border border-primary text-white px-8 py-3 font-medium 
                rounded-md hover:bg-transparent hover:text-primary">Shop Now</a>
        </div>
         */}
      {/* </div> */}
    </div>
  );
}

export default Banner
