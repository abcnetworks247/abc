import React from "react";

const Usercard = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-6 sm:py-12">
      <div className="flex space-x-6" id="widget">
        <div className="flex h-64 w-64 flex-col items-center justify-center rounded-lg bg-white">
          <div className="flex flex-col space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-5 rounded-full bg-yellow-200 p-1 text-yellow-500"
              width="42"
              height="42"
              viewBox="0 0 24 24"
              strokeWidth="1.3"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <line x1="12" y1="12" x2="12" y2="12.01"></line>
              <path d="M14.828 9.172a4 4 0 0 1 0 5.656"></path>
              <path d="M17.657 6.343a8 8 0 0 1 0 11.314"></path>
              <path d="M9.168 14.828a4 4 0 0 1 0 -5.656"></path>
              <path d="M6.337 17.657a8 8 0 0 1 0 -11.314"></path>
            </svg>
            <div className="text-center text-4xl font-bold">54.3k</div>
            <div className="my-2 text-center text-gray-500">Users reached</div>
            <div className="flex items-center text-green-500">
              <div className="mx-auto flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <line x1="17" y1="7" x2="7" y2="17"></line>
                  <polyline points="8 7 17 7 17 16"></polyline>
                </svg>
                <span>10.5%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-64 w-64 flex-col items-center justify-center rounded-lg bg-white">
          <div className="flex flex-col space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-5"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke=""
              fill="none"
              stroke-linecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill=""></path>
              <path
                d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
                fill="#ef3637"
              ></path>
            </svg>
            <div className="text-center text-4xl font-bold">1.92k</div>
            <div className="my-2 text-center text-gray-500">Likes received</div>
            <div className="flex items-center text-red-500">
              <div className="mx-auto flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <line x1="7" y1="7" x2="17" y2="17"></line>
                  <polyline points="17 8 17 17 8 17"></polyline>
                </svg>
                <span>4.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
