'use client';
import React from 'react';
import { useState } from 'react';

import { UseProductProvider } from '../../../../../contexts/ProductProvider';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import { UseUserContext } from '../../../../../contexts/UserContext';

const SubscribeComp = () => {
  const pathname = usePathname();
  const {
    handleLinkClick,
    userNav,
    isTabletOrMobile,
    isDesktop,
    userModal,
    desktopState,
    screen,
    handleUser,
  } = UseProductProvider();

  const { UserData, HandleGetUser, Authtoken } = UseUserContext();

  const [order, setOrder] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  let delivery_Status = 'pending';

  return (
    <>
      <div
        className={` w-full bg-white md:min-h-max h-[100vh] overflow-y-auto sm:rounded-md`}>
        {!order ? (
          <div className='flex items-center justify-center min-h-full'>
            <div className='flex flex-col items-center'>
              <div className='w-[200p] h-[200px]'>
                <img
                  src='/assets/images/purchaseOrder.png'
                  className='object-contain w-full h-full'
                />
              </div>

              <p className='text-sm '>
                {' '}
                It looks like you haven't made any purchases yet
              </p>
            </div>
          </div>
        ) : (
          <div className='mx-4 my-6'>
            <div className='px-4 mb-4'>
              <h1 className='text-lg font-semibold text-gray-900'>
                Subscription history
              </h1>
              <p className='text-sm mt-2'>
                Check the status of recent transactions, view and access them in
                full details
              </p>
            </div>
            <div className='py-4 bg-gray-100 px-2'>
              <div className='mt-4'>
                {UserData.subscriptionhistory.map((order) => (
                  <div className='flex flex-col items-start px-2'>
                    <div className='border-b border-gray-200 py-2 bg-gray-100 w-full'>
                      <dl className='flex flex-col w-full sm:flex-row sm:items-start justify-between '>
                        <div className='flex flex-col sm:flex-row justify-start sm:items-center gap-4 w-full'>
                          <div className='flex flex-row justify-between sm:flex-col items-start w-full'>
                            <dt className='text-sm'> Plan Type</dt>
                            <dd className='text-gray-500 text-sm'>
                              {order.plan_type}
                            </dd>
                          </div>
                          <div className='flex flex-row justify-between sm:flex-col items-start w-full'>
                            <dt className='text-sm'>Order ID</dt>
                            <dd className='text-gray-500 text-sm w-32 truncate'>
                              {order.subscription_id}
                            </dd>
                          </div>
                          <div className='flex flex-row justify-between sm:flex-col items-start w-full'>
                            <dt className='text-sm'> Status</dt>
                            <span
                              className={`text-sm ${
                                order.subscription_status === 'paid'
                                  ? 'text-green-500'
                                  : 'text-orange-500'
                              }`}>
                              {order.subscription_status}
                            </span>
                          </div>
                          <div className='flex flex-row justify-between sm:flex-col items-start w-full'>
                            <dt className='text-sm'>Total</dt>
                            <dd className='text-sm text-gray-500'>
                              ${order.amount}
                            </dd>
                          </div>
                        </div>
                        <a
                          onClick={toggleVisibility}
                          className='cursor-pointer flex flex-row items-center w-full mt-4 lg:w-[15%] justify-center bg-white border border-gray-300 px-2 py-2 rounded-md shadow-sm'>
                          <span className='text-xs'>
                            {isVisible ? 'View Less' : 'View More'}
                          </span>
                        </a>
                      </dl>
                    </div>

                    {isVisible && (
                      <div className='mt-4 w-full bg-white px-2 rounded-md'>
                        <div className='border-b border-b-gray-800 border-opacity-5 py-2 px-2 lg:px-4 flex flex-row items-center gap-4'>
                          <div className=' py-2 '>
                            <div className='py-2 text-sm text-gray-500  flex flex-row items-start'>
                              Name: {order.name}
                            </div>

                            <div className='text-gray-500 text-sm'>
                              Payment type: {order.payment_method_types}
                            </div>
                          </div>

                          <div className=' py-2 px-2 lg:px-4'>
                            <div className='py-2 text-sm text-gray-500  flex flex-row items-start'>
                              Start Time
                            </div>
                            <div className='text-gray-500 text-sm'>
                              {order.subscription_period_start}
                            </div>
                          </div>
                          <div className=' py-2 px-2 lg:px-4'>
                            <div className='py-2 text-sm text-gray-500  flex flex-row items-start'>
                              End Time
                            </div>
                            <div className='text-gray-500 text-sm'>
                              {order.subscription_period_end}
                            </div>
                          </div>
                        </div>
                        <div className=' py-2 px-2 lg:px-4'>
                          <div className='py-2 text-sm text-gray-500  flex flex-row items-start'>
                            Plan Description
                          </div>
                          <div className='text-gray-500 text-sm'>
                            {order.subscription_name}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SubscribeComp;
