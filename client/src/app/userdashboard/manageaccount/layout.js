"use client"
import React from 'react'
import SettingNav from '../components/SettingNav';

const layout = ({children}) => {
  return (
    <div className="hidden sm:block sm:basis-3/4 sm:bg-white sm:min-h-max shadow-md sm:rounded-sm">
      <p className="accountInformation px-4 py-2 text-bold ">
        Manage your accout
      </p>
      <div className="px-4">
        <div className='flex flex-row'>
          <SettingNav />
          {children}
        </div>
      </div>
    </div>
  );
}

export default layout