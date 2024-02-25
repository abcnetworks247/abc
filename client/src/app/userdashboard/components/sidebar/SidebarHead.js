"use client"
import React from 'react'
import { UseUserContext } from '../../../../../contexts/UserContext';
import { useState, useEffect } from 'react';


const SidebarHead = () => {

  const { UserData, HandleGetUser } = UseUserContext();
  console.log("User data in profile", UserData)
  
  if (!UserData) {
    return (
      <div className="flex items-center gap-4 accountInformation w-full animate-pulse">
        <div className="py-2 shrink-0">
          <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm font-semibold w-full text-gray-600 bg-gray-300 h-4 rounded"></span>
          <p className="text-xs text-gray-600 bg-gray-300 h-3 rounded"></p>
          <div className="flex flex-row items-start gap-2">
            <span className="text-sm text-gray-600 bg-gray-300 h-4 rounded"></span>
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  
  return (
  
      <div className="flex items-center gap-4 accountInformation  w-full">
        <div class="py-2 shrink-0">
          <img
            class="object-cover w-20 h-20 rounded-full"
            src={`${UserData.userdp}`}
            alt="Current profile photo"
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm font-semibold  w-full text-gray-600">
            {UserData.fullname}
          </span>
          <p className="text-xs text-gray-600">{UserData.email}</p>
          <div className="flex flex-row items-start gap-2">
            <span className="text-sm text-gray-600">
              {UserData.userpackage}
            </span>
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

  );
}

export default SidebarHead