/**
 * Renders a page component for displaying a specific news article.
 * @returns {JSX.Element} The rendered page component.
 */
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Api from "@/utils/Api";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import FooterComp from "@/components/Footer/FooterComp";
import Link from "next/link";
import Sidebar from "@/components/sidebar/Sidebar";
import Nav1 from "@/components/navbar/Nav1";

function page() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [newstype, setNewsType] = useState(null);
  // const [type, setType] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //

  const pathUrl = "/blog";

  const fetchData = async () => {
    try {
      //   setLoading(true);
      const res = await Api.get(`admin/blog/news/${id}`);
      const newdata = res.data.data;
      const type = res.data.name;

      setData(newdata);
      setNewsType(type);

      console.log(type);
      // if res is empty, setError true
      if (res.data.data.length === 0) {
        setError("No data found");
      }


      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (error) {
    return (
      // page not found
      <>
        <Nav1 />
        <div className="bg-[#111827] sticky top-0 z-[10]">
          <Navbar />
        </div>

        <main>
          <div className="flex items-center justify-start h-screen max-w-screen-xl px-4 mx-auto md:px-8">
            <div className="max-w-lg mx-auto space-y-3 text-center">
              <h3 className="font-semibold text-indigo-600">404 Error,</h3>
              <p className="text-4xl font-semibold text-gray-800 sm:text-5xl">
                {error}
              </p>
              <p className="text-gray-600">
                Sorry, the post you are looking for could not be found or has
                been removed.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/"
                  className="flex flex-row items-center gap-2 px-4 py-2 font-medium text-white duration-150 bg-blue-500 rounded-lg item hover:bg-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Go Back
                </Link>
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
        <Sidebar />
        <FooterComp />
      </>
    );
  }
  return (
    <>
      <Nav1 />
      <div className="bg-[#111827] sticky top-0 z-[10]">
        <Navbar />
      </div>
      <Sidebar />
      {loading ? (
        <div className="flex items-center justify-center h-[70svh] lg:h-[100vh]">
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
        <div className="px-2 md:px-4 lg:px-8 my-10">
          <div className="px-4 pt-4 mx-auto text-xl font-bold">
            results for: {newstype}
          </div>

          <section className="flex flex-row flex-wrap mx-auto ">
            {data &&
              data.map((item) => (
                <div
                  key={item._id}
                  className="flex w-full px-4 py-6 transition-all duration-150 md:w-1/2 lg:w-1/3"
                >
                  <div className="flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-md">
                    <div className="md:flex-shrink-0">
                      <Image
                        alt=""
                        height={300}
                        width={500}
                        src={item.blogimage}
                        className="object-cover object-top w-full h-48 rounded-lg rounded-b-none"
                      ></Image>
                    </div>
                    <div className="flex items-center justify-between px-4 py-6 overflow-hidden">
                      <span className="text-xs font-medium text-blue-600 uppercase text-ellipsis">
                        {item.category}
                      </span>
                      <div className="flex flex-row items-center"></div>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex flex-wrap items-start flex-1 px-4 py-1 mx-auto text-start">
                      <Link
                        href={`${pathUrl}/${item._id}`}
                        className="hover:underline"
                      >
                        <h2 className="text-lg font-bold tracking-normal text-left text-gray-800 line-clamp-1">
                          {item.title}
                        </h2>
                      </Link>
                    </div>
                    <hr className="border-gray-300" />
                    <p className="flex flex-row flex-wrap h-full w-full px-4 py-2 overflow-hidden text-sm text-justify text-gray-700">
                      {item.shortdescription}
                    </p>
                    <hr className="border-gray-300" />
                    <section className="px-4 py-2 mt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <span className="mx-1 text-xs text-gray-600">
                            {item.createdAt}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-600">
                          9 minutes read
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              ))}
          </section>
        </div>
      )}
      <FooterComp />
    </>
  );
}

export default page;
