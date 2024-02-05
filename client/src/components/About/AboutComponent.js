"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image } from "next/image";
import Api from "@/utils/Api";
import parse from "html-react-parser";
import React, { useState, useEffect } from "react";

export default function AboutComponent() {

  const [about, setAbout] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aboutImageSrc, setAboutImageSrc] = useState(null);

  const fetchAbout = async () => {
    try {
      const response = await Api.get("admin/pages/about");
      const data = await response.data;
      setAbout(data.data.description);
      setAboutImageSrc(data.data.image);
      console.log("check", response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching privacy content:", error);
    }
  };

  const data = {
    description: about,
    image: aboutImageSrc,
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const pathname = usePathname();
  return (
    <>
      <div>
        {pathname === "/" ? (
          <section className="bg-gray-100">
            <div className="container mx-auto py-16 px-4 sm:px-3 lg:px-3">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                <div className="max-w-lg">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    About Us
                  </h2>

                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className="text-blue-500 hover:text-blue-600 font-medium"
                    >
                      For more information, visit our contact us page.
                      <span className="ml-2">&#8594;</span>
                    </Link>
                  </div>
                </div>
                <div className="mt-12 md:mt-0 w-full">
                  <Image
                    // link to a random image from unsplash source: https://source.unsplash.com/random
                    height={500}
                    width={500}
                    src="https://source.unsplash/random"
                    alt="About Us Image"
                    className="object-cover w-full rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-gray-100">
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                <div className="max-w-lg">
                  <h2 className="text-lg font-semibold text-gray-900 sm:text-4xl">
                    About Us
                  </h2>
                  <div className="flex flex-wrap">{parse(`${about}`)}</div>
                </div>
                <div className="mt-12 md:mt-0">
                  <img
                    // link to a random image from unsplash source: https://source.unsplash.com/random
                    src={ aboutImageSrc }
                    alt="About Us Image"
                    className="object-cover rounded-lg shadow-md h-[60vh] lg:w-[60vw] md:w-auto w-auto"
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      {/* <section className="bg-gray-100 text-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-3xl">
              Kickstart your marketing
            </h2>

            <p className="mt-4 text-gray-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Consequuntur aliquam doloribus nesciunt eos fugiat. Vitae aperiam
              fugit consequuntur saepe laborum.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <a
              className="block rounded-xl border border-gray-200 p-8 shadow-xl transition hover:border-blue-500 hover:shadow-blue-500/10"
              href="/about#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                 strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>

              <h2 className="mt-4 text-lg font-bold text-gray-900">
                Digital campaigns
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut
                quo possimus adipisci distinctio alias voluptatum blanditiis
                laudantium.
              </p>
            </a>
            <a
              className="block rounded-xl border border-gray-200 p-8 shadow-xl transition hover:border-blue-500 hover:shadow-blue-500/10"
              href="/about#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                 strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>

              <h2 className="mt-4 text-lg font-bold text-gray-900">
                Digital campaigns
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut
                quo possimus adipisci distinctio alias voluptatum blanditiis
                laudantium.
              </p>
            </a>
            <a
              className="block rounded-xl border border-gray-200 p-8 shadow-xl transition hover:border-blue-500 hover:shadow-blue-500/10"
              href="/about#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                 strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>

              <h2 className="mt-4 text-lg font-bold text-gray-900">
                Digital campaigns
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut
                quo possimus adipisci distinctio alias voluptatum blanditiis
                laudantium.
              </p>
            </a>
            <a
              className="block rounded-xl border border-gray-200 p-8 shadow-xl transition hover:border-blue-500 hover:shadow-blue-500/10"
              href="/about#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                 strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>

              <h2 className="mt-4 text-lg font-bold text-gray-900">
                Digital campaigns
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut
                quo possimus adipisci distinctio alias voluptatum blanditiis
                laudantium.
              </p>
            </a>
            <a
              className="block rounded-xl border border-gray-200 p-8 shadow-xl transition hover:border-blue-500 hover:shadow-blue-500/10"
              href="/about#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                 strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>

              <h2 className="mt-4 text-lg font-bold text-gray-900">
                Digital campaigns
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut
                quo possimus adipisci distinctio alias voluptatum blanditiis
                laudantium.
              </p>
            </a>
            <a
              className="block rounded-xl border border-gray-200 p-8 shadow-xl transition hover:border-blue-500 hover:shadow-blue-500/10"
              href="/about#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                 strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>

              <h2 className="mt-4 text-lg font-bold text-gray-900">
                Digital campaigns
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut
                quo possimus adipisci distinctio alias voluptatum blanditiis
                laudantium.
              </p>
            </a>

           
          </div>

          <div className="mt-12 text-center">
            <a
              href="#"
              className="inline-block rounded bg-gray-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-gray-900 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section> */}
    </>
  );
}
