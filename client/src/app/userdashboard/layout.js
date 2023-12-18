import React from "react";
import Usernav from "@/app/userdashboard/components/Usernav";
import FooterComp from "@/components/Footer/FooterComp";
import Navbar from "@/components/navbar/Navbar";


export default function layout({ children }) {

  return (
    <>
      <Navbar />
      <div className="sm:bg-gray-200">
        <div class="pt-[10px] sm:flex sm:file:flew-row sm:justify-center sm:pb-[12px] sm:px-24 sm:pt-[12px] sm:gap-4 min-h-screen mb-16">
          <Usernav />
          {children}
        </div>
        <FooterComp />
      </div>
    </>
  );
  
}
