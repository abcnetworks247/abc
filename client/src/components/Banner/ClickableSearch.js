"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

const ClickableSearch = () => {

    const router = useRouter()
  return (
    <div class="flex items-center w-full bg-white border  border-gray-300 rounded p-2 cursor-pointer transition duration-300 hover:border-blue-500 sm:hidden" onClick={()=>router.push('/searchproduct')}>
      <svg
        class="text-gray-500 w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="8"
        viewBox="0 0 24 24"
      >
        <path d="M21 21l-5-5"></path>
        <circle cx="10.5" cy="10.5" r="7.5"></circle>
      </svg>
      <div class="text-gray-600">Search...</div>
    </div>
  );
}

export default ClickableSearch