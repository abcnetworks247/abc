"use client";
import React from "react";
import { EditIcon } from "../components/icons/UserIcon";
import { UseProductProvider } from "../../../../contexts/ProductProvider";


const page = () => {
  const { screen , handleUser } = UseProductProvider();
  return (
    <div
      className={` ${
        screen ? "hidden" : ""
      }  h-auto w-full md:hidden absolute sm:static sm:block top-0 z-30 p-8 px-4 bg-white `}
    >
      <div className="flex flex-row-reverse w-full mb-3 ">
       
              <svg
            onClick={()=>handleUser()}
            className="w-4 h-4 self-end"
            viewBox="0 0 512 512"
            version="1.1"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g id="_x37_12-_close__x2C__cross__x2C__cancel__x2C_">
                <g>
                  <line
                    style={{
                      fill: "none",
                      stroke: "#000000",
                      strokeWidth: 30,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeMiterlimit: 2.6131,
                    }}
                    x1="486.21"
                    x2="26.739"
                    y1="26.814"
                    y2="486.139"
                  ></line>
                  <line
                    style={{
                      fill: "none",
                      stroke: "#000000",
                      strokeWidth: 30,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeMiterlimit: 2.6131,
                    }}
                    x1="486.21"
                    x2="26.739"
                    y1="486.139"
                    y2="26.814"
                  ></line>
                </g>
              </g>
              <g id="Layer_1"></g>
            </g>
          </svg>
        
      </div>

      <div className="flex items-center justify-between mb-2">
        <p className="font-bold">Profile Details</p>
        <div className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-200 cursor-pointer">
          <EditIcon />
        </div>
      </div>

      <div>
        <form action="#" method="post">
          <div className="px-4 mb-6">
            <label className="block mb-2 text-sm font-medium ">
              {" "}
              Full Name
            </label>
            <input
              className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded    "
              type="text"
              name=""
              placeholder="Enter a name"
            />
          </div>
          <div className="px-4 mb-6">
            <label className="block mb-2 text-sm font-medium "> Email</label>
            <input
              className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded    "
              type="email"
              name=""
              placeholder="Email"
            />
          </div>

          <div className="">
            <div className="w-full px-4 mb-6">
              <label className="block mb-2 text-sm font-medium ">
                {" "}
                Date of Birth
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="date"
                  className="border  rounded text-gray-900 sm:text-sm focus:outline-none   block w-full pl-10 p-2.5   "
                  placeholder="Select date"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mr-2">
                <input type="radio" name="inline-radio" />
                <span className="ml-2 dark:text-gray-400">Male</span>
              </label>
              <label>
                <input type="radio" name="inline-radio" value="option 2" />
                <span className="ml-2 dark:text-gray-400">Female</span>
              </label>
            </div>

            {/* <div className="w-full px-4 mb-6 lg:w-2/4">
                <label className="block mb-2 text-sm font-medium ">
                  {" "}
                  Deactive After
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="date"
                    className="border  rounded text-gray-900 sm:text-sm    block w-full pl-10 p-2.5   "
                    placeholder="Select date"
                  />
                </div>
            </div> */}
            {/* stop */}
          </div>

          {/* <div className="px-4 mb-6">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 "
                for="file_input"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-600 border border-gray-200 rounded cursor-pointer file:hover:bg-gray-200 file:border-solid file:border-0 file:cursor-pointer dark:file:border-gray-700 dark:file:text-gray-300 dark:file:hover:bg-gray-500 dark:file:bg-gray-600 file:mr-5 file:px-5 file:py-3 bg-gray-50    dark:placeholder-gray-400 file:border-r file:border-gray-300 file:bg-gray-100 "
                type="file"
              />
            </div>
            <div className="px-4 mb-6">
              <label className="block mb-2 text-sm font-medium ">
                {" "}
                Redirect in
              </label>
              <input
                className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded    "
                type="text"
                name=""
                placeholder="Redirect"
              />
                  </div>
                   */}
          {/* end */}

          <div className="px-4 mb-6">
            <label className="block text-sm font-medium text-gray-700 ">
              {" "}
              Photo
            </label>
            <div className="flex items-center mt-1">
              <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                <svg
                  className="w-full h-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </span>
              <button
                type="button"
                className="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded shadow-sm dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-600 hover:bg-gray-100 "
              >
                Save
              </button>
            </div>
          </div>
          <div className="px-4 mb-6">
            <label className="block mb-2 text-sm font-medium ">Remark</label>
            <textarea
              className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded    "
              name="field-name"
              rows="5"
              placeholder="Write something..."
            ></textarea>
          </div>
          <div className="px-4 ">
            <div className="flex ">
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-500  text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg "
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
