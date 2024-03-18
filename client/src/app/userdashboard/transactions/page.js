'use client';

import { useState } from 'react';
import PurchaseComp from '../components/purchase/PurchaseComp';
import DonateComp from '../components/donate/DonateComp';
import SubscribeComp from '../components/subscribe/SubscribeComp';

const page = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  let active = "  bg-blue-100 text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 "
  let inactive = " bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 "

  return (
    <div className=''>
      {/* <div className='px-2 md:px-4 lg:px-6 my-4'>
        <h1 className='text-lg font-semibold text-gray-900'>
          All Transaction History
        </h1>
        <p className='text-sm mt-2'>
          Check the status of recent transactions, view and access them in full
          details
        </p>
      </div> */}

      
      <div className='flex flex-row items-center justify-start max-w-lg px-2 md:px-4 mt-6'>
        <div className='flex items-center justify-start shadow-sm rounded-md mb-5' role='group'>
          <button
            type='button'
            onClick={() => handleTabClick(1)}
            className={ activeTab === 1 ? `${active } rounded-l-lg`  : `${inactive } rounded-l-lg` }>
            Purchase
          </button>
          <button
            type='button'
            onClick={() => handleTabClick(2)}
            className={ activeTab === 2 ? active : inactive}>
             
          Donation
          </button>
          <button
            type='button'
            onClick={() => handleTabClick(3)}
            className={ activeTab === 3 ? `${active } rounded-r-lg`  : `${inactive } rounded-r-lg` }>
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
  );
};

export default page;
