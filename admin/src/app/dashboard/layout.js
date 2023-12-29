"use client";
import React from "react";
import HocsessionNotAuth from "@/utils/HocsessionNotAuth";
import { ComplexNavbar } from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
 function Layout({ children }) {
  return (
    <div>
      <main className="flex flex-row w-[100%]">
        <Sidebar />
        <div className="w-[100%] flex flex-col">
          <ComplexNavbar />
          {children}
        </div>
      </main>
    </div>
  );
}

// const layout = HocsessionNotAuth(Layout);

export default  Layout;
