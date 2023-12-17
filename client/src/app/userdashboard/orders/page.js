import React from 'react'

const page = () => {
  return (
    <div className="hidden sm:block sm:basis-3/4 bg-white min-h-max sm:shadow-md sm:rounded-sm">
      <p className="accountInformation px-4 py-2 text-bold ">
        Orders
      </p>

      <div className="px-4 mt-2">
         <div clasName="flex flex-row items-center justify-between">
                  <div className='h-12 w-12 bg-gray-200'>
                  </div> 
                <p>See details</p>
         </div>
      </div>
    </div>
  );
}

export default page