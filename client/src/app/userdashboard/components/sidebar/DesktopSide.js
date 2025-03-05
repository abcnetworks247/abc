"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import SidebarHead from "./SidebarHead";
import Upgrade from "../Upgrade";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  User,
  ShoppingBag,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const DesktopSide = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    setLoading(true);
    Cookies.remove("authToken");
    const authToken = Cookies.get("authToken");
    console.log("my current authToken", authToken);
    if (!authToken) {
      setLoading(false);
      if (typeof window !== "undefined") {
        router.push("/");
        window.location.reload();
      }
    }
  };

  const navItems = [
    {
      name: "My Account",
      href: "/userdashboard",
      icon: User,
    },
    {
      name: "Orders",
      href: "https://pjajuc-hq.myshopify.com/?_cd=a4f2799dde32c7fc24a2db3b7246bdb4a476014d36160b46204195018a7f1eaf&_uid=104852226084",
      icon: ShoppingBag,
      external: true,
    },
    {
      name: "Transactions",
      href: "/userdashboard/transactions",
      icon: CreditCard,
    },
    {
      name: "Manage Account",
      href: "/userdashboard/manageaccount",
      icon: Settings,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden w-full lg:w-[20vw]">
      <div className="p-4">
        <SidebarHead />
      </div>

      <Separator className="my-4" />

      <nav className="flex-1 px-2">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.external ? false : pathname === item.href;

            const NavLink = ({ children }) => {
              return item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ) : (
                <Link href={item.href}>{children}</Link>
              );
            };

            return (
              <NavLink key={item.name}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 font-normal hover:bg-slate-100",
                    isActive && "bg-slate-100 font-medium"
                  )}
                >
                  <item.icon className="h-5 w-5 text-slate-500" />
                  <span>{item.name}</span>
                  {item.external && (
                    <ChevronRight className="ml-auto h-4 w-4 text-slate-400" />
                  )}
                </Button>
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="p-2 mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
          ) : (
            <LogOut className="h-5 w-5" />
          )}
          <span>Logout</span>
        </Button>

        <div className="mt-4">
          <Upgrade />
        </div>
      </div>
    </div>
  );
};

export default DesktopSide;
