import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
  DOB_REGEX,
} from "@/utils/regex";

import { useState } from "react";
import Link from "next/link";
import Api from "@/utils/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function UpdateAdmin({ open, handleOpen, CurrentUser, NewAdmin }) {


  const [formData, setFormData] = useState({
    role: "",
    fullname: "",
    email: "",
   // Add a field for the selected role
  });

  const roles = ["editor", "admin", "superadmin"];
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

    // if (name === 'role') {
    //   signUpValidate(name, null, value, ''); // Validate the role based on the existing logic
    // } else {
    //   signUpValidate(name, null, value, ''); // Validate other fields based on the existing logic
    // }
  };


  // }


  //Define state for universal error

  const [universalError, setUniversalError] = useState("");

  // Define initial validation state
  const [isValidData, setIsValidData] = useState(true);

  // Define initial form error state

  const [errorMessages, setErrorMessages] = useState({
    email: "",
    fullname: "",
    role: "",
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

  // Define Variable for allfield valid

  const allFieldsValid = Object.keys(errorMessages).every(
    (field) => !errorMessages[field]
  );


  const HandleSubmit = async (e) => {

    e.preventDefault();
    console.log(formData);
    if (!allFieldsValid) {
      toast.error("please fill in all the fields correctly", {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }

    if (!formData.role) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        role: "Please select a role.",
      }));
      return;
    }

    handleOpen();
    const id = toast.loading("updating..", {
      position: toast.POSITION.TOP_LEFT,
    });
    try {
      // Log the current form data to the console
      console.log("formdata", formData);

      const token =  Cookies.get('adminToken');
      // Perform an asynchronous API post request to sign up the user
      console.log("Before API post request");
      const data = await Api.patch("admin/auth/signup", formData,{
        headers: {
          Authorization: `Bearer ${String(token)}`,
          "Content-Type": "multipart/form-data",
        }});

      // Log the response data to the console
      console.log("all data", data);

      // Check the status of the response and log success or failure messages
      if (data.status === 201) {
        console.log("patch successful", data.data.message);
        setTimeout(() => {
          toast.dismiss(id);
        }, 1000);
        toast.update(id, {
          render: `${data.data.message}`,
          type: "success",
          isLoading: false,
        });
        if(typeof window !== "undefined"){
          window.location.reload()
        }
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
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Update Admin</DialogHeader>
        <DialogBody className="h-fit">
          <Typography className="font-normal">
            <form className="relative" style={{ height: 405 }}>
              <div
                form="user"
                className="absolute top-0 left-0 flex flex-col w-full min-w-0 p-4 break-words bg-white dark:bg-slate-850 bg-clip-border h-auto opacity-100 visible"
                active=""
              >
                <h5 className="mb-0 font-bold dark:text-white">Add fields</h5>
                <p className="mb-0 text-sm leading-normal">
                  Mandatory informations
                </p>
                <div>
                  <div className="flex flex-wrap mt-4 -mx-3">
                    <div className="w-full max-w-full px-3 flex-0 sm:w-6/12">
                      <label
                        className="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80"
                        htmlFor="First Name"
                      >
                        FullName
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        onChange={(e) => {
                          HandleInputChange(e);
                          signUpValidate(
                            "fullname",
                            USERNAME_REGEX,
                            e.target.value,
                            "username start with letter, may include numbers or underscore(_)"
                          );
                        }}
                        defaultValue={NewAdmin?.fullname}
                        // value={formData.fullname}
                        required
                        placeholder="eg. Michaeljackson"
                        className="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                      {errorMessages.fullname && formData.fullname && (
                        <span className="text-red-500 text-[13px]">
                          {errorMessages.fullname}
                        </span>
                      )}
                    </div>
                    <div className="w-full max-w-full px-3 mt-4 flex-0 sm:mt-0 sm:w-6/12">
                      <label
                        className="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80"
                        htmlFor="Email Address"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="eg. soft@dashboard.com"
                        defaultValue={NewAdmin?.email}
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
                        className="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                      />
      
                    </div>
                  </div>
                  <div className="flex flex-wrap mt-4 -mx-3">
                    <div className="w-full max-w-full px-3 flex-0 sm:w-6/12">
                      <label
                        className="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80"
                        htmlFor="role"
                      ></label>
                      {CurrentUser &&
                      CurrentUser.data.olduser.role === "superadmin" ? (
                         <Select variant="outlined" label="Select Role" name="role"   value={NewAdmin?.role}  onChange={(e) => { setFormData({ ...formData, role: e }); }} >
                        {roles.map((role)=>(

                        <Option  key={role} value={role} defaultValue={NewAdmin?.role}>{role}</Option>
                        ))}
{/*                    
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                        <option value="editor">Editor</option> */}
                      </Select>
                      ) : CurrentUser &&
                        CurrentUser.data.olduser.role === "admin" ? (
                        <Select variant="outlined" label="Select Role">
                          <Option>Editor</Option>
                        </Select>
                      ) : (
                        <Select
                          variant="outlined"
                          label="Select Role"
                          disabled
                        ></Select>
                      )}

                      {errorMessages.role && formData.role && (
                        <span className="text-red-500 text-[13px]">
                          {errorMessages.role}
                        </span>
                      )}
                    </div>

                    <div className="w-full max-w-full px-3 flex-0 sm:w-6/12">
                      <label
                        className="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80"
                        htmlFor="Password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="******"
                        disabled={NewAdmin?.role === "admin" || "editor" || "superadmin" || ""}
                     
                        className="focus:shadow-primary-outline cursor-not-allowed dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap mt-4 -mx-3"></div>
                </div>
              </div>
            </form>
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button
            variant="gradient"
            disabled={Object.values(formData).some((value) => value === "")}
            color="green"
            onClick={HandleSubmit}
          >
            Update
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
