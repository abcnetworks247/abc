"use client"
import React from "react";
import Usernav from "@/app/userdashboard/components/Usernav";
import FooterComp from "@/components/Footer/FooterComp";
import Navbar from "@/components/navbar/Navbar";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { UseProductProvider } from "../../../contexts/ProductProvider";
import DesktopSide from "./components/sidebar/DesktopSide";
import MobileSide from "./components/sidebar/MobileSide";

import HocNotAuthenticated from "@/utils/HocNotAuthenticated";
import Sidebar from "@/components/sidebar/Sidebar";
import Nav1 from "@/components/navbar/Nav1";

function Layout({ children }) {
   const pathname = usePathname()
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 600px)" });
    const isDesktop = useMediaQuery({
      query: "(min-width: 600px)",
    });
    const [clickState, setClickState] = useState(false);
 
   
 

  return (
    <>
      <Nav1 />
      <Sidebar />
      <div className="sticky top-0 z-50 bg-white">
        <Navbar />
      </div>
      <div className="sm:bg-gray-200">
        <div class="pt-[10px]  relative sm:flex sm:flew-row sm:justify-center sm:pb-[12px] md:px-4 sm:mx-4  lg:mx-20 sm:pt-[12px] sm:gap-4 h-fit mb-16">
          {isTabletOrMobile ? <MobileSide /> : <DesktopSide />}

          {/* <div className="absolute top-0 z-30 w-full h-full bg-red-300"></div> */}
          {isDesktop && children}
        </div>
        <FooterComp />
      </div>
    </>
  );
  
}

const layout = HocNotAuthenticated(Layout)

export default layout;