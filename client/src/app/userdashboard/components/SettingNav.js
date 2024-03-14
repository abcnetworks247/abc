"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountIcon, ProfileIcon } from "./icons/UserIcon";
import { useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { MdLockReset } from "react-icons/md";
import { IoPersonRemoveOutline } from "react-icons/io5";

const SettingNav = () => {
  const pathname = usePathname();
  const [isDown, setIsDown] = useState(false);

  const handleDropDown = () => {
    setIsDown((prev) => !prev);
  };
  return (
    <div className="flex flex-col sm:w-[40%] ">
      <Link
        href="/userdashboard/manageaccount"
        className={`flex items-center px-4 py-2 gap-4 rounded-sm  hover:bg-gray-100 accountInformation sidebarInfo  ${
          pathname == "/userdashboard/manageaccount" ? "bg-gray-200" : ""
        }`}
      >
        <LiaEdit size={24} />
        <p className="text-sm text-gray-600 ">Edit Profile</p>
      </Link>
      <div>
        <div
          onClick={() => handleDropDown()}
          className="flex items-center justify-between px-4 py-2 gap-4 rounded-sm  hover:bg-gray-100
          accountInformation
          sidebarInfo"
        >
          <p className="text-sm text-gray-600  whitespace-nowrap">
            Security details
          </p>
          {isDown ? (
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
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
                  d="M12 14.5C11.9015 14.5005 11.8038 14.4813 11.7128 14.4435C11.6218 14.4057 11.5392 14.3501 11.47 14.28L8 10.78C7.90861 10.6391 7.86719 10.4715 7.88238 10.3042C7.89756 10.1369 7.96848 9.97954 8.08376 9.85735C8.19904 9.73515 8.352 9.65519 8.51814 9.63029C8.68428 9.6054 8.85396 9.63699 9 9.72003L12 12.72L15 9.72003C15.146 9.63699 15.3157 9.6054 15.4819 9.63029C15.648 9.65519 15.801 9.73515 15.9162 9.85735C16.0315 9.97954 16.1024 10.1369 16.1176 10.3042C16.1328 10.4715 16.0914 10.6391 16 10.78L12.5 14.28C12.3675 14.4144 12.1886 14.4931 12 14.5Z"
                  fill="#737373"
                ></path>{" "}
              </g>
            </svg>
          ) : (
            <svg
              className="w-5 h-5 "
              viewBox="0 0 24 24"
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
                  d="M10.25 16.25C10.1493 16.2466 10.0503 16.2227 9.95921 16.1797C9.86807 16.1367 9.78668 16.0756 9.72001 16C9.57956 15.8594 9.50067 15.6688 9.50067 15.47C9.50067 15.2713 9.57956 15.0806 9.72001 14.94L12.72 11.94L9.72001 8.94002C9.66069 8.79601 9.64767 8.63711 9.68277 8.48536C9.71786 8.33361 9.79933 8.19656 9.91586 8.09322C10.0324 7.98988 10.1782 7.92538 10.3331 7.90868C10.4879 7.89198 10.6441 7.92391 10.78 8.00002L14.28 11.5C14.4205 11.6407 14.4994 11.8313 14.4994 12.03C14.4994 12.2288 14.4205 12.4194 14.28 12.56L10.78 16C10.7133 16.0756 10.6319 16.1367 10.5408 16.1797C10.4497 16.2227 10.3507 16.2466 10.25 16.25Z"
                  fill="#737373"
                ></path>{" "}
              </g>
            </svg>
          )}
        </div>
        {isDown && (
          <div className="flex flex-col w-full">
            <Link
              href="/userdashboard/manageaccount/password"
              className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 accountInformation sidebarInfo  ${
                pathname == "/userdashboard/manageaccount/password"
                  ? "bg-gray-200"
                  : ""
              }`}
            >
              <MdLockReset size={24} />
              <p className="text-sm text-gray-600  whitespace-nowrap ">
                Change Password
              </p>
            </Link>
            <Link
              href="/userdashboard/manageaccount/deleteaccount"
              className=" flex items-center px-4 py-2 gap-4 rounded-sm  hover:bg-gray-100 accountInformation sidebarInfo"
            >
              <IoPersonRemoveOutline size={24} />
              <p className="text-sm text-gray-600  whitespace-nowrap ">
                Close account
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingNav;
