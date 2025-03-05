"use client"
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
import { useState, useEffect } from "react"
import axios from 'axios'
import { UseProductProvider } from '../../../contexts/ProductProvider'
import ProductNav from '@/components/Products/ProductNav'

const page = () => {

 const {products}= UseProductProvider()
  
   const [currentPage, setCurrentPage] = useState(1);
   const productsPerPage = 5;

  
  console.log("store", products)



  return (
    <div className="relative">
      <div className="bg-[#111827] sticky top-0 z-[20] ">
        <Navbar />
      </div>
      <Sidebar />
      <ProductNav />
      <Banner products={products} />
      <Sidebar />

      <Features />

      <NewArrival/>
      <Ads />
      <Recommended />
      <FooterComp />
      <ProductModal />
      {/* <SearchModal/> */}
    </div>
  );
};

export default page;
