"use client";
import React from "react";
import SearchBar from "./SearchBar";
import SearchMobile from "./SearchMobile";
import ClickableSearch from "./ClickableSearch";

const Banner = () => {
  return (
    // <div className="bg-cover bg-no-repeat bg-center py-36 bg-[url('/assets/images/banner-bg.jpg')] h-[38vh]">
    // <div className="bg-cover bg-no-repeat bg-center py-36 bg-[url('/assets/images/banner-bg.jpg')] h-[38vh]">
    <div
      className="flex flex-col justify-center items-center relative
       bg-cover bg-no-repeat bg-center py-36 bg-[url('/assets/images/banner-bg.jpg')] h-[50vh]"
    >
      <div className="flex flex-col items-center justify-center gap-4 w-[70vw] md:w-auto">
        <p className="text-lg text-center text-gray-700 mt-10">
          Search All Products
        </p>
        <SearchBar />
        <ClickableSearch />
      </div>
        

      {/* <div className="">
            <a href="#" className="bg-primary border border-primary text-white px-8 py-3 font-medium 
                rounded-md hover:bg-transparent hover:text-primary">Shop Now</a>
        </div>
         */}
      {/* </div> */}
    </div>
  );
};

export default Banner;
