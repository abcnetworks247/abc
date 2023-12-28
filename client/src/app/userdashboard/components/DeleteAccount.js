"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { UseUserContext } from "../../../../contexts/UserContext";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";




const DeleteAccount = () => {
  const router = useRouter()
  const reload = useRouter()
   const { Authtoken } = UseUserContext();
  const [passwordVisible, setPasswordVisible] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [email, setEmail] = useState("")
  

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const handlePassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  console.log(currentPassword, email);

 
  const handleDeleteConfirmation = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete my account",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}client/auth/account`,
            {
              data: {
                email: email,
                password: currentPassword,
              },
              headers: {
                Authorization: `Bearer ${String(Authtoken)}`,
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          console.log("response is here ", response);

          // Clear the user cookie
         Cookies.remove("authToken");

          Swal.fire({
            title: "Account deleted",
            text: "You've deleted your account successfully",
            icon: "success",
          }).then(() => {
          
              router.push("/");
          });
        } catch (error) {
          console.error("There is a damn error:", error.message);
        }
      }
    });
  };

 

  return (
    <div className="flex flex-col items-center justify-center px-6 w-full">
      <div className="w-full p-6 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md  sm:p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
        >
          <div>
            <label
              htmlFor="current-email"
              className="block mb-2 text-sm font-medium d"
            >
              Email
            </label>
            <div className=" h-10 px-2 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmail}
                className="h-full w-full focus:outline-none bg-transparent"
                placeholder="xyz@user.com"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="new-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="flex items-center justify-between p-2.5 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg">
              <input
                type={passwordVisible ? "text" : "password"}
                name="currentPassword"
                id="currentPassword"
                value={currentPassword}
                onChange={handlePassword}
                className="h-full w-full bg-transparent focus:outline-none "
                placeholder="••••••••"
                required
              />
              <div onClick={togglePasswordVisibility} className="cursor-pointer">
                {passwordVisible ? (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#737373"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z"
                        stroke="#737373"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        stroke="#737373"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                    </g>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#737373"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418"
                        stroke="#737373"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                    </g>
                  </svg>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleDeleteConfirmation}
            className="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Close Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccount;
