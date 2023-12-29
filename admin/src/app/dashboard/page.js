"use client"
import BarChart from "@/components/ApexChart/barChart";
import FlowChart from "@/components/ApexChart/flowChart";
// Fix the casing here
import { MembersTable } from "@/components/Dashboard/MembersTable";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Page() {

  
  return (
    <>
      <main className="flex flex-col gap-5 px-5 mt-10">
        <div className="">
          <div className="grid grid-cols-12 gap-3 ">
            <div className="col-span-12 sm:col-span-4">
              <div className="p-4 relative h-32   bg-[#121E31] border border-gray-800 shadow-lg  rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute text-green-400 h-14 w-14 bottom-4 right-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <div className="mt-5 text-2xl font-medium leading-8 text-gray-100">
                  20
                </div>
                <div className="text-sm text-gray-500">Components</div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-4">
              <div className="p-4 relative h-32  bg-[#121E31] border border-gray-800 shadow-lg  rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute text-blue-500 h-14 w-14 bottom-4 right-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <div className="flex items-center justify-between ">
                  <i className="text-xl text-gray-400 fab fa-behance"></i>
                </div>
                <div className="mt-5 text-2xl font-medium leading-8 text-gray-100">
                  99
                </div>
                <div className="text-sm text-gray-500">Projects</div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-4">
              <div className="p-4 relative h-32  bg-[#121E31] border border-gray-800 shadow-lg  rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute text-yellow-300 h-14 w-14 bottom-4 right-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex items-center justify-between ">
                  <i className="text-xl text-gray-400 fab fa-codepen"></i>
                </div>
                <div className="mt-5 text-2xl font-medium leading-8 text-gray-100">
                  50
                </div>
                <div className="text-sm text-gray-500">Pen Items</div>
              </div>
            </div>
          </div>
        </div>
       { typeof window !== "undefined" ? 
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2">
        <div className="">
         <BarChart />
        </div>
        <div className="">
          <FlowChart />
        </div>
      </div>
      : 
      []
        
       }
        <div className="">
          <MembersTable />
        </div>
      </main>
    </>
  );
}
