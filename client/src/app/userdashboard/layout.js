"use client"
import React from "react";
import Usernav from "@/app/userdashboard/components/Usernav";
import FooterComp from "@/components/Footer/FooterComp";
import Navbar from "@/components/navbar/Navbar";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { UseProductProvider } from "../../../contexts/ProductProvider";

import HocNotAuthenticated from "@/utils/HocNotAuthenticated";
import Sidebar from "@/components/sidebar/Sidebar";

 export default function layout({ children }) {
   const pathname = usePathname()
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 600px)" });
    const isDesktop = useMediaQuery({
      query: "(min-width: 600px)",
    });
    const [clickState, setClickState] = useState(false);
  const {userModal} = UseProductProvider()
 const [mobileView , setMobileView]= useState(isTabletOrMobile)
   const [desktopView, setDesktopView] = useState(isDesktop)
   
   const changeView = () => {
     setMobileView(prev => !prev)
     setDesktopView(prev => !prev)
   }

  return (
    <> 
      <Sidebar />
      <div className="bg-white sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="sm:bg-gray-200">
        <div class="pt-[10px] relative sm:flex sm:file:flew-row sm:justify-center sm:pb-[12px]  md:px-4 lg:mx-20 sm:pt-[12px] sm:gap-4 h-fit mb-16">
          <Usernav mobileView={isTabletOrMobile} />

          {/* <div className="h-full w-full absolute top-0 z-30 bg-red-300"></div> */}
          { children}
        </div>
        <FooterComp />
      </div>
    </>
  );
  
}

// const layout = HocNotAuthenticated(Layout)

// export default layout;