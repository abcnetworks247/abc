"use client";
import React from "react";
import { EditIcon } from "./components/icons/UserIcon";
import Hocsession from "@/utils/HocsessionAuthenticated";
import { UseProductProvider } from "../../../contexts/ProductProvider";
import Stats from "./components/Stats";
const page = () => {
  const { screen, handleUser } = UseProductProvider();
  console.log(screen);
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Stats/>
    </div>
  );
};

export default page;
