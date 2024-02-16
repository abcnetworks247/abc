'use client'

import FooterComp from "@/components/Footer/FooterComp";
import Nav1 from "@/components/navbar/Nav1";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {

  const router = useRouter();

  const backToPayment = () => {
    router.back();
  }

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
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mx-auto my-6 text-red-600"
          >
            {" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM7 9C7.55228 9 8 8.55228 8 8C8 7.44772 7.55228 7 7 7C6.44772 7 6 7.44772 6 8C6 8.55228 6.44772 9 7 9ZM14 8C14 8.55228 13.5523 9 13 9C12.4477 9 12 8.55228 12 8C12 7.44772 12.4477 7 13 7C13.5523 7 14 7.44772 14 8ZM6.46447 13.8785C6.85499 14.269 7.48816 14.269 7.87868 13.8785C9.05025 12.7069 10.9497 12.7069 12.1213 13.8785C12.5118 14.269 13.145 14.269 13.5355 13.8785C13.9261 13.4879 13.9261 12.8548 13.5355 12.4642C11.5829 10.5116 8.41709 10.5116 6.46447 12.4642C6.07394 12.8548 6.07394 13.4879 6.46447 13.8785Z"
              fill="#4A5568"
            />{" "}
          </svg>
          <div className="text-center">
            <h3 className="text-base font-semibold text-center text-gray-900 md:text-2xl">
              Payment Error!
            </h3>
            <p className="my-2 text-gray-600">
              Unfortunately,we were'nt able to process this payment.
            </p>
            <p> Try again! </p>
            <div className="py-4 text-center">
              <button
                className="px-4 py-2 mt-6 font-medium bg-blue-500 rounded-md w-fit text-blue-50 hover:bg-blue-600"
                Name
                onClick={backToPayment}
              >
                Back to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterComp />
    </div>
  );
};

export default Page;
