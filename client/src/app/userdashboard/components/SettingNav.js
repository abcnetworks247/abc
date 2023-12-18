"use client"
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {AccountIcon, ProfileIcon} from './icons/UserIcon'
 
const SettingNav = () => {
    const pathname = usePathname()
  return (
    <div className="flex flex-col basis-1/3">
      <Link
        href="/userdashboard/manageaccount"
        className={`flex items-center p-4 justify-between hover:bg-gray-100 accountInformation sidebarInfo  ${
          pathname == "/userdashboard/manageaccount" ? "bg-blue-400" : ""
        }`}
      >
        <AccountIcon/>
        <p>Profile Details</p>
      </Link>
    </div>
  );
}

export default SettingNav