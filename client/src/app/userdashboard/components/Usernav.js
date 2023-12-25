"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Upgrade from "./Upgrade";
import { UseProductProvider } from "../../../../contexts/ProductProvider";
import { useRouter } from "next/navigation";
import { UseUserContext } from "../../../../contexts/UserContext";

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
    clickState,
  } = UseProductProvider();

   const { UserData, HandleGetUser } = UseUserContext();

   const [userData, setUserData] = useState({});
  

   useEffect(() => {
     // Fetch user data when the component mounts
     HandleGetUser();
   }, []);
  
  useEffect(() => {
     setUserData(UserData)
  }, [UserData])
  
  console.log("usernave", userData)

  return (
    <>
      <div
        className={`  w-full px-4 py-4 sm:min-h-max sm:min-w-[28%]  md:max-w-[28%] lg:max-w-[30%]  bg-white  sm:rounded-md sm:shadow-md`}
      >
        <div className="flex items-center gap-4 accountInformation  w-full">
          <div class="py-2 shrink-0">
            <img
              class="object-cover w-20 h-20 rounded-full"
              src={`${userData.userdp}`}
              alt="Current profile photo"
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <span className="text-sm font-semibold  w-full text-gray-600">
              {userData.fullname}
            </span>
            <p className="text-xs text-gray-600">{userData.email }</p>
            <div className="flex flex-row items-start gap-2">
              <span className="text-sm text-gray-600">{userData.userpackage}</span>
              <svg
                className="w-6 h-6"
                viewBox="-3.5 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
        <div className="h-full mt-8">
          {/* <div
            className={`sm:hidden  flex items-center px-4 py-2 gap-4 bg-gray-200 hover:bg-gray-100 rounded-sm accountInformation sidebarInfo `}
          >
            <AccountIcon />
            <p className="text-sm text-gray-600">My ABC account</p>
          </div> */}

          <Link
            onClick={() => {
              handleUser();
            }}
            href={clickState ? `/userdashboard` : ``}
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
              onClick={() => {
                handleUser();
              }}
            >
              <OrderIcon />
              <p className="text-sm text-gray-600">Orders</p>
            </div>
          </Link>

          <div>
            <div
              className={`sm:hidden flex items-center px-4 py-2 gap-3 hover:bg-gray-100 rounded-sm accountInformation sidebarInfo bg-gray-200 `}
            >
              {/* <OrderIcon /> */}
              <p className="text-sm text-gray-600">Account Management</p>
            </div>
          </div>

          <Link href="/userdashboard/EditDetails">
            <div
              className={`sm:hidden flex items-center  px-4 py-2 gap-3 hover:bg-gray-100 rounded-sm accountInformation sidebarInfo  ${
                pathname == "/userdashboard/EditDetails" ? "sm:bg-gray-200" : ""
              }`}
              onClick={() => {
                handleUser();
              }}
            >
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
                    d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H9M15 5H17C18.1046 5 19 5.89543 19 7V9"
                    stroke="#737373"
                    strokeWidth="2"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                  <path
                    d="M14.902 20.3343L12.7153 20.7716L13.1526 18.585C13.1914 18.3914 13.2865 18.2136 13.4261 18.074L17.5 14L19.5 12L21.4869 13.9869L19.4869 15.9869L15.413 20.0608C15.2734 20.2004 15.0956 20.2956 14.902 20.3343Z"
                    stroke="#737373"
                    strokeWidth="2"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                  <path
                    d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                    stroke="#737373"
                    strokeWidth="2"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>

              <p className="text-sm text-gray-600">Edit Profile</p>
            </div>
          </Link>

          <Link href="/userdashboard/closeaccount">
            <div
              className={`sm:hidden flex items-center  px-4 py-2 gap-3 hover:bg-gray-100 rounded-sm accountInformation sidebarInfo  ${
                pathname == "/userdashboard/EditDetails" ? "sm:bg-gray-200" : ""
              }`}
              onClick={() => {
                handleUser();
              }}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                fill="#737373"
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
                    fill="#737373"
                    d="M10.5957552,0 C13.8224853,0 16.4382669,2.56640935 16.4382669,5.73223573 C16.4382669,7.47669938 15.644028,9.03915996 14.3909809,10.090518 C14.664623,10.2235258 14.9136176,10.3581474 15.1390658,10.4930662 C15.6237777,10.7831407 16.1267346,11.1427602 16.6489931,11.5717392 C16.9458898,11.8156078 16.9850743,12.2494418 16.7365142,12.5407346 C16.4879541,12.8320274 16.045774,12.8704723 15.7488774,12.6266038 C15.277781,12.2396488 14.8307666,11.9200289 14.4088906,11.6675584 C14.0273537,11.4392287 13.5522104,11.2043 12.9846924,10.9644217 C12.2542265,11.2861908 11.4462112,11.4644715 10.5957552,11.4644715 C9.6553574,11.4644715 8.76685182,11.2464878 7.97986631,10.8592117 L7.93770472,10.878634 L7.93770472,10.878634 C5.96079356,11.634739 4.51865654,12.752929 3.5873929,14.2369477 C2.65301446,15.7259301 2.27132031,17.3895789 2.44152848,19.2506112 C2.47613463,19.6289901 2.19155082,19.9632511 1.80589275,19.9972041 C1.42023467,20.031157 1.0795432,19.7519447 1.04493705,19.3735658 C0.84812174,17.2216146 1.29785495,15.2614114 2.39335469,13.5156736 C3.35678473,11.9803959 4.77218575,10.7859405 6.62343881,9.9348321 C5.47339407,8.88942725 4.75324355,7.3933442 4.75324355,5.73223573 C4.75324355,2.56640935 7.36902513,0 10.5957552,0 Z M17.8192835,14.2393646 C18.088619,13.9725618 18.5261801,13.9716914 18.7966038,14.2374206 C19.0670274,14.5031499 19.0679096,14.9348524 18.7985741,15.2016552 L18.7985741,15.2016552 L17.607,16.381 L18.7985741,17.5612253 C19.0679096,17.8280282 19.0670274,18.2597307 18.7966038,18.5254599 C18.5261801,18.7911891 18.088619,18.7903187 17.8192835,18.5235159 L16.632,17.347 L15.4451813,18.5235159 C15.2027794,18.7636384 14.8241147,18.7883557 14.5536669,18.5971813 L14.467861,18.5254599 C14.1974374,18.2597307 14.1965552,17.8280282 14.4658907,17.5612253 L14.4658907,17.5612253 L15.656,16.381 L14.4658907,15.2016552 C14.1965552,14.9348524 14.1974374,14.5031499 14.467861,14.2374206 C14.7382847,13.9716914 15.1758458,13.9725618 15.4451813,14.2393646 L16.632,15.415 Z M10.5957552,1.37573658 C8.14344035,1.37573658 6.15544635,3.32620768 6.15544635,5.73223573 C6.15544635,8.13826378 8.14344035,10.0887349 10.5957552,10.0887349 C13.0480701,10.0887349 15.0360641,8.13826378 15.0360641,5.73223573 C15.0360641,3.32620768 13.0480701,1.37573658 10.5957552,1.37573658 Z"
                  ></path>{" "}
                </g>
              </svg>

              <p className="text-sm text-gray-600">Close account</p>
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
};

export default Usernav;
