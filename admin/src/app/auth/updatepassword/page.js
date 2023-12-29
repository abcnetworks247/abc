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
 function Page() {
  const router = useRouter();
  // using usesearcparams to get the search params
  const params = useSearchParams();

  const reset = params.get("reset");
  console.log(params.get("reset"));
  // initial state for form data
  const [formData, setFormData] = useState({
    password: "",
    confrimpassword: "",
    reset,
  });

  /**
   *
   * @param {object}e e event object
   * @param {string} e.target - to target the event
   * @param {string} e.value - value of the event i.e input
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

    if(formData.password !== formData.confrimpassword){
      toast.error("passwords do not match", {
        position: toast.POSITION.TOP_LEFT,
      });
      return
    }
    const id = toast.loading("changingpassword..", {
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
        router.push("/auth/login");
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
        </div>
        <div className="w-2/5 h-full hidden lg:block">
          <img
            src="/img/pattern.png"
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
      </section>
    </>
  );
}

const updatepassword = HocUpadate(Page)

export default updatepassword;