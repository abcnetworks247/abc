import React from 'react'

   

const LoadingSkeleton = ({ numberOfSkeletons }) => {
    const renderSkeletons = () => {
      const skeletons = [];
      for (let i = 0; i < numberOfSkeletons; i++) {
        skeletons.push(
          <div key={i} className="mt-56 bg-white rounded shadow cursor-pointer animate-pulse">
            <div className="relative py-6 group shadow-md">
              <div className="relative flex items-center shadow-sm justify-center w-full h-64 mb-4 -mt-56 overflow-hidden rounded -top-full bg-white">
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                <div className="absolute flex flex-col top-4 right-4 z-[2]">
                  <div className="w-6 h-6 bg-gray-200 animate-pulse mb-3"></div>
                  <div className="w-6 h-6 bg-gray-200 animate-pulse"></div>
                </div>
              </div>
              <div className="px-3">
                <div className="mb-2 h-4 bg-gray-200 animate-pulse"></div>
                <div className="mb-3 h-6 bg-gray-200 animate-pulse"></div>
                <div className="flex gap-1 text-orange-400">
                  <div className="w-4 h-4 bg-gray-200 animate-pulse"></div>
                  <div className="w-4 h-4 bg-gray-200 animate-pulse"></div>
                  <div className="w-4 h-4 bg-gray-200 animate-pulse"></div>
                  <div className="w-4 h-4 bg-gray-200 animate-pulse"></div>
                  <div className="w-4 h-4 bg-gray-200 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      return skeletons;
    }
  return (
    <div className="grid grid-cols-2 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {renderSkeletons()}
    </div>
  ); 
} 

export default LoadingSkeleton;
