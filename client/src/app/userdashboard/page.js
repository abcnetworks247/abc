"use client"
import React from "react";
import {EditIcon} from  "./components/icons/UserIcon"


const page = () => {
  return (
    <div className="hidden sm:block sm:basis-3/4 sm:bg-white sm:min-h-max shadow-md sm:rounded-sm">
      <p className="accountInformation px-4 py-2 text-bold ">
        Account Overview
      </p>

      <div className="px-4 mt-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="accountbox">
            <h3 className="accountInformation font-bold">ACCOUNT DETAILS</h3>
            <p>Awajimijan Igoni</p>
            <p>mijanigoni@gmail.com</p>
          </div>

          <div className="accountbox ">
            <h3 className="accountInformation font-bold">STORE CREDIT</h3>
            <p>Awajimijan Igoni</p>
            <p>mijanigoni@gmail.com</p>
          </div>

          <div className="accountbox">
            <div className="accountInformation flex justify-between items-center">
              <h3 className="font-bold">ADDRESS BOOK</h3>
              <div className="cursor-pointer">
                <EditIcon />
              </div>
            </div>

            <p>Awajimijan Igoni</p>
            <p>3 market Lane Rumuomasi</p>
            <p>+2347082642998</p>
          </div>

          <div className="accountbox">
            <h3 className="accountInformation font-bold">anything</h3>
            <p>Awajimijan Igoni</p>
            <p>mijanigoni@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
