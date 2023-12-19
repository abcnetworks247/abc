"use client";
import { useState } from "react";
import Link from "next/link";
import Api from "@/utils/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
  DOB_REGEX,
} from "@/utils/regex";

export default function Page() {
  const router = useRouter();
  // Define initial form data state
  const [signUpFormData, setSignUpFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  //Define state for universal error

  const [universalError, setUniversalError] = useState("");

  // Define initial validation state
  const [isValidData, setIsValidData] = useState(true);

  // Define initial form error state

  const [errorMessages, setErrorMessages] = useState({
    email: "",
    fullname: "",
    password: "",
  });

  /**
   * Handle change in form input fields
   * @param {Object} e - The event object
   * @param {string} e.target.name - The name of the input field
   * @param {string} e.target.value - The value entered in the input field
   */
  const HandleChange = (e) => {
    const { name, value } = e.target;
    // Update form data state based on the input field name and value
    setSignUpFormData({
      ...signUpFormData,
      [name]: value,
    });
  };

  /**
   *
   * @param {Object} fieldName  - for checkking if the field name meet up the chaeteria required
   * @param {Object} regex - for checkking if the regex meet up the chaeteria required
   * @param {Object} value - the value for regex test
   * @param {Error} errorMessage -to indeciate the error
   */

  function signUpValidate(fieldName, regex, value, errorMessage) {
    if (!regex.test(value)) {
      setUniversalError("");
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldName]: errorMessage,
      }));
      setIsValidData(false);
    } else {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
      setIsValidData(true);

      setUniversalError("");
    }
  }

  // Define Variable for allfield valid

  const allFieldsValid = Object.keys(errorMessages).every(
    (field) => !errorMessages[field]
  );

  /**
   * Handle form submission
   * @param {Object} e - The event object
   * @param {Function} e.preventDefault - Prevents the default form submission behavior
   */
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setIsValidData(allFieldsValid);
    const id = toast.loading("creating..", {
      position: toast.POSITION.TOP_LEFT,
    });
    try {
      // Log the current form data to the console
      console.log("formdata", signUpFormData);

      // Perform an asynchronous API post request to sign up the user
      console.log("Before API post request");
      const data = await Api.post("client/auth/signup", signUpFormData);

      // Log the response data to the console
      console.log("all data", data);

      // Check the status of the response and log success or failure messages
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
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else if (data.status === 500) {
        const suberrormsg = toast.update(id, {
          render: `user email or name already exist `,
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
      // Log any errors that occur during the API request

      const suberrormsg = toast.update(id, {
        render: `${error}`,
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        toast.dismiss(suberrormsg);
      }, 2000);

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
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat "
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="w-full  lg:w-1/2 xl:w-5/12 p-6  lg:flex-none flex items-center flex-col justify-center h-screen sm:p-12">
          <div className="w-[100%] flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900 mb-2">
                Register
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8 text-center">
              <form
                className="mx-auto max-w-xs flex flex-col gap-4"
                onSubmit={HandleSubmit}
              >
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 ${errorMessages.fullname && signUpFormData.fullname &&  "border-red-500"} placeholder-gray-500 text-sm focus:outline-none  focus:bg-white`}
                  type="text"
                  placeholder="Enter your fullname"
                  name="fullname"
                  onChange={(e) => {
                    HandleChange(e);
                    signUpValidate(
                      "fullname",
                      USERNAME_REGEX,
                      e.target.value,
                      "username start with letter, may include numbers or underscore(_)"
                    );
                  }}
                  value={signUpFormData.fullname}
                  required
                />
                {errorMessages.fullname && signUpFormData.fullname && (
                  <span className="text-red-500 text-[13px]">{errorMessages.fullname}</span>
                )}
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 ${errorMessages.email && signUpFormData.email &&  "border-red-500"} placeholder-gray-500 text-sm focus:outline-none  focus:bg-white`}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    HandleChange(e);
                    signUpValidate(
                      "email",
                      EMAIL_REGEX,
                      e.target.value,
                      "Please enter a valid email address."
                    );
                  }}
                  required
                  value={signUpFormData.email}
                />
                {errorMessages.email && signUpFormData.email && (
                  <span className="text-red-500 text-[13px]">{errorMessages.email}</span>
                )}
                <input
                   className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 ${errorMessages.password && signUpFormData.password &&  "border-red-500"} placeholder-gray-500 text-sm focus:outline-none  focus:bg-white`}
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={(e) => {
                    HandleChange(e);
                    signUpValidate(
                      "password",
                      PASSWORD_REGEX,
                      e.target.value,
                      "Password must be 8 characters or more with at least one uppercase letter, one lowercase letter, one digit, and one special character (@#$%^&*!)"
                    );
                  }}
                  required
                  value={signUpFormData.password}
                />
                {errorMessages.password && signUpFormData.password && (
                  <span className="text-red-500 text-[13px]">{errorMessages.password}</span>
                )}
                {/* <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Confirm Password"
                /> */}
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
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link href="/login">
                    <span className="text-blue-900 font-semibold">Login</span>
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
