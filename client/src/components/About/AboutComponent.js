"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image } from "next/image";
import Api from "@/utils/Api";
import parse from "html-react-parser";
import React, { useState, useEffect } from "react";

export default function AboutComponent() {

  const [about, setAbout] = useState("");
  const [about2, setAbout2] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aboutImageSrc, setAboutImageSrc] = useState(null);

  const fetchAbout = async () => {
    try {
      const response = await Api.get("admin/pages/about");
      const data = await response.data;
      setAbout(data.data.description);
      setAbout2(data.data.description2);
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
            <div className="container px-4 py-16 mx-auto sm:px-3 lg:px-3">
              <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
                <div className="max-w-lg">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    About Us
                  </h2>

                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className="font-medium text-blue-500 hover:text-blue-600"
                    >
                      For more information, visit our contact us page.
                      <span className="ml-2">&#8594;</span>
                    </Link>
                  </div>
                </div>
                <div className="w-full mt-12 md:mt-0">
                  <Image
               
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
            <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8">
              <div className="grid items-center grid-cols-1 gap-10 md:grid-cols-2">
                <div className="max-w-lg">
                  <h2 className="text-lg font-semibold text-gray-900 sm:text-4xl">
                    About Us
                  </h2>
                  <div className="flex flex-wrap">{parse(`${about}`)}</div>
                </div>
                <div className="mt-12 md:mt-0">
                  <img
                    src={aboutImageSrc}
                    alt="About Us Image"
                    className="object-cover rounded-lg shadow-md h-[60vh] lg:w-[60vw] md:w-auto w-auto"
                  />
                </div>
              </div>

              <div className="flex flex-wrap mt-10">{parse(`${about2}`)}</div>
            </div>
          </section>
        )}
      </div>
   
    </>
  );
}
