"use client";
import { ComplexNavbar } from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
export default function Home() {
const pathname = usePathname();
const AuthToken = Cookies.get("adminToken");

      useEffect(()=>{
        if(pathname == "/"){
         AuthToken ?redirect("/dashboard") : redirect('/auth/signin');
        }
      },[])
  return (
    <>
      <main className="flex flex-row w-[100%]">
        
      </main>
    </>
  );
}
