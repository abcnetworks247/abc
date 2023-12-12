import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import Link from "next/link";
export default function Navbar() {
  return (
    <div >
      <div className="navbar rounded-lg fixed top-0 right-0 w-full z-[1000] shadow-md h-16 bg-white">
        {/* abcdstudio logo */}
        <div className="navbar-start">
          <a className="navbar-item">Ripple UI</a>
        </div>
        {/*  Pages  */}
        <div className="navbar-center hidden md:block ">
          <Link href="/" className="navbar-item">
            Home
          </Link>
          <Link href="/store"  className="navbar-item">Store</Link>
          <Link href="/pricing" className="navbar-item">
            Packages
          </Link>
          <a className="navbar-item">About</a>
          <a className="navbar-item">Contact</a>
        </div>
        <div className="navbar-center hidden md:block "></div>
        <div className="navbar-end flex flex-row items-center ">
          <div className="flex flex-row items-center gap-3 mr-4">
            <a
              href="#"
              className="text-center items-center flex flex-col text-gray-700 hover:text-primary transition relative"
            >
              <div className="text-2xl">
                <FaRegHeart />
              </div>
              <div className="text-xs leading-3">Wishlist</div>
              <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center bg-red-500 justify-center text-white text-xs">
                8
              </div>
            </a>
            <a
              href="/CartContent"
              className="text-center items-center flex flex-col text-gray-700 hover:text-primary transition relative"
            >
              <div className="text-3xl">
                <TiShoppingCart />
              </div>
              <div className="text-xs leading-3">cart</div>
              <div className="absolute right-0 left-4 -top-1 w-5 h-5 rounded-full flex items-center bg-red-500 justify-center text-white text-xs">
                8
              </div>
            </a>
          </div>
          <div className="avatar avatar-ring avatar-md">
            <label className="btn btn-ghost  cursor-pointer px-0" tabIndex="0">
              <img
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                alt="avatar"
              />
            </label>
          </div>
          <div className="avatar avatar-ring avatar-md">
            <div className="dropdown-container   text-center ">
              <label
                htmlFor="sidebar-mobile-fixed"
                className="btn btn-ghost flex cursor-pointer px-0 sm:hidden md:hidden lg:hidden"
                tabIndex="0"
              >
                <HiOutlineMenuAlt3 className="text-3xl" />
              </label>

              <div className="flex flex-row gap-4">
                <div className="dropdown">
                  <label
                    className="btn btn-ghost cursor-pointer px-0 hidden sm:block md:block lg:block justify-items-end"
                    tabIndex="0"
                  >
                    <MdOutlineKeyboardArrowDown className="text-2xl mt-8" />
                  </label>
                  <div className="dropdown-menu dropdown-menu-bottom-left bg-white">
                    <a className="dropdown-item text-sm -z-50">Profile</a>
                    <a tabIndex="-1" className="dropdown-item text-sm">
                      Account settings
                    </a>
                    <a tabIndex="-1" className="dropdown-item text-sm">
                      Subscriptions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
