import React from 'react'
import Features from '@/components/Features/Features'
import Categories from '@/components/Categories/Categories'
import NewArrival from '@/components/NewArrival/NewArrival'
import Ads from '@/components/Banner/Ads'
import Recommended from '@/components/Recommended/Recommended'
import Footer from '@/components/Footer/Footer'
import Copyright from '@/components/Footer/Copyright'
import Navbar from '@/components/navbar/Navbar'
import ProductModal from '@/components/Products/ProductModal'
import FooterComp from '@/components/Footer/FooterComp'
import Sidebar from '@/components/sidebar/Sidebar'
import Banner from '@/components/Banner/Banner'
import SearchModal from '@/components/Banner/SearchModal'


const page = () => {
  return (
    <div className="relative">
      <div className="bg-white sticky top-0 z-[10] ">
        <Navbar />
      </div>
      <Banner />
      <Sidebar />

      <Features />

      <NewArrival />
      <Ads />
      <Recommended />
      <FooterComp />
      <ProductModal />
      {/* <SearchModal/> */}
    </div>
  );
};

export default page;
