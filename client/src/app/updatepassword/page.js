"use client"
import { useState } from "react";
import Link from "next/link"
import Api from "@/utils/Api";
export default function Page() {
//  initial state for update password
  const [Allpassword, setAllpassword] = useState({
    password: "",
    confirmPassword: "",
  })

  /**
   * 
   * @param {object} e - the event object
   * @param {string} e.name - the name of the input
   * @param {string} e.value - the value of the input
   */

  const HandleInputChange =(e) => { 
    const{ name, value} = e.target
    setAllpassword({
      ...Allpassword,
      [name]: value
    })
  }



  const HandleSubmit = async (e)=> { 
    e.preventDefault()
    console.log(Allpassword);
    try {
      await Api.post('client/auth/updatepassword', Allpassword)
    } catch (error) {
      
    }
  }

  return (


    <div >
      <div className="max-w-screen-xl h-screen sm:rounded-lg flex justify-center flex-1">
        
        <div className="w-full  lg:w-1/2 xl:w-5/12 p-6  lg:flex-none flex items-center flex-col justify-center h-screen sm:p-12">
          <div className="w-[100%] flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900 mb-2">
              Update Password
              </h1>
              <p className="text-[12px] text-gray-500">
                Enter your New Password
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form className="mx-auto max-w-xs flex flex-col gap-4" onSubmit={HandleSubmit}>

                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  onChange={HandleInputChange}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={HandleInputChange}
                />
                
                <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" onClick={HandleSubmit}>
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                   strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Update Password</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  remeber your password?{" "}
                  <Link href="/login">
                    <span className="text-blue-900 font-semibold">login</span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat "
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
      </div>
    </div>


  );
}
