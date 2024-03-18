'use client';
import { useState } from 'react';
import PurchaseComp from '../components/purchase/PurchaseComp';
import DonateComp from '../components/donate/DonateComp';

export const page = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>
      <div className='px-4 my-4'>
        <h1 className='text-lg font-semibold text-gray-900'>
          Purchase History
        </h1>
        <p className='text-sm mt-2'>
          Check the status of recent transactions, view and access them in full
          details
        </p>
      </div>

      <div className='tab-buttons px-2 md:px-4 lg:px-4 flex flex-row items-center gap-2'>
        <button
          className={
            activeTab === 1
              ? 'active cursor-pointer flex flex-row items-center w-[15%] justify-center bg-blue-100 border border-gray-100 px-2 py-2 rounded-md shadow-sm'
              : 'cursor-pointer flex flex-row items-center w-[15%] justify-center bg-white border border-gray-100 px-2 py-2 rounded-md shadow-sm'
          }
          onClick={() => handleTabClick(1)}>
          Purchase
        </button>
        <button
          className={
            activeTab === 2
              ? 'active cursor-pointer flex flex-row items-center w-[15%] justify-center bg-blue-100 border border-gray-100 px-2 py-2 rounded-md shadow-sm'
              : 'cursor-pointer flex flex-row items-center w-[15%] justify-center bg-white border border-gray-100 px-2 py-2 rounded-md shadow-sm'
          }
          onClick={() => handleTabClick(2)}>
          Donation
        </button>
        <button
          className={
            activeTab === 3
              ? 'active cursor-pointer flex flex-row items-center w-[15%] justify-center bg-blue-100 border border-gray-100 px-2 py-2 rounded-md shadow-sm'
              : 'cursor-pointer flex flex-row items-center w-[15%] justify-center bg-white border border-gray-100 px-2 py-2 rounded-md shadow-sm'
          }
          onClick={() => handleTabClick(3)}>
          Subscription
        </button>
      </div>
      <div className='tab-content'>
        {activeTab === 1 && <PurchaseComp />}
        {activeTab === 2 && <DonateComp />}
        {activeTab === 3 && <div>Tab 3 Content</div>}
      </div>
    </div>
  );
};
