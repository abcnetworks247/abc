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
      <SearchMobile  />

      <div className="sm:hidden mt-[10px]">
        {hasSearchResults &&
          searchResults.map((product) => (
            <div key={product.id} className='shadow-md px-2 py-3 mb-2 cursor-pointer' onClick={()=>handleRoute()}>
                {product.title}
            </div>
          ))}
      </div>
    </>
  );
}

export default page
