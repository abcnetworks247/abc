"use client"
import React from 'react'
import { AccountIcon, OrderIcon } from "../icons/UserIcon";
import SidebarHead from './SidebarHead';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Upgrade from '../Upgrade';
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import { IoPersonRemoveOutline } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import { MdLockReset } from "react-icons/md";
import { PiCreditCard } from "react-icons/pi";

const MobileSide = () => {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <>
      <div
        className={`w-full px-4 py-4 sm:min-h-max sm:min-w-[28%]  md:max-w-[28%] lg:max-w-[30%]  bg-white  sm:rounded-md sm:shadow-md`}
      >
        <SidebarHead />

        <div className="h-full mt-8">
          <Link
            href="/Mobile/stats"
            className={`flex items-center px-4 py-2 gap-4 hover:bg-gray-100 rounded-sm accountInformation sidebarInfo   ${
              pathname == "/Mobile/stats" ? "sm:bg-gray-200" : ""
            }`}
          >
            <IoPersonOutline size={24} />
            <p className="text-sm text-gray-600">My account</p>
          </Link>

          <Link href="/Mobile/Orders">
            <div
              className={`flex items-center px-4 py-2 gap-3 hover:bg-gray-100 rounded-sm accountInformation sidebarInfo  ${
                pathname == "/Mobile/Orders" ? "sm:bg-gray-200" : ""
              }`}
            >
              <HiOutlineShoppingBag size={24} />
              <p className="text-sm text-gray-600">Orders</p>
            </div>
          </Link>
          
          <Link href="/Mobile/transactions">
            <div
              className={`flex items-center px-4 py-2 gap-3 hover:bg-gray-100 rounded-sm accountInformation sidebarInfo  ${
                pathname == "/Mobile/transactions" ? "sm:bg-gray-200" : ""
              }`}
            >
              <PiCreditCard size={24} />
              <p className="text-sm text-gray-600">Transactions</p>
            </div>
          </Link>

          {/* beginning of a new section */}
          <div>
            <div
              className={`flex items-center px-4 py-2 gap-3 hover:bg-gray-100 rounded-sm accountInformation sidebarInfo bg-gray-200 `}
            >
              {/* <OrderIcon /> */}
              <p className="text-sm text-gray-600">Account Management</p>
            </div>
          </div>

          {/* edit profile */}
          <Link href="/Mobile/Edit">
            <div
              className={`sm:hidden flex items-center  px-4 py-2 gap-3 hover:bg-gray-100 rounded-sm accountInformation sidebarInfo  ${
                pathname == "/Mobie/Edit" ? "sm:bg-gray-200" : ""
              }`}
            >
              <LiaEdit size={24} />

              <p className="text-sm text-gray-600">Edit Profile</p>
            </div>
          </Link>

          {/* change password */}
          <Link href="/Mobile/password">
            <div
              className={`sm:hidden flex items-center  px-4 py-2 gap-3 hover:bg-gray-100 rounded-sm accountInformation sidebarInfo  ${
                pathname == "/Mobile/password" ? "sm:bg-gray-200" : ""
              }`}
            >
              <MdLockReset size={24} />

              <p className="text-sm text-gray-600">Change Password</p>
            </div>
          </Link>

          {/* close account */}
          <Link
            href="/Mobile/DeleteMobile"
            className={`flex items-center  px-4 py-2 gap-3 hover:bg-gray-100 rounded-sm accountInformation sidebarInfo  ${
              pathname == "/Mobile/DeleteMobile" ? "sm:bg-gray-200" : ""
            }`}
          >
            <IoPersonRemoveOutline size={24} />

            <p className="text-sm text-gray-600">Close account</p>
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

export default MobileSide