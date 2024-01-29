"use client";
import { Input, Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useState } from "react";
import Api from "@/utils/Api";
import { toast, ToastContainer } from "react-toastify";
import { EMAIL_REGEX } from "@/utils/regex";
import "react-toastify/dist/ReactToastify.css";
import HocsessionAuthenticated from "@/utils/HocSessionAuthenticated";
import Image from "next/image";
import Logo from "@/resources/assets/images/AbcstudioNo.png";
function Page() {
  // initial state for form data
  const [formData, setFormData] = useState({
    email: "",
  });

  const [universalError, setUniversalError] = useState("");

  // Define initial validation state
  const [isValidData, setIsValidData] = useState(true);

  // Define initial form error state

  const [errorMessages, setErrorMessages] = useState({
    email: "",
  });

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
  /**
   *
   * @param {object}e e event object
   * @param {string} e.target - to target the event
   * @param {string} e.value - value of the event i.e input
   */

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   *
   * @param {object} e - event object
   * @param {function} e.preventdefault - for prevent the browser default
   */

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidData) {
      toast.error("please fill in all the fields correctly", {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
    const id = toast.loading("sending..", {
      position: toast.POSITION.TOP_LEFT,
    });
    console.log(formData);
    try {
      const data = await Api.post("admin/auth/recovery", formData);
      if (data.status === 200) {
        console.log("post successful", data.data.message);
        setTimeout(() => {
          toast.dismiss(id);
        }, 2000);
        toast.update(id, {
          render: `${data.data.message}`,
          type: "success",
          isLoading: false,
        });
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

      console.log(error);
    }
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
        <div className="w-full mt-16 lg:w-3/5">
          <div className="text-center">
            <Image
              src={Logo}
              height={50}
              width={50}
              draggable={false}
              className="object-contain h-[40px] w-full"
            />
            <Typography variant="h3" className="mt-4 mb-2 font-bold">
              Account Recovery
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="text-lg font-normal"
            >
              Forgotten your password? dont{`'`}t worry.
            </Typography>
          </div>
          <div className="max-w-screen-lg mx-auto mt-8 mb-2 w-80 lg:w-1/2">
            <div className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
              <form
                className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
                onSubmit={HandleSubmit}
              >
                <div className="flex flex-col gap-6 mb-1">
                  <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Your Email
                  </h6>
                  <div className="relative h-11 w-full min-w-[200px]">
                    <input
                      placeholder="name@mail.com"
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
                      name="email"
                      className="relative w-full min-w-[200px] flex items-center justify-between py-[22px] pl-3 pr-5 h-10 outline-none bg-white border border-gray-200 rounded-lg"
                    />
                    {errorMessages.email && formData.email && (
                      <span className="text-red-500 text-[13px]">
                        {errorMessages.email}
                      </span>
                    )}
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                  </div>
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
                className="font-medium text-gray-900 flex flex-row gap-3 mt-3"
              >
                <span>Remember Password?</span>
                <Link href="/" className="underline">
                  Click Here
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

const recover = HocsessionAuthenticated(Page);

export default recover;
