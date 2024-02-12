"use client"

import FooterComp from '@/components/Footer/FooterComp';
import Nav1 from '@/components/navbar/Nav1';
import Navbar from '@/components/navbar/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';
import { useRouter } from 'next/navigation';
import React from 'react'

const Page = () => {

  const router = useRouter();

  const backToHome = () => {
    router.push("/");
  };
  return (
    <div>
      <Nav1 />
      <div className="bg-[#111827] sticky top-0 z-[10]">
        <Navbar />
      </div>
      <Sidebar />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-6 px-16 my-auto text-center bg-white rounded-md shadow-md md:mx-auto w-fit h-fit">
          <svg
            viewBox="0 0 24 24"
            className="w-16 h-16 mx-auto my-6 text-green-600"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="text-base font-semibold text-center text-gray-900 md:text-2xl">
              Payment Done!
            </h3>
            <p className="my-2 text-gray-600">
              Thank you for completing your secure online payment.
            </p>
            <p> Have a great day!</p>
            <div className="py-4 text-center">
              <button
                className="px-4 py-2 mt-6 font-medium bg-blue-500 rounded-md w-fit text-blue-50 hover:bg-blue-600"
                Name
                onClick={backToHome}
              >
                Switch to home
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterComp />
    </div>
  );
}

export default Page;