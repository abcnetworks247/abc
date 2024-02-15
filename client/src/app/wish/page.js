"use client";
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import { UseProductProvider } from "../../../contexts/ProductProvider";
import Wishlistcard from "@/components/NewArrival/Wishlistcard";
import Link from "next/link";
import FooterComp from "@/components/Footer/FooterComp";
import Sidebar from "@/components/sidebar/Sidebar";
import Nav1 from "@/components/navbar/Nav1";
import { UseUserContext } from "../../../contexts/UserContext";
import { useRouter } from "next/navigation";

const page = () => {
  const { UserData, HandleGetUser, Authtoken } = UseUserContext();
  const router = useRouter();

  if (!UserData) {
    return (
      <>
        <div className="bg-[#111827] sticky top-0 z-[10] ">
          <Navbar />
        </div>
        <div className="flex items-center justify-center bg-center bg-gray-100 h-[90vh]">
          <div className="max-w-lg w-full p-8 bg-white bg-opacity-75 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Please Sign In</h2>
            <p className="text-gray-600 mb-6">
              You need to sign in to view your wishlist.
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => router.push("/login")}
            >
              Sign In
            </button>
          </div>
        </div>
      </>
    );
  }

  const { wishlist } = UseProductProvider();

  return (
    <div>
      <Nav1 />
      <div className="bg-[#111827] sticky top-0 z-[10]">
        <Navbar />
      </div>
      <Sidebar />
      {wishlist && wishlist.length > 0 ? (
        <div className="px-1 py-10 lg:px-28 bg-gray-50 h-contain">
          <h2 className="mb-6 text-xl font-medium text-gray-800 ">
            Saved Items
          </h2>

          <div className="grid grid-cols-2 gap-4 px-4 lg:gap-4 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {wishlist.map((product) => (
              <Wishlistcard key={product._id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-auto bg-gray-100 h-[73vh] lg:h-screen sm:flex sm:items-center sm:justify-center ">
          <div className="bg-white sm:w-[30vw] sm:h-[40vh] h-full  flex flex-col justify-center items-center sm:shadow-md sm:rounded-md">
            <img src="/assets/images/basket.png" className="w-32 h-auto" />
            <p className="text-bold">You have no saved items</p>

            <Link href="/store" className="text-sm text-blue-500 underline">
              Go back to store
            </Link>
          </div>
        </div>
      )}
      <FooterComp />
    </div>
  );
};

export default page;
