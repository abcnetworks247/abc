"use client";
import BlogComp from "@/components/Blog/BlogComp";
import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Marquee from "react-fast-marquee";

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();

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

  return (
    <main>
      <div className="flex flex-row items-center border border-gray-100 shadow-md">
        <div className="px-3 py-1 bg-red-700 border-gray-600 shadow-md">
          <span className="font-[4px] text-sm text-white">Announcement</span>
        </div>
        <Marquee style={{
          fontSize: "12px"
        }}>
          Stay informed, inspired, and connected with the latest happenings
          across the globe. ABC Studio brings you a curated blend of breaking
          news, insightful features, and captivating stories that matter most.
          Dive into a world of diverse perspectives, thought-provoking analyses,
          and compelling narratives, all in one dynamic platform.
        </Marquee>
      </div>
      {/* navbar component  */}
      <div className="bg-white sticky top-0 z-[10] mb-10">
        <Navbar />
      </div>

      <BlogComp />

      <Sidebar />

      <div className="flex flex-row sm:gap-10"></div>
    </main>
  );
}
