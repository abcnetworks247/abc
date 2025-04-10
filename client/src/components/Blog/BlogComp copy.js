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

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  // Autoplay progress bar
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  // Fetch blog posts from the server
  const [posts, setPosts] = useState([]);
  const [highlight, setHighlight] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topNews, setTopNews] = useState([]);
  const [popular, setPopular] = useState([]);

  const [africaNews, setAfricaNews] = useState([]);
  const [pressReleases, setPressReleases] = useState([]);
  const [officeOfThePresident, setOfficeOfThePresident] = useState([]);
  const [socioCultural, setSocioCultural] = useState([]);
  const [archivesAndAnalysis, setArchivesAndAnalysis] = useState([]);
  const [breakingNews, setBreakingNews] = useState([]);
  const [sportsNews, setSportsNews] = useState([]);
  const [worldNews, setWorldNews] = useState([]);
  const [interimGovernmentUpdates, setInterimGovernmentUpdates] = useState([]);
  const [businessNews, setBusinessNews] = useState([]);

  useEffect(() => {
    // Fetch blog posts using slugs instead of category names
    Api.get("admin/blog")
      .then((res) => {
        const data = res.data;

        setPosts(data);

        // Update the highlight, trending, top news and popular posts
        setHighlight(data["africa-news-update"]);
        setTrending(data["socio-cultural"]);
        setTopNews(data["breaking-news"]);
        setPopular(data["sports"]);

        // Use slugs instead of names
        setAfricaNews(data["africa-news-update"]);
        setPressReleases(data["secretary-of-state-for-communications"]);
        setOfficeOfThePresident(data["office-of-the-president"]);
        setSocioCultural(data["socio-cultural"]);
        setArchivesAndAnalysis(data["archives-analysis"]);
        setBreakingNews(data["breaking-news"]);
        setSportsNews(data["sports"]);
        setWorldNews(data["world-news"]);
        setInterimGovernmentUpdates(data["government-updates"]);
        setBusinessNews(data["business"]);

        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      });
  }, []);


  if (error) {
    return (
      <div className="h-[50vh] m-5 flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-red-400"></h1>
        <main>
          <div className="flex items-center justify-start h-screen max-w-screen-xl px-4 mx-auto md:px-8">
            <div className="max-w-lg mx-auto space-y-3 text-center">
              <h3 className="font-semibold text-indigo-600">404 Error,</h3>
             
              <p className="text-gray-600">
                Sorry, the post you are looking for could not be found or has
                been removed.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                
                <Link
                  href="/contact"
                  className="block px-4 py-2 font-medium text-gray-700 duration-150 border rounded-lg hover:bg-gray-50 active:bg-gray-100"
                >
                  Contact support
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      {/* // if loading is true, show a skeleton loader. Else, show the blog posts. */}
      {loading ? (
        // skeleton loader
        <div className="flex flex-col gap-5 px-3 space-x-0 lg:flex-row md:flex-row md:space-x-6 mt-28">
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
        <div className="flex justify-center w-full p-2 lg:mt-20">
          {/* <!-- component --> */}
          <div className="w-full p-0 lg:p-5 ">
            <main className="w-full ">
              {/* <!-- featured section --> */}
              <div className="flex flex-col gap-5 space-x-0 lg:flex-row md:flex-row md:space-x-6">
                {/* map throught the the fetched data.highlight */}

                <div className="w-full block  md:w-[50vw]  mb-4 px-1 rounded lg:mb-0 lg:p-0 md:w-4/7">
                  <h2 className="px-2 text-xl font-bold">AMBA News Update</h2>
                  <br />
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
                    {africaNews.map((post) => (
                      <SwiperSlide key={post.shortdescription}>
                        {/* <!-- main post --> */}
                        <div className="relative block w-full py-4 mb-4 rounded lg:mb-0 lg:p-0 md:w-4/7">
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
                          <h1 className="my-6 text-xl font-bold leading-tight text-gray-800 line-clamp-2">
                            {post.title}
                          </h1>
                          <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                            {post.shortdescription}
                          </p>
                          <Link
                            href={`${pathUrl}/${post.slug}`}
                            className="inline-block px-6 py-2.5 mt-2 text-white bg-blue-500 rounded-md"
                          >
                            Read more
                          </Link>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                {/* <!-- sub-main posts --> */}
                <div className="p-0 ">
                  {/* map through trending posts */}
                  <h2 className="px-2 text-xl font-bold">
                    Government Updates
                  </h2>
                  <br />
                  <div className="space-x-0 sm:grid sm:grid-cols-2 md:grid md:grid-cols-1 lg:grid lg:grid-cols-1">
                    {interimGovernmentUpdates.map((post) => (
                      <Link href={`${pathUrl}/${post.slug}`} key={post._id}>
                        <div className="flex flex-row p-0 m-0 mb-5 space-x-0 rounded md:flex-row lg:space-x-3 md:space-x-2 ">
                          <Image
                            src={post.blogimage}
                            height={500}
                            width={200}
                            alt="img"
                            className=" object-top md:w-[200px] rounded-md md:h-[23vh] m-0 p-0 md:m-0 object-cover w-24 h-24"
                          />
                          <div className="px-4 bg-white rounded sm:px-0 ">
                            <span className="hidden text-sm font-semibold text-green-700 md:block">
                              {" "}
                              {post.category}{" "}
                            </span>
                            <div className="mb-2 text-base font-semibold text-gray-800 md:text-sm line-clamp-1 md:line-clamp-2">
                              {post.title}
                            </div>
                            <p className="block p-2 pt-1 pl-0 text-xs text-gray-600 md:hidden lg:block line-clamp-2">
                              {post.shortdescription}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {/* <!-- end featured section --> */}

              {/* <!-- recent posts --> */}
              {worldNews && (
                <div className="">
                  <div className="flex items-center justify-between px-4 mt-10 mb-4 lg:px-0">
                    <h2 className="px-2 text-xl font-bold">World News</h2>
                    {/* <a className="px-3 py-1 text-gray-800 bg-gray-200 rounded cursor-pointer hover:bg-green-200">
                  View all
                </a> */}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                    {/* map through the fetched data.popular */}
                    {worldNews.map((post) => (
                      <div className="w-full p-4 px-0 rounded lg:p-0 ">
                        <Link href={`${pathUrl}/${post.slug}`} key={post._id}>
                          <Image
                            src={post.blogimage}
                            className="rounded object-cover h-[212px] "
                            height={500}
                            width={500}
                            alt="img"
                          />
                          <div className="p-4 pl-0">
                            <h2 className="text-base font-bold text-gray-800 lg:truncate md:line-clamp-1">
                              {post.title}
                            </h2>
                            <p className="mt-2 text-sm text-gray-700 line-clamp-2 ">
                              {post.shortdescription}
                            </p>

                            <span className="inline-block py-2 mt-2 ml-auto text-blue-500 rounded">
                              {" "}
                              Read more{" "}
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* <!-- end recent posts --> */}

              {/* <!-- popular posts --> */}
              {breakingNews && (
                <div className="">
                  <div className="flex items-center justify-between px-4 mt-10 mb-4 lg:px-0">
                    <h2 className="px-2 text-xl font-bold">Breaking news</h2>
                    {/* <a className="px-3 py-1 text-gray-800 bg-gray-200 rounded cursor-pointer hover:bg-green-200">
                  View all
                </a> */}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                    {/* map through top news */}
                    {breakingNews.map((post) => (
                      <div className="w-full p-4 px-0 rounded lg:p-0">
                        <Link href={`${pathUrl}/${post.slug}`} key={post._id}>
                          <Image
                            src={post.blogimage}
                            className="rounded h-[212px] object-cover"
                            height={500}
                            width={500}
                            alt="img"
                          />
                          <div className="p-4 pl-0">
                            <h2 className="text-base font-bold text-gray-800 lg:truncate md:line-clamp-1">
                              {post.title}
                            </h2>
                            <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                              {post.shortdescription}
                            </p>

                            <span className="inline-block py-2 mt-2 ml-auto text-blue-500 rounded">
                              {" "}
                              Read more{" "}
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* <!-- end popular posts --> */}
              {businessNews && (
                <div
                  className={`${
                    businessNews.length < 1
                      ? "hidden"
                      : "space-x-0  sm:grid sm:grid-cols-2 md:grid md:grid-cols-1 lg:grid lg:grid-cols-1"
                  }`}
                >
                  <div className="flex items-center justify-between px-4 mt-10 mb-4 lg:px-0">
                    <h2 className="px-2 text-xl font-bold">Business News</h2>
                    {/* <a className="px-3 py-1 text-gray-800 bg-gray-200 rounded cursor-pointer hover:bg-green-200">
                  View all
                </a> */}
                  </div>
                  {businessNews.map((post) => (
                    <Link href={`${pathUrl}/${post.slug}`} key={post._id}>
                      <div className="flex flex-row gap-2 py-4 m-0 mb-5 space-x-0 rounded shadow-sm md:gap-6 md:flex-row lg:space-x-3 md:space-x-2 md:pr-20 md:items-center">
                        <Image
                          src={post.blogimage}
                          height={500}
                          width={200}
                          alt="img"
                          className=" object-top w-auto h-20 rounded-md md:h-[45vh] md:w-[50vw] m-0 p-0 md:m-0 object-cover"
                        />
                        <div className="px-4 bg-white rounded sm:px-0 md:w-[70vw]">
                          <span className="hidden text-sm font-semibold text-green-700 md:block">
                            {" "}
                            {post.category}{" "}
                          </span>
                          <div className="mb-2 font-semibold text-gray-800 lg:text-xl md:text-sm line-clamp-3">
                            {post.title}
                          </div>
                          <p className="hidden p-2 pt-1 pl-0 text-sm text-gray-600 md:block md:hidden lg:block line-clamp-2">
                            {post.shortdescription}
                          </p>

                          <span className="hidden py-2 ml-auto text-blue-500 rounded md:block md:mt-2 ">
                            {" "}
                            Read more{" "}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {sportsNews && (
                <div className="">
                  <div className="flex items-center justify-between px-4 mt-10 mb-4 lg:px-0">
                    <h2 className="px-2 text-xl font-bold">Sport news</h2>
                    {/* <a className="px-3 py-1 text-gray-800 bg-gray-200 rounded cursor-pointer hover:bg-green-200">
                  View all
                </a> */}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                    {/* map through top news */}
                    {sportsNews.map((post) => (
                      <div className="w-full p-4 px-0 rounded lg:p-0">
                        <Link href={`${pathUrl}/${post.slug}`} key={post._id}>
                          <Image
                            src={post.blogimage}
                            className="rounded h-[212px] object-cover"
                            height={500}
                            width={500}
                            alt="img"
                          />
                          <div className="p-4 pl-0">
                            <h2 className="text-base font-bold text-gray-800 lg:truncate md:line-clamp-1">
                              {post.title}
                            </h2>
                            <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                              {post.shortdescription}
                            </p>

                            <span className="inline-block py-2 mt-2 ml-auto text-blue-500 rounded">
                              {" "}
                              Read more{" "}
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {socioCultural && (
                <div className="">
                  <div className="flex items-center justify-between px-4 mt-10 mb-4 lg:px-0">
                    <h2 className="px-2 text-xl font-bold">
                      Socio cultural news
                    </h2>
                    {/* <a className="px-3 py-1 text-gray-800 bg-gray-200 rounded cursor-pointer hover:bg-green-200">
                  View all
                </a> */}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                    {/* map through top news */}
                    {socioCultural.map((post) => (
                      <div className="w-full p-4 px-0 rounded lg:p-0">
                        <Link href={`${pathUrl}/${post.slug}`} key={post._id}>
                          <Image
                            src={post.blogimage}
                            className="rounded h-[212px] object-cover"
                            height={500}
                            width={500}
                            alt="img"
                          />
                          <div className="p-4 pl-0">
                            <h2 className="text-base font-bold text-gray-800 lg:truncate md:line-clamp-1">
                              {post.title}
                            </h2>
                            <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                              {post.shortdescription}
                            </p>

                            <span className="inline-block py-2 mt-2 ml-auto text-blue-500 rounded">
                              {" "}
                              Read more{" "}
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {archivesAndAnalysis && (
                <div
                  className={`${
                    archivesAndAnalysis.length < 1
                      ? "hidden"
                      : "space-x-0  sm:grid sm:grid-cols-2 md:grid md:grid-cols-1 lg:grid lg:grid-cols-1"
                  }`}
                >
                  <div className="flex items-center justify-between px-4 mt-10 mb-4 lg:px-0">
                    <h2 className="px-2 text-xl font-bold">Business News</h2>
                    {/* <a className="px-3 py-1 text-gray-800 bg-gray-200 rounded cursor-pointer hover:bg-green-200">
                  View all
                </a> */}
                  </div>
                  {archivesAndAnalysis.map((post) => (
                    <Link href={`${pathUrl}/${post.slug}`} key={post._id}>
                      <div className="flex flex-row p-0 m-0 mb-5 space-x-0 rounded md:flex-row lg:space-x-3 md:space-x-2 ">
                        <Image
                          src={post.blogimage}
                          height={500}
                          width={200}
                          alt="img"
                          className=" object-top object-cover w-24 h-24 md:w-[200px] rounded-md md:h-[23vh] m-0 p-0 md:m-0"
                        />
                        <div className="px-4 bg-white rounded sm:px-0 ">
                          <span className="hidden text-sm font-semibold text-green-700 md:block">
                            {" "}
                            {post.category}{" "}
                          </span>
                          <div className="mb-2 text-base font-semibold text-gray-800 md:text-sm">
                            {post.title}
                          </div>
                          <p className="block p-2 pt-1 pl-0 text-xs text-gray-600 md:hidden lg:block line-clamp-2">
                            {post.shortdescription}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </main>
            {/* <!-- main ends here --> */}
          </div>
        </div>
      )}
    </>
  );
}
