
"use client";
import React from "react";
import { EditIcon } from "../components/icons/UserIcon";
import { UseProductProvider } from "../../../../contexts/ProductProvider";
import Editform from "../components/Editform";

const page = () => {
  const { screen }= UseProductProvider()
  return (
    
    <div
      className={` p-8 px-4 basis-2/3`}
    >
       <Editform/>
    </div>
  );
};

export default page;
