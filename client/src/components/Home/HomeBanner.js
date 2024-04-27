"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
// import vid from '../../resources/assets/video/vid.ts';
import header1 from '../../resources/assets/image/header1.png';
import header2 from '../../resources/assets/image/header2.png';

const HomeBanner = () => {
  return (
    <div className="mb-20">
      <header>
        {/* <div
          className='w-full bg-cover bg-center h-[50vh] mb-10'
          style={{
            backgroundImage:
              'url(https://www.physiomics.co.uk/wp-content/uploads/2019/03/news-header-1350px.jpg)',
          }}>
          <div className='flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50'></div>
        </div> */}
        <div className="video-background w-full relative h-[40vh] items-center">
          <video autoPlay loop muted controls={false} className="w-[100vw]">
            <source
              src="https://firebasestorage.googleapis.com/v0/b/abcnetworks24-a6f88.appspot.com/o/vid.mp4?alt=media&token=a21c7f6e-06f5-44e5-a859-f519b4be8be7"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-0 left-0 w-full md:t0p-2 lg:top-5 h-auto lg:h-full flex flex-row items-center justify-between">
            <a
              href="https://www.statehousebuea.org/"
              target="_blank"
              className="h-[10vh] md:h-[20vh] lg:h-[30vh] w-auto"
            >
              <Image
                src={header1}
                height={200}
                width={200}
                alt="image"
                className="h-full w-full"
              />
            </a>

            <Link
              href="/about"
              target="_blank"
              className=" h-[10vh] md:h-[20vh] lg:h-[30vh] w-auto"
            >
              <Image
                src={header2}
                height={200}
                width={200}
                alt="image"
                className="h-full w-full"
              />
            </Link>
            <div className="md:hidden lg:block">

            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HomeBanner;
