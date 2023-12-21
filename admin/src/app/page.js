"use client";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-row ">
      <Sidebar />
      <div className=" bg-red-500 ">
        <h1>dashboard here</h1>
        <Navbar />
      </div>
    </main>
  );
}
