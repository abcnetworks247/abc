"use client";
import Api from "@/utils/Api";
import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Page() {
  // router for the navigation to another page after account created successfully

  const router = useRouter();

  // Define the initial loginform data
  const [logInFormData, setlogInFormData] = useState({
    email: "",
    password: "",
  });

  /**
   * Handle change in form input
   * @param {object} e - the event object
   * @param {string} e.target.name - the name of the input field
   * @param {string} e.target.value - the value entered in the input field
   */
  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setlogInFormData({
      ...logInFormData,
      [name]: value,
    });
  };

  /**
   * @param {object} e- the event object
   * @param {Function} e.preventDefault - prevent default forms submission behaviour
   */

  const [data, setdata] = useState([]);
  console.log("data", data);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading("loging in..", {
      position: toast.POSITION.TOP_LEFT,
    });
    try {
      // perform an asyncronous request to sigin in the user
      console.log(logInFormData, "response data");
      const data = await Api.post("client/auth/signin", logInFormData, {
        withCredentials: true,
      });
      const value = data.data;
      // log the response data

      // check the staus of the request to see if the request was successful or not
      if (data.status === 200) {
        console.log(data.data, "success message");
        // setting the token i got from thr server to cookies with the help of cookie js 
        Cookies.set("authToken", value.authToken);
        setTimeout(() => {
          toast.dismiss(id);
        }, 1000);
        toast.update(id, {
          render: `${value.message}`,
          type: "success",
          isLoading: false,
        });

        setTimeout(() => {
          
          router.push("/");
        }, 3000);

        setdata(value);
      } else if (data.status === 500) {
        const suberrormsg = toast.update(id, {
          render: `user does not exist `,
          type: "error",
          isLoading: false,
        });
        setTimeout(() => {
          toast.dismiss(suberrormsg);
        }, 1000);
      } else {
        const suberrormsg = toast.update(id, {
          render: `error while creating account `,
          type: "error",
          isLoading: false,
        });
        setTimeout(() => {
          toast.dismiss(suberrormsg);
        }, 1000);
      }
    } catch (error) {
      const errormsg = toast.error(`${error} `, {
        position: toast.POSITION.TOP_LEFT,
      });

      setTimeout(() => {
        toast.dismiss(errormsg);
      }, 5000);

      console.error(error);
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
      <div className="max-w-screen-xl h-screen sm:rounded-lg flex justify-center flex-1">
        <div className="w-full  lg:w-1/2 xl:w-5/12 p-6  lg:flex-none flex items-center flex-col justify-center h-screen sm:p-12">
          <div className="w-[100%] flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900 mb-2">
                Login
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form
                className="mx-auto max-w-xs flex flex-col gap-4"
                onSubmit={HandleSubmit}
              >
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={HandleInputChange}
                />

                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={HandleInputChange}
                />

                <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
                  <span className="ml-3">Login</span>
                </button>
                <div className="flex items-center gap-3 justify-between">
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    new?{" "}
                    <Link href="/signup">
                      <span className="text-blue-900 font-semibold">
                        Register
                      </span>
                    </Link>
                  </p>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    <Link href="/recovery">
                      <span className="text-blue-900 font-semibold">
                        Forgot Password?
                      </span>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat "
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
