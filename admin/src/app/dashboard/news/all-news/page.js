"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const baseUrl = "https://klipto-inc-abcstudio-server.onrender.com/api/v1";
  const pathUrl = "/dashboard/news/all-news";
  const editUrl = "/dashboard/news/edit";
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${baseUrl}/admin/blog`)
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
        <article key={item._id} className="rounded-xl border border-gray-100 m-3 bg-white p-4 shadow-lg md:p-7 sm:p-6 lg:p-8">
          <div className="lg:flex md:flex lg:space-y-0 md:space-y-0 space-y-3 grid grid-cols-1 items-start sm:gap-8 lg:flex-row md:flex-row">
            <div
              className="rounded lg:w-2/6 lg:h-52 md:h-48 h-60 sm:w-full"
              aria-hidden="true"
            >
              {/* random image from unsplash*/}
              <Link href={`${pathUrl}/${item._id}`}>
              <img
                src={item.blogimage}
                alt="random image from unsplash"
                className="object-cover w-full h-full mb-2 rounded lg:mb-0 md:flex md:mb-0"
              />
              </Link>
            </div>

            <div className="flex flex-col gap-2 sm:space-y-1">
                <span>
                    <button onClick={() => {router.push(`${editUrl}/${item._id}`)}} className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] mr-1 font-medium sm:mt-2 text-white">
                Edit
              </button>
              <button className="rounded border border-red-500 bg-red-500 px-3 py-1.5 text-[10px] font-medium ml-1 sm:mt-2 text-white">
                Delete
              </button>

                </span>
              
              <h3 className="mt-4 text-lg font-medium sm:text-xl">
                <Link href={`${pathUrl}/${item._id}`} className="hover:underline">
                  {" "}
                  {item.title}{" "}
                </Link>
              </h3>

              <p className="mt-1 text-sm text-gray-700">
                {item.shortdescription}
              </p>

              <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                <div className="flex items-center gap-1 text-gray-500">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>

                  <p className="text-xs font-medium">48:32 minutes</p>
                </div>

                <span className="hidden sm:block" aria-hidden="true">
                  &middot;
                </span>

                <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                  Featuring{" "}
                  <a href="#" className="underline hover:text-gray-700">
                    Barry
                  </a>
                  ,
                  <a href="#" className="underline hover:text-gray-700">
                    Sandra
                  </a>{" "}
                  and
                  <a href="#" className="underline hover:text-gray-700">
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
    </main>
  );
};

export default Page;