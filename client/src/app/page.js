"use client";
import BlogComp from "@/components/Blog/BlogComp";
import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import { useEffect,useRef } from "react";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if the current path is the home page ("/")
    if (pathname === "/") {
      // Check if the flag is not set in localStorage
          if(typeof window !== "undefined"){ 

            if (!localStorage.getItem('hasReloaded')) {
              // Reload the page once
              window.location.reload();
              // Set the flag in localStorage to indicate that the page has been reloaded
              localStorage.setItem('hasReloaded', 'true');
            }
          }
    }
  }, [pathname]); // Include pathname in the dependency array

  return (
    <main>
      {/* navbar component  */}
      <div className="bg-white sticky top-0 z-[10]">
        <Navbar />
      </div>
      <BlogComp />

      <Sidebar />
      <div className="flex flex-row sm:gap-10"></div>
    </main>
  );
}
