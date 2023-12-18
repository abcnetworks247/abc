"use client";
import React from "react";
import Link from "next/link";
import Upgrade from "./Upgrade";
import {
  HeartIcon,
  AccountIcon,
  VoucherIcon,
  ReviewIcon,
  ManageIcon,
  OrderIcon
} from "./icons/UserIcon";
import { usePathname } from "next/navigation";
const Usernav = () => {
  const pathname = usePathname();
  return (
    <div className="w-[100vw]  px-2 sm:min-h-max sm:basis-1/4 bg-white py-2 sm:rounded-sm sm:shadow-md">
      <div className="flex items-center justify-center accountInformation  ">
        <div class="py-2 shrink-0">
          <img
            class="object-cover w-16 h-16 rounded-full"
            src="https://i.postimg.cc/bNyr5cJq/pexels-anastasia-shuraeva-5704720.jpg"
            alt="Current profile photo"
          />
        </div>
      </div>
      <div className="h-full">
        <Link
          href="/userdashboard"
          className={`flex items-center p-4  gap-3 hover:bg-gray-100 accountInformation sidebarInfo  ${
            pathname == "/userdashboard" ? "sm:bg-blue-400" : ""
          }`}
        >
          <AccountIcon />
          <p>My account</p>
        </Link>

        <Link
          href="/userdashboard/orders"
          className={`flex items-center p-4 gap-3 hover:bg-gray-100 accountInformation sidebarInfo ${
            pathname == "/userdashboard/orders" ? "sm:bg-blue-400" : ""
          }`}
        >
          <OrderIcon />
          <p>Orders</p>
        </Link>
        {/* <div className="flex items-center p-4 justify-between hover:bg-gray-100 accountInformation sidebarInfo">
          <VoucherIcon />
          <p>voucher</p>
        </div> */}
        {/* <div className="flex items-center p-4 justify-between hover:bg-gray-100 accountInformation sidebarInfo">
          <ReviewIcon />
          <p>Reviews</p>
        </div> */}
        <Link
          href="/userdashboard/manageaccount"
          className={`flex items-center p-4 gap-3  hover:bg-gray-100 accountInformation sidebarInfo ${
            pathname == "/userdashboard/manageaccount" ? "sm:bg-blue-400" : ""
          }`}
        >
          <ManageIcon />
          <p>Manage Account</p>
        </Link>
        <div className="flex items-center gap-3 px-4  text-blue-500  border-b border-gray-300">
          <svg
            className="w-6 h-6"
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
                d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4"
                stroke="#1C274C"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
              <path
                d="M10 12H20M20 12L17 9M20 12L17 15"
                stroke="#1C274C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
          <p className="px-2 py-2 hover:bg-gray-100 rounded-sm text-center cursor-pointer">
            LOG OUT
          </p>
        </div>
        <Upgrade />
      </div>
    </div>
  );
};

export default Usernav;
