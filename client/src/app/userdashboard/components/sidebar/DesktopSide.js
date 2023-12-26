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



const DesktopSide = () => {
  const pathname = usePathname()
  return (
    <>
      <div
        className={`w-full px-4 py-4 sm:min-h-max sm:min-w-[28%]  md:max-w-[28%] lg:max-w-[30%]  bg-white  sm:rounded-md sm:shadow-md`}
          >
            <SidebarHead/>
      
          <div className="h-full mt-8">
        
          
            <Link   
              href="/userdashboard"
              className={`flex items-center px-4 py-2 gap-4 hover:bg-gray-100 rounded-sm accountInformation sidebarInfo   ${
                pathname == "/userdashboard" ? "sm:bg-gray-200" : ""
              }`}
            >
              <AccountIcon />
              <p className="text-sm text-gray-600">My account</p>
            </Link>
          

          <Link href="/userdashboard/orders">
            <div
              className={`flex items-center px-4 py-2 gap-3 hover:bg-gray-100 rounded-sm accountInformation sidebarInfo  ${
                pathname == "/userdashboard/orders" ? "sm:bg-gray-200" : ""
              }`}
            
            >
              <OrderIcon />
              <p className="text-sm text-gray-600">Orders</p>
            </div>
          </Link>

        

         
          <Link
            href="/userdashboard/manageaccount "
            className=""
          >
            <div
              className={`flex items-center  px-4 py-2 gap-4 rounded-sm  hover:bg-gray-100 accountInformation sidebarInfo ${
                pathname == "/userdashboard/manageaccount"
                  ? "sm:bg-gray-300"
                  : ""
              }`}
            >
              <ManageIcon />
              <p className="text-sm text-gray-600">Manage Account</p>
            </div>
          </Link>

          <div className="flex items-center hover:bg-gray-100 cursor-pointer gap-3  px-4 py-2 text-blue-500 border-b border-gray-300">
            <svg
              className="w-6 h-6"
              viewBox="0 -0.5 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#737373"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M7.04401 9.53165C7.33763 9.23949 7.33881 8.76462 7.04665 8.47099C6.75449 8.17737 6.27962 8.17619 5.98599 8.46835L7.04401 9.53165ZM2.97099 11.4683C2.67737 11.7605 2.67619 12.2354 2.96835 12.529C3.26051 12.8226 3.73538 12.8238 4.02901 12.5317L2.97099 11.4683ZM4.02901 11.4683C3.73538 11.1762 3.26051 11.1774 2.96835 11.471C2.67619 11.7646 2.67737 12.2395 2.97099 12.5317L4.02901 11.4683ZM5.98599 15.5317C6.27962 15.8238 6.75449 15.8226 7.04665 15.529C7.33881 15.2354 7.33763 14.7605 7.04401 14.4683L5.98599 15.5317ZM3.5 11.25C3.08579 11.25 2.75 11.5858 2.75 12C2.75 12.4142 3.08579 12.75 3.5 12.75V11.25ZM17.5 12.75C17.9142 12.75 18.25 12.4142 18.25 12C18.25 11.5858 17.9142 11.25 17.5 11.25V12.75ZM5.98599 8.46835L2.97099 11.4683L4.02901 12.5317L7.04401 9.53165L5.98599 8.46835ZM2.97099 12.5317L5.98599 15.5317L7.04401 14.4683L4.02901 11.4683L2.97099 12.5317ZM3.5 12.75L17.5 12.75V11.25L3.5 11.25V12.75Z"
                  fill="#737373"
                ></path>{" "}
                <path
                  d="M9.5 15C9.5 17.2091 11.2909 19 13.5 19H17.5C19.7091 19 21.5 17.2091 21.5 15V9C21.5 6.79086 19.7091 5 17.5 5H13.5C11.2909 5 9.5 6.79086 9.5 9"
                  stroke="#737373"
                  strokeWidth="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <p className="rounded-sm text-center text-sm">Logout</p>
          </div>
          <Upgrade />
        </div>
      </div>
    </>
  );
}

export default DesktopSide