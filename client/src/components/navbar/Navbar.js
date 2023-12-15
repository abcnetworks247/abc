"use client";
import { useState, React } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UseProductProvider } from "../../../contexts/ProductProvider";
import { stringify } from "postcss";
/**
 * Represents a navigation bar component.
 * @returns {JSX.Element} The JSX element representing the navigation bar.
 */
export default function Navbar() {
  const { cartProducts, Wishlist } = UseProductProvider();
  const pathname = usePathname();

  let a = false;
  const [buttonColor, setButtonColor] = useState({
    signUp: "bg-blue-500 text-white",
    login: "bg-white text-gray-800",
  });

  const handleMouseOver = () => {
    setButtonColor({
      signUp: "bg-white text-gray-800",
      login: "bg-blue-500 text-white",
    });
  };

  const handleMouseOut = () => {
    setButtonColor({
      signUp: "bg-blue-500 text-white transition-all duration",
      login: "bg-white text-gray-800 transition-all duration",
    });
  };

  // cart value variable
  const cartvalue = cartProducts.length;

  // Wishlist value variable

  const WishlistValue = Wishlist.length;

  // wishlist local storage function

  return (
    <div>
      <div className="navbar rounded-lg fixed top-0 right-0 w-full z-[100] shadow-md h-16 bg-white mb-24">
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
              <div className="text-2xl" >
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
                {/* if a === true hide this div else show it */}
          <div className={`${a ? 'hidden' : 'group font-medium text-sm flex flex-row items-center justify-center border rounded ease-in-out duration-200' }`}>
            <Link href="/signup">
              <button
                className={`${buttonColor.signUp} p-2 rounded transition-colors`}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                SignUp
              </button>
            </Link>

            <Link href="/login">
              <button
                className={`${buttonColor.login} p-2 rounded transition-colors `}
              >
                Login
              </button>
            </Link>
          </div>



          <div className="avatar avatar-ring avatar-md ">
            <div className="dropdown-container   text-center ">
              <label
                htmlFor="sidebar-mobile-fixed"
                className="btn btn-ghost flex cursor-pointer px-0 sm:hidden md:hidden lg:hidden"
                tabIndex="0"
              >
                <HiOutlineMenuAlt3 className="text-3xl" />
              </label>

              <div className="flex flex-row gap-4 ">
                <div className="dropdown  hidden md:block">
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
