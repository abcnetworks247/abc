"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, HashNavigation } from "swiper/modules";
import { blogData } from "./../../../contexts/UserContext";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Api from "@/utils/Api";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  // News state
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
  const [ambaNews, setAmbaNews] = useState([]);

  // Newsletter state
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState(null);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  // Autoplay progress
  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  useEffect(() => {
    setLoading(true);

    // Function to process and log the API response
    // const fetchBlogPosts = async () => {
    //   try {
    //     console.log("Try fetching blog posts 2");
    //     // const res = await Api.get("admin/blog");

    //     console.log("Try fetching blog posts 3");

    //     // Check if response status is 200
    //     if (res.status !== 200) {
    //       console.error(`Unexpected response status: ${res.status}`);
    //       setError(`Unexpected response status: ${res.status}`);
    //       setLoading(false);
    //       return;
    //     }

    //     console.log("Try fetching blog posts 4");

    //     const data = res.data;

    //     // Log the entire response
    //     console.log("API Response:", data);

    //     // Ensure that data is an object before setting state
    //     // if (!data || typeof data !== "object") {
    //     //   setError("Invalid response format");
    //     //   setLoading(false);
    //     //   return;
    //     // }

    //     setPosts(data);

    //     // Log individual categories before setting them
    //     console.log("Highlight:", data["africa-news-update"]);
    //     console.log("Trending:", data["socio-cultural"]);
    //     console.log("Top News:", data["breaking-news"]);
    //     console.log("Popular:", data["sports"]);

    //     // Setting blog categories using slugs
    //     setHighlight(data["africa-news-update"] || []);
    //     setTrending(data["socio-cultural"] || []);
    //     setTopNews(data["breaking-news"] || []);
    //     setPopular(data["sports"] || []);
    //     setAfricaNews(data["africa-news-update"] || []);
    //     setPressReleases(data["secretary-of-state-for-communications"] || []);
    //     setOfficeOfThePresident(data["office-of-the-president"] || []);
    //     setSocioCultural(data["socio-cultural"] || []);
    //     setArchivesAndAnalysis(data["archives-analysis"] || []);
    //     setBreakingNews(data["breaking-news"] || []);
    //     setSportsNews(data["sports"] || []);
    //     setWorldNews(data["world-news"] || []);
    //     setInterimGovernmentUpdates(data["government-updates"] || []);
    //     setBusinessNews(data["business"] || []);

    //     setLoading(false);
    //   } catch (err) {
    //     // console.error("Error fetching blogs:", err);
    //     // setError(err.response?.data?.message || "Something went wrong");
    //     // setLoading(false);
    //   }
    // };

    // fetchBlogPosts();

    const getBlog = async () => {
      try {
        const res = await Api.get("admin/blog");

        // Check if the response is successful
        if (res.status !== 200) {
          console.error(`Unexpected response status: ${res.status}`);
          setError(`Unexpected response status: ${res.status}`);
          setLoading(false);
          return;
        }

        const data = res.data;
        console.log("Fetched blog data:", data);

        if (!data || typeof data !== "object") {
          console.error("Invalid blog data format");
          setError("Invalid blog data format");
          setLoading(false);
          return;
        }

        // Function to sort blogs by date (assuming each blog has a "date" field)
        const sortBlogs = (blogs) => {
          return (
            blogs?.sort((a, b) => new Date(b.date) - new Date(a.date)) || []
          );
        };

        // Categorizing and sorting blogs dynamically
        // const categories = {
        //   highlight: "africa-news-update",
        //   trending: "socio-cultural",
        //   topNews: "breaking-news",
        //   popular: "sports",
        //   africaNews: "africa-news-update",
        //   pressReleases: "secretary-of-state-for-communications",
        //   officeOfThePresident: "office-of-the-president",
        //   socioCultural: "socio-cultural",
        //   archivesAndAnalysis: "archives-analysis",
        //   breakingNews: "breaking-news",
        //   sportsNews: "sports",
        //   worldNews: "world-news",
        //   interimGovernmentUpdates: "government-updates",
        //   businessNews: "business",
        // };

        // // Updating state dynamically with sorted blog posts
        // Object.entries(categories).forEach(([stateSetter, categoryKey]) => {
        //   const sortedBlogs = sortBlogs(data[categoryKey]);
        //   eval(
        //     `set${stateSetter.charAt(0).toUpperCase() + stateSetter.slice(1)}`
        //   )(sortedBlogs);
        // });

        // Setting blog categories using slugs
        setHighlight(data.blogsByType["africa-news-update"] || []);
        setTrending(data.blogsByType["socio-cultural"] || []);
        setTopNews(data.blogsByType["breaking-news"] || []);
        setPopular(data.blogsByType["sports"] || []);
        setAfricaNews(data.blogsByType["africa-news-update"] || []);
        setPressReleases(
          data.blogsByType["secretary-of-state-for-communications"] || []
        );
        setOfficeOfThePresident(
          data.blogsByType["office-of-the-president"] || []
        );
        setSocioCultural(data.blogsByType["socio-cultural"] || []);
        setArchivesAndAnalysis(data.blogsByType["archives-analysis"] || []);
        setBreakingNews(data.blogsByType["breaking-news"] || []);
        setSportsNews(data.blogsByType["sports"] || []);
        setWorldNews(data.blogsByType["world-news"] || []);
        setInterimGovernmentUpdates(
          data.blogsByType["government-updates"] || []
        );
        setBusinessNews(data.blogsByType["business"] || []);
        setAmbaNews(data.blogsByType["amba-news"] || []);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError("Failed to fetch blog posts");
        setLoading(false);
      }
    };

    getBlog();
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscribeError(null);
    setSubscribeSuccess(false);

    try {
      await Api.post("newsletter/subscribe", { email });
      setSubscribeSuccess(true);
      setEmail("");
    } catch (err) {
      setSubscribeError(err.response?.data?.message || "Failed to subscribe");
    } finally {
      setIsSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto animate-pulse space-y-8 px-4 mt-5 lg:mt-20">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="h-8 w-48 rounded-md bg-gray-200" />
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="space-y-4">
                  <div className="aspect-[4/3] w-full rounded-lg bg-gray-200" />
                  <div className="h-4 w-full rounded-md bg-gray-200" />
                  <div className="h-4 w-2/3 rounded-md bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto flex min-h-[50vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">{error}</h1>
          <p className="mt-2 text-gray-600">
            Please try again later or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center w-full p-2 mt-5 lg:mt-20">
        <div className="w-full p-0 lg:p-5">
          <main className="w-full">
            {/* Featured Section */}
            <div className="flex flex-col gap-5 space-x-0 lg:flex-row md:flex-row md:space-x-6">
              <div className="w-full block md:w-[50vw] mb-4 px-1 rounded lg:mb-0 lg:p-0">
                <h2 className="px-2 text-xl font-bold">AMBA News</h2>
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
                  onAutoplayTimeLeft={onAutoplayTimeLeft}
                  className="mySwiper"
                >
                  {ambaNews.map((post) => (
                    <SwiperSlide key={post._id}>
                      <div className="relative block w-full py-4 mb-4 rounded lg:mb-0 lg:p-0">
                        <Image
                          src={post.blogimage || "/placeholder.svg"}
                          height={500}
                          width={500}
                          alt={post.title}
                          className="object-cover w-full h-60 md:h-[60vh] rounded-md"
                        />
                        <span className="hidden mt-4 text-sm text-green-700 md:block">
                          {post.category}
                        </span>
                        <h1 className="my-6 text-xl font-bold leading-tight text-gray-800 line-clamp-2">
                          {post.title}
                        </h1>
                        <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                          {post.shortdescription}
                        </p>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-block px-6 py-2.5 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Read more
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Government Updates */}
              <div className="p-0">
                <h2 className="px-2 text-xl font-bold">Government Updates</h2>
                <br />
                <div className="space-x-0 sm:grid sm:grid-cols-2 md:grid md:grid-cols-1 lg:grid lg:grid-cols-1">
                  {interimGovernmentUpdates.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post._id}>
                      <div className="flex flex-row p-0 m-0 mb-5 space-x-0 rounded md:flex-row lg:space-x-3 md:space-x-2">
                        <Image
                          src={post.blogimage || "/placeholder.svg"}
                          height={500}
                          width={200}
                          alt={post.title}
                          className="object-top md:w-[200px] rounded-md md:h-[23vh] m-0 p-0 md:m-0 object-cover w-24 h-24"
                        />
                        <div className="px-4 bg-white rounded sm:px-0">
                          <span className="hidden text-sm font-semibold text-green-700 md:block">
                            {post.category}
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

            {/* World News Section */}
            {worldNews.length > 0 && (
              <div className="mt-12">
                <h2 className="px-2 text-xl font-bold mb-6">World News</h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {worldNews.map((post) => (
                    <div
                      key={post._id}
                      className="w-full p-4 px-0 rounded lg:p-0"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <Image
                          src={post.blogimage || "/placeholder.svg"}
                          height={500}
                          width={500}
                          alt={post.title}
                          className="rounded object-cover h-[212px] w-full"
                        />
                        <div className="p-4 pl-0">
                          <h2 className="text-base font-bold text-gray-800 lg:truncate md:line-clamp-1">
                            {post.title}
                          </h2>
                          <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                            {post.shortdescription}
                          </p>
                          <span className="inline-block py-2 mt-2 text-blue-500">
                            Read more
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Breaking News Section */}
            {breakingNews.length > 0 && (
              <div className="mt-12">
                <h2 className="px-2 text-xl font-bold mb-6">Breaking News</h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {breakingNews.map((post) => (
                    <div
                      key={post._id}
                      className="w-full p-4 px-0 rounded lg:p-0"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <Image
                          src={post.blogimage || "/placeholder.svg"}
                          height={500}
                          width={500}
                          alt={post.title}
                          className="rounded h-[212px] object-cover w-full"
                        />
                        <div className="p-4 pl-0">
                          <h2 className="text-base font-bold text-gray-800 lg:truncate md:line-clamp-1">
                            {post.title}
                          </h2>
                          <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                            {post.shortdescription}
                          </p>
                          <span className="inline-block py-2 mt-2 text-blue-500">
                            Read more
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Business News Section */}
            {businessNews.length > 0 && (
              <div className="mt-12">
                <h2 className="px-2 text-xl font-bold mb-6">Business News</h2>
                <div className="space-x-0 sm:grid sm:grid-cols-2 md:grid md:grid-cols-1 lg:grid lg:grid-cols-1">
                  {businessNews.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post._id}>
                      <div className="flex flex-row gap-2 py-4 m-0 mb-5 space-x-0 rounded shadow-sm md:gap-6 md:flex-row lg:space-x-3 md:space-x-2 md:pr-20 md:items-center">
                        <Image
                          src={post.blogimage || "/placeholder.svg"}
                          height={500}
                          width={200}
                          alt={post.title}
                          className="object-top w-auto h-20 rounded-md md:h-[45vh] md:w-[50vw] m-0 p-0 md:m-0 object-cover"
                        />
                        <div className="px-4 bg-white rounded sm:px-0 md:w-[70vw]">
                          <span className="hidden text-sm font-semibold text-green-700 md:block">
                            {post.category}
                          </span>
                          <div className="mb-2 font-semibold text-gray-800 lg:text-xl md:text-sm line-clamp-3">
                            {post.title}
                          </div>
                          <p className="hidden p-2 pt-1 pl-0 text-sm text-gray-600 md:block md:hidden lg:block line-clamp-2">
                            {post.shortdescription}
                          </p>
                          <span className="hidden py-2 ml-auto text-blue-500 rounded md:block md:mt-2">
                            Read more
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sports News Section */}
            {sportsNews.length > 0 && (
              <div className="mt-12">
                <h2 className="px-2 text-xl font-bold mb-6">Sports News</h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {sportsNews.map((post) => (
                    <div
                      key={post._id}
                      className="w-full p-4 px-0 rounded lg:p-0"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <Image
                          src={post.blogimage || "/placeholder.svg"}
                          height={500}
                          width={500}
                          alt={post.title}
                          className="rounded h-[212px] object-cover w-full"
                        />
                        <div className="p-4 pl-0">
                          <h2 className="text-base font-bold text-gray-800 lg:truncate md:line-clamp-1">
                            {post.title}
                          </h2>
                          <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                            {post.shortdescription}
                          </p>
                          <span className="inline-block py-2 mt-2 text-blue-500">
                            Read more
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
