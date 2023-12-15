'use client'
import React from 'react'
import SearchMobile from '@/components/Banner/SearchMobile'
import { UseProductProvider } from '../../../contexts/ProductProvider'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  const { searchResults, setSearchResults } = UseProductProvider();
  const hasSearchResults = searchResults && searchResults.length > 0;
  const handleRoute = () => {
    router.push('/searchResults')
    setSearchResults(searchResults)
  }
  return (
    <>
      <SearchMobile />

      <div className="sm:hidden mt-[10px] px-2">
        {searchResults.map((product) => (
          <div
            className="flex items-center cursor-pointer p-2 bg-gray-100 mt-3 rounded-md"
            onClick={() => handleRoute()}
            key={product.id}
          >
            <svg
              className="w-4 h-4 text-gray-500 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            {product.title}
          </div>
        ))}
      </div>
    </>
  );
}

export default page
