"use client";
import React from "react";
import { EditIcon } from "../components/icons/UserIcon";
import { UseProductProvider } from "../../../../contexts/ProductProvider";

import Editform from "../components/edit/Editform";

export default function Page() {
  const { screen, handleUser } = UseProductProvider();
  return (
    <div
      className={` ${
        screen ? "hidden" : ""
      }  h-full w-full md:hidden absolute sm:static sm:block top-0 z-30 p-8 px-4 bg-white min-w-[400px] `}
    >
      <Editform />
    </div>
  );
}
