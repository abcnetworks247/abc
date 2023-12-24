"use client";
import { IoStorefrontOutline } from "react-icons/io5";
import { UseUserContext } from "../../../contexts/UserContext";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";
import { CgLivePhoto } from "react-icons/cg";
import { BiHomeSmile } from "react-icons/bi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineContacts } from "react-icons/md";

export default function Sidebar() {
  const { loading, UserData, Authtoken } = UseUserContext();

  return (
    <div>
      <div className="sm:w-full sm:max-w-[18rem] z-[90] ">
        <input
          type="checkbox"
          id="sidebar-mobile-fixed"
          className="hidden sidebar-state"
        />
        <label
          htmlFor="sidebar-mobile-fixed"
          className="sidebar-overlay lg:hidden "
        ></label>
        <aside className="justify-start h-full bg-white sidebar md:hidden lg:hidden sidebar-fixed-left sidebar-mobile max-sm:fixed max-sm:-translate-x-full">
          <div className="flex items-center justify-between pr-6">
            <section className="items-center p-4 sidebar-title">
              <svg
                fill="none"
                height="42"
                viewBox="0 0 32 32"
                width="42"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="100%" rx="16" width="100%"></rect>
                <path
                  clipRule="evenodd"
                  d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
              <div className="flex flex-col">
                <span>Acme</span>
                <span className="text-xs font-normal text-content2">
                  Team Plan
                </span>
              </div>
            </section>
            <div>
              <label htmlFor="sidebar-mobile-fixed">
                <MdClose className="text-3xl cursor-pointer text-blackInverted" />
              </label>
            </div>
          </div>
          <section className="sidebar-content">
            <nav className="rounded-md menu">
              <section className="px-4 menu-section">
                <span className="menu-title">Main menu</span>
                <ul className="menu-items">
                  <Link href="/">
                    <li className="menu-item">
                      <BiHomeSmile className="w-5 h-5 opacity-75" />
                      <span>Home</span>
                    </li>
                  </Link>
                  <Link href="/store">
                    <li className="menu-item">
                      <IoStorefrontOutline className="w-5 h-5 opacity-75" />

                      <p>Store</p>
                    </li>
                  </Link>
                  <Link href="/live">
                    <li className="menu-item">
                      <CgLivePhoto className="w-5 h-5 text-red-600 opacity-75" />

                      <span className="px-4 py-1 text-sm font-medium text-white bg-red-600 rounded-lg">
                        Live{" "}
                      </span>
                    </li>
                  </Link>
                  <Link href="/pricing">
                    <li className="menu-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="opacity-75"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
                        <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                        <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2"></path>
                      </svg>
                      Membership
                    </li>
                  </Link>
                  <Link href="/about">
                    <li className="menu-item">
                      <IoInformationCircleOutline className="w-5 h-5 text-black opacity-75" />
                      About
                    </li>
                  </Link>

                  <Link href="/contact">
                    <li className="menu-item">
                      <MdOutlineContacts className="w-5 h-5 text-black opacity-75" />
                      Contact
                    </li>
                  </Link>

                  <li>
                    <input
                      type="checkbox"
                      id="menu-1"
                      className="hidden menu-toggle"
                    />
                    <label
                      className="justify-between menu-item"
                      htmlFor="menu-1"
                    >
                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 opacity-75"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span>Account</span>
                      </div>

                      <span className="menu-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </label>

                    <div className="menu-item-collapse">
                      <div className="min-h-0">
                        <Link href="/userdashboard/manangeaccount">
                          <label className="ml-6 menu-item menu-item-disabled">
                            Account Settings
                          </label>
                        </Link>
                        <Link href="/userdashboard">
                          <label className="ml-6 menu-item">Profile</label>
                        </Link>
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
              <div className="my-0 divider"></div>
              <section className="px-4 menu-section">
                <span className="menu-title">More</span>
                <ul className="menu-items">
                  <li className="menu-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="opacity-75"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M3 21l18 0"></path>
                      <path d="M3 10l18 0"></path>
                      <path d="M5 6l7 -3l7 3"></path>
                      <path d="M4 10l0 11"></path>
                      <path d="M20 10l0 11"></path>
                      <path d="M8 14l0 3"></path>
                      <path d="M12 14l0 3"></path>
                      <path d="M16 14l0 3"></path>
                    </svg>
                    Payments
                  </li>
                  <Link href="/wish">
                    <li className="menu-item">
                      <FaRegHeart className="text-2xl" />
                      Wishlist
                    </li>
                  </Link>
                  <Link href="/cartContent">
                    <li className="menu-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="opacity-75"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M7 10l5 -6l5 6"></path>
                        <path d="M21 10l-2 8a2 2.5 0 0 1 -2 2h-10a2 2.5 0 0 1 -2 -2l-2 -8z"></path>
                        <path d="M12 15m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                      </svg>
                      Cart
                    </li>
                  </Link>
                </ul>
              </section>
            </nav>
          </section>
          <section className="justify-end pt-2 sidebar-footer bg-gray-2">
            <div className="my-0 divider"></div>
            <div className="z-50 flex w-full cursor-pointer dropdown h-fit hover:bg-gray-4">
              <div className="flex flex-row gap-4 p-4">
                {Authtoken && UserData && Authtoken.length !== 0 ? (
                  <>
                    {loading === false ? (
                      <div className="items-center gap-4 dropdown-container">
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

                        <div className="flex flex-col">
                          <span>{UserData && UserData.fullname}</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="h-full w-[40px] rounded-full bg-gray-400 animate-pulse"></div>
                      </>
                    )}
                  </>
                ) : (
                  <Link href="/login">
                    <FaRegUser className="text-gray-700 hover:text-primary transition  text-[26px] cursor-pointer block md:hidden" />
                  </Link>
                )}
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
