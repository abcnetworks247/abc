"use client"
import {
  Typography,
} from "@material-tailwind/react";
import Link from "next/link"
import { useState } from "react";
import Api from "@/utils/Api";
import { toast, ToastContainer } from "react-toastify";
import {useRouter} from "next/navigation"
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";




export default function Page(){

   // for navigating to the dashboard page after login
   const router = useRouter()
    // initial state for form data 
    const[formData, setFormData] =useState({
      email: "",
      password: "", 
     })
   
     /**
      * 
      * @param {object}e e event object
      * @param {string} e.target - to target the event
      * @param {string} e.value - value of the event i.e input
         */
   
     const HandleInputChange = (e)=>{
       const {name, value} = e.target;
        setFormData({
         ...formData,
         [name]: value
        })
   
   
     }
   
     /**
      * 
      * @param {object} e - event object
      * @param {function} e.preventdefault - for prevent the browser default
      */
   
   
     const HandleSubmit = async (e) => {
       e.preventDefault();
       const id = toast.loading("loging in..", {
        position: toast.POSITION.TOP_LEFT,
      });       try {
     
         // Log the current form data to the console
         console.log("formdata", formData);
   
         // Perform an asynchronous API post request to sign up the user
         console.log("Before API post request");
         const data = await Api.post("admin/auth/signin", formData);
        
         const value = data.data;
   
         // Log the response data to the console
         console.log("all data", data);
   
         // Check the status of the response and log success or failure messages
         if (data.status === 200) {
           console.log("post successful", data.data.message);

           // storing the user token after successful login
           Cookies.set("authToken", value.authToken);
           setTimeout(() => {
             toast.dismiss(id);
           }, 1000);
          toast.update(id, {
             render: `${data.data.message}`,
             type: "success",
             isLoading: false,
           });
           setTimeout(() => {
            router.push('/');
           }, 3000);
         } else if(data.status === 500) {
           const suberrormsg = toast.update(id, {
             render: `user email or name already exist `,
             type: "error",
             isLoading: false,
           });
           setTimeout(() => {
             toast.dismiss(suberrormsg);
           }, 1000);
   
         }else{
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
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <div className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"  >
        <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" >
        <form className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
    <div className="flex flex-col gap-6 mb-1">

      <h6
        className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
        Your Email
      </h6>
      <div className="relative h-11 w-full min-w-[200px]">
        <input placeholder="name@mail.com"
        onChange={HandleInputChange}
        required
        name="email"
          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
        <label
          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
      </div>
      <h6
        className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
        Password
      </h6>
      <div className="relative h-11 w-full min-w-[200px]">
        <input type="password" placeholder="********"
        name="password" onChange={HandleInputChange}
        
          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
        <label
          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
      </div>
    </div>
    <div className="inline-flex items-center">
      <label className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3" htmlFor="remember">
        <input type="checkbox"
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
          id="remember" />
        <span
          className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
            stroke="currentColor" strokeWidth="1">
            <path fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"></path>
          </svg>
        </span>
      </label>
      <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="remember">
        <p className="flex items-center font-sans text-sm antialiased font-normal leading-normal text-gray-700">
          I agree the
          <a href="#" className="font-medium transition-colors hover:text-gray-900">
            &nbsp;Terms and Conditions
          </a>
        </p>
      </label>
    </div>
    <button
      className="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="submit" onClick={HandleSubmit}>
      sign up
    </button>
  
  </form>

            <Typography variant="small" className="font-medium text-gray-900">
              <Link href="/auth/recover">
                Forgot Password?
              </Link>
            </Typography>
          </div>
     
        </div>

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
