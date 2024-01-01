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
        <div className="w-full lg:w-3/5 mt-24">
          <div className="text-center">
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
                Your email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                name="email"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                required
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => {
                  HandleInputChange(e);
                  signUpValidate(
                    "email",
                    EMAIL_REGEX,
                    e.target.value,
                    "Please enter a valid email address."
                  );
                }}
              />
              
            </div>
            {errorMessages.email && formData.email && (
                  <span className="text-red-500 text-[13px]">
                    {errorMessages.email}
                  </span>
                )}
            <Button className="mt-6" fullWidth onClick={HandleSubmit}>
              Sign In
            </Button>

            <Typography
              variant="paragraph"
              className="text-center text-blue-gray-500 font-medium mt-4"
            >
              remember your password?
              <Link href="/" className="text-gray-900 ml-1">
                Login
              </Link>
              <Link href="/auth/updatepassword" className="text-gray-900 ml-1">
                Login
              </Link>
            </Typography>
          </form>
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