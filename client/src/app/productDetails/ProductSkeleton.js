import React from 'react'

const ProductSkeleton = () => {
  return (
  <div className="animate-pulse bg-white dark:bg-gray-800 p-4 mb-8">
  <div className="flex flex-wrap -mx-4">
    <div className="w-full md:w-1/2 mb-4 md:mb-0">
      <div className="loading-image relative mb-6 lg:mb-10" style={{ height: '450px' }}>
        <div className="w-full h-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="flex-wrap hidden md:flex">
        <div className="w-1/2 p-2 sm:w-1/4">
          <div className="loading-thumbnail"></div>
        </div>
        <div className="w-1/2 p-2 sm:w-1/4">
          <div className="loading-thumbnail"></div>
        </div>
        <div className="w-1/2 p-2 sm:w-1/4">
          <div className="loading-thumbnail"></div>
        </div>
        <div className="w-1/2 p-2 sm:w-1/4">
          <div className="loading-thumbnail"></div>
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/2">
      <div className="lg:pl-20">
        <div className="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="loading-badge w-16 h-6 mb-2"></div>
          <div className="loading-title w-full h-8 mb-6"></div>
          <div className="flex flex-wrap items-center mb-6">
            <div className="loading-stars w-16 h-4 mr-2"></div>
            <a href="#" className="mb-4 text-xs underline dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0">
              {/* Be the first to review the product */}
            </a>
          </div>
          <div className="loading-description max-w-md mb-8"></div>
          <div className="loading-real-time p-4 mb-8 border border-gray-300 dark:border-gray-700">
            <div className="mb-4 text-xs font-medium text-gray-700 dark:text-gray-400">
              {/* Hurry up! left 23 in Stock */}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
              <div className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
          <div className="loading-price inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400">
            <span className="w-24 h-6 mb-2"></span>
          </div>
        </div>
        {/* ... Rest of the content ... */}
      </div>
    </div>
  </div>
</div>

  )
}

export default ProductSkeleton