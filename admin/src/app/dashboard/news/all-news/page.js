"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const baseUrl = "https://klipto-inc-abcstudio-server.onrender.com/api/v1";
  const pathUrl = "/dashboard/news/all-news";

  useEffect(() => {
    axios
      .get(`${baseUrl}/client/blog`)
      .then((res) => {
        const data = res.data.allblog;
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }, []);
  if (error === true) {
    return (
      // create a professinal error page
      <div className="flex flex-col items-center justify-center gap-3 h-96">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-xl font-semibold text-gray-500 ">
          Please check your internet connection and try again
        </p>
        {/* internet error svg */}
      </div>
    );
  }
  return (
    <main className="px-5 mt-10">
      <h1 className="text-3xl font-bold">All News</h1>
      <br />
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <svg
            className="w-20 h-20 mr-3 -ml-1 text-blue-500 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
              {news.map((item) => (
        <article class="rounded-xl border border-gray-100 m-3 bg-white p-4 shadow-lg md:p-7 sm:p-6 lg:p-8">
          <div class="lg:flex md:flex lg:space-y-0 md:space-y-0 space-y-3 grid grid-cols-1 items-start sm:gap-8 lg:flex-row md:flex-row">
            <div
              className="rounded  lg:w-2/6 lg:h-52 md:h-48 h-60 sm:w-full"
              aria-hidden="true"
            >
              {/* random image from unsplash*/}
              <img
                src={item.blogimage}
                alt="random image from unsplash"
                className="object-cover w-full h-full mb-2 rounded  lg:mb-0 md:flex md:mb-0"
              />
            </div>

            <div className="flex flex-col gap-2 sm:space-y-1">
                <span>
                    <strong class="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] mr-1 font-medium sm:mt-2 text-white">
                Episode #101
              </strong>
              <strong class="rounded border border-red-500 bg-red-500 px-3 py-1.5 text-[10px] font-medium ml-1 sm:mt-2 text-white">
                Episode #101
              </strong>

                </span>
              
              <h3 class="mt-4 text-lg font-medium sm:text-xl">
                <a href="" class="hover:underline">
                  {" "}
                  {item.title}{" "}
                </a>
              </h3>

              <p class="mt-1 text-sm text-gray-700">
                {item.shortdescription}
              </p>

              <div class="mt-4 sm:flex sm:items-center sm:gap-2">
                <div class="flex items-center gap-1 text-gray-500">
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>

                  <p class="text-xs font-medium">48:32 minutes</p>
                </div>

                <span class="hidden sm:block" aria-hidden="true">
                  &middot;
                </span>

                <p class="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                  Featuring{" "}
                  <a href="#" class="underline hover:text-gray-700">
                    Barry
                  </a>
                  ,
                  <a href="#" class="underline hover:text-gray-700">
                    Sandra
                  </a>{" "}
                  and
                  <a href="#" class="underline hover:text-gray-700">
                    August
                  </a>
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
        </div>
      )}

      {news.map((item) => (
        <article class="rounded-xl m-3 bg-white p-4 shadow-lg md:p-7 sm:p-6 lg:p-8">
          <div class="lg:flex lg:space-y-0 md:space-y-0 space-y-3 grid grid-cols-1 items-start sm:gap-8 lg:flex-row md:flex-row">
            <div
              className="rounded  lg:w-2/6 lg:h-52 md:h-48 h-60 sm:w-full"
              aria-hidden="true"
            >
              {/* random image from unsplash*/}
              <img
                src={item.blogimage}
                alt="random image from unsplash"
                className="object-cover w-full h-full mb-2 rounded  lg:mb-0 md:flex md:mb-0"
              />
            </div>

            <div className="flex flex-col gap-2 sm:space-y-1">
                <span>
                    <strong class="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] mr-1 font-medium sm:mt-2 text-white">
                Episode #101
              </strong>
              <strong class="rounded border border-red-500 bg-red-500 px-3 py-1.5 text-[10px] font-medium ml-1 sm:mt-2 text-white">
                Episode #101
              </strong>

                </span>
              
              <h3 class="mt-4 text-lg font-medium sm:text-xl">
                <a href="" class="hover:underline">
                  {" "}
                  {item.title}{" "}
                </a>
              </h3>

              <p class="mt-1 text-sm text-gray-700">
                {item.shortdescription}
              </p>

              <div class="mt-4 sm:flex sm:items-center sm:gap-2">
                <div class="flex items-center gap-1 text-gray-500">
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>

                  <p class="text-xs font-medium">48:32 minutes</p>
                </div>

                <span class="hidden sm:block" aria-hidden="true">
                  &middot;
                </span>

                <p class="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                  Featuring{" "}
                  <a href="#" class="underline hover:text-gray-700">
                    Barry
                  </a>
                  ,
                  <a href="#" class="underline hover:text-gray-700">
                    Sandra
                  </a>{" "}
                  and
                  <a href="#" class="underline hover:text-gray-700">
                    August
                  </a>
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </main>
  );
};

export default Page;
