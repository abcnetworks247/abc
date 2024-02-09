"use client";
import Api from "@/utils/Api";
import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/utils/regex";
import Logo from "@/resources/assets/image/AbcstudioNo.png";
import Image from "next/image";
import HocsessionAuthenticated from "@/utils/HocsessionAuthenticated";

function Page() {
  // router for the navigation to another page after account created successfully

  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  // Define the initial loginform data
  const [logInFormData, setlogInFormData] = useState({
    email: "",
    password: "",
  });

  const [universalError, setUniversalError] = useState("");

  // Define initial validation state
  const [isValidData, setIsValidData] = useState(true);

  const [errorMessages, setErrorMessages] = useState({
    email: "",
    fullname: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

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

    console.log(logInFormData);
    setIsValidData(allFieldsValid);

    if (!allFieldsValid) {
      toast.error("please fill in all the fields correctly", {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
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
      console.log("errorr", value.error);
      // check the staus of the request to see if the request was successful or not
      if (data.status === 200) {
        console.log(value?.message, "success message");
        // setting the token i got from thr server to cookies with the help of cookie js
        Cookies.set("authToken", value.authToken);
        setTimeout(() => {
          toast.dismiss(id);
        }, 1000);
        toast.update(id, {
          render: `${data.data.message}`,
          type: "success",
          isLoading: false,
        });
        if (typeof window !== "undefined") {
          router.push("/");
          window.location.reload();
        }

        setdata(value);
      }
    } catch (error) {
      const suberrormsg = toast.update(id, {
        render: `${error.response.data.error}`,
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
                Login
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="flex-1 w-full mt-8">
              <form
                className="flex flex-col max-w-xs gap-3.5 mx-auto"
                onSubmit={HandleSubmit}
              >
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 ${
                    errorMessages.email &&
                    logInFormData.email &&
                    "border-red-500"
                  } placeholder-gray-500 text-sm focus:outline-none  focus:bg-white`}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    HandleInputChange(e);
                    signUpValidate(
                      "email",
                      EMAIL_REGEX,
                      e.target.value,
                      "Please enter a valid email address."
                    );
                  }}
                  required
                  value={logInFormData.email}
                />
                {errorMessages.email && logInFormData.email && (
                  <span className="text-red-500 text-[13px]">
                    {errorMessages.email}
                  </span>
                )}
                <div
                  className={`flex items-center justify-between py-2 px-5 h-10 bg-gray-100 border border-gray-200 rounded-lg  ${
                    errorMessages.password &&
                    logInFormData.password &&
                    "border-red-500"
                  }`}
                >
                  <input
                    className={`w-full h-full font-medium bg-transparent placeholder-gray-500 text-sm focus:outline-none  `}
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    onChange={(e) => {
                      HandleInputChange(e);
                      signUpValidate(
                        "password",
                        PASSWORD_REGEX,
                        e.target.value,
                        "Password must be 8 characters or more with at least one uppercase letter, one lowercase letter, one digit, and one special character (@#$%^&*!)"
                      );
                    }}
                    required
                    value={logInFormData.password}
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

                {errorMessages.password && logInFormData.password && (
                  <span className="text-red-500 text-[13px]">
                    {errorMessages.password}
                  </span>
                )}

                <button className="flex items-center justify-center w-full py-3 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-blue-700 rounded-lg hover:bg-indigo-700 focus:shadow-outline focus:outline-none">
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
                <div className="flex items-center justify-between gap-3">
                  <p className="mt-2 text-sm text-center text-gray-600">
                    New?{" "}
                    <Link href="/signup">
                      <span className="font-semibold text-blue-900">
                        Register
                      </span>
                    </Link>
                  </p>
                  <p className="mt-2 text-xs text-center text-gray-600">
                    <Link href="/recovery">
                      <span className="font-semibold text-blue-900">
                        Forgot Password?
                      </span>
                    </Link>
                  </p>
                </div>
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

const Login = HocsessionAuthenticated(Page);

export default Login;
