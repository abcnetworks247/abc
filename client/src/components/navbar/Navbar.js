"use client";
import { useState, React, useEffect } from "react";
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
import Logo from "@/resources/assets/image/AbcstudioNo.png";
import { IoMdArrowDropdown } from "react-icons/io";
import Api from "@/utils/Api";
import Cookies from "js-cookie";

/**
 * Represents a navigation bar component.
 * @returns {JSX.Element} The JSX element representing the navigation bar.
 */
export default function Navbar() {
  const router = useRouter();

  const { HandleLogout, UserData, loading } = UseUserContext();
  const { cartProducts, wishlist } = UseProductProvider();
  const pathname = usePathname();
  const pathUrl = "/news/";
  const access = UserData && UserData.userpackage;

  const Authtoken = Cookies.get("authToken");

  console.log("Authtoken in nave", Authtoken);

  // console.log('tokk',Authtoken)

  // cart value variable
  const cartvalue = cartProducts ? cartProducts.length : 0;

  // Wishlist value variable

  const WishlistValue = wishlist ? wishlist.length : 0;

  const [type, setType] = useState([]);
  const [category, setCategory] = useState([]);

  const fetchData = async () => {
    try {
      const typeRes = await Api.get("admin/category/news/type");
      const catRes = await Api.get("admin/category/news/category");

      if (catRes.status === 200) {
        // console.log("cat------------->>", catRes.data);
        setCategory(catRes.data.data);
      }
      if (typeRes.status === 200) {
        // console.log("type------------->>", typeRes.data.data);
        setType(typeRes.data.data);
      }
    } catch (error) {
      // console.log(" Error------------->>", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        Cookies.remove("authToken");
        router.push("/login");
      }
    });
  }

  return (
    <div id="mainnav">
      <div className="navbar rounded-b-lg top-0 px-4 right-0 w-full z-[100] shadow-md h-16 bg-[#111827]">
        <div>
          <div className="w-fit ">
            <label htmlFor="sidebar-mobile-fixed" className=" md:hidden">
              <RiMenu2Fill className="text-white hover:text-gray-300 transition  text-[26px] cursor-pointer" />
            </label>
          </div>
        </div>
        {/* abcdstudio logo */}
        <div className="navbar-start ">
          <Link href="/">
            <Image src={Logo} alt="logo" width={130} height={130} priority />
          </Link>
        </div>
        {/*  Pages  */}
        <div className="hidden text-white navbar-center md:block lg:ml-20">
          <Link
            href="/"
            className={`navbar-item text-[15px] rounded-none hover:border-b-[2px] mx-1  border-[#0e1b2b] transition-all ${
              pathname === "/" ? "border-b-[2px] border-[#0e1b2b] " : ""
            }`}
          >
            Home
          </Link>
          <a
            href="https://pjajuc-hq.myshopify.com/?_cd=a4f2799dde32c7fc24a2db3b7246bdb4a476014d36160b46204195018a7f1eaf&_uid=104852226084"
            target="_blank"
            className={`navbar-item text-[15px] rounded-none mx-1  hover:border-b-[2px] border-[#0e1b2b] transition-all ${
              pathname === "/store" ? "border-b-[2px] border-[#0e1b2b]" : ""
            }`}
          >
            Store
          </a>
          <Link
            href="/pricing"
            className={`navbar-item text-[15px] rounded-none hover:border-b-[2px] mx-1 whitespace-nowrap  border-[#0e1b2b] transition-all ${
              pathname === "/pricing" ? "border-b-[2px] border-[#0e1b2b]" : ""
            }`}
          >
            Club Membership
          </Link>

          <Link
            href="/about"
            className={`navbar-item mx-1 text-[15px]  rounded-none hover:border-b-[2px] border-[#0e1b2b] transition-all ${
              pathname === "/about" ? "border-b-[2px] border-[#0e1b2b]" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`navbar-item mx-1 text-[15px]  rounded-none hover:border-b-[2px] border-[#0e1b2b] transition-all ${
              pathname === "/contact" ? "border-b-[2px] border-[#0e1b2b]" : ""
            }`}
          >
            Contact
          </Link>
          <Link
            //if access === basic redirect to home. else go to contact
            href={"/live"}
            className={`navbar-item mx-1 w-fit text-[15px]  rounded-none hover:border-b-[2px] border-[#0e1b2b] transition-all ${
              pathname === "/contact" ? "border-b-[2px] border-[#0e1b2b]" : ""
            }`}
          >
            <span className="px-4 py-1 text-sm font-medium text-white bg-red-600 rounded-[3px]">
              Live
            </span>
          </Link>

          <a className="dropdown dropdown-hover">
            <label tabIndex="0">News</label>
            <div className="dropdown-menu dropdown-menu-bottom-right bg-white mt-3 text-black uppercase z-[55] rounded-sm">
              {/* <a className="text-sm dropdown-item">Profile</a> */}
              {type.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={`${pathUrl}${item._id}`}
                    className="text-sm dropdown-item hover:bg-gray-200"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </a>
        </div>
        <div className="hidden navbar-center md:block "></div>
        <div className="flex flex-row items-center text-white navbar-end">
          <div className="flex flex-row items-center gap-3 mr-4 text-white">
            {/* <Link
              href="/wish"
              className="relative flex flex-col items-center text-center text-gray-700 transition hover:text-primary"
            >
              <div className="text-2xl text-white">
                <FaRegHeart />
              </div>
              <div className="text-xs leading-3 text-white">Wishlist</div>

              {WishlistValue === 0 ? (
                <></>
              ) : (
                <div className="absolute right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1">
                  {WishlistValue}
                </div>
              )}
            </Link> */}
            <a
              href="https://pjajuc-hq.myshopify.com/?_cd=a4f2799dde32c7fc24a2db3b7246bdb4a476014d36160b46204195018a7f1eaf&_uid=104852226084"
              target="_blank"
              className="relative flex flex-col items-center text-center text-gray-700 transition hover:text-primary"
            >
              <div className="text-2xl text-white">
                <TiShoppingCart />
              </div>
              <div className="text-xs leading-3 text-white">cart</div>
              {/* {cartProducts && cartProducts.length === 0 ? (
                <></>
              ) : (
                <div className="absolute right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full left-4 -top-1">
                  {cartvalue}
                </div>
              )} */}
            </a>
          </div>

          {/* condition to display user profile picture on first render with token */}
          <div>
            {Authtoken && UserData ? (
              <div className="hidden avatar avatar-ring avatar-md md:block">
                {loading === false ? (
                  <div className="dropdown-container ">
                    <div className="flex flex-row gap-4 ">
                      <div className="hidden dropdown md:block">
                        <label
                          className="hidden px-0 cursor-pointer btn btn-ghost sm:block md:block lg:block justify-items-end"
                          tabIndex="0"
                        >
                          <div className="avatar-square avatar avatar-md">
                            <Image
                              src={UserData && UserData.userdp}
                              height={20}
                              width={33}
                              quality={100}
                              loading="lazy"
                              className="object-cover rounded-full cursor-pointer"
                              alt="avatar"
                              // style={{
                              //   width: '100%',
                              //   height: 'auto',
                              // }}
                            />
                          </div>
                        </label>

                        <div className="dropdown-menu dropdown-menu-bottom-left mt-[15px] bg-white z-50 text-gray-900 rounded-sm">
                          <Link
                            href="/userdashboard"
                            className="text-sm rounded-sm dropdown-item -z-50 hover:bg-gray-100"
                          >
                            Profile
                          </Link>

                          <Link
                            href="/userdashboard/manageaccount"
                            tabIndex="-1"
                            className="text-sm rounded-sm dropdown-item hover:bg-gray-100"
                          >
                            Account settings
                          </Link>

                          <a
                            tabIndex="-1"
                            className="text-sm rounded-sm dropdown-item hover:bg-gray-100"
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
                    <div className="h-full w-[40px] rounded-full bg-gray-400 animate-pulse"></div>
                  </>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          {!Authtoken ? (
            <div className={`hidden lg:block ${loading ? "hidden" : "block"}`}>
              <div className="flex items-center justify-center h-fit ">
                <div className="items-center gap-1 p-1 m-5 shadow-sm w-fit item-center rounded-xl">
                  <Link href="/login">
                    <span className="flex flex-row gap-2 px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer whitespace-nowrap hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
                            stroke="#ffffff"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                        </g>
                      </svg>
                      Membership Login
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div>
            {Authtoken ? (
              <div className="block avatar avatar-ring avatar-md md:hidden">
                {loading === false ? (
                  <div className="dropdown-container ">
                    <div className="flex flex-row gap-4 ">
                      <div className="dropdown ">
                        <div className="avatar-square avatar avatar-md">
                          <Link href="/userdashboard">
                            <Image
                              src={UserData && UserData.userdp}
                              height={20}
                              width={33}
                              quality={100}
                              loading="lazy"
                              className="object-cover rounded-full cursor-pointer"
                              alt="avatar"
                              // style={{
                              //   width: '100%',
                              //   height: 'auto',
                              // }}
                            />
                          </Link>
                        </div>

                        {/* <div className="dropdown-menu dropdown-menu-bottom-left mt-[15px] bg-white">
                          <Link
                            href="/userdashboard"
                            className="text-sm dropdown-item -z-50"
                          >
                            Profile
                          </Link>

                          <Link
                            href="/userdashboard/manageaccount"
                            tabIndex="-1"
                            className="text-sm dropdown-item"
                          >
                            Account settings
                          </Link>
                          <Link
                            href="/userdashboard/subscription"
                            tabIndex="-1"
                            className="text-sm dropdown-item"
                          >
                            Subscriptions
                          </Link>
                          <a
                            tabIndex="-1"
                            className="text-sm dropdown-item"
                            onClick={Logout}
                          >
                            logout
                          </a>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="h-full w-[40px] rounded-full bg-gray-400 animate-pulse"></div>
                  </>
                )}
              </div>
            ) : (
              <>
                <label
                  className="px-0 cursor-pointer btn btn-ghost "
                  tabIndex="1"
                >
                  {" "}
                  <Link
                    href={`${
                      !Authtoken && !UserData ? "/login" : "/userdashboard"
                    }`}
                  >
                    <FaRegUser className="text-white hover:text-btn-primary transition  text-[26px] cursor-pointer block lg:hidden" />
                  </Link>
                </label>
                <div className=" dropdown-container">
                  <div className="dropdown-menu dropdown-menu-bottom-left mt-[5px] bg-white">
                    <a className="text-sm dropdown-item -z-50">
                      login or signup
                    </a>
                    <a tabIndex="-2" className="text-sm dropdown-item">
                      Account settings
                    </a>

                    <a tabIndex="-2" className="text-sm dropdown-item">
                      logout
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
