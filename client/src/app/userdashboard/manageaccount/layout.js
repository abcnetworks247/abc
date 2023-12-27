"use client"
import React from 'react'
import SettingNav from '../components/SettingNav';
import { UseProductProvider } from '../../../../contexts/ProductProvider';

const layout = ({ children }) => {
  const {screen}= UseProductProvider()
  return (
    <div className={`h-full w-full  sm:basis-3/4 sm:bg-white sm:min-h-fit shadow-md sm:rounded-sm`}>
      <p className="accountInformation px-4 py-2 text-bold ">
        Manage your account
      </p>
      {/* <div className="py-8 px-4"> */}
      <div className="py-8 px-4">
        <div className='flex flex-row gap-6 '>
          <SettingNav />
          {children}
        </div>
      </div>
    </div>
  );
}

export default layout