"use client";
import Link from "next/link";
import { UseUserContext } from "../../../contexts/UserContext";

import { useState } from "react";

export default function Page() {
  // define initial recoveryformdata state

  const [recoveryFormData, setRecoveryFormData] = useState("");

  // account recovery context function

  const { HandleUserAccountReset } = UseUserContext();
  /**
   *
   * @param {object} e - for preventing browser default
   */
  const HandleSubmit = (e) => {
    e.preventDefault();
    HandleUserAccountReset();
  };
  return (
    <div>
      <div className="max-w-screen-xl h-screen sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat "
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="w-full  lg:w-1/2 xl:w-5/12 p-6  lg:flex-none flex items-center flex-col justify-center h-screen sm:p-12">
          <div className="w-[100%] flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900 mb-2">
                recovery
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey take the next step in recovering your account.
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form
                className="mx-auto max-w-xs flex flex-col gap-4"
                onSubmit={HandleSubmit}
              >
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    setRecoveryFormData(e.target.value);
                  }}
                />

                <button
                  className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={HandleSubmit}
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Recovery</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  remeber your password?{" "}
                  <Link href="/login">
                    <span className="text-blue-900 font-semibold">login!</span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
