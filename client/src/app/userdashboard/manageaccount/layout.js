"use client"
import React from 'react'
import SettingNav from '../components/SettingNav';
import { UseProductProvider } from '../../../../contexts/ProductProvider';

const layout = ({ children }) => {
  const {screen}= UseProductProvider()
  return (
    <div className={` ${
        screen ? "hidden" : ""
      } h-full w-full absolute sm:static sm:block top-0 z-30 hidden sm:basis-3/4 sm:bg-white sm:min-h-fit shadow-md sm:rounded-sm`}>
      <p className="accountInformation px-4 py-2 text-bold ">
        Manage your accout
      </p>
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