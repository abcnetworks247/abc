"use client"
import React from 'react'
import OrderComp from '@/app/userdashboard/components/order/OrderComp'
import Navbar from '@/components/navbar/Navbar'
import FooterComp from '@/components/Footer/FooterComp'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
  return (
    <div>
      <Navbar />
      <div className="flex flex-row-reverse mx-2 py-4">
        <svg
          onClick={() => router.back()}
          className="w-6 h-6"
          viewBox="0 0 512 512"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#737373"
          stroke="#737373"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <title>cancel</title>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="work-case"
                fill="#737373"
                transform="translate(91.520000, 91.520000)"
              >
                <polygon
                  id="Close"
                  points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"
                ></polygon>
              </g>
            </g>
          </g>
        </svg>
      </div>
     
        <OrderComp />
      

      <FooterComp />
    </div>
  );
}

export default page