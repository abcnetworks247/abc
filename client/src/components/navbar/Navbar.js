"use client";
import { useState, React } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UseProductProvider } from "../../../contexts/ProductProvider";
import { UseUserContext } from "../../../contexts/UserContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import Image from "next/image";
/**
 * Represents a navigation bar component.
 * @returns {JSX.Element} The JSX element representing the navigation bar.
 */
export default function Navbar() {
  const router = useRouter();

  const { HandleLogout, UserData, loading, Authtoken } = UseUserContext();
  const { cartProducts, Wishlist } = UseProductProvider();
  const pathname = usePathname();

  // console.log('tokk',Authtoken);

  // cart value variable
  const cartvalue = cartProducts.length;

  // Wishlist value variable

  const WishlistValue = Wishlist.length;

  // wishlist local storage function

  function Logout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "loggedOut!",
          text: "You've been logged out succesfully.",
          icon: "success",
        });
        router.push("/login");
        if (typeof window !== "undefined") {
          localStorage.removeItem("hasReloaded");
        }
        HandleLogout();
      }
    });
  }

  return (
    <div>
      <div className="navbar rounded-lg fixed top-0 right-0 w-full z-[100] shadow-md h-16 bg-white mb-24">
        <div>
          <div className="w-fit ">
            <label htmlFor="sidebar-mobile-fixed" className="  md:hidden">
              <RiMenu2Fill className="text-gray-700 hover:text-primary transition  text-[26px] cursor-pointer" />
            </label>
          </div>
        </div>
        {/* abcdstudio logo */}
        <div className="navbar-start">
          <a className="navbar-item">Ripple UI</a>
        </div>
        {/*  Pages  */}
        <div className="navbar-center hidden md:block ">
          <Link
            href="/"
            className={`navbar-item rounded-none hover:border-b-[2px] mx-1  border-[#077bff] transition-all ${
              pathname === "/" ? "border-b-[2px] border-[#077bff]" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/store"
            className={`navbar-item rounded-none mx-1  hover:border-b-[2px] border-[#077bff] transition-all ${
              pathname === "/store" ? "border-b-[2px] border-[#077bff]" : ""
            }`}
          >
            Store
          </Link>
          <Link
            href="/pricing"
            className={`navbar-item rounded-none hover:border-b-[2px] mx-1  border-[#077bff] transition-all ${
              pathname === "/pricing" ? "border-b-[2px] border-[#077bff]" : ""
            }`}
          >
            Packages
          </Link>

          <Link
            href="/about"
            className={`navbar-item mx-1  rounded-none hover:border-b-[2px] border-[#077bff] transition-all ${
              pathname === "/about" ? "border-b-[2px] border-[#077bff]" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`navbar-item mx-1  rounded-none hover:border-b-[2px] border-[#077bff] transition-all ${
              pathname === "/contact" ? "border-b-[2px] border-[#077bff]" : ""
            }`}
          >
            Contact
          </Link>
        </div>
        <div className="navbar-center hidden md:block "></div>
        <div className="navbar-end flex flex-row items-center ">
          <div className="flex flex-row items-center gap-3 mr-4">
            <a
              href="/wish"
              className="text-center items-center flex flex-col text-gray-700 hover:text-primary transition relative"
            >
              <div className="text-2xl">
                <FaRegHeart />
              </div>
              <div className="text-xs leading-3">Wishlist</div>

              {WishlistValue === 0 ? (
                <></>
              ) : (
                <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center bg-red-500 justify-center text-white text-xs">
                  {WishlistValue}
                </div>
              )}
            </a>
            <a
              href="/CartContent"
              className="text-center items-center flex flex-col text-gray-700 hover:text-primary transition relative"
            >
              <div className="text-2xl">
                <TiShoppingCart />
              </div>
              <div className="text-xs leading-3">cart</div>
              {cartProducts.length === 0 ? (
                <></>
              ) : (
                <div className="absolute right-0 left-4 -top-1 w-5 h-5 rounded-full flex items-center bg-red-500 justify-center text-white text-xs">
                  {cartvalue}
                </div>
              )}
            </a>
          </div>

          {/* condition to display user profile picture on first render with token */}
          <div>
            {Authtoken && UserData && Authtoken.length !== 0 ? (
              <div className="avatar avatar-ring avatar-md  hidden md:block">
                {loading === false ? (
                  <div className="dropdown-container ">
                    <div className="flex flex-row gap-4 ">
                      <div className="dropdown  hidden md:block">
                        <label
                          className="btn btn-ghost cursor-pointer px-0 hidden sm:block md:block lg:block justify-items-end"
                          tabIndex="0"
                        >
                          <Image
                            src={UserData && UserData.userdp}
                            height={20}
                            width={33}
                            quality={100}
                            loading="lazy"
                            className="rounded-full cursor-pointer object-cover"
                            alt="avatar"
                            // style={{
                            //   width: '100%',
                            //   height: 'auto',
                            // }}
                          />
                        </label>

                        <div className="dropdown-menu dropdown-menu-bottom-left mt-[15px] bg-white">
                          <a className="dropdown-item text-sm -z-50">Profile</a>
                          <a tabIndex="-1" className="dropdown-item text-sm">
                            Account settings
                          </a>
                          <a tabIndex="-1" className="dropdown-item text-sm">
                            Subscriptions
                          </a>
                          <a
                            tabIndex="-1"
                            className="dropdown-item text-sm"
                            onClick={Logout}
                          >
                            logout
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="h-full w-[50px] rounded-full bg-gray-400 animate-pulse"></div>
                  </>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <div className=" dropdown-container ">
            <label
               className="btn btn-ghost cursor-pointer px-0 "
              tabIndex="1"
            >
              <FaRegUser className="text-gray-700 hover:text-primary transition  text-[26px] cursor-pointer block md:hidden" />
            </label>

            <div className="dropdown-menu dropdown-menu-bottom-left mt-[15px] bg-white">
              <a className="dropdown-item text-sm -z-50">login or signup</a>
              <a tabIndex="-2" className="dropdown-item text-sm">
                Account settings
              </a>
              <a tabIndex="-2" className="dropdown-item text-sm">
                Subscriptions
              </a>
              <a tabIndex="-2" className="dropdown-item text-sm">
                logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
