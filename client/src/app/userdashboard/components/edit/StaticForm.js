import React from "react";
import { UseUserContext } from "../../../../../contexts/UserContext";
const StaticForm = ({ handleEdit }) => {
  const { UserData } = UseUserContext();
  console.log("user static", UserData);
  return (
    <div className="mx-auto h-screen">
      <div className="flex flex-row-reverse cursor-pointer mb-4">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={() => handleEdit()}
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#737373"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
                fill="#737373"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      {/* First and last name */}

   <div className="grid md:grid-cols-2 ">
        {/* <div className="relative z-0 w-full mb-5 group">
          <div className="block py-2.5 px-0 w-full text-sm text-black  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer">
            <div className="peer-focus:font-medium absolute text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
              First name
            </div>
            <p>{UserData && UserData.fullname}</p>
          </div>
        </div> */}
      </div>
      <div className="relative mb-12 w-full ">
        <input
          type="email"
          readOnly
          className=" bg-white border w-full border-blue-500 rounded-md py-2 px-4 focus:outline-none focus:shadow-outline"
          placeholder=" "
          value={UserData.fullname}
        />
        <label
          htmlFor="email"
          className="absolute left-4 px-1 bg-white text-gray-700 text-sm"
          style={{ top: "-0.8rem" }}
        >
          fullname
        </label>
      </div>

      <div className="relative mb-12 w-full">
        <input
          type="email"
          readOnly
          className=" bg-white border w-full border-blue-500 rounded-md py-2 px-4 focus:outline-none focus:shadow-outline"
          placeholder=" "
          value={UserData.email}
        />
        <label
          htmlFor="email"
          className="absolute left-4 px-1 bg-white text-gray-700 text-sm"
          style={{ top: "-0.8rem" }}
        >
          Email address
        </label>
      </div>

      <div className="relative mb-12 w-full">
        <input
          type="email"
          readOnly
          className="bg-white focus:bg-white border w-full  border-blue-500 rounded-md py-2 px-4 focus:outline-none focus:shadow-outline"
          placeholder=" "
          value={UserData.phone}
        />
        <label
          htmlFor="email"
          className="absolute left-4 px-1 bg-white text-gray-700 text-sm"
          style={{ top: "-0.8rem" }}
        >
          Phone Number
        </label>
      </div>

      {/* Phone number */}

      <div className="relative mb-12 w-full">
        <input
          type="email"
          readOnly
          className="bg-white focus:bg-white border w-full border-blue-500 rounded-md py-2 px-4 focus:outline-none focus:shadow-outline"
          placeholder=" "
          value={UserData.shippingaddress}
        />
        <label
          htmlFor="email"
          className="absolute left-4 px-1 bg-white text-gray-700 text-sm"
          style={{ top: "-0.8rem" }}
        >
          Shipping Address
        </label>
      </div>
    </div>
  );
};

export default StaticForm;
