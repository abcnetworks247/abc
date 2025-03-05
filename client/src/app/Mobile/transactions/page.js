'use client';
import React, { useState } from 'react';
import FooterComp from '@/components/Footer/FooterComp';
import { useRouter } from 'next/navigation';
import Nav1 from '@/components/navbar/Nav1';
import Navbar from '@/components/navbar/Navbar';
import PurchaseComp from '@/app/userdashboard/components/purchase/PurchaseComp';
import DonateComp from '@/app/userdashboard/components/donate/DonateComp';
import SubscribeComp from '@/app/userdashboard/components/subscribe/SubscribeComp';
import Sidebar from '@/components/sidebar/Sidebar';

const page = () => {

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  let active = "  bg-blue-100 text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 "
  let inactive = " bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 "

  const router = useRouter();
  return (
    <div>
      <Nav1 />
      <div className="sticky top-0 z-50 bg-white">
        <Navbar />
      </div>
      <Sidebar />
      <div className='flex flex-row-reverse py-4 mx-2'>
        <svg
          onClick={() => router.back()}
          className='w-6 h-6 cursor-pointer'
          viewBox='0 0 512 512'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          fill='#737373'
          stroke='#737373'>
          <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
          <g
            id='SVGRepo_tracerCarrier'
            strokeLinecap='round'
            strokeLinejoin='round'></g>
          <g id='SVGRepo_iconCarrier'>
            <title>cancel</title>
            <g
              id='Page-1'
              stroke='none'
              strokeWidth='1'
              fill='none'
              fillRule='evenodd'>
              <g
                id='work-case'
                fill='#737373'
                transform='translate(91.520000, 91.520000)'>
                <polygon
                  id='Close'
                  points='328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48'></polygon>
              </g>
            </g>
          </g>
        </svg>
      </div>

      <div className=''>
        <div className='px-4 md:px-4 lg:px-6 my-4'>
          <h1 className='text-lg font-semibold text-gray-900'>
            All Transaction History
          </h1>
          <p className='text-sm mt-2'>
            Check the status of recent transactions, view and access them in
            full details
          </p>
        </div>

        <div className='flex flex-row items-center justify-start px-2 max-w-lg px-2 md:px-4'>
          <div
            className='flex items-center justify-start shadow-sm rounded-md mb-5'
            role='group'>
            <button
              type='button'
              onClick={() => handleTabClick(1)}
              className={
                activeTab === 1
                  ? `${active} rounded-l-lg`
                  : `${inactive} rounded-l-lg`
              }>
              Purchase
            </button>
            <button
              type='button'
              onClick={() => handleTabClick(2)}
              className={activeTab === 2 ? active : inactive}>
              Donation
            </button>
            <button
              type='button'
              onClick={() => handleTabClick(3)}
              className={
                activeTab === 3
                  ? `${active} rounded-r-lg`
                  : `${inactive} rounded-r-lg`
              }>
              Subscription
            </button>
          </div>
        </div>

        <div className='tab-content'>
          {activeTab === 1 && <PurchaseComp />}
          {activeTab === 2 && <DonateComp />}
          {activeTab === 3 && <SubscribeComp />}
        </div>
      </div>

      <FooterComp />
    </div>
  );
};

export default page;
