import React from "react";
import Banner from "@/components/Banner/Banner";
import Features from "@/components/Features/Features";
import Categories from "@/components/Categories/Categories";
import NewArrival from "@/components/NewArrival/NewArrival";
import Ads from "@/components/Banner/Ads";
import Recommended from "@/components/Recommended/Recommended";
import Copyright from "@/components/Footer/Copyright";
import Navbar from "@/components/navbar/Navbar";
import FooterComp from "@/components/Footer/FooterComp";

const page = () => {
  return (
    <div>
      <div className="bg-white sticky top-0 z-[10]">
        <Navbar />
      </div>
      <Banner />
      <Features />
      <Categories />
      <NewArrival />
      <Ads />
      <Recommended />
      <FooterComp />
    </div>
  );
};

export default page;
