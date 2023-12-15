import React from 'react'
import Sidebar from '@/components/Userdashboard/Sidebar';
import Usercrumb from '@/components/Userdashboard/Usercrumb';
import Usernav from '@/components/Userdashboard/Usernav';
import Info from '@/components/Userdashboard/Info';
import FooterComp from '@/components/Footer/FooterComp';
import Navbar from '@/components/navbar/Navbar';
const page = () => {
    return (
      <>
          <Navbar />

          <div class="grid grid-cols-12 items-start gap-6 pt-4 pb-16 mt-16 bg-gray-200 w-auto px-6">
            <Sidebar />
            <Info />
          </div>
          <FooterComp />
    
      </>
    );
}

export default page