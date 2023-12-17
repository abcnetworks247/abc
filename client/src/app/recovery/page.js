"use client";
import Link from "next/link";
import { UseUserContext } from "../../../contexts/UserContext";
import Api from "@/utils/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function Page() {
  // define initial recoveryformdata state

  const [email, setRecoveryFormData] = useState("");

  // account recovery context function

  /**
   *
   * @param {object} e - for preventing browser default
   */
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading("sending..", {
      position: toast.POSITION.TOP_LEFT,
    });
    console.log(email);
    try {
      const data = await Api.post("client/auth/recovery", {email});
      if (data.status === 201) {
        console.log("post successful", data.data.message);
        setTimeout(() => {
          toast.dismiss(id);
        }, 1000);
        toast.update(id, {
          render: `${data.data.message}`,
          type: "success",
          isLoading: false,
        });
      }
    } catch (error) {
      const suberrormsg = toast.update(id, {
        render: `${error}`,
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        toast.dismiss(suberrormsg);
      }, 2000);

      console.log(error);
    }
  };
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
        <div className="flex-1 hidden text-center bg-blue-900 md:flex">
          <div
            className="w-full m-12 bg-center bg-no-repeat bg-contain xl:m-16 "
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-screen p-6 lg:w-1/2 xl:w-5/12 lg:flex-none sm:p-12">
          <div className="w-[100%] flex flex-col items-center">
            <div className="text-center">
              <h1 className="mb-2 text-2xl font-extrabold text-blue-900 xl:text-4xl">
                recovery
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey take the next step in recovering your account.
              </p>
            </div>
            <div className="flex-1 w-full mt-8">
              <form
                className="flex flex-col max-w-xs gap-4 mx-auto"
                onSubmit={HandleSubmit}
              >
                <input
                  className="w-full px-5 py-3 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    setRecoveryFormData(e.target.value);
                  }}
                />

                <button
                  className="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-blue-900 rounded-lg hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                  onClick={HandleSubmit}
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Recovery</span>
                </button>
                <p className="mt-6 text-xs text-center text-gray-600">
                  remeber your password?{" "}
                  <Link href="/login">
                    <span className="font-semibold text-blue-900">login!</span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
