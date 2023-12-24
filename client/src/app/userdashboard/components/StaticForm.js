import React from "react";
import { UseUserContext } from "../../../../contexts/UserContext";
const StaticForm = ({  handleEdit }) => {
  const {UserData} = UseUserContext()
  console.log('user static', UserData);
  return (
    <div className="mx-auto">
      <div className="flex flex-row-reverse cursor-pointer ">
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
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <div className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer">
            <div className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
              First name
            </div>
            {/* <p>{UserData.fullname}</p> */}
          </div>
        </div>
        {/* <div className="relative z-0 w-full mb-5 group">
          <div className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer">
            <div className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
              Last name
            </div>
            <p>{UserData.lastName}</p>
          </div>
        </div> */}
      </div>
      {/* Email address */}
      <div className="relative z-0 w-full mb-5 group">
        <div className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer">
          <div className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
            Email address
          </div>
          <p>{UserData.email}</p>
        </div>
      </div>
      {/* Phone number */}
      <div className="relative z-0 w-full mb-5 group">
        <div className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer">
          <div className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
            Phone Number
          </div>
          {/* <p>{UserData.phonenumber}</p> */}
        </div>
      </div>
      {/* shipping Address */}
      <div className="relative z-0 w-full mb-5 group">
        <div className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer">
          <div className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
            Shipping Address
          </div>
          {/* <p>{userData.shippingaddress}</p> */}
        </div>
      </div>
    </div>
  );
};

export default StaticForm;
