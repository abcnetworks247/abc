import React from 'react'

const page = () => {
  return (
    <div class="relative">
    {/* <!-- Left Arrow Icon --> */}
    <svg class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
      <path d="M19 12H5M12 19l-7-7 7-7"></path>
    </svg>

    {/* <!-- Search Bar --> */}
    <input type="text" class="border border-gray-300 rounded py-2 pl-10 pr-8 focus:outline-none focus:border-blue-500 w-full" placeholder="Search..."/>

    {/* <!-- Search Icon --> */}
    <svg class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="M21 21l-4.35-4.35"></path>
    </svg>
  </div>
  )
}

export default page