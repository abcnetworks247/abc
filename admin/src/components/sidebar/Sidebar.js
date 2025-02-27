"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UseAdminContext } from "@/context/AdminContext";
import useCurrentAdmin from "@/hooks/useCurrentAdmin";
import {
  ChevronDown,
  ChevronRight,
  Settings,
  Users,
  Newspaper,
  CreditCard,
  LayoutDashboard,
  FolderOpen,
  UserCircle,
  Menu,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/resources/assets/images/AbcstudioNo.png";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const { CurrentUser, isLoading } = useCurrentAdmin();
  const { state, dispatch } = UseAdminContext();
  const router = useRouter();

  const UserValue = CurrentUser?.data?.olduser;

  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "File Manager",
      href: "/dashboard/filemanager",
      icon: FolderOpen,
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Admin",
      href: "/dashboard/admin",
      icon: ShieldCheck,
    },
  ];

  const newsSubItems = [
    {
      title: "All News",
      href: "/dashboard/news/all-news",
    },
    {
      title: "Create News",
      href: "/dashboard/news/create-news",
    },
    {
      title: "News Category",
      href: "/dashboard/news/category",
    },
    {
      title: "News Type",
      href: "/dashboard/news/type",
    },
  ];

  const bottomNavItems = [
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Transactions",
      href: "/dashboard/transactions",
      icon: CreditCard,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: UserCircle,
    },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col gap-4 text-gray-100">
      <div className="flex h-14 items-center border-b border-gray-700 px-3.5">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold text-gray-100"
        >
          <Image
            src={Logo}
            alt="Logo"
            width={32}
            height={32}
            className="rounded"
          />
          <span className="text-lg">Admin</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4">
          <div className="py-2">
            <nav className="grid gap-1">
              {mainNavItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => dispatch({ type: "TOGGLE" })}
                >
                  <span
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700/50 hover:text-gray-100",
                      router.pathname === item.href && "bg-gray-700/50"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="py-2">
            <Collapsible
              open={newsOpen}
              onOpenChange={setNewsOpen}
              className="space-y-2"
            >
              <CollapsibleTrigger className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700/50 hover:text-gray-100">
                <Newspaper className="mr-2 h-4 w-4" />
                <span className="flex-1 text-left">News</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    newsOpen && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1">
                {newsSubItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => dispatch({ type: "TOGGLE" })}
                  >
                    <span className="flex items-center gap-3 rounded-md px-3 py-2 pl-9 text-sm font-medium hover:bg-gray-700/50 hover:text-gray-100">
                      <ChevronRight className="h-3 w-3" />
                      {item.title}
                    </span>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="py-2">
            <nav className="grid gap-1">
              {bottomNavItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => dispatch({ type: "TOGGLE" })}
                >
                  <span
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700/50 hover:text-gray-100",
                      router.pathname === item.href && "bg-accent"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </ScrollArea>

      <div className="border-t border-gray-700 p-3">
        {isLoading ? (
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-24 bg-gray-700" />
              <Skeleton className="h-3 w-16 bg-gray-700" />
            </div>
          </div>
        ) : (
          <Link
            href="/dashboard/profile"
            onClick={() => dispatch({ type: "TOGGLE" })}
          >
            <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-700/50">
              <Avatar>
                <AvatarImage src={UserValue?.userdp} />
                <AvatarFallback>
                  {UserValue?.fullname?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="flex items-center gap-2 text-sm font-medium">
                  {UserValue?.fullname}
                  <Badge
                    variant="success"
                    className="h-2 w-2 rounded-full p-0"
                  />
                </span>
                <span className="text-xs text-muted-foreground">
                  {UserValue?.role} account
                </span>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden text-gray-100 hover:bg-gray-700/50"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-[280px] p-0 bg-[#121e31]">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden border-r bg-[#121e31] lg:block lg:w-[280px]">
        <SidebarContent />
      </aside>
    </>
  );
}
