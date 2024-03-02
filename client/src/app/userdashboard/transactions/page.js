"use client"
import React, { useState } from 'react'
import SubscriptionHistory from '../components/transactions/subscription';
import DonationHistory from '../components/transactions/donation';
import PurchaseHistory from '../components/transactions/purchase';


const Transactions = () => {
    const [activeTab, setActiveTab] = useState(1);
    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
      };

    return (
        <div
        className={` w-full bg-white sm:rounded-md h-[100vh] p-4 flex flex-col gap-10`}
        >
            
          <div className="flex flex-row gap-1">
            <button
              onClick={() => handleTabClick(1)}
              className={` h-8 px-3  text-lg rounded-lg  ${
                activeTab === 1 ? " bg-[#E5E7EB]" : "bg-transparent"
              }`}
            >
              Purchase
            </button>
            <button
              onClick={() => handleTabClick(2)}
              className={` h-8 px-3  text-lg rounded-lg   ${
                activeTab === 2 ? "bg-[#E5E7EB]" : "bg-transparent"
              }`}
            >
              Donations
            </button>

            <button
                onClick={() => handleTabClick(3)}
                className={` h-8 px-3  text-lg rounded-lg ${
                    activeTab === 3 ? "bg-[#E5E7EB]" : "bg-transparent"
                }`}
            >
                Subscription
            </button>
                <hr />
          </div>

          {/* // This is the part that changes based on the tab selected */}          
          <div className='divide-y'>

            {activeTab === 1 && (
                <PurchaseHistory />
            )}
            {activeTab === 2 && (
                <DonationHistory />
            )}
            {activeTab === 3 && (
                <SubscriptionHistory />
            )}   
          </div>
            
        </div>

    );
}

export default Transactions;