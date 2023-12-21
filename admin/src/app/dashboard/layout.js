"use client";
import React from "react";
import { ComplexNavbar } from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
export default function layout({ children }) {
  return (
    <div>
      <main className="flex flex-row w-[100%]">
        <Sidebar />
        <div className="w-[100%] flex flex-col gap-3">
          <ComplexNavbar />
          {children}
        </div>
      </main>
    </div>
  );
}
