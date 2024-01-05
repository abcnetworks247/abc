"use client"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from "react";
import { useRef } from "react";
const ImageGallery = ({ images, onClose }) => {



  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black
     bg-opacity-75 flex justify-center z-[2000]"
    >
      <div className="bg-white p-5 rounded-sm max-h-fit ">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm">Product Gallery</p>
          <button onClick={onClose}>
            <svg
  
              className="w-6 h-6"
              viewBox="0 0 512 512"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="#737373"
              stroke="#737373"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <title>cancel</title>
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="work-case"
                    fill="#737373"
                    transform="translate(91.520000, 91.520000)"
                  >
                    <polygon
                      id="Close"
                      points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"
                    ></polygon>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </div>
        <div className="w-full h-full sm:w-[30vw] sm:h-[30vh]">
          <Carousel className="h-full" showArrows={true}>
            {images.map((image) => (
              <img src={image} alt={`Product Image`} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
