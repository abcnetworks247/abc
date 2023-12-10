import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function Navbar() {
  return (
    <div>
      <div className="navbar rounded-lg sticky top-0 z-[10]">
        {/* abcdstudio logo */}
        <div className="navbar-start">
          <a className="navbar-item">Ripple UI</a>
        </div>
        <div className="navbar-end flex flex-row items-center">
          <div className="avatar avatar-ring avatar-md">
            <label className="btn btn-ghost  cursor-pointer px-0" tabIndex="0">
              <img
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                alt="avatar"
              />
            </label>
          </div>
          <div className="avatar avatar-ring avatar-md">
            <div className="dropdown-container  flex text-center ">
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
                    <MdOutlineKeyboardArrowDown   className="text-2xl" />
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
