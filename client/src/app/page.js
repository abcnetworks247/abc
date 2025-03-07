"use client";
import BlogComp from "@/components/Blog/BlogComp";
import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Marquee from "react-fast-marquee";
import FooterComp from "@/components/Footer/FooterComp";
import Banner from "@/components/Home/HomeBanner";
import Newsletter from "@/components/newsletter/Newsletter";
import Nav1 from "@/components/navbar/Nav1";
import Link from "next/link";
import Api from "@/utils/Api";

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [newsUpdate, setNewsUpdate] = useState([]);

  // Remove fallback news updates array
  // const fallbackNewsUpdates = [ ... ] // Removed

  useEffect(() => {
    // Check if the current path is the home page ("/")
    if (pathname === "/") {
      // Check if the flag is not set in localStorage
      if (typeof window !== "undefined") {
        if (!localStorage.getItem("hasReloaded")) {
          // Reload the page once
          window.location.reload();
          // Set the flag in localStorage to indicate that the page has been reloaded
          localStorage.setItem("hasReloaded", "true");
        }
      }
    }
  }, [pathname]); // Include pathname in the dependency array

  const fetchData = useCallback(async () => {
    try {
      const response = await Api.get("admin/category/news/update");

      if (response.status === 200) {
        // Sort by position before setting state
        const sortedNews = response.data.data.sort(
          (a, b) => a.position - b.position
        );
        setNewsUpdate(sortedNews);
      }
    } catch (error) {
      console.error("Error fetching news updates:", error);
      // No fallback data, just show empty state or error message
      setNewsUpdate([]);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main>
      {/* navbar component  */}
      <Nav1 />
      <div className="bg-[#111827] sticky top-0 z-40">
        <Navbar />
      </div>
      <Sidebar />

      <div className="relative flex flex-row items-center bg-white border border-gray-400 shadow-md">
        <div className="absolute z-10 px-4 top-0 left-0 flex items-center justify-center first-line:px-3 py-1 bg-blue-600 rounded-[3px] border-gray-600 shadow-md w-fit h-10">
          <span className="font-[7px] text-sm text-white w-full">
            NEWS UPDATES
          </span>
        </div>

        <Marquee
          style={{
            fontSize: "14px",
            color: "black",
          }}
          className="h-10 pl-32" // Added left padding to avoid overlap with the NEWS UPDATES label
          gradientWidth={0}
        >
          {newsUpdate.length > 0 ? (
            <>
              {newsUpdate.map((news, index) => (
                <span key={news._id}>
                  <Link
                    href={news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 hover:underline cursor-pointer transition-colors"
                  >
                    {news.title}
                  </Link>
                  <span className="mx-4 text-gray-500"> - </span>
                </span>
              ))}
              {/* Add extra space at the end to create gap between last and first items */}
              <span className="mx-16"></span>
            </>
          ) : (
            <span className="pl-4">Loading news updates...</span>
          )}
        </Marquee>
      </div>
      <Banner />

      <BlogComp />

      <Newsletter />
      <div className="flex flex-row sm:gap-10"></div>
      <FooterComp />
    </main>
  );
}
