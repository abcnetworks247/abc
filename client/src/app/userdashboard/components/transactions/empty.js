import React from 'react'

const Empty = ({name}) =>  {
  return (
    <div className="flex items-center justify-center h-[80vh] w-full">
          <div className="flex flex-col items-center">
            <div className="w-[250px] h-[250px]">
              <img
                src="/assets/images/purchaseOrder.png"
                className="object-contain w-full h-full"
              />
            </div>
            <p className="text-sm ">You have no {name} history</p>
          </div>
        </div>
  )
}

export default Empty