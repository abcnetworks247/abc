"use client"
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {AccountIcon, ProfileIcon} from './icons/UserIcon'
import { useState } from 'react';
 
const SettingNav = () => {
  const pathname = usePathname()
  const [isDown, setIsDown] = useState(false)

  const handleDropDown = () => {
    setIsDown((prev) =>!prev)
  }
  return (
    <div className="flex flex-col basis-1/3">
      <Link
        href="/userdashboard/manageaccount"
        className={`flex items-center  px-4 py-2 gap-4 rounded-sm  hover:bg-gray-100 accountInformation sidebarInfo  ${
          pathname == "/userdashboard/manageaccount" ? "bg-gray-200" : ""
        }`}
      >
        <svg
          className='w-5 h-5'
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#737373"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H9M15 5H17C18.1046 5 19 5.89543 19 7V9"
              stroke="#737373"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
            <path
              d="M14.902 20.3343L12.7153 20.7716L13.1526 18.585C13.1914 18.3914 13.2865 18.2136 13.4261 18.074L17.5 14L19.5 12L21.4869 13.9869L19.4869 15.9869L15.413 20.0608C15.2734 20.2004 15.0956 20.2956 14.902 20.3343Z"
              stroke="#737373"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
            <path
              d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
              stroke="#737373"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
        <p>Edit Profile</p>
      </Link>
      <div>
        <div
          onClick={() => handleDropDown()}
          className="flex items-center  px-4 py-2 gap-4 rounded-sm  hover:bg-gray-100
          accountInformation
          sidebarInfo"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M8.1819 10.7027H6.00008C5.44781 10.7027 5.0001 11.1485 5.00009 11.7008C5.00005 13.3483 5 16.6772 5.00011 18.9189C5.00023 21.4317 8.88618 22 12 22C15.1139 22 19 21.4317 19 18.9189C19 16.6773 19 13.3483 19 11.7008C19 11.1485 18.5523 10.7027 18 10.7027H15.8182M8.1819 10.7027C8.1819 10.7027 8.18193 8.13514 8.1819 6.59459C8.18186 4.74571 9.70887 3 12 3C14.2912 3 15.8182 4.74571 15.8182 6.59459C15.8182 8.13514 15.8182 10.7027 15.8182 10.7027M8.1819 10.7027H15.8182"
                stroke="#000000"
                stroke-width="1.91"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13 16.6181V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V16.6181C10.6931 16.3434 10.5 15.9442 10.5 15.5C10.5 14.6716 11.1716 14 12 14C12.8284 14 13.5 14.6716 13.5 15.5C13.5 15.9442 13.3069 16.3434 13 16.6181Z"
                fill="#737373"
              ></path>{" "}
            </g>
          </svg>
          <p>Security details</p>
        </div>
        {isDown && (
          <div className="flex flex-col w-full">
            <Link
              href="/userdashboard/manageaccount/password"
              className={`p-4 hover:bg-gray-100 accountInformation sidebarInfo  ${
                pathname == "/userdashboard/manageaccount/password"
                  ? "bg-gray-200"
                  : ""
              }`}
            >
              Change Password
            </Link>
            <Link
              href="/userdashboard/manageaccount/deleteaccount"
              className="  px-4 py-2 gap-4 rounded-sm  hover:bg-gray-100 accountInformation sidebarInfo"
            >
              Delete account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingNav