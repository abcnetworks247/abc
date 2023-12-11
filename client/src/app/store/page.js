import React from 'react'
import Banner from '@/components/Banner/Banner'
import Features from '@/components/Features/Features'
import Categories from '@/components/Categories/Categories'
import NewArrival from '@/components/NewArrival/NewArrival'
import Ads from '@/components/Banner/Ads'
import Recommended from '@/components/Recommended/Recommended'
import Footer from '@/components/Footer/Footer'
import Copyright from '@/components/Footer/Copyright'
import Navbar from '@/components/navbar/Navbar'
import ProductModal from '@/components/Products/ProductModal'

const page = () => {
  return (
    <div>
        <Navbar/>
        <Banner/>
        <Features/>
        <Categories/>
        <NewArrival/>
        <Ads/>
        <Recommended/>
        <Footer/>
        <Copyright/>
        <ProductModal/>
    

    </div>
  )
}

export default page