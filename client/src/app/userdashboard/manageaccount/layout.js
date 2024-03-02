"use client"
import React from 'react'
import SettingNav from '../components/SettingNav';
import { UseProductProvider } from '../../../../contexts/ProductProvider';

const layout = ({ children }) => {
  const {screen}= UseProductProvider()
  return (
    <div className={`h-full w-full  flex-grow sm:bg-white sm:min-h-fit shadow-md sm:rounded-md`}>
      <p className="accountInformation px-4 py-2 text-bold ">
        Manage your account
      </p>
      {/* <div className="py-8 px-4"> */}
      <div className="py-8 px-4">
        <div className='flex flex-row h-[100vh] '>
          <SettingNav />
          {children}
        </div>
      </div>
    </div>
  );
}

export default layout