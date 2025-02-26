"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Store,
  Radio,
  CreditCard,
  Info,
  Mail,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  DollarSign,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { UseUserContext } from "../../../contexts/UserContext";

const STORE_URL =
  "https://pjajuc-hq.myshopify.com/?_cd=a4f2799dde32c7fc24a2db3b7246bdb4a476014d36160b46204195018a7f1eaf&_uid=104852226084";
const Logo = "/logo.png"; // Example logo path, replace with your actual logo path

// Custom News Icon SVG
const NewsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-4 h-4 mr-2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.15407 7.30116C7.52877 5.59304 9.63674 4.5 12 4.5C12.365 4.5 12.7238 4.52607 13.0748 4.57644L13.7126 5.85192L11.2716 8.2929L8.6466 8.6679L7.36009 9.95441L6.15407 7.30116Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.2011 8.82954C4.75126 9.79256 4.5 10.8669 4.5 12C4.5 15.6945 7.17133 18.7651 10.6878 19.3856L11.0989 18.7195L8.8147 15.547L10.3741 13.5256L9.63268 13.1549L6.94027 13.6036L6.41366 11.4972L5.2011 8.82954Z"
      fill="currentColor"
    />
  </svg>
);

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [newsCategories, setNewsCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loading: userLoading, UserData, Authtoken } = UseUserContext();

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("admin/category/news/type");
      if (response.ok) {
        const data = await response.json();
        setNewsCategories(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const mainMenuItems = [
    { href: "/", icon: Home, label: "Home" },
    {
      href: STORE_URL,
      icon: Store,
      label: "Store",
      external: true,
    },
    { href: "/live", icon: Radio, label: "Live", badge: true },
    { href: "/pricing", icon: CreditCard, label: "Membership" },
    { href: "/donate", icon: DollarSign, label: "Donate" },
    { href: "/about", icon: Info, label: "About" },
    { href: "/contact", icon: Mail, label: "Contact" },
  ];

  const moreMenuItems = [
    ...(Authtoken
      ? [{ href: "/userdashboard", icon: CreditCard, label: "Payments" }]
      : []),
    {
      href: STORE_URL,
      icon: ShoppingCart,
      label: "Cart",
      external: true,
    },
  ];

  return (
    <>
      {/* Mobile Checkbox Control */}
      <input
        type="checkbox"
        id="sidebar-mobile-fixed"
        className="hidden"
        checked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)}
      />

      {/* Mobile Trigger */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center justify-between">
              <Image
                src={Logo || "/placeholder.svg"}
                alt="ABC Studio"
                width={100}
                height={40}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </SheetTitle>
          </SheetHeader>
          <SidebarContent
            newsCategories={newsCategories}
            loading={loading}
            mainMenuItems={mainMenuItems}
            moreMenuItems={moreMenuItems}
            userLoading={userLoading}
            userData={UserData}
            authToken={Authtoken}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-background h-screen">
        <div className="p-4 border-b">
          <Image
            src={Logo || "/placeholder.svg"}
            alt="ABC Studio"
            width={100}
            height={40}
          />
        </div>
        <SidebarContent
          newsCategories={newsCategories}
          loading={loading}
          mainMenuItems={mainMenuItems}
          moreMenuItems={moreMenuItems}
          userLoading={userLoading}
          userData={UserData}
          authToken={Authtoken}
        />
      </aside>
    </>
  );
}

function SidebarContent({
  newsCategories,
  loading,
  mainMenuItems,
  moreMenuItems,
  userLoading,
  userData,
  authToken,
}) {
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  return (
    <ScrollArea className="flex-1">
      <div className="py-4 px-4">
        <div className="space-y-1">
          {mainMenuItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className="w-full justify-start"
            >
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                      Live
                    </span>
                  )}
                </a>
              ) : (
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                      Live
                    </span>
                  )}
                </Link>
              )}
            </Button>
          ))}

          <Collapsible open={isNewsOpen} onOpenChange={setIsNewsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <NewsIcon />
                News
                <ChevronDown
                  className={`ml-auto h-4 w-4 transition-transform ${
                    isNewsOpen ? "transform rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              {loading ? (
                <div className="space-y-2 px-2 py-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-muted animate-pulse rounded"
                    />
                  ))}
                </div>
              ) : (
                newsCategories?.map((category) => (
                  <Button
                    key={category.slug}
                    variant="ghost"
                    asChild
                    className="w-full justify-start pl-6"
                  >
                    <Link href={`/news/${category.slug}`}>{category.name}</Link>
                  </Button>
                ))
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          <p className="px-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">
            More
          </p>
          {moreMenuItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className="w-full justify-start"
            >
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </a>
              ) : (
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              )}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      <div className="p-4">
        {authToken ? (
          <div className="flex items-center space-x-4">
            {userLoading ? (
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                </div>
              </div>
            ) : (
              <>
                <Avatar>
                  <AvatarImage
                    src={userData?.userdp}
                    alt={userData?.fullname}
                  />
                  <AvatarFallback>
                    {userData?.fullname?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{userData?.fullname}</p>
                </div>
              </>
            )}
          </div>
        ) : (
          <Button variant="secondary" asChild className="w-full">
            <Link href="/login">
              <User className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          </Button>
        )}
      </div>
    </ScrollArea>
  );
}
