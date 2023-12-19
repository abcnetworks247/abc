"use client";
import React from "react";
import Link from "next/link";
import Upgrade from "./Upgrade";
import { UseProductProvider } from "../../../../contexts/ProductProvider";
import { useRouter } from "next/navigation";

import {
  HeartIcon,
  AccountIcon,
  VoucherIcon,
  ReviewIcon,
  ManageIcon,
  OrderIcon,
} from "./icons/UserIcon";
import { usePathname } from "next/navigation";

const Usernav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    isTabletOrMobile,
    handleLinkClick,
    isDesktop,
    handleUser,
    userNav,
    userModal,
    handleDesktopState,
  } = UseProductProvider();

  return (
    <>
      <div
        className={`  w-full px-4 py-4 sm:min-h-max sm:min-w-[28%]  md:max-w-[28%] lg:max-w-[30%]  bg-white  sm:rounded-md sm:shadow-md`}
      >
        <div className="flex items-center gap-4 accountInformation  w-full">
          <div class="py-2 shrink-0">
            <img
              class="object-cover w-20 h-20 rounded-full"
              src="https://i.postimg.cc/bNyr5cJq/pexels-anastasia-shuraeva-5704720.jpg"
              alt="Current profile photo"
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <span className="text-sm font-semibold  w-full text-gray-600">
              Peter Rodrigues
            </span>
            <p className="text-xs text-gray-600">peterrod@gmail.com</p>
            <div className="flex flex-row items-start gap-2">
              <span className="text-sm text-gray-600">Basic plan</span>
              <svg
                className="w-6 h-6"
                viewBox="-3.5 0 32 32"
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
                    d="M9.73795 18.8436L12.9511 20.6987L6.42625 32L4.55349 27.8233L9.73795 18.8436Z"
                    fill="#CE4444"
                  ></path>{" "}
                  <path
                    d="M9.73795 18.8436L6.52483 16.9885L0 28.2898L4.55349 27.8233L9.73795 18.8436Z"
                    fill="#983535"
                  ></path>{" "}
                  <path
                    d="M14.322 18.8436L11.1088 20.6987L17.6337 32L19.5064 27.8233L14.322 18.8436Z"
                    fill="#983535"
                  ></path>{" "}
                  <path
                    d="M14.322 18.8436L17.5351 16.9885L24.0599 28.2898L19.5064 27.8233L14.322 18.8436Z"
                    fill="#CE4444"
                  ></path>{" "}
                  <path
                    d="M22.9936 11.0622C22.9936 17.1716 18.0409 22.1243 11.9314 22.1243C5.82194 22.1243 0.869249 17.1716 0.869249 11.0622C0.869249 4.9527 5.82194 0 11.9314 0C18.0409 0 22.9936 4.9527 22.9936 11.0622Z"
                    fill="url(#paint0_linear_103_1801)"
                  ></path>{" "}
                  <path
                    d="M20.5665 11.0621C20.5665 15.8311 16.7004 19.6972 11.9315 19.6972C7.16247 19.6972 3.29645 15.8311 3.29645 11.0621C3.29645 6.29315 7.16247 2.42713 11.9315 2.42713C16.7004 2.42713 20.5665 6.29315 20.5665 11.0621Z"
                    fill="#A88300"
                  ></path>{" "}
                  <path
                    d="M21.0477 11.984C21.0477 16.7641 17.1727 20.6391 12.3926 20.6391C7.61251 20.6391 3.73748 16.7641 3.73748 11.984C3.73748 7.20389 7.61251 3.32887 12.3926 3.32887C17.1727 3.32887 21.0477 7.20389 21.0477 11.984Z"
                    fill="#C28B37"
                  ></path>{" "}
                  <path
                    d="M20.5868 11.0621C20.5868 15.8422 16.7118 19.7172 11.9317 19.7172C7.15159 19.7172 3.27656 15.8422 3.27656 11.0621C3.27656 6.28205 7.15159 2.40702 11.9317 2.40702C16.7118 2.40702 20.5868 6.28205 20.5868 11.0621Z"
                    fill="#C09525"
                  ></path>{" "}
                  <path
                    d="M11.9781 5.04096L13.8451 8.77502L17.5792 9.24178L15.0151 12.117L15.7122 16.2431L11.9781 14.3761L8.24404 16.2431L8.94729 12.117L6.37701 9.24178L10.1111 8.77502L11.9781 5.04096Z"
                    fill="url(#paint1_linear_103_1801)"
                  ></path>{" "}
                  <defs>
                    {" "}
                    <linearGradient
                      id="paint0_linear_103_1801"
                      x1="11.1804"
                      y1="4.03192"
                      x2="12.6813"
                      y2="31.965"
                      gradientUnits="userSpaceOnUse"
                    >
                      {" "}
                      <stop stop-color="#FFC600"></stop>{" "}
                      <stop offset="1" stop-color="#FFDE69"></stop>{" "}
                    </linearGradient>{" "}
                    <linearGradient
                      id="paint1_linear_103_1801"
                      x1="11.9783"
                      y1="5.04096"
                      x2="11.9783"
                      y2="16.2431"
                      gradientUnits="userSpaceOnUse"
                    >
                      {" "}
                      <stop stop-color="#FFFCDD"></stop>{" "}
                      <stop offset="1" stop-color="#FFE896"></stop>{" "}
                    </linearGradient>{" "}
                  </defs>{" "}
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className="h-full">
          <Link
            href="/userdashboard"
            className={`flex items-center px-4 py-2 gap-3 hover:bg-gray-100 accountInformation sidebarInfo   ${
              pathname == "/userdashboard" ? "sm:bg-gray-200" : ""
            }`}
          >
            <AccountIcon />
            <p>My account</p>
          </Link>

          <Link href="/userdashboard/orders">
            <div
              className={`flex items-center px-4 py-2 gap-3 hover:bg-gray-100 accountInformation sidebarInfo  ${
                pathname == "/userdashboard/orders" ? "sm:bg-gray-200" : ""
              }`}
              onClick={() => {
                handleUser();
              }}
            >
              <OrderIcon />
              <p>Orders</p>
            </div>
          </Link>

          <Link href="/userdashboard/EditDetails">
            <div
              className={`sm:hidden flex items-center  px-4 py-2 gap-3 hover:bg-gray-100 accountInformation sidebarInfo  ${
                pathname == "/userdashboard/EditDetails" ? "sm:bg-gray-200" : ""
              }`}
              onClick={() => {
                handleUser();
              }}
            >
              <OrderIcon />
              <p>EditDetails</p>
            </div>
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
            href="/userdashboard/manageaccount "
            className="hidden sm:block"
          >
            <div
              className={`flex items-center  px-4 py-2 gap-3  hover:bg-gray-100 accountInformation sidebarInfo ${
                pathname == "/userdashboard/manageaccount"
                  ? "sm:bg-gray-300"
                  : ""
              }`}
            >
              <ManageIcon />
              <p >Manage Account</p>
            </div>
          </Link>

          <div className="flex items-center gap-3  px-4 py-2  text-blue-500  border-b border-gray-300">
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
    </>
  );
};

export default Usernav;
