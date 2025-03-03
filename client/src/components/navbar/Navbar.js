"use client";
import { useState, React, useEffect, useCallback } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Logo from "@/resources/assets/image/AbcstudioNo.png";
import { IoMdArrowDropdown } from "react-icons/io";
import Api from "@/utils/Api";
import Cookies from "js-cookie";
import {
  Menu,
  ShoppingCart,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Heart,
  Bot,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const fetchData = useCallback(async () => {
    try {
      const [typeRes, catRes] = await Promise.all([
        Api.get("admin/category/news/type"),
        Api.get("admin/category/news/category"),
      ]);

      if (catRes.status === 200) {
        setCategory(catRes.data.data);
      }
      if (typeRes.status === 200) {
        // Sort by position before setting state
        const sortedTypes = typeRes.data.data.sort(
          (a, b) => a.position - b.position
        );
        setType(sortedTypes);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        <div className="w-fit lg:hidden">
          <label htmlFor="sidebar-mobile-fixed" className=" lg:hidden">
            <RiMenu2Fill className="text-white hover:text-gray-300 transition  text-[26px] cursor-pointer" />
          </label>
        </div>

        {/* abcdstudio logo */}
        <div className="">
          <Link href="/">
            <Image src={Logo} alt="logo" width={130} height={130} priority />
          </Link>
        </div>
        {/*  Pages  */}
        <div className="hidden text-white navbar-center lg:flex flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className={`navbar-item text-sm rounded-none hover:border-b-[2px] mx-1  border-[#0e1b2b] transition-all ${
              pathname === "/" ? "border-b-[2px] border-[#0e1b2b] " : ""
            }`}
          >
            Home
          </Link>
          <a
            href="https://pjajuc-hq.myshopify.com/?_cd=a4f2799dde32c7fc24a2db3b7246bdb4a476014d36160b46204195018a7f1eaf&_uid=104852226084"
            target="_blank"
            className={`navbar-item text-sm rounded-none mx-1  hover:border-b-[2px] border-[#0e1b2b] transition-all ${
              pathname === "/store" ? "border-b-[2px] border-[#0e1b2b]" : ""
            }`}
          >
            Store
          </a>
          <Link
            href="/pricing"
            className={`navbar-item text-sm rounded-none hover:border-b-[2px] mx-1 whitespace-nowrap  border-[#0e1b2b] transition-all ${
              pathname === "/pricing" ? "border-b-[2px] border-[#0e1b2b]" : ""
            }`}
          >
            Club Membership
          </Link>

          <Link
            href="/about"
            className={`navbar-item mx-1 text-sm  rounded-none hover:border-b-[2px] border-[#0e1b2b] transition-all ${
              pathname === "/about" ? "border-b-[2px] border-[#0e1b2b]" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`navbar-item mx-1 text-sm  rounded-none hover:border-b-[2px] border-[#0e1b2b] transition-all ${
              pathname === "/contact" ? "border-b-[2px] border-[#0e1b2b]" : ""
            }`}
          >
            Contact
          </Link>
          <Link
            //if access === basic redirect to home. else go to contact
            href={UserData && UserData.userpackage ? "/live" : "/signup"}
            className={`navbar-item mx-1 w-fit text-sm  rounded-none hover:border-b-[2px] border-[#0e1b2b] transition-all ${
              pathname === "/contact" ? "border-b-[2px] border-[#0e1b2b]" : ""
            }`}
          >
            <span className="px-4 py-1 text-sm font-medium text-white bg-red-600 rounded-[3px]">
              Live
            </span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="navbar-item text-sm rounded-none hover:border-b-[2px] mx-1 border-[#0e1b2b] transition-all">
              News <ChevronDown className="inline-block w-4 h-4 ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white mt-3 text-black z-[55] rounded-sm">
              {type.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className="text-sm hover:bg-gray-200"
                >
                  <Link href={`${pathUrl}${item.slug}`} className="w-full">
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className=" navbar-center lg:hidden "></div>
        <div className="flex flex-row items-center text-white">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
              {/* <div className="text-xs leading-3 text-white">cart</div> */}
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
              <div className="hidden avatar avatar-ring avatar-md md:block  h-fit">
                {loading === false ? (
                  <div className="dropdown-container">
                    <div className="flex flex-row gap-4 ">
                      <div className="hidden dropdown md:block">
                        <label
                          className="hidden px-0 cursor-pointer btn btn-ghost sm:block md:block lg:block justify-items-end h-fit"
                          tabIndex="0"
                        >
                          <div className="avatar-square avatar avatar-sm">
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
                <div className="items-center gap-1 p-1 m-2 shadow-sm w-fit item-center rounded-xl">
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
              <div className="block avatar avatar-ring avatar-md md:hidden h-fit">
                {loading === false ? (
                  <div className="avatar-square avatar avatar-sm h-fit">
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
                ) : (
                  <>
                    <div className="h-full w-[40px] rounded-full bg-gray-400 animate-pulse"></div>
                  </>
                )}
              </div>
            ) : (
              <>
                <label
                  className="px-0 cursor-pointer btn btn-ghost"
                  tabIndex="1"
                >
                  {" "}
                  <Link
                    href={`${
                      !Authtoken && !UserData ? "/login" : "/userdashboard"
                    }`}
                  >
                    {/* <FaRegUser className="text-white hover:text-btn-primary transition  text-[26px] cursor-pointer block lg:hidden" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
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
