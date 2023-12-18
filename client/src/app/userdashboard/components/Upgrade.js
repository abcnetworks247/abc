"use client"
import React from 'react'
import Link from "next/link"

const Upgrade = () => {
  return (
    <div className=" mx-auto p-6 rounded-lg shadow-xl sm:w-full sm:mx-auto bg-gradient-to-br from-blue-600 to-purple-600 sm:p-8 mt-4">
      <div className="flex flex-col items-start justify-between gap-4 mb-3 lg:flex-row">
        <div>
          <h3 className="text-2xl font-semibold text-white jakarta sm:text-4xl">
            Pro Plan
          </h3>
        </div>
        <span className="order-first inline-block px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase bg-black rounded-full lg:order-none bg-opacity-20">
          Membership Package
        </span>
      </div>
    
      <span className="text-white text-sm mb-4">
        Subscribe to the Pro Plan and unlock exclusive benefits, including
        premium access to live streams. Join our community of pro users for an
        enhanced streaming experience.
      </span>
      <Link
        href="/pricing"
        className="block mt-4 px-8 py-3 text-md font-semibold text-center text-white transition duration-100 bg-white rounded-lg outline-none bg-opacity-20 hover:bg-opacity-30 md:text-base"
      >
        Subscribe
      </Link>
    </div>
  );
}

export default Upgrade