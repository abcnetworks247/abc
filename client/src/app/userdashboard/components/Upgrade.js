"use client"
import React from 'react'
import Link from "next/link"

const Upgrade = () => {
  return (
    <div className="mx-auto py-6 px-4 mt-14 rounded-lg shadow-xl sm:w-full sm:mx-auto bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="flex flex-col items-start justify-between gap-2 mb-3 lg:flex-col-reverse">
        {/* <div>
          <h3 className="text-lg font-semibold text-white jakarta">
            Pro Plan
          </h3>
        </div> */}
        <span className="order-first inline-block px-4 py-1 text-xs font-semibold tracking-wider text-white  bg-black rounded-full lg:order-none bg-opacity-20">
          Membership Package
        </span>
      </div>
    
      <span className="text-white text-sm mb-2">
        Subscribe to the Pro Plan and unlock exclusive benefits.
      </span>
      <Link
        href="/pricing"
        className="block mt-4 px-8 py-2 text-sm font-semibold text-center text-white transition duration-100 bg-white rounded-lg outline-none bg-opacity-20 hover:bg-opacity-30 md:text-sm"
      >
        Subscribe
      </Link>
    </div>
  );
}

export default Upgrade