"use client";
import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
//import axios
import axios from "axios";
export default function RelatedArticles({ id }) {
  //state for articles
  const [articles, setArticles] = useState([]);
  //state for loading
  const [loading, setLoading] = useState(false);

  //useEffect hook to fetch data from api
  const fetchArticles = async () => {
    try {
      setLoading(true);
      //fetch all blogs
      const blogRes = await axios.get(
        "https://klipto-inc-abcstudio-server.onrender.com/api/v1/client/blog"
      );
      //fetch blog by the id
      const idRes = await axios.get(
        `https://klipto-inc-abcstudio-server.onrender.com/api/v1/client/blog/${id}`
      );
      // if the category of the fetched blog is equal to the category of id then return the data
      const cat = idRes.data.blogdata.category;
      const data = blogRes && blogRes.data.allblog;
      console.log("data", data);
      const filteredData = data.filter(
        (item) => item.category === cat && item._id !== idRes.data.blogdata._id
      );
      setArticles(filteredData);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <h2 className="mb-8 text-2xl font-bold text-gray-900">
        Related articles
      </h2>
      {
        //if loading is true then show loading
        loading ? (
          <div className="flex items-center justify-center h-[20vh]">
            <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <Swiper
              slidesPerView={4}
              // centeredSlides={true}
              spaceBetween={20}
              autoplay={true}
              navigation={false}
              //make it infinite
              loop={true}
              cardsEffect={"coverflow"}
              pagination={{
                type: "progressbar",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              // autoplay duration
              speed={3000}
              width={900}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {
                //map through the articles
                articles &&
                  articles.map((article) => {
                    return (
                      <SwiperSlide>
                        <article className="max-w-xs">
                          <a href="#">
                            <img
                              src={article.blogimage}
                              className="mb-5 rounded-lg"
                              alt="Image 1"
                            />
                          </a>
                          <h2 className="mb-2 text-lg font-semibold leading-tight text-gray-900">
                            <a href="#">{article.title}</a>
                          </h2>
                          <p className="mb-4 text-gray-700 text-sm ">
                            {article.shortdescription}
                          </p>
                          <a
                            href="#"
                            className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                          >
                            Read in 2 minutes
                          </a>
                        </article>
                      </SwiperSlide>
                    );
                  })
              }
            </Swiper>
          </>
        )
      }
    </>
  );
}
