"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountIcon, ProfileIcon } from "./icons/UserIcon";
import { useState } from "react";

const SettingNav = () => {
  const pathname = usePathname();
  const [isDown, setIsDown] = useState(false);

  const handleDropDown = () => {
    setIsDown((prev) => !prev);
  };
  return (
    <div className="flex flex-col basis-1/3">
      <Link
        href="/userdashboard/manageaccount"
        className={`flex items-center px-4 py-2 gap-4 rounded-sm  hover:bg-gray-100 accountInformation sidebarInfo  ${
          pathname == "/userdashboard/manageaccount" ? "bg-gray-200" : ""
        }`}
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
        <p className="text-sm text-gray-600 ">Edit Profile</p>
      </Link>
      <div>
        <div
          onClick={() => handleDropDown()}
          className="flex items-center justify-between px-4 py-2 gap-4 rounded-sm  hover:bg-gray-100
          accountInformation
          sidebarInfo"
        >
          {/* <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
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
                d="M8.1819 10.7027H6.00008C5.44781 10.7027 5.0001 11.1485 5.00009 11.7008C5.00005 13.3483 5 16.6772 5.00011 18.9189C5.00023 21.4317 8.88618 22 12 22C15.1139 22 19 21.4317 19 18.9189C19 16.6773 19 13.3483 19 11.7008C19 11.1485 18.5523 10.7027 18 10.7027H15.8182M8.1819 10.7027C8.1819 10.7027 8.18193 8.13514 8.1819 6.59459C8.18186 4.74571 9.70887 3 12 3C14.2912 3 15.8182 4.74571 15.8182 6.59459C15.8182 8.13514 15.8182 10.7027 15.8182 10.7027M8.1819 10.7027H15.8182"
                stroke="#000000"
                strokeWidth="1.91"
                stroke-linecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 16.6181V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V16.6181C10.6931 16.3434 10.5 15.9442 10.5 15.5C10.5 14.6716 11.1716 14 12 14C12.8284 14 13.5 14.6716 13.5 15.5C13.5 15.9442 13.3069 16.3434 13 16.6181Z"
                fill="#737373"
              ></path>{" "}
            </g>
          </svg> */}
          <p className="text-sm text-gray-600 ">Security details</p>
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
              <svg
                fill="#737373"
                className="w-5 h-5"
                viewBox="0 0 512 512"
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
                  <g id="Change_password">
                    {" "}
                    <path d="M464.4326,147.54a9.8985,9.8985,0,0,0-17.56,9.1406,214.2638,214.2638,0,0,1-38.7686,251.42c-83.8564,83.8476-220.3154,83.874-304.207-.0088a9.8957,9.8957,0,0,0-16.8926,7.0049v56.9a9.8965,9.8965,0,0,0,19.793,0v-34.55A234.9509,234.9509,0,0,0,464.4326,147.54Z"></path>{" "}
                    <path d="M103.8965,103.9022c83.8828-83.874,220.3418-83.8652,304.207-.0088a9.8906,9.8906,0,0,0,16.8926-6.9961v-56.9a9.8965,9.8965,0,0,0-19.793,0v34.55C313.0234-1.3556,176.0547,3.7509,89.9043,89.9012A233.9561,233.9561,0,0,0,47.5674,364.454a9.8985,9.8985,0,0,0,17.56-9.1406A214.2485,214.2485,0,0,1,103.8965,103.9022Z"></path>{" "}
                    <path d="M126.4009,254.5555v109.44a27.08,27.08,0,0,0,27,27H358.5991a27.077,27.077,0,0,0,27-27v-109.44a27.0777,27.0777,0,0,0-27-27H153.4009A27.0805,27.0805,0,0,0,126.4009,254.5555ZM328,288.13a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,328,288.13Zm-72,0a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,256,288.13Zm-72,0a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,184,288.13Z"></path>{" "}
                    <path d="M343.6533,207.756V171.7538a87.6533,87.6533,0,0,0-175.3066,0V207.756H188.14V171.7538a67.86,67.86,0,0,1,135.7208,0V207.756Z"></path>{" "}
                  </g>{" "}
                </g>
              </svg>
              <p className="text-sm text-gray-600 ">Change Password</p>
            </Link>
            <Link
              href="/userdashboard/manageaccount/deleteaccount"
              className=" flex items-center px-4 py-2 gap-4 rounded-sm  hover:bg-gray-100 accountInformation sidebarInfo"
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
              <p className="text-sm text-gray-600 ">Close account</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingNav;
