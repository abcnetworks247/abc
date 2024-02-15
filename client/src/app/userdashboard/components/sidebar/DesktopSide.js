"use client"
import React from 'react'
import Upgrade from '../Upgrade';
import SidebarHead from './SidebarHead';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HeartIcon,
  AccountIcon,
  VoucherIcon,
  ReviewIcon,
  ManageIcon,
  OrderIcon,
} from "../icons/UserIcon";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";



const DesktopSide = () => {
  const pathname = usePathname()
  return (
    <>
      <div
        className={`w-full px-4 py-4 sm:min-h-max sm:min-w-[28%]  md:max-w-[28%] lg:max-w-[30%]  bg-white  sm:rounded-md sm:shadow-md`}
      >
        <SidebarHead />

        <div className="h-full mt-8">
          <Link
            href="/userdashboard"
            className={`flex items-center px-4 py-2 gap-4 hover:bg-gray-100 rounded-sm accountInformation sidebarInfo   ${
              pathname == "/userdashboard" ? "sm:bg-gray-200" : ""
            }`}
          >
            <IoPersonOutline size={24} />
            <p className="text-sm text-gray-600">My account</p>
          </Link>

          <Link href="/userdashboard/orders">
            <div
              className={`flex items-center px-4 py-2 gap-3 hover:bg-gray-100 rounded-sm accountInformation sidebarInfo  ${
                pathname == "/userdashboard/orders" ? "sm:bg-gray-200" : ""
              }`}
            >
              <HiOutlineShoppingBag size={24} />
              <p className="text-sm text-gray-600">Orders</p>
            </div>
          </Link>

          <Link href="/userdashboard/manageaccount " className="">
            <div
              className={`flex items-center  px-4 py-2 gap-4 rounded-sm  hover:bg-gray-100 accountInformation sidebarInfo ${
                pathname == "/userdashboard/manageaccount"
                  ? "sm:bg-gray-300"
                  : ""
              }`}
            >
              <IoSettingsOutline size={24} />

              <p className="text-sm text-gray-600">Manage Account</p>
            </div>
          </Link>

          <div className="flex items-center hover:bg-gray-100 cursor-pointer gap-3  px-4 py-2 text-blue-500 border-b border-gray-300">
            <MdLogout size={24} />
            <p className="rounded-sm text-center text-sm">Logout</p>
          </div>
          <Upgrade />
        </div>
      </div>
    </>
  );
}

export default DesktopSide