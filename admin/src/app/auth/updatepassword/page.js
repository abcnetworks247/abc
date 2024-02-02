"use client";
import { Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Link from "next/link";
import Api from "@/utils/Api";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { PASSWORD_REGEX } from "@/utils/regex";
import "react-toastify/dist/ReactToastify.css";
import HocUpadate from "@/utils/HocUpadate";
import Image from "next/image";
import Logo from "@/resources/assets/images/AbcstudioNo.png";

function Page() {
  const router = useRouter();
  // using usesearcparams to get the search params
  const params = useSearchParams();

  const reset = params.get("reset");
  console.log(params.get("reset"));
  // initial state for form data
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "", // Corrected the spelling here
    reset,
  });

  // Define state for universal error
  const [universalError, setUniversalError] = useState("");

  // Define initial validation state
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isValidData, setIsValidData] = useState(true);

  // Define initial form error state
  const [errorMessages, setErrorMessages] = useState({
    confirmPassword: "",
    password: "",
  });

  /**
   * Validates the form input based on regex and displays error messages if needed.
   * @param {string} fieldName - The name of the field to validate.
   * @param {RegExp} regex - Regular expression for validation.
   * @param {string} value - The value to validate.
   * @param {string} errorMessage - The error message to display.
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

  const allFieldsValid = Object.keys(errorMessages).every(
    (field) => !errorMessages[field]
  );

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const HandleSubmit = async (e) => {

    console.log(
      "this is formdata",
      formData.password, formData.confirmPassword
    );
    
    e.preventDefault();
    if (!isValidData) {
      toast.error("Please fill in all the fields correctly", {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }

    const id = toast.loading("Changing password...", {
      position: toast.POSITION.TOP_LEFT,
    });

    console.log(formData);

    try {
      const data = await Api.post(
        "admin/auth/account/updatepassword",
        formData
      );

      console.log("data status", data.status);

      if (data.status !== 200) {
        toast.update(id, {
          render: "Error on password update",
          type: "error",
          isLoading: false,
        });
      }

      console.log("Post successful", data.data.message);

      setTimeout(() => {
        toast.dismiss(id);
      }, 2000);

      toast.update(id, {
        render: `${data.data.message}`,
        type: "success",
        isLoading: false,
      });

      setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);
    } catch (error) {
      const subErrorMessage = toast.update(id, {
        render: `${error.response.data.error}`,
        type: "error",
        isLoading: false,
      });

      setTimeout(() => {
        toast.dismiss(subErrorMessage);
      }, 2000);

      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  
  return (
    <>
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
      <section className="m-8 flex gap-4">
        {/* <div className="w-full lg:w-3/5 mt-10">
          <div className="text-center">
            <Image
              src={Logo}
              height={50}
              width={50}
              draggable={false}
              className="object-contain h-[40px] w-full"
            />
            <Typography variant="h2" className="font-bold mb-4">
              Recover your Account
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="text-lg font-normal"
            >
              {" "}
              Hey take the next step in recovering your account.
            </Typography>
          </div>
          <form
            className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
            onSubmit={HandleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                new Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                name="password"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
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
              />

              {errorMessages.password && formData.password && (
                <span className="text-red-500 text-[13px]">
                  {errorMessages.password}
                </span>
              )}

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                confirm Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                name="confrimpassword"
                required
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => {
                  HandleInputChange(e);
                  signUpValidate(
                    "confirmPassword",
                    PASSWORD_REGEX,
                    e.target.value,
                    "Password must be 8 characters or more with at least one uppercase letter, one lowercase letter, one digit, and one special character (@#$%^&*!)"
                  );
                }}
              />
              {errorMessages.confirmPassword && formData.confrimpassword && (
                <span className="text-red-500 text-[13px]">
                  {errorMessages.confirmPassword}
                </span>
              )}
            </div>

            <Button className="mt-6" fullWidth onClick={HandleSubmit}>
              Sign In
            </Button>

            <Typography
              variant="paragraph"
              className="text-center text-blue-gray-500 font-medium mt-4"
            >
              remember your password?
              <Link href="/auth/signin" className="text-gray-900 ml-1">
                Login
              </Link>
            </Typography>
          </form>
        </div> */}
        <div className="w-full mt-5 lg:w-3/5">
          <div className="text-center">
            <Image
              src={Logo}
              height={50}
              width={50}
              draggable={false}
              className="object-contain h-[40px] w-full"
            />
            <Typography variant="h3" className="mt-4 mb-2 font-bold">
              Update Password
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="text-lg font-normal"
            >
              Congratulation, you are one step away. 😇
            </Typography>
          </div>
          <div className="max-w-screen-lg mx-auto mt-8 mb-2 w-80 lg:w-1/2">
            <div className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
              <form className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="-mb-3 font-medium"
                  >
                    New Password
                  </Typography>

                  <div className="relative h-11 w-full min-w-[200px] flex items-center justify-between py-2 pl-1 pr-5 h-10 bg-white border border-gray-200 rounded-lg">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="********"
                      name="password"
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
                      className={`w-full h-full font-medium bg-transparent placeholder-gray-500 border-none text-sm outline-none border-0 border-transparent focus:outline-none focus:ring-0`}
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
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l  before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r  after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                  </div>
                  {errorMessages.password && formData.password && (
                    <span className="text-red-500 text-[13px]">
                      {errorMessages.password}
                    </span>
                  )}

                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="-mb-3 font-medium"
                  >
                    Confirm Password
                  </Typography>
                  <div className="relative h-11 w-full min-w-[200px] flex items-center justify-between py-2 pl-1 pr-5 h-10 bg-white border border-gray-200 rounded-lg">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="********"
                      name="confirmPassword"
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
                      className={`w-full h-full font-medium bg-transparent placeholder-gray-500 border-none text-sm outline-none border-0 border-transparent focus:outline-none focus:ring-0`}
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
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l  before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r  after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                  </div>
                  {errorMessages.confirmPassword &&
                    formData.confirmPassword && (
                      <span className="text-red-500 text-[13px]">
                        {errorMessages.confirmPassword}
                      </span>
                    )}
                </div>
                <button
                  className="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="submit"
                  onClick={HandleSubmit}
                >
                  Continue
                </button>
              </form>

              <Typography
                variant="small"
                className="font-medium text-sm text-gray-900 flex flex-row gap-1 mt-3"
              >
                <span>By making this changes, you agree with our</span>
                <Link href="/auth/recover" className="underline">
                  Terms
                </Link>
                <span> & </span>
                <Link href="/auth/recover" className="underline">
                  Policy
                </Link>
              </Typography>
            </div>
          </div>
        </div>
        <div className="w-2/5 h-full hidden lg:block">
          <Image
            height={200}
            width={200}
            src="https://img.freepik.com/free-vector/realistic-news-studio-background_23-2149985600.jpg?w=900&t=st=1704041393~exp=1704041993~hmac=ef8c67168940ab32d52441d724c3e9071e9c512d39bb0c93b385396487e5aab3"
            className="object-cover w-full h-[90svh] rounded-3xl"
          />
        </div>
      </section>
    </>
  );
}

const updatepassword = HocUpadate(Page);

export default updatepassword;
