"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import Swal from "sweetalert2";
import Api from "@/utils/Api";
import { UseProductProvider } from "../../../contexts/ProductProvider";
import { UseUserContext } from "../../../contexts/UserContext";

export default function Navbar() {
  const router = useRouter();
  const { HandleLogout, UserData, loading } = UseUserContext();
  const { cartProducts, wishlist } = UseProductProvider();
  const pathname = usePathname();
  const pathUrl = "/news/";
  const access = UserData && UserData.userpackage;

  const Authtoken = Cookies.get("authToken");

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
          title: "Logged Out!",
          text: "You've been logged out successfully.",
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
          <div className="w-fit">
            <label htmlFor="sidebar-mobile-fixed" className="md:hidden">
              <Menu className="text-white hover:text-gray-300 transition h-6 w-6 cursor-pointer" />
            </label>
          </div>
        </div>

        <div className="navbar-start">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={130}
              height={130}
              priority
            />
          </Link>
        </div>

        <div className="hidden text-white navbar-center md:block lg:ml-20">
          <Link
            href="/"
            className={`navbar-item text-sm rounded-none hover:border-b-[2px] mx-1 border-[#0e1b2b] transition-all ${
              pathname === "/" ? "border-b-[2px] border-[#0e1b2b]" : ""
            }`}
          >
            Home
          </Link>
          <a
            href="https://pjajuc-hq.myshopify.com/?_cd=a4f2799dde32c7fc24a2db3b7246bdb4a476014d36160b46204195018a7f1eaf&_uid=104852226084"
            target="_blank"
            className={`navbar-item text-sm rounded-none mx-1 hover:border-b-[2px] border-[#0e1b2b] transition-all ${
              pathname === "/store" ? "border-b-[2px] border-[#0e1b2b]" : ""
            }`}
            rel="noreferrer"
          >
            Store
          </a>
          <Link
            href="/pricing"
            className={`navbar-item text-sm rounded-none hover:border-b-[2px] mx-1 whitespace-nowrap border-[#0e1b2b] transition-all ${
              pathname === "/pricing" ? "border-b-[2px] border-[#0e1b2b]" : ""
            }`}
          >
            Club Membership
          </Link>
          <Link
            href="/about"
            className={`navbar-item mx-1 text-sm rounded-none hover:border-b-[2px] border-[#0e1b2b] transition-all ${
              pathname === "/about" ? "border-b-[2px] border-[#0e1b2b]" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`navbar-item mx-1 text-sm rounded-none hover:border-b-[2px] border-[#0e1b2b] transition-all ${
              pathname === "/contact" ? "border-b-[2px] border-[#0e1b2b]" : ""
            }`}
          >
            Contact
          </Link>
          <Link
            href="/live"
            className={`navbar-item mx-1 w-fit text-sm rounded-none hover:border-b-[2px] border-[#0e1b2b] transition-all`}
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

        <div className="flex flex-row items-center text-white navbar-end">
          <div className="flex flex-row items-center gap-3 mr-4 text-white">
            <Link
              href="/wish"
              className="relative flex flex-col items-center text-center text-gray-700 transition hover:text-primary"
            >
              <div className="text-2xl text-white">
                <Heart />
              </div>
              <div className="text-xs leading-3 text-white">Wishlist</div>
              {WishlistValue > 0 && (
                <div className="absolute right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1">
                  {WishlistValue}
                </div>
              )}
            </Link>
            <a
              href="https://pjajuc-hq.myshopify.com/?_cd=a4f2799dde32c7fc24a2db3b7246bdb4a476014d36160b46204195018a7f1eaf&_uid=104852226084"
              target="_blank"
              className="relative flex flex-col items-center text-center text-gray-700 transition hover:text-primary"
              rel="noreferrer"
            >
              <div className="text-2xl text-white">
                <ShoppingCart />
              </div>
              <div className="text-xs leading-3 text-white">Cart</div>
              {cartvalue > 0 && (
                <div className="absolute right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full left-4 -top-1">
                  {cartvalue}
                </div>
              )}
            </a>
          </div>

          {Authtoken && UserData ? (
            <div className="hidden avatar avatar-ring avatar-md md:block">
              {!loading ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src={UserData.userdp} alt="Profile" />
                      <AvatarFallback>
                        {UserData.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mt-2" align="end">
                    <DropdownMenuItem>
                      <Bot className="w-4 h-4 mr-2" />
                      <span className="text-sm">GPT-4</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Sparkles className="w-4 h-4 mr-2" />
                      <div>
                        <div className="text-sm font-medium">GPT-4</div>
                        <div className="text-xs text-muted-foreground">
                          With DALL-E, browsing and analysis
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Zap className="w-4 h-4 mr-2" />
                      <div>
                        <div className="text-sm font-medium">GPT-3</div>
                        <div className="text-xs text-muted-foreground">
                          Great for everyday tasks
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Link href="/userdashboard">
                      <DropdownMenuItem className="text-sm">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/userdashboard/manageaccount">
                      <DropdownMenuItem className="text-sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Account settings
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="text-sm" onSelect={Logout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-400 animate-pulse" />
              )}
            </div>
          ) : null}

          {!Authtoken ? (
            <div className={`hidden lg:block ${loading ? "hidden" : "block"}`}>
              <div className="flex items-center justify-center h-fit">
                <div className="items-center gap-1 p-1 m-5 shadow-sm w-fit item-center rounded-xl">
                  <Link href="/login">
                    <Button className="text-sm gap-2">
                      <LogOut className="w-4 h-4" />
                      Membership Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : null}

          <div>
            {Authtoken ? (
              <div className="block avatar avatar-ring avatar-md md:hidden">
                {!loading ? (
                  <Link href="/userdashboard">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src={UserData.userdp} alt="Profile" />
                      <AvatarFallback>
                        {UserData.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-400 animate-pulse" />
                )}
              </div>
            ) : (
              <Link href="/login" className="block md:hidden">
                <User className="w-6 h-6 text-white hover:text-primary transition cursor-pointer" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
