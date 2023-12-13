"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function RelatedArticles() {


  return (
    <>
            <h2 className="mb-8 text-2xl font-bold text-gray-900">
            Related articles
          </h2>
      <Swiper
        slidesPerView={3}
        // centeredSlides={true}
        spaceBetween={20}
        autoplay={true}
        navigation={false}
        width={900}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <article className="max-w-xs">
            <a href="#">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
                className="mb-5 rounded-lg"
                alt="Image 1"
              />
            </a>
            <h2 className="mb-2 text-lg font-semibold leading-tight text-gray-900">
              <a href="#">Our first office</a>
            </h2>
            <p className="mb-4 text-gray-700 text-sm ">
              Over the past year, Volosoft has undergone many changes! After
              months of preparation.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
            >
              Read in 2 minutes
            </a>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article className="max-w-xs">
            <a href="#">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
                className="mb-5 rounded-lg"
                alt="Image 1"
              />
            </a>
            <h2 className="mb-2 text-lg font-semibold leading-tight text-gray-900">
              <a href="#">Our first office</a>
            </h2>
            <p className="mb-4 text-gray-700 text-sm ">
              Over the past year, Volosoft has undergone many changes! After
              months of preparation.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
            >
              Read in 2 minutes
            </a>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article className="max-w-xs">
            <a href="#">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
                className="mb-5 rounded-lg"
                alt="Image 1"
              />
            </a>
            <h2 className="mb-2 text-lg font-semibold leading-tight text-gray-900">
              <a href="#">Our first office</a>
            </h2>
            <p className="mb-4 text-gray-700 text-sm ">
              Over the past year, Volosoft has undergone many changes! After
              months of preparation.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
            >
              Read in 2 minutes
            </a>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article className="max-w-xs">
            <a href="#">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
                className="mb-5 rounded-lg"
                alt="Image 1"
              />
            </a>
            <h2 className="mb-2 text-lg font-semibold leading-tight text-gray-900">
              <a href="#">Our first office</a>
            </h2>
            <p className="mb-4 text-gray-700 text-sm ">
              Over the past year, Volosoft has undergone many changes! After
              months of preparation.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
            >
              Read in 2 minutes
            </a>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article className="max-w-xs">
            <a href="#">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
                className="mb-5 rounded-lg"
                alt="Image 1"
              />
            </a>
            <h2 className="mb-2 text-lg font-semibold leading-tight text-gray-900">
              <a href="#">Our first office</a>
            </h2>
            <p className="mb-4 text-gray-700 text-sm ">
              Over the past year, Volosoft has undergone many changes! After
              months of preparation.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
            >
              Read in 2 minutes
            </a>
          </article>
        </SwiperSlide>
      </Swiper>


    </>
  );
}
