import React from "react";
import Link from "next/link"
export default function Sidebar() {
  return (
    <div className="w-auto sticky top-0 z-0 h-[100vh] hidden md:block">
      <div className="bg-[#121e31] h-screen left-0 min-w-[250px] py-6 px-4 font-[sans-serif] overflow-auto">
        <div className="relative flex flex-col h-full">
          <a href="javascript:void(0)">
            <img
              src="https://readymadeui.com/readymadeui-white.svg"
              alt="logo"
              className="w-[150px]"
            />
          </a>
          <ul className="space-y-3 my-10 flex-1">
            <li>
              <Link
                href="/dashboard"
                className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-[18px] h-[18px] mr-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
                    data-original="#000000"
                  />
                </svg>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-[18px] h-[18px] mr-4"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M13 .5H3A2.503 2.503 0 0 0 .5 3v10A2.503 2.503 0 0 0 3 15.5h10a2.503 2.503 0 0 0 2.5-2.5V3A2.503 2.503 0 0 0 13 .5ZM14.5 13a1.502 1.502 0 0 1-1.5 1.5H3A1.502 1.502 0 0 1 1.5 13v-.793l3.5-3.5 1.647 1.647a.5.5 0 0 0 .706 0L10.5 7.207V8a.5.5 0 0 0 1 0V6a.502.502 0 0 0-.5-.5H9a.5.5 0 0 0 0 1h.793L7 9.293 5.354 7.647a.5.5 0 0 0-.707 0L1.5 10.793V3A1.502 1.502 0 0 1 3 1.5h10A1.502 1.502 0 0 1 14.5 3Z"
                    data-original="#000000"
                  />
                </svg>
                <span>Insight</span>
              </a>
            </li>
            <li>
          
              <Link
                href="/dashboard/users"
                className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-slot="icon"  className="w-[18px] h-[18px] mr-4">
  <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
  <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
</svg>

                <span>Users</span>
              </Link>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-[18px] h-[18px] mr-4"
                  viewBox="0 0 511.414 511.414"
                >
                  <path
                    d="M497.695 108.838a16.002 16.002 0 0 0-9.92-14.8L261.787 1.2a16.003 16.003 0 0 0-12.16 0L23.639 94.038a16 16 0 0 0-9.92 14.8v293.738a16 16 0 0 0 9.92 14.8l225.988 92.838a15.947 15.947 0 0 0 12.14-.001c.193-.064-8.363 3.445 226.008-92.837a16 16 0 0 0 9.92-14.8zm-241.988 76.886-83.268-34.207L352.39 73.016l88.837 36.495zm-209.988-51.67 71.841 29.513v83.264c0 8.836 7.164 16 16 16s16-7.164 16-16v-70.118l90.147 37.033v257.797L45.719 391.851zM255.707 33.297l55.466 22.786-179.951 78.501-61.035-25.074zm16 180.449 193.988-79.692v257.797l-193.988 79.692z"
                    data-original="#000000"
                  />
                </svg>
                <span>Product</span>
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  stroke="currentColor"
                  className="w-[18px] h-[18px] mr-4"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000" />
                    </clipPath>
                  </defs>
                  <g
                    clipPath="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit={10}
                      strokeWidth={40}
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    />
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    />
                  </g>
                </svg>
                <span>Inbox</span>
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-[18px] h-[18px] mr-4"
                  viewBox="0 0 193.769 193.769"
                >
                  <path
                    d="m149.203 41.104-9.348 12.009c20.15 15.679 30.201 41.063 26.234 66.253-2.906 18.484-12.838 34.73-27.964 45.748-15.131 11.012-33.64 15.488-52.124 12.567-38.157-6.008-64.32-41.938-58.322-80.098C30.585 79.097 40.52 62.85 55.648 51.835c13.208-9.615 28.991-14.233 45.086-13.317L87.579 52.319l9.759 9.313 20.766-21.801.005.008 9.303-9.769-9.752-9.303-.005.003L95.862 0l-9.31 9.769 14.2 13.525c-19.303-.913-38.21 4.702-54.059 16.242C28.28 52.943 16.19 72.717 12.65 95.221c-7.302 46.445 24.54 90.184 70.985 97.493a86.181 86.181 0 0 0 13.434 1.055c17.89 0 35.273-5.623 50.011-16.356 18.415-13.409 30.503-33.183 34.043-55.682 4.829-30.654-7.403-61.55-31.92-80.627z"
                    data-original="#000000"
                  />
                  <path
                    d="M105.24 151.971v-.003h.001v-8.757c10.383-1.159 20.485-7.718 20.485-20.17 0-16.919-15.732-18.859-27.223-20.274-7.347-.878-12.97-1.897-12.97-6.348 0-6.188 8.722-6.855 12.473-6.855 5.567 0 11.507 2.617 13.525 5.957l.586.971 11.542-5.341-.571-1.164c-4.301-8.793-12.009-11.337-17.85-12.364v-7.71H91.723v7.677c-12.582 1.856-20.054 8.839-20.054 18.829 0 16.29 14.791 17.943 25.582 19.153 9.617 1.134 14.094 3.51 14.094 7.469 0 7.563-10.474 8.154-13.685 8.154-7.147 0-14.038-3.566-16.031-8.301l-.495-1.169-12.539 5.316.5 1.169c3.713 8.691 11.725 14.137 22.63 15.425v8.336h13.515z"
                    data-original="#000000"
                  />
                </svg>
                <span>Refunds</span>
              </a>
            </li>
            <li>
              <Link
                href="/dashboard/profile"
                className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-[18px] h-[18px] mr-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0"
                    data-original="#000000"
                  />
                </svg>
                <span>Profile</span>
              </Link>
            </li>
          </ul>
          <div className="flex flex-wrap items-center cursor-pointer border border-gray-500 rounded-full px-2 py-1">
            <img
              src="https://readymadeui.com/profile.webp"
              className="w-9 h-9 rounded-full border-2 border-white"
            />
            <div className="ml-4">
              <p className="text-sm text-white">John Doe</p>
              <p className="text-xs text-gray-300">Active free account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
