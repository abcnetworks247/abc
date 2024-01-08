"use client";
import Image from "next/image";
import FooterComp from "../Footer/FooterComp";
import Newsletter from "../newsletter/Newsletter";
import React, { useRef, useState, useEffect } from "react";
import Api from "@/utils/Api";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Navigation, HashNavigation } from "swiper/modules";
// import link
import Link from "next/link";

export default function () {
  const [loading, setLoading] = useState(true);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  // autoplay progress bar
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  // store path url in a constant
  const pathUrl = "/blog";
  // fetch blog posts from the server
  const [posts, setPosts] = useState([]);
  // store the highlighted post in a state
  const [highlight, setHighlight] = useState([]);
  // store the trending post in a state
  const [trending, setTrending] = useState([]);
  // store the top news posts in a state
  const [topNews, setTopNews] = useState([]);
  // store the popular posts in a state
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    // use the base url and the endpoint to fetch the blog posts
    Api
      .get("admin/blog")
      .then((res) => {
        const data = res.data;
        setPosts(data);
        // update the highlight, trending, top news and popular posts
        setHighlight(data.highlight);
        setTrending(data.trending);
        setTopNews(data.top);
        setPopular(data.popular);
        // set the loading state to false
        setLoading(false);
        console.log("the blog", data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* // if loading is true, show a skeleton loader. Else, show the blog posts. */}
      {loading ? (
        // skeleton loader
        <div className="flex flex-col gap-5 px-3 space-x-0 lg:flex-row md:flex-row md:space-x-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              className="block w-full px-1 mb-4 rounded animate-pulse lg:mb-0 lg:p-0 md:w-4/7"
              key={index}
            >
              <div className="relative block w-full p-4 py-4 mb-4 rounded lg:mb-0 lg:p-0 md:w-4/7">
                <div className="bg-gray-200 rounded-md h-60 md:h-[60vh]"></div>
                <span className="hidden mt-4 text-sm text-green-700 md:block">
                  {" "}
                  <div className="w-20 h-4 bg-gray-200 rounded-md"></div>{" "}
                </span>
                <div className="my-6 text-xl font-bold leading-tight text-gray-800">
                  <div className="w-40 h-4 bg-gray-200 rounded-md"></div>
                </div>
                <div className="mb-4 text-sm text-gray-600">
                  <div className="h-4 bg-gray-200 rounded-md w-60"></div>
                </div>
                <a
                  href="#"
                  className="inline-block px-6 py-3 mt-2 text-gray-100 bg-gray-100 rounded-md animate-bounce"
                ></a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-red-200 flex justify-center items-center">
          {/* <!-- component --> */}
          <div className="w-full  md:max-w-screen-xl md:px-10 border-2 ">
            <main className="">
              {/* <!-- featured section --> */}
              <div className="flex flex-col gap-5 space-x-0 lg:flex-row md:flex-row md:space-x-6">
                {/* map throught the the fetched data.highlight */}

                <div className=" block  md:w-[50vw]  mb-4 px-1 rounded lg:mb-0 lg:p-0 md:w-4/7">
                <h2 className="text-xl font-bold">Highlight</h2>
                  <Swiper
                    spaceBetween={30}
                    hashNavigation={{
                      watchState: true,
                    }}
                    autoplay={{
                      delay: 5000,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={false}
                    modules={[Autoplay, Navigation, HashNavigation]}
                    className="mySwiper"
                  >
                    {/* map through the fetched data.highlight */}
                    {highlight.map((post) => (
                      
                      <SwiperSlide  key={post.shortdescription}>
                        {/* <!-- main post --> */}
                        <div
                          className="relative block w-full p-4 py-4 mb-4 rounded lg:mb-0 lg:p-0 md:w-4/7"
                         
                        >
                          <Image
                            src={post.blogimage}
                            height={500}
                            width={500}
                            alt="img"
                            className="object-cover w-full h-60 md:h-[60vh] rounded-md"
                          />
                          <span className="hidden mt-4 text-sm text-green-700 md:block">
                            {" "}
                            {post.category}{" "}
                          </span>
                          <h1 className="my-6 text-xl font-bold leading-tight text-gray-800">
                            {post.title}
                          </h1>
                          <p className="mb-4 text-sm text-gray-600">
                            {post.shortdescription}
                          </p>
                          <Link
                            href={`${pathUrl}/${post._id}`}
                            className="inline-block px-6 py-3 mt-2 text-white bg-blue-800 rounded-md"
                          >
                            Read more
                          </Link>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                {/* <!-- sub-main posts --> */}
                <div className="w-full md:w-4/7">
                  {/* map through trending posts */}
                  <h2 className="text-xl font-bold">Trending</h2>
                  {trending.map((post) => (
                    <Link href={`${pathUrl}/${post._id}`} key={post._id}>
                      <div className="flex flex-col w-full mb-10 rounded md:flex-row">
                        <Image
                          src={post.blogimage}
                          height={500}
                          width={500}
                          alt="img"
                          className="block object-cover w-auto h-[60vh] m-4 rounded-md md:hidden lg:block md:h-[23vh] md:m-0"
                        />
                        <div className="px-4 bg-white rounded">
                          <span className="hidden text-sm text-green-700 md:block">
                            {" "}
                            {post.category}{" "}
                          </span>
                          <div className="mb-2 text-base font-semibold text-gray-800 md:mt-0">
                            {post.title}
                          </div>
                          <p className="block p-2 pt-1 pl-0 text-sm text-gray-600 md:hidden ">
                            {post.shortdescription}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              {/* <!-- end featured section --> */}

              {/* <!-- recent posts --> */}
              <div className="flex items-center justify-between px-4 mt-16 mb-4 lg:px-0">
                <h2 className="text-3xl font-bold">Popular news</h2>
                {/* <a className="px-3 py-1 text-gray-800 bg-gray-200 rounded cursor-pointer hover:bg-green-200">
                  View all
                </a> */}
              </div>
              <div className="block space-x-0 lg:flex lg:space-x-6">
                {/* map through the fetched data.popular */}
                {popular.map((post) => (
                  <div className="w-full p-4 rounded lg:w-1/2 xl:w-1/3 lg:p-0">
                    <Link href={`${pathUrl}/${post._id}`} key={post._id}>
                      <Image
                        src={post.blogimage}
                        className="rounded h-[212px]"
                        height={500}
                        width={500}
                        alt="img"
                      />
                      <div className="p-4 pl-0">
                        <h2 className="text-base font-bold text-gray-800">
                          {post.title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-700">
                          {post.shortdescription}
                        </p>

                        <span
                          className="inline-block py-2 mt-2 ml-auto text-green-900 rounded"
                        >
                          {" "}
                          Read more{" "}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              {/* <!-- end recent posts --> */}

              {/* <!-- subscribe --> */}
              <Newsletter />
              {/* <!-- ens subscribe section --> */}

              {/* <!-- popular posts --> */}
              <div className="flex items-center justify-between px-4 mt-16 mb-4 lg:px-0">
                <h2 className="text-3xl font-bold">Top news</h2>
                {/* <a className="px-3 py-1 text-gray-800 bg-gray-200 rounded cursor-pointer hover:bg-green-200">
                  View all
                </a> */}
              </div>
              <div className="block space-x-0 lg:flex lg:space-x-6">
                {/* map through top news */}
                {topNews.map((post) => (
                  <div className="w-full p-4 rounded lg:w-1/2 xl:w-1/3 lg:p-0">
                    <Link href={`${pathUrl}/${post._id}`} key={post._id}>
                      <Image
                        src={post.blogimage}
                        className="rounded h-[212px]"
                        height={500}
                        width={500}
                        alt="img"
                      />
                      <div className="p-4 pl-0">
                        <h2 className="text-base font-bold text-gray-800">
                          {post.title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-700">
                          {post.shortdescription}
                        </p>

                        <span
                          className="inline-block py-2 mt-2 ml-auto text-green-900 rounded"
                        >
                          {" "}
                          Read more{" "}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              {/* <!-- end popular posts --> */}
            </main>
            {/* <!-- main ends here --> */}
          </div>
          
        </div>
      )}
    </>
  );
}
