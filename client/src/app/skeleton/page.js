import React from 'react'

const page = () => {
  return (
   <div className="relative py-12 overflow-hidden bg-white font-poppins dark:bg-gray-800 overflow-y-auto">
  <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6 bg-white">
    <div className="flex flex-wrap -mx-4">
      <div className="w-full px-4 md:w-1/2">
        <div className="sticky top-0 overflow-hidden">
          <div className="relative mb-6 lg:mb-10" style={{ height: "450px" }}>
            {/* Loading Skeleton for Image */}
            <div className="animate-pulse w-full h-full bg-gray-300 dark:bg-gray-700"></div>
          </div>
          <div className="flex-wrap hidden md:flex">
            {/* Loading Skeleton for Thumbnails */}
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="w-1/2 p-2 sm:w-1/4">
                <div className="animate-pulse block border border-blue-100 dark:border-gray-700 dark:hover:border-gray-600 hover:border-blue-300">
                  <div className="animate-pulse w-full h-32 bg-gray-300 dark:bg-gray-700"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full px-4 md:w-1/2">
        <div className="lg:pl-20">
          <div className="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
            {/* Loading Skeleton for Badge */}
            <div className="animate-pulse text-lg font-medium text-rose-500 dark:text-rose-200 w-16 h-6 mb-2"></div>
            {/* Loading Skeleton for Title */}
            <div className="animate-pulse max-w-xl mt-2 mb-6 text-xl font-bold dark:text-gray-300 md:text-4xl h-12"></div>
            {/* Loading Skeleton for Stars */}
            <div className="animate-pulse flex flex-wrap items-center mb-6">
              <ul className="flex mb-4 mr-2 lg:mb-0">
                {[1, 2, 3, 4, 5].map((index) => (
                  <li key={index}>
                    <div className="animate-pulse w-4 h-4 bg-gray-200 dark:bg-gray-400 mr-1"></div>
                  </li>
                ))}
              </ul>
              {/* Loading Skeleton for Review Link */}
              <a className="animate-pulse mb-4 text-xs underline dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0" href="#"></a>
            </div>
            {/* Loading Skeleton for Description */}
            <div className="animate-pulse max-w-md mb-8 h-16 bg-gray-300 dark:bg-gray-700"></div>
            {/* Loading Skeleton for Real-Time Info */}
            <div className="animate-pulse p-4 mb-8 border border-gray-300 dark:border-gray-700">
              <div className="animate-pulse mb-4 text-xl font-semibold dark:text-gray-400">
              
                <span className="px-2 bg-blue-500 text-gray-50 rounded-full">
                 
                </span>{" "}
                
              </div>
              <div className="animate-pulse mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">
              
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5  dark:bg-gray-600">
                <div
                  className="bg-gray-200 dark:bg-blue-400 h-2.5 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
            {/* Loading Skeleton for Price */}
            <div className="animate-pulse inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
              <span>{`$ `}</span>
              <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400">
                $1500.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  );
}

export default page