import React from "react";

const page = () => {
  return (
    <div className="p-4 md:p-10">
      <h4 className="font-semibold text-2xl">General Settings</h4>

      <div className="max-w-5xl mx-auto mt-8">
        <div className="">
          <h1 className="text-lg md:text-lg pl-2 py-2  my-6 border-l-2 bg-gray-200 w-full  font-sans font-bold border-blue-500  dark:text-gray-200">
            Pages section
          </h1>
          <div className="border-l border-gray-200 pl-8 flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="mb-4 md:mb-0">
                <p className="text-md font-semibold mb-2">
                  Terms and Condition
                </p>
                <p className="text-gray-600 text-sm">
                  You can now create or update this page
                </p>
              </div>

              <button className="bg-blue-500 rounded-full text-white py-2 shadow-md px-4 h-fit">
                Create Page
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="mb-4 md:mb-0">
                <p className="text-md font-semibold mb-2">Privacy Policy</p>
                <p className="text-gray-600 text-sm">
                  You can now create or update this page
                </p>
              </div>

              <button className="bg-blue-500 rounded-full text-white py-2 shadow-md px-4 h-fit">
                Create Page
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="mb-4 md:mb-0">
                <p className="text-md font-semibold mb-2">About Us</p>
                <p className="text-gray-600 text-sm">
                  You can now create or update this page
                </p>
              </div>

              <button className="bg-blue-500 rounded-full text-white py-2 shadow-md px-4 h-fit">
                Create Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
