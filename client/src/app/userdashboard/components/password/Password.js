"use client"
import React from "react";
import { useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";


const Password = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
   
};

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

console.log(currentPassword, newPassword, confirmPassword)

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add your password change logic here
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 mx-auto">
      <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Change Password
        </h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
        >
          <div>
            <label
              htmlFor="current-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Current Password
            </label>
            <div className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg">
              <input
                type={passwordVisible ? "text" : "password"}
                name="current-password"
                id="current-password"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                className="h-full block w-full bg-transparent focus:outline-none "
                placeholder="••••••••"
                required
              />
              <div
                onClick={togglePasswordVisibility}
                className="cursor-pointer"
              >
                {passwordVisible ? (
                  <IoMdEyeOff size={24} />
                ) : (
                  <IoMdEye size={24} />
                )}
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="new-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <div className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg">
              <input
                type={passwordVisible ? "text" : "password"}
                name="new-password"
                id="new-password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="h-full block w-full bg-transparent focus:outline-none "
                placeholder="••••••••"
                required
              />
              <div
                onClick={togglePasswordVisibility}
                className="cursor-pointer"
              >
                {passwordVisible ? (
                  <IoMdEyeOff size={24} />
                ) : (
                  <IoMdEye size={24} />
                )}
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <div className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg">
              <input
                type={passwordVisible ? "text" : "password"}
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="h-full block w-full bg-transparent focus:outline-none "
                placeholder="••••••••"
                required
              />
              <div onClick={togglePasswordVisibility} className="cursor-pointer">
                {passwordVisible ? (
                  <IoMdEyeOff size={24} />
                ) : (
                  <IoMdEye size={24} />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Reset passwod
          </button>
        </form>
      </div>
    </div>
  );
};

export default Password;
