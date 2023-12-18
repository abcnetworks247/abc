"use client";
import React from "react";
import Link from "next/link";
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
    <div className="w-[100vw] px-2 sm:min-h-max sm:basis-1/4 bg-white py-2 sm:rounded-sm sm:shadow-md">
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
          className={`flex items-center p-4 justify-between hover:bg-gray-100 accountInformation sidebarInfo  ${
            pathname == "/userdashboard" ? "bg-blue-400" : ""
          }`}
        >
          <AccountIcon />
          <p>My account</p>
        </Link>

        {/* <div className="flex items-center p-4 justify-between hover:bg-gray-100 accountInformation sidebarInfo">
                <LetterIcon />
                <p>My account</p>
              </div> */}

        <Link
          href="/userdashboard/orders"
          className={`flex items-center p-4 justify-between hover:bg-gray-100 accountInformation sidebarInfo ${
            pathname == "/userdashboard/orders" ? "bg-blue-400" : ""
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
          className={`flex items-center p-4 justify-between hover:bg-gray-100 accountInformation sidebarInfo ${
            pathname == "/userdashboard/manageaccount" ? "bg-blue-400" : ""
          }`}
        >
          <ManageIcon />
          <p>Manage Account</p>
        </Link>
        <div className="text-center px-4  text-blue-500  border-b border-gray-300">
          <p className="px-2 py-2 hover:bg-gray-100 rounded-sm text-center cursor-pointer">
            LOG OUT
          </p>
        </div>
      </div>
    </div>
  );
};

export default Usernav;
