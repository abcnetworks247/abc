"use client";

import React from "react";
import { useRef } from "react";
const Gallery = ({ images, onClose }) => {
  const scrollRef = useRef();
  const imageWidth = window.innerWidth;

  const scrollLeft = () => {
    if (scrollRef.current) {
      const currentScroll = scrollRef.current.scrollLeft;
      const newScroll = currentScroll - imageWidth;
      const targetIndex = Math.max(0, Math.floor(newScroll / imageWidth));
      scrollRef.current.scrollTo({
        left: targetIndex * imageWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const currentScroll = scrollRef.current.scrollLeft;
      const newScroll = currentScroll + imageWidth;
      const targetIndex = Math.min(
        images.length - 1,
        Math.floor(newScroll / imageWidth)
      );
      scrollRef.current.scrollTo({
        left: targetIndex * imageWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-[50]">
      <div className="relative max-w-3xl w-full h-[80vh] p-4 py-4 bg-white rounded-lg overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-700">
            Product Images
          </span>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            &#10005;
          </button>
        </div>
        <div
          ref={scrollRef}
          className="flex h-full overflow-x-scroll"
          style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 flex-grow-0"
            >
              <img
                src={image}
                alt={`Product Image ${index}`}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-2xl p-2 focus:outline-none hover:bg-black hover:bg-opacity-50"
        >
          {"<"}
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-2xl p-2 focus:outline-none hover:bg-black hover:bg-opacity-50"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Gallery;
