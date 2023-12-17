"use client";
import { useState } from "react";
import Link from "next/link";
import Api from "@/utils/Api";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export default function Page() {
  // router for navigating to login page after password update
  const router = useRouter();
  // using usesearcparams to get the search params
  const params = useSearchParams();

  // using paams.get to get the reset query on the search params
  const reset = params.get("reset");
  //  initial state for update password
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");

  /**
   *
   * @param {object} e - the event object
   * @param {string} e.name - the name of the input
   * @param {string} e.value - the value of the input
   */

  // const HandleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setAllpassword({
  //     ...Allpassword,
  //     [name]: value,
  //   });
  // };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://klipto-inc-abcstudio-server.onrender.com/api/v1/client/auth/account/updatepassword",
        { reset, password, confirmPassword }
      );

      if (response.status !== 200) {
        console.log("error", response);
      } else {
        console.log(response);
      }
    } catch (error) {}
  };
  // const HandleSubmit = async (e) => {
  //   e.preventDefault();
  //   const id = toast.loading("changingpassword..", {
  //     position: toast.POSITION.TOP_LEFT,
  //   });
  //   console.log(Allpassword);
  //   try {
  //     const data = await Api.post(
  //       "client/auth/account/updatepassword",
  //       Allpassword
  //     );
  //     console.log('data status', data.status);
  //     if (data.status !== 200) {
  //       toast.update(id, {
  //         render: `error on password update`,
  //         type: "error",
  //         isLoading: false,
  //       });

  //     }
  //     console.log("post successful", data.data.message);
  //     setTimeout(() => {
  //       toast.dismiss(id);
  //     }, 2000);
  //     toast.update(id, {
  //       render: `${data.data.message}`,
  //       type: "success",
  //       isLoading: false,
  //     });

  //     setTimeout(() => {
  //       router.push("/login");
  //     }, 2000);
  //   } catch (error) {
  //     const suberrormsg = toast.update(id, {
  //       render: `${error}`,
  //       type: "error",
  //       isLoading: false,
  //     });
  //     setTimeout(() => {
  //       toast.dismiss(suberrormsg);
  //     }, 2000);

  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex justify-center flex-1 h-screen max-w-screen-xl sm:rounded-lg">
        <div className="flex flex-col items-center justify-center w-full h-screen p-6 lg:w-1/2 xl:w-5/12 lg:flex-none sm:p-12">
          <div className="w-[100%] flex flex-col items-center">
            <div className="text-center">
              <h1 className="mb-2 text-2xl font-extrabold text-blue-900 xl:text-4xl">
                Update Password
              </h1>
              <p className="text-[12px] text-gray-500">
                Enter your New Password
              </p>
            </div>
            <div className="flex-1 w-full mt-8">
              <form
                className="flex flex-col max-w-xs gap-4 mx-auto"
                onSubmit={HandleSubmit}
              >
                <input
                  className="w-full px-5 py-3 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  className="w-full px-5 py-3 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmpassword(e.target.value)}
                />

                <button
                  className="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-blue-900 rounded-lg hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                  onClick={HandleSubmit}
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Update Password</span>
                </button>
                <p className="mt-6 text-xs text-center text-gray-600">
                  remeber your password?{" "}
                  <Link href="/login">
                    <span className="font-semibold text-blue-900">login</span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 hidden text-center bg-blue-900 md:flex">
          <div
            className="w-full m-12 bg-center bg-no-repeat bg-contain xl:m-16 "
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
