"use client";
import { useState } from "react";
import Link from "next/link";
import Api from "@/utils/Api";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PASSWORD_REGEX } from "@/utils/regex";
import HocUpdatePassword from "@/utils/HocUpdatePassword";
import Logo from "@/resources/assets/image/AbcstudioNo.png";
import Image from "next/image";

function Page() {
  // router for navigating to login page after password update
  const router = useRouter();
  // using usesearcparams to get the search params
  const params = useSearchParams();

  // using paams.get to get the reset query on the search params
  const reset = params.get("reset");
  //  initial state for update password
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  /**
   *
   * @param {object} e - the event object
   * @param {string} e.name - the name of the input
   * @param {string} e.value - the value of the input
   */

  //Define state for universal error

  const [universalError, setUniversalError] = useState("");

  // Define initial validation state
  const [isValidData, setIsValidData] = useState(true);

  // Define initial form error state

  const [errorMessages, setErrorMessages] = useState({
    confirmPassword: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
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

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidData) {
      toast.error("please fill in all the fields correctly", {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("passwords do not match", {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
    const id = toast.loading("changingpassword..", {
      position: toast.POSITION.TOP_LEFT,
    });
    console.log({ reset, password, confirmPassword });
    try {
      const data = await Api.post("client/auth/account/updatepassword", {
        reset,
        password,
        confirmPassword,
      });
      console.log("data status", data.status);
      if (data.status !== 200) {
        toast.update(id, {
          render: `error on password update`,
          type: "error",
          isLoading: false,
        });
      }
      console.log("post successful", data.data.message);
      setTimeout(() => {
        toast.dismiss(id);
      }, 2000);
      toast.update(id, {
        render: `${data.data.message}`,
        type: "success",
        isLoading: false,
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      const suberrormsg = toast.update(id, {
        render: `${error.response.data.error}`,
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
        <div className="flex flex-col items-center justify-center w-full h-screen p-6 lg:w-1/2 xl:w-5/12 lg:flex-none sm:p-12">
          <div className="w-[100%] flex flex-col items-center">
            <div className="text-center">
              <Image
                src={Logo}
                height={50}
                width={50}
                draggable={false}
                className="object-contain h-[80px] w-full"
              />
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
                <div
                  className={`flex items-center justify-between py-3 px-5 h-10 bg-gray-100 border border-gray-200 rounded-lg  ${
                    errorMessages.password && password && "border-red-500"
                  }`}
                >
                  <input
                    className={`w-full  placeholder-gray-500 text-sm focus:outline-none bg-transparent`}
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      signUpValidate(
                        "password",
                        PASSWORD_REGEX,
                        e.target.value,
                        "Password must be 8 characters or more with at least one uppercase letter, one lowercase letter, one digit, and one special character (@#$%^&*!)"
                      );
                    }}
                    required
                    value={password}
                  />
                  <div onClick={togglePasswordVisibility}>
                    {passwordVisible ? (
                      <svg
                        className="w-5 h-5 cursor-pointer"
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
                        className="w-5 h-5 cursor-pointer"
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

                {errorMessages.password && password && (
                  <span className="text-red-500 text-[13px]">
                    {errorMessages.password}
                  </span>
                )}

                <div
                  className={`flex items-center justify-between py-3 px-5 h-10 bg-gray-100 border border-gray-200 rounded-lg  ${
                    errorMessages.confirmPassword &&
                    confirmPassword &&
                    "border-red-500"
                  }`}
                >
                  <input
                    className={`w-full h-full placeholder-gray-500 bg-transparent text-sm focus:outline-none `}
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    onChange={(e) => {
                      setConfirmpassword(e.target.value);
                      signUpValidate(
                        "password",
                        PASSWORD_REGEX,
                        e.target.value,
                        "Password must be 8 characters or more with at least one uppercase letter, one lowercase letter, one digit, and one special character (@#$%^&*!)"
                      );
                    }}
                    required
                    value={confirmPassword}
                  />
                  <div onClick={togglePasswordVisibility}>
                    {passwordVisible ? (
                      <svg
                        className="w-5 h-5 cursor-pointer"
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
                        className="w-5 h-5 cursor-pointer"
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

                {errorMessages.confirmPassword && confirmPassword && (
                  <span className="text-red-500 text-[13px]">
                    {errorMessages.confirmPassword}
                  </span>
                )}

                <button
                  className="flex items-center justify-center w-full py-3 mt-3 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-blue-700 rounded-lg hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
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
        <div className="flex-1 bg-gradient-to-t from-[#00045E] via-[#9D3615] to-[#00045E] w-fit h-screen text-center hidden md:flex">
          <div
            className="w-full h-screen bg-center bg-no-repeat bg-contain "
            style={{
              backgroundImage: `url("/Login.svg")`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

const updatePassword = HocUpdatePassword(Page);

export default updatePassword;
