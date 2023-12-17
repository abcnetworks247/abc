import React from "react";
import Usernav from "@/app/userdashboard/components/Usernav";
import FooterComp from "@/components/Footer/FooterComp";
import Navbar from "@/components/navbar/Navbar";


export default function layout({ children }) {

    return (
    <div className="sm:bg-gray-200">
        <Navbar/>
        <div class="pt-24 sm:flex sm:file:flew-row sm:justify-center sm:px-24 sm:pt-24 sm:gap-4 min-h-screen mb-16">
          <Usernav />
          {children}
        </div>
        <FooterComp />
      </div>
    );
  
}
